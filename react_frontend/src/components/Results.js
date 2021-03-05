import React from 'react'
import '../assets/Results.css'
import Card from 'react-bootstrap/Card'

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

export default function Results({ cards }) {
    return (
        <div className="container">
            <h3 className="heading">Results</h3>
            <div className="inner-box">
            <div className="searchresults">
                {cards.map((card, i) => (
                    <div className="li-ele" key={i}>
                        <Card
                            className="mb-2"
                            style={{ width: '18rem'}}
                            border="danger"
                        >
                            <Card.Header>
                                {emoji_choose(card.status) + card.status}
                            </Card.Header>
                            <Card.Body>
                                <Card.Title>{card.company}</Card.Title>
                                <Card.Text>Position: {card.position}</Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
            </div>
        </div>
    )
}

