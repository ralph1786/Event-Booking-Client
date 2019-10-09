export const LOGIN_USER = `
        query LoginUser($email: String!, $password: String!){
          login(email: $email, password: $password){
            userId
            token
            tokenExpiration
          }
        }
      `;

export const GET_BOOKINGS = `
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
              poster
            }
          }
        }`;

export const GET_ALL_EVENTS = `
        query {
          events{
            _id
            title
            description
            date
            price
            poster
            creator {
              _id
              email
            }
          }
        }`;
