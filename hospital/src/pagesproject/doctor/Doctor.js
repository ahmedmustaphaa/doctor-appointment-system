import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import "./doctor.css";
import { FadeLoader } from 'react-spinners';

function Doctor() {
  const [filterItem, setFilterItem] = useState([]); // قائمة الأطباء المفلترة
  const [doctors, setDoctors] = useState([]); // تخزين الدكاترة بعد جلبهم من API
  const [loading, setLoading] = useState(true); // حالة التحميل
  const { specialty } = useParams();
  const navigate = useNavigate();

  // جلب جميع الدكاترة
  const getAllDoctors = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:4000/api/doctor/list");
      const { data } = response;

      if (data.success && data.getDoctor.length > 0) {
        setDoctors(data.getDoctor);
        setFilterItem(data.getDoctor); 
        console.log("✅ Data Loaded:", data.getDoctor);

        setTimeout(() => {
          setLoading(false);
        }, 3000);
      } else {
        toast.error("No doctors found");
        setDoctors([]); 
        setFilterItem([]);
        setLoading(false); // Ensure loading is set to false if no doctors found
      }
    } catch (error) {
      toast.error("Error fetching doctors: " + (error.response?.data?.message || error.message));
      console.error("❌ API Error:", error);
      setLoading(false); // Ensure loading is set to false on error
    }
  };

  useEffect(() => {
    getAllDoctors();
  }, []);

  // تحديث الفلترة عند تغيير التخصص
  useEffect(() => {
    if (specialty && doctors.length > 0) {
      filterBySpecialist(specialty);
    } else {
      setFilterItem(doctors);
    }
  }, [doctors, specialty]);

  const filterBySpecialist = (specialist) => {
    console.log(`🔍 Filtering by: ${specialist}`);
    if (!doctors.length) return; // تأكد إن البيانات جاهزة

    if (specialist === "All") {
      setFilterItem(doctors);
    } else {
      const filteredDoctors = doctors.filter(
        (doc) => doc.speciality?.trim().toLowerCase() === specialist.trim().toLowerCase()
      );

      if (filteredDoctors.length > 0) {
        setFilterItem(filteredDoctors);
      } else {
        toast.error(`No doctors found for "${specialist}"`);
        setFilterItem([]);
      }
    }
  };

  return (
    <div className="moreDoc">
      {loading && <div className="cliploader"><FadeLoader loading={loading} size={50} /></div>}
      <p className="title-info">Browse through the doctor specialists.</p>

      <div className="doctor-container">
        {/* Sidebar (التخصصات) */}
        <div className="sidebar">
          <h3 className="specialty-title">Specialties</h3>
          {["General", "Dermatology", "Pediatrics", "Gastroenterology", "Neurology", "Obstetrics and Gynecology", "All"].map((specialist) => (
            <p key={specialist} onClick={() => filterBySpecialist(specialist)}>
              {specialist}
            </p>
          ))}
        </div>

        {/* قائمة الأطباء */}
        <div className="doctor-list">
          {loading ? (
            <p className="loading">Loading doctors...</p>
          ) : filterItem.length > 0 ? (
            filterItem.map((item) => (
              <div
                key={item._id}
                className="doctor-card"
                onClick={() => navigate(`/appointment/${item._id}`)}
              >
                <div className="rating">⭐️ {item.rating?.toFixed(1) || "4.5"}</div>
                <img src={item.image} alt={item.name} className="doctor-image" />
                <h2 className="doctor-name">{item.name}</h2>
                <p className="doctor-speciality">{item.speciality}</p>
                <p className="doctor-address">{item.address}</p>
                <div className="info-experience">
                  <label className="availability">
                    <input type="checkbox" checked={!!item.available} readOnly />
                    {item.available ? <span>متاح</span> : <span>غير متاح</span>}
                  </label>
                  <p className="doctor-experience">🩺 {item.experience} سنوات خبرة</p>
                </div>
              </div>
            ))
          ) : (
            <p className="no-doctors">No doctors found for this specialty.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Doctor;