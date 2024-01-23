import React from 'react';
import {Link, Outlet} from "react-router-dom";
import styles from './layout.module.css'

const Layout = () => {
  return (
    <div>
      <nav className={styles.topBar}>
        <Link to='/'>
          <p>Home</p>
        </Link>

        <Link to='/carousel'>
          <p>Carousel</p>
        </Link>

        <Link to='/form'>
          <p>Form</p>
        </Link>
      </nav>
      <Outlet />
    </div>

  );
};

export default Layout;
