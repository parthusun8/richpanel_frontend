import Axios from "../Axios/Axios"
import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Typography } from "@mui/material";
import PlanCard from "../PlanCard/PlanCard";
import "./Plans.css";

function Plans({setSelectedPlan}) {

    const [plans, setPlans] = useState([]);

    const [currentSelected, setCurrentSelected] = useState(0);
    const [planType, setPlanType] = useState("Monthly");
    const rowOptions = [
        planType == "Monthly" ? "Monthly price" : "Yearly price",
        "Video quality",
        "Resolution",
        "Devices you can use to watch"
    ];

    const navigate = useNavigate();

    function handlePayment(){
        console.log("handlePayment called");
        console.log(plans[currentSelected]);
        plans[currentSelected].planType = planType;
        setSelectedPlan(plans[currentSelected]);
        navigate("/payment");
    }

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
    <div className="flex flex-col gap-6 h-[100vh] bg-white w-full items-center justify-center">
    <Typography variant="h6" component="div" className="text-center" style={{"marginTop" : "2em", "marginBottom" : "1em"}}>
        Choose the right plan for you
    </Typography>
    <div className="flex flex-row mt-[5px] items-center justify-center">
        <TableContainer style={{"width" : "60em"}}>
        <Table aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell style={{"paddingRight" : "2em"}}><ToggleSwitch setPlanType={setPlanType} planType={planType}/></TableCell>
                {plans.map((plan, i) => {
                    return (<TableCell key={i}>
                    <PlanCard key={i} planName={plan.planName} id={i} currentSelected={currentSelected} setCurrentSelected={setCurrentSelected}/>
                    </TableCell>)
                })}
            </TableRow>
            </TableHead>
            <TableBody>
            {rowOptions.map((row, i) => (
                <TableRow
                key={i}
                >
                <TableCell>
                    {row}
                </TableCell>
                {i == 0 ? plans.map((plan, j) => {
                    if(j != currentSelected){
                        return <TableCell align="center" key={j}>
                        {planType == "Monthly" ? plan.MonthlyPrice : plan.yearlyPrice} </TableCell>
                    } else{
                        return <TableCell align="center" key={j} sx={{"color" : "rgb(31, 77, 145)"}}>
                        {planType == "Monthly" ? plan.MonthlyPrice : plan.yearlyPrice} </TableCell>
                    }
                }) : <></>}
                {i == 1 ? plans.map((plan, j) => {
                    if(j != currentSelected)
                        return <TableCell align="center" key={j}>
                        {plan.videoQuality}
                        </TableCell>
                    return <TableCell align="center" key={j} sx={{"color" : "rgb(31, 77, 145)"}}>
                        {plan.videoQuality}
                        </TableCell>
                }) : <></>}
                {i == 2 ? plans.map((plan, j) => {
                    if(j != currentSelected)
                        return <TableCell align="center" key={j}>
                        {plan.Resolution}
                        </TableCell>
                    return <TableCell align="center" key={j} sx={{"color" : "rgb(31, 77, 145)"}}>
                        {plan.Resolution}
                        </TableCell>
                }) : <></>}
                {i == 3 ? plans.map((plan, j) => {
                    if(j != currentSelected)
                        return <TableCell align="center" key={j}>
                        <Devices devices={plan.devices}/>
                        </TableCell>
                    return <TableCell align="center" key={j} sx={{"color" : "rgb(31, 77, 145)"}}>
                        <Devices devices={plan.devices}/>
                        </TableCell>
                }) : <></>}
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </div>
    <Button variant="contained" size="large" style={{"width" : "10em", "backgroundColor" : "rgb(31, 77, 145)"}} onClick={handlePayment}>
          Next
    </Button>
    </div>
  )
}

function ToggleSwitch({setPlanType, planType}){
    function setterVal(type){
        console.log("type is ", type);
        setPlanType(type);
    }
    return(
        <div className="switches-container">
        {planType == "Monthly" ? <><input type="radio" id="switchMonthly" name="switchPlan" value="Monthly" checked="checked" onChange={() => setterVal("Monthly")}/>
        <input type="radio" id="switchYearly" name="switchPlan" value="Yearly" onChange={() => setterVal("Yearly")}/></> : <>
        <input type="radio" id="switchMonthly" name="switchPlan" value="Monthly" onChange={() => setterVal("Monthly")}/>
        <input type="radio" id="switchYearly" name="switchPlan" value="Yearly" checked="checked" onChange={() => setterVal("Yearly")}/>
        </>}
        
        <label htmlFor="switchMonthly">Monthly</label>
        <label htmlFor="switchYearly">Yearly</label>
        <div className="switch-wrapper">
        <div className="switch">
            <div>Monthly</div>
            <div>Yearly</div>
        </div>
        </div>
    </div>
    );
}

function Devices({devices}){
    return (
        <div className="flex flex-col gap-8 mt-0">
            {devices.map((device, i) => {
                return <div key={i}>{device}</div>
            })}
        </div>
    )
}

export default Plans;

//31, 77, 145
//121, 148, 189
//andar --> 228, 113, 109 , bahar --> 251, 240, 240 Cancelled
//andar --> 45, 100, 174 , bahar --> 194, 220, 252