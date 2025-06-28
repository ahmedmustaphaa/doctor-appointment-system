import React, { useEffect } from 'react';
import './hospital.css';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles

function Hospital() {
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS with desired settings
  }, []);

  return (
    <div className='hospital-container'>
      <h3 className='main-title' data-aos="fade-up">Our Solution</h3>
      <div className='hospital-info'>
        <div className="image-side" data-aos="fade-right">
          <img src={require('../../assets.js/hospital.jpg')} alt="Hospital" />
        </div>

        <div className="info-side" data-aos="fade-left">
          <h2 className='sub-title'>Hospital Software</h2>
          <p>
            DocPulse HIMS is one of the best digital healthcare solutions for hospitals. 
            Manage appointments, billing, lab, stock and inventory, pharmacy, in-patient department, and more.
            Advanced EMR to manage patient health records and deliver improved patient care.
          </p>
          <button className='create-account-btn' data-aos="zoom-in">Create Account</button>
        </div>
      </div>
    </div>
  );
}

export default Hospital;