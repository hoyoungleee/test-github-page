import React from 'react';
import styles from './Footer.module.scss';
import FooterLink from './FooterLink';

const FooterColumn = ({ title, links }) => {
  return (
    <div className={styles.column}>
      <h3 className={styles.columnTitle}>{title}</h3>
      <ul className={styles.linkList}>
        {links.map((link, index) => (
          <li key={index}>
            <FooterLink href={link.url} hasArrow={link.hasArrow}>
              {link.name}
            </FooterLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterColumn;
