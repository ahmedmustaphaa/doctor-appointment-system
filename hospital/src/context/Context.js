import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { doctors as defaultDoctors } from '../assets_frontend/assets'; 

export const AppContext = createContext();

function AppContextProvider({ children }) {
    const [data, setData] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('atoken') || '');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [profile, setProfile] = useState(false);

  
    console.log(token)

    const getAllDoctors = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/doctor/list');
            const { data } = response;
            console.log(data.getDoctor);
            if (data.success) {
                setData(data.getDoctor);
                toast.success(data.message);
            } else {
                toast.error(data.message || "Request failed");
            }
        } catch (error) {
            toast.error("Error fetching doctors: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const loadProfileData = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/user/get-profile', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const { data } = response;
            console.log(data);
            setProfile(data.userData);
        } catch (error) {
            toast.error("Error fetching profile: " + error.message);
        }
    };

    useEffect(() => {
        if (token) {
            loadProfileData();
        } else {
            setProfile(false);
        }
    }, [token]);

    const val = {
        doctors: data,
        loading,
        error,
        getAllDoctors,
        token,
        setToken,
        profile,
        setProfile,
        loadProfileData,
    };

    useEffect(() => {
        getAllDoctors();
    }, []);

    return (
        <AppContext.Provider value={val}>
            {children}
        </AppContext.Provider>
    );
}

export const useAppContext = () => {
    return useContext(AppContext);
};

export default AppContextProvider;