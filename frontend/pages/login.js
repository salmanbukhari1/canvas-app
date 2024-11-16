import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Button from '../components/Controls/Button';
import Loading from '../components/Notifiers/Loading';
import { loginUserAsync } from '../redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import ErrorNotification from '../components/Notifiers/ErrorNotification';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [waiting, setWaiting] = useState(false);
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);
  const error = useSelector(state => state.auth.error);
  const router = useRouter();

  const handleLogin = async () => {

    setWaiting(true);
    
    await dispatch(loginUserAsync(email, password));
    
    // user has logged in, move to dashboard 
    if (!loading && !error) {
      router.push('/');
    }
    
    setWaiting(false);
  };

  if (waiting) {
    return <Loading></Loading>
  }

  return (
    <>
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
      <Button onClick={handleLogin} disabled={loading}>
        Login
      </Button>
      {error && <ErrorNotification message={error} />}
    </>
  );
};

export default Login;
