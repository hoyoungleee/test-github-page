import React from 'react';
import styles from './UserProfile.module.scss';

const UserProfile = ({ post, user }) => {
  function formatRelativeDate(realDateStr) {
    const realDate = new Date(realDateStr);
    const now = new Date();

    const diffMs = now - realDate;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffDay > 0) return `${diffDay}일 전`;
    if (diffHour > 0) return `${diffHour}시간 전`;
    if (diffMin > 0) return `${diffMin}분 전`;
    return `방금 전`;
  }

  const date = formatRelativeDate(post.realDate);
  return (
    <div className={styles.userCard}>
      <img className={styles.avatar} src={user.avatar} alt='프로필' />
      <div>
        <div className={styles.top}>
          <span className={styles.nickname}>{user.nickname}</span>
          <span className={styles.temperature}>{user.temperature}°C</span>
        </div>
        <div className={styles.meta}>
          <span>{user.location}</span>
          <span>{date}</span>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
