import React, { useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import "./Auth.scss";
import AuthContext from "../context/auth-context";

function Auth(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMode, setLoginMode] = useState(true);
  const context = useContext(AuthContext);

  // console.log(props);

  const submitHandler = e => {
    e.preventDefault();
    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }
    let requestBody = {
      query: `
        query LoginUser($email: String!, $password: String!){
          login(email: $email, password: $password){
            userId
            token
            tokenExpiration
          }
        }
      `,
      variables: {
        email: email,
        password: password
      }
    };

    if (!loginMode) {
      requestBody = {
        query: `
        mutation CreateUser($email: String!, $password: String!) {
          createUser(userInput: {email: $email, password: $password}){
            _id
            email
          }
        }`,
        variables: {
          email: email,
          password: password
        }
      };
    }
    axios
      .post("http://localhost:4000/graphql", requestBody)
      .then(data => {
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
  return (
    <form className="auth-form" onSubmit={submitHandler}>
      <div className="form-control">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <div className="form-actions">
        <button type="submit">{loginMode ? "Login" : "Register"}</button>
        <button type="button" onClick={() => setLoginMode(!loginMode)}>
          {loginMode ? "Register" : "Login"}
        </button>
      </div>
    </form>
  );
}

export default withRouter(Auth);
