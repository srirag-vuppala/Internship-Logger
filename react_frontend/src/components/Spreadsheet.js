import React, { useState } from "react";
import "../assets/Spreadsheet.css";
import Card from "react-bootstrap/Card";
import Popup from "./Popup";
import Dropdown from "./Dropdown_Button";
import axios from "axios";

const emoji = require("emoji-dictionary");

const emoji_choose = (e) => {
  if (e === "waiting") {
    return emoji.getUnicode(":seedling:") + " ";
  } else if (e === "coding") {
    return emoji.getUnicode(":computer:") + " ";
  } else if (e === "interview") {
    return emoji.getUnicode(":calendar:") + " ";
  } else if (e === "offer") {
    return emoji.getUnicode(":page_facing_up:") + " ";
  } else if (e === "rejected") {
    return emoji.getUnicode(":x:") + " ";
  } else {
    return emoji.getUnicode(":leopard:") + " ";
  }
};

const drop_choose = (e) => {
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

// let jobList = axios.get('http://localhost:5000/spreadsheet').then(res => { return res.data.job_list});




// function getBackendInfo() {
//   axios.get('http://localhost:5000/spreadsheet')
//   .then(res => {
//     return res.data.job_list;
//     // jobList = res.data.job_list;
//     // console.log(jobList);
//   })
//   .catch(function (error) {
//   console.log(error);
//   });
// }; 

// jobList = getBackendInfo();

// console.log(jobList);

/*
 * The Spreadsheet React component
 */
class Spreadsheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      titleDrop: 'Current Stage of Process',
      selectedOption: '',
      
      // jobList: [],
    };
  }
  render() {
    const style = {
      padding: "30px",
      paddingTop: "10px",
      "font-family": "Montserrat",
    };
    const style_add_button = {
      "font-family": "Montserrat",
      "border-color": "red"
    }

    const togglePopup = () => {
      this.setState({ isOpen: !this.state.isOpen });
    };

    const handleDropdownChange = (e) => {
      this.setState({titleDrop: drop_choose(e)});
    }

    return (
      <div style={style}>
		  <div><SpreadsheetBoard /></div>
        <div>
          <input
            className="Add-Button"
            style={style_add_button}
            type="button"
            value="Add"
            onClick={togglePopup}
          />
          {this.state.isOpen && (
            <Popup
              className="add-popup"
              content={
                <>
                  <div className="Enter-Position-box">
                    <input type="text" placeholder="Enter Position" />
                  </div>
                  <div className="Enter-Company-Name-box">
                    <input type="text" placeholder="Enter Company Name" />
                  </div>
                  <div className="Current-Stage-Of-Process">
                    <Dropdown titleDrop={this.state.titleDrop}  value={this.state.selectedOption} handleSelect={handleDropdownChange}/>
                  </div>
                  <div className="Additional-Information-box">
                    <input type="text" placeholder="Additional Information" />
                  </div>
                  <button className="Submit-Position" bsPrefix="super-colors">
                    Submit Position
                  </button>
                </>
              }
              handleClose={togglePopup}
            />
          )}
        </div>
      </div>
    );
  }
}

/*
 * The Kanban Board React component
 */
class SpreadsheetBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      jobs: [],
      draggedOverCol: "",
    };
    this.handleOnDragEnter = this.handleOnDragEnter.bind(this);
    this.handleOnDragEnd = this.handleOnDragEnd.bind(this);
    this.columns = [
      { company: "Waiting To Hear Back", status: "waiting" },
      { company: "Coding Challenge", status: "coding" },
      { company: "Interview", status: "interview" },
      { company: "Offer", status: "offer" },
      { company: "Rejected", status: "rejected" },
    ];
  }

  // function getBackendInfo() {
  //   axios.get('http://localhost:5000/spreadsheet')
  //   .then(res => {
  //     return res.data.job_list;
  //   // jobList = res.data.job_list;
  //   // console.log(jobList);
  //   })
  //   .catch(function (error) {
  //   console.log(error);
  //   });
  // }; 

  componentDidMount() {
    // this.setState({ jobs: getBackendInfo(), isLoading: false });
    axios.get('http://localhost:5000/spreadsheet')
    .then(res => {
      this.setState({jobs: res.data.job_list, isLoading: false});
    })
    .catch(function (error) {
    console.log(error);
    });
  }

  //this is called when a Kanban card is dragged over a column (called by column)
  handleOnDragEnter(e, statusValue) {
    this.setState({ draggedOverCol: statusValue });
  }

  //this is called when a Kanban card dropped over a column (called by card)
  handleOnDragEnd(e, job) {
    const updatedJobs = this.state.jobs.slice(0);
    updatedJobs.find((jobObject) => {
      return (
        jobObject.company === job.company && jobObject.position === job.position
      );
    }).status = this.state.draggedOverCol;
    this.setState({ jobs: updatedJobs });
    console.log(this.state.jobs);
    // We'll probably need to do some axios bs to update the backend with the changed status


  }

  render() {
    if (this.state.isLoading) {
      return <h3>Loading...</h3>;
    }

    return (
      <div>
        {this.columns.map((column) => {
          return (
            <SpreadsheetColumn
              company={column.company}
              status={column.status}
              jobs={this.state.jobs.filter((job) => {
                return job.status === column.status;
              })}
              onDragEnter={this.handleOnDragEnter}
              onDragEnd={this.handleOnDragEnd}
              key={column.status}
            />
          );
        })}
      </div>
    );
  }
}

/*
 * The Kanban Board Column React component
 */
class SpreadsheetColumn extends React.Component {
  constructor(props) {
    super(props);
    this.state = { mouseIsHovering: false };
  }

  componentWillReceiveProps(nextProps) {
    this.state = { mouseIsHovering: false };
  }

  generateSpreadsheetCards() {
    return this.props.jobs.slice(0).map((job) => {
      return (
        <SpreadsheetCard
          job={job}
          key={job.company}
          onDragEnd={this.props.onDragEnd}
        />
      );
    });
  }

  render() {
    const columnStyle = {
      display: "inline-block",
      verticalAlign: "top",
      marginRight: "5px",
      marginLeft: "20px",
      marginBottom: "5px",
      paddingLeft: "8px",
      paddingRight: "5px",
      paddingTop: "10px",
      width: "230px",
      "border-radius": "15px",
      "box-shadow": "0 4px 10px rgba(235, 0, 0, .60)",
      textAlign: "center",
      backgroundColor: this.state.mouseIsHovering
        ? "#000000"
        : "rgba(235,0,0, .80)",
      "font-family": "Montserrat",
    };
    return (
      <div
        style={columnStyle}
        onDragEnter={(e) => {
          this.setState({ mouseIsHovering: true });
          this.props.onDragEnter(e, this.props.status);
        }}
        onDragExit={(e) => {
          this.setState({ mouseIsHovering: false });
        }}
      >
        <h5
          style={{
            backgroundColor: "rgba(30,30,30,0.6)",
            color: "white",
            "border-radius": "5px",
            "box-shadow": "0 4px 10px rgba(235, 0, 0, .50)",
            "font-family": "Montserrat",
          }}
        >
          {emoji_choose(this.props.status)}
          {this.props.company} ({this.props.jobs.length})
        </h5>
        {this.generateSpreadsheetCards()}
        <br />
      </div>
    );
  }
}

/*
 * The Kanban Board Card component
 */
class SpreadsheetCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
    };
  }

  render() {
    const cardStyle = {
      backgroundColor: "#f9f7f7",
      paddingLeft: "0px",
      paddingTop: "5px",
      paddingBottom: "5px",
      marginLeft: "0px",
      marginRight: "5px",
      marginBottom: "5px",
      "font-family": "Montserrat",
      "box-shadow": "0 4px 12px rgba(235, 0, 0, .60)",
      "border-radius": "13px",
    };

    return (
      <Card
        style={cardStyle}
        draggable={true}
        className="mb-2"
        border="danger"
        onDragEnd={(e) => {
          this.props.onDragEnd(e, this.props.job);
        }}
      >
        <Card.Header>{this.props.job.company}</Card.Header>
        <Card.Body
          style={{
            width: "100%",
            height: "60%",
            "font-size": "14px",
            paddingLeft: "5px",
            paddingRight: "5px",
          }}
          onClick={(e) => {
            this.setState({ collapsed: !this.state.collapsed });
          }}
        >
          {this.state.collapsed ? null : (
            <div>
              <strong>Position: </strong>
              {this.props.job.position}
              <br />
              <strong>Info: </strong>
              {this.props.job.additional_info}
            </div>
          )}

          {this.state.collapsed
            ? String.fromCharCode("9660")
            : String.fromCharCode("9650")}
        </Card.Body>
      </Card>
    );
  }
}

// const getBackendInfo = () => {
//   axios.get('http://localhost:5000/')
//   .then(res => {
//     this.setState({});
//       setCards(res.data.job_list);
//     this.setState({ characters });
//     console.log(characters);
//     return characters;
//     return cardss
// })
// .catch(function (error) {
//   console.log(error);
//   });
// };

// function getBackendInfo() {
//   axios.get('http://localhost:5000/users')
//   .then(res => {
//     const cards = res.data.job_list;
//     console.log(cards);
//     return cards;
//   })
//   .catch(function (error) {
//   console.log(error);
//   });
// }; 
/*
 * Projects to be displayed on Scrum Board
 */
// let jobList = [
//   {
//     company: "google",
//     position: "SWE",
//     status: "waiting",
//     additional_info: "mish",
//   },
//   {
//     company: "google",
//     position: "Data Analyst",
//     status: "interview",
//     additional_info: "mish",
//   },
//   {
//     company: "facebook",
//     position: "SWE",
//     status: "coding",
//     additional_info: "mish",
//   },
//   {
//     company: "apple",
//     position: "SWE",
//     status: "waiting",
//     additional_info: "mish",
//   },
//   {
//     company: "jupyter",
//     position: "SWE",
//     status: "coding",
//     additional_info: "mish",
//   },
//   {
//     company: "cal poly",
//     position: "SWE",
//     status: "interview",
//     additional_info: "mish",
//   },
//   {
//     company: "dodgers",
//     position: "SWE",
//     status: "coding",
//     additional_info: "mish",
//   },
//   {
//     company: "giants",
//     position: "SWE",
//     status: "rejected",
//     additional_info: "mish",
//   },
//   {
//     company: "red sox",
//     position: "SWE",
//     status: "coding",
//     additional_info: "mish",
//   },
//   {
//     company: "jupyter",
//     position: "tpm",
//     status: "offer",
//     additional_info: "mish",
//   },
//   {
//     company: "yahoo",
//     position: "SWE",
//     status: "interview",
//     additional_info: "mish",
//   },
//   {
//     company: "qk",
//     position: "SWE",
//     status: "waiting",
//     additional_info: "mish",
//   },
//   {
//     company: "nasdaq",
//     position: "data entry intern",
//     status: "offer",
//     additional_info: "mish",
//   },
//   {
//     company: "reddit",
//     position: "manager",
//     status: "coding",
//     additional_info: "mish",
//   },
// ];

export default Spreadsheet;
