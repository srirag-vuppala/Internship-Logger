import React, { useState, useEffect } from 'react'
import '../assets/Home.css'
import SearchBar from './SearchBar'
import SearchButton from './SearchButton'
import Results from './Results'

function Home() {
        // state = {
        //     query: '', 
        //     results: {},
        //     loading: false,
        //     message: '',
        // };
    const [query, setQuery] = useState('');

    const [filterDisplay, setFilterDisplay] = useState([]);

    const [cards] = useState([
        { company: "google", position: "SWE"},
        { company: "facebook", position: "SWE"},
        { company: "apple", position: "SWE"},
        { company: "jupyter", position: "SWE"},
        { company: "cal poly", position: "SWE"},
        { company: "dodgers", position: "SWE"},
        { company: "giants", position: "SWE"},
        { company: "red sox", position: "SWE"},
        { company: "yahoo", position: "SWE"}
    ]);

    const handleChange = e => {
        setQuery(e);
        let oldList = cards.map(card => {
            return { company: card.company.toLowerCase(), position: card.position};
        }
    );

        if (query !== "") {
            let newList = [];
            newList = oldList.filter( card =>
                card.company.includes(query.toLowerCase())
            );

            setFilterDisplay(newList);
        } else{
            setFilterDisplay(cards)
        }
    };

    return (
        <div>
            {/* filter dropdown thing here too */}
            <SearchBar value={query} handleChange={e =>handleChange(e.target.value)} />
            <div className="results">
                {/* <SearchButton onChange={handleOnInputChange}/> */}
                <Results cards={query.length < 1 ? cards : filterDisplay} />
            </div>
        </div>
    );
};

export default Home;
