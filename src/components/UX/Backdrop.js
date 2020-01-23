import React from "react";
import Message from "./Message";
import "./Backdrop.scss";

function Backdrop({ closeModal, errorMessage, closeMessage }) {
  return (
    <div onClick={() => closeModal(false)} className="backdrop">
      {errorMessage ? (
        <Message message={errorMessage} closeMessage={closeMessage} />
      ) : null}
    </div>
  );
}

export default Backdrop;
