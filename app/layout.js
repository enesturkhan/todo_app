import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="tr" className="h-full">
      <head>
        <title>Todo App</title>
        <meta name="description" content="A simple todo application" />
      </head>
      <body className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 antialiased">
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
