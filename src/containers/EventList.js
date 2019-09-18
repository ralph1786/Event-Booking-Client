import React from "react";
import EventCard from "../components/EventCard";
import "./EventList.scss";

function EventList(props) {
  const { events, authUserId } = props;

  const eventsList = events.map(event => (
    <EventCard
      key={event._id}
      event={event}
      userId={authUserId}
      creatorId={event.creator._id}
      onDetail={props.onViewDetail}
    />
  ));
  return (
    <section className="event__list">
      <ul>{eventsList}</ul>
    </section>
  );
}

export default EventList;
