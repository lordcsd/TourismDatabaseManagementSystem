import { useState } from "react";

let OverViewCard = ({ styles, title, value }) => (
  <div className={styles.overviewCard}>
    <h1>{value}</h1>
    <p>{title}</p>
  </div>
);

export default function Overview({ styles, props }) {
  let [state, setState] = useState({
    userCount: props.userCount,
    locations: props.locations,
    ticketsSold: props.ticketsSold,
  });

  useState(() => setState(props), []);

  return (
    <div className={styles.overview}>
      <div className={styles.cardContainer}>
        {Object.getOwnPropertyNames(state).map((e) => (
          <OverViewCard
            title={
              e == "userCount" ? "Registered Users" :
                e == "locations" ? "Locations":
             e == "ticketsSold"? "Tickets Sold": ""
            }
            value={state[e]}
            styles={styles}
          />
        ))}
      </div>
    </div>
  );
}
