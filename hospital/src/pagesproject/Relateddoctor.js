import React, { useState, useEffect } from 'react';
import './relateddoctor.css'; 
import { useAppContext } from '../context/Context';
import { useNavigate } from 'react-router';

function Relateddoctor({ speciality, docID }) {
  const [relDoc, setRelDoc] = useState([]);
  const { doctors } = useAppContext();
     const navigate=useNavigate();
  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docID);
      setRelDoc(doctorData);
    }
  }, [speciality, doctors, docID]);

  return (
    <div className="related-doctor">
      <div className="doctor-inf">
        <h1>Related Doctors</h1>
        <p>Explore our trusted professionals in the same specialty.</p>
      </div>
         {/* Right side */}
         <div className='doctor-list w-4/5'>
         {relDoc.length > 0 ? (
            relDoc.map((topDoctor) => (
                 <div 
                     key={topDoctor._id}
                     onClick={() => navigate(`appointment/${topDoctor._id}`)} 
                     className='card cursor-pointer flex-shrink-0 transition-transform duration-500 hover:translate-y-[-10px]'
                 >
                     <img 
                         src={topDoctor.image} 
                         alt={topDoctor.name} 
                         className='hover:rotate-6 transition-all'
                     />
                     <div className='card-info text-start'>
                         <p className='text-green-700 font-bold'>Available</p>
                         <h2 className='text-gray-900'>{topDoctor.name}</h2>
                         <h4>{topDoctor.speciality}</h4>
                     </div>
                 </div>
             ))
         ) : (
             <p>No doctors found for this specialty.</p>
         )}
     </div>
    </div>
  );
}

export default Relateddoctor;
