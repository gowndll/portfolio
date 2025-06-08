import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HaeJu Kim",
  description: "해주 포트폴리오",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
