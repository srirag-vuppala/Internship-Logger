import React from 'react'
import '../assets/Results.css'

export default function Results({ cards }) {
    return (
        <div className="container">
            <h3 className="heading">Results</h3>
            <div className="inner-box">
            <div className="searchresults">
                {cards.map((card, i) => (
                    <div className="li-ele" key={i}>
                        <li>
                            {/* {card.company} &nbsp;
                            <span>{card.position}</span> */}
                            {card.company}
                        </li>
                    </div>
                ))}
            </div>
            </div>
        </div>
    )
}

