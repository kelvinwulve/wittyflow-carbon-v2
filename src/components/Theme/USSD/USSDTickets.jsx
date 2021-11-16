import React from "react";
import {Table} from "@devexpress/dx-react-grid-bootstrap4";
import GridUtils from "../../../Utilities/GridUtils";
import "../Messaging/static/datatable-custom.css";
import { get,post } from "../../../services/Transport";
import DatePicker from "react-datepicker";
import {NotificationContainer,NotificationManager} from "react-notifications";
import { Modal, ModalBody } from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";
import GH_FLAG from "../../../static/img/gh.svg";
import "../Messaging/static/sms-overview.css";
import { Helmet } from "react-helmet";
import {Button} from 'react-bootstrap'



const columns = [
  { name: "id", title: "ID" },
  // { name: "name", title: "Name" },
  { name: "msisdn", title: "Phone No" },
  // { name: "email ", title: "Email" },
  { name: "reference", title: "Reference Code" },
  { name: "code", title: "Ticket Code" },
  { name: "event_time", title: "Event Time" },
  { name: "used", title: "USED" },
  { name: "admission", title: "Admission" },
  { name: "actions", title: "Actions" }
];

const rows =[
  {
    id: 1,              
    name: "King",
    msisdn: "024473838",
    email: "kk@gmail.com",
    code: "321213",
    reference: "332121",
    admission: "1",
    used: "Yes"
  },
  {
    id: 2,              
    name: "King Dosty",
    msisdn: "0548036178",
    email: "222@gmail.com",
    code: "123456",
    reference: "3323244",
    admission: "5",
    used: "No"
  }
]

const TableComponent = ({ ...restProps }) => (
  <Table.Table {...restProps} className="table-striped" />
);

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
  let button 
  if(value == "No"){
  button =<span className="btn btn-bold btn-sm btn-font-sm btn-label-brand">
            {value}
          </span>
  }
  else if(value == "Yes"){
    button =<span className="btn btn-bold btn-sm btn-font-sm btn-label-danger">
              {value}
            </span>
  }
  return (
    <Table.Cell {...restProps}>
      
    {button}
  </Table.Cell>
   
  );
};







class USSDTickets extends React.Component {
  state = {
    showModal: false,
    pageNumber: 1,
    value: 0,
    showModal: false,
    appList: [],
    selectedApp: {},
    allUserTickets: [],
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

  static getDerivedStateFromProps(props, state){
    // console.log("ticket props",props)
    // console.log("ticket state",state)
  }

  activateButton = ({props }) => {
    let rowId = props.row.uuid
  
    let button 
    if(props.row.used == "No"){
      button =<Button variant="primary" 
              onClick={(e)=>this.activateTicket(e, rowId)} 
              >
              
                Activate
              </Button>
      }
    return (
      <Table.Cell {...props}>
        
        {button}
        
    </Table.Cell>
     
    );
  };


   TableCell = props => {
   // console.log("table cell props",props)
    const { column,row,value,style, } = props;
   
    if (column.name === "status") {
      return <HighlightedCell {...props} />;
    }
    if (column.name === "used") {
      return <RecipientColor {...props} />;
    }
    // if (column.name === "actions") {
    //   return this.activateButton({props})
    // }
  
    return <Table.Cell {...props} />;
  };


  TableRow = ({ classes, row, ...restProps }) => {
    return (
      <Table.Row
        {...restProps}
        // eslint-disable-next-line no-alert
        onClick={() => console.log("row clicked")}
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
   
    document.title = "USSD Tickets - Wittyflow";
   this.getTickets()
  }

  getTickets = () => {
    const { location } = this.props;
    const userId = this.props.match.params.uuid;
    const clientName = location.state.clientName;
    
    const { startDate, endDate } = this.state;
    var startdate = this.setDate(startDate);
   var list =[]
    var enddate = this.setDate(endDate);
    this.setState({userId:userId,clientName:clientName });
    get(`ussd/apps/${userId}/tickets?start_date=${startdate}&end_date=${enddate}`)
      .then(res => {
   
        this.setState({ loading: false });
        if(res.data.code == 2000){
          const retrivedTickets = res.data.data;
          if (retrivedTickets && retrivedTickets.length > 0) {
            retrivedTickets.forEach((element,index) => {
              list.push({
                id: index+1,              
                name: element.name,
                msisdn: element.msisdn,
                email: element.email,
                code: element.code,
                reference: element.reference,
                event_time: element.event_time,
                admission: element.admission,
                used: element.used == "0" ? "No" : "Yes",
                uuid:element.uuid
                
              });
     
            });

            NotificationManager.success(res.data.message, "Success");
            this.setState({ allUserTickets: list });
          } else {
            this.setState({ allUserTickets: [] });
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
  };

  componentWillMount() {
    var loadjs = require("loadjs");

    //this styles the select boxes
    loadjs("external/js/custom.js");
  }

  filterTable = value => {
    //console.log("grid value", value);
    if (value == "Delivered") {
      var deliveredMsg = this.state.allUserTickets.filter(
        item => item.status == "Delivered"
      );

      this.setState({
        messageHeading: "Delivered Messages",
        deliveredMessages: deliveredMsg
      });
    } else if (value == "Sent") {
      var sent = this.state.allUserTickets.filter(item => item.status == "Sent");

      this.setState({
        messageHeading: "Sent Messages",
        sentMessages: sent
      });
    } else if (value == "Failed") {
      var failed = this.state.allUserTickets.filter(
        item => item.status == "Failed"
      );

      this.setState({
        messageHeading: "Failed Messages",
        failedMessages: failed
      });
    } else if (value == "Rejected") {
      var rejected = this.state.allUserTickets.filter(
        item => item.status == "Rejected"
      );

      this.setState({
        messageHeading: "Rejected Messages",
        rejectedMessages: rejected
      });
    } else if (value == "Buffered") {
      var buffered = this.state.allUserTickets.filter(
        item => item.status == "Buffered"
      );

      this.setState({
        messageHeading: "Buffered Messages",
        bufferedMessages: buffered
      });
    }
  };


  handleSelect = selectedItem => {
    // console.log("selectedItem",selectedItem.value);
    this.setState({ selectedItem, gridNumber: selectedItem.value }, () =>
      this.filterTable(this.state.gridNumber)
    );
  };


  activateTicket = (e,ticketId) => {
    // console.log("ticketId",ticketId)
    // console.log("button clicked was", e.target)
    post(`ussd/apps/tickets/${ticketId}/use`)
        .then(res => {
          var code = res.data.code;
       //   console.log("ticket use response",res)

          // if (code == 2010 || code == 2000) {
          //   NotificationManager.success(res.data.message, "Success");
          //   get("/groups").then(res => {
          //     const groups = res.data.data;
          //     if (res.data.code == 2000) {
          //       this.setState({
          //         groupList: groups
          //       });
          //     }
          //   });
          // }
        })
        .catch(err => {
          NotificationManager.error(err.response.data.message);
        });
  }
   
  

  render() {
    const {
      allUserTickets,
      clientName,
      rowInfo,
    } = this.state;
   
  

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
          <title>User Tickets - Wittyflow</title>
          {/* <meta http-equiv="refresh" content="30"></meta> */}
        </Helmet>

        <div className="kt-portlet kt-portlet--mobile">
          <div className="kt-portlet__head kt-portlet__head--lg">
            <div className="kt-portlet__head-label">
              <span className="kt-portlet__head-icon">
                <i className="kt-font-brand flaticon2-line-chart"></i>
              </span>
             <h3 className="kt-portlet__head-title">Purchased Tickets - {clientName}</h3>
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
                            onClick={this.getTickets}
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
                rows={allUserTickets}
                cellComponent={this.TableCell}
                rowComponent={this.TableRow}
                tableComponent={TableComponent}
              />
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
                            <div class={status_class}>
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

export default USSDTickets;
