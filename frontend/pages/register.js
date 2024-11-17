import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import Button from '../components/Controls/Button';
import Loading from '../components/Notifiers/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { registerUserAsync } from '../redux/authSlice';
import ErrorNotification from '../components/Notifiers/ErrorNotification';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);
  const error = useSelector(state => state.auth.error);
  const user = useSelector(state => state.auth.user);
  const router = useRouter();

  useEffect(() => {

    if (user) {
      router.push('/');  // User logged in, navigate to dashboard
    }

  }, [error, loading]);

  const handleRegister = () => {
    dispatch(registerUserAsync(email, password));
  };

  return (
    <div className={"med-container"}>
      <h2>Register</h2>
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
      <Button onClick={handleRegister} disabled={loading}>
        Register
      </Button>
      {error && <ErrorNotification message={error} />}
      {loading && <Loading />}
    </div>
  );
};

export default Register;
