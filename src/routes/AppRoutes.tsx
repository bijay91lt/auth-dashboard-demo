import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "./ProtectedRoute";
import { Navigate } from "react-router-dom";

const AppRoutes = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Navigate to="/dashboard" replace />
                        </ProtectedRoute>
                    }
                />
                <Route path = "/login" element = {<Login />} />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                    />

                    <Route path ="*" element = {<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes