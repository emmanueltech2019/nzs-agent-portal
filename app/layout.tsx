import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { OnboardingContext } from "./contexts/OnboardingContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Naijazone Sales Agent",
  description: "A platform for sales agents to manage their transactions, settings, and profile information.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased lg:w-1/2 md:w-[80%] w-full mx-auto h-screen overflow-hidden`}
      >
        <OnboardingContext>
          {children}
        </OnboardingContext>
      </body>
    </html>
  );
}
