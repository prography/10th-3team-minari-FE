'use client';
import ErrorLayout from '@/components/ErrorLayout';

export default function UnauthorizedPage() {
  return (
    <ErrorLayout code={401}>
      <div className="title-sm">로그인이 필요한 페이지입니다.</div>
      <div className="title-sm">홈으로 돌아가 로그인 후 다시 시도해주세요</div>
    </ErrorLayout>
  );
}
