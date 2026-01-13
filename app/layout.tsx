import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SWRProvider } from "@/lib/swr-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Aerobill - Restaurant Management System",
  description: "Streamline your restaurant with Aerobill. QR code ordering, digital menu, kitchen display, billing & inventory management. Start free today!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <SWRProvider>
          {children}
        </SWRProvider>
      </body>
    </html>
  );
}

