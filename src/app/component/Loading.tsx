'use client';

const Loading = () => {
  return (
    <div
      className="loading"
      role="status"
      aria-live="assertive"
      aria-busy="true"
    >
      <p>페이지를 불러오는 중입니다</p>
    </div>
  );
};

export default Loading;
