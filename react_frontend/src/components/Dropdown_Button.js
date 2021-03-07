import React from 'react'
import '../assets/Dropdown_Button.css'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import $ from 'jquery';
import Popper from 'popper.js';

const emoji = require("emoji-dictionary")

const emoji_choose = e => {
    if (e === "waiting") {
        return emoji.getUnicode(":seedling:")+" "
    }
    else if(e === "coding") {
        return emoji.getUnicode(":computer:")+" "
    }
    else if(e === "interview") {
        return emoji.getUnicode(":calendar:")+" "
    }
    else if(e === "offer") {
        return emoji.getUnicode(":page_facing_up:")+" "
    }
    else if(e === "rejected") {
        return emoji.getUnicode(":x:")+" "
    }

    else {
        return emoji.getUnicode(":leopard:")+" "
    }
}

const Dropdown_Button = ({titleDrop, handleSelect}) => {
    return (
        <>
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
          <DropdownButton 
            onSelect={handleSelect} 
            title={titleDrop}
            // onClick={handleClick}
            // title=
            variant="danger"
            bsPrefix="super-colors"
            >
              <Dropdown.Item eventKey="waiting">{emoji_choose("waiting")}Waiting to Hear Back</Dropdown.Item>
              <Dropdown.Item eventKey="coding">{emoji_choose("coding")}Coding Challenge</Dropdown.Item>
              <Dropdown.Item eventKey="interview">{emoji_choose("interview")}Interview</Dropdown.Item>
              <Dropdown.Item eventKey="offer">{emoji_choose("offer")}Offer</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="rejected">{emoji_choose("rejected")}Rejected</Dropdown.Item>
              {/* <Dropdown.Item eventKey="rejected" as="button"><div onClick={(e) => this.changeValue(e.target.textContent)}>Item #1</div></Dropdown.Item> */}
          </DropdownButton>
        </>
    )  
}

export default Dropdown_Button;