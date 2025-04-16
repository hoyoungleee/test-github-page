import React from 'react';
import styles from './Category.module.scss';
import ImageList from './category/ImageList';

const Category = () => {
  return (
    <div className={styles.category}>
      <ul>
        <ImageList type='Bag' text='중고거래' link={'used-items'} />
        <ImageList type='Work' text='알바' link={'work'} />
        <ImageList type='House' text='부동산' link={'house'} />
        <ImageList type='Car' text='중고차' link={'car'} />
        <ImageList type='HomeTown' text='동네업체' link={'hometown'} />
        <ImageList type='News' text='동네생활' link={'community'} />
        <ImageList type='Crew' text='모임' link={'crew'} />
      </ul>
    </div>
  );
};

export default Category;
