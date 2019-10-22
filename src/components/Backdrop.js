import React from "react";
import Message from "./UX/Message";
import "./Backdrop.scss";

function Backdrop({ closeModal, errorMessage }) {
  return (
    <div onClick={() => closeModal(false)} className="backdrop">
      {errorMessage ? <Message message={errorMessage} /> : null}
    </div>
  );
}

export default Backdrop;
