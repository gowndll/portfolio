'use client';

import dynamic from 'next/dynamic';

// 동적으로 Header를 클라이언트에서만 불러오기
const Header = dynamic(() => import('./component/Header'), {
  ssr: false,
  loading: () => <div>로딩중...</div>,
});

export default function DynamicHeaderWrapper() {
  return <Header />;
}
