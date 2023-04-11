/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../app/features/auth/authSlice";
import { useLoginMutation } from "../../app/features/auth/authApiSlice";
import PulseLoader from "react-spinners/PulseLoader";
// import usePersist from "../../hooks/usePersist";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Logo from "../../assets/images/fontIcon/icon.png";
import Icon from "../../assets/images/fontIcon/logo.png"

// import axios from "axios";



const Register = () => {
    const errRef = useRef();
    const [errMsg, setErrMsg] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [login, { isLoading }] = useLoginMutation();

    var [userData, setUserData] = useState({
        email: "",
        password: "",
    });

    const emailInput = useRef();

    // create a ref for the password input field
    const passwordInput = useRef();

    var { password, email } = userData;

    const isInvalid = password === "" || email === "";


    const handleChange = (e) => setUserData({ ...userData, [e.target.name]: e.target.value });

    const handlePassword = (e) => setUserData({ ...userData, password: e.target.value });

    useEffect(() => {
        emailInput.current.focus();
        passwordInput.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg("")
    }, [password, email]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { accessToken } = await login({ email, password }).unwrap()
            dispatch(setCredentials({ accessToken }))
            setUserData({ ...userData, email: " " })
            setUserData({ ...userData, password: " " })
            console.log("Login don happen...", email, "password of life..", password);
            toast.success("Login successfully");
            navigate('/dashboard')
        } catch (error) {
            console.log("Apparently the Message..", error.data);
            console.log("email Response...", error.data.message.toLowerCase().includes("email"));
            if (error.status === 400) {
                setErrMsg(error.data.message);
                toast.error(error.data.message);
            } else if (error.data.message.toLowerCase().includes("email")) {
                setErrMsg(error.data.message);
                toast.error(error.data.message);
            } else if (error.status === 401) {
                setErrMsg("UnAuthorized");
                toast.error("UnAuthorized");
            } else if(error.status) {
                setErrMsg("No Server Response")
                toast.error("No Server Response");
            } else {
                setErrMsg(error.data?.message);
            }
            errRef.current.focus();
        }

    }

    useEffect(() => {
        document.title = 'Login - Jobber';
    }, []);

    const errClass = errMsg ? "errmsg" : "offscreen";

    if (isLoading) {
        return <PulseLoader color={"#FFF"} />
    }



    return (
        <div>
            <ToastContainer />
            <div className=" dark:bg-gray-900 d-flex min-h-full items-center justify-center  px-4 sm:px-6 lg:px-8">
                <div className=" flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
                    <div className="border border-gray-200 w-full bg-white rounded-lg  dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 shadow-xl hover:shadow-2xl">
                        <div className="flex justify-center w-full mt-6">
                            <div
                                className="m-1"
                                style={{ width: "30px", height: "30px" }}
                            >

                                <img src={Logo} alt="jobber" width="70px" height="70px" />

                            </div>
                            <span className="mt-1 mr-6"><img src={Icon} alt="jobber" width="120px" height="120px" /></span>
                        </div>
                        <p ref={errRef} className={errClass} aria-live="assertive">{errMsg}</p>
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign in to your account
                            </h1>
                            <p className="mt-2 text-center text-sm text-gray-600">
                                Or{' '}

                                <Link to="#" className="text-sm font-medium text-teal-700 dark:text-primary-500">
                                    start your 14-day free trial
                                </Link>
                            </p>
                            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" method="POST">
                                <div className="d-flex justify-start">
                                    <label htmlFor="email" className="flex justify-start justify-items-start items-start mb-2 text-sm font-medium text-gray-900 dark:text-white">Email Address:</label>
                                    <div className="flex">
                                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
                                            </svg>
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-teal-700"
                                            placeholder="name@company.com"
                                            onChange={handleChange}
                                            ref={emailInput}
                                            value={email}
                                            required=""
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="password" className="flex justify-start justify-items-start items-start mb-2 text-sm font-medium text-gray-900 dark:text-white">Password:</label>

                                    <div className="flex">
                                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                            <i className="mdi mdi-lock-outline text-gray-400 text-lg"></i>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path>
                                            </svg>
                                        </div>
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            placeholder="************"
                                            className="-ml-10 pl-10 pr-3 py-2  bg-gray-50 border-2 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500 focus:border-teal-700 focus:outline-none focus:ring-teal-700"
                                            value={password}
                                            onChange={handlePassword}
                                            ref={passwordInput}
                                            autoComplete="off"
                                            required=""
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-teal-300 dark:bg-teal-700 dark:border-teal-600 dark:focus:ring-teal-600 dark:ring-offset-teal-800" required="" />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                        </div>
                                    </div>
                                    <Link to="/auth/forgot-password" className="text-sm font-medium text-teal-700 dark:text-primary-500">
                                        Forgot password?
                                    </Link>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        disabled={isInvalid}
                                        className={`group relative flex w-full justify-center rounded-md border border-transparent bg-teal-800  py-2 px-4 text-sm font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-800 focus:ring-offset-2 
                                        ${isInvalid && 'opacity-50'}`}
                                    >
                                        Sign In
                                    </button>
                                    <div className="flex items-center justify-center space-x-2 my-5">
                                        <span className="h-px w-16 bg-gray-100"></span>
                                        <span className="text-gray-300 font-normal">or</span>
                                        <span className="h-px w-16 bg-gray-100"></span>
                                    </div>
                                    <div className="flex justify-center gap-5 w-full ">

                                        <button type="submit" className="w-full flex items-center justify-center mb-6 md:mb-0 border border-gray-300 hover:border-gray-50 hover:bg-gray-50 text-sm text-gray-500 p-3  rounded-lg tracking-wide font-medium  cursor-pointer transition ease-in duration-500">
                                            <svg className="w-4 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="25px" height="25px"><path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z"></path><path fill="#34A853" d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 3.067A11.965 11.965 0 0 0 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987Z"></path><path fill="#4A90E2" d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21Z"></path><path fill="#FBBC05" d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067Z"></path></svg>
                                            <span className="ml-6">Google</span>
                                        </button>
                                        <button type="submit" className="w-full flex items-center justify-center mb-6 md:mb-0 border border-gray-300 hover:border-gray-50 hover:bg-gray-50 text-sm text-gray-500 p-3 rounded-lg tracking-wide font-medium  cursor-pointer transition ease-in duration-500 px-">

                                            <svg className="w-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path fill="#039be5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z" /><path fill="#fff" d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z" /></svg>
                                            <span className="ml-6">Facebook</span>
                                        </button>

                                    </div>
                                    <button className="mt-3 hidden flex-wrap justify-center w-full border border-gray-300 hover:border-gray-500 px-2 py-1.5 rounded-md">
                                        <img src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA" alt="Instagram" className="w-5 mr-2" />
                                        <span className="d-flex justify-content-center">Sign in with Google</span>
                                    </button>
                                </div>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don’t have an account yet?{' '}
                                    <Link to="/auth/register" className="text-sm font-medium text-teal-700  dark:text-primary-500">
                                        Sign Up
                                    </Link>
                                </p>                             
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className="hidden flex-col w-2/5 mt-12">
                <div className="mt-12 flex flex-col items-center bg-white p-4 border border-gray-300 mb-4 rounded">
                    <h1 className="flex justify-center w-full">
                        <div
                            style={{ width: "40px", height: "40px" }}
                        >

                            <img src={Logo} alt="jobber" width="50px" height="50px" />
                        </div>
                    </h1>

                    {errMsg && <p className="mb-4 text-xs text-red-primary">{errMsg}</p>}

                    <form onSubmit={handleSubmit} method="POST">
                        <label
                            className="text-lg text-black mr-3 py-5 h-2 mb-2 font-medium"
                            htmlFor="email"
                        >Email Address:</label>
                        <input

                            name="email"
                            aria-label="Enter your email address"
                            type="text"
                            placeholder="Email address"
                            className="text-sm text-slate-900 w-full mr-3 py-5 px-4 h-2 border border-gray-300 rounded mb-2"
                            onChange={handleChange}
                            ref={emailInput}
                            value={email}
                        />
                        <label
                            className="text-lg text-black mr-3 py-5 h-2 mb-2 font-medium"
                            htmlFor="password"
                        >Password:</label>
                        <input

                            name="password"
                            type="password"
                            aria-label="Enter your Password"
                            placeholder="Enter your Password"
                            className="text-sm text-slate-900 w-full mr-3 py-5 px-4 h-2 border border-gray-300 rounded mb-2"
                            value={password}
                            onChange={handlePassword}
                            ref={passwordInput}
                            autoComplete="off"
                            required
                        />
                        <button
                            disabled={isInvalid}
                            type="submit"

                            className={`flex justify-center items-center flex-col text-center bg-blue-600 text-black w-full rounded h-2 font-medium py-6 px-5 my-8
                            ${isInvalid && 'opacity-50'}`}
                        >
                            Sign In
                        </button>
                    </form>
                </div>
                <Link to="/forgot-password" style={{ color: "rgb(37 99 235)" }} className="text-sm font-medium text-blue-600">
                    Forgot Password?
                </Link>
            </div>
        </div>
    );
}


export default Register;