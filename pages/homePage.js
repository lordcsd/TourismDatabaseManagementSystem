import styles from '../styles/Home.module.scss'

import Aside from "./components/aside";
import Footer from "./components/footer";
import Header from "./components/header";

export default function HomePage() {
  return (
    <div>
      <Aside styles={styles} />
      <div style={{marginLeft:'20vw'}}>
        <Header styles={styles}/>
        <Footer styles={styles}/>
      </div>
    </div>
  );
} 
