'use client';
import ErrorLayout from '@/components/ErrorLayout';
import Button from '@/components/Button';

export default function UnauthorizedPage() {
  return (
    <ErrorLayout code={401}>
      <div className="title-sm">처음 뵙는 것 같아요.</div>
      <div className="title-sm">당~시인은 누구십니까?</div>
      <div className="fx-align-center mg-top-20" style={{gap: '16px'}}>
        <Button border onClick={() => (window.location.href = '/')}>
          나 소개하러 가기
        </Button>
      </div>
    </ErrorLayout>
  );
}
