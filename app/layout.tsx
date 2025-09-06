import type { Metadata } from "next";
import { ABeeZee } from "next/font/google";
import "./globals.css";

const fonts = ABeeZee({
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "MeetUS VR",
  description: "MeetUS VR - Task",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fonts.className} antialiased`}>{children}</body>
    </html>
  );
}
