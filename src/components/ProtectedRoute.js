// import React from 'react';
// import { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";



export const AuthorizeUser = ({ children }) => {
    // const navigate = useNavigate();
    const auth = useSelector((state) => state.auth);
    const token = localStorage.getItem('token');

    if (!token) {
        console.log("token for the end..", token)
        // navigate("/");
        // return;
        return <Navigate to={'/'} replace={true}></Navigate>
    }

    if (!auth) {
        console.log("auth for the end..", auth)
        // navigate("/");
        // return;
        return <Navigate to={'/'} replace={true}></Navigate>
    }

    return children;
}


export const ProtectRoute = ({ children }) => {
    // const navigate = useNavigate();
    const auth = useSelector((state) => state.auth);
    const token = localStorage.getItem('token');

    if (!token) {
        console.log("token for the end..", token)
        // navigate("/");
        // return;
        return <Navigate to={'/'} replace={true}></Navigate>
    }

    if (!auth) {
        console.log("auth for the end..", auth)
        // navigate("/");
        // return;
        return <Navigate to={'/'} replace={true}></Navigate>
    }

    return children;
}
