'use client';
import {useRouter} from 'next/navigation';
import {useEffect} from 'react';

const AdminHome = () => {
  const router = useRouter();
  useEffect(() => {
    router.push('/admin/payments');
  }, []);
  return <div style={{minHeight: 'calc(100dvh - 400px)'}}></div>;
};

export default AdminHome;
