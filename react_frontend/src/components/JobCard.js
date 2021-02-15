import React from 'react'
import '../assets/JobCard.css'


function JobCard(props) {
    return (
        <div>
                <ul className="job-card">
                    <li className="Company">Company: {props.Company}</li>
                    <li className="Position">Position: {props.Position}</li>
                    <li className="JobLink">JobLink: {props.JobLink}</li>
                    <li className="Info">Information: {props.Information}</li>
                </ul>
        </div>
    )
}

export default JobCard