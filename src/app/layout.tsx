import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import { noto } from "@/font";
import SessionWrapper from "@/util/SessionWrapper";
import Navbar from "./ui/common/Navbar";
import Footer from "./ui/common/Footer";
import StoreProvider from "./StoreProvider";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body className={noto.className}>
          <StoreProvider>
            {children}
            <Navbar />
            <Footer />
          </StoreProvider>
        </body>
        <Script
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_API_KEY}&libraries=services,clusterer&autoload=false`}
        />
      </html>
    </SessionWrapper>
  );
}
