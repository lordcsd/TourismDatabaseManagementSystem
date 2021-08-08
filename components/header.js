import {
  SettingsPowerRounded,
  Notifications,
  Badge,
  MailIcon,
  StyledBadge,
} from "@material-ui/icons";

import { useRouter } from "next/router";

export default function Header({
  styles,
  title,
  notificationCount,
  openNotifications,
}) {
  let router = useRouter();
  return (
    <div>
      <header className={styles.header}>
        <h1>TourismDB</h1>
      </header>
      <div
        className={styles.underHeaderLine}
      ></div>
      <div className={styles.headerUnder}>
        <p className={styles.pageTitle}>{title}</p>
        <div className={styles.iconsHolder}>
          {openNotifications ? (
            <div
              className={styles.notificationsDiv}
              onClick={() => openNotifications()}
            >
              {notificationCount > 0 ? <p>{notificationCount}</p> : <></>}
              <Notifications />
            </div>
          ) : (
            <></>
          )}

          <SettingsPowerRounded
            onClick={() => {
              let confirmed = window.confirm(
                "Are you sure you want to log-out?"
              );
              if (confirmed) {
                window.localStorage.removeItem("cyberTourUser");
                router.push("/login");
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
