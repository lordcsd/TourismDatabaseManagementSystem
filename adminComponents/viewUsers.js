import { useEffect, useState } from "react";
import SearchRounded from "@material-ui/icons/SearchRounded";
import axios from "axios";

let baseURL = "http://localhost:3001";

let UserCard = ({ styles, details }) => {
  return (
    <div className={styles.adminUserCard}>
      <p>{details._id}</p>
      <p>{details.name}</p>
      <p>{details.gender}</p>
      <p>{details.age}</p>
    </div>
  );
};

let api;

export default function ViewUsers({ styles }) {
  let [state, setState] = useState({
    users: [],
    userSearch: "",
    searchedUsers: [],
    searchType: 0,
  });

  let filterList = (word) => {
    let searchKeys = ["id", "name", "gender", "age"];
    let output = state.users.filter((e) =>
      `${e[searchKeys[state.searchType]]}`
        .toLowerCase()
        .includes(word.toLowerCase())
    );
    setState({ ...state, userSearch: word, searchedUsers: output });
    console.log(output);
  };

  let mapped = () => {
    if (state.searchedUsers.length > 0) {
      return state.searchedUsers;
    } else if (state.users.length > 0) {
      return state.users;
    } else {
      return state.users;
    }
  };

  let searchType = async (type) => {
    await setState({ ...state, searchType: Number(type) });
  };

  let refreshTickets = () => {
    api
      .get(`${baseURL}/users`)
      .then((res) => {
        setState({ ...state, users: res.data.Users });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    api = axios.create({
      url: baseURL,
      header: {
        Authorization: JSON.parse(window.localStorage.getItem("cyberTourAdmin"))
          .token,
      },
    });
    refreshTickets();
  }, []);
  // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={styles.manageUsers}>
      <div className={styles.searchContain}>
        <select onChange={(e) => searchType(e.target.value)}>
          <option value="0">Id</option>
          <option value="1">Name</option>
          <option value="2">Gender</option>
          <option value="3">Age</option>
        </select>
        <div className={styles.search}>
          <input
            value={state.userSearch}
            onChange={(e) => filterList(e.target.value)}
          />
          <SearchRounded className={styles.searchIcon} size="xl" />
        </div>
      </div>

      <div className={styles.tableHeader}>
        <span>Id</span>
        <span>Name</span>
        <span>Gender</span>
        <span>Age</span>
      </div>
      <div className={styles.userCards}>
        {mapped().map((e, index) => {
          return <UserCard key={index} styles={styles} details={e} />;
        })}
      </div>
    </div>
  );
}
