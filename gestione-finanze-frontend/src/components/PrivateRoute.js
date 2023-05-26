import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../api/AuthContext';

const PrivateRoute = ({ children }) => {
  const { auth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.username === null || auth.password === null) {
      navigate('/moneymonitor/login', { replace: true });
    }
  }, [auth, location, navigate]);

  return auth.username !== null && auth.password !== null ? children : null;
};

export default PrivateRoute;