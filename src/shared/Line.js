import React from "react";
import classNames from "classnames";
import styles from "./Line.module.css";

function Line({ type, width }) {
  return (
    <div
      className={classNames(styles.line, {
        [styles.primaryLine]: type === "primary",
        [styles.secondaryLine]: type === "secondary"
      })}
      style={{ width }}
    />
  );
}

export default Line;
