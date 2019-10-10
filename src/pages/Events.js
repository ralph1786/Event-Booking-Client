import React, {
  Fragment,
  useState,
  useRef,
  useContext,
  useEffect
} from "react";
import "./Events.scss";
import Modal from "../components/Modal";
import Backdrop from "../components/Backdrop";
import EventList from "../containers/EventList";
import axios from "axios";
import AuthContext from "../context/auth-context";
import Spinner from "../components/UX/Spinner";
import { GET_ALL_EVENTS } from "../graphql/queries/index";
import {
  CREATE_EVENT,
  BOOK_EVENT,
  DELETE_EVENT
} from "../graphql/mutations/index";

function Events() {
  //state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  //refs
  const titleRef = useRef("");
  const priceRef = useRef(0);
  const posterRef = useRef("");
  const dateRef = useRef("");
  const descriptionRef = useRef("");

  //context
  const context = useContext(AuthContext);

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
    setErrorMessage("");
  };

  const fetchEvents = () => {
    setIsLoading(true);
    const requestBody = {
      query: GET_ALL_EVENTS
    };

    axios
      .post("http://localhost:4000/graphql", requestBody)
      .then(data => {
        setIsLoading(false);
        const listOfEvents = data.data.data.events;
        setEvents(listOfEvents);
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
    const title = titleRef.current.value;
    const poster = posterRef.current.value;
    const price = +priceRef.current.value; //the + sign turns it into a number
    const date = dateRef.current.value;
    const description = descriptionRef.current.value;

    if (
      title.trim().length === 0 ||
      poster.trim().length === 0 ||
      price <= 0 ||
      date.trim().length === 0 ||
      description.trim().length === 0
    ) {
      setErrorMessage("All Fields Required!");
      return;
    }
    setIsModalOpen(false);
    const requestBody = {
      query: CREATE_EVENT,
      variables: {
        title: title,
        description: description,
        poster: poster,
        price: price,
        date: date
      }
    };

    axios
      .post("http://localhost:4000/graphql", requestBody, {
        headers: {
          Authorization: `Bearer ${context.token}`
        }
      })
      .then(data => {
        const createdEvent = data.data.data.createEvent;
        setEvents([...events, createdEvent]);
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
    const requestBody = {
      query: BOOK_EVENT,
      variables: {
        id: selectedEvent._id
      }
    };

    axios
      .post("http://localhost:4000/graphql", requestBody, {
        headers: {
          Authorization: `Bearer ${context.token}`
        }
      })
      .then(data => {
        setIsLoading(false);
        setSelectedEvent(null);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const deleteEvent = async eventId => {
    const requestBody = {
      query: DELETE_EVENT,
      variables: {
        id: eventId
      }
    };

    try {
      await axios.post("http://localhost:4000/graphql", requestBody, {
        headers: {
          Authorization: `Bearer ${context.token}`
        }
      });
      const filteredEvents = events.filter(event => event._id !== eventId);
      setEvents(filteredEvents);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      {(isModalOpen || selectedEvent) && (
        <Backdrop closeModal={closeModal} errorMessage={errorMessage} />
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
          <form>
            <div className="form-control">
              <label htmlFor="title">Title</label>
              <input type="text" id="title" ref={titleRef} autoFocus />
            </div>
            <div className="form-control">
              <label htmlFor="price">Price</label>
              <input type="number" id="price" ref={priceRef} />
            </div>
            <div className="form-control">
              <label htmlFor="poster">Poster</label>
              <input type="text" id="poster" ref={posterRef} />
            </div>
            <div className="form-control">
              <label htmlFor="date">Date</label>
              <input type="datetime-local" id="date" ref={dateRef} />
            </div>
            <div className="form-control">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                cols="25"
                rows="7"
                ref={descriptionRef}
              ></textarea>
            </div>
          </form>
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
          <h2>{selectedEvent.title}</h2>
          <h4>Price: ${selectedEvent.price}</h4>
          <h4>Date: {new Date(selectedEvent.date).toLocaleDateString()}</h4>
          <p>{selectedEvent.description}</p>
        </Modal>
      )}

      {context.token && (
        <div className="create-event">
          <h2>Add new events to our platform!</h2>
          <button
            className="create-event__btn"
            onClick={() => setIsModalOpen(true)}
          >
            Create Event
          </button>
        </div>
      )}
      {isLoading ? (
        <Spinner />
      ) : (
        <EventList
          events={events}
          authUserId={context.userId}
          onViewDetail={showEventDetails}
          deleteEvent={deleteEvent}
        />
      )}
    </Fragment>
  );
}

export default Events;
