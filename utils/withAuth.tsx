import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAppSelector } from 'store/hook';

function withAuth(WrappedComponent) {
  const Wrapper = (props) => {
    const router = useRouter();
    const { id: isAuthenticated } = useAppSelector((state) => state.auth);

    useEffect(() => {
      if (!isAuthenticated) {
        router.push('/auth/login');
      }
    }, [isAuthenticated, router]);

    if (isAuthenticated) {
      return <WrappedComponent {...props} />;
    } else {
      return null;
    }
  };

  return Wrapper;
}

export default withAuth;
