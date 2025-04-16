import React, { useState, useContext } from 'react';
import styles from './SearchButton.module.scss';
import SelectLocationModal from '../modal/SelectLocationModal';
import AuthContext from '../context/Location.js';

const SearchButton = () => {
  // 클릭시 모달을 띄우는 상태 변수
  const [showLoc, setShowLoc] = useState(false);
  //모달을 열어주는 핸들러
  const openModal = () => {
    setShowLoc(true);
  };
  //모달을 닫아주는 핸들러
  const closeModal = () => {
    setShowLoc(false);
  };

  const { myLocation } = useContext(AuthContext); // 버튼에 나타낼 동,읍,면을 전역에서 가져올거임

  return (
    <>
      {showLoc && <SelectLocationModal close={closeModal} />}

      <button
        className={styles.searchButton}
        onClick={() => {
          openModal();
        }}
      >
        <svg
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          data-seed-icon='true'
          data-seed-icon-version='0.0.10'
          width='24'
          height='24'
          class='m6y31u5 sprinkles_marginRight_1_base__1byufe8m6'
        >
          <g>
            <path
              d='M12.0022 0.498047C6.10466 0.498047 2.06836 4.96307 2.06836 10.4215C2.06836 14.28 4.55706 17.553 6.82617 19.7593C7.98687 20.8782 9.1371 21.7775 10.005 22.3944C10.4679 22.7331 10.9513 23.0575 11.448 23.346C11.7722 23.5342 12.2218 23.5551 12.546 23.3669C13.0436 23.078 13.5163 22.7313 13.989 22.4049C14.8569 21.7879 16.0072 20.8887 17.1679 19.7698C19.437 17.5634 21.9257 14.3009 21.9257 10.4319C21.9361 4.96307 17.8998 0.498047 12.0022 0.498047ZM12.0022 14.4787C9.76451 14.4787 7.94504 12.6592 7.94504 10.4215C7.94504 8.18374 9.76451 6.36427 12.0022 6.36427C14.24 6.36427 16.0595 8.18374 16.0595 10.4215C16.0595 12.6592 14.24 14.4787 12.0022 14.4787Z'
              fill='currentColor'
            ></path>
          </g>
        </svg>
        {myLocation ? myLocation : '서초동'}
        <svg
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          data-seed-icon='true'
          data-seed-icon-version='0.0.10'
          width='14'
          height='14'
          class='m6y31u6 sprinkles_marginLeft_1_base__1byufe8oa'
        >
          <g>
            <path
              fill-rule='evenodd'
              clip-rule='evenodd'
              d='M21.3991 6.93106C20.9192 6.47398 20.1596 6.49248 19.7025 6.97238L11.9995 15.06L4.29762 6.97244C3.84057 6.49251 3.081 6.47396 2.60107 6.93101C2.12114 7.38805 2.10258 8.14762 2.55963 8.62756L11.1305 17.6276C11.357 17.8654 11.671 18 11.9994 18C12.3278 18 12.6419 17.8654 12.8684 17.6276L21.4404 8.62762C21.8975 8.14771 21.879 7.38814 21.3991 6.93106Z'
              fill='currentColor'
            ></path>
          </g>
        </svg>
      </button>
    </>
  );
};

export default SearchButton;
