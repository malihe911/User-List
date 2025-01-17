import React from "react";
import styles from "./Header.module.scss";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.title}>My App</h1>
        <nav className={styles.nav}>
          <a href="/" className={styles.navItem}>
            Home
          </a>
          <a href="/user" className={styles.navItem}>
            Users
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
