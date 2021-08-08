import { useState, useEffect } from "react";
import { addToStore, removeFromStore, unsubscribe, store } from "../redux";

export default function Screen1() {
  let [myState, setMyState] = useState("");

  store.subscribe(() => {
    let fetched = store.getState();
  });

  return (
    <div style={{ background: "rgb(100,200,100)" }}>
      <h1>Screen1</h1>
      <input
        value={myState}
        onChange={(e) => {
          setMyState(e.target.value);
        }}
      />
      <button
        onClick={(e) => {
          addToStore(myState);
        }}
      >
        Submit
      </button>
    </div>
  );
}
