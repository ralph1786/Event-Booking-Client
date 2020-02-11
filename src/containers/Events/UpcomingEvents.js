import React, { Fragment, useContext } from "react";
import EventCard from "../../components/UI/Cards/EventCard";
import AuthContext from "../../context/auth-context";

function UpcomingEvents(props) {
  const { upcomingEvents, authUserId, onViewDetail, deleteEvent } = props;

  const context = useContext(AuthContext);

  const upcomingEventsList = upcomingEvents
    .filter(event =>
      event.title.toLowerCase().includes(context.searchTerm.toLowerCase())
    )
    .map(event => (
      <EventCard
        key={event._id}
        event={event}
        userId={authUserId}
        creatorId={event.creator._id}
        onDetail={onViewDetail}
        deleteEvent={deleteEvent}
      />
    ));

  return (
    <Fragment>
      <h2>Upcoming Events</h2>
      <section className="event__list__upcomingEvents">
        <ul>{upcomingEventsList}</ul>
      </section>
    </Fragment>
  );
}

const arePropsEqual = (prevProps, nextProps) => {
  //   console.log("From memo", prevProps, nextProps);
  return (
    prevProps.upcomingEvents === nextProps.upcomingEvents &&
    prevProps.authUserId === nextProps.authUserId
  );
};

export default React.memo(UpcomingEvents, arePropsEqual);
