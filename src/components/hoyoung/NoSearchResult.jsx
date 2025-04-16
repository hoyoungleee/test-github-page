import React from 'react';
import styles from './NoSearchResult.module.scss';

const NoSearchResult = () => {
  return (
    <div className={styles.wrapper}>
      <p className={styles.primary}>조건에 맞는 검색 결과가 없어요.</p>
      <p className={styles.sub}>검색 옵션을 변경해보세요.</p>
    </div>
  );
};

export default NoSearchResult;
