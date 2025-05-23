// src/components/Modal.jsx
import './index.css';
import { IoMdCloseCircle } from "react-icons/io";
import { Button } from "@chakra-ui/react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-actions">
          <Button variant="plain" onClick={onClose} className="cancel"><IoMdCloseCircle/></Button>
        </div>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
