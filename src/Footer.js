import React from "react";
import Line from "./shared/Line";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <Line type="secondary" width={30} />
      Made with{" "}
      <span role="img" aria-label="love">
        ❤️
      </span>
      in Melbourne.
      <br />© {new Date().getFullYear()} Broccoli &amp; Co. All rights reserved.
    </footer>
  );
}

export default Footer;
