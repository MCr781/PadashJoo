import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";
import Script from "next/script"; // 1. Added Import
import LiveTicker from "@/components/LiveTicker";

const vazir = Vazirmatn({ 
  subsets: ["arabic", "latin"],
  display: "swap",
  variable: "--font-vazirmatn",
});

export const metadata: Metadata = {
  title: "PadashJoo - Free Income & Rewards",
  description: "The best guide to sign-up bonuses and referral codes in Iran.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${vazir.variable} antialiased`}>
        <LiveTicker /> {/* Add this at the very top */}
        <Navbar />
        {children}
        <Footer />
        <Toaster richColors position="bottom-center" />

        {/* 2. Microsoft Clarity Script */}
        <Script id="clarity-script" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "uf2t973b7s");
          `}
        </Script>
      </body>
    </html>
  );
}