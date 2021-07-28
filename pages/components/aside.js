export default function Aside({ styles, methodArray }) {
  let EachButton = ({ text, method, selected }) => {
    return (
      <div
        className={selected ? styles.btnSelected : styles.btn}
        onClick={() => method()}
      >
        <p>{text}</p>
      </div>
    );
  };

  return (
    <aside className={styles.aside}>
      <div style={{ height: "9rem" }}></div>
      {methodArray.map((each, index) => {
        return (
          <EachButton
            key={index}
            method={() => {
              each.method(index);
            }}
            text={each.text}
            selected={index == each.whichComponent ? 1 : 0}
          />
        );
      })}
    </aside>
  );
}
