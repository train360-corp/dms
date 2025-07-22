import type { Metadata } from "next";
import "@train360-corp/dms/app/globals.css";
import { ThemeProvider } from "@train360-corp/dms/components/theme-provider";

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
    <head>
      {/* inject dynamic Docker env vars */}
      <script src="/env.js"/>
    </head>
    <body>
    <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
  );
}
