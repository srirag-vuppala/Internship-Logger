import React, { useState, useEffect} from 'react'
import '../assets/Home.css'
import SearchBar from './SearchBar'
import Dropdown from './Dropdown_Button'
import Results from './Results'
import axios from 'axios'

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

const drop_choose = e => {
    if (e === "waiting") {
        return emoji_choose(e)+ " " +"Waiting to hear back"
    }
    else if(e === "coding") {
        return emoji_choose(e)+ " " +"Coding Challenge"
    }
    else if(e === "interview") {
        return emoji_choose(e)+ " " +"Interview"
    }
    else if(e === "offer") {
        return emoji_choose(e)+ " " +"Offer"
    }
    else if(e === "rejected") {
        return emoji_choose(e)+ " " +"Rejected"
    }
    else {
        return emoji_choose(e)+ " " +"Nyet"
    }
}


function Home() {
    const [query, setQuery] = useState('');
    // for the dropdown
    const [selectedOption, setSelectedOption] = useState('');

    const [filterDisplay, setFilterDisplay] = useState([]);

    const [titleDrop, setTitleDrop] = useState('Filter Dropdown')

    const [cards, setCards] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios('http://localhost:5000/');
            setCards(result.data.job_list);
        }; 
        fetchData();
    }, []);
   

    const handleChange = e => {
        setQuery(e);
        let oldList = cards.map(card => {
            return { company: card.company.toLowerCase(), position: card.position, status: card.status};
        }
        );

        if (e !== "") {
            let newList = [];
            newList = oldList.filter( card =>
                card.company.includes(e.toLowerCase())
            );

            setFilterDisplay(newList);
        } else{
            setFilterDisplay(cards)
        }
    };

    const handleDropdownChange = e => {
        setSelectedOption(e);
        setTitleDrop(drop_choose(e));

        let oldList = cards.map(card => {
            return { company: card.company, position: card.position, status: card.status.toLowerCase() };
        }
        );
        if ( e !== "") {
            let newList = [];
            newList = oldList.filter( card =>
                card.status.includes(e.toLowerCase())
            );

            setFilterDisplay(newList);
        } else{
            setFilterDisplay(cards)
        }
    }

    return (
        <div>
            {/* filter dropdown thing here too */}
            <div className="filter">
                <Dropdown titleDrop={titleDrop}  value={selectedOption} handleSelect={handleDropdownChange}/>
            </div>
            <div className="searchbox">
            <SearchBar value={query} handleChange={e =>handleChange(e.target.value)} />
            </div>
            <div className="results">
                <Results cards={query.length < 1 && selectedOption.length < 1 ? cards : filterDisplay} />
            </div>
        </div>
    );
};

export default Home;