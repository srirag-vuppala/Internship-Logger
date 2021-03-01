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
                        <li className="pos">
                            {/* {card.company} &nbsp;
                            <span>{card.position}</span> */}
                            <span className="title-company">{card.company}</span>
                            <p>---</p>
                            <span>Position Applied: {card.position}</span>
                        </li>
                    </div>
                ))}
            </div>
            </div>
        </div>
    )
}

