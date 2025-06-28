import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAppContext } from '../../context/Context';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import Modal from 'react-modal';
import './myappointment.css';

Modal.setAppElement('#root');

const MyAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { token } = useAppContext();
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [processing, setProcessing] = useState(false);

    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const { data } = await axios.get('http://localhost:4000/api/user/get-appointment', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setAppointments(data.getllAllAppointment);
            } catch (err) {
                setError(err.message);
                toast.error("Error fetching appointments: " + err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchAppointments();
    }, [token]);

    const handleCancelAppointment = async (appointmentId) => {
        try {
            setLoading(true);
            const { data } = await axios.post(
                'http://localhost:4000/api/user/cancel-appointment',
                { appointmentId },
                { headers: { Authorization: `Bearer ${token} `} }
            );
            if (data.success) {
                toast.success(data.message);
                setAppointments((prev) => prev.filter((appt) => appt._id !== appointmentId));
            } else {
                toast.error("Cancellation failed. Please try again.");
            }
        } catch (err) {
            toast.error("Error: " + (err.response?.data?.message || err.message));
        } finally {
            setLoading(false);
        }
    };

    const handlePayment = async () => {
      console.log("Selected Appointment:", selectedAppointment);

        setProcessing(true);
        try {
            const { data } = await axios.post(
                'http://localhost:4000/api/user/payment',
                { appointmentId: selectedAppointment._id, amount: selectedAppointment.amount },
                { headers: { Authorization: `Bearer ${token} ` }}   );
        

            const { clientSecret } = data;
            if (!clientSecret) {
                toast.error("Payment failed, please try again.");
                return;
            }

            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: { card: elements.getElement(CardElement) }
            });if (error) {
              toast.error("Payment failed: " + error.message);
          } else if (paymentIntent.status === 'succeeded') {
              toast.success("Payment Successful!");
              setAppointments((prev) => prev.map((appt) =>
                  appt._id === selectedAppointment._id ? { ...appt, paid: true } : appt
              ));
          }
      } catch (err) {
          toast.error("Payment error: " + (err.response?.data?.message|| err.message));
      } finally {
          setProcessing(false);
          setSelectedAppointment(null);
      }
  };


if (loading) return <p>Loading appointments...</p>;
  if (error) return <p>Error fetching appointments: {error}</p>;

  return (
    <div className="appointmentSection">
      <div className="appointments-container">
          <h1>My Appointments</h1>
          {appointments.length === 0 ? (
              <p className="no-appointments">You have no upcoming appointments.</p>
          ) : (
              <div className="appointments-list">
                  {appointments.map((appointment) => (
                      <div className="appointment-card" key={appointment._id} >
                          <h2>{appointment.userData ? appointment.userData.name : 'Unknown User'}</h2>
                        
                              <strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()} <br />
                              <strong>Time:</strong> {new Date(appointment.date).toLocaleTimeString()} <br />
                              <strong>Amount:</strong> ${appointment.amount} <br />
                              <strong>Cancelled:</strong> {appointment.cancelled ? 'Yes' : 'No'} <br />
                              <strong>Doctor Name:</strong> {appointment.docData?.name || 'Unknown Doctor'} <br />
                        <div    className="btnPay">
                         {appointment.cancelled?" cancelled successfully": <button
                            className="cancel-btn"
                            onClick={() => handleCancelAppointment(appointment._id)}
                        >
                            Cancel Appointment
                        </button>}

                          <button
                      
                          className="pay-btn"
                          onClick={() => {
                              console.log("Pay button clicked for:", appointment);
                              setSelectedAppointment(appointment);
                          }}
                          disabled={appointment.paid}
                      >
                          {appointment.paid ? 'Paid' : 'Pay Online'}
                      </button>
                        </div>
                      </div>
                  ))}
              </div>
          )}

          <Modal
          isOpen={!!selectedAppointment}
          onRequestClose={() => setSelectedAppointment(null)}
          className="modal-content"
        
      >
          <div className="modal-header">
              <h2 className="modal-title">Complete Your Payment</h2>
              <button className="close-button" onClick={() => setSelectedAppointment(null)}>&#10005;</button>
          </div>
      
          {/* Appointment Details */}
          <div className="modal-body">
              <h3 className="section-title">Appointment Details</h3>
              <div className="appointment-details">
                  <p><strong>Doctor:</strong> {selectedAppointment?.docData?.name || 'Unknown'}</p>
                  <p><strong>Date:</strong> {new Date(selectedAppointment?.date).toLocaleDateString()}</p>
                  <p><strong>Time:</strong> {new Date(selectedAppointment?.date).toLocaleTimeString()}</p>
                  <p><strong>Amount:</strong> ${selectedAppointment?.amount}</p>
                  <p><strong>Status:</strong> {selectedAppointment?.paid ? 'Paid' : 'Pending'}</p>
              </div>
      
              <hr className="divider" />
      
              <h3 className="section-title">Enter Payment Details</h3>
              <div className="payment-method">
                  <CardElement className="card-input" />
              </div>
      
              {/* Payment Options */}
              <div className="payment-options">
                  <button className="payment-btn apple-pay-btn">Pay with Apple Pay</button>
                  <button className="payment-btn google-pay-btn">Pay with Google Pay</button>
              </div>
          </div>
      
          <div className="modal-footer">
              <button className="confirm-button" onClick={handlePayment} disabled={processing}>
                  {processing ? 'Processing...' : 'Confirm Payment'}
              </button>
              <button className="cancel-button" onClick={() => setSelectedAppointment(null)}>
                  Close
              </button>
          </div>
      </Modal>
      
      </div>
      </div>
  );
};

export default MyAppointments;