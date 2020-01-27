import React from "react";
import "./Modal.scss";

function Modal(props) {
  const { canConfirm, onConfirm, confirmText, onCancel, title } = props;
  return (
    <div className="modal">
      <header className="modal__header">
        <h1>{title}</h1>
      </header>
      <section className="modal__content">{props.children}</section>
      <section className="modal__actions">
        {canConfirm && localStorage.getItem("token") ? (
          <button onClick={onConfirm}>{confirmText}</button>
        ) : null}
        {props.canCancel && <button onClick={onCancel}>Close</button>}
      </section>
    </div>
  );
}

export default Modal;
