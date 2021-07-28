import { useState } from "react";
import SearchRounded from "@material-ui/icons/SearchRounded";

let UserCard = ({ styles, details }) => (
  <div className={styles.adminUserCard}>
    <p>{details.id}</p>
    <p>{details.title}</p>
    <p>{details.duration}</p>
    <p>{details.time_left}</p>
    <p>{details.price}</p>
  </div>
);

export default function ActiveTickets({ styles, props }) {
  let [state, setState] = useState({
    users: [
      { id: 2, title: "Ogbunike", duration: 15, time_left: 12, price: 600 },
    ],
    userSearch: "",
    searchedUsers: [],
    searchType: 0,
  });

  let filterList = (word) => {
    let searchKeys = ["id", "title", "duration", "time_left", "price"];
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

  return (
    <div className={styles.manageUsers}>
      <div className={styles.searchContain}>
        <select onChange={(e) => searchType(e.target.value)}>
          <option value="0">ID</option>
          <option value="1">title</option>
          <option value="2">Price</option>
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
        <span>ID</span>
        <span>Title</span>
        <span>Duration</span>
        <span>Time-Left</span>
        <span>Price</span>
      </div>
      <div className={styles.userCards}>
        {mapped().map((e, index) => {
          return <UserCard styles={styles} details={e} key={index} />;
        })}
      </div>
    </div>
  );
}
