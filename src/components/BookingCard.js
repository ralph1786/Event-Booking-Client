import React from "react";
import "./BookingCard.scss";

function BookingCard(props) {
  const { booking } = props;
  console.log(booking);
  return (
    <li className="bookings__item">
      <div>
        <h2>{booking.event.title}</h2>
        <h4>{new Date(booking.createdAt).toLocaleDateString()}</h4>
        <p>{booking.event.description}</p>
      </div>
      <div>
        <button onClick={() => props.cancelBooking(booking._id)}>
          Cancel Booking
        </button>
      </div>
    </li>
  );
}

export default BookingCard;
