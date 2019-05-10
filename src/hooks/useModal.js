import React, { useState } from "react";
import Line from "../shared/Line";
import styles from "./Modal.module.css";

function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => {
    setIsOpen(true);
  };
  const close = () => {
    setIsOpen(false);
  };
  const Modal = ({ width = 300, title, children }) => {
    return (
      isOpen && (
        <div className={styles.overlay} onClick={close}>
          <div
            className={styles.modal}
            style={{ maxWidth: width }}
            onClick={e => {
              e.stopPropagation();
            }}
          >
            <button className={styles.closeButton} onClick={close}>
              ✕
            </button>
            <div className={styles.title}>{title}</div>
            <Line type="primary" width={50} />
            {children}
          </div>
        </div>
      )
    );
  };

  return [
    Modal,
    {
      isOpen,
      open,
      close
    }
  ];
}

export default useModal;
