
import './App.css';
import { Routes, Route, Navigate, useNavigate, BrowserRouter } from "react-router-dom";
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import Plans from './Components/Plans/Plans';
function App() {
  return (
    <BrowserRouter>
    <div className='flex flex-col justify-center items-center h-[100vh] dark:bg-blue-900'>
      <Routes>
        <Route path="/Signin" element={<Login />}/>
        <Route path="/" element={<Signup />} />
        <Route path="/plans" element={<Plans />} />
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
