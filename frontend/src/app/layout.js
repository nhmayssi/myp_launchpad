import './globals.css'
import Navbar from './components/Navbar'
import SmoothScroll from './components/SmoothScroll'
import { DM_Sans } from 'next/font/google'

const dmSans = DM_Sans({
    subsets: ['latin'],
    weight: ['400', '700'],
    variable: '--font-dm-sans',
})

export const metadata = {
    title: 'MYP Launchpad',
    description: 'A platform for MYP students',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={dmSans.variable}>
            <body className="font-sans antialiased" suppressHydrationWarning>
                <SmoothScroll />
                <div className="flex flex-col items-center">
                    <Navbar />
                </div>
                {children}
            </body>
        </html>
    )
}
