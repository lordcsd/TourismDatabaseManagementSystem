import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";
import LocationIcon from "@material-ui/icons/LocationOn";

export default function Footer({ styles }) {
  return (
    <footer className={styles.footer}>
      <div style={{ padding: "0 0 40px 0", display: "block" }}>
        <h4>About Us</h4>
        <div>
          CyberDB allows you experience realtime database management system for
          the tourism industry, allowing you manage events, tickets, event
          availabity, keep track of the entire tourism process, allowing you to
          access available tickets you to buy tickets and follow your trips from
          start to finish!
        </div>
      </div>
      <p>
        <b>Contact-us</b>
      </p>
      <div>
        <EmailIcon />
        <a>dimgbachinonso@gmail.com</a>
      </div>
      <div>
        <PhoneIcon />
        <a>+234 813 115 7827</a>
      </div>
      <div>
        <TwitterIcon />
        <a>@CSDimgba</a>
      </div>
      <div>
        <LocationIcon />
        <a>Department Of Computer Science FUTO</a>
      </div>
    </footer>
  );
}
