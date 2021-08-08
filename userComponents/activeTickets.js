import { useEffect, useState } from "react";
import { SearchRounded, RemoveRedEyeSharp } from "@material-ui/icons/";
import { useRouter } from "next/router";

import axios from "axios";
let api, store;
let baseURL = "http://localhost:3001";

let UserCard = ({ styles, details }) => {
  let [viewed, setView] = useState(false);
  return (
    <div className={styles.activeTicketCard} onClick={() => setView(!viewed)}>
      <p>
        <b>{viewed ? "ID: " : <p></p>}</b>
        {!viewed ? details._id.slice(0, 5) + "..." : details._id}
      </p>

      <p>
        <b>{viewed ? "Title: " : <p></p>}</b>
        {details.title}
      </p>

      <p>
        <b>{viewed ? "Duration: " : <p></p>}</b>
        {details.duration} {Number(details.duration) > 1 ? "Days" : "Day"}
      </p>

      <p>
        <b>{viewed ? "Date: " : <p></p>}</b>
        {!viewed ? String(details.time).slice(0, 11) + "..." : details.time}
      </p>

      <p>
        <b>{viewed ? "Price: " : <p></p>}</b>
        {details.price}
      </p>
    </div>
  );
};

export default function ActiveTickets({ styles }) {
  let [state, setState] = useState({
    tickets: [],
    userSearch: "",
    searchedUsers: [],
    searchType: 0,
    email: "",
  });

  let router = useRouter();

  let filterList = (word) => {
    let searchKeys = ["id", "title", "duration", "time_left", "price"];
    let output = state.tickets.filter((e) =>
      `${e[searchKeys[state.searchType]]}`
        .toLowerCase()
        .includes(word.toLowerCase())
    );
    setState({ ...state, userSearch: word, searchedUsers: output });
  };

  let mapped = () => {
    if (state.searchedUsers.length > 0) {
      return state.searchedUsers;
    } else if (state.tickets.length > 0) {
      return state.tickets;
    } else {
      return state.tickets;
    }
  };

  let searchType = async (type) => {
    await setState({ ...state, searchType: Number(type) });
  };

  useEffect(() => {
    let store = JSON.parse(window.localStorage.getItem("cyberTourUser"));

    api = axios.create({
      url: "baseURL",
      headers: {
        Authorization: "Bearer " + store.token,
      },
    });
    api
      .post(`${baseURL}/users/getUserDetails`, { email: store.email })
      .then((res) => {
        setState({ ...state, tickets: res.data.activeTickets });
      })
      .catch((err) => {
        if (err.message.includes(401)) {
          router.push("/sessionExpired");
        }
      });
  }, []);
  // eslint-disable-line react-hooks/exhaustive-deps

  let searchMessage = () => {
    if (state.userSearch.length > 0 && state.searchedUsers.length == 0) {
      return "No match found";
    } else if (state.userSearch.length > 0 && state.searchedUsers.length > 0) {
      return `${state.searchedUsers.length} tickets found`;
    } else {
      return "";
    }
  };

  return (
    <div className={styles.activeTickets}>
      <div className={styles.searchContain}>
        <div className={styles.searchKey}>
          <label>Select Search Key</label>
          <select onChange={(e) => searchType(e.target.value)}>
            <option value="0">ID</option>
            <option value="1">title</option>
            <option value="2">Price</option>
          </select>
        </div>
        <p>{searchMessage()}</p>
        <div className={styles.search}>
          <input
            value={state.ticketsearch}
            onChange={(e) => filterList(e.target.value)}
          />
          <SearchRounded className={styles.searchIcon} size="xl" />
        </div>
      </div>

      <div className={styles.tableHeader}>
        <span>ID</span>
        <span>Title</span>
        <span>Duration</span>
        <span>Purchase Date</span>
        <span>Price</span>
      </div>
      <div className={styles.userCards}>
        {mapped().length > 0 ? (
          mapped().map((e, index) => {
            return <UserCard styles={styles} details={e} key={index} />;
          })
        ) : (
          <h2 style={{ width: "100%", textAlign: "center", padding: "20px 0" }}>
            Sorry There is no active Ticket
          </h2>
        )}
      </div>
    </div>
  );
}
