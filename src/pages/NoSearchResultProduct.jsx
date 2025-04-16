import React from 'react';
import styles from './NoSearchResultProduct.module.scss';

const NoSearchResultProduct = () => {
  return (
    <div className={styles.wrapper}>
      <p className={styles.primary}>근처에 게시글이 없어요.</p>
      <p className={styles.sub}>
        검색어를 수정하시거나, 다른 조건으로 검색해주세요.
      </p>
    </div>
  );
};

export default NoSearchResultProduct;
