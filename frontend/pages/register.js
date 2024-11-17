import React, { useState } from 'react';
import Button from '../components/Controls/Button';
import { useDispatch, useSelector } from 'react-redux';
import { registerUserAsync } from '../redux/authSlice';


const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);
  const error = useSelector(state => state.auth.error);

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
    </div>
  );
};

export default Register;
