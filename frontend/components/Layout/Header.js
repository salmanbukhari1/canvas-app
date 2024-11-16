// components/Header.js
import React from 'react';
import Button from '../Controls/Button';
import { useRouter } from 'next/router';
import styles from '../../styles/Header.module.css'; 
import { useSelector, useDispatch } from 'react-redux';
import { logoutUserAsync } from '../../redux/authSlice'; 

const Header = () => {
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logoutUserAsync());
    router.push('/login');
  };

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo} onClick={() => router.push('/')}>
        <span className={styles.companyName}>CanvasPlay</span>
      </div>
      <nav className={styles.nav}>
        {user ? (
          <Button onClick={handleLogout} disabled={!loading}>
            Logout
          </Button>
        ) : (
          <Button onClick={handleLogin} disabled={!loading}>
            Login
          </Button>
        )}
      </nav>
    </header>
  );
};

export default Header;
