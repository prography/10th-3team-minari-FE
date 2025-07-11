'use client';
import ErrorLayout from '@/components/ErrorLayout';
import Button from '@/components/Button';

export default function ForbiddenPage() {
  return (
    <ErrorLayout code={403}>
      <div className="title-sm">미나리가 길을 잃었어요!</div>
      <div className="fx-align-center mg-top-20" style={{gap: '16px'}}>
        <Button border onClick={() => (window.location.href = '/')}>
          미나리 찾으러 가기
        </Button>
      </div>
    </ErrorLayout>
  );
}
