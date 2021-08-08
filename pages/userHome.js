import styles from "../styles/Home.module.scss";
import { useEffect, useState } from "react";

import Aside from "../components/aside";
import Header from "../components/header";

import AccountSetting from "../userComponents/accountSettings";
import Overview from "../userComponents/overview";
import Tickets from "../userComponents/tickets";
import ManageCart from "../userComponents/manageCart";
import ActiveTickets from "../userComponents/activeTickets";
import Notifications from "../userComponents/notifications";

import axios from "axios";
import { useRouter } from "next/router";
let api, store;
let baseURL = "http://localhost:3001";

function UserHome() {
  let [whichComponent, setWhichComponent] = useState(0);
  let [state, setState] = useState({
    notifications: [],
    tickets: [],
    cartTickets: [],
    userId: "",
    email: "",
    store: "",
  });

  let router = useRouter();
  let openNotifications = () => setWhichComponent(5);

  let refreshDetails = () => {
    api
      .post(baseURL + "/users/getUserDetails", { email: store.email })
      .then((res) =>
        setState({
          ...state,
          userId: res.data._id,
          notifications: res.data.notifications,
        })
      )
      .catch((err) => {
        if (err.message.includes("401")) {
          router.push("/sessionExpired");
        }
      });
  };

  let addToCart = (sent) => {
    let oldCartTickets = state.cartTickets;
    if (!oldCartTickets.includes(sent)) {
      oldCartTickets.push(sent);
      setState({ ...state, cartTickets: oldCartTickets });
      alert("Ticket added to Cart");
    } else {
      alert("Ticket is already in cart!!");
    }
  };

  let gotoActiveTickets = (sign) => {
    setWhichComponent(3);
    setState({ ...state, cartTickets: [] });
  };

  let removeOneCartTicket = async (which) => {
    let newArray = state.cartTickets;
    newArray.splice(which, 1);
    await setState({ ...state, cartTickets: newArray });
  };

  let deleteOne = (props) => {
    let data = { _id: state.userId, ...props };
    api
      .patch(`${baseURL}/userNotifications/removeOne`, data)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    refreshDetails();
  };

  let displayed = [
    <Overview styles={styles} key={0}/>,
    <Tickets styles={styles} addToCart={addToCart} key={1}/>,
    <ManageCart
      styles={styles}
      cartTickets={state.cartTickets}
      removeOne={removeOneCartTicket}
      gotoActiveTickets={gotoActiveTickets}
      key={2}
    />,
    <ActiveTickets styles={styles} key={3} />,
    <AccountSetting styles={styles} key={4}/>,
    <Notifications
      notifications={state.notifications}
      styles={styles}
      deleteOne={deleteOne}
      key={5}
    />,
  ];

  useEffect(() => {
    store = JSON.parse(window.localStorage.getItem("cyberTourUser"));
     setState({ ...state, store: store.name });
    if (store) {
      api = axios.create({
        headers: { Authorization: "Bearer " + store.token },
      });
      refreshDetails();
    } else {
      router.push("/sessionExpired");
    }
  }, []);
  // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div className={styles.headerAndAside}>
        <Header
          styles={styles}
          title="User Home"
          notificationCount={state.notifications.length}
          openNotifications={openNotifications}
        />
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
      </div>
      <main className={styles.eachHome}>
        <div className={styles.background}>{displayed[whichComponent]}</div>
      </main>
    </div>
  );
}

export default UserHome;
