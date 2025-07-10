'use client';
import ErrorLayout from '@/components/ErrorLayout';

export default function ServerErrorPage() {
  return (
    <ErrorLayout code={500}>
      <div className="title-sm">일시적인 오류가 발생했어요</div>
      <div className="title-sm">
        잠시 후 다시 시도하거나, 문제가 계속되면 관리자에게 문의해주세요.
      </div>
    </ErrorLayout>
  );
}
