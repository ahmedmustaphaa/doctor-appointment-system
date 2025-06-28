import React, { useState } from 'react';
import axios from 'axios';
import { UseproviderContext } from '../../context/Appcontext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [state, setState] = useState('admin');
  const { setToken } = UseproviderContext();
  const navigate = useNavigate();

  const loginAdmin = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/admin/login', { email, password });
      const token = response.data.token;
      localStorage.setItem('token', token);
      setToken(token);
      toast.success('Login successful, welcome!');
      navigate('/dashboard'); // Navigate after login
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-300">
      <div className="bg-white shadow-xl rounded-lg w-full max-w-md p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {state === "admin" ? "Admin" : "Doctor"} Login
        </h1>

        <form onSubmit={(e) => { e.preventDefault(); loginAdmin(); }} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="roleSwitch"
              onClick={() => setState(state === "admin" ? "doctor" : "admin")}
              className="w-4 h-4"
            />
            <label htmlFor="roleSwitch" className="text-sm text-gray-600">
              Switch to {state === "admin" ? "Doctor" : "Admin"}
            </label>
          </div>

          <p className="text-xs text-gray-500">
            If you have access to an administrator (or admin) account, you can sign in to the Admin console. The Admin console is where admins manage services for people in an organization.
          </p>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300 font-medium"
          >
            Login
          </button>
        </form>

        <ToastContainer />
      </div>
    </div>
  );
}

export default Login;
