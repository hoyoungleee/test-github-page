import React from 'react';
import { CategoryImages } from './CategoryImages';
import styles from './ImageList.module.scss';
import { Link } from 'react-router-dom';

const ImageList = ({ type, text, link }) => {
  return (
    <li>
      <Link to={`${link}`}>
        <div className={styles.imageDiv}>
          {CategoryImages[type]}
          {text}
        </div>
      </Link>
    </li>
  );
};

export default ImageList;
