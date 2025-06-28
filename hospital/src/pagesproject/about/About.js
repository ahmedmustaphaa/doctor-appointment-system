import React from 'react';
import './about.css'; // Import external CSS for styling
import teamImage from '../../assets_frontend/team.jpg'; // Example image path

function About() {
    return (
        <div className="about-container">
            <header className="about-header">
                <h1 className="about-title">About Us</h1>
                <p className="about-subtitle">
                    Discover our mission and values
                </p>
            </header>

            <section className="about-content">
                <div className="about-image-container">
                    <img src={teamImage} alt="Our Team" className="about-image" />
                </div>
                <div className="about-description">
                    <h2 className="section-title">Who We Are</h2>
                    <p>
                        At Disc Doctor, we are dedicated to providing top-notch chiropractic services and spinal decompression therapy. Our team of experienced professionals is committed to helping you achieve optimal health and wellness.
                    </p>
                    <p>
                        With years of experience and a focus on patient-centered care, we strive to create a comfortable and welcoming environment for all our clients.
                    </p>
                </div>
            </section>

            <section className="about-values">
                <h2 className="section-title">Our Values</h2>
                <ul className="values-list">
                    <li>Integrity: We uphold the highest standards of honesty and transparency.</li>
                    <li>Compassion: We care for our patients as if they were family.</li>
                    <li>Excellence: We are committed to continuous improvement and professional development.</li>
                    <li>Community: We actively engage with our community to promote health and wellness.</li>
                </ul>
            </section>

            <footer className="about-footer">
                <p>&copy; 2023 Disc Doctor. All Rights Reserved.</p>
            </footer>
            <div class="choose-us-container">
            <h1>Why <span>Choose Us</span></h1>
            <div class="choose-us-options">
                <div class="option">
                    <h2>Efficiency</h2>
                    <p>Doctors diagnose and treat patients suffering from diseases or doctors of osteopathic medicine.</p>
                </div>
                <div class="option">
                    <h2>Convenience</h2>
                    <p>Doctors diagnose and treat patients suffering from diseases or doctors of osteopathic medicine.</p>
                </div>
                <div class="option">
                    <h2>Personalization</h2>
                    <p>Doctors diagnose and treat patients suffering from diseases or doctors of osteopathic medicine.</p>
                </div>
            </div>
        </div>
        </div>
    );
}

export default About;
