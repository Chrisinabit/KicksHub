//import { metadata, text } from "framer-motion/client";
import { PaystackConsumer } from "paystack-react";
import { clearCart } from "../../apiServices/shopApi.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import styles from './style.module.css';

const PaystackCheckout = ({email, amount, name}) => {
    const publicKey = "pk_test_ab02184ea6152506a0ffd6994791adfd50a0bcd9";
    const amountInKobo = amount * 100; // Convert to kobo

    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const clearMutation = useMutation({
        mutationFn: () => clearCart(),
        onSuccess: () => queryClient.invalidateQueries(["cart"]),
        onError: (error) => {
          console.error("Error removing item:", error);
        }
      });

    const handleSubmit = (e) => {
    //e.preventDefault();
    navigate("/");
  };

  const handlePayment = {
    email,
    amount: amountInKobo,
    publicKey,
    text: "Pay Now",
    onSuccess: (ref) => {
        alert("Payment successful", ref);
        //send order to backend
         handleSubmit();
         clearMutation.mutate();
   
  },

  onClose: () => {
      alert("Payment closed");
  },

  metadata: {
    custom_fields: [
        {
          display_name: "Customer Name",
          variable_name: "customer_name",
          value: name,
        },
    ],
  },

};
return <PaystackConsumer {...handlePayment}> 
{({ initializePayment }) => (
  <button
                          type="submit"
                          className= {styles.buttonSubmit}
                          onClick={() => {initializePayment()} }
                          
                        >
                          Continue to Payment
                        </button>
)}
</PaystackConsumer >
};

export default PaystackCheckout;