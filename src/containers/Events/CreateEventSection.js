import React from "react";

function CreateEventSection(props) {
  return (
    <div className="create-event">
      <h2>Add new events to our platform!</h2>
      <button
        className="create-event__btn"
        onClick={() => props.setIsModalOpen(true)}
      >
        Create Event
      </button>
    </div>
  );
}

export default CreateEventSection;
