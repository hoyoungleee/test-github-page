import React, { useState, useContext } from 'react';
import styles from './SelectLocationModal.module.scss';
import ReactDOM from 'react-dom';
import AuthContext from '../context/Location.js';

const SelectLocationModal = ({ close }) => {
  const [inputValue, setInputValue] = useState(''); // 검색어가 입력되면 X 버튼이 오른쪽에 뜨게하려는 목적

  const { pick } = useContext(AuthContext);

  const location = [
    '추천',
    '충청남도, 보령시, 대천동',
    '충청남도, 보령시, 명천동',
    '충청북도, 청주시, 오송읍',
    '충청북도, 청주시, 가경동',
    '충청남도, 아산시, 온양동',
    '충청남도, 천안시, 신부동',
    '경기도, 의왕시, 청계동',
    '경기도, 의왕시, 포일동',
    '경기도, 안양시, 동편동',
    '경기도, 화성시, 향남읍',
    '서울특별시, 연수구, 송도동',
    '경기도, 연수구, 송도동',
    '서울특별시, 연수구, 송도동',
    '인천광역시, 연수구, 송도동',
    '인천광역시, 연수구, 송도동',
    '인천광역시, 연수구, 송도동',
    '인천광역시, 연수구, 송도동',
    '인천광역시, 연수구, 송도동',
    '인천광역시, 연수구, 송도동',
    '인천광역시, 연수구, 송도동',
  ];

  const pickingName = (name) => {
    pick(
      name
        .split(',') //쉼표기준으로 나눔(경기도 화성시 향납읍)
        .pop() // 마지막꺼 빼옴 ( 향남읍 )
        .trim(), // 공백제거 (향남읍)
    );
    close();
  };

  //   console.log('모달 렌더링됐음');
  return ReactDOM.createPortal(
    <div className={styles.modals} onClick={() => close()}>
      <div className={styles.inner} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>지역 변경</h2>
          <button onClick={() => close()}>
            <svg
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              data-seed-icon='true'
              data-seed-icon-version='0.0.10'
              width='24'
              height='24'
              style={{ width: '100%', height: '100%' }}
            >
              <g>
                <path
                  d='M20.7071 4.70711C21.0976 4.31658 21.0976 3.68342 20.7071 3.29289C20.3166 2.90237 19.6834 2.90237 19.2929 3.29289L12 10.5858L4.70711 3.29289C4.31658 2.90237 3.68342 2.90237 3.29289 3.29289C2.90237 3.68342 2.90237 4.31658 3.29289 4.70711L10.5858 12L3.29289 19.2929C2.90237 19.6834 2.90237 20.3166 3.29289 20.7071C3.68342 21.0976 4.31658 21.0976 4.70711 20.7071L12 13.4142L19.2929 20.7071C19.6834 21.0976 20.3166 21.0976 20.7071 20.7071C21.0976 20.3166 21.0976 19.6834 20.7071 19.2929L13.4142 12L20.7071 4.70711Z'
                  fill='currentColor'
                ></path>
              </g>
            </svg>
          </button>
        </div>

        {/* 칸나누기 ---------------------------------------------------------------*/}

        <div className={styles.inputDiv}>
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder='지역이나 동네로 검색하기'
          />

          {inputValue && (
            <button
              className={styles.clearButton}
              value={inputValue}
              onClick={() => setInputValue('')}
            >
              x
            </button>
          )}

          <button>
            <svg
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              data-seed-icon='true'
              data-seed-icon-version='0.0.10'
              width='24'
              height='24'
              class='_1mzpedr7 sprinkles_color_neutral__1byufe81 sprinkles_width_4_base__1byufe836 sprinkles_height_4_base__1byufe85a'
            >
              <g>
                <path
                  fill-rule='evenodd'
                  clip-rule='evenodd'
                  d='M10.8111 1C5.39286 1 1 5.38822 1 10.8046V10.8176C1 16.234 5.39286 20.6222 10.8111 20.6222C12.7921 20.6222 14.6439 20.0354 16.1898 19.0193L20.2859 23.1156C21.0669 23.8967 22.3333 23.8967 23.1143 23.1156C23.8954 22.3346 23.8954 21.0683 23.1144 20.2872L19.0172 16.1899C20.0326 14.6429 20.6222 12.7916 20.6222 10.8046C20.6222 5.38822 16.2294 1 10.8111 1ZM3.4 10.8046C3.4 6.71542 6.71663 3.4 10.8111 3.4C14.9056 3.4 18.2222 6.71542 18.2222 10.8046C18.2222 13.0196 17.2562 15.0073 15.7143 16.3681L15.7119 16.3702C14.4096 17.5257 12.6917 18.2222 10.8111 18.2222C6.71663 18.2222 3.4 14.9068 3.4 10.8176V10.8046Z'
                  fill='currentColor'
                ></path>
              </g>
            </svg>
          </button>
        </div>
        {/* 칸나누기 ---------------------------------------------------------------*/}

        <button className={styles.myLocation}>
          <svg
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            data-seed-icon='true'
            data-seed-icon-version='0.0.10'
            width='16'
            height='16'
          >
            <g>
              <g>
                <path
                  fill-rule='evenodd'
                  clip-rule='evenodd'
                  d='M3.05493 11H5C5.55228 11 6 11.4477 6 12C6 12.5523 5.55228 13 5 13H3.05493C3.51608 17.1716 6.82838 20.4839 11 20.9451V19C11 18.4477 11.4477 18 12 18C12.5523 18 13 18.4477 13 19V20.9451C17.1716 20.4839 20.4839 17.1716 20.9451 13H19C18.4477 13 18 12.5523 18 12C18 11.4477 18.4477 11 19 11H20.9451C20.4839 6.82838 17.1716 3.51608 13 3.05493V5C13 5.55228 12.5523 6 12 6C11.4477 6 11 5.55228 11 5V3.05493C6.82838 3.51608 3.51608 6.82838 3.05493 11ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12Z'
                  fill='currentColor'
                ></path>
                <path
                  fill-rule='evenodd'
                  clip-rule='evenodd'
                  d='M10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12Z'
                  fill='currentColor'
                ></path>
              </g>
            </g>
          </svg>
          현재 내 위치 사용하기
        </button>

        {/* 칸나누기 ---------------------------------------------------------------*/}

        <div className={styles.list}>
          <ul>
            {location.map((itm, idx) => (
              <li
                key={idx}
                onClick={() => pickingName(itm)} // 익명함수 사용안하면 렌더링시에 바로실행됨} /*itm에서 글자를 쪼개서 xx동만 보이는 로직이 필요)*/
              >
                {itm}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root'),
  );
};

export default SelectLocationModal;
