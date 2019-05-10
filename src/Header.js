import React from "react";
import Logo from "./Logo";
import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <Logo />
        <span className={styles.companyName}>BROCCOLI &amp; CO.</span>
      </div>
    </header>
  );
}

export default Header;
