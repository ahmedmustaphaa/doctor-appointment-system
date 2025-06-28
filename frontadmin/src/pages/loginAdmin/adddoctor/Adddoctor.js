import React, { useState } from 'react';
import { assets } from '../../../assets_admin/assets.js';
import axios from 'axios';
import { UseproviderContext } from '../../../context/Appcontext.js';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddDoctor() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [experience, setExperience] = useState('1 Year');
  const [fees, setFees] = useState('');
  const [speciality, setSpeciality] = useState('General');
  const [available, setAvailable] = useState('');
  const [address, setAddress] = useState('');
  const [about, setAbout] = useState('');
  const [degree, setDegree] = useState('');
  const [image, setImage] = useState(null);

  const { atoken } = UseproviderContext();

  if (!atoken) {
    console.log('Authentication token:', atoken);
    toast.error("Invalid authentication token");
    return;
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      { value: name, label: 'Name' },
      { value: email, label: 'Email' },
      { value: password, label: 'Password' },
      { value: experience, label: 'Experience' },
      { value: fees, label: 'Fees' },
      { value: speciality, label: 'Speciality' },
      { value: available, label: 'Availability' },
      { value: address, label: 'Address' },
      { value: about, label: 'About' },
      { value: degree, label: 'Degree' },
    ];

    for (let field of requiredFields) {
      if (!field.value) {
        toast.error(`${field.label} is required`);
        return;
      }
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('experience', parseInt(experience.split(' ')[0]));
    formData.append('fees', fees);
    formData.append('speciality', speciality);
    formData.append('available', available);
    formData.append('address', address);
    formData.append('about', about);
    formData.append('degree', degree);
    if (image) {
      formData.append('image', image);
    }

    try {
      await axios.post(
        'http://localhost:4000/api/admin/add-doctor',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${atoken}`,
          },
        }
      );
      toast.success('Doctor added successfully');
    } catch (error) {
      toast.error(`Failed to add doctor: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="p-6 md:p-10 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">
          Add Doctor
        </h1>

        <div className="flex justify-center mb-6">
          <label htmlFor="upload-picture" className="cursor-pointer flex flex-col items-center gap-2">
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="Doctor's"
                className="w-32 h-32 rounded-full object-cover border-2 border-gray-300 shadow"
              />
            ) : (
              <img
                src={assets.upload_area}
                alt="Upload Area"
                className="w-28 h-28 object-contain opacity-70"
              />
            )}
            <p className="text-sm text-gray-600">Upload Doctor's Picture</p>
          </label>
          <input type="file" id="upload-picture" hidden onChange={handleImageUpload} />
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Your Name" type="text" value={name} onChange={setName} />
          <Input label="Doctor's Email" type="email" value={email} onChange={setEmail} />
          <Input label="Doctor's Password" type="password" value={password} onChange={setPassword} />
          
          <Select
            label="Experience"
            value={experience}
            onChange={setExperience}
            options={['1 Year', '2 Year', '3 Year', '4 Year', '5 Year', '6 Year', '7 Year', '8 Year', '9 Year', '10 Year']}
          />

          <Input label="Fees" type="number" value={fees} onChange={setFees} />
          
          <Select
            label="Speciality"
            value={speciality}
            onChange={setSpeciality}
            options={['General', 'Obstetrics and Gynecology', 'Dermatology', 'Pediatrics', 'Neurology', 'Gastroenterology']}
          />

          <Input label="Availability" type="text" value={available} onChange={setAvailable} />
          <Input label="Address" type="text" value={address} onChange={setAddress} />

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">About the Doctor</label>
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="About"
            />
          </div>

          <div className="md:col-span-2">
            <Input label="Doctor's Degree" type="text" value={degree} onChange={setDegree} />
          </div>

          <div className="md:col-span-2 text-center">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-2 rounded-md transition duration-300"
            >
              Add Doctor
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

// Custom Input component
function Input({ label, type, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={label}
        required
      />
    </div>
  );
}

// Custom Select component
function Select({ label, value, onChange, options }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {options.map((option, i) => (
          <option key={i} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}

export default AddDoctor;
