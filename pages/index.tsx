import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAppSelector } from 'store/hook';

export default function Index() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/store');
  }, []);
  return <></>;
}
