import React, { Fragment, useContext } from "react";
import AuthContext from "../../context/auth-context";
import EventCard from "../../components/Cards/EventCard";

function PastEvents(props) {
  const context = useContext(AuthContext);

  const { pastEvents, authUserId, onViewDetail, deleteEvent } = props;

  const pastEventsList = pastEvents
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
      <h2>Past Events</h2>
      <section className="event__list__pastEvents">
        <ul>{pastEventsList}</ul>
      </section>
    </Fragment>
  );
}

const arePropsEqual = (prevProps, nextProps) => {
  return (
    prevProps.pastEvents === nextProps.pastEvents &&
    prevProps.authUserId === nextProps.authUserId
  );
};

export default React.memo(PastEvents, arePropsEqual);
