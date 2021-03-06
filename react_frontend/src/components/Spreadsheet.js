import React from 'react'
import Card from 'react-bootstrap/Card'

// function Spreadsheet(){
//     return (
//         <div>
//             <p>hey there</p>
//         </div>
//     )
// }

const emoji = require("emoji-dictionary")

const emoji_choose = e => {
    if (e === 1) {
        return emoji.getUnicode(":seedling:")+" "
    }
    else if(e === 2) {
        return emoji.getUnicode(":computer:")+" "
    }
    else if(e === 3) {
        return emoji.getUnicode(":calendar:")+" "
    }
    else if(e === 4) {
        return emoji.getUnicode(":page_facing_up:")+" "
    }
    else if(e === 5) {
        return emoji.getUnicode(":x:")+" "
    }

    else {
        return emoji.getUnicode(":leopard:")+" "
    }
}

/*
 * The Kanban React component
 */
class Spreadsheet extends React.Component {
	render(){
		const style = {
			'padding': '30px',
			'paddingTop': '5px',
			'font-family': 'Montserrat'
		};
    
		return(
      <div style={ style }>
        <h2>Spreadsheet</h2>
			<SpreadsheetBoard />
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
		this.state = ({
			isLoading: true,
			jobs: [],
			draggedOverCol: 0,
		});
		this.handleOnDragEnter = this.handleOnDragEnter.bind(this);
		this.handleOnDragEnd = this.handleOnDragEnd.bind(this);
		this.columns = [
			{name: 'Waiting To Hear Back', stage: 1},
			{name: 'Coding Challenge', stage: 2},
			{name: 'Interview', stage: 3},
			{name: 'Offer', stage: 4},
			{name: 'Rejected', stage: 5},
		];
	}

	componentDidMount() {
		this.setState({ jobs: jobList, isLoading: false });
	}

	//this is called when a Kanban card is dragged over a column (called by column)
	handleOnDragEnter(e, stageValue) {
		this.setState({ draggedOverCol: stageValue });
	}

	//this is called when a Kanban card dropped over a column (called by card)
	handleOnDragEnd(e, job) {
		const updatedJobs = this.state.jobs.slice(0);
		updatedJobs.find((jobObject) => {return jobObject.name === job.name;}).job_stage = this.state.draggedOverCol;
		this.setState({ jobs: updatedJobs });
	}

	render() {
		if (this.state.isLoading) {
			return (<h3>Loading...</h3>);
		}

		return  (
      <div>
				{this.columns.map((column) => {
					return (
						<SpreadsheetColumn
							name={ column.name }
							stage={ column.stage }
							jobs={ this.state.jobs.filter((job) => {return parseInt(job.job_stage, 10) === column.stage;}) }
							onDragEnter={ this.handleOnDragEnter }
							onDragEnd={ this.handleOnDragEnd }
							key={ column.stage }
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
		this.state = ({ mouseIsHovering: false });
	}

	componentWillReceiveProps(nextProps) {
		this.state = ({ mouseIsHovering: false });
	}

	generateSpreadsheetCards() {
		return this.props.jobs.slice(0).map((job) => {
			return (
				<SpreadsheetCard
					job={job}
					key={job.name}
					onDragEnd={this.props.onDragEnd}
				/>
			);
		});
	}

	render() {
		const columnStyle = {
			'display': 'inline-block',
			'verticalAlign': 'top',
			'marginRight': '5px',
			'marginLeft': '20px',
			'marginBottom': '5px',
			'paddingLeft': '5px',
			'paddingTop': '0px',
			'width': '230px',
			'border-radius': '15px',
			'textAlign': 'center',
			'backgroundColor': (this.state.mouseIsHovering) ? '#d3d3d3' : '#f0eeee',
			'font-family': 'Montserrat'
		};
		return  (
      <div
				style={columnStyle}
				onDragEnter={(e) => {this.setState({ mouseIsHovering: true }); this.props.onDragEnter(e, this.props.stage);}}
				onDragExit={(e) => {this.setState({ mouseIsHovering: false });}}
			>
				<h4><u>{emoji_choose(this.props.stage)}{this.props.name} ({this.props.jobs.length})</u></h4>
				{this.generateSpreadsheetCards()}
				<br/>
      </div>);
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
			'backgroundColor': '#f9f7f7',
			'paddingLeft': '0px',
			'paddingTop': '5px',
			'paddingBottom': '5px',
			'marginLeft': '0px',
			'marginRight': '5px',
			'marginBottom': '5px',
			'font-family': 'Montserrat'
		};

		return (
			<Card
				style={cardStyle}
				draggable={true}
				className="mb-2"
				border="danger"
				onDragEnd={(e) => {this.props.onDragEnd(e, this.props.job);}}
			>
				{/* <div><h4>{this.props.project.name}</h4></div> */}
				<Card.Header>{this.props.job.name}</Card.Header>
				{(this.state.collapsed)
					? null
					: (<div><strong>Description: </strong>{ this.props.job.description }<br/></div>)
				}
				<Card.Body
					style={{'width': '100%' , 'height': '10%'}}
					onClick={(e) => {this.setState({collapsed: !this.state.collapsed});}}
				>
					{(this.state.collapsed) ? String.fromCharCode('9660') : String.fromCharCode('9650')}
				</Card.Body>
			</Card>
		);
	}
}

/*
 * Projects to be displayed on Kanban Board
 */
let jobList = [
  {
    name: 'Job - 1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. ',
    job_stage: 1
  },
  {
    name: 'Job - 2',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. ',
    job_stage: 1
  },
  {
    name: 'Job - 3',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. ',
    job_stage: 1
  },
  {
    name: 'Job - 4',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. ',
    job_stage: 2
  },
  {
    name: 'Job - 5',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. ',
    job_stage: 3
  },
  {
    name: 'Job - 6',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. ',
    job_stage: 3
  },
  {
    name: 'Job - 7',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. ',
    job_stage: 4
  },
];

export default Spreadsheet 