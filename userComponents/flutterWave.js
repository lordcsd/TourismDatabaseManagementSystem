import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';

export default function FlutterWave({amount}) {
  const config = {
    public_key: "FLWPUBK-5e3ae287ea114325b3e40d2496a3d7b1-X",
    tx_ref: Date.now(),
    amount: amount,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: 'dimgbachinonso@gmail.com',
      phonenumber: '08131157827',
      name: 'Chinonso Sunday Dimgba',
    },
    customizations: {
      title: 'Make Payments',
      description: 'Payment for items in cart',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  return (
    <div className="App">

      <button
        onClick={() => {
          handleFlutterPayment({
            callback: (response) => {
               console.log(response);
                closePaymentModal() // this will close the modal programmatically
            },
            onClose: () => {},
          });
        }}
      >
        Pay with FlutterWave
      </button>
    </div>
  );
}