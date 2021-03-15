import React from "react";
import '../assets/Popup.css'
import Button from "react-bootstrap/Button";
 
const Popup = props => {
  return (
    <div className="popup-box">
            <style type="text/css">
          {`
            .super-colors {
              background: #DC2F02;
              border-radius: 8px;
              box-shadow: 0 4px 10px rgba(235, 0, 0, .50);  /* x, y, blur */
              font-family: Montserrat;
              border-color: #DC2F02;
            }
            .super-colors:hover{
              background-color: rgba(224, 0, 0, .80);
              border-color:  rgba(224, 0, 0, .80) ;
            }
            .super-colors::after{
              border-color:  rgba(224, 0, 0, .80);
              background-color:  rgba(224, 0, 0, .80); 
            }
            .super-colors:enabled{
              background-color:  rgba(224, 0, 0, .80);
              border-color: rgba(224, 0, 0, .80);
            }
          `}
          </style>
      <div className="box">
        <Button bsPrefix="super-colors" variant="danger"className="close-icon" onClick={props.handleClose}>Cancel</Button>
        {props.content}
      </div>
    </div>
  );
};
 
export default Popup;