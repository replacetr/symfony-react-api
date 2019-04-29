import React, { Component } from "react";

export default class Sidebar extends Component {
  render() {
    return (
      <React.Fragment>
        <nav className="col-md-2 d-none d-md-block bg-light sidebar">
          <div className="sidebar-sticky">
            <ul className="nav flex-column">
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <span data-feather="home" />
                  Dashboard
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  <span data-feather="file" />
                  Orders
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#">
                  <span data-feather="users" />
                  Customers
                </a>
              </li>

              <li className="nav-item dropdown ">
                <a
                  className="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                  href="#"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="true"
                >
                  <span data-feather="shopping-cart" /> Product
                </a>
                <div
                  className="dropdown-menu "
                  x-placement="bottom-start"
                  // style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 38px, 0px);"
                >
                  <a className="dropdown-item" href="#cat">
                    Add Category
                  </a>
                  <a className="dropdown-item" href="#pro">
                    Add Product
                  </a>
                </div>
              </li>

              <li className="nav-item dropdown ">
                <a
                  className="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                  href="#"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="true"
                >
                  email
                </a>
                <div
                  className="dropdown-menu "
                  x-placement="bottom-start"
                  // style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 38px, 0px);"
                >
                  <a className="dropdown-item" href="#logout">
                    Logout
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}
