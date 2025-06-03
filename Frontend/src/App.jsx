import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignup from "./pages/CaptainSignup";
import Dashboard from "./pages/Dashboard";
import CptDashboard from "./pages/CptDashboard";
import UserProtectedRoute from "./components/UserProtectedRoute";
import CaptainProtectedRoute from "./components/CaptainProtectedRoute";
import UserLogout from "./components/UserLogout";

const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<UserLogin />} />
                <Route path="/signup" element={<UserSignup />} />
                <Route path="/captain-login" element={<CaptainLogin />} />
                <Route path="/captain-signup" element={<CaptainSignup />} />
                <Route
                    path="/dashboard"
                    element={
                        <UserProtectedRoute>
                            <Dashboard />
                        </UserProtectedRoute>
                    }
                />
                <Route
                    path="/user/logout"
                    element={
                        <UserProtectedRoute>
                            <UserLogout />
                        </UserProtectedRoute>
                    }
                />
                <Route
                    path="/cpt-dashboard"
                    element={
                        <CaptainProtectedRoute>
                            <CptDashboard />
                        </CaptainProtectedRoute>
                    }
                />
            </Routes>
        </div>
    );
};

export default App;
