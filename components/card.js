import Image from "next/image";
import Link from "next/link";

let styles = {
  cardRoot: {
    display: "flex",
    justifyContent: "space-between",
    background: "white",
    padding: "10px",
    boxShadow: "0px 0px 5px rgba(0,0,0,0.2)",
    borderRadius: "5px",
    margin: "20px 0",
  },
  texts: {
    margin: "0 0 0 10px",
    color: "rgb(60,60,60)",
    wordWrap:'normal'
  },
  buttonDiv: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  button: {
    padding: "10px",
    background: "rgb(80,220,150)",
    outline: "none",
    border: "none",
    borderRadius: "3px",
    color:'white'
  },
};

export default function Card({
  linkUrl,
  buttonFunc,
  buttonText,
  imageUrl,
  title,
  desc,
}) {
  return (
    <Link href={linkUrl}>
      <div style={styles.cardRoot}>
        <div style={{ display: "flex" }}>
          <Image alt="Close" src={"/back.png"} height={200} width={200} />
          <div style={styles.texts}>
            <h3>{title}</h3>
            <p>{desc}</p>
          </div>
        </div>
        <div style={styles.buttonDiv}>
          <button style={styles.button} onClick={() => buttonFunc()}>
            {buttonText}
          </button>
        </div>
      </div>
    </Link>
  );
}
