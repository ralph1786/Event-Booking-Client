import React from "react";
import "./Message.scss";

function Message(props) {
  const { message, messageType, closeMessage } = props;
  return (
    <span
      className={
        messageType === "success" ? "success_message" : "error_message"
      }
    >
      {message} <button onClick={() => closeMessage()}>X</button>
    </span>
  );
}

export default Message;
