import React, { Component } from "react";
import axios from "axios";
import Borang from "./Borang";
import Json from "./Json";
import Sidebar from "./sidebar";

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
      .get("/api/admin/orders")
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
  deleteOrder() {
    axios
      .delete("/api/admin/all")
      .then(response => {
        console.log("response", response);
      })
      .catch(e => {
        console.log(e);
      });
  }
  render() {
    return (
      <div>
        <Sidebar />
        {/* <div className="container">Delet All Orders</div>
        <button className="btn btn-primary" onClick={() => this.deleteOrder()}>
          Delete
        </button> */}
      </div>
    );
  }
}

export default App;
