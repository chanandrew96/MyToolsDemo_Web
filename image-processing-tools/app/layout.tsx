import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppSidebar } from "./app-sidebar";
import "./globals.css";
import { TopMenuBar } from "./top-menubar";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Image Processing Tools",
  description: "This is a website that provide list of tools for Image Processing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SidebarProvider>
          <AppSidebar />
          <main className="w-full p-2 px-4">
            <div className="m-2 max-w-svw">
              <TopMenuBar />
              {children}
              <Toaster />
            </div>
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
