import styles from "../styles/Home.module.scss";
import { useEffect, useState } from "react";

import Aside from "../components/aside";
import Header from "../components/header";

import Overview from "../adminComponents/overview";
import AccountSettings from "../adminComponents/accountSettings";
import ManageTickets from "../adminComponents/manageTickets";
import ViewUsers from "../adminComponents/viewUsers";
import Notifications from "../adminComponents/notifications";
import Records from '../adminComponents/records'

import { useRouter } from "next/router";
import axios from "axios";

let api, store;
let baseUrl = "http://localhost:3001";

function AdminHome() {
  let [whichComponent, setWhichComponent] = useState(5);

  let components = [
    <Overview styles={styles} key={0}/>,
    <ManageTickets styles={styles} key={1}/>,
    <ViewUsers styles={styles} key={2}/>,
    <AccountSettings styles={styles} key={3}/>,
    <Notifications styles={styles} key={4}/>,
    <Records styles={styles} key={5}/>,
  ];

  return (
    <div className={styles.background}>
      <div className={styles.headerAndAside}>
        <Header
          styles={styles}
          title="Admin DashBoard"
          notificationCount={null}
          openNotifications={null}
        />
        <Aside
          styles={styles}
          methodArray={[
            {
              text: "OverView",
              method: (which) => {
                setWhichComponent(which);
              },
              whichComponent: whichComponent,
            },
            {
              text: "Manage Tickets",
              method: (which) => {
                setWhichComponent(which);
              },
              whichComponent: whichComponent,
            },
            {
              text: "View Users",
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
            {
              text: "Manage User Notifications",
              method: (which) => {
                setWhichComponent(which);
              },
              whichComponent: whichComponent,
            },
            {
              text: "Records",
              method: (which) => {
                setWhichComponent(which);
              },
              whichComponent: whichComponent,
            },
          ]}
        />
      </div>

      <main className={styles.eachHome}>
        <div>{components[whichComponent]}</div>
      </main>
    </div>
  );
}

export default AdminHome;
