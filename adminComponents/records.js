import { useEffect, useState } from "react";
import Sort from "./recordGen/sort";

let baseURL = "http://localhost:3001";

export default function Records({ styles }) {
  let [state, setState] = useState({
    whichSelected: 0,
    payments: [],
  });

  let fetchPayments = () => {
    fetch(`${baseURL}/payments`, {
      method: "GET",
    })
      .then((res) =>
        res.json().then((result) => {
          setState({ ...state, payments: result.Payments });
          console.log(result.Payments[0])
        })
      )
      .catch((err) => console.log(err));
  };

  useEffect(()=>{
    fetchPayments();
  },[])
  // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={styles.recordsRoot}>
      <div>
        <span className={styles.tableSelect}>
          <p
            onClick={() => setState({ ...state, whichSelected: 0 })}
            className={
              state.whichSelected == 0
                ? styles.buttonSelected
                : styles.buttonUnSelected
            }
          >
            yearly
          </p>
          <p
            onClick={() => setState({ ...state, whichSelected: 1 })}
            className={
              state.whichSelected == 1
                ? styles.buttonSelected
                : styles.buttonUnSelected
            }
          >
            Monthly
          </p>
          <p
            onClick={() => setState({ ...state, whichSelected: 2 })}
            className={
              state.whichSelected == 2
                ? styles.buttonSelected
                : styles.buttonUnSelected
            }
          >
            Weekly
          </p>
          <p
            onClick={() => setState({ ...state, whichSelected: 3 })}
            className={
              state.whichSelected == 3
                ? styles.buttonSelected
                : styles.buttonUnSelected
            }
          >
            Locations
          </p>
        </span>
      </div>

      <div className={styles.table}>
        <span className={styles.keyHeader}>
          <p>id</p>
          <p>Title</p>
          <p>Date</p>
          <p>UserId</p>
          <p>Price</p>
        </span>
      </div>

      <div className={styles.recordsContain}>
        <Sort
          styles={styles}
          inputArray={state.payments}
          searchKey={state.whichSelected}
        />
      </div>
    </div>
  );
}
