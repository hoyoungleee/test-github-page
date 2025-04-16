// import React, { useState, useEffect } from 'react';
import styles from './Module.module.scss';
import AuthContext from './context/Location.js';
import React, { useContext, useState, useEffect, useRef } from 'react';

const Module = () => {
  const { myLocation } = useContext(AuthContext); // 전역에서 가져온 위치 설정정

  const keyWord = [
    '맛집',
    '아이폰',
    '친구',
    '카페',
    '알바',
    '중고차',
    '원룸',
    '자전거',
    '모임',
  ];

  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [width, setWidth] = useState(0);
  const wordRef = useRef();

  useEffect(() => {
    const interval = setInterval(() => {
      setPrevIndex(index);
      setIndex((prev) => (prev + 1) % keyWord.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [index]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setIndex((prev) => (prev + 1) % keyWord.length);
  //   }, 2000);
  //   return () => clearInterval(interval);
  // }, []);

  useEffect(() => {
    if (wordRef.current) {
      setWidth(wordRef.current.offsetWidth);
    }
  }, [index]);

  return (
    <div className={styles.locationicon}>
      <svg
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        data-seed-icon='true'
        data-seed-icon-version='0.0.10'
        width='100%'
        height='100%'
      >
        <g>
          <path
            d='M12.0022 0.498047C6.10466 0.498047 2.06836 4.96307 2.06836 10.4215C2.06836 14.28 4.55706 17.553 6.82617 19.7593C7.98687 20.8782 9.1371 21.7775 10.005 22.3944C10.4679 22.7331 10.9513 23.0575 11.448 23.346C11.7722 23.5342 12.2218 23.5551 12.546 23.3669C13.0436 23.078 13.5163 22.7313 13.989 22.4049C14.8569 21.7879 16.0072 20.8887 17.1679 19.7698C19.437 17.5634 21.9257 14.3009 21.9257 10.4319C21.9361 4.96307 17.8998 0.498047 12.0022 0.498047ZM12.0022 14.4787C9.76451 14.4787 7.94504 12.6592 7.94504 10.4215C7.94504 8.18374 9.76451 6.36427 12.0022 6.36427C14.24 6.36427 16.0595 8.18374 16.0595 10.4215C16.0595 12.6592 14.24 14.4787 12.0022 14.4787Z'
            fill='currentColor'
          ></path>
        </g>
      </svg>
      <h2 className={styles.wordSpace}>
        {myLocation}에서{'\u00A0'}
        <span
          className={styles.wordcontainer}
          style={{ width: `${width}px`, transition: 'width 0.5s ease' }}
        >
          <span
            ref={wordRef}
            key={index}
            className={`${styles.word} ${styles.entering}`}
          >
            {keyWord[index]}
          </span>
          <span key={index - 1} className={`${styles.word} ${styles.leaving}`}>
            {keyWord[(index - 1 + keyWord.length) % keyWord.length]}
          </span>
        </span>
        {'\u00A0'}찾고 계신가요?
      </h2>
    </div>
  );
};

export default Module;
