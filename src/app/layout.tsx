import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/app/AppShell";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PassCanada — Citizenship Test Prep",
  description:
    "Study, practice, and simulate the Canadian citizenship knowledge test based on Discover Canada.",
};

const themeInitScript = `
(function(){
  try {
    var t = localStorage.getItem("pc:theme");
    var prefers = window.matchMedia("(prefers-color-scheme: dark)").matches;
    var dark = t === "dark" || (t !== "light" && t !== "system" && prefers) || (t === "system" && prefers);
    if (dark) document.documentElement.classList.add("dark");
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
