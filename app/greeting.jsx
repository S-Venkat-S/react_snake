import React from "react";
import style from "./greeting.css"

export default React.createClass({
  render: function() {
    return (
      <div className={style.greeting}>
        Hello, {this.props.name}!
      </div>
    );
  },
});
