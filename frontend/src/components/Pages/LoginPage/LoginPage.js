import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { login } from "../../../store/session";

import classes from "../SignUpPage/SignUpPage.module.css";

const LoginPage = () => {
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to={`/${user.username}/boards`} />;
  }

  return (
    <div className={classes.mainContainer}>
      <div className={classes.formContainer}>
        <img src="/static/icons/stakr-logo.svg" className={classes.logo} />
        <div className={classes.formWrapper}>
          <form onSubmit={onLogin} className={classes.form}>
            <div>
              {errors.map((error, ind) => (
                <div className={classes.error}>
                  <div key={ind}>{error}</div>
                </div>
              ))}
            </div>
            <div className={classes.signupText}>Login to your account</div>
            <div>
              <input
                className={classes.input}
                name="email"
                type="text"
                placeholder="Email"
                value={email}
                onChange={updateEmail}
              />
            </div>
            <div>
              <input
                className={classes.input}
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={updatePassword}
              />
            </div>
            <button type="submit" className={classes.signup}>
              Login
            </button>
            <p
              onClick={() => history.push(`/signup`)}
              className={classes.loginLink}
            >
              Don't have an account? Sign up
            </p>
          </form>
        </div>
        <div className={classes.imgContainer}>
          <div className={classes.right}>
            <img
              className={classes.imgBottom}
              src="/static/icons/left-bg-login.svg"
            />
          </div>
          <div className={classes.right}>
            <img
              className={classes.imgBottomRight}
              src="/static/icons/right-bg-login.svg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
