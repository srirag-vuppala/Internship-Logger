import React from "react";
import '../assets/Popup.css'
 
const Popup = props => {
  return (
    <div className="popup-box">
      <div className="box">
        <button className="close-icon" onClick={props.handleClose}>Cancel</button>
        {props.content}
      </div>
    </div>
  );
};
 
export default Popup;