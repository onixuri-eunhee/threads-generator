import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "스레드 글 생성기",
  description: "AI로 Threads 글을 자동 생성해보세요",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
