import React from "react";
import "./modal.scss";
import { motion } from "framer-motion";

function DeleteModal({ onCancel, onDelete }) {
  return (
    <motion.div
      initial={{ y: "-100vh", opacity: 0 }}
      animate={{ x: "-50%", y: "-50%", opacity: 1 }}
      transition={{ type: "spring", stiffness: 40, duration: 3 }}
      className="modal-container delete-alert"
    >
      <p>Are you sure you want to delete?</p>
      <div className="button-wrapper">
        <button className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button className="btn btn-primary" onClick={onDelete}>
          Delete
        </button>
      </div>
    </motion.div>
  );
}

export default DeleteModal;
