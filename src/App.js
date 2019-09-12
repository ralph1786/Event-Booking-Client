import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import "./App.css";
import AuthPage from "./pages/Auth";
import BookingsPage from "./pages/Bookings";
import EventsPage from "./pages/Events";

function App() {
  return (
    <Router>
      <Switch>
        <Redirect from="/" to="/auth" exact />
        <Route path="/auth" render={() => <AuthPage />} />
        <Route path="/events" render={() => <EventsPage />} />
        <Route path="/bookings" render={() => <BookingsPage />} />
      </Switch>
    </Router>
  );
}

export default App;
