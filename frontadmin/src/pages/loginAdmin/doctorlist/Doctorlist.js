import React, { useEffect } from 'react';
import { useAppAdmin } from '../../../context/Admincontext';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function DoctorList() {
  const { getAllDoctors, data, loading, error } = useAppAdmin();

  useEffect(() => {
    getAllDoctors();
  }, [getAllDoctors]);

  const changeAvailability = async (docId) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/doctor/change-availability",
        { docId }
      );

      if (response.data.success) {
        toast.success("تم تحديث توفر الطبيب بنجاح ✅");
        getAllDoctors();
      } else {
        toast.error(response.data.message || "حدث خطأ غير متوقع ❌");
      }
    } catch (error) {
      toast.error("حدث خطأ أثناء تحديث التوفر ❌");
    }
  };

  return (
    <div className="p-6 md:p-10 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">قائمة الأطباء 🏥</h1>

      {loading ? (
        <p className="text-center text-gray-600">جارِ تحميل البيانات...</p>
      ) : error ? (
        <p className="text-center text-red-500 font-semibold">⚠️ خطأ: {error.message}</p>
      ) : data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item) => (
            <div
              key={item._id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 relative"
            >
              <div className="absolute top-3 right-3 text-yellow-500 font-semibold text-sm">
                ⭐ {item.rating ? item.rating.toFixed(1) : '4.5'}
              </div>
              <img
                src={item.image}
                alt={item.name}
                className="w-28 h-28 mx-auto rounded-full object-cover mb-4 border-2 border-blue-500"
              />
              <h2 className="text-xl font-bold text-center text-gray-800">{item.name}</h2>
              <p className="text-center text-sm text-blue-600">{item.speciality}</p>
              <p className="text-center text-sm text-gray-600 mb-2">{item.address}</p>

              <div className="flex items-center justify-between mt-4">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    onChange={() => changeAvailability(item._id)}
                    checked={!!item.available}
                    className="accent-blue-600 w-4 h-4"
                  />
                  {item.available ? (
                    <span className="text-green-600">متاح</span>
                  ) : (
                    <span className="text-red-500">غير متاح</span>
                  )}
                </label>
                <p className="text-sm text-gray-500">🩺 {item.experience} سنوات خبرة</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">🚨 لا يوجد أطباء متاحين حاليًا</p>
      )}

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}

export default DoctorList;
