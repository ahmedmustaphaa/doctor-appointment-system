import React, { useState } from 'react';
import './contact.css'; // Import external CSS for styling

function ContactUs() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Name:', name, 'Email:', email, 'Message:', message);
        // Clear the form after submission
        setName('');
        setEmail('');
        setMessage('');
    };

    return (
        <div className="contact-container">
            <h1>Contact Us</h1>
            <p>We'd love to hear from you! Please fill out the form below.</p>
            <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="Your Name"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Your Email"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        placeholder="Your Message"
                    ></textarea>
                </div>
                <button type="submit" className="contact-button">Send Message</button>
            </form>
        </div>
    );
}

export default ContactUs;