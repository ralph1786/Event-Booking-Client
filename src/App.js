import React, { Fragment, useState, useEffect } from "react";
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
import WelcomePage from "./components/WelcomePage";
import SideDrawer from "./containers/SideDrawer";
import BackDrop from "./components/Backdrop";

function App() {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sideDrawer, setSideDrawer] = useState(false);

  const login = (token, userId, tokenExpiration) => {
    setToken(token);
    setUserId(userId);
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
    localStorage.clear();
  };

  const searchTermHandler = eventTitle => {
    setSearchTerm(eventTitle);
  };

  const toggleSideDrawer = () => {
    setSideDrawer(!sideDrawer);
  };

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setUserId(localStorage.getItem("userId"));
  }, []);

  return (
    <Router>
      <Fragment>
        <AuthContext.Provider
          value={{
            token: token,
            userId: userId,
            login: login,
            logout: logout,
            searchTerm: searchTerm
          }}
        >
          {sideDrawer && <BackDrop closeModal={toggleSideDrawer} />}
          <Navbar
            searchTermHandler={searchTermHandler}
            toggleSideDrawer={toggleSideDrawer}
          />
          <SideDrawer
            isDrawerOpen={sideDrawer}
            searchTermHandler={searchTermHandler}
          />
          <main className="main-content">
            <Switch>
              <Route
                path="/auth"
                render={() =>
                  token ? <Redirect from="/auth" to="/events" /> : <AuthPage />
                }
              />
              <Route
                path="/bookings"
                render={() =>
                  token ? <BookingsPage /> : <Redirect to="/auth" />
                }
              />
              <Route path="/events" render={() => <EventsPage />} />
              <Route path="/auth" exact render={() => <AuthPage />} />
              <Route path="/" exact render={() => <WelcomePage />} />
            </Switch>
          </main>
        </AuthContext.Provider>
      </Fragment>
    </Router>
  );
}

export default App;
