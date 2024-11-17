import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserAsync } from '../redux/authSlice';
import AuthForm from '../components/Forms/AuthForm';

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
      router.push('/'); // Redirect if user is logged in
    }
  }, [user]);

  const handleLogin = () => {
    dispatch(loginUserAsync(email, password));
  };

  const fields = [
    { type: 'email', value: email, onChange: e => setEmail(e.target.value), placeholder: 'Email' },
    { type: 'password', value: password, onChange: e => setPassword(e.target.value), placeholder: 'Password' },
  ];

  return (
    <AuthForm
      title="Login"
      fields={fields}
      onSubmit={handleLogin}
      loading={loading}
      error={error}
    />
  );
};

export default Login;
