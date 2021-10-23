import axios from "axios";
import { usePaystackPayment } from "react-paystack";

let baseUrl = "http://localhost:3001";

const PaystackHookExample = ({ amount, props }) => {
  const config = {
    reference: new Date().getTime().toString(),
    email: "user@example.com",
    amount: amount,
    publicKey: "pk_test_e5dc79da17082f4623a50b19c5633d887502e05b",
  };

  // you can call this function anything
  const onSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    axios({
      method: "POST",
      url: baseURL + "/checkOut",
      data: { reference: reference, tickets: props.tickets },
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };

  const initializePayment = usePaystackPayment(config);
  return (
    <div>
      <button
        onClick={() => {
          initializePayment(onSuccess, onClose);
        }}
      >
        Paystack Hooks Implementation
      </button>
    </div>
  );
};

export default PaystackHookExample;
