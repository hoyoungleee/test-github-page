import React from 'react';
import styles from './SideMenu.module.scss';
import { Link } from 'react-router-dom';

const SideMenu = ({ categorys }) => {
  return (
    <aside className={styles.sideMenu}>
      <Link
        to={`/community?hot=hot`}
        onClick={() => window.scrollTo(0, 0)}
        className={styles.link}
      >
        <h3 className={styles.sideMenu__title}>
          <img
            src='https://img.kr.gcp-karroter.net/community-admin/community-admin/20250305/d5439251-5e14-427e-bc05-23610b348d5b.png'
            alt='불꽃'
            className={styles.fire}
          />
          인기글
        </h3>
      </Link>
      <ul className={styles.sideMenu__list}>
        <Link
          to={`/community`}
          onClick={() => window.scrollTo(0, 0)}
          className={styles.link}
        >
          <li>전체</li>
        </Link>
        {categorys.map((category) => (
          <Link
            key={Math.random()}
            to={`/community?category=${category}`}
            onClick={() => window.scrollTo(0, 0)}
            className={styles.link}
          >
            <li>{category}</li>
          </Link>
        ))}
      </ul>
    </aside>
  );
};

export default SideMenu;
