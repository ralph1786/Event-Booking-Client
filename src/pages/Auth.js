import React, { useState, useContext, Fragment } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import "./Auth.scss";
import AuthContext from "../context/auth-context";
import { LOGIN_USER } from "../graphql/queries/index";
import { CREATE_USER } from "../graphql/mutations/index";
import Message from "../components/UX/Message";

function Auth(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMode, setLoginMode] = useState(true);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const context = useContext(AuthContext);

  const submitHandler = e => {
    e.preventDefault();
    if (email.trim().length === 0 || password.trim().length === 0) {
      setMessageType("error");
      setMessage("All fields are required!");
      return;
    }
    let requestBody = {
      query: LOGIN_USER,
      variables: {
        email: email,
        password: password
      }
    };

    if (!loginMode) {
      requestBody = {
        query: CREATE_USER,
        variables: {
          email: email,
          password: password
        }
      };
    }
    axios
      .post("http://localhost:4000/graphql", requestBody)
      .then(data => {
        const errors = data.data.errors;
        if (errors) {
          setMessage(errors[0].message);
          setEmail("");
          setPassword("");
          setMessageType("error");
          return;
        }
        if (data.data.data.createUser) {
          setMessage("Registered successfully, please login.");
          setEmail("");
          setPassword("");
          setLoginMode(true);
          return;
        }
        console.log(data);
        const token = data.data.data.login.token;
        const userId = data.data.data.login.userId;
        const tokenExpiration = data.data.data.login.tokenExpiration;
        if (token) {
          context.login(token, userId, tokenExpiration);
          props.history.push("/events");
        }
      })
      .catch(err => console.log(err));
  };

  const changeToLoginClearErrorMessage = () => {
    setMessage("");
    setLoginMode(!loginMode);
  };

  const closeMessage = () => {
    setMessage("");
  };

  return (
    <Fragment>
      {message ? (
        <Message
          message={message}
          messageType={messageType}
          closeMessage={closeMessage}
        />
      ) : null}
      <form className="auth-form" onSubmit={submitHandler}>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            value={email}
            type="email"
            id="email"
            onChange={e => setEmail(e.target.value)}
            autoFocus
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input
            value={password}
            type="password"
            id="password"
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-actions">
          <button type="submit">{loginMode ? "Login" : "Register"}</button>
          <button
            type="button"
            onClick={() => changeToLoginClearErrorMessage()}
          >
            {loginMode ? "Register" : "Login"}
          </button>
        </div>
      </form>
    </Fragment>
  );
}

export default withRouter(Auth);
