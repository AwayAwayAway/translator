import React from 'react';
import styles from './TopNav.module.css';
import { NavLink } from 'react-router-dom';

const TopNav: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <h1>Translator</h1>
      <nav>
        <NavLink className={({ isActive }) => (isActive ? styles.activeLink : '')} to="/translator">
          Translator
        </NavLink>
        <NavLink className={({ isActive }) => (isActive ? styles.activeLink : '')} to="/favourites">
          Favourites
        </NavLink>
      </nav>
    </div>
  );
};

export default TopNav;
