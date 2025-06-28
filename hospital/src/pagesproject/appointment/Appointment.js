import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useAppContext } from '../../context/Context';
import { assets } from '../../assets_frontend/assets';
import './appointment.css'; // Import external CSS file
import { PiDeviceMobileSlashDuotone } from 'react-icons/pi';
import Relateddoctor from '../Relateddoctor';
import { toast } from 'react-toastify';
import axios from 'axios';

function Appointment() {
    const { docId } = useParams(); // Get doctor ID from URL
    const { doctors, token } = useAppContext(); // Get doctors and token from context
    const [docInfo, setDocInfo] = useState(null); // State to store doctor info
    const [loading, setLoading] = useState(true); // Loading state
    const [docSlot, setDocSlot] = useState([]); // State to store available slots
    const [slotIndex, setSlotIndex] = useState(0); 
    const [slotTime, setSlotTime] = useState(''); // State to store selected slot time

    const navigate = useNavigate(); // Navigate function

    // Fetch available slots for the doctor
    const GetAvailableSlot = () => {
        setDocSlot([]); // Reset the available slots
        let today = new Date();
        let availableSlots = [];

        for (let i = 0; i < 7; i++) {
            let currentDate = new Date(today);
            currentDate.setDate(today.getDate() + i);
            let endTime = new Date(currentDate);
            endTime.setHours(21, 0, 0, 0); // End time at 9 PM

            // Adjust start time for today
            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
            } else {
                currentDate.setHours(10, 0); // Start at 10 AM for future dates
            }

            // Generate slots every 30 minutes
            while (currentDate < endTime) {
                availableSlots.push(currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
                currentDate.setMinutes(currentDate.getMinutes() + 120);
            }
        }

        setDocSlot(availableSlots); // Set the available slots
    };

    // Fetch doctor information
    const fetchDocInfo = () => {
        const doctorInfo = doctors.find(item => item._id === docId);
        if (doctorInfo) {
            setDocInfo(doctorInfo);
            GetAvailableSlot(); // Fetch available slots once doctor info is loaded
        } else {
            setDocInfo(null);
        }
        setLoading(false);
    };

    const bookAppointment = async () => {
        if (!token) {
            toast.warn("Log in to book appointment");
            return navigate('/login');
        }
        try {
            const date = new Date(); // Current date
            let day = date.getDate();
            let month = date.getMonth() + 1; // Month starts from 0
            let year = date.getFullYear();
    
            // Get the selected time
            const selectedTime = docSlot[slotIndex];
            const slotDate = `${day}_${month}_${year}`; // Format the date
            console.log(`Booked appointment for: ${slotDate} at ${selectedTime}`);
    
            // Send appointment booking request
            const appointmentData = {
                docId: docId,
                date: slotDate,
                time: selectedTime,
                userId: 'user_id_placeholder' // Replace this with actual user ID
            };
    
            const response = await axios.post('http://localhost:4000/api/user/appointment', appointmentData,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            console.log(response.data); // Handle server response
    
            if (response.data.success) {
                toast.success("Appointment booked successfully!");
            } else {
                toast.warn("There was an error booking the appointment.");
            }
        } catch (error) {
            console.error("Error booking appointment:", error.response ? error.response.data : error.message);
            toast.error("An error occurred while booking the appointment.");
        }
    };
    useEffect(() => {
        fetchDocInfo(); // Fetch doctor information on mount
    }, [doctors, docId]);

    // Handle loading state
    if (loading) {
        return <h2 className="text-center text-xl">Loading...</h2>;
    }

    // Handle error when doctor info is not found
    if (!docInfo) {
        return <h1 className="text-center text-2xl text-red-600">No doctor found.</h1>;
    }

    // Handle rescheduling (reset selected slot and reload available slots)
    const handleReschedule = () => {
        setSlotIndex(0); // Reset selected slot
        setSlotTime(''); // Clear selected time
        GetAvailableSlot(); // Re-fetch available slots
    };

    return (
        <div className='appointment'>
            <div class="appointment-container">
    <div class="doctor-image-container">
        <img src={docInfo.image} alt={docInfo.name} class="doctor-img" />
    </div>
    <div class="doctor-info" className='p-6'>
        <div class="doctor-header">
            <h2 class="doctor-name">{docInfo.name}</h2>
            <img src={assets.verified_icon} alt="Verified" class="verified-icon" />
        </div>
        <p class="doctor-degree">{docInfo.degree} - {docInfo.speciality}</p>
        <button class="experience-button">
            {docInfo.experience} Years of Experience
        </button>

        <h3 class="about-title">About the Doctor</h3>
        <p class="about-text">{docInfo.about}</p>
        <p class="appointment-fee">Appointment fee: <strong>${docInfo.fees}</strong></p>
        <h3 class="slots-title">Available Slots:</h3>
    </div>
</div>
            <h1>Booking Slot</h1>
            <ul className="slots-list">
                {docSlot.length > 0 ? (
                    docSlot.map((slot, index) => (
                        <li key={index} className={`slot-item ${slotIndex === index ? 'selected' : ''}`} onClick={() => { setSlotIndex(index); setSlotTime(slot); }}>
                            {slot}
                        </li>
                    ))
                ) : (
                    <li className="no-slots">No available slots</li>
                )}
            </ul>

            {/* Display selected slot */}
            <div>
                {slotTime && (
                    <div>
                        <h3 style={{color:'blue'}}>Selected Slot</h3>
                        <p style={{color:'blue'}}>{slotTime}</p>
                        <PiDeviceMobileSlashDuotone />
                    </div>
                )}
            </div>

            {/* Button to reset/reschedule */}
            <div className="reschedule-button-container">
                <button className="reschedule-button" onClick={handleReschedule}>Reschedule</button>
            </div>
            <div className="reschedule-button-container">
                <button className="reschedule-button w-3/5 bg-slate-700" onClick={bookAppointment}>Book Appointment</button>
            </div>
            <div>
                <Relateddoctor speciality={docInfo.speciality} docID={docId} />
            </div>
        </div>
    );
}

export default Appointment;