import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Axios from '../Axios/Axios';

function Login({setSelectedPlan}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);

    const navigate = useNavigate();

    async function submitLogin(e){
        e.preventDefault();
        if(email === '' || password === '') {
            alert("Please fill all the fields")
            return;
        } else if(password.length < 1) {
            alert("Password must be atleast 6 characters long")
            return;
        }
        console.log({email, password, remember});
        await Axios.post('login', {
            email: email,
            password: password
        }).then((res) => {
            if(res.data.msg === "User logged in successfully"){
                localStorage.setItem('email', email);
                localStorage.setItem('name', res.data.name);
                localStorage.setItem('current_plan', res.data.current_plan);
                localStorage.setItem('subscriptionId', res.data.subscriptionId);
                if(res.data.current_plan != "Free"){
                    setSelectedPlan(res.data.plan_details);

                    navigate("/currentPlan");
                    return;
                }
                navigate("/plans");
                console.log(res.data);
            } else{
                alert(res.data.msg);
            }
        });
        console.log("Login");
    }
    return(
        <div className="w-full max-w-md p-6 space-y-3 rounded-3xl bg-white text-black">
        <h1 className="text-xl font-bold text-center">Login to your account</h1>
        <form onSubmit={(e) => submitLogin(e)} className="space-y-6">
            <div className="space-y-1 text-sm">
                <label htmlFor="username" className="block text-black">Email</label>
                <input type="text" name="email" id="email" placeholder="manoj@richpanel.com" className="w-full px-4 py-3 rounded-md border-gray-700 bg-white text-black focus:dark:border-gray-400" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="space-y-1 text-sm">
                <label htmlFor="password" className="block text-black">Password</label>
                <input type="password" name="password" id="password" placeholder="Password" className="w-full px-4 py-3 rounded-md border-gray-700 bg-white text-black focus:dark:border-gray-400" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <div className="flex justify-end text-xs dark:text-gray-400">
                </div>
            </div>
            <div className="space-y-1 text-sm">
          <div className="flex items-center">
            <input type="checkbox" name="remember" id="remember" className="w-4 h-4 rounded-sm dark:bg-gray-700" />
            <label htmlFor="remember" className="ml-2 dark:text-gray-400" onChange={(e) => setRemember(!remember)}>Remember me</label>
        </div>
            </div>
            <button className="block w-full p-3 text-center rounded-sm text-white dark:bg-blue-900" type='submit'>Login</button>
        </form>
        <p className="text-xs text-center sm:px-6 text-black">New to MyApp?&nbsp;
        <Link to="/">Sign Up</Link>
        </p>
    </div>
      );
}

export default Login