import React, { Component } from "react";
import {Grid,Table,TableHeaderRow} from "@devexpress/dx-react-grid-bootstrap4";
import {DataTypeProvider,EditingState,} from '@devexpress/dx-react-grid';
import GridUtils from "../../../Utilities/GridUtils";
import "../Messaging/static/datatable-custom.css";
import { get } from "../../../services/Transport";
import { connect } from "react-redux";
import { signOut } from "../carbonActions";
import DatePicker from "react-datepicker";
import Select from "react-select";
import {NotificationContainer,NotificationManager} from "react-notifications";
import { Modal, ModalBody } from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";
import GH_FLAG from "../../../static/img/gh.svg";
import "../Messaging/static/sms-overview.css";
import { Helmet } from "react-helmet";


const columns = [
  { name: "id", title: "ID" },
  { name: "msisdn", title: "Msisdn" },
  { name: "network", title: "Network" },
  { name: "uuid", title: "Session ID" },
  { name: "created_at", title: "Date" }
 
];


const HighlightedCell = ({ value, style, ...restProps }) => {
  let color;
  if (value == "Submitted") {
    color = "btn-label-brand";
  } else if (value == "Rejected") {
    color = "btn-label-danger";
  } else if (value == "Delivered") {
    color = "btn-label-success";
  } else if (value == "Failed") {
    color = "btn-label-danger";
  } else if (value == "Sent") {
    color = "btn-label-warning";
  } else {
    color = "btn-label-warning";
  }

  return (
    <Table.Cell {...restProps}>
      <span style={{ width: "100px" }}>
        <span className={"btn btn-bold btn-sm btn-font-sm " + color}>
          {value}
        </span>
      </span>
    </Table.Cell>
  );
};

const RecipientColor = ({ value, style, ...restProps }) => {
  return (
    <Table.Cell {...restProps}>
      <span className="btn btn-bold btn-sm btn-font-sm btn-label-brand">
        {value}
      </span>
    </Table.Cell>
  );
};

const TableCell = props => {
  const { column } = props;
  
  if (column.name === "msisdn") {
    return <RecipientColor {...props} />;
  }
  // if (props.column.name === "actions")
  // return (
  //   <Table.Cell {...props}>
  //     <Delete onClick={() => alert("This is the first Icon")} />
  //     <Done onClick={() => alert("This is the second Icon")} />
  //     <Build onClick={() => alert("This is the third Icon")} />
  //   </Table.Cell>
  // );
  return <Table.Cell {...props} />;
};

const TableComponent = ({ ...restProps }) => (
  <Table.Table {...restProps} className="table-striped" />
);


class USSDSessions extends Component {
  state = {
   
    selectedApp: {},
    allUserSessions: [],
    gridNumber: "0",
    rowInfo: {},
    startDate: new Date(),
    endDate: new Date(),
    loading: false,
    selectedItem: {
      value: "0",
      label: "All Messages"
    },
    userId:'',
    clientName:''
  };

  handleStartDateChange = date => {
    this.setState(
      {
        startDate: date
      },
      () => this.setDate(this.state.startDate)
    );
  };
  handleEndDateChange = date => {
    this.setState(
      {
        endDate: date
      },
      () => this.setDate(this.state.endDate)
    );
  };

  TableRow = ({ classes, row, ...restProps }) => {
    return (
      <Table.Row
        {...restProps}
        // eslint-disable-next-line no-alert
        onClick={() => this.showModal(row)}
        // className={classes.tableStriped}
      />
    );
  };

  showModal = row => {
    this.setState({ showModal: true, rowInfo: row });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  setDate = date => {
    var day = JSON.stringify(date.getDate());
    if (day.length < 2) {
      day = "0".concat(day);
    }
    var month = JSON.stringify(date.getMonth() + 1);
    if (month.length < 2) {
      month = "0".concat(month);
    }

    var year = date.getFullYear();
    var date = `${year}-${month}-${day}`;
    return date;
  };

  componentDidMount() {
   
    document.title = "USSD Sessions - Wittyflow";
    this.getReports()
  }

  getReports=()=>{
    const { location } = this.props;
    const userId = this.props.match.params.uuid;
    const clientName = location.state.clientName;
    const { startDate, endDate } = this.state;
    var startdate = this.setDate(startDate);
    var list = []
    var enddate = this.setDate(endDate);
    this.setState({userId:userId,clientName:clientName });
  //load user sessions
    get(`ussd/apps/${userId}/sessions?start_date=${startdate}&end_date=${enddate}`)
      .then(res => {

        this.setState({ loading: false });
        if(res.data.code == 2000){
          const retrivedSessions = res.data.data.data;

          if (retrivedSessions && retrivedSessions.length > 0) {
            NotificationManager.success(res.data.message, "Success");
            retrivedSessions.forEach((element,i) => {
            
              list.push({
                msisdn: element.msisdn,
                network: element.network,
              
                uuid:element.uuid,
                created_at:element.created_at,
                id: i+1,
              
              });
              return element;
            });

            this.setState({ allUserSessions: list });
          } else {
            this.setState({ allUserSessions: [] });
          }
        }
       
      })
      .catch(err => {
        if (err.response) {
          if (err.response.status === 403) {
            this.props.signOut();
          }
        }
        this.setState({ loading: false });
      });
  }


  componentWillMount() {
    var loadjs = require("loadjs");

    //this styles the select boxes
    loadjs("external/js/custom.js");
  }


  handleSelect = selectedItem => {
    // console.log("selectedItem",selectedItem.value);
    this.setState({ selectedItem, gridNumber: selectedItem.value }, () =>
      this.filterTable(this.state.gridNumber)
    );
  };

   
  

  render() {
    const {
      allUserSessions,
      clientName,
    } = this.state;
   
    return (
      <>
        <Helmet>
          <title>User Sessions - Wittyflow</title>
          {/* <meta http-equiv="refresh" content="30"></meta> */}
        </Helmet>

        <div className="kt-portlet kt-portlet--mobile">
          <div className="kt-portlet__head kt-portlet__head--lg">
            <div className="kt-portlet__head-label">
              <span className="kt-portlet__head-icon">
                <i className="kt-font-brand flaticon2-line-chart"></i>
              </span>
             <h3 className="kt-portlet__head-title">Activity Sessions - {clientName}</h3>
            </div>
          </div>
          <div className="kt-portlet__body">
            {/*begin: Search Form */}
            <div className="kt-form kt-form--label-right kt-margin-t-20 kt-margin-b-10">
              <div className="row align-items-center">
                <div className="col-xl-12 order-2 order-xl-1">
                  <div className="row align-items-center">
                  
                    <div className="col-md-8 kt-margin-b-20-tablet-and-mobile date-columns">
                      <div className="row">
                        <div className="col-4">
                          <div className="kt-form__group kt-form__group--inline">
                            <div className="kt-form__label">
                              <label>Select Start Date:</label>
                            </div>
                            <div
                              className="kt-form__control ml-3 mb-3 "
                              style={{ width: "120px" }}
                            >
                              <DatePicker
                                dateFormat="yyyy-MM-dd"
                                selected={this.state.startDate}
                                onChange={this.handleStartDateChange}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="kt-form__group kt-form__group--inline">
                            <div className="kt-form__label">
                              <label>Select End Date:</label>
                            </div>
                            <div
                              className="kt-form__control ml-3 mb-3"
                              style={{ width: "120px" }}
                            >
                              <DatePicker
                                dateFormat="yyyy-MM-dd"
                                selected={this.state.endDate}
                                onChange={this.handleEndDateChange}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-4">
                          <button
                            class="btn btn-brand btn-icon-sm btn-elevate btn-square filterByDateBtn mb-2"
                            onClick={this.getReports}
                          >
                            <i class="ti-search"></i> Filter Results
                          </button>
                        </div>
                      </div>
                   
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>

            {/*end: Search Form */}
          </div>
          <div className="kt-portlet__body kt-portlet__body--fit">
            {/*begin: Datatable */}
            <div className="" id="local_data">
              {this.state.loading ? (
                <div className="container d-flex flex-column justify-content-center align-items-center">
                  <div>Please wait...</div>
                  <div class="spinner-border text-primary" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                </div>
              ) : (
                <GridUtils
                columns={columns}
                rows={allUserSessions}
                cellComponent={TableCell}
                rowComponent={this.TableRow}
                tableComponent={TableComponent}
              />
              )}
            </div>
            <NotificationContainer />
            {/*end: Datatable */}
          </div>
        </div>
       
      </>
    );
  }
}

export default connect(null, { signOut })(USSDSessions);
