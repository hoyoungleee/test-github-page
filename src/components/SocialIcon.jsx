import React from 'react';
import styles from './Footer.module.scss';

const SocialIcon = ({ href, children }) => {
  return (
    <a
      href={href}
      className={styles.socialIcon}
      target='_blank'
      rel='noopener noreferrer'
    >
      {children}
    </a>
  );
};

export default SocialIcon;
