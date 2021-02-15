import React, { Component } from 'react'
import Table from './Table'
import Form from './Form'
import axios from 'axios'
import JobCard from './JobCard'

class App extends Component {
  render() {
    return (
      <>
        <JobCard Company="Apple" Position="Intern" JobLink="www.google.com" Information="Paid Internship, $50 an hour"/>
      </>
    )
  }
}

export default App