'use client';
import ErrorLayout from '@/components/ErrorLayout';

export default function ForbiddenPage() {
  return (
    <ErrorLayout code={403}>
      <div className="title-sm">접근 권한이 없어요</div>
      <div className="title-sm">이 페이지를 이용하려면 추가 권한이 필요해요</div>
    </ErrorLayout>
  );
}
