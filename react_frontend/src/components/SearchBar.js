import '../assets/SearchBar.css'
/* import React, { Component } from 'react'

function SearchBar() {
    return (
        <div>
            <input type="text" className="input" placeholder="Search..." />
            <ul>
            ...
            </ul>
        </div>
    )
}

export default SearchBar   */

/* import React from 'react';

const SearchBar = ({keyword,setKeyword}) => {
  const BarStyling = {width:"20rem",background:"#F2F1F9", border:"none", padding:"0.5rem"};
  return (
    <input 
     style={BarStyling}
     key="random1"
     value={keyword}
     placeholder={"search country"}
     onChange={(e) => setKeyword(e.target.value)}
    />
  );
}

export default SearchBar */

import React from 'react';
/*import '../assets/SearchBar.scss'*/
/*import './SearchBar.scss'*/
/*class SearchBar extends React.Component {
  constructor(props){
    super(props);
    this.state={term:''};
  }
  onInputChange(term){
    const name = this.props.searchBoxName || undefined
    this.setState({term});
    if(this.props.onSearchTermChange){
      this.props.onSearchTermChange({name,term})
    }
  }
    render() {
      const name = this.props.searchBoxName || undefined
        return (
            <div className="search-box">
              <div className="search-icon">
                <img src="http://share.ashiknesin.com/search-icon.png"></img>
              </div>
              <input name={name} className="search-input" id="search" type="text" placeholder="Search" value={this.state.term}
                onChange={event=>this.onInputChange(event.target.value)} onKeyPress={this.props.onKeyPress|| null}/>
            </div>
        );
    }
}*/

function SearchBar() {
  return (
    <div className="search-bar">
        <input className="input-text"
        type="text"
        placeholder="Search Bar"
        />
    </div>
  )
}

export default SearchBar