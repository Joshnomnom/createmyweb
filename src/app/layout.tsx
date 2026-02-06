import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "CreateMyWeb - The Ultimate Page Builder",
  description: "Create stunning websites in minutes with our visual page builder.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
