import React from "react";
import style from "./Grid.css"

export default React.createClass({
  render: function() {
  	var snakePos = this.props.snake.map((i)=>{
  		return i.P;
  	})
  	var className = style.grid;
  	if (this.props.id == this.props.food) {
  		className = style.food;
  	}
  	else if (snakePos.indexOf(this.props.id) == 0) {
  		if (this.props.snake[0].D == "Right") {
  			className = style.headRight;
  		}
  		else if (this.props.snake[0].D == "Left") {
  			className = style.headLeft;
  		}
  		else if (this.props.snake[0].D == "Up") {
  			className = style.headUp;
  		}
  		else if (this.props.snake[0].D == "Down") {
  			className = style.headDown;
  		}
  	}
  	else if (snakePos.indexOf(this.props.id) == snakePos.length-1) {
  		if (this.props.snake[snakePos.length-2].D == "Right") {
  			className = style.tailRight;
  		}
  		else if (this.props.snake[snakePos.length-2].D == "Left") {
  			className = style.tailLeft;
  		}
  		else if (this.props.snake[snakePos.length-2].D == "Up") {
  			className = style.tailUp;
  		}
  		else if (this.props.snake[snakePos.length-2].D == "Down") {
  			className = style.tailDown;
  		}
  	}
  	else if (snakePos.indexOf(this.props.id) != -1) {
  		var snakePos = snakePos.indexOf(this.props.id);
  		var snake = this.props.snake[snakePos];
  		var beforeSnake = this.props.snake[snakePos-1];
  		var afterSnake = this.props.snake[snakePos+1];  		
  		var classNameKey = "snake";
  		if (beforeSnake.D != afterSnake.D && beforeSnake.D != snake.D || beforeSnake.D != snake.D) {
  			classNameKey = "curve"+beforeSnake.D+snake.D+afterSnake.D;
  		}
  		else {
  			classNameKey = "body"+snake.D;
  		}
  		// console.log("CN ",classNameKey,"S ",snake.D,"BS ",beforeSnake.D,"AS ",afterSnake.D,"ID ",this.props.id)
  		className = style[classNameKey];
  	}
    return (
      <button className={className} data-id={this.props.id}></button>
    );
  },
});
