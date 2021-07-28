import styles from "../styles/Home.module.scss";
import { useState } from "react";

import Aside from "./components/aside";
import Header from "./components/header";

import Overview from "./adminComponents/overview";
import AccountSettings from "./adminComponents/accountSettings";
import ManageTickets from "./adminComponents/manageTickets";
import ViewUsers from "./adminComponents/viewUsers";

import { useRouter, withRouter } from "next/router";

function AdminHome() {
  let [whichComponent, setWhichComponent] = useState(3);

  let components = [
    <Overview styles={styles} />,
    <ManageTickets styles={styles} />,
    <ViewUsers styles={styles} />,
    <AccountSettings styles={styles} />,
  ];

  return (
    <div className={styles.background}>
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
        ]}
      />

      <main style={{ margin: "0 0 0 20vw" }}>
        <Header styles={styles} title="Admin DashBoard" />

        <div style={{ paddingTop: "60px" }}>{components[whichComponent]}</div>
      </main>
    </div>
  );
}

export default withRouter(AdminHome);
