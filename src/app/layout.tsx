import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/app/AppShell";
import { AuthProvider } from "@/context/AuthContext";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/seo";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  // Base URL so every relative OG image / canonical link resolves to an
  // absolute URL (required for social previews and correct indexing).
  metadataBase: new URL(SITE_URL),
  // "%s" is filled in by each page's own title; the home page uses `default`.
  title: {
    default: `${SITE_NAME} — AI-powered Canadian citizenship exam coach`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "Canadian citizenship test",
    "citizenship exam practice",
    "Discover Canada quiz",
    "citizenship test prep",
    "mock citizenship exam",
  ],
  alternates: { canonical: "/" },
  // Default rich-preview card shown when a page is shared (Facebook, LinkedIn,
  // iMessage, Slack…). Individual pages can override this.
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: SITE_URL,
    title: `${SITE_NAME} — AI-powered Canadian citizenship exam coach`,
    description: SITE_DESCRIPTION,
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — AI-powered Canadian citizenship exam coach`,
    description: SITE_DESCRIPTION,
  },
  // Explicitly invite indexing (default, but makes intent clear).
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
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
