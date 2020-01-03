import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	        value: null,
	    };
	}

	render() {
		return <button className='square' onClick={() => {
						var i = this.props.val[0], j = this.props.val[1];
						this.props.updateBoardClick(i, j); 
						this.setState({value: this.props.mark[i][j]});}}>
				{this.state.value}
				</button>;
	}
	
}

class Board extends React.Component {
	constructor(props) {
		super(props);
		this.clickCount = 0;
		this.markings = [];
		var marks = ['O', 'X'];
		this.clickUpdate = (i, j) => {
			this.clickCount++;
			this.markings[i][j] = marks[this.clickCount%2];

			
			var signToCheck = this.markings[i][0], 
				count = 1;
			for(var k = 1; k < this.props.val; k++) {
				if(this.markings[i][k] != signToCheck) {
					break;
				} else {
					count++;
				}
			}
			if(count == this.props.val) {
				alert(signToCheck + ' has won!');
			}
			signToCheck = this.markings[0][j];
			count = 1;
			for(var k = 1; k < this.props.val; k++) {
				if(this.markings[k][j] != signToCheck) {
					break;
				} else {
					count++;
				}
			}
			if(count == this.props.val) {
				alert(signToCheck + ' has won!');
			}
		};
	}
	render() {
		var k = this.props.val,
			sqauresElems = [];
		
		for(var i = 0; i < k; i++) {
			this.markings.push([]);
			for(var j = 0; j < k; j++) {
				this.markings[i][j] = null;
				sqauresElems.push(<Square val={[i,j]} mark={this.markings} updateBoardClick={this.clickUpdate}/>);
			}
			sqauresElems.push(<br/>);
		}
		
		return (<div className='game'> {sqauresElems} </div>);
	}
}

ReactDOM.render(<Board val='3'/>, document.getElementById('root'));
