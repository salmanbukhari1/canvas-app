import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import Button from '../components/Controls/Button';
import { loginUserAsync } from '../redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../components/Notifiers/Loading';
import ErrorNotification from '../components/Notifiers/ErrorNotification';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const loading = useSelector(state => state.auth.loading);
  const error = useSelector(state => state.auth.error);
  const router = useRouter();

  useEffect(() => {

    if (user) {
      router.push('/');  // User logged in, navigate to dashboard
    }

  }, [user]);

  const handleLogin = () => {
    dispatch(loginUserAsync(email, password));
  };

  return (
    <div className={"med-container"}>
      <h2>Login</h2>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
      />
      <Button onClick={handleLogin}  disabled={loading}>
        Login
      </Button>
      {error && <ErrorNotification message={error} />}
      {loading && <Loading />}
    </div>
  );
};

export default Login;
