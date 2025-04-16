import React from 'react';
import style from './SellerInfo.module.scss';

const SellerInfo = ({ profile: profileUrl, nickname, location, temperature }) => {
  const getMannerEmoji = (temp) => {
    if (!temp) return '';
    if (temp >= 70) return '😇';
    if (temp >= 50) return '😊';
    if (temp >= 36.5) return '🙂';
    if (temp >= 25) return '😐';
    return '🤔';
  };

  const getTemperatureColorClass = (temp) => {
    if (!temp) return '';
    if (temp >= 50) return style.tempHigh;
    if (temp >= 36.5) return style.tempNormal;
    return style.tempLow;
  };

  return (
    <div className={style.sellerInfoContainer}>
      <div className={style.profilePicWrapper}>
        <img src={profileUrl} alt={`${nickname} 프로필`} className={style.profilePic}/>
      </div>

      <div className={style.profileDetails}>
        <span className={style.nickname}>{nickname}</span>
        <span className={style.location}>{location}</span>
      </div>

      <div className={style.mannerTempWrapper}>
        <div className={style.tempInfo}>
          <span className={`${style.temperatureValue} ${getTemperatureColorClass(temperature)}`}>
            {temperature ? `${temperature}°C` : '-'}
          </span>
          <span className={style.mannerEmoji}>{getMannerEmoji(temperature)}</span>
        </div>
        <span className={style.mannerLabel}>매너온도</span>
      </div>
    </div>
  );
};

export default SellerInfo;