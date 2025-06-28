import React, { useEffect } from 'react';
import './medical.css';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles

export default function Medical() {
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS with desired settings
  }, []);

  return (
    <div className="medical-container">
      <div className="medical-info">
        <h1 className="medical-title" data-aos="fade-up">Medical Practice Management Software</h1>
        <p className="medical-description" data-aos="fade-up" data-aos-delay="200">
          A one-stop solution to manage all aspects of OPD, from patient registration to generating digital prescriptions, bills, and revenue analysis. Pharmacy and lab management is simplified, enabling doctors to view lab reports seamlessly within the software.
          Customizable medical case sheets allow you to create comprehensive electronic medical records (EMR).
        </p>
        <button className="learn-more-btn" data-aos="zoom-in" data-aos-delay="400">Learn More</button>
      </div>
      <img 
        src={require('../../assets.js/Medical.jpg')} 
        alt="Medical Practice Management Software" 
        className="medical-image" 
        data-aos="fade-left"
      />
    </div>
  );
}