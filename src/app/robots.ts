import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/",
          "/api/",
          "/onboarding",
          "/welcome",
          "/progress",
          "/settings",
          "/users",
          "/mock-exam/take",
          "/mock-exam/result",
          "/practice/review",
        ],
      },
    ],
    sitemap: "https://www.passpilot.ca/sitemap.xml",
  };
}
