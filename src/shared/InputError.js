import React from "react";
import styles from "./InputError.module.css";

function InputError({ message }) {
  return <div className={styles.errorMessage}>{message}</div>;
}

export default InputError;
