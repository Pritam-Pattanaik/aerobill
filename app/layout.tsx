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
  metadataBase: new URL("https://www.aerobill.in"),
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
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-QL6RKM35N6"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            // Google Analytics (GA4)
            gtag('config', 'G-QL6RKM35N6');

            // Google Ads
            gtag('config', 'AW-17950861542');
          `}
        </Script>
        {/* Meta Pixel Code */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1417054093416760');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1417054093416760&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "v4v8nmxtsf");
          `}
        </Script>
        {/* Organization Schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: `{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Aerobill",
  "url": "https://www.aerobill.in/",
  "logo": "https://www.aerobill.in/logo.png",
  "description": "Aerobill provides Restaurant Management Software in India including POS software, restaurant billing software, inventory management, and QR ordering solutions.",
  "sameAs": [
    "https://www.facebook.com/aerobill",
    "https://www.instagram.com/aerobill",
    "https://www.linkedin.com/company/aerobill"
  ]
}` }} />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <SWRProvider>
          {children}
        </SWRProvider>
      </body>
    </html>
  );
}

