'use client';
import ErrorLayout from '@/components/ErrorLayout';
import Button from '@/components/Button';

export default function NotFound() {
  return (
    <ErrorLayout code={404}>
      <div className="txt-secondary title-sm">앗.. 요청하신 페이지를 찾을 수 없습니다.</div>
      <div className="txt-secondary title-sm">불편을 드려 죄송합니다.</div>

      <div className="fx-align-center mg-top-20" style={{gap: '16px'}}>
        <Button theme="secondary" border onClick={() => window.history.back()}>
          이전 페이지
        </Button>
        <Button border onClick={() => (window.location.href = '/')}>
          메인 페이지
        </Button>
      </div>
    </ErrorLayout>
  );
}
