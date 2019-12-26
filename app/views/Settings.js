import React, { useEffect } from 'react';
import { useSelector, useAction } from 'redux-zero/react';
import { Link } from 'react-router-dom';
import { X } from 'react-feather';

import { ThemeSample } from '../components';

import styles from './Settings.css';
import { Actions } from '../store';

export const Settings = () => {
  const themes = useSelector(({ themes }) => themes);
  const selected = useSelector(({ theme }) => theme);
  const changeTheme = useAction(Actions.changeTheme);

  return (
    <div className={styles.wrapper}>
      <Link className={styles.close} to="/">
        <X />
      </Link>

      <h2>Theme</h2>
      <p>
        Change the appearance of the application. Select one of the prepared
        themes:
      </p>
      <br />
      {themes.map((theme, i) => (
        <div
          className={`${styles.themeLine} ${
            theme === selected ? styles.selected : undefined
          }`}
          key={i}
          onClick={() => changeTheme(theme)}
        >
          <p>{theme.charAt(0).toUpperCase() + theme.slice(1)}</p>
          <ThemeSample theme={theme} />
        </div>
      ))}
    </div>
  );
};
