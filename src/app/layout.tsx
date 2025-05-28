import type { Metadata } from "next";
import { Jua } from "next/font/google";
import "./globals.css";

const jua = Jua({
  subsets: ["latin"],
  weight: "400", // optional, default is 400
  display: "swap",
});

export const metadata: Metadata = {
  title: "Age Saying",
  description: "What did your age says about you",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jua.className} antialiased`}>{children}</body>
    </html>
  );
}
