import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HaeJu Kim",
  description: "해주 포트폴리오",
  openGraph: {
    title: "해주 포트폴리오",
    description: "웹 퍼블리셔 김해주의 포트폴리오",
    type: "website",
    images: [
      {
        url: "/img/og.jpg",
        width: 1200,
        height: 630,
        alt: "얼굴 캐릭터가 웃고 있고, 아래에 haeju's portfolio라고 적혀있다.",
      },
    ],
  },
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
