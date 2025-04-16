import React from 'react';
import { Link, useRouteError } from 'react-router-dom';
import styles from './ErrorPage.module.scss';
import Header from '../components/Header';

const ErrorPage = () => {
  // 발생한 에러 정보 (throw로 던져지거나 404 에러가 발생시) 가져오기
  const error = useRouteError();
  console.log(error);

  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <p className={styles.message}>페이지를 찾을 수 없어요</p>
        <Link to='/' className={styles.homeButton}>
          홈으로 가기
        </Link>
      </div>
    </>
  );
};

export default ErrorPage;
