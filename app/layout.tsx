import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
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
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-HLBCZ07X2N"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HLBCZ07X2N');
          `}
        </Script>
      </head>
      <body className={`${inter.variable} antialiased`}>
        <SWRProvider>
          {children}
        </SWRProvider>
      </body>
    </html>
  );
}

