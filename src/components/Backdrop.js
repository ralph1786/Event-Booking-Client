import React from "react";
import "./Backdrop.scss";

function Backdrop({ closeModal, errorMessage }) {
  return (
    <div onClick={() => closeModal(false)} className="backdrop">
      {errorMessage ? <p>{errorMessage}</p> : ""}
    </div>
  );
}

export default Backdrop;
