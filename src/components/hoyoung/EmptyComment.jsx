import React, { useState } from 'react';
import styles from './EmptyComment.module.scss';
import QrCodeModal from '../modal/QrCodeModal';

const EmptyComment = () => {
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
    <>
      <div className={styles.emptyComment} onClick={openQrModal}>
        <p>아직 댓글이 없어요</p>
        <p>가장 먼저 댓글을 남겨보세요.</p>
        <button className={styles.writeBtn}>댓글 쓰기</button>
      </div>
      {isQrModalOpen && <QrCodeModal onClose={closeQrModal} />}{' '}
    </>
  );
};

export default EmptyComment;
