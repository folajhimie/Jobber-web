import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Logo from "../../../assets/images/fontIcon/icon.png"
import Icon from "../../../assets/images/fontIcon/logo.png"
// import { setRegistration } from "./authSlice";
import axios from "axios";
import './forgot-password.css'

const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};





const ForgotPassword = () => {

    // const errRef = useRef();
    const [errMsg, setErrMsg] = useState('');
    const navigate = useNavigate();
    var [email, setEmail] = useState("");

    const emailInput = useRef();

    useEffect(() => {
        emailInput.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg("")
    }, [email]);

    const isInvalid = email === "";

    const forgot = async (e) => {
        e.preventDefault();
        if (!email) {
            setErrMsg("Please enter an email");
            return toast.error("Please enter an email")
        }

        if (!validateEmail(email)) {
            setErrMsg("Please enter a valid email");
            return toast.error("Please enter a valid email");
        }

        const userData = {
            email,
        };

        // await forgotPassword(userData);
        // setEmail("");

        const USERS_URL = "http://localhost:6565/api/v1/auth";

        try {
            const response = await axios.post(
                `${USERS_URL}/forgot-password`,
                userData
            );
            console.log("responding...", response.data);
            // const resetToken = response.data.data
            toast.success(response.data.message);
            setEmail("");
            if (response.data.status === true) {
                navigate('/auth/reset-password');
                return;
            }
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();

            toast.error(message);
            setErrMsg(message);
        }
        // errRef.current.focus();


    };

    const handleUserInput = (e) => setEmail(e.target.value);

    useEffect(() => {
        document.title = 'Forgot Password - Jobber';
    }, []);

    return (
        <div>
            <ToastContainer />
            

            <div className="flex md:h-screen bg-white relative  flex-col justify-center items-center dark:bg-gray-900 d-flex min-h-full px-4 sm:px-6 lg:px-8 py-10">
                <div className="border border-gray-300 bg-white flex flex-col justify-center items-center shadow-lg rounded p-10 ">
                    <div className="flex flex-col items-center space-y-3">
                        <div className="flex justify-center w-full mt-3">
                            <div
                                className="m-1"
                                style={{ width: "30px", height: "30px" }}
                            >

                                <img src={Logo} alt="jobber" width="70px" height="70px" />

                            </div>
                            <span className="mt-1 mr-6"><img src={Icon} alt="jobber" width="120px" height="120px" /></span>
                        </div>
                        <span className="text-2xl font-semi-bold leading-normal">Forgot Password</span>
                        <p className="leading-normal">Use your Jobber Account</p>
                    </div>
                    <form onSubmit={forgot} className="my-8 space-y-4 md:space-y-6" method="POST">
                        <div className="relative mb-2">
                            <input 
                                id="email" 
                                
                                className='w-full rounded px-3 border border-gray-300 py-3 focus:border-teal-700 focus:ring-1 focus:ring-teal-700 focus:outline-none input active:outline-none'
                                    
                                type="email"
                                name="email"
                                onChange={handleUserInput}
                                ref={emailInput}
                                value={email}
                                placeholder=" "
                                required=""
                                autoFocus 
                            />
                            <label 
                            htmlFor="email" 
                            className="label absolute mt-2 ml-3 leading-tighter text-gray-600 text-base cursor-text"
                            
                            >Email Address</label>
                            {errMsg && <p className="mb-4 text-sm text-red-700 flex justify-start">{errMsg}</p>}

                        </div>
                        <div className="space-y-9">
                            
                            <div className="mb-2 flex justify-center items-center flex-col w-full p-4">
                                <p className="text-sm text-slate-900">
                                    Have an account?{` `}
                                    <Link to="/auth/login" className="text-sm font-bold text-teal-600">
                                        Login
                                    </Link>
                                    {/* color: rgb(37 99 235) */}
                                </p>
                            </div>
                            <div className="text-sm">
                                <p>Not your computer? Use Guest mode to sign in privately.</p>
                                <span className="font-bold text-teal-600" href="#">Learn more</span>
                            </div>
                            <div className="text-sm flex justify-between items-center">
                                {/* <span  href="#">Create account</span> */}
                                <Link to="/auth/register" className="font-bold text-teal-500 py-2 px-3 rounded -ml-2 hover:bg-teal-100 hover:text-teal-700">
                                    Create Account
                                </Link>
                                <button 
                                    disabled={isInvalid}
                                    type="submit"
                                    className={`block bg-teal-700 hover:bg-teal-900 focus:bg-teal-900 text-white rounded-lg px-12 py-2 font-medium
                                    ${isInvalid && 'opacity-50'}`}
                                    
                                >Send</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
}


export default ForgotPassword;