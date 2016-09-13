import React from "react";
import Grid from "./Grid.jsx";
import style from "./Root.css";

export default React.createClass({

	gameStarted : false,

	interval : null,

	speeds : {
		"Slow" : 150,
		"Medium" : 125,
		"Fast" : 80
	},

	scoreIncrement : {
		150 : 1,
		125 : 2,
		80 : 3
	},

	startGame : function () {
		this.gameStarted = true;
		this.updateSnakeState();
		console.log("Game Started");
	},

	getFood : function (snakeStates,gridSize) {
		var currentState = snakeStates[snakeStates.length-1];	
		var array = currentState.map(function (i) {
			return i.P;
		})
		while (true) {
			var food = Number.parseInt(Math.random()*gridSize)+1;
			if (array.indexOf(food) == -1) {
				return food;
			}
		}

	},

	changeSpeed : function (event) {
		var speed = this.speeds[event.target.value];
		if (speed) {
			this.setState({speed:speed});
		}
	},

	changeGridSize : function (event) {
		var value = Number.parseInt(event.target.value);
		console.log(value);
		if (value > 8 && value < 21 && !this.gameStarted) {
			this.setState({gridSize : value*value})
		}
	},

	getNextPosition : function (snake) {
		var currentPosition = snake.P;
		var sqrtOfGrid = Math.sqrt(this.state.gridSize)
		switch(this.state.keyCode) {
			case "ArrowRight":
				currentPosition+=1;
				if ((currentPosition%sqrtOfGrid)-1 == 0) {
					currentPosition = currentPosition-sqrtOfGrid;
				}
				return {P:currentPosition,D:"Right"};
			case "ArrowLeft":
				currentPosition-=1;
				if (currentPosition%sqrtOfGrid == 0) {
					currentPosition = currentPosition+sqrtOfGrid;
				}
				return {P:currentPosition,D:"Left"};
			case "ArrowUp":
				currentPosition-=sqrtOfGrid;
				if (currentPosition <= 0 ) {
					currentPosition = currentPosition+this.state.gridSize;
				}
				return {P:currentPosition,D:"Up"};
			case "ArrowDown":
				currentPosition+=sqrtOfGrid;
				if (currentPosition > this.state.gridSize ) {
					currentPosition = currentPosition-this.state.gridSize;
				}
				return {P:currentPosition,D:"Down"};	
			default:
				return snake;
		}
	},

	getNextStateOfSnake : function (snake) {
		snake = snake.map(function (i,j) {
					if (j == 0) {
						i = this.getNextPosition(i);
					}
					else {
						i = snake[j-1];
					}
					return i;
				}.bind(this));
		if (this.isSnakeBiteItself(snake)) {
			this.endGame();
		}
		snake = this.isSnakeGotFood(snake);
		return snake;
	},

	endGame : function () {
		clearInterval(this.interval);
	},

	isSnakeBiteItself : function (snake) {
		var snakePos = snake.map(function (i) {
			return i.P;
		})
		var snakeSet = new Set(snakePos);
		if (snakePos.length != snakeSet.size) {			
			return true;
		}
		return false;
	},

	isSnakeGotFood : function (snake) {
		if (snake[0].P == this.state.food) {
			snake = snake.reverse();
			snake.push(this.getNextPosition({P:this.state.food}));
			var scoreIncr = this.scoreIncrement[this.state.speed];
			this.setState({
				food:this.getFood(this.state.snakeStates,this.state.gridSize),
				score:this.state.score+scoreIncr});
			return snake.reverse();
		}
		return snake;
	},

	updateState : function () {
		var snakeStates = this.state.snakeStates;
		var snakeState = this.getNextStateOfSnake(snakeStates[snakeStates.length-1]);
		snakeStates.push(snakeState);
		this.setState({snakeStates:snakeStates});
	},

	updateSnakeState : function () {
		console.log("Game in propgress....")
		this.interval = setInterval(function () {
			this.updateState();
		}.bind(this),this.state.speed);
	},

	getInitialState : function (props) {
		var snakeState = [{P : 27,D : "Left"},
						{P : 26,D : "Left"},
						{P : 25,D : "Left"},
						{P : 24,D : "Left"}].reverse();
		return {
			speed : this.speeds["Slow"],
			gridSize : this.props.gridSize,
			snakeStates : [snakeState],
			food : this.getFood([snakeState],this.props.gridSize),
			score : 0
		};
	},

	componentWillReceiveProps : function (props) {
		this.setState({keyCode:props.keyCode});
	},

 	getList : function (inp) {
 		var list = [];
 		for (var i=1;i<=inp;i++) {
 			list.push(i);
 		}
 		return list;
 	},

	render : function() {
		if (this.state.keyCode && !this.gameStarted) {
			this.startGame();
		}
		var grids = this.getList(this.state.gridSize);
		var snake = this.state.snakeStates[this.state.snakeStates.length-1];
		var containerSize = Math.sqrt(this.state.gridSize)*30;
    		return (
    			<div>
    				Grid Size : <input defaultValue={12} type="number" onChange={this.changeGridSize}/>
    				Speed : <select onChange={this.changeSpeed}>
      						<option>Slow</option>
      						<option>Medium</option>
      						<option>Fast</option>
      					</select>
      			<h3>Score = {this.state.score}</h3>
	      		<div className={style.bg} style={{height:containerSize+'px',width:containerSize+'px'}} >
	      			{grids.map(function (i) {
	      				return (<Grid id = {i} snake={snake} food={this.state.food}/>)
	      			}.bind(this))}
	      		</div>
      		</div>
    		);
  	},
});
