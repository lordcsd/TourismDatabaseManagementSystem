import { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import Link from "next/link";

import CloseIcon from "@material-ui/icons/Close";
import styles from "../styles/Home.module.scss";

export default function Login() {
  let [state, setState] = useState({
    submitAction: "Login",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  return (
    <div style={{ backgroundColor: "rgba(0,0,0,0.05)" }}>
      <div className={styles.backDiv}>
        <h1>
          Cyber<span>DB</span>
        </h1>
        <Link href="homePage">
          <CloseIcon fontSize="large" />
        </Link>
      </div>
      <div className={styles.root}>
        <form className={styles.form}>
          <TextField
            className={styles.input}
            placeholder="Enter Name"
            variant="outlined"
            label="Name"
          />
          <TextField
            className={styles.input}
            placeholder="Enter Email"
            variant="outlined"
            label="Email"
          />
          <TextField
            className={styles.input}
            placeholder="Enter Password"
            variant="outlined"
            label="Password"
          />
          <TextField
            className={styles.input}
            placeholder="Confirm Password"
            variant="outlined"
            label="Confirm Password"
          />
          <button className={styles.submitButton}>{state.submitAction}</button>
        </form>
      </div>
    </div>
  );
}
