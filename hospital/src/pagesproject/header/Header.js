import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
import { motion } from "framer-motion"; // ✅ استيراد framer-motion
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "./header.css";

// استيراد الصور
import bgImage1 from "../../assets.js/home.webp";
import bgImage2 from "../../assets.js/hom1.avif";
import bgImage3 from "../../assets.js/hom2.webp";

const sliderContent = [
  {
    image: bgImage1,
    title: "Making Health",
    subtitle: "Care Better Together",
    description:
      "Your health is our priority. We bring quality healthcare services right to your fingertips, ensuring expert medical assistance whenever you need it.",
  },
  {
    image: bgImage2,
    title: "Quality Healthcare",
    subtitle: "At Your Fingertips",
    description:
      "We connect you with top-tier doctors and healthcare professionals, offering both online consultations and in-person care to fit your lifestyle.",
  },
  {
    image: bgImage3,
    title: "Health First",
    subtitle: "Prioritize Your Wellbeing",
    description:
      "Experience world-class medical support with cutting-edge tools and certified experts, all dedicated to keeping you in perfect health.",
  },
];

function Header() {
  return (
    <motion.div 
      className="header"
      initial={{ opacity: 0 }} // تأثير Fade In عند تحميل الصفحة
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <Swiper
        modules={[Autoplay, Navigation, Pagination, EffectFade]}
        effect="fade"
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
   
        pagination={{ clickable: true }}
        className="mySwiper"
      >
        {sliderContent.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="slide"
              style={{
                backgroundImage:( `url(${slide.image}`), 
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="overlay">
                <motion.div 
                  className="text-container"
                  initial={{ opacity: 0, y: 50 }} // يبدأ مخفي وينزلق للأعلى
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.5 }} // تأخير بسيط للأنيميشن
                >
                  <h1 className="text-5xl font-bold text-white">{slide.title}</h1>
                  <h2 className="text-3xl text-white mt-2">{slide.subtitle}</h2>
                  <p className="text-lg text-gray-200 mt-4">{slide.description}</p>
                  <motion.button 
                    className="appointment-btn mt-6"
                    whileHover={{ scale: 1.1 }} // تأثير عند التحويم
                    whileTap={{ scale: 0.95 }} // تأثير عند النقر
                  >
                    Make an Appointment
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
}

export default Header;