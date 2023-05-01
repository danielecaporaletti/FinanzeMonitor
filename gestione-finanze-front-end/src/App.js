import MainPage from './pages/MainPage';
import Movimenti from './pages/Movimenti';
import Conti from './pages/Conti';
import Login from './pages/Login';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './api/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import NotFound from './pages/NotFound';
import { ContiGetCallProvider } from './getCalls/ContiGetCall';
import { CategoriaGetCallProvider } from './getCalls/CategoriaGetCall';
import Grafici from './pages/Grafici';
import { AnniGetCallProvider } from './getCalls/AnniGetCall';

function App() {
  return (
    <>
    <AuthProvider>
    <ContiGetCallProvider>
    <CategoriaGetCallProvider>
    <AnniGetCallProvider>
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<PrivateRoute><MainPage /></PrivateRoute>} />
                <Route path="/movimenti" element={<PrivateRoute><Movimenti /></PrivateRoute>} />
                <Route path="/conti" element={<PrivateRoute><Conti /></PrivateRoute>} />
                <Route path="/grafici" element={<PrivateRoute><Grafici /></PrivateRoute>} />
                <Route path="/*" element={<NotFound />} />
            </Routes>
        </Router>
    </AnniGetCallProvider>
    </CategoriaGetCallProvider>
    </ContiGetCallProvider>
    </AuthProvider>
    </>
  );
}

export default App;