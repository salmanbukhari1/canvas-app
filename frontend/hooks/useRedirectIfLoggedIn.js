// hooks/useRedirectIfLoggedIn.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const useRedirectIfLoggedIn = () => {
  const user = useSelector(state => state.auth.user);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/'); // Redirect if user is logged in
    }
  }, [user, router]);
};

export default useRedirectIfLoggedIn;
