import React from "react";
import UpcomingEvents from "./UpcomingEvents";
import PastEvents from "./PastEvents";
import "./EventList.scss";

function EventList(props) {
  const {
    authUserId,
    upcomingEvents,
    pastEvents,
    onViewDetail,
    deleteEvent
  } = props;

  return (
    <main className="event__list">
      <UpcomingEvents
        upcomingEvents={upcomingEvents}
        authUserId={authUserId}
        onViewDetail={onViewDetail}
        deleteEvent={deleteEvent}
      />
      <hr />
      <PastEvents
        pastEvents={pastEvents}
        authUserId={authUserId}
        onViewDetail={onViewDetail}
        deleteEvent={deleteEvent}
      />
    </main>
  );
}

export default EventList;
