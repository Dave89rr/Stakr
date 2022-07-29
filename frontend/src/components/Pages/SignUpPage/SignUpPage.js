import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { signUp } from "../../../store/session";

import classes from "./SignUpPage.module.css";
// import uniCss from "../pagesuniversal.module.css";

const SignUpPage = () => {
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    console.log(errors);
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data);
      }
    } else {
      return setErrors(["Passwords didn't match"]);
    }
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
    return <Redirect to="/" />;
  }

  return (
    <div className={classes.mainContainer}>
      <div className={classes.formContainer}>
        <img src="/media/icons/stakr-logo.svg" className={classes.logo} />
        <div>
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
                required={true}
              ></input>
            </div>
            <button className={classes.signup} type="submit">
              Sign Up
            </button>
            <p
              onClick={() => history.push(`/login`)}
              className={classes.loginLink}
            >
              Aleardy have an account? Login
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
