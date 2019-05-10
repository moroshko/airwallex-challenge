import React from "react";
import classNames from "classnames";
import styles from "./Button.module.css";

function Button({
  size = "small",
  fullWidth = false,
  type = "button",
  disabled = false,
  onClick,
  children
}) {
  return (
    <button
      className={classNames(styles.button, {
        [styles.largeButton]: size === "large",
        [styles.fullWidthButton]: fullWidth
      })}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
