import React, { Fragment, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import "./App.scss";
import AuthPage from "./pages/Auth";
import BookingsPage from "./pages/Bookings";
import EventsPage from "./pages/Events";
import Navbar from "./components/Navbar";
import AuthContext from "./context/auth-context";

function App() {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  // const storageToken = localStorage.getItem("token");

  const login = (token, userId, tokenExpiration) => {
    setToken(token);
    setUserId(userId);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
    localStorage.clear();
  };

  return (
    <Router>
      <Fragment>
        <AuthContext.Provider
          value={{ token: token, userId: userId, login: login, logout: logout }}
        >
          <Navbar />
          <main className="main-content">
            <Switch>
              {/* {!token && <Redirect from="/" to="/auth" exact />}
              {!token && <Redirect from="/bookings" to="/auth" exact />}
              {token && <Redirect from="/" to="/events" exact />}
              {token && <Redirect from="/auth" to="/events" exact />} */}
              {/* {!token && <Route path="/auth" render={() => <AuthPage />} />}
              <Route path="/events" render={() => <EventsPage />} />
              {token && (
                <Route path="/bookings" render={() => <BookingsPage />} />
              )} */}
              <Route path="/auth" exact render={() => <AuthPage />} />
              <Route
                path="/auth"
                render={() =>
                  localStorage.getItem("token") ? (
                    <Redirect to="/events" />
                  ) : (
                    <AuthPage />
                  )
                }
              />
              <Route path="/events" render={() => <EventsPage />} />
              <Route
                path="/bookings"
                render={() =>
                  localStorage.getItem("token") ? (
                    <BookingsPage />
                  ) : (
                    <Redirect to="/auth" />
                  )
                }
              />
            </Switch>
          </main>
        </AuthContext.Provider>
      </Fragment>
    </Router>
  );
}

export default App;
