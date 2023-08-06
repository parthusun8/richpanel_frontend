import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function PaymentDetails({selectedPlan}) {

    const navigate = useNavigate();

    useEffect(() => {
        if(selectedPlan.planName == undefined){
            navigate("/plans");
        }
    }, [])
  return (
    <div>{selectedPlan.planType}</div>
  )
}

export default PaymentDetails;