import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

let baseUrl = "http://localhost:3001";
let api, store;

export default function Notifications({ styles }) {
  let [state, setState] = useState({
    _id: "",
    title: "",
    body: "",
  });

  let router = useRouter();

  let handleChange = (evt) => {
    setState({
      ...state,
      [evt.target.name]: evt.target.value,
    });
  };

  let send = () => {
    if (Boolean(state._id) == false) {
      api
        .patch(`${baseUrl}/userNotifications/send`, {
          title: state.title,
          body: state.body,
        })
        .then((res) => alert("Notification Sent All Users"))
        .catch((err) => {
          alert("Notification Sending Failed");
          console.log(err);
        });
    } else {
      api
        .patch(`${baseUrl}/userNotifications/send`, state)
        .then((res) => {
          if (res.data.name == "CastError") {
            alert("Invalid Id!");
          } else {
            alert("Notification Sent to " + state._id);
          }
          console.log(res);
        })
        .catch((err) => {
          alert("Notification Sending Failed");
          console.log(err);
        });
    }
  };

  useEffect(() => {
    store = JSON.parse(window.localStorage.getItem("cyberTourAdmin"));
    api = axios.create({
      url: baseUrl,
      headers: {
        Authorization: "Bearer " + store.token,
      },
    });
  }, []);
  // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className={styles.adminNotificationsRoot}>
      <h2>Notifications</h2>
      <div>
        <div className={styles.enterUserId}>
          <div>
            <label>Enter User Id</label>
            <textarea
              name="_id"
              onChange={(e) => handleChange(e)}
              className={styles.textInput}
              placeholder="This is should be empty if notification is for all users"
            ></textarea>
          </div>
          <div>
            <label>Notifications Title</label>
            <textarea
              className={styles.textInput}
              name="title"
              onChange={(e) => handleChange(e)}
            ></textarea>
          </div>
          <div>
            <label>Notifications Body</label>
            <textarea
              className={styles.textInput}
              name="body"
              onChange={(e) => handleChange(e)}
            ></textarea>
          </div>
        </div>
        <div className={styles.shareDiv}>
          <button onClick={() => send()}>Send</button>
        </div>
      </div>
    </div>
  );
}
