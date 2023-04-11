import "./App.css";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/forgot-password/forgot-password";
import ResetPassword from "./pages/auth/reset-password";
import { Routes, Route } from 'react-router-dom';
// import ProtectedRoute from './pages/admin/ProtectedRoute';
// import ProtectedRoute from './pages/admin/ProtectedRoute';
// import Happy from "./components/Happy";
// import LandingPage from "./pages/LandingPage";
// import Happy from "./components/Happy";
import Error404 from "./pages/Error404";
import Error500 from "./pages/Error500";
import Layout from './components/Layout/index'




function App() {
  return (
    <div className="App">
      <Routes>

        {/* <Route path='/' element={
          <ProtectedRoute>
            <SharedLayout />
          </ProtectedRoute>
        }>

        </Route> */}
        <Route path="/" element={<Layout />} />
        <Route path="/landing" element={<Layout />} />
        <Route path="*" element={<Error404 />} />
        <Route path="/error" element={<Error500 />} />

        <Route path="/auth/">
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
