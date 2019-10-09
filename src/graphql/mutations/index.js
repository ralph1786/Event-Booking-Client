export const CREATE_USER = `
        mutation CreateUser($email: String!, $password: String!) {
          createUser(userInput: {email: $email, password: $password}){
            _id
            email
          }
        }`;

export const CANCEL_BOOKING = `
        mutation CancelBooking($id: ID!) {
          cancelBooking(bookingId: $id){
              _id
              title
            }
          }
        `;

export const CREATE_EVENT = `
        mutation CreateEvent($title: String!, $description: String!, $price: Float!, $poster: String!, $date: String!) {
          createEvent(eventInput: {title: $title, description: $description, price: $price, poster: $poster, date: $date}){
            _id
            title
            description
            date
            price
            poster
            creator {
              _id
            }
          }
        }`;

export const BOOK_EVENT = `
        mutation BookEvent($id: ID!){
          bookEvent (eventId: $id){
            _id
            createdAt
            updatedAt
          }
        }`;
