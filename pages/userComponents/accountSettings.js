import { useEffect, useState } from "react";
import { Button, Switch, TextField } from "@material-ui/core";
import axios from "axios";
import { useRouter } from "next/router";

let baseURL = "http://localhost:3001";
let store;
let api;

export default function AccountSettings({ styles, props }) {
  let [state, setState] = useState({
    fields: {
      name: "",
      email: "",
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      phone: "",
    },
    token: "",
    showPassword: false,
    passwordError: "",
  });
  let router = useRouter();

  let handleChange = async (evt) => {
    await setState({
      ...state,
      passwordError: "",
      fields: { ...state.fields, [evt.target.name]: evt.target.value },
    });
  };

  useEffect(async () => {
    store = JSON.parse(window.localStorage.getItem("cyberTourUser"));
    api = axios.create({
      url: baseURL,
      headers: {
        Authorization: `Bearer ${store.token}`,
      },
    });
    api
      .post(`${baseURL}/users/getUserDetails`, { email: store.email })
      .then((res) => {
        let doc = res.data;
        setState({
          ...state,
          fields: {
            ...state.fields,
            name: doc.name,
            phone: doc.phone,
            email: doc.email,
          },
        });
      })
      .catch((err) => console.log(err));
  }, []);

  let deleteAccount = () => {
    if (
      state.fields.oldPassword == state.fields.confirmPassword &&
      state.fields.oldPassword != "" &&
      state.fields.confirmPassword != ""
    ) {
      let confirmed = confirm("Are you sure you want to delete account?");
      if (confirmed) {
        console.log("Deleting...");
        api
          .post(`${baseURL}/users/delete`, {
            email: state.fields.email,
            password: state.fields.oldPassword,
          })
          .then((res) => {
            router.push("/login");
            window.localStorage.removeItem("cyberTourUser");
            console.log(res);
          })
          .catch((err) => {
            alert("Account Delete Failed!, Check password");
            console.log(err);
          });
      }
    } else {
      setState({
        ...state,
        passwordError: "Password must match Confirm-Password",
      });
    }
  };

  let updateUser = () => {
    if (state.fields.newPassword != state.fields.confirmPassword) {
      setState({ ...state, passwordError: "Passwords must same!" });
    } else if (
      state.fields.email != "" &&
      state.fields.name != "" &&
      state.fields.oldPassword != "" &&
      state.fields.confirmPassword != "" &&
      state.fields.phone != ""
    ) {
      let newData = {
        name: state.fields.name,
        email: state.fields.email,
        password: state.fields.oldPassword,
        newPassword:state.fields.newPassword,
        phone: state.fields.phone,
      };
      api
        .patch(`${baseURL}/users/`, newData)
        .then((res) => {
          console.log(res);
          alert("User Update!");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className={styles.accountSettingContainer}>
      <div className={styles.accountSetting}>
        <div className={styles.input}>
          <label>Show passwords?</label>
          <Switch
            color="primary"
            checked={state.admin}
            onChange={async function () {
              await setState({
                ...state,
                showPassword: !state.showPassword,
              });
            }}
          />
        </div>
        {Object.getOwnPropertyNames(state.fields).map((e) => (
          <TextField
            className={styles.settingInput}
            placeholder={e}
            variant="outlined"
            label={e}
            value={state.fields[e]}
            name={e}
            type={
              (e == "oldPassword" ||
                e == "confirmPassword" ||
                e == "newPassword") &&
              !state.showPassword
                ? "password"
                : "text"
            }
            onChange={(e) => handleChange(e)}
          />
        ))}
        <p style={{ color: "red" }}>{state.passwordError}</p>
      </div>
      <div className={styles.submitButtonContainer}>
        <button className={styles.submitButton} onClick={() => deleteAccount()}>
          Delete Account
        </button>
        <button className={styles.submitButton} onClick={() => updateUser()}>
          Update
        </button>
      </div>
    </div>
  );
}
