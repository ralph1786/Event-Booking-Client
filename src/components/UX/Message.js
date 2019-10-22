import React from "react";
import "./Message.scss";

function Message(props) {
  const { message, messageType } = props;
  return (
    <span
      className={
        messageType === "success" ? "success_message" : "error_message"
      }
    >
      {message}
    </span>
  );
}

export default Message;
