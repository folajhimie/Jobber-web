import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useRegisterMutation } from "../../app/features/auth/authApiSlice";
import PulseLoader from "react-spinners/PulseLoader";
// import usePersist from "../../hooks/usePersist";
import { ToastContainer, toast } from "react-toastify";
import { setRegistration } from "../../app/features/auth/authSlice";
import ImageSlider from "../../components/ImageSlider/ImageSlider";
import 'react-toastify/dist/ReactToastify.css';
import Logo from "../../assets/images/fontIcon/icon.png";
import Icon from "../../assets/images/fontIcon/logo.png"
// import axios from "axios";



const Register = () => {

    const errRef = useRef();
    const [errMsg, setErrMsg] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isToggle, setIsToggle] = useState(true);
    const [isNumberValid, setIsNumberValid] = useState(false);
    const [isLowerValid, setIsLowerValid] = useState(false);
    const [isUpperValid, setIsUpperValid] = useState(false);
    const [isDigit, setIsDigit] = useState(false);
    var [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        isAdmin: true,
    });

    const [register, { isLoading }] = useRegisterMutation();

    const userRef = useRef();
    // create a ref for the email input field
    const emailInput = useRef();

    // create a ref for the password input field
    const passwordInput = useRef();

    const changeToggle = () => setIsToggle(!isToggle);

    var { username, password, email } = user;

    const isInvalid = password === "" || email === "" || username === "";


    const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

    function passwordVerify(e) {

        setUser({ ...user, password: e.target.value });

        if (password.length >= 8) {
            console.log("what is going on..", password);
            setIsNumberValid(true)
        }

        if (/[0-9]/.test(password)) {
            setIsDigit(true)
        }

        if (/[A-Z]/.test(password)) {
            setIsUpperValid(true)
        }

        if (/[a-z]/.test(password)) {
            setIsLowerValid(true)
        }
    }


    useEffect(() => {
        userRef.current.focus();
        emailInput.current.focus();
        passwordInput.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg("")
    }, [username, password, email]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!isNumberValid) {
                console.log("what is going on..", password);
                toast.error("At least 8 total characters");
                return;
            }
            if (!isLowerValid) {
                console.log("what is going on..", password);
                toast.error("At least 1 lower case character");
                return;
            }
            if (!isUpperValid) {
                console.log("what is going on..", password);
                toast.error("At least 1 upper case character");
                return;
            }
            if (!isDigit) {
                console.log("what is going on..", password);
                toast.error("At least 1 digit character");
                return;
            }

            const { token, status, message } = await register({ username, password, email }).unwrap();
            console.log("token api..", status, message);
            console.log("created for Eterenality..", username, email);
            dispatch(setRegistration(token))
            if (status === "Pending") {
                console.log(status, "message");
                toast.success("Created Successfully");
                navigate("/landing");
                return;
            }
            console.log("only user..", token, status)
            console.log("SUCCESSFULLY..");
            toast.success("User successfully Created");
            navigate("/auth/login")
        } catch (error) {
            console.log("Apparently the Message..", error.data);
            console.log("email Response...", error.data);
            if (error.status === 400) {
                setErrMsg(error.data.message);
                toast.error(error.data.message);
            } else if (error.data.message.toLowerCase().includes("email")) {
                setErrMsg(error.data.message);
                toast.error(error.data.message);
            } else if (error.data.message.toLowerCase().includes("username")) {
                setErrMsg(error.data.message);
                toast.error(error.data.message);
            } else if (error.status === 401) {
                setErrMsg("UnAuthorized");
                toast.error("UnAuthorized");
            } else if (error.status) {
                setErrMsg("No Server Response")
                toast.error("No Server Response");
            } else {
                setErrMsg(error.data?.message);
            }
            errRef.current.focus();
        }

    }

    useEffect(() => {
        document.title = 'Register - Jobber';
    }, []);

    if (isLoading) {
        return <PulseLoader color={"#FFF"} />
    }

    return (
        <div>
            <ToastContainer />
            <div className="min-w-screen min-h-screen bg-gray-50 flex items-center justify-center px-5 py-5">
                <div className="bg-gray-100 text-gray-500 shadow-lg hover:shadow-2xl w-9/12 overflow-hidden">
                    <div className="md:flex w-full">
                        <div className="hidden md:block w-1/2 bg-gradient-to-tr from-emerald-500 to-teal-800">
                            <div className="flex flex-col justify-around h-full">
                                <ImageSlider/>
                            </div>
                        </div>

                        <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
                            <div className="text-center mb-10">
                                <div className="flex justify-center w-full">
                                    <div
                                        className="m-1"
                                        style={{ width: "30px", height: "30px" }}
                                    >

                                        <img src={Logo} alt="jobber" width="70px" height="70px" />

                                    </div>
                                    <span className="mt-1 mr-6"><img src={Icon} alt="jobber" width="120px" height="120px" /></span>
                                </div>
                                <p>Enter your information to register</p>
                            </div>

                            {errMsg && <p className="mb-4 text-xs text-red-primary">{errMsg}</p>}

                            <form onSubmit={handleSubmit} method="POST">
                                <div className="flex -mx-3">
                                    <div className="w-full px-3 mb-5">
                                        <label htmlFor="text" className="flex justify-start justify-items-start items-start mb-2 text-sm font-semibold text-gray-500 ">Username:</label>
                                        <div className="flex">
                                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" className="iconify iconify--wpf">
                                                    <path d="M16.563 15.9c-.159-.052-1.164-.505-.536-2.414h-.009c1.637-1.686 2.888-4.399 2.888-7.07c0-4.107-2.731-6.26-5.905-6.26c-3.176 0-5.892 2.152-5.892 6.26c0 2.682 1.244 5.406 2.891 7.088c.642 1.684-.506 2.309-.746 2.397c-3.324 1.202-7.224 3.393-7.224 5.556v.811c0 2.947 5.714 3.617 11.002 3.617c5.296 0 10.938-.67 10.938-3.617v-.811c0-2.228-3.919-4.402-7.407-5.557z" fill="currentColor">
                                                    </path>
                                                </svg>
                                            </div>
                                            <input
                                                type="text"
                                                className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-teal-800 text-gray-800"
                                                placeholder="James Bond"                   
                                                ref={userRef}
                                                name="username"
                                                value={username}
                                                onChange={handleChange}   
                                            />
                                        </div>
                                    </div>

                                </div>
                                <div className="flex -mx-3">
                                    <div className="w-full px-3 mb-5">
                                        <label htmlFor="email" className="flex justify-start justify-items-start items-start mb-2 text-sm font-semibold text-gray-500 ">Email Address:</label>
                                        <div className="flex">
                                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
                                                </svg>
                                            </div>
                                            <input
                                                type="email"
                                                className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-teal-800 text-gray-800"
                                                placeholder="jamesbond@example.com"
                                                name="email"
                                                onChange={handleChange}
                                                ref={emailInput}
                                                value={email}
                                            />
                                        </div>
                                    </div>

                                </div>
                                <div className="flex -mx-3">
                                    <div className="w-full px-3 mb-12">

                                        <label htmlFor="password" className="flex justify-start justify-items-start items-start mb-2 text-sm font-semibold text-gray-500 ">Password:</label>
                                        <div className="flex w-full">
                                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                {/* <i className="mdi mdi-lock-outline text-gray-400 text-lg"></i> */}
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path>
                                                </svg>
                                            </div>
                                            <input
                                                name="password"
                                                type={`${isToggle ? "password" : "text"}`}
                                                className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-teal-800 text-gray-800"
                                                placeholder="************"
                                                onChange={passwordVerify}
                                                ref={passwordInput}
                                                value={password}
                                            />
                                            <div className="flex mt-3 flex-col h-6"
                                                onClick={changeToggle}
                                                style={{
                                                    position: 'relative',
                                                    width: "30px",
                                                    right: "45px",
                                                    lineHeight: "20px",
                                                }}
                                            >
                                                {
                                                    isToggle ?
                                                        <div className="cursor-pointer">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-teal-600">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                                            </svg>
                                                        </div>

                                                        :
                                                        <div className="cursor-pointer"
                                                            style={{
                                                                position: 'absolute',
                                                                width: "40px",
                                                                height: "40px",


                                                                lineHeight: "20px",
                                                            }}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-teal-600">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            </svg>
                                                        </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex -mx-3">
                                    <div className="w-full px-3 mb-5">
                                        <button
                                            disabled={isInvalid}
                                            type="submit"


                                            className={`block w-full max-w-2xl mx-auto bg-teal-700 hover:bg-teal-700 focus:bg-teal-900 text-white rounded-lg px-3 py-3 font-semibold 
                                            ${isInvalid && 'opacity-50'}`}
                                        >Register</button>
                                    </div>
                                </div>

                            </form>
                            <div className="mb-2 flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-300">
                                <p className="text-sm text-slate-900">
                                    Have an account?{` `}
                                    <Link to="/auth/login" className=" font-medium text-teal-600">
                                        Login
                                    </Link>
                                    {/* color: rgb(37 99 235) */}
                                </p>
                            </div>

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
                            htmlFor="username"
                        >Username:</label>
                        <input
                            id="username"
                            aria-label="Enter your username"
                            ref={userRef}
                            name="username"
                            value={username}
                            type="text"
                            placeholder="Username"
                            className="text-sm text-slate-900 w-full mr-3 py-5 px-4 h-2 border border-gray-300 rounded mb-2"
                            onChange={handleChange}
                            required
                        />
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
                            type={`${isToggle ? "password" : "text"}`}
                            aria-label="Enter your Password"
                            placeholder="Enter your Password"
                            className="text-sm text-slate-900 w-full mr-3 py-5 px-4 h-2 border border-gray-300 rounded mb-2"
                            onChange={passwordVerify}
                            ref={passwordInput}
                            value={password}
                        />
                        <div className="flex mt-3 flex-col h-6"
                            onClick={changeToggle}
                            style={{
                                position: 'relative',
                                width: "30px",
                                right: "45px",
                                lineHeight: "20px",
                            }}
                        >
                            {
                                isToggle ?
                                    <div className="cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-700">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                        </svg>
                                    </div>

                                    :
                                    <div className="cursor-pointer"
                                        style={{
                                            position: 'absolute',
                                            width: "40px",
                                            height: "40px",


                                            lineHeight: "20px",
                                        }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-700">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                            }
                        </div>

                        <button
                            disabled={isInvalid}
                            type="submit"

                            className={`flex justify-center items-center flex-col text-center bg-blue-600 text-black w-full rounded h-2 font-medium py-6 px-5 my-8
                            ${isInvalid && 'opacity-50'}`}
                        >
                            Sign Up
                        </button>
                    </form>
                </div>
                <div className="mb-12 flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-300">
                    <p className="text-sm text-slate-900">
                        Have an account?{` `}
                        <Link to="/login" style={{ color: "rgb(37 99 235)" }} className=" font-medium text-blue-600">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}


export default Register;