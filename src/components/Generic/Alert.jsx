import React, { Component } from "react";

class Alert extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const alert_type_class = `alert alert-dismissible fade show alert-${this.props.type}`;

    return (
      <div>
        <div className={alert_type_class} role="alert">
          {this.props.message}
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>
    );
  }
}

export default Alert;
