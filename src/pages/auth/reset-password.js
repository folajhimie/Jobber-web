/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
import PulseLoader from "react-spinners/PulseLoader";
// import usePersist from "../../hooks/usePersist";
import { ToastContainer, toast } from "react-toastify";
import Logo from "../../assets/images/fontIcon/icon.png"
import Icon from "../../assets/images/fontIcon/logo.png"
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";




const ResetPassword = () => {


    // const errRef = useRef();
    // const { resetToken } = useParams();
    const [errMsg, setErrMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    const [isNumberValid, setIsNumberValid] = useState(false);
    const [isLowerValid, setIsLowerValid] = useState(false);
    const [isUpperValid, setIsUpperValid] = useState(false);
    const [isDigit, setIsDigit] = useState(false);
    const [isToggle, setIsToggle] = useState(true);
    const [isBackToggle, setIsBackToggle] = useState(true);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [code, setCode] = useState("");





    // create a ref for the password input field
    const passwordInput = useRef();

    // create a ref for the confirm password input field
    const confirmPasswordInput = useRef();
    const codeInput = useRef();

    const navigate = useNavigate();
    // const dispatch = useDispatch();

    const changeToggle = () => setIsToggle(!isToggle);
    const changeBackToggle = () => setIsBackToggle(!isBackToggle);
    // const handleUserInput = (e) => setPassword(e.target.value);
    const handleUserPassword = (e) => setConfirmPassword(e.target.value);
    const handleCode = (e) => setCode(e.target.value);



    useEffect(() => {
        passwordInput.current.focus();
        confirmPasswordInput.current.focus();
        codeInput.current.focus();

    }, []);



    function passwordVerify(e) {

        setPassword(e.target.value);

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


    const handleSubmit = async (e) => {
        e.preventDefault();
        // setIsLoading(true)



        if (password !== confirmPassword) {
            console.log("error message..", errMsg)
            toast.error("Password does not match");
            setTimeout(() => {
                // Do something after the timeout
                window.location.reload();
            }, 8000);
        }

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



        const userData = {
            password,
            confirmPassword,
            code
        };

        const BACKEND_URL = "http://localhost:6565/api/v1/auth";
        try {
            const response = await axios.post(
                `${BACKEND_URL}/reset-password`,
                userData
            );
            console.log("responding...", response.data);
            // const tokenCode = response.data.data;
            toast.success(response.data.message);
            console.log("Login in the Pattern..");
            if (response.data.status === true) {
                setIsLoading(false)
                navigate('/auth/login');
                return;
            }

        } catch (error) {
            // const { message } = await register();
            console.log("Apparently the Message..", error.response.data);
            if (error.response.status === 400) {
                setErrMsg(error.response.data.message);
                toast.error(error.response.data.message);
            } else if (error.response.status === 401) {
                setErrMsg("UnAuthorized");
                toast.error("UnAuthorized");
            } else if (error.status) {
                setErrMsg("No Server Response")
                toast.error("No Server Response");
            } else {
                setErrMsg(error.data?.message);
            }
            // errRef.current.focus();
        }

    }

    useEffect(() => {
        document.title = 'Reset Password - Space Box';
    }, []);

    if (isLoading) {
        return <PulseLoader color={"#FFF"} />
    }

    return (
        
        <div className="h-screen flex">
            <ToastContainer/>
            <div className="hidden md:flex w-1/2 bg-gradient-to-tr from-teal-800 to-gray-700  justify-around items-center">
                <div>
                    <h1 className="text-white font-bold text-4xl font-sans">Jobber</h1>
                    <p className="text-white mt-1">The Most Popular Job Vacancies Website In Nigeria</p>
                    {/* <button type="submit" className="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2">Read More</button> */}
                </div>
                
            </div>

            <div className="w-full md:w-1/2 py-2 md:flex md:justify-center md:items-center sm:flex sm:justify-center sm:items-center px-5 md:px-10">
                <div className="flex justify-center items-center">
                    <div className="flex flex-col">
                        <h3 className="font-medium text-xl text-black mb-2 flex justify-center items-center"> Change Your Password</h3>
                        <div className="w-full shadow-lg sm:overflow-hidden sm:rounded-md bg-lime-400 border border-slate-200">
                            <div className="flex justify-center w-full mt-3">
                                <div
                                    className="m-1"
                                    style={{ width: "30px", height: "30px" }}
                                >

                                    <img src={Logo} alt="jobber" width="70px" height="70px" />

                                </div>
                                <span className="mt-1 mr-6"><img src={Icon} alt="jobber" width="120px" height="120px" /></span>
                            </div>
                            <form onSubmit={handleSubmit} method="POST">
                                <div className="space-y-1 bg-white px-4 py-5 sm:p-6">
                                    <div className="grid grid-cols-1 gap-2">
                                    <label
                                            className="flex opacity-50 text-sm text-black mr-1 py-1 h-2 mb-2 font-light"
                                            htmlFor="code"
                                        >Enter Code:</label>
                                        <div className="mt-1 flex rounded-md shadow-sm">
                                            <input
                                                id="code"
                                                aria-label="code"
                                                ref={codeInput}
                                                name="code"
                                                value={code}
                                                type="text"
                                                placeholder="Enter your code"
                                                className="outline-none text-sm text-slate-900 w-5/6 mr-3 py-5 px-4 h-2 border border-gray-300 rounded mb-2"
                                                onChange={handleCode}
                                                required
                                            />
                                        </div>
                                        <label
                                            className="flex opacity-50 text-sm text-black mr-1 h-2 mb-2 font-light"
                                            htmlFor="password"
                                        >Enter new password:</label>
                                        <div className="mt-1 flex rounded-md shadow-sm">
                                            <input
                                                id="password"
                                                aria-label="Password"
                                                ref={passwordInput}
                                                name="password"
                                                value={password}

                                                type={`${isToggle ? "password" : "text"}`}
                                                placeholder="Password"
                                                className="outline-none text-sm text-slate-900 w-full mr-3 py-5 px-4 h-2 border border-gray-300 rounded mb-2"
                                                onChange={passwordVerify}
                                                required
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
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-teal-700">
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
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-teal-700">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            </svg>
                                                        </div>
                                                }
                                            </div>


                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-2">
                                        <label
                                            className="flex opacity-50 text-sm text-black mr-3 py-3 h-2 mb-2 font-light"
                                            htmlFor="confirmPassword"
                                        >Confirm Password</label>
                                        <div className="mt-1 flex rounded-md shadow-sm">
                                            <input
                                                id="confirmPassword"
                                                aria-label="confirmPassword"
                                                ref={confirmPasswordInput}
                                                name="confirmPassword"
                                                value={confirmPassword}
                                                type={`${isBackToggle ? "password" : "text"}`}
                                                placeholder="Confirm Password"
                                                className="outline-none text-sm text-slate-900 w-full mr-3 py-5 px-4 h-2 border border-gray-300 rounded mb-2"
                                                onChange={handleUserPassword}
                                                required
                                            />

                                            <div className="flex mt-3 flex-col h-6 w-full"
                                                onClick={changeBackToggle}
                                                style={{
                                                    position: 'relative',
                                                    width: "30px",
                                                    right: "45px",
                                                    lineHeight: "20px",
                                                }}
                                            >
                                                {
                                                    isBackToggle ?
                                                        <div className="cursor-pointer">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-teal-700">
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
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-teal-700">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            </svg>
                                                        </div>
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex justify-start w-full my-2">
                                            {
                                                isLowerValid ?
                                                    <div className="flex justify-start w-full my-2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-teal-900">
                                                            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                                                        </svg>

                                                        <span className="text-teal-900 flex justify-center items-center flex-col text-center h-2 font-light text-base ml-5 mt-2 mb-1 opacity-100">
                                                            At least 1 lower case character
                                                        </span>

                                                    </div>
                                                    :
                                                    <div className="flex justify-start w-full my-2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7 text-gray-400">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        <span className="flex justify-center items-center flex-col text-center h-2 font-light text-base ml-5 mt-2 mb-1 opacity-100">
                                                            At least 1 lower case character
                                                        </span>
                                                    </div>
                                            }

                                        </div>
                                        <div className="flex justify-start w-full my-2">
                                            {
                                                isUpperValid ?
                                                    <div className="flex justify-start w-full my-2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-teal-900">
                                                            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                                                        </svg>

                                                        <span className="text-teal-900 flex justify-center items-center flex-col text-center h-2 font-light text-base ml-5 mt-2 mb-1 opacity-100">
                                                            At least 1 upper-case character
                                                        </span>
                                                    </div>
                                                    :
                                                    <div className="flex justify-start w-full my-2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7 text-gray-400">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        <span className="flex justify-center items-center flex-col text-center h-2 font-light text-base ml-5 mt-2 mb-1 opacity-100">
                                                            At least 1 upper case character
                                                        </span>
                                                    </div>
                                            }
                                        </div>
                                        <div className="flex justify-start w-full my-2">
                                            {
                                                isNumberValid

                                                    ?
                                                    <div className="flex justify-start w-full my-2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-teal-900">
                                                            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                                                        </svg>

                                                        <span className="text-teal-900 flex justify-center items-center flex-col text-center h-2 font-light text-base ml-5 mt-2 mb-1 opacity-100">
                                                            At least 8 total characters
                                                        </span>
                                                    </div>
                                                    :
                                                    <div className="flex justify-start w-full my-2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7 text-gray-400">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>

                                                        <span className="flex justify-center items-center flex-col text-center h-2 font-light text-base ml-5 mt-2 mb-1 opacity-100">
                                                            At least 8 total characters
                                                        </span>
                                                    </div>
                                            }
                                        </div>
                                        <div className="flex justify-start w-full my-2">
                                            {
                                                isDigit

                                                    ?
                                                    <div className="flex justify-start w-full my-2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-teal-900">
                                                            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                                                        </svg>

                                                        <span className="text-teal-900 flex justify-center items-center flex-col text-center h-2 font-light text-base ml-5 mt-2 mb-1 opacity-100">
                                                            At least 1 digit character
                                                        </span>
                                                    </div>
                                                    :
                                                    <div className="flex justify-start w-full my-2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7 text-gray-400">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>

                                                        <span className="flex justify-center items-center flex-col text-center h-2 font-light text-base ml-5 mt-2 mb-1 opacity-100">
                                                            At least 1 digit character
                                                        </span>
                                                    </div>
                                            }

                                        </div>
                                    </div>

                                </div>
                                <div className="bg-gray-50 px-2 py-2 text-right sm:px-4">
                                    <button
                                        type="submit"
                                        className="w-full inline-flex justify-center rounded-md border border-transparent bg-teal-700 py-3 px-2 text-sm font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-800 focus:ring-offset-2"
                                    >
                                        Create new password
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}


export default ResetPassword;
