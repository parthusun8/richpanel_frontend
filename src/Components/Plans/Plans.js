import Axios from "../Axios/Axios"
import React, {useEffect, useState} from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Typography } from "@mui/material";

function Plans() {

    const [plans, setPlans] = useState([]);

    const [currentSelected, setCurrentSelected] = useState(0);
    const [planType, setPlanType] = useState("Monthly");
    const rowOptions = [
        planType == "Monthly" ? "Monthly price" : "Yearly price",
        "Video quality",
        "Resolution",
        "Devices you can use to watch"
    ]

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
                <TableCell style={{"paddingRight" : "em"}}>Toggle Switch</TableCell>
                {plans.map((plan, i) => {
                    return<TableCell align="right" key={i}><PlanCard key={i} planName={plan.planName} id={i} currentSelected={currentSelected} setCurrentSelected={setCurrentSelected}/></TableCell>
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
                    return <TableCell key={j}>
                    {planType == "Monthly" ? plan.MonthlyPrice : plan.yearlyPrice}
                    
                </TableCell>
                }) : <></>}
                {i == 1 ? plans.map((plan, i) => {
                    return <TableCell key={i}>
                    {plan.videoQuality}
                </TableCell>
                }) : <></>}
                {i == 2 ? plans.map((plan, i) => {
                    return <TableCell key={i}>
                    {plan.Resolution}
                </TableCell>
                }) : <></>}
                {i == 3 ? plans.map((plan, i) => {
                    return <TableCell key={i}>
                    <Devices devices={plan.devices}/>
                </TableCell>
                }) : <></>}
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </div>
    <Button variant="contained" size="large" style={{"width" : "10em", "backgroundColor" : "rgb(31, 77, 145)"}}>
          Next
    </Button>
    </div>
  )
}

function PlanCard({planName, id, setCurrentSelected, currentSelected}){
    return (
         <div>
             <div className= {(id) === currentSelected ? "flex flex-col w-[6em] h-[6em] bg-box-blue-color items-center justify-center" : "flex flex-col w-[6em] h-[6em] bg-box-light-blue-color items-center justify-center opacity-50"} onClick={() => setCurrentSelected(id)}>
                <div className="text-white text-xs">{planName}</div> 
            </div>
         </div>
    )
}

function Devices({devices}){
    return (
        <div className="flex flex-col gap-8">
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