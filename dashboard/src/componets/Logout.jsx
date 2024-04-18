
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../store/auth';

function Logout() {
  const { LogoutUser, isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      LogoutUser();
    }
  }, [isLoggedIn, LogoutUser]);

 
  return <Navigate to="/Login" />
}

export default Logout;
