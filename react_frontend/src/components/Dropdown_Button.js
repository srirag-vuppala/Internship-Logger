import React from 'react'
import '../assets/Dropdown_Button.css'
import Dropdown from 'react-bootstrap/Dropdown'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import $ from 'jquery';
import Popper from 'popper.js';

function Dropdown_Button(props) {
    
    return (
        <Dropdown>
        <Dropdown.Toggle variant="danger" id="dropdown-variants-Danger">
        {/* <Dropdown.Toggle class= "text-danger" variant="success" id="dropdown-basic"> */}
        {props.FilterType}
        </Dropdown.Toggle>
        <link rel="stylesheet" type="text/css" href="Dropdown_Button.css"></link>
        
        


        <Dropdown.Menu>
        <Dropdown.Item href="/">Waiting to Hear Back</Dropdown.Item>
        <Dropdown.Item href="/">Coding Challenge</Dropdown.Item>
        <Dropdown.Item href="/">Pre-recorded Interview</Dropdown.Item>
        <Dropdown.Item href="/">In-person Interview</Dropdown.Item>
        <Dropdown.Item href="/">Offer</Dropdown.Item>
        </Dropdown.Menu>
        </Dropdown>
    )  
}

export default Dropdown_Button;