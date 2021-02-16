import React, { Component } from 'react'
import Table from './Table'
import Form from './Form'
import axios from 'axios'
import SearchBar from './SearchBar'


class App extends Component {
  state = {
    characters: [],
  }

  removeCharacter = index => {
    const { characters } = this.state

    //this.makeDeleteCall(characters[index])
    axios.delete('http://localhost:5000/users', {data : characters[index]})


    this.setState({ 
      characters: characters.filter((character, i) => {
        return i !== index
      }),
    })
  }

  makeDeleteCall(object){
    return axios.delete('http://localhost:5000/users', {
      data : {
        'id': object.id,
        'name': object.name,
        'job': object.job
    }})
    .then(function(response) {
      console.log(response);
      return (response.status === 200);
    })
    .catch(function (error){
      console.log(error);
      return false;
    });
  }

  componentDidMount() {
    axios.get('http://localhost:5000/users')
    .then(res => {
      const characters = res.data.users_list;
      this.setState({ characters })
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  makePostCall(character){
    return axios.post('http://localhost:5000/users', character)
    .then(function(response) {
      console.log(response);
      return response
    })
    .catch(function (error){
      console.log(error);
      return false;
    });
  }

  handleSubmit = character => {
    this.makePostCall(character).then( callResult => {
      character.id = callResult.id
      if (callResult.status === 201) {
        this.setState({ characters: [...this.state.characters, callResult.data] });
      }
    });
  }

  render() {
    const { characters } = this.state
    return(
      <div className="container">
        <Table characterData={characters} removeCharacter={this.removeCharacter} />
        <Form handleSubmit={this.handleSubmit}/>
        {/*<SearchBar searchBoxName={"userNameSearch"} onSearchTermChange={this.onSearch} />*/}
        <input type="text" style={{textAlign: 'center'}} placeholder="Search..." />
      </div>
    )
  }
}

export default App