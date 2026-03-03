import os
from google import genai

api_key = os.environ.get("GEMINI_API_KEY")

client = genai.Client(api_key=api_key)

response = client.models.generate_content(
    model="gemini-3-flash-preview", contents="Explain the benefits of the MYP system."
)
print(response.text)
