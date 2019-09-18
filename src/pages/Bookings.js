import React, { useEffect, useState, useContext, Fragment } from "react";
import axios from "axios";
import AuthContext from "../context/auth-context";
import Spinner from "../components/UX/Spinner";
import BookingList from "../containers/BookingList";
import BookingChart from "../containers/BookingChart";
import BookingTabs from "../components/BookingTabs";

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [output, setOutput] = useState("List");
  const context = useContext(AuthContext);

  const retrieveBookings = () => {
    setIsLoading(true);
    const requestBody = {
      query: `
        query {
          bookings{
            _id
            createdAt
            event{
              _id
              title
              date
              description
              price
            }
          }
        }`
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
        console.log(data);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    retrieveBookings();
  }, []);

  const cancelBooking = bookingId => {
    console.log(bookingId);
    setIsLoading(true);
    const requestBody = {
      query: `
        mutation CancelBooking($id: ID!) {
          cancelBooking(bookingId: $id){
              _id
              title
            }
          }
        `,
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
        console.log(data);
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
        <div>
          {output === "List" ? (
            <BookingList bookings={bookings} cancelBooking={cancelBooking} />
          ) : (
            <BookingChart bookings={bookings} />
          )}
        </div>
      </Fragment>
    );
  }

  return <Fragment>{content}</Fragment>;
}

export default Bookings;
