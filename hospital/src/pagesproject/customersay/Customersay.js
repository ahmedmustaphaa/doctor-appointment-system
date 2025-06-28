import React from "react";
import { Swiper, SwiperSlide } from "swiper/react"; // استيراد Swiper
import "swiper/css"; // استيراد أنماط Swiper الأساسية
import "swiper/css/pagination"; // استيراد أنماط الترقيم
import "swiper/css/navigation"; // استيراد أنماط الأسهم
import { Pagination, Navigation, Autoplay } from "swiper/modules"; // استيراد الميزات الإضافية
import "./customer.css";

function Customersay() {
    const customerSay = [
        {
          img: require("../../assets_frontend/doc4.png"),
          desc: "Telemedicine is a vital solution for healthcare, especially in remote areas where access to medical facilities is limited. It allows patients to receive timely consultations and treatments without the need for extensive travel, ultimately improving health outcomes and reducing healthcare disparities.",
          dr: "Dr. Ahmed Mustapha",
          country: "Egypt",
        },
        {
          img: require("../../assets_frontend/doc1.png"),
          desc: "A comprehensive telemedicine platform enhances patient monitoring and care by utilizing advanced technology to track health metrics in real-time. This integration not only empowers patients to take charge of their health but also enables healthcare providers to make informed decisions based on accurate data, leading to better management of chronic conditions.",
          dr: "Dr. Sarah Hassan",
          country: "USA",
        },
        {
          img: require("../../assets_frontend/doc2.png"),
          desc: "Remote healthcare consultations can significantly improve accessibility for millions of people who may otherwise struggle to obtain medical help. By eliminating geographical barriers, telemedicine ensures that patients receive the necessary care, advice, and support they need, thereby promoting a healthier population overall.",
          dr: "Dr. John Smith",
          country: "UK",
        },
    ];
  return (
    <div className="customersay">
      <h1>Read What Our Customers Say</h1>
      <Swiper
        modules={[Pagination, Navigation, Autoplay]} // تفعيل الميزات
        spaceBetween={30} // المسافة بين العناصر
        slidesPerView={1} // عدد الشرائح الظاهرة في نفس الوقت
        pagination={{ clickable: true }} // تفعيل الترقيم
        navigation={true} // تفعيل الأسهم
        autoplay={{ delay: 3000, disableOnInteraction: false }} // تشغيل تلقائي
        loop={true} // تشغيل متكرر
        className="swiper-container"
      >
        {customerSay.map((item, index) => (
          <SwiperSlide key={index} className="customer-info">
            <img src={item.img} alt="Customer" />
            <h3>{item.desc}</h3>
            <h2>{item.dr}</h2>
            <h1>{item.country}</h1>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Customersay;