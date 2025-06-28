import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners'; // مكتبة التحميل
import './login.css'; // ملف الـ CSS المخصص

function Login() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // تفعيل التحميل

    try {
      let response;
      if (isRegistering) {
        response = await axios.post('http://localhost:4000/api/user/register', { name, email, password });
      } else {
        response = await axios.post('http://localhost:4000/api/user/login', { email, password });
      }

      localStorage.setItem('atoken', response.data.token);
      toast.success(`${isRegistering ? 'Registration' : 'Login'} successful!`);

      setTimeout(() => {
        setLoading(false);
        navigate('/');
      }, 2000);
    } catch (error) {
      toast.error('Error: ' + (error.response ? error.response.data.message : error.message));
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {loading ? ( 
        <div className="loading-screen">
          <ClipLoader color="#fff" size={50} />
          <p className="loading-text">Please wait...</p>
        </div>
      ) : (
        <div className="login-box">
          <h1 className="login-title">{isRegistering ? 'Create Account' : 'Login'}</h1>
          <form onSubmit={handleSubmit}>
            {isRegistering && (
              <div className="input-group">
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}

            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="login-button">
              {isRegistering ? 'Register' : 'Login'}
            </button>
          </form>

          <p className="toggle-form">
            {isRegistering ? 'Already have an account? ' : "Don't have an account? "}
            <span className="toggle-link" onClick={() => setIsRegistering(!isRegistering)}>
              {isRegistering ? 'Login' : 'Create Account'}
            </span>
          </p>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default Login;