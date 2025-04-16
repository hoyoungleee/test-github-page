import React, { useContext } from 'react';
import styles from './Hometown.module.scss';
import AuthContext from './context/Location.js';

const Hometown = () => {
  const { pick } = useContext(AuthContext);

  const townName = [
    '대천동',
    '서초동',
    '송도동',
    '별내동',
    '신림동',
    '압구정동',
    '오창읍',
    '마곡동',
    '배곧동',
    '옥정동',
    '물급읍',
    '역삼동',
    '다산동',
    '배곧동',
    '배방읍',
    '청담동',
    '와초리',
    '오송읍',
    '가경동',
    '온양동',
  ];

  return (
    <div className={styles.hometown}>
      <ul>
        {townName.map((town, idx) => {
          return (
            <li
              key={idx}
              onClick={() => {
                //마을이 선택되면 index페이지로 넘겨서 다시 상단에 보이게 할거임(다른 자식의 데이터로사용하게..)
                pick(town);
              }}
            >
              {town}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Hometown;
