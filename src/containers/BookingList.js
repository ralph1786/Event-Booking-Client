import React from "react";
import BookingCard from "../components/BookingCard";
import "./BookingList.scss";

function BookingList(props) {
  const { bookings, cancelBooking } = props;

  const listOfBookings = bookings.map(booking => (
    <BookingCard
      key={booking._id}
      booking={booking}
      cancelBooking={cancelBooking}
    />
  ));
  return <ul className="bookings__list">{listOfBookings}</ul>;
}

export default BookingList;
