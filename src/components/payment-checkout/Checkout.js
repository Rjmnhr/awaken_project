import React, { useEffect } from "react";
import AxiosInstance from "../axios";

const CheckoutComponent = ({ price }) => {
  useEffect(() => {
    const handleBuyNow = async () => {
      try {
        const response = await AxiosInstance.post(
          "/create-checkout-session",
          { price: price },

          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        // Handle the response as needed
        console.log(response.data);

        // Redirect to Stripe Checkout page on success
        window.location.href = response.data.url; // Assuming the response contains the URL
      } catch (error) {
        // Handle errors
        console.error("API request failed:", error);
      }
    };
    handleBuyNow();
  }, [price]);
  return <></>;
};

export default CheckoutComponent;
