import React from "react";
import "./BookingCard.scss";

function BookingCard(props) {
  const { booking } = props;
  return (
    <li className="bookings__item">
      <div>
        <img src={booking.event.poster} alt="a poster for the booked event" />
        <h2>{booking.event.title}</h2>
        <h4>{new Date(booking.createdAt).toLocaleDateString()}</h4>
        <p>{booking.event.description}</p>
      </div>
      <div>
        <button onClick={() => props.cancelBooking(booking._id)}>Cancel</button>
      </div>
    </li>
  );
}

export default BookingCard;
