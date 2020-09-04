import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

// TO-DO's:
// - handle POST request to backend API for registration
// - form validation (?)

const SignUp = () => {
  const newUser = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  };

  const [user, setUser] = useState(newUser);
  const history = useHistory();

  const handleInput = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    axios
      .post("http://localhost:3000", user)
      .then(res => {
        console.log(res);
        // push to dashboard using credentials provided from `user`
        //history.push("./dashboard");
      })
      .catch(err => {
        console.log(err);
        alert("There was an error creating an account. Please try again.");
      });

    setUser(newUser);
  };

  return (
    <div>
      <h1>Sign Up</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName"></label>
        <input
          id="firstName"
          type="text"
          name="firstName"
          value={user.firstName}
          onChange={handleInput}
          placeholder="First Name"
        />

        <label htmlFor="lastName"></label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          value={user.lastName}
          onChange={handleInput}
          placeholder="Last Name"
        />

        <label htmlFor="email"></label>
        <input
          id="email"
          type="text"
          name="email"
          value={user.email}
          onChange={handleInput}
          placeholder="Email"
        />

        <label htmlFor="password"></label>
        <input
          id="password"
          type="text"
          name="password"
          value={user.password}
          onChange={handleInput}
          placeholder="Password"
        />

        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default SignUp;
