import React, { useEffect, useState } from 'react';
import './profile.css';
import { useAppContext } from '../../context/Context';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import d from '../../assets_admin/appointment_icon.svg';
import { useNavigate } from 'react-router-dom';

function ProfilePage() {
  const { profile, token } = useAppContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    gender: '',
    dob: '',
    image: null,
  });

  const updateProfile = async () => {
    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('phone', formData.phone);
    data.append('address', formData.address);
    data.append('gender', formData.gender);
    data.append('dob', formData.dob);
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      const response = await axios.post('http://localhost:4000/api/user/update-profile', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        toast.success('تم تحديث الملف الشخصي بنجاح!');
      } else {
        toast.error(response.data.message || 'فشل تحديث الملف الشخصي.');
      }
    } catch (error) {
      console.error('Error updating profile:', error.response ? error.response.data : error.message);
      toast.error('حدث خطأ أثناء تحديث الملف الشخصي: ' + (error.response ? error.response.data.message : error.message));
    }
  };

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        email: profile.email,
        phone: profile.phone || '',
        address: profile.address || '',
        gender: profile.gender,
        dob: profile.dob,
        image: null,
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({
        ...formData,
        image: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile();
  };

  const handleImageChange = (e) => {
    if (profile.image) {
      const updatedFormData = {
        ...formData,
        image: e.target.files[0],
      };
      setFormData(updatedFormData);
    }
  };

  return (
    <div className="profile-container">
      <ToastContainer />
      <div className="profile-card">
        {profile && (
          <>
            <div className="profile-header">
              <div className="profile-image-container">
                <img
                  src={formData.image ? URL.createObjectURL(formData.image) : d}
                  alt="Profile"
                  className="profile-image"
                />
              </div>
              <h1 className="profile-name">{profile.name}</h1>
            </div>
            <form onSubmit={handleSubmit} className="profile-form">
              <div className="profile-details">
                <label className="profile-label">
                  Name:
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="profile-input"
                  />
                </label>
                <label className="profile-label">
                  Email:
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="profile-input"
                  />
                </label>
                <label className="profile-label">
                  Phone:
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="profile-input"
                  />
                </label>
                <label className="profile-label">
                  Address:
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="profile-input"
                  />
                </label>
                <label className="profile-label">
                  Gender:
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="profile-input"
                  >
                    <option value="not selected">Not Selected</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </label>
                <label className="profile-label">
                  Date of Birth:
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="profile-input"
                  />
                </label>
                <label className="profile-label">
                  Profile Image:
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="profile-input-file"
                  />
                </label>
              </div>
              <div className="profile-actions">
                <button type="submit" className="edit-button">Update Profile</button>
                <button
                  type="button"
                  className="logout-button"
                  onClick={() => navigate('/login')}
                >
                  Logout
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
