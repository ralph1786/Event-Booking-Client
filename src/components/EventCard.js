import React from "react";
import "./EventCard.scss";

export default function EventCard(props) {
  const { _id, title, price, date, poster } = props.event;
  return (
    <li className="event__list__item" key={_id}>
      <div>
        <img src={poster} alt={`${title} poster`} />
        <h2>{title}</h2>
        <h4>${price}</h4>
        <h4>Date: {new Date(date).toLocaleDateString()}</h4>
      </div>
      <div>
        {props.userId === props.creatorId ? (
          <p>Your Event</p>
        ) : (
          <button onClick={() => props.onDetail(_id)}>More Details</button>
        )}
      </div>
    </li>
  );
}
