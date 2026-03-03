import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from supabase import create_client, Client
from google import genai
from prompt import MYP_SYSTEM_PROMPT

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Initialize Clients
supabase_url = os.getenv("SUPABASE_URL")
supabase_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
gemini_api_key = os.getenv("GEMINI_API_KEY")

supabase: Client = create_client(supabase_url, supabase_key)
gemini_client = genai.Client(api_key=gemini_api_key)


@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "service": "MYP Launchpad Backend"})

@app.route('/api/new-chat', methods=['POST'])
def new_chat():
    # Create a new chat for a user (for testing, we'll use a dummy user_id)
    data = request.json
    user_id = data.get('user_id', '00000000-0000-0000-0000-000000000001')
    
    result = supabase.table("chats").insert({
        "user_id": user_id,
        "title": "New Chat"
    }).execute()
    
    chat_id = result.data[0]['id']
    return jsonify({"chat_id": chat_id})

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        # 1. Grab the JSON data sent from the frontend
        data = request.json
        user_message = data.get('content')
        chat_id = data.get('chat_id')

        # 2. Fetch previous messages from this chat for context
        previous_messages = supabase.table("messages")\
            .select("role, content")\
            .eq("chat_id", chat_id)\
            .order("created_at", desc=False)\
            .execute()
        
        # Update chat title if this is the first user message
        if not previous_messages.data:
            supabase.table("chats").update({"title": user_message}).eq("id", chat_id).execute()
        
        # 3. Build conversation history for Gemini
        conversation_history = []
        for msg in previous_messages.data:
            role = "user" if msg["role"] == "user" else "model"
            conversation_history.append({
                "role": role,
                "parts": [{"text": msg["content"]}]
            })
        
        # 4. Add the new user message to history
        conversation_history.append({
            "role": "user",
            "parts": [{"text": user_message}]
        })

        # 5. Save the User Message to Supabase
        supabase.table("messages").insert({
            "chat_id": chat_id,
            "role": "user",
            "content": user_message
        }).execute()

        # 6. Generate Response using Gemini with simple retry
        answer_text = None
        max_retries = 3
        
        for attempt in range(max_retries):
            try:
                ai_response = gemini_client.models.generate_content(
                    model="gemini-flash-latest",
                    contents=conversation_history,
                    config={
                        "system_instruction": MYP_SYSTEM_PROMPT
                    }
                )
                answer_text = ai_response.text
                break
            except Exception as e:
                if "503" in str(e) and attempt < max_retries - 1:
                    print(f"Model overloaded, retrying in 1s... (Attempt {attempt + 1})")
                    import time
                    time.sleep(1)
                    continue
                raise e

        # 7. Save Gemini's Response to Supabase
        supabase.table("messages").insert({
            "chat_id": chat_id,
            "role": "assistant",
            "content": answer_text
        }).execute()

        # 8. Return the final answer to the Frontend
        return jsonify({
            "answer": answer_text
        })
    
    except Exception as e:
        error_message = str(e)
        print(f"Error in chat: {error_message}")
        
        if "RESOURCE_EXHAUSTED" in error_message or "429" in error_message:
            return jsonify({
                "error": "Rate limit exceeded. Please wait a moment and try again.",
                "answer": "⚠️ I'm currently experiencing high demand. Please wait a minute and try again."
            }), 429
        
        return jsonify({
            "error": error_message,
            "answer": "⚠️ An error occurred. Please try again."
        }), 500

@app.route('/api/clear-history', methods=['POST'])
def clear_history():
    try:
        data = request.json
        user_id = data.get('user_id')
        
        if not user_id:
            return jsonify({"error": "User ID is required"}), 400
            
        # Delete all chats for this user (messages will be deleted if ON DELETE CASCADE is set, 
        # otherwise we should delete messages first. Assuming Supabase schema handles this or we do it manually.)
        
        # To be safe, let's delete messages associated with user's chats first if needed, 
        # but usually with Supabase/PostgreSQL we use CASCADE.
        # Let's just delete the chats.
        supabase.table("chats").delete().eq("user_id", user_id).execute()
        
        return jsonify({"message": "History cleared successfully"})
    except Exception as e:
        print(f"Error clearing history: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
