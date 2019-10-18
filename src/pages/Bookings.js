import React, { useEffect, useState, useContext, Fragment } from "react";
import axios from "axios";
import AuthContext from "../context/auth-context";
import Spinner from "../components/UX/Spinner";
import BookingList from "../containers/BookingList";
import BookingChart from "../containers/BookingChart";
import BookingTabs from "../components/BookingTabs";
import ChartLegend from "../components/ChartLegend";
import { GET_BOOKINGS } from "../graphql/queries/index";
import { CANCEL_BOOKING } from "../graphql/mutations/index";

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [output, setOutput] = useState("List");
  const context = useContext(AuthContext);

  const retrieveBookings = () => {
    setIsLoading(true);
    const requestBody = {
      query: GET_BOOKINGS
    };

    axios
      .post("http://localhost:4000/graphql", requestBody, {
        headers: {
          Authorization: `Bearer ${context.token}`
        }
      })
      .then(data => {
        setIsLoading(false);
        const listOfBookings = data.data.data.bookings;
        setBookings(listOfBookings);
        // console.log(data);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    retrieveBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cancelBooking = bookingId => {
    setIsLoading(true);
    const requestBody = {
      query: CANCEL_BOOKING,
      variables: {
        id: bookingId
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
        const filteredBookings = bookings.filter(booking => {
          return booking._id !== bookingId;
        });
        setBookings(filteredBookings);
        // console.log(data);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  };

  let content = <Spinner />;

  if (!isLoading) {
    content = (
      <Fragment>
        <BookingTabs tabChange={setOutput} activeTab={output} />
        {bookings.length === 0 ? (
          <h2 style={{ margin: "4rem auto", textAlign: "center" }}>
            Currently you have not booked an event.
          </h2>
        ) : null}

        {output === "List" ? (
          <BookingList bookings={bookings} cancelBooking={cancelBooking} />
        ) : (
          <Fragment>
            <BookingChart bookings={bookings} />
            <ChartLegend />
          </Fragment>
        )}
      </Fragment>
    );
  }

  return <Fragment>{content}</Fragment>;
}

export default Bookings;
