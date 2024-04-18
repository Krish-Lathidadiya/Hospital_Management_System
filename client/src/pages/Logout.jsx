
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../store/auth';

function Logout() {
  const { LogoutUser, isLoggedIn } = useAuth();
  const { setName } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      LogoutUser();
    }
    setName("");
  }, [isLoggedIn, LogoutUser]);

 
  return <Navigate to="/login" />
}

export default Logout;
