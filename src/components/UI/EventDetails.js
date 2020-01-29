import React, { Fragment } from "react";

function EventDetails(props) {
  const { title, price, date, description } = props.selectedEvent;
  return (
    <Fragment>
      <h2>{title}</h2>
      <h4>Price: ${price}</h4>
      <h4>Date: {new Date(date).toLocaleDateString()}</h4>
      <p>{description}</p>
    </Fragment>
  );
}

export default EventDetails;
