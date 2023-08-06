
import './App.css';
import { Routes, Route, Navigate, useNavigate, BrowserRouter } from "react-router-dom";
import Signup from './Components/Signup/Signup';
import Plans from './Components/Plans/Plans';
import React, {useState, useEffect} from 'react';
import Login from './Components/Login/Login';
import PaymentDetails from './Components/PaymentDetails/PaymentDetails';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CurrentPlan from './Components/Current_Plan/CurrentPlan';


const stripePromise = loadStripe("pk_test_51KCJrzSErffaDKeGadUmT0RbuyDuELKJxSFLAV1EyUbCDAhv7iWk89MS50m1LdctWvX3rWFVw8dTsRksFXFrp5Ur00laYwz88H");


function App() {

  const [selectedPlan, setSelectedPlan] = useState({});

  return (
    <BrowserRouter>
    <div className='flex flex-col justify-center items-center h-[100vh] dark:bg-blue-900'>
      <Routes>
        <Route path="/Signin" element={<Login setSelectedPlan={setSelectedPlan} />}/>
        <Route path="/" element={<Signup />} />
        <Route path="/plans" element={<Plans setSelectedPlan={setSelectedPlan} />} />
        <Route path="/payment" element={<Elements stripe={stripePromise}><PaymentDetails selectedPlan={selectedPlan}/></Elements>}/>
        <Route path="/currentPlan" element={<CurrentPlan plan={selectedPlan}/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

// function Login(){
  
// }

// function Signup(){
  
// }


Date.isLeapYear = function (year) { 
  return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)); 
};

Date.getDaysInMonth = function (year, month) {
  return [31, (Date.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
};

Date.prototype.isLeapYear = function () { 
  return Date.isLeapYear(this.getFullYear()); 
};

Date.prototype.getDaysInMonth = function () { 
  return Date.getDaysInMonth(this.getFullYear(), this.getMonth());
};

Date.prototype.addMonths = function (value) {
  var n = this.getDate();
  this.setDate(1);
  this.setMonth(this.getMonth() + value);
  this.setDate(Math.min(n, this.getDaysInMonth()));
  return this;
};

export default App;
