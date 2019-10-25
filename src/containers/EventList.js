import React, { useContext } from "react";
import EventCard from "../components/EventCard";
import AuthContext from "../context/auth-context";
import "./EventList.scss";

function EventList(props) {
  const { events, authUserId } = props;
  const context = useContext(AuthContext);

  const eventsList = events
    .filter(event =>
      event.title.toLowerCase().includes(context.searchTerm.toLowerCase())
    )
    .map(event => (
      <EventCard
        key={event._id}
        event={event}
        userId={authUserId}
        creatorId={event.creator._id}
        onDetail={props.onViewDetail}
        deleteEvent={props.deleteEvent}
      />
    ));
  return (
    <section className="event__list">
      <ul>{eventsList}</ul>
    </section>
  );
}

export default EventList;
