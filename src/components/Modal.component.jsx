import React from 'react';

const ModalComponent = ({ isOpen, onClose, children }) => {
  const modalClassName = isOpen ? 'modal-container show' : 'modal-container';

  return (
    <div className={modalClassName}>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-content">
        <span className="close-modal" onClick={onClose}>&times;</span>
        {children}
      </div>
    </div>
  );
};

export default ModalComponent;