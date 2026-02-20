import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "@/components/ui/sonner";


const montserrat = Montserrat({
  variable: '--font-montserrat'
})



export const metadata: Metadata = {
  title: "Invent",
  description: "Your go to system for inventory management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${montserrat.className} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
   
          <main className="max-w-7xl mx-auto w-full px-4 md:px-6 lg:px-8">

        {children}
          </main>
 <Toaster 
 duration={3000}
 closeButton
 expand

 />
        </ThemeProvider>

      </body>
    </html>
  );
}
