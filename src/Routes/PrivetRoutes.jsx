import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext/AuthContext';
import { Navigate } from 'react-router-dom';

const PrivetRoutes = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (user) {
        return children;
    }

    return <Navigate to="/login" replace />;
};

export default PrivetRoutes;
