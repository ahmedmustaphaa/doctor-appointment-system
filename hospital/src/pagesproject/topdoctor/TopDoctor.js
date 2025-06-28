import React, { useEffect } from 'react';
import './topdoctor.css';
import { useNavigate } from 'react-router';
import { useAppContext } from '../../context/Context';
import AOS from 'aos'; // مكتبة AOS للأنيميشن
import 'aos/dist/aos.css'; // استيراد أنماط AOS
import { motion } from "framer-motion"; // مكتبة Framer Motion للأنيميشن

function TopDoctor() {
  const { doctors, getAllDoctors } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    getAllDoctors();
    AOS.init({ 
      duration: 1000, 
      easing: 'ease-in-out', 
      once: false,  // السماح بتكرار الأنيميشن عند التمرير
    });
  }, [getAllDoctors]);

  const handleClick = () => {
    navigate('/doctor');
    window.scrollTo(0, 0);
  };

  return (
    <div className="topDoctor p-6">
      {/* عنوان القسم */}
      <motion.div 
        className="topdoctor-title text-center mb-6"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="doctor-title text-3xl font-bold">Top Doctors to Book</h1>
        <p className="text-black">
          Our medical professional hub provides a wealth of professional articles.
        </p>
      </motion.div>

      {/* قائمة الأطباء */}
      <div className="topDoc-section">
        {doctors.slice(0, 10).map((item, index) => (
          <motion.div
            key={item._id}
            className="doctor-card"
            onClick={() => navigate(`/appointment/${item._id}`)}
            data-aos={index % 2 === 0 ? "fade-up" : "zoom-in"}
            data-aos-delay={index * 100}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            {/* ✅ تقييم الطبيب */}
            <div className="rating">
              ⭐️ {item.rating ? item.rating.toFixed(1) : '4.5'}
            </div>

            {/* صورة الطبيب */}
            <img src={item.image} alt={item.name} className="doctor-image" />

            {/* معلومات الطبيب */}
            <h2 className="doctor-name">{item.name}</h2>
            <p className="doctor-speciality">{item.speciality}</p>
            <p className="doctor-address">{item.address}</p>

            {/* ✅ توفر الطبيب والخبرة */}
            <div className="info-experience">
              <label className="availability">
                <input type="checkbox" checked={!!item.available} />
                {item.available ? <span>غير متاح</span> : <span> متاح</span>}
              </label>
              <p className="doctor-experience">🩺 {item.experience} سنوات خبرة</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* زر المزيد مع تأثير نبضات */}
      <motion.button
        className="btn-more text-white font-semibold py-2 px-6 rounded shadow hover:bg-[#1a2e3d] transition-all"
        onClick={handleClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        See More
      </motion.button>
    </div>
  );
}

export default TopDoctor;