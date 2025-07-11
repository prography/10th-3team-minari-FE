'use client';
import ErrorLayout from '@/components/ErrorLayout';
import Button from '@/components/Button';
import {OUT_LINK} from '@/constants/path';

export default function ServerErrorPage() {
  return (
    <ErrorLayout code={500}>
      <div className="title-sm">우와, 아직 심어지지 못한 미나리를 발견하셨군요!</div>
      <div className="title-sm">어떻게 이 미나리를 찾았는지 말씀해주실래요?</div>
      <div className="fx-align-center mg-top-20" style={{gap: '16px'}}>
        <Button theme="secondary" border onClick={() => window.open(OUT_LINK.FAQ)}>
          제보하기
        </Button>
        <Button border onClick={() => window.history.back()}>
          돌아가기
        </Button>
      </div>
    </ErrorLayout>
  );
}
