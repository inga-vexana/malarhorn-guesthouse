import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Malarhorn Guesthouse",
  description: "A peaceful seaside retreat in Drangsnes, Iceland.",
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
