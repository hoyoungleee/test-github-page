import React from 'react';
import style from './QrCodeModal.module.scss';
import QRCode from 'react-qr-code';

const QrCodeModal = ({ onClose }) => {
  const qrCodeUrl = "https://daangn.onelink.me/oWdR?af_dp=karrot%3A%2F%2Farticles%2F951440097&deep_link_value=karrot%3A%2F%2Farticles%2F951440097&af_force_deeplink=true";

  return (
    <div className={style.modalOverlay}>
      <div className={style.modalContent}>
        <div className={style.modalHeader}>
          <h2 className={style.modalTitle}>QR 코드 스캔</h2>
          <button onClick={onClose} className={style.closeButton}>
            <span aria-hidden="true">&times;</span> {/* X 아이콘 */}
          </button>
        </div>
        <div className={style.modalBody}>
          <p className={style.mainText}>당근 앱으로 열기</p>
          <div className={style.qrCode}>
            {/* QRCode 컴포넌트 사용 */}
            <QRCode value={qrCodeUrl} size={150} level="H" />
          </div>
          <p className={style.subText}>
            모바일에서만 이용할 수 있어요.<br />
            휴대 전화의 카메라 또는 당근 앱으로 QR코드를 촬영해주세요.
          </p>
        </div>
      </div>
    </div>
  );
};

export default QrCodeModal;