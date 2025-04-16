import React from 'react';
import styles from './RootLayout.module.scss';
import MainNav from '../components/MainNav';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';


const RootLayout = () => {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.container}>
          <MainNav />
          <Header />
          {/** 현국님 헤더 작업할 자리 */}
        </div>
      </header>

      <main className={styles.main}>
        {/* 바뀌는 부분(동적 컴포넌트)이 들어갈 자리 */}
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <Footer />
          {/** 현국님 푸터 작업할 자리 */}
        </div>
      </footer>
    </div>
  );
};

export default RootLayout;