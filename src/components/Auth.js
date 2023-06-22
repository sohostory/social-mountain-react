import { useState, useContext } from "react";

import AuthContext from "../store/authContext";

import axios from "axios";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(true);
  const [message, setMessage] = useState("");
  const [display, setDisplay] = useState("none");

  const authCtx = useContext(AuthContext);

  const submitHandler = (e) => {
    e.preventDefault();

    setDisplay("none");

    console.log("submitHandler called");

    const body = {
      username,
      password,
    };

    const LOGIN_URL = "http://localhost:4000";

    console.log("body", body);

    axios
      .post(register ? `${LOGIN_URL}/register` : `${LOGIN_URL}/login`, body)
      .then((res) => {
        console.log(res.data);
        authCtx.login(res.data.token, res.data.exp, res.data.userId);
      })
      .catch((err) => {
        console.log("this is an error", err);
        setMessage(err.response.data);
        setDisplay("block");
        setUsername("");
        setPassword("");
      });
  };

  return (
    <main>
      <h1>Welcome!</h1>
      <form className="form auth-form" onSubmit={submitHandler}>
        <input
          className="form-input"
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="form-input"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="form-btn">{register ? "Sign Up" : "Login"}</button>
      </form>
      <p style={{ display: display }} className="auth-msg">
        {message}
      </p>
      <button className="form-btn" onClick={() => setRegister(!register)}>
        Need to {register ? "Login" : "Sign Up"}?
      </button>
    </main>
  );
};

export default Auth;
