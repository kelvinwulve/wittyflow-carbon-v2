import React, { Component } from "react";
import $ from "jquery";
import {
  Grid,
  Table,
  TableHeaderRow
} from "@devexpress/dx-react-grid-bootstrap4";
import GridUtils from "../../../Utilities/GridUtils";
import "./static/datatable-custom.css";
import axios from "axios";
import { get } from "../../../services/Transport";
import { connect } from "react-redux";
import { signOut } from "../carbonActions";
import DatePicker from "react-datepicker";
import { Spinner } from "react-bootstrap";
import Select from "react-select";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import { Modal, ModalBody } from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";
import GH_FLAG from "../../../static/img/gh.svg";
import "./static/sms-overview.css";
import { Helmet } from "react-helmet";

const columns = [
  { name: "recipient", title: "Recipient" },
  { name: "sender", title: "Sender" },
  { name: "channel", title: "Channel" },
  { name: "message", title: "Message" },
  { name: "status", title: "Status" },
  { name: "readable_date", title: "Send Date" }
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
  if (column.name === "status") {
    return <HighlightedCell {...props} />;
  }
  if (column.name === "recipient") {
    return <RecipientColor {...props} />;
  }

  return <Table.Cell {...props} />;
};

const TableComponent = ({ ...restProps }) => (
  <Table.Table {...restProps} className="table-striped" />
);

const statusTypes = [
  { value: "0", label: "All Messages" },
  { value: "Sent", label: "Sent Messages" },
  { value: "Delivered", label: "Delivered Messages" },
  { value: "Failed", label: "Failed Messages" },
  { value: "Rejected", label: "Rejected Messages" },
  { value: "Buffered", label: "Buffered Messages" }
];

class SmsOverview extends Component {
  state = {
    showModal: false,
    pageNumber: 1,
    value: 0,
    showModal: false,
    appList: [],
    selectedApp: {},
    smsReports: [],
    gridNumber: "0",
    messageHeading: "All Messages",
    deliveredMessages: [],
    failedMessages: [],
    sentMessages: [],
    bufferedMessages: [],
    rejectedMessages: [],
    transitMessages: [],
    unknownMessages: [],
    submittedMessages: [],
    rowInfo: {},
    startDate: new Date(),
    endDate: new Date(),
    loading: false,
    selectedItem: {
      value: "0",
      label: "All Messages"
    }
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
    //console.log(date)
    return date;
  };

  componentDidMount() {
    document.title = "SMS Overview - Wittyflow";
    //get(`/messages/sms/reports?start_date=${startDate}&end_date=${endDate}`)
    this.getReports()
  }

  getReports = () => {
    const { startDate, endDate } = this.state;
    var startdate = this.setDate(startDate);
    var enddate = this.setDate(endDate);
    this.setState({ loading: true });
    get(`/messages/sms/reports?start_date=${startdate}&end_date=${enddate}`)
      .then(res => {
        this.setState({ loading: false });
        const retrivedMsgs = res.data.data;
        if (retrivedMsgs && retrivedMsgs.length > 0) {
          NotificationManager.success(res.data.message, "Success");
          this.setState({ smsReports: retrivedMsgs });
        } else {
          this.setState({ smsReports: [] });
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
  };

  componentWillMount() {
    var loadjs = require("loadjs");

    //this styles the select boxes
    loadjs("external/js/custom.js");
  }

  filterTable = value => {
    //console.log("grid value", value);
    if (value == "Delivered") {
      var deliveredMsg = this.state.smsReports.filter(
        item => item.status == "Delivered"
      );

      this.setState({
        messageHeading: "Delivered Messages",
        deliveredMessages: deliveredMsg
      });
    } else if (value == "Sent") {
      var sent = this.state.smsReports.filter(item => item.status == "Sent");

      this.setState({
        messageHeading: "Sent Messages",
        sentMessages: sent
      });
    } else if (value == "Failed") {
      var failed = this.state.smsReports.filter(
        item => item.status == "Failed"
      );

      this.setState({
        messageHeading: "Failed Messages",
        failedMessages: failed
      });
    } else if (value == "Rejected") {
      var rejected = this.state.smsReports.filter(
        item => item.status == "Rejected"
      );

      this.setState({
        messageHeading: "Rejected Messages",
        rejectedMessages: rejected
      });
    } else if (value == "Buffered") {
      var buffered = this.state.smsReports.filter(
        item => item.status == "Buffered"
      );

      this.setState({
        messageHeading: "Buffered Messages",
        bufferedMessages: buffered
      });
    }
  };

  // onChange = e => {
  //   console.log("selected value",e.target)
  //   const { value } = e.target;
  //   this.setState({ gridNumber: value }, () => this.filterTable(value));
  // };

  handleSelect = selectedItem => {
    // console.log("selectedItem",selectedItem.value);
    this.setState({ selectedItem, gridNumber: selectedItem.value }, () =>
      this.filterTable(this.state.gridNumber)
    );
  };

  render() {
    const {
      smsReports,
      gridNumber,
      deliveredMessages,
      failedMessages,
      messageHeading,
      bufferedMessages,
      rejectedMessages,
      sentMessages,
      transitMessages,
      unknownMessages,
      submittedMessages,
      rowInfo,
      startDate,
      endDate,
      selectedItem
    } = this.state;
    let gridToShow;

    if (gridNumber == "0") {
      gridToShow = (
        <GridUtils
          columns={columns}
          rows={smsReports}
          cellComponent={TableCell}
          rowComponent={this.TableRow}
          tableComponent={TableComponent}
        />
      );
    } else if (gridNumber == "Sent") {
      gridToShow = (
        <GridUtils
          columns={columns}
          rows={sentMessages}
          cellComponent={TableCell}
          rowComponent={this.TableRow}
          tableComponent={TableComponent}
        />
      );
    } else if (gridNumber == "Delivered") {
      gridToShow = (
        <GridUtils
          columns={columns}
          rows={deliveredMessages}
          cellComponent={TableCell}
          rowComponent={this.TableRow}
          tableComponent={TableComponent}
        />
      );
    } else if (gridNumber == "Rejected") {
      gridToShow = (
        <GridUtils
          columns={columns}
          rows={rejectedMessages}
          cellComponent={TableCell}
          rowComponent={this.TableRow}
          tableComponent={TableComponent}
        />
      );
    } else if (gridNumber == "Buffered") {
      gridToShow = (
        <GridUtils
          columns={columns}
          rows={bufferedMessages}
          cellComponent={TableCell}
          rowComponent={this.TableRow}
          tableComponent={TableComponent}
        />
      );
    } else if (gridNumber == "Failed") {
      gridToShow = (
        <GridUtils
          columns={columns}
          rows={failedMessages}
          cellComponent={TableCell}
          rowComponent={this.TableRow}
          tableComponent={TableComponent}
        />
      );
    }

    const status_colors = {
      sent: "primary",
      delivered: "success",
      failed: "danger",
      submitted: "warning",
      accepted: "warning",
      rejected: "danger",
      buffered: "warning"
    };

    return (
      <>
        <Helmet>
          <title>Sms Overview - Wittyflow</title>
          {/* <meta http-equiv="refresh" content="30"></meta> */}
        </Helmet>

        <div className="kt-portlet kt-portlet--mobile">
          <div className="kt-portlet__head kt-portlet__head--lg">
            <div className="kt-portlet__head-label">
              <span className="kt-portlet__head-icon">
                <i className="kt-font-brand flaticon2-line-chart"></i>
              </span>
              <h3 className="kt-portlet__head-title">SMS Overview - Today</h3>
            </div>
          </div>
          <div className="kt-portlet__body">
            {/*begin: Search Form */}
            <div className="kt-form kt-form--label-right kt-margin-t-20 kt-margin-b-10">
              <div className="row align-items-center">
                <div className="col-xl-12 order-2 order-xl-1">
                  <div className="row align-items-center">
                    <div className="col-md-3 kt-margin-b-20-tablet-and-mobile">
                      <div className="kt-form__group kt-form__group--inline">
                        <div className="kt-form__label">
                          <label>Filter Status:</label>
                        </div>
                        <div
                          className="kt-form__control ml-3 mb-3 "
                          style={{ width: "200px" }}
                        >
                          <Select
                            name="messageType"
                            id="filter_select"
                            options={statusTypes}
                            value={selectedItem}
                            onChange={this.handleSelect}
                            className="form-control bootstrap-select custom-select"
                          />
                        </div>
                      </div>
                    </div>
                    {/* <div className="col-md-2 kt-margin-b-20-tablet-and-mobile">
                      <div className="kt-form__group kt-form__group--inline">
                        <div className="kt-form__label">
                          <label>Type:</label>
                        </div>
                        <div className="kt-form__control">
                          <select
                            className="form-control bootstrap-select"
                            id="kt_form_type"
                          >
                            <option value="">Yesterday</option>
                            <option value="1">This Week</option>
                            <option value="2">This Month</option>
                            <option value="3">This year</option>
                          </select>
                        </div>
                      </div>
                    </div> */}
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
                gridToShow
              )}
            </div>
            <NotificationContainer />
            {/*end: Datatable */}
          </div>
        </div>
        <Modal
          size="lg"
          show={this.state.showModal}
          onHide={this.closeModal}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <ModalHeader closeButton>
            <span className="text-dark fw-400">Message Details</span>
          </ModalHeader>
          <ModalBody>
            <div className="row">
              <div className="col-12">
                {/* <img src={iPhone} alt="" /> */}
                <table className="table">
                  <tbody>
                    <tr>
                      <td>Message ID:</td>
                      <td>{rowInfo.message_id} </td>
                    </tr>
                    <tr>
                      <td>Sender Name</td>
                      <td>{rowInfo.sender} </td>
                    </tr>
                    <tr>
                      <td>Message</td>
                      <td>{rowInfo.message}</td>
                    </tr>
                    <tr>
                      <td>Recipient</td>
                      <td>
                        {" "}
                        <img
                          src={GH_FLAG}
                          alt=""
                          width="16"
                          style={{ margin: "0px 8px" }}
                        />{" "}
                        {rowInfo.recipient}
                      </td>
                    </tr>
                    <tr>
                      <td>Cost</td>
                      <td>GHS {rowInfo.message_cost} </td>
                    </tr>
                    <tr>
                      <td>Delivery Status</td>
                      <td>{rowInfo.status} </td>
                    </tr>
                    <tr>
                      <td>Send Time</td>
                      <td> {rowInfo.readable_date} </td>
                    </tr>
                  </tbody>
                </table>

                <h6>Message Lifecycle</h6>
                <div class="kt-timeline-v3">
                  <div class="kt-timeline-v3__items">
                    {rowInfo &&
                    rowInfo.lifecycle &&
                    rowInfo.lifecycle.length > 0
                      ? rowInfo.lifecycle.map((item, i) => {
                          let status_class = `kt-timeline-v3__item kt-timeline-v3__item--${
                            status_colors[item.status]
                          }`;
                          let stripped_time = item.created_at.substring(11, 16);

                          return (
                            <div class={status_class} key={i}>
                              <span class="kt-timeline-v3__item-time">
                                {stripped_time}
                              </span>
                              <div class="kt-timeline-v3__item-desc">
                                <span class="kt-timeline-v3__item-text text-dark">
                                  Message {item.status} to Recipient's Phone
                                </span>
                                <br />
                                <span class="kt-timeline-v3__item-user-name">
                                  <a
                                    href="#"
                                    class="kt-link kt-link--dark kt-timeline-v3__item-link"
                                  >
                                    {item.created_at}
                                  </a>
                                </span>
                              </div>
                            </div>
                          );
                        })
                      : null}
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </>
    );
  }
}

export default connect(null, { signOut })(SmsOverview);
