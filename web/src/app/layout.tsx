import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Train360 DMS",
  description: "A Supabase-powered document management system!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  );
}
