import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/admin/dashboard');
        if (response.data && response.data.allData) {
          setData(response.data.allData);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="text-center py-10 text-gray-600 text-lg">Loading...</div>;
  }

  if (!data) {
    return <div className="text-center py-10 text-red-500">Failed to load dashboard data.</div>;
  }

  return (
    <div className="p-6 md:p-10">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Dashboard Overview</h1>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center">
          <img src={require('../../../assets/dash2.jpg')} alt='Doctors' className="w-20 h-20 mb-4 rounded-full object-cover" />
          <h2 className="text-xl font-bold text-blue-600">{data.DoctorData}</h2>
          <p className="text-gray-600">Doctors</p>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center">
          <img src={require('../../../assets/dash3.jpg')} alt='Users' className="w-20 h-20 mb-4 rounded-full object-cover" />
          <h2 className="text-xl font-bold text-blue-600">{data.userData}</h2>
          <p className="text-gray-600">Users</p>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center">
          <img src={require('../../../assets/dash4.jpg')} alt='Appointments' className="w-20 h-20 mb-4 rounded-full object-cover" />
          <h2 className="text-xl font-bold text-blue-600">{data.appointmentData}</h2>
          <p className="text-gray-600">Appointments</p>
        </div>
      </div>

      {/* Latest Appointments */}
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Latest Appointments</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.latestappointmentData?.map((item, index) => (
          <div key={index} className="bg-white p-4 shadow-md rounded-lg flex items-center gap-4">
            <img
              src={item.docData?.image}
              alt={item.docData?.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-gray-800">{item.docData?.name}</p>
              <p className="text-sm text-gray-500">{item.slotDate}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
