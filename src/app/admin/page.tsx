'use client';
import Button from '@/components/Button';
import {useRouter} from 'next/navigation';

const AdminHome = () => {
  const notReady = () => {
    window.alert('준비중,,');
  };
  const router = useRouter();
  return (
    <div style={{minHeight: 'calc(100dvh - 400px)'}}>
      <div className="fx-center mg-top-32 title-md">
        This is 어드민
        <br />
        Welcome 환영합니다 🥳
      </div>
      <div className="fx-center mg-top-32" style={{gap: '12px'}}>
        <Button onClick={notReady}>유저 조회</Button>
        <Button onClick={() => router.push('/admin/payments')}>리워드 지급</Button>
      </div>
    </div>
  );
};

export default AdminHome;
