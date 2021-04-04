import React from "react";
import { MdInfoOutline } from "react-icons/md";
import { motion } from "framer-motion";
import "./modal.scss";

function LengthExceededAlert() {
  return (
    <motion.div
      initial={{ y: "-100vh", opacity: 0 }}
      animate={{ x: "-50%", y: "-50%", opacity: 1 }}
      transition={{ type: "spring", stiffness: 40, duration: 3 }}
      className="modal-container max-length-alert"
    >
      <MdInfoOutline />
      <p>Maximum Length Exceeded!</p>
    </motion.div>
  );
}

export default LengthExceededAlert;
