import React, { Component } from "react";

export default class Borang extends Component {
  state = {};
  render() {
    const { data } = this.props;
    return (
      <div>
        {data.map(e => (
          <div className="container" key={e.id}>
            <img src={`/images/${e.productImage}`} />
          </div>
        ))}
      </div>
    );
  }
}
