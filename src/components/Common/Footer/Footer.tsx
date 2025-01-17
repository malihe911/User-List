// src/components/Footer/Footer.tsx
import React from "react";
import styles from "./Footer.module.scss";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.text}>© 2025 My App. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
