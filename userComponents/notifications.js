import { Delete, Height } from "@material-ui/icons";
import { useState } from "react";

let Card = ({ styles, props, deleteOne }) => {
  return (
    <div className={styles.eachCard}>
      <div className={styles.text}>
        <p className={styles.title}>{props.title}</p>
        <div className={styles.divider}></div>
        <p className={styles.desc}>{props.body}</p>
      </div>
      <div className={styles.deleteDiv}>
        <Delete
          onClick={() => deleteOne({ title: props.title, body: props.body })}
        />
      </div>
    </div>
  );
};

export default function Notifications({ styles, notifications, deleteOne }) {
  return (
    <div className={styles.userNotificationsRoot}>
      <div className={styles.notificationsContain}>
        {notifications.length > 0 ? (
          notifications.map((each, index) => {
            return (
              <Card
                styles={styles}
                props={each}
                key={index}
                deleteOne={deleteOne}
              />
            );
          })
        ) : (
          <h4>You Do Not Have Any Notification</h4>
        )}
      </div>
    </div>
  );
}
