import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/auth';

type ProtectedRouteProps = {
    children: React.ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { user, isLoading } = useAuth();

    if(isLoading) {
        return <div>Loading...</div>;
    }

    if(!user) {
        return <Navigate to="/login" replace />
    }

    return <>{children}</>
};

export default ProtectedRoute;