import React, { Component } from "react";

export default class Json extends Component {
  render() {
    const { objData } = this.props;
    return (
      <div>
        {objData.map((e, i) => (
          <li key={i}>{e.id}</li>
        ))}
      </div>
    );
  }
}
