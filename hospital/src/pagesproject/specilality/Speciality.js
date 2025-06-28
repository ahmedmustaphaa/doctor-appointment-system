import React, { useEffect } from 'react';
import './speciality.css';
import { specialityData } from '../../assets_frontend/assets';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Speciality() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  return (
    <div className='speciality p-6'>
      <div className="text-center">
        <h1 className='speciality-title text-3xl'>Find by Specialty</h1>
        <p className='speciality-description text-gray-700 mt-2'>
          Discover trusted specialists for your health needs. This information helps you register for any new software.
        </p>
      </div>
      <div className='flex mt-10 gap-6 text-center justify-center flex-wrap'>
        {specialityData.map((item, index) => (
          <Link 
            key={index}
            to={`/doctor/${item.speciality}`} 
            className='speciality-item flex flex-col items-center text-xs cursor-pointer flex-shrink-0 transition-transform duration-500 hover:translate-y-[-10px] p-4 rounded-lg shadow-lg'
            style={{ border: `2px solid ${item.color}` }}
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <div className='speciality-icon' style={{ fontSize: '2rem' }}>
              {item.icon}
            </div>
            <img src={item.image} alt={item.speciality} className='speciality-image w-20 mt-2' />
            <h2 className='speciality-name font-semibold mt-2'>{item.speciality}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Speciality;