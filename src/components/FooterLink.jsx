import React from 'react';
import styles from './Footer.module.scss';
import { GoArrowUpRight } from 'react-icons/go';

const FooterLink = ({ href, children, hasArrow }) => {
  return (
    <a href={href} className={styles.link}>
      {children}
      {hasArrow && <GoArrowUpRight className={styles.arrow} />}
    </a>
  );
};

export default FooterLink;
