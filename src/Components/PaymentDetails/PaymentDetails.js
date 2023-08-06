import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import moment from "moment";
import { Button } from '@mui/material';
import Axios from "../Axios/Axios"



function PaymentDetails({selectedPlan}) {

    const stripe = useStripe();
    const elements = useElements();

    const navigate = useNavigate();

    useEffect(() => {
        if(selectedPlan.planName == undefined){
            navigate("/plans");
        }
    }, []);

    // const stripe = useStripe();
    // const elements = useElements();

    const startDate = moment().toDate();
    const endDate = moment(startDate)
    .add(1, selectedPlan.planType === "Monthly" ? "M" : "y")
    .toDate();

    const amount = selectedPlan.planType === "Monthly"
    ? selectedPlan.MonthlyPrice
    : selectedPlan.yearlyPrice;


    const createSubscription = async () => {
        if (!stripe || !elements) {
            console.log("Here")
          // Stripe.js hasn't yet loaded.
          // Make sure to disable form submission until Stripe.js has loaded.
          return;
        }

        try {
          const paymentMethod = await stripe.createPaymentMethod({
            card: elements.getElement(CardElement),
            type: "card",
          });
          console.log(paymentMethod);

          const response = await Axios.post("subscribe", {
            name : localStorage.getItem("name"),
            email : localStorage.getItem("email"),
            priceId: selectedPlan.priceId,
            paymentMethod: paymentMethod.paymentMethod.id,
          });
          
          if (!response.data.clientSecret) return alert("Payment unsuccessful!");
          const data = await response.data;
          const confirm = await stripe.confirmCardPayment(data.clientSecret);
          if (confirm.error) return alert("Payment unsuccessful!");

          //Sucess
          //Call API to store data in db

          localStorage.setItem("subscriptionId", response.data.subscriptionId);

          await Axios.post("updateCurrentPlan", {
            email : localStorage.getItem("email"),
            planName : selectedPlan.planName,
            subscriptionId : response.data.subscriptionId
          });

          navigate("/currentPlan");
        //   alert("Payment Successful! Subscription active.");
        } catch (err) {
          console.error(err);
          alert("Payment failed! " + err.message);
        }
      };

    return (
      <div className="w-1/2 flex flex-row">
        <div className="flex flex-col items-start flex-[1.2] bg-white px-8 py-8 rounded-tl-lg rounded-bl-lg">
          <h1 className="text-black text-3xl font-semibold">Complete Payment</h1>
          <div className="flex flex-row justify-center items-center">
            <h2 className="text-gray-600 text-xs">
              Enter your credit or debit card details below
            </h2>
          </div>
          {/* <CardElement className="text-black w-full my-4 border-gray-400 border rounded-lg p-4" /> */}
          
            <CardElement className="text-black w-full my-4 border-gray-400 border rounded-lg p-4" />
  
          <div className="w-1/2 mt-1">
            <Button variant="contained" size="small" style={{"width" : "15em", "backgroundColor" : "rgb(31, 77, 145)", "height" : "3em"}} onClick={() => createSubscription()}
            >Confirm Payment</Button>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-y-4 items-start px-8 py-8 bg-gray-50 rounded-tr-lg rounded-br-lg">
          <h1 className="text-black text-xl font-semibold">Order Summary</h1>
          <div className="flex justify-between items-center w-full text-black">
            <span>Plan Name</span>
            <b>{selectedPlan.planName}</b>
          </div>
          <hr className="w-full" />
          <div className="flex justify-between items-center w-full text-black">
            <span>Billing Cycle</span>
            <b>{selectedPlan.planType}</b>
          </div>
          <hr className="w-full" />
          <div className="flex justify-between items-center w-full text-black">
            <span>Plan Price</span>
            <b>
              {amount}
            </b>
          </div>
          <hr className="w-full" />
        </div>
      </div>
    );
}

export default PaymentDetails;


