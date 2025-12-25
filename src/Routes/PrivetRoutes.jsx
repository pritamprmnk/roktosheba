import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext/AuthContext';
import { Navigate } from 'react-router-dom';
import Loader from '../components/Loader/Loader';

const PrivetRoutes = ({ children }) => {
    const { user, loading, roleLoading, userStatus } = useContext(AuthContext);

    if (loading || roleLoading) {
        return <Loader></Loader>;
    }

    if (user || userStatus=="blocked") {
        return children;
    }

    return <Navigate to="/login" replace />;
};

export default PrivetRoutes;
