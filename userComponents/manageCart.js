import { useEffect, useState } from "react";
import { Delete, ShoppingCart } from "@material-ui/icons";
import { yellow } from "@material-ui/core/colors";

//import FlutterWave from "./flutterWave";
import axios from "axios";

let baseURL = "http://localhost:3001";
let api, store;

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

export default function ManageCart({
  styles,
  cartTickets,
  removeOne,
  gotoActiveTickets,
}) {
  let [state, setState] = useState({
    tickets: [],
    totalPrice: 0,
  });

  let totalPrice = () => {
    let sum = 0;
    state.tickets.forEach((e) => (sum += Number(e.price)));
    setState({ ...state, totalPrice: sum });
    return sum;
  };

  useEffect(() => {
    totalPrice();
    store = JSON.parse(window.localStorage.getItem("cyberTourUser"));
    api = axios.create({
      url: baseURL,
      headers: {
        Authorization: `Bearer ${store.token}`,
      },
    });
    api
      .post(`${baseURL}/users/getUserDetails`, { email: store.email })
      .then((res) => {
        let doc = res.data;
      })
      .catch((err) => {
        if (err.message.includes(401)) {
          router.push("/sessionExpired");
        }
      });
    }, [state.tickets]);
    // eslint-disable-line react-hooks/exhaustive-deps

  let payforTickets = () => {
    if (state.tickets.length > 0) {
      let postData = [];
      state.tickets.forEach((each) => {
        postData.push({
          title: each.title,
          desc: each.desc,
          price: each.price,
          duration: each.duration,
          date: new Date().toISOString(),
          userId: store._id,
          totalPrice: totalPrice(),
        });
      });

      let afterPayment = () => {
        alert("Paid");
        setState({ ...state, tickets: [] });
        gotoActiveTickets();
      };

      api
        .post(`${baseURL}/users/addUserTickets`, {
          data: postData,
          _id: store._id,
        })
        .then((res) => {
          if (res.data.message.includes("already")) {
            alert(res.data.message);
          } else {
            afterPayment();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Cart is Empty");
    }
  };

  useEffect(() => {
    setState({ ...state, tickets: cartTickets });
  }, []);
  // eslint-disable-line react-hooks/exhaustive-deps

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
              key={index}
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
        <button onClick={() => payforTickets()}>Pay</button>
        {/* <FlutterWave amount={state.totalPrice} /> */}
      </div>
    </div>
  );
}
