import React, { Component } from "react";
import axios from "axios";
import Borang from "./Borang";
import Json from "./Json";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      jsonData: "{}"
    };

    this.tinguk = this.tinguk.bind(this);
  }

  componentDidMount() {
    axios
      .get("/api/orders")
      .then(response => {
        console.log("response", response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  tinguk() {
    const dataFrom = sessionStorage.getItem("data");
    this.setState({ jsonData: dataFrom });
    console.log(this.state);
  }
  render() {
    console.log("state->", this.state);
    const { data, jsonData } = this.state;

    const objData = JSON.parse(jsonData);
    console.log(objData);

    return (
      <div>
        <div className="container">
          <button onClick={() => this.tinguk()}>log</button>
          <ul>{objData.length && <Json objData={objData} />}</ul>
          {/* 
        
          {/* data {!data && <h3>Loading...</h3>}
          {data && (
            <ul>
              <Borang data={data} />
            </ul>
          )} */}
        </div>
      </div>
    );
  }
}

export default App;
