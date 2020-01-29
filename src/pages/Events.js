import React, { Fragment, useState, useContext, useEffect } from "react";
import "./Events.scss";
import Modal from "../components/UI/Modal";
import Backdrop from "../components/UX/Backdrop";
import EventList from "../containers/Events/EventList";
import CreateEventForm from "../components/UI/Forms/CreateEventForm";
import EventDetails from "../components/UI/EventDetails";
import axios from "axios";
import AuthContext from "../context/auth-context";
import Spinner from "../components/UX/Spinner";
import CreateEventSection from "../containers/Events/CreateEventSection";
import { inputValidation } from "../Validations/inputValidation";
import {
  deleteEventHelper,
  createEventHelper,
  bookEventHelper
} from "../helpers/httpRequests";
import { GET_ALL_EVENTS } from "../graphql/queries/index";

function Events() {
  //state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [events, setEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);

  //state form
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [poster, setPoster] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  //context
  const context = useContext(AuthContext);

  const url = "http://localhost:4000/graphql";

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
    setErrorMessage("");
    setTitle("");
    setPrice(0);
    setPoster("");
    setDate("");
    setDescription("");
  };

  const fetchEvents = () => {
    setIsLoading(true);
    const requestBody = {
      query: GET_ALL_EVENTS
    };

    axios
      .post(url, requestBody)
      .then(data => {
        setIsLoading(false);
        const listOfEvents = data.data.data.events;
        setEvents(listOfEvents);
        let currentYear = new Date().getFullYear();
        let currentMonth = new Date().getMonth();
        let currentDay = new Date().getDate();
        // eslint-disable-next-line no-unused-vars
        for (let event of listOfEvents) {
          let eventDate = event.date.split("/");
          let eventMonth = parseInt(eventDate[0]);
          let eventDay = parseInt(eventDate[1]);
          let eventYear = parseInt(eventDate[2]);
          if (currentYear > eventYear || currentMonth > eventMonth) {
            if (currentDay > eventDay) {
              setPastEvents(prevState => [...prevState, event]);
            }
          } else {
            setUpcomingEvents(prevState => [...prevState, event]);
          }
        }
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const createEvent = () => {
    if (inputValidation(title, poster, price, date, description)) {
      setErrorMessage("All Fields Required!");
      return;
    }
    setIsModalOpen(false);
    let token = context.token;
    createEventHelper(title, description, poster, price, date, token)
      .then(data => {
        const createdEvent = data.data.data.createEvent;
        setUpcomingEvents([...upcomingEvents, createdEvent]);
      })
      .catch(err => console.log(err));
  };

  const showEventDetails = eventId => {
    const chosenEvent = events.find(event => event._id === eventId);
    setSelectedEvent(chosenEvent);
  };

  const bookEvent = () => {
    if (!context.token) {
      setSelectedEvent(null);
      return;
    }
    setIsLoading(true);
    let selectedEventId = selectedEvent._id;
    let token = context.token;
    bookEventHelper(selectedEventId, token)
      .then(() => {
        setIsLoading(false);
        setSelectedEvent(null);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const deleteEvent = eventId => {
    if (!window.confirm("Sure you want to delete this event?")) {
      return;
    }
    let token = context.token;
    deleteEventHelper(eventId, token);
    const upcomingFilteredEvents = upcomingEvents.filter(
      event => event._id !== eventId
    );
    const pastFilteredEvents = pastEvents.filter(
      event => event._id !== eventId
    );
    setUpcomingEvents(upcomingFilteredEvents);
    setPastEvents(pastFilteredEvents);
  };

  const closeMessage = () => {
    setErrorMessage("");
  };

  return (
    <Fragment>
      {(isModalOpen || selectedEvent) && (
        <Backdrop
          closeModal={closeModal}
          errorMessage={errorMessage}
          closeMessage={closeMessage}
        />
      )}
      {isModalOpen && (
        <Modal
          title="Add Event"
          canCancel
          canConfirm
          onCancel={closeModal}
          onConfirm={createEvent}
          confirmText="Create"
        >
          <CreateEventForm
            title={title}
            price={price}
            poster={poster}
            date={date}
            description={description}
            setTitle={setTitle}
            setPrice={setPrice}
            setPoster={setPoster}
            setDate={setDate}
            setDescription={setDescription}
          />
        </Modal>
      )}
      {selectedEvent && (
        <Modal
          title={selectedEvent.title}
          canCancel
          canConfirm
          onCancel={closeModal}
          onConfirm={bookEvent}
          confirmText="Book"
        >
          <EventDetails selectedEvent={selectedEvent} />
        </Modal>
      )}

      {context.token && (
        <CreateEventSection setIsModalOpen={() => setIsModalOpen(true)} />
      )}
      {isLoading ? (
        <Spinner />
      ) : (
        <EventList
          upcomingEvents={upcomingEvents}
          pastEvents={pastEvents}
          authUserId={context.userId}
          onViewDetail={showEventDetails}
          deleteEvent={deleteEvent}
        />
      )}
    </Fragment>
  );
}

export default Events;
