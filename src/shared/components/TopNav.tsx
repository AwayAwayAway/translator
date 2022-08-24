import React from 'react';
import styles from './TopNav.module.css';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { toggleStyleMode } from '../../features/slice/styleModeSLice';

const TopNav: React.FC = () => {
  const dispatch = useAppDispatch();
  const isLightMode = useAppSelector((state) => state.style.isLightMode);

  return (
    <div className={styles.wrapper} id={isLightMode ? 'light' : 'dark-main'}>
      <h1>Translator</h1>
      <nav style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <NavLink className={({ isActive }) => (isActive ? styles.activeLink : '')} to="/translator">
          Translator
        </NavLink>
        <NavLink className={({ isActive }) => (isActive ? styles.activeLink : '')} to="/favourites">
          Favourites
        </NavLink>
        <i className={isLightMode ? 'pi pi-moon' : 'pi pi-sun'} onClick={() => dispatch(toggleStyleMode())} />
      </nav>
    </div>
  );
};

export default TopNav;
