import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Toast from './components/Toast';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Liked from './pages/Liked';
import Profile from './pages/Profile';
import { useState } from 'react';

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="spinner" />;
  return user ? children : <Navigate to="/login" />;
}

function PublicRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="spinner" />;
  return user ? <Navigate to="/" /> : children;
}

function Layout() {
  const [toast, setToast] = useState(null);
  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2800);
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/"        element={<PrivateRoute><Home showToast={showToast} /></PrivateRoute>} />
          <Route path="/liked"   element={<PrivateRoute><Liked showToast={showToast} /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile showToast={showToast} /></PrivateRoute>} />
          <Route path="/login"   element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/signup"  element={<PublicRoute><Signup /></PublicRoute>} />
          <Route path="*"        element={<Navigate to="/" />} />
        </Routes>
      </div>
      {toast && <Toast msg={toast.msg} type={toast.type} />}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </AuthProvider>
  );
}
