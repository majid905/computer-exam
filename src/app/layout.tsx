import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/app/AppShell";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "passpilot — AI-powered exam coach",
  description:
    "Study, practice, and simulate the Canadian citizenship knowledge test with AI-powered coaching.",
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
        <AuthProvider>
          <AppShell>{children}</AppShell>
        </AuthProvider>
      </body>
    </html>
  );
}
