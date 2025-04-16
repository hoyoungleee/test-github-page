import React, { useState } from 'react';
import styles from './DownloadBanner.module.scss';
import QrCodeModal from '../modal/QrCodeModal';

const DownloadBanner = () => {
  // 모달 상태 관리
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  // 모달 열기 함수
  const openQrModal = () => {
    setIsQrModalOpen(true);
  };
  // 모달 닫기 함수
  const closeQrModal = () => {
    setIsQrModalOpen(false);
  };

  return (
    <div className={styles.downloadBanner}>
      <div className={styles.textSection}>
        <h2 className={styles.highlight}>당근에서 가까운 이웃과 함께해요.</h2>
        <h1 className={styles.title}>지금 바로 다운로드하기</h1>
        <div className={styles.buttons} onClick={openQrModal}>
          <img
            src='https://karrotmarket-com-sanity-cdn.krrt.io/production/49380c1c7e70e49f0f93baf0f790925eefc69082-120x40.svg'
            alt='App Store'
          />
          <img
            src='https://karrotmarket-com-sanity-cdn.krrt.io/production/0d8f72b8e4cdb98af115a7c1f04c4abf19f5c419-180x53.svg'
            alt='Google Play'
          />
        </div>
        {isQrModalOpen && <QrCodeModal onClose={closeQrModal} />}{' '}
        {/*모달 랜더링링*/}
      </div>
      <div className={styles.imageSection}>
        <img
          src='https://karrotmarket-com-sanity-cdn.krrt.io/production/14f9c8a3a87a8c0debf6c0d9063b508454441310-1280x1000.webp'
          alt='앱 UI 미리보기'
        />
      </div>
    </div>
  );
};

export default DownloadBanner;
