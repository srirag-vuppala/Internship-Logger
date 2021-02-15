import React from 'react'
import '../assets/Dropdown.css'
import Dropdown from 'react-bootstrap/Dropdown'

function Dropdown_Button() {
    return (
        <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
        Dropdown Button
        </Dropdown.Toggle>

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