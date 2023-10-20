import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { UserManagement } from './UserManagement';

const ProtectedRoute = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = UserManagement.getItem('token');
      if (!token) {
        router.push('/');
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default ProtectedRoute;
