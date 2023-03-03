// import { useAppContext } from "../context/appContext"
import { Navigate } from 'react-router-dom';
// import { useLoginMutation } from "../../app/features/auth/authApiSlice";
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../../app/features/auth/authSlice';


const ProtectedRoute = ({ children }) => {
  // const { user } = useAppContext()
  const token = useSelector(selectCurrentToken)
  // const [login ] = useLoginMutation();
  // const { accessToken } = await login()



  if (!token || token === null ) {
    console.log("happy for you..", token);
    return <Navigate to="/landing" />
  }
  return children
}

export default ProtectedRoute
