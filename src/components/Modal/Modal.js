import { useEffect } from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";
const modalRoot = document.querySelector("#modal-root");
export default function Modal({ onClose, children }) {
  useEffect(() => {
    const onCloseModal = (e) => {
      if (e.code === "Escape" || e.currentTarget === e.target) {
        onClose();
      }
    };
    window.addEventListener("keydown", onCloseModal);
    return () => {
      window.removeEventListener("keydown", onCloseModal);
    };
  }, [onClose]);

  return createPortal(
    <div className={styles.Overlay} onClick={onClose}>
      <div className={styles.Modal}>{children}</div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
