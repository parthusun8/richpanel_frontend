
import './App.css';
import { Routes, Route, Navigate, useNavigate, BrowserRouter } from "react-router-dom";
import Signup from './Components/Signup/Signup';
import Plans from './Components/Plans/Plans';
import React, {useState, useEffect} from 'react';
import Login from './Components/Login/login';
import PaymentDetails from './Components/PaymentDetails/PaymentDetails';

function App() {
  
  const [selectedPlan, setSelectedPlan] = useState({});

  return (
    <BrowserRouter>
    <div className='flex flex-col justify-center items-center h-[100vh] dark:bg-blue-900'>
      <Routes>
        <Route path="/Signin" element={<Login />}/>
        <Route path="/" element={<Signup />} />
        <Route path="/plans" element={<Plans setSelectedPlan={setSelectedPlan} />} />
        <Route path="/payment" element={<PaymentDetails selectedPlan={selectedPlan}/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

// function Login(){
  
// }

// function Signup(){
  
// }
export default App;
