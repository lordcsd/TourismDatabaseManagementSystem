import styles from "../styles/Home.module.scss";
import { useEffect, useState } from "react";
import { withRouter } from "next/router";

import Aside from "./components/aside";
import Header from "./components/header";

import AccountSetting from "./userComponents/accountSettings";
import Overview from "./userComponents/overview";
import Tickets from "./userComponents/tickets";
import ManageCart from "./userComponents/manageCart";
import ActiveTickets from "./userComponents/activeTickets";

import axios from "axios";
let baseURL = "http://localhost:3001";

function UserHome({ router }) {
  let [whichComponent, setWhichComponent] = useState(1);
  let [state, setState] = useState({
    _id: "",
    name: "",
    email: "",
    phone: "",
    ActiveTickets: [],
    notifications: [],
    overview: {
      userCount: 0,
      locations: 0,
      ticketsSold: 0,
    },
    tickets: [],
    cartTickets: [],
  });

  let getUserFiles = async () => {
    let fetched = [];
    await axios
      .all([
        axios.get(baseURL + "/users"),
        axios.get(baseURL + "/tickets"),
        axios.get(baseURL + "/payments"),
      ])
      .then(
        axios.spread((...response) => {
          fetched = response;
        })
      );
    await setState({
      ...state,
      email: router.query.email,
      tickets: fetched[1].data.tickets,
      overview: {
        userCount: fetched[0].data.count,
        locations: fetched[1].data.count,
        ticketsSold: fetched[2].data.count,
      },
    });
  };

  let addToCart = (sent) => {
    let oldCartTickets = state.cartTickets;
    if (!oldCartTickets.includes(sent)) {
      oldCartTickets.push(sent);
      setState({ ...state, cartTickets: oldCartTickets });
    } else {
      alert("Ticket is already in cart!!");
    }
  };

  useEffect(async () => {
    await getUserFiles();
  }, []);

  let removeOneCartTicket = async (which) => {
    let confirmed = confirm("Are you sure you want to Delete Item");
    let newArray = state.cartTickets;
    newArray.splice(which, 1);
    if (confirmed) {
      await setState({ ...state, cartTickets: newArray });
    }
  };

  let displayed = [
    <Overview styles={styles} props={state.overview} />,
    <Tickets styles={styles} props={state.tickets} addToCart={addToCart} />,
    <ManageCart
      styles={styles}
      cartTickets={state.cartTickets}
      removeOne={removeOneCartTicket}
    />,
    <ActiveTickets styles={styles} />,
    <AccountSetting styles={styles} props={state}/>,
  ];

  return (
    <div>
      <Aside
        styles={styles}
        methodArray={[
          {
            text: "Overview",
            method: (which) => {
              setWhichComponent(which);
            },
            whichComponent: whichComponent,
          },
          {
            text: "Tickets",
            method: (which) => {
              setWhichComponent(which);
            },
            whichComponent: whichComponent,
          },
          {
            text: "Manage Cart",
            method: (which) => {
              setWhichComponent(which);
            },
            whichComponent: whichComponent,
          },
          {
            text: "Active TIckets",
            method: (which) => {
              setWhichComponent(which);
            },
            whichComponent: whichComponent,
          },
          {
            text: "Account Settings",
            method: (which) => {
              setWhichComponent(which);
            },
            whichComponent: whichComponent,
          },
        ]}
      />
      <main style={{ margin: "0 0 0 20vw" }}>
        <Header styles={styles} title="User Home" />
        <div className={styles.background}>{displayed[whichComponent]}</div>
      </main>
    </div>
  );
}

export default withRouter(UserHome);
