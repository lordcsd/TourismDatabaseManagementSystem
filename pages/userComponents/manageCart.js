import { useEffect, useState } from "react";
import { Delete, ShoppingCart } from "@material-ui/icons";
import { yellow } from "@material-ui/core/colors";

let CartCard = ({ props, styles, remove, totalPrice }) => {
  return (
    <div className={styles.cartCard}>
      <span className={styles.title}>{props.title}</span>
      <div className={styles.priceAndIcon}>
        <span className={styles.price}>{props.price}</span>
        <Delete
          onClick={() => {
            remove();
            totalPrice();
          }}
        />
      </div>
    </div>
  );
};

export default function ManageCart({ styles, cartTickets, removeOne }) {
  let [state, setState] = useState({
    tickets: [],
    totalPrice: 0,
  });

  let totalPrice = () => {
    let sum = 0;
    state.tickets.forEach((e) => (sum += Number(e.price)));
    setState({ ...state, totalPrice: sum });
  };

  useEffect(() => {
    totalPrice();
  }, [state.tickets]);

  useEffect(() => {
    setState({ ...state, tickets: cartTickets });
  }, []);

  return (
    <div className={styles.manageCart}>
      <div className={styles.headerCard}>
        <p>Cart</p>
        <ShoppingCart color={yellow["50"]} />
      </div>
      <div>
        {state.tickets.map((each, index) => {
          return (
            <CartCard
              styles={styles}
              props={each}
              remove={() => removeOne(index)}
              totalPrice={totalPrice}
            />
          );
        })}
      </div>
      <div className={styles.bottomCard}>
        <p>Total</p>
        <span className={styles.price}>{state.totalPrice}</span>
      </div>
      <div className={styles.payRow}>
        <p>{state.tickets.length < 1 ? "Cart is Empty" : ""}</p>
        <button>Purchase Tickets</button>
      </div>
    </div>
  );
}
