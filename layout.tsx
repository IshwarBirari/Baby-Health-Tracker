import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Baby Tracker",
  description: "Mobile-first baby sleep & feeding tracker (MVP)",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen flex justify-center">
      <div className="w-full max-w-md bg-white min-h-screen shadow-xl">
      {children}
      </div>
      </body>
    </html>
  );
}
