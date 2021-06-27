import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";

import { Button, Typography } from "@material-ui/core";

export default function Header({ styles }) {
  return (
    <div>
      <header className={styles.header}>
        <h1>CyberTourDB</h1>

        <div>
          <button className={styles.myButtonOutlined}>Sign-In</button>
          <button className={styles.myButton}>Sign-Up</button>
        </div>
      </header>
      <div style={{height:'3px',width:'100%',backgroundColor:'rgb(42, 42, 71)'}}></div>
      <div className={styles.headerUnder}>
          <p className={styles.pageTitle}>Page Title</p>
        <div className={styles.iconsHolder}>
            <NotificationsNoneIcon color="primary" />
            <ChatBubbleOutlineIcon color="primary" />
        </div>
      </div>
    </div>
  );
}
