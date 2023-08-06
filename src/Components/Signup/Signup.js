import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Axios from '../Axios/Axios';

function Signup() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);

    const navigate = useNavigate();

    async function submitSignup(e){
        e.preventDefault();
        if(email === '' || password === '' || name === '') {
            alert("Please fill all the fields")
            return;
        } else if(password.length < 1) {
            alert("Password must be atleast 6 characters long")
            return;
        }
        await Axios.post("register", {
            name: name,
            email: email,
            password: password
        }).then((res) => {
            if(res.data.msg === "User registered successfully"){
                localStorage.setItem('email', email);
                localStorage.setItem('name', name);
                navigate("/Signin");
                console.log(res.data);
            } else{
                alert(res.data.msg);
            }
        });
    }

    return(
        <div className="w-full max-w-md p-6 space-y-3 rounded-3xl bg-white text-black">
        <h1 className="text-xl font-bold text-center">Create Account</h1>
        <form onSubmit={(e) => submitSignup(e)} className="space-y-6">
            <div className="space-y-1 text-sm">
                <label htmlFor="name" className="block text-black">Name</label>
                <input type="text" name="name" id="name" placeholder="Manoj Kumar" className="w-full px-4 py-3 rounded-md border-gray-700 bg-white text-black focus:dark:border-gray-400" onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className="space-y-1 text-sm">
                <label htmlFor="username" className="block text-black">Email</label>
                <input type="text" name="email" id="email" placeholder="manoj@richpanel.com" className="w-full px-4 py-3 rounded-md border-gray-700 bg-white text-black focus:dark:border-gray-400" onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="space-y-1 text-sm">
                <label htmlFor="password" className="block text-black">Password</label>
                <input type="password" name="password" id="password" placeholder="Password" className="w-full px-4 py-3 rounded-md border-gray-700 bg-white text-black focus:dark:border-gray-400" onChange={(e) => setPassword(e.target.value)}/>
                <div className="flex justify-end text-xs dark:text-gray-400">
                </div>
            </div>
            <div className="space-y-1 text-sm">
          <div className="flex items-center">
            <input type="checkbox" name="remember" id="remember" className="w-4 h-4 rounded-sm dark:bg-gray-700" />
            <label htmlFor="remember" className="ml-2 dark:text-gray-400" onChange={(e) => setRemember(!remember)}>Remember me</label>
        </div>
            </div>
            <button className="block w-full p-3 text-center rounded-sm text-white dark:bg-blue-900" type='submit'>Sign Up</button>
        </form>
        <p className="text-xs text-center sm:px-6 text-black">Already have an account?&nbsp;
            <Link to="/Signin" className="dark:text-blue-950 no-underline">Login</Link>
        </p>
    </div>
      );
}

export default Signup