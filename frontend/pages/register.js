import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUserAsync } from '../redux/authSlice';
import AuthForm from '../components/Forms/AuthForm';
import useRedirectIfLoggedIn from '../hooks/useRedirectIfLoggedIn'; // Import the custom hook

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);
  const error = useSelector(state => state.auth.error);
  const user = useSelector(state => state.auth.user);
  const router = useRouter();

  useRedirectIfLoggedIn();

  const handleRegister = () => {
    dispatch(registerUserAsync(email, password));
  };

  const fields = [
    { type: 'email', value: email, onChange: e => setEmail(e.target.value), placeholder: 'Email' },
    { type: 'password', value: password, onChange: e => setPassword(e.target.value), placeholder: 'Password' },
  ];

  return (
    <AuthForm
      title="Register"
      fields={fields}
      onSubmit={handleRegister}
      loading={loading}
      error={error}
    />
  );
};

export default Register;
