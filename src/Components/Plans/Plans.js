import Axios from "../Axios/Axios"
import React, {useEffect, useState} from 'react'

function Plans() {

    const [plans, setPlans] = useState([]);

    useEffect(() => {
        async function fetchData(){
            await Axios.get("getLatestOffers").then((res) => {
                console.log(res.data);
                setPlans(res.data.plans);
            })
        }
        fetchData();
    }, []);
  return (
    <div className="flex flex-row gap-6">
        {plans.map((plan) => {
            return <span className="text-white">{plan.planName}</span>
        })}
    </div>
  )
}

export default Plans