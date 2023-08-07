import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const TeamMembers = ({ member, showModal, handleCloseModal }) => {
  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Meet Our Team</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='team-member-details'>
          <h3>{member.name}</h3>
          <p>{member.role}</p>
          <p>{member.description}</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TeamMembers;
