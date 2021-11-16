import React, { Component } from "react";
import "./static/table.css";

class Table extends Component {
  constructor(props) {
    super(props); //since we are extending class Table so we have to use super in order to override Component class constructor
    this.state = {
      //state is by default an object
      //you can replace this with data from an API call through redux etc.
      students: [
        { id: 1, name: "Wasif", age: 21, email: "wasif@email.com" },
        { id: 2, name: "Ali", age: 19, email: "ali@email.com" },
        { id: 3, name: "Saad", age: 16, email: "saad@email.com" },
        { id: 4, name: "Asad", age: 25, email: "asad@email.com" }
      ]
    };
  }

  renderTableData() {
    //you can do any logic with the table data
    return this.state.students.map((student, index) => {
      const { id, name, age, email } = student; //destructuring
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{name}</td>
          <td>{age}</td>
          <td>{email}</td>
        </tr>
      );
    });
  }

  renderTableHeader() {
    let header = Object.keys(this.state.students[0]);
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  }

  render() {
    return (
      <div>
        <h4 id="title">Use This Table for all tbale views</h4>

        <div className="table-responsive">
          <table id="students" className="table table-striped">
            <thead>{this.renderTableHeader()}</thead>
            <tbody>{this.renderTableData()}</tbody>
          </table>
        </div>
        <ul className="pagination" role="navigation">
          <li
            className="page-item disabled"
            aria-disabled="true"
            aria-label="« Previous"
          >
            <span className="page-link" aria-hidden="true">
              ‹
            </span>
          </li>
          <li className="page-item active" aria-current="page">
            <span className="page-link">1</span>
          </li>
          <li className="page-item">
            <a className="page-link" href="">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#" rel="next" aria-label="Next »">
              ›
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default Table; //exportin
