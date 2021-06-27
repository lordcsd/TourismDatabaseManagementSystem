import { useState } from "react";

import styles from "../styles/Home.module.scss";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Link from "next/link";
import Image from "next/image";

import Footer from "./components/footer";
import { style } from "@material-ui/system";

let DetailCard = ({ imageUrl, desc, title }) => (
  <div className={styles.detailCard}>
    <img height={160} width={200} src={imageUrl} />
    <div className={styles.texts}>
      <h2>{title}</h2>
      <p>{desc}</p>
    </div>
  </div>
);

export default function HomePage() {
  let [numberOfSites,setNumberOfSites] = useState(0)
  let cardDetails = [
    {
      imageUrl: "/homepageImages/greenland.jpg",
      title: "Experience Nature",
      desc: `Get as close you can get, Face-to-face to nature in it's purest form, let the chipping birds and the cool breeze keep you company`,
    },
    {
      imageUrl: "/homepageImages/igloo.jpg",
      title: "Experience Ancient Landmarks",
      desc: `Visit the Igloos of the temperates, the rain-forests of the tropics, the deserts of the tundra, the highs of Kilimangaro and the piramides of Egypt`,
    },
    {
      imageUrl: "/homepageImages/meditate.jpg",
      title: "Feel the tranquil",
      desc: `Escape the complicating, stressful and tiring day-to-day life, to experience natural peace of mind`,
    },
    {
      imageUrl: "/homepageImages/offshore.jpg",
      title: "The Creeks",
      desc: `Live the Aqua-man life in well-built over water houses and experience the wonders of aqualife!`,
    },
    {
      imageUrl: "/homepageImages/picnic.jpg",
      title: "Family Time",
      desc: `Get the opportunity to spend quality and worth-while time with loved ones!`,
    },
  ];
  return (
      <div className={styles.homeRoot}>
        <header className={styles.homeHeader}>
          <div className={styles.homeLogoDiv}>
            <h1 style={{ display: "flex" }}>
              Cyber<p>DB</p>
            </h1>
            <div>
              <div className={styles.iconDiv}>
                <Link href="login">
                  <VpnKeyIcon  />
                </Link>
                <AccountCircleIcon/>
              </div>
            </div>
          </div>
        </header>
        <div className={styles.underHeader}>
          <p>We have {numberOfSites} available locations</p>
        </div>
        <main>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around",
            }}
          >
            {cardDetails.map((each, index) => (
              <DetailCard
                imageUrl={each.imageUrl}
                desc={each.desc}
                title={each.title}
              />
            ))}
          </div>
        </main>
        <Footer styles={styles} />
      </div>
  );
}
