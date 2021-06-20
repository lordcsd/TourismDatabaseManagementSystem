export default function Aside({styles}) {
  let methodArray = [
    {
      text: "Show",
    },
    {
      text: "Show",
    },
    {
      text: "Show",
    },
  ];

  let EachButton = ({ text, method }) => {
    return (
      <div className={styles.btn}>
        <p>{text}</p>
      </div>
    );
  };

  return (
    <aside className={styles.aside}>
      {methodArray.map((each) => {
        return <EachButton text={each.text} />;
      })}
      <div className={styles.specialButtonDiv}>
        <button className={styles.specialButton}> Something</button>
      </div>
    </aside>
  );
}
