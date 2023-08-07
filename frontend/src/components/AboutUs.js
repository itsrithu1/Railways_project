import {React, useState} from 'react';
import NavbarComponent from '../components/NavbarComponent';
import Footer from '../components/Footer';
import '../styles/AboutUs.css'; // Import your custom CSS file for styling
import TeamMember from './TeamMembers';
import Modal from 'react-bootstrap/Modal';

const AboutUs = () => {

    const [showModal, setShowModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const handleOpenModal = (member) => {
    setSelectedMember(member);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedMember(null);
    setShowModal(false);
  };

  const teamMembers = [
    {
      name: 'K L Rithika',
      role: 'Frontend Developer',
    },
    {
        name: 'Sonali Naik',
        role: 'Frontend Developer',
      },
      {
        name: 'Darallene Rodrigues',
        role: 'Backend Developer',
      },
      {
        name: 'Tanmay Nivaskar',
        role: 'Backend Developer',
      },
      {
        name: 'Aniket Gaonkar',
        role: 'Backend Developer',
      },
    // Add more team members here
  ];

  return (
    <>
      <NavbarComponent />
      <div className='about-us-container'>
          <h2>About Us</h2>
          <p>
            Welcome to First Class Railways! <br/>

          </p>
          <br/>
          <p>
          We are dedicated to providing safe,
          efficient, and comfortable train travel experiences to our passengers.
          With a focus on modern technology and exceptional service, we strive
          to make every journey memorable.
        </p>
          <br/>
        <p>
          Our mission is to connect people, places, and cultures through a
          reliable and sustainable railway network. We believe in the power of
          trains to bring communities closer, reduce environmental impact, and
          contribute to economic growth.
        </p>
          <br/>
        <p>
          Our team of passionate professionals is committed to ensuring that
          your travel experience is smooth and enjoyable. From booking to
          onboard amenities, we prioritize your needs and satisfaction.
        </p>
          <br/>
        <p>
          Thank you for choosing us as your preferred mode of travel. Whether
          you're a daily commuter or an adventurous traveler, we look forward
          to serving you and being a part of your journey.
        </p>
          <br/>
        <p>Ride with us and experience the joy of railways!</p>

        {/* Meet Our Team section */}
        <div className='meet-our-team'>
          <h2>Meet Our Team</h2>
          <div className='team-members'>
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className='team-member'
                onClick={() => handleOpenModal(member)}
              >
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />

      {/* Render TeamMember modal */}
      {selectedMember && (
        <TeamMember
          member={selectedMember}
          showModal={showModal}
          handleCloseModal={handleCloseModal}
        />
      )}

    </>
  );
};

export default AboutUs;
