import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Jeroen & Paws | Dog Walking, Training, Day Care & Boarding",
  description:
    "Jeroen & Paws offers personalised dog walking, training, day care, boarding, and home check-ins with attentive care by certified canine specialist Jeroen.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-background text-foreground">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
