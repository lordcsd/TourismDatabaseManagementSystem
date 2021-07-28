import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import Power from "@material-ui/icons/SettingsPowerRounded";
import { useRouter } from "next/router";

export default function Header({ styles, title }) {
  let router = useRouter();
  return (
    <div>
      <header className={styles.header}>
        <h1>CyberTourDB</h1>
      </header>
      <div
        style={{
          height: "3px",
          width: "100%",
          backgroundColor: "rgb(42, 42, 71)",
        }}
      ></div>
      <div className={styles.headerUnder}>
        <p className={styles.pageTitle}>{title}</p>
        <div className={styles.iconsHolder}>
          <NotificationsNoneIcon />
          <Power
            onClick={() => {
              let confirmed = window.confirm(
                "Are you sure you want to log-out?"
              );
              if (confirmed) {
                window.localStorage.removeItem("cyberTourUser")
                router.push("/login");
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
