import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Book Schedule App",
  description: "Developed to help you keep track of your reading.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="h-screen bg-white dark:bg-gray-900">
        <header className="pt-7">
          <h1 className="text-3xl font-bold text-center">독서 계획</h1>
        </header>
        <main className="bg-white dark:bg-gray-900 p-8 lg:p-16">
          {children}
        </main>
      </body>
    </html>
  );
}
