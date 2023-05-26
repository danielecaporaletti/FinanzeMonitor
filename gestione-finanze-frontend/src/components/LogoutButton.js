import React from 'react';
import { useAuth } from '../api/AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const LogoutButton = () => {

    const { removeCredentials } = useAuth();
    const navigate = useNavigate();
  
    const handleLogout = () => {
        removeCredentials();
        navigate('/login');
    };

  return (
    <Button variant="outline-danger" onClick={handleLogout} className='ms-5'>
      Logout
    </Button>
  )
}

export default LogoutButton