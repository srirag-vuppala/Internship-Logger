import React from 'react'
import '../assets/NavBar.css'
import SearchBar from './SearchBar'
import SearchButton from './SearchButton'

export default function Home() {
    return (
        <div>
        <div className="container">
        {/*<Table characterData={characters} removeCharacter={this.removeCharacter} />
        <Form handleSubmit={this.handleSubmit}/>*/}
        {/*<SearchBar searchBoxName={"userNameSearch"} onSearchTermChange={this.onSearch} />*/}
        {/*<input type="text" placeholder="Search Bar" placeholderTextColor="#000000" style={{fontFamily:'Montserrat', textAlign: 'center', position: 'absolute', width: 587.53, height: 77, left: 504.77, top: 256, background: '#D3D3D3', fontSize: 36}} />*/}
        <SearchBar />
        <SearchButton />
        {/*<input type="button" value="Search" style={{color: '#FFFFFF', fontFamily:'Montserrat', background: '#660708', position: 'absolute', width: 174, height: 69.32, left: 1146, top: 256.16, borderRadius: 33.5, fontSize: 24, fontWeight: 'bold'}} onClick={this.submitForm} />*/}
      </div>
        </div>
    )
}
