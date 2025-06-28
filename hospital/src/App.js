import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router';
import Home from './pagesproject/home/Home';
import Contact from './pagesproject/contact/Contact';
import myprofile from './pagesproject/myprofile/Myprofile';
import Appointment from './pagesproject/appointment/Appointment';
import Doctor from './pagesproject/doctor/Doctor';
import Login from './pagesproject/login/Login';
import About from './pagesproject/about/About';
import Myappointments from './pagesproject/myappintments/Myappointments';
import Navbar from './component/Navbar';
import Myprofile from './pagesproject/myprofile/Myprofile';
import Footer from './component/footer/Footer';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  const stripePromise=loadStripe('pk_test_51Q5bi709J47FAh4sAVhwH5701bL7PiGvLFLy8PieXVet9D4vn31VAYuaFAfgKbvqL5XxSuiH7VKvU42ZB30mB22F00eGqIzaea')
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    profilePicture: "https://via.placeholder.com/150",
    about: "I am a software developer with a passion for creating innovative solutions."
};
const appointments = [
  {
      id: 1,
      title: "Chiropractic Consultation",
      date: "2024-01-10T10:00:00Z",
      location: "Main Clinic",
      doctorName: "Dr. Jane Smith",
      status: "Confirmed"
  },
  {
      id: 2,
      title: "Initial Assessment",
      date: "2024-01-15T09:30:00Z",
      location: "Downtown Clinic",
      doctorName: "Dr. Emily Parker",
      status: "Pending"
  },
  {
      id: 3,
      title: "Follow-up Consultation",
      date: "2024-01-20T14:00:00Z",
      location: "Main Clinic",
      doctorName: "Dr. John Doe",
      status: "Confirmed"
  },
  {
      id: 4,
      title: "Physical Therapy Session",
      date: "2024-02-05T11:00:00Z",
      location: "Westside Clinic",
      doctorName: "Dr. Sarah Lee",
      status: "Pending"
  },
  {
      id: 5,
      title: "Nutritional Counseling",
      date: "2024-02-12T15:00:00Z",
      location: "Main Clinic",
      doctorName: "Dr. Alex Rivera",
      status: "Cancelled"
  }
];

// Usage
// <MyAppointments appointments={appointments} />

  return (
    <div >
    <ToastContainer position="top-right" autoClose={3000} />
   
    <Navbar/>
   
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/myprofile' element={<Myprofile user={user} />} />
      <Route path='/appointments' element={ <Elements stripe={stripePromise}><Myappointments appointments={appointments} /></Elements>} />
      <Route path='/appointment/:docId' element={<Appointment />} />
      <Route path='/doctor' element={<Doctor />} />
      <Route path='/doctor/:specialty' element={<Doctor />} />
      <Route path='/login' element={<Login />} />
      <Route path='/about' element={<About />} />
    </Routes>

  <Footer />


    </div>
  );
}

export default App;
