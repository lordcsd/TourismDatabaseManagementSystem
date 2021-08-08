import styles from "../styles/Home.module.scss";
import Link from "next/Link";

export default function SessionExpired() {
  return (
    <div className={styles.sessionExpired}>
      <div>
        <p className={styles.error}>Error 404</p>
        <p className={styles.message}>Sorry Your Login session has expired, You wil need to login again</p>
        <Link href="/login">
          <button>Login</button>
        </Link>
      </div>
    </div>
  );
}
