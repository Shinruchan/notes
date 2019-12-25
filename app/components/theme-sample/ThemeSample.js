import React from 'react';

import styles from './ThemeSample.css';

export const ThemeSample = ({ theme }) => (
  <div theme={theme} className={styles.bg}>
    <div className={styles.sidebar}>N1</div>
    Note text
  </div>
);
