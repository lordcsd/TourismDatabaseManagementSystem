import { useState } from "react";
import {
  RemoveRedEyeSharp,
  SearchRounded,
  ShoppingCart,
} from "@material-ui/icons";

let baseUrl = "http://localhost:3001";

let TourCard = ({ imageUrl, props, styles, select,addToCart }) => {
  let [display, setDisplay] = useState(false);
  let FullDetails = () => (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>
        <p className={styles.cardDesc}>
          <b>Description: </b>
          {props.desc}
        </p>
        <p className={styles.cardDesc}>
          <b>Price: </b>
          {props.price}
        </p>
        <p className={styles.cardDesc}>
          <b>Duration: </b>
          {props.duration} Days
        </p>
      </div>
      <img src={baseUrl + props.imageUrl} style={{ width: "50%" }} />
    </div>
  );
  return (
    <div className={styles.ticketCard}>
      <div className={styles.cardIconsRow}>
        <p className={styles.cardTitle}>{props.title}</p>
        <div>
          <RemoveRedEyeSharp onClick={(e) => setDisplay(!display)} />
          <ShoppingCart
            onClick={() => {
              addToCart(props);
            }}
          />
        </div>
      </div>
      <div>{display ? <FullDetails /> : <div></div>}</div>
      <hr></hr>
    </div>
  );
};

export default function Tickets({ styles, props, addToCart }) {
  let [state, setState] = useState({
    tickets: props,
    userSearch: "",
    searchedResult: [],
    selectedTIckets: [],
  });

  let filterList = (word) => {
    let output = [];
    state.tickets.forEach((e) => {
      if (e.title.toLowerCase().includes(word.toLowerCase())) {
        output.push(e);
      }
    });
    setState({ ...state, userSearch: word, searchedResult: output });
  };

  let mapped =
    state.searchedResult.length > 0 ? state.searchedResult : state.tickets;

  return (
    <div className={styles.manageTicketsContainer}>
      <div className={styles.searchContain}>
        <p></p>
        <div className={styles.search}>
          <input
            value={state.userSearch}
            onChange={(e) => filterList(e.target.value)}
          />
          <SearchRounded className={styles.searchIcon} size="xl" />
        </div>
      </div>

      <div className={styles.manageTickets}>
        <div>
          {mapped.length < 1 ? (
            <h2 className={styles.noTour}>
              Sorry there is no Tours available tour packages.
            </h2>
          ) : (
            mapped.map((each, index) => (
              <TourCard
                addToCart = {addToCart}
                styles={styles}
                props={state.tickets[index]}
                imageUrl={each.imageUrl}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
