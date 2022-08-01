import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { signUp } from "../../../store/session";
import AuthPageBg from "../../Elements/AuthPageBg";

import classes from "./SignUpPage.module.css";

const SignUpPage = () => {
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const workspaces = useSelector((state) => state.workspaces);
  const dispatch = useDispatch();

  useEffect(() => {
    let email = localStorage.getItem("email");
    if (email) {
      setEmail(email);
    }
  }, []);

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data);
      }
    } else {
      return setErrors(["Passwords didn't match"]);
    }
    localStorage.clear();
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    if (Object.values(workspaces).length < 1) {
      return <Redirect to="/create-first-workspace" />;
    }
    return <Redirect to="/" />;
  }

  return (
    <div className={classes.mainContainer}>
      <div className={classes.formContainer}>
        <img src="/static/icons/stakr-logo.svg" className={classes.logo} />
        <div className={classes.formWrapper}>
          <form onSubmit={onSignUp} className={classes.form}>
            {errors.length ? (
              <div className={classes.error}>
                {errors.map((error, ind) => (
                  <div key={ind}>{error}</div>
                ))}
              </div>
            ) : null}
            <div className={classes.signupText}>Sign up for your account</div>

            <div>
              <input
                className={classes.input}
                type="text"
                name="email"
                onChange={updateEmail}
                value={email}
                placeholder="Enter email"
              ></input>
            </div>
            <div>
              <input
                className={classes.input}
                type="text"
                name="username"
                placeholder="Enter username"
                onChange={updateUsername}
                value={username}
              ></input>
            </div>
            <div>
              <input
                className={classes.input}
                type="password"
                name="password"
                placeholder="Password"
                onChange={updatePassword}
                value={password}
              ></input>
            </div>
            <div>
              <input
                className={classes.input}
                type="password"
                name="repeat_password"
                placeholder="Confirm password"
                onChange={updateRepeatPassword}
                value={repeatPassword}
              ></input>
            </div>
            <button className={classes.signup} type="submit">
              Sign Up
            </button>
            <p
              onClick={() => history.push(`/login`)}
              className={classes.loginLink}
            >
              Already have an account? Login
            </p>
          </form>
        </div>
        <AuthPageBg />
      </div>
    </div>
  );
};

export default SignUpPage;
