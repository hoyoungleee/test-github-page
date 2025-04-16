import React from 'react';
import MainNav from '../components/MainNav';
import styles from './IndexPage.module.scss';
import Module from '../components/hajoon/Module';
import SearchBar from '../components/hajoon/SearchBar';
import Category from '../components/hajoon/Category';
import Hometown from '../components/hajoon/Hometown';
import AuthProvider from '../components/hajoon/context/Location.jsx';

const IndexPage = () => {
  return (
    <AuthProvider>
      <div className={styles.indexpage}>
        <Module />
        <SearchBar />
        <Category />
        <Hometown />
      </div>
    </AuthProvider>
  );
};

export default IndexPage;
