import type { Metadata } from "next";
import { ABeeZee } from "next/font/google";
import ReactQueryProvider from "@/provider/ReactQueryProvider";

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
      <body className={`${fonts.className} antialiased`}>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
