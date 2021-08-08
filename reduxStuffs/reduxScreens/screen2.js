import { useEffect, useState } from "react";
import { addToStore, removeFromStore, unsubscribe, store } from "../redux";

export default function Screen2() {
  let [myState, setMyState] = useState([]);

  store.subscribe(() => {
    let fetched = store.getState();
    setMyState(fetched);
  });

  return (
    <div style={{ background: "rgb(200,100,100)" }}>
      {myState.map((each, index) => {
        return (
          <div key={index}>
            <h1>{each.id}</h1>
            <p>{each.description}</p>
          </div>
        );
      })}
    </div>
  );
}
