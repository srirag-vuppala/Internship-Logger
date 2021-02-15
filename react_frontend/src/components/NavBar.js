import React from 'react'
import '../assets/NavBar.css'
import { Link } from 'react-router-dom'


function NavBar() {
    return (
        <>
            <nav className = "nav-bar">
                {/* <img className="logo" src= {imager} alt="temp-logo" />  */}
                <ul className="nav-links">
                    <li className="title"><Link to ="/">Internship Logger</Link></li>
                    <li className="spreadsheet-li"><Link to ="/Spreadsheet">Spreadsheet</Link></li>
                </ul>
            </nav>
        </>
    )  
}

export default NavBar
