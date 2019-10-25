import React from "react";

const authContext = React.createContext({
  token: null,
  userId: null,
  login: (token, userId, tokenExpiration) => {},
  logout: () => {},
  searchTerm: ""
});

export default authContext;
