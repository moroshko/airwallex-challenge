import React, { useCallback } from "react";
import classNames from "classnames";
import styles from "./Input.module.css";

function Input({
  type,
  value,
  onChange,
  placeholder,
  fullWidth = false,
  hasError = false
}) {
  const onInputChange = useCallback(
    event => {
      onChange(event.target.value);
    },
    [onChange]
  );

  return (
    <input
      className={classNames(styles.input, {
        [styles.fullWidthInput]: fullWidth === true,
        [styles.inputWithError]: hasError === true
      })}
      type={type}
      value={value}
      onChange={onInputChange}
      placeholder={placeholder}
      spellCheck={false}
    />
  );
}

export default Input;
