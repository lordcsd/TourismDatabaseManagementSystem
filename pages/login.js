import { useState } from "react";
import { Button, Switch, TextField, Select, Option } from "@material-ui/core";
import { useRouter } from "next/router";
import Link from "next/link";

import CloseIcon from "@material-ui/icons/Close";
import styles from "../styles/Home.module.scss";
import axios from "axios";

let baseUrl = "http://localhost:3001";

export default function Login() {
  let [state, setState] = useState({
    admin: false,
    submitAction: false,
    showPassword: false,
    name: "",
    email: "",
    password: "",
    phone: "",
    confirmPassword: "",
    age: 0,
    gender: "Male",
    loginErrors: [],
  });

  let router = useRouter();

  let matchError = "Password and Confirm password must match";
  let emailMismatch = "Email not valid";

  let handleInput = async (evt) => {
    await setState({
      ...state,
      [evt.target.name]: evt.target.value,
      loginErrors: [],
    });
    if (
      state.password != "" &&
      state.confirmPassword != "" &&
      state.password != state.confirmPassword
    ) {
      let loginErrors = state.loginErrors;
      if (state.loginErrors.includes(matchError) == false) {
        loginErrors.push(matchError);
        await setState({
          ...state,
          loginErrors: loginErrors,
        });
      }
    }
  };

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  let loginOrSignUp = () => {
    if (!validateEmail(state.email)) {
      let loginErrors = state.loginErrors;
      loginErrors.push(emailMismatch);
      setState({ ...state, loginErrors: loginErrors });
    } else if (state.loginErrors.length < 1) {
      //signing in
      if (!state.submitAction) {
        //if admin
        if (state.admin) {
          let data = {
            name: state.name,
            email: state.email,
            password: state.password,
            phone: state.phone,
            age: state.age,
            gender: state.gender,
          };
          axios
            .post(`${baseUrl}/admins/signup`, data)
            .then((res) => console.log(res))
            .catch((err) => {
              if (err) {
                console.log("error");
              }
              if (err.message.indexOf("409")) {
                let newError = state.loginErrors;
                newError.push("Email is already registered");
                setState({ ...state, loginErrors: newError });
              }
            });
        }
        //if user
        if (!state.admin) {
          let data = {
            name: state.name,
            email: state.email,
            password: state.password,
            phone: state.phone,
            age: state.age,
            gender: state.gender,
          };
          axios
            .post(`${baseUrl}/users/signup`, data)
            .then((res) => {
              setState({ ...state, submitAction: true });
            })
            .catch((err) => {
              if (err.message.indexOf("409")) {
                let newError = state.loginErrors;
                newError.push("Email is already registered");
                setState({ ...state, loginErrors: newError });
              }
            });
        }
      }

      //login
      else if (state.submitAction) {
        //if admin
        if (state.admin) {
          let data = {
            email: state.email,
            password: state.password,
          };
          axios
            .post(`${baseUrl}/admins/login`, data)
            .then((res) => {
              let fetched = res.data;
              window.localStorage.setItem(
                "cyberTourAdmin",
                JSON.stringify(res.data)
              );
              if (window.localStorage.getItem("cyberTourAdmin")) {
                router.push("/adminHome");
              }
            })
            .catch((err) => {
              let newArray = state.loginErrors;
              newArray.push("Login Failed");
              setState({
                ...state,
                loginErrors: newArray,
              });
            });
        }
        //if user
        if (!state.admin) {
          let data = {
            email: state.email,
            password: state.password,
          };
          axios
            .post(`${baseUrl}/users/login`, data)
            .then((res) => {
              let fetched = res.data;
              window.localStorage.setItem(
                "cyberTourUser",
                JSON.stringify(res.data)
              );
              if (window.localStorage.getItem("cyberTourUser")) {
                router.push("/userHome");
              }
            })
            .catch((err) => {
              let newArray = state.loginErrors;
              newArray.push("Login Failed");
              setState({
                ...state,
                loginErrors: newArray,
              });
            });
        }
      }
    }
  };

  let loginDetails = ["email", "password"];
  let signupDetails = ["confirmPassword", "name", "phone", "age"];

  return (
    <div style={{ backgroundColor: "rgba(0,0,0,0.05)" }}>
      <div className={styles.backDiv}>
        <h1>
          TourCyber<span>DB</span>
        </h1>
        <Link href="homePage">
          <CloseIcon fontSize="large" />
        </Link>
      </div>
      <div className={styles.root}>
        <div className={styles.form}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <div className={styles.input}>
              <h1>{state.submitAction ? "Login" : "SignUp"}</h1>
              <label>Are you an admin?</label>
              <Switch
                color="primary"
                checked={state.admin}
                onChange={async function () {
                  await setState({
                    ...state,
                    admin: !state.admin,
                    loginErrors: [],
                  });
                }}
              />
            </div>

            <div className={styles.input}>
              <label>Show passwords?</label>
              <Switch
                checked={state.showPassword}
                onChange={async function () {
                  await setState({
                    ...state,
                    showPassword: !state.showPassword,
                  });
                }}
              />
            </div>
          </div>
          {loginDetails.map((each, index) => (
            <TextField
              className={styles.input}
              onChange={async (e) => await handleInput(e)}
              placeholder={`Enter ${each}`}
              variant="outlined"
              size="small"
              label={each}
              name={each}
              key={index}
              type={
                each == "password"
                  ? state.showPassword
                    ? "text"
                    : "password"
                  : "text"
              }
            />
          ))}
          <>
            {!state.submitAction ? (
              signupDetails.map((each, index) => (
                <TextField
                  className={styles.input}
                  onChange={async (e) => await handleInput(e)}
                  placeholder={each}
                  variant="outlined"
                  size="small"
                  label={each}
                  name={each}
                  key={index}
                  type={
                    each == "password" || each == "confirmPassword"
                      ? state.showPassword
                        ? "text"
                        : "password"
                      : "text"
                  }
                />
              ))
            ) : (
              <div></div>
            )}
            <div
              style={{
                padding: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                {!state.submitAction ? (
                  <div>
                    <label style={{ padding: "0 10px 0 0" }}>
                      Select Gender
                    </label>
                    <select
                      onChange={async (e) => {
                        await setState({
                          ...state,
                          gender: Boolean(Number(e.target.value))
                            ? "Male"
                            : "Female",
                        });
                      }}
                    >
                      <option value="1">Male</option>
                      <option value="0">Female</option>
                    </select>{" "}
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
              <p></p>
              <button
                className={styles.submitButton}
                onClick={() => loginOrSignUp()}
              >
                {state.submitAction ? "Login" : "SignUp"}
              </button>
            </div>
          </>
          {state.loginErrors.map((each, index) => (
            <p style={{ color: "rgb(255,50,50)" }} key={index}>{each}</p>
          ))}{" "}
          <p
            onClick={async () =>
              await setState({
                ...state,
                submitAction: !state.submitAction,
                loginErrors: [],
              })
            }
          >
            {!state.submitAction
              ? "Do you already have an account? click here to login"
              : "Not registered? Click here to register"}
          </p>
        </div>
      </div>
    </div>
  );
}
