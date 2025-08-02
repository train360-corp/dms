import type { Metadata } from "next";
import "@workspace/ui/styles/globals.css";
import { ThemeProvider } from "@workspace/ui/components/theme-provider";
import { Toaster } from "@workspace/ui/components/sonner";



export const metadata: Metadata = {
  title: "ProjDocs",
  description: "A project-oriented document management system!",
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
    <Toaster/>
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
