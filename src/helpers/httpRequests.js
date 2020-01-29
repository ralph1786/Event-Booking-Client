import axios from "axios";
import {
  DELETE_EVENT,
  CREATE_EVENT,
  BOOK_EVENT
} from "../graphql/mutations/index";

const url = "http://localhost:4000/graphql";

export const deleteEventHelper = async (eventId, token) => {
  const requestBody = {
    query: DELETE_EVENT,
    variables: {
      id: eventId
    }
  };

  try {
    await axios.post(url, requestBody, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const createEventHelper = (
  title,
  description,
  poster,
  price,
  date,
  token
) => {
  const requestBody = {
    query: CREATE_EVENT,
    variables: {
      title: title,
      description: description,
      poster: poster,
      price: parseFloat(price),
      date: date
    }
  };
  return axios.post(url, requestBody, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const bookEventHelper = (selectedEventId, token) => {
  const requestBody = {
    query: BOOK_EVENT,
    variables: {
      id: selectedEventId
    }
  };

  return axios.post(url, requestBody, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
