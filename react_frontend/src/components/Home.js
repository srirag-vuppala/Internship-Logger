import React, { useState, useEffect } from 'react'
import '../assets/Home.css'
import SearchBar from './SearchBar'
import SearchButton from './SearchButton'
import Dropdown from './Dropdown_Button'
import Results from './Results'
import Select from "react-select";



function Home() {
    const [query, setQuery] = useState('');
    // for the dropdown
    const [selectedOption, setSelectedOption] = useState('');

    const [filterDisplay, setFilterDisplay] = useState([]);

    const [cards] = useState([
        { company: "google", position: "SWE", status: "waiting"},
        { company: "google", position: "Data Analyst", status: "interview"},
        { company: "facebook", position: "SWE", status:"coding"},
        { company: "apple", position: "SWE", status: "waiting"},
        { company: "jupyter", position: "SWE", status:"coding"},
        { company: "cal poly", position: "SWE", status:"interview"},
        { company: "dodgers", position: "SWE", status:"coding"},
        { company: "giants", position: "SWE", status:"rejected"},
        { company: "red sox", position: "SWE", status:"coding"},
        { company: "yahoo", position: "SWE", status:"offer"}
    ]);

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
                <Dropdown FilterType="Filter Dropdown" value={selectedOption} handleSelect={handleDropdownChange}/>
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
