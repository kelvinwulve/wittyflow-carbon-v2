import React, { Component } from "react";
import { get } from "../../../services/Transport";
import { connect } from "react-redux";
import { signOut, updateUser } from "../carbonActions";
import {
  NotificationManager
} from "react-notifications";
import "../Messaging/static/datatable-custom.css";
import DatePicker from "react-datepicker";
import {
  Table,

} from "@devexpress/dx-react-grid-bootstrap4";
import GridUtils from "../../../Utilities/GridUtils";

const columns = [
  { name: "id", title: "ID" },
  { name: "msisdn", title: "Phone No" },
  { name: "amount", title: "Amount" },
  { name: "wittyflow_fees", title: "Service Charge" },
  { name: "available_amount", title: "Available" },
  { name: "payment_channel", title: "Pmt Channel" },
  { name: "quantity", title: "Qty" },
  
  { name: "status", title: "Status" },
 
];

const rows=[
  {
              id:1,
              msisdn:"Asembi",
              amount:"10",
              fees:"2",
              created_at:"12-10-2020",
              status:"Active",
              uuid:"23432-2343232-23432432",
             
  },
  {
    id:2,
    msisdn:"Asembi",
    amount:"20",
    fees:"2",
    created_at:"12-10-2020",
    status:"Active",
    uuid:"23432-2343232-23432432",
}
]

const TableComponent = ({ ...restProps }) => (
  <Table.Table {...restProps} className="table-striped" />
);

const TableRow = ({ classes, row, ...restProps }) => {
  return (
    <Table.Row
      {...restProps}
      // eslint-disable-next-line no-alert
      onClick={() => {}}
      // className={classes.tableStriped}
    />
  );
};

class USSDPaymentHistory extends Component {
  
  state = {
    allInvoices: [],
    paidInvoices: [],
    messageHeading: "All Invoices",
    gridNumber: 1,
    startDate: new Date(),
    endDate: new Date(),
    loading: false,
    clientName:'',
    userId:''
  };

  TableCell = ({ value, classes, style, ...restProps }) => {
    // console.log("row restProps",restProps)
    const {selectedItem}  = this.state
    if(restProps.column.name == "msisdn"){
     return <Table.Cell {...restProps}>
    <span
        style={{
          color: "#0088fc"
        }}
      >
        {value}
      </span>
      </Table.Cell>
    }
    if(restProps.column.name == "amount"){
      return <Table.Cell {...restProps}>
      <span
          style={{
            color: "green"
          }}
        >
          {value}
        </span>
        </Table.Cell>
  
    }
    if(restProps.column.name == "wittyflow_fees"){
      return <Table.Cell {...restProps}>
      <span
          style={{
            color: "green"
          }}
        >
          {value}
        </span>
        </Table.Cell>
  
    }
    if(restProps.column.name == "available_amount"){
      return <Table.Cell {...restProps}>
      <span
          style={{
            color: "black"
          }}
        >
          {value}
        </span>
        </Table.Cell>
  
    }
    if(restProps.column.name == "fees"){
      return <Table.Cell {...restProps}>
      <span
          style={{
            color: "red"
          }}
        >
          {value}
        </span>
        </Table.Cell>
  
    }
    if(restProps.column.name == "payment_channel"){
      return <Table.Cell {...restProps}>
      <span
          style={{
            color: "black"
          }}
        >
          {value}
        </span>
        </Table.Cell>
  
    }
    if(restProps.column.name == "status"){
     // console.log("restprops",restProps.row.status)
      let button 
      if(restProps.row.status == "PAID"){
      button =<span className="btn btn-bold btn-sm btn-font-sm btn-label-success">
                {value}
              </span>
      }
      else if(value == "FAILED"){
        button =<span className="btn btn-bold btn-sm btn-font-sm btn-label-danger">
                  {value}
                </span>
      }
      else if(value == "PROGRESS"){
        button =<span className="btn btn-bold btn-sm btn-font-sm btn-label-brand">
                  {value}
                </span>
      }
      else {
        button =<span className="btn btn-bold btn-sm btn-font-sm btn-label-warning">
                  {value}
                </span>
      }
      return <Table.Cell {...restProps}>
                {button}
        </Table.Cell>
  
    }
    if(restProps.column.name == "id"){
      return <Table.Cell {...restProps}>
      <span
          style={{
            color: "purple"
          }}
        >
          {value}
        </span>
        </Table.Cell>
  
    }
    if(restProps.column.name == "quantity"){
      return <Table.Cell {...restProps}>
      <span
          style={{
            color: "purple"
          }}
        >
          {value}
        </span>
        </Table.Cell>
  
    }

      if (restProps.column.name === "actions")
        return (
          <Table.Cell {...restProps}>
            <select
              name="useroptions"
              className="form-control"
              value={selectedItem}
              onChange={(event)=>this.handleSelect(event,restProps) }
            >
              <option value="">
                Select option
              </option>
            
              <option value="ViewPayments">
                View Payments
              </option>
              <option value="ViewTickets">
                View Tickets
              </option>
              <option value="ViewSubscriber">
                View Subscribers
              </option>
            </select>
          </Table.Cell>
        );
    return <Table.Cell {...restProps} />;
   }

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

  getReportHistoy=()=>{
    let list = [];
    const { location } = this.props;
    const userId = this.props.match.params.uuid;
    const clientName = location.state.clientName;
    const { startDate, endDate } = this.state;
    var startdate = this.setDate(startDate);

    var enddate = this.setDate(endDate);
     this.setState({clientName,userId})
    get(`ussd/apps/${userId}/payments?start_date=${startdate}&end_date=${enddate}`)
      .then(res => {
        
        if (res.data.code == 2000) {
          const retrivedData = res.data.data;
           //console.log("pauments",retrivedData)
          if (retrivedData && retrivedData.length > 0) {
            retrivedData.forEach((element,index) => {
              list.push({
                id:index+1,
                msisdn:element.msisdn,
                invoice_id: element.invoice_id,
                amount: `GHS ${element.amount}`,
                fees: element.fees,
                payment_channel: element.payment_channel,
                date: element.date,
                status: element.status,
                readable_date: element.readable_date,
                wittyflow_fees:`GHS ${element.wittyflow_fees}`,
                available_amount:`GHS ${element.available_amount}`,
                quantity:element.quantity
              });
              return element;
            });
            NotificationManager.success(res.data.message, "Success");

            this.setState({ allInvoices: list });
          } else {
            this.setState({ allInvoices: [] });
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

  componentDidMount() {
    document.title = "USSD Payment History - Wittyflow";
    {this.getReportHistoy()}
  }

  allInvoices = () => {
    this.setState({
      messageHeading: "All Invoices",
      gridNumber: 1
    });
  };

  paidInvoices = () => {
    if (this.state.allInvoices.length > 0) {
      var paid = this.state.allInvoices.filter(item => item.status == "PAID");

      this.setState({
        messageHeading: "Topup History",
        gridNumber: 2,
        paidInvoices: paid
      });
    }
  };

  getReports = () => {
    {this.getReportHistoy()}
  };

  render() {
    return (
        <>

<div className="alert alert-light alert-elevate" role="alert">
          <div className="alert-icon">
            <i className="flaticon-warning kt-font-brand"></i>
          </div>
          <div className="alert-text">
            Here, you'll see an Overview of all your subscribers payments.
          </div>
        </div>

<div className="kt-portlet kt-portlet--mobile">
        {/* <!--begin:: Widgets/Authors Profit--> */}
        <div className="kt-portlet__head kt-portlet__head--lg">
            <div className="kt-portlet__head-label">
              <span className="kt-portlet__head-icon">
                <i className="kt-font-brand flaticon2-line-chart"></i>
              </span>
             <h3 className="kt-portlet__head-title">Payment History - {this.state.clientName}</h3>
            </div>
          </div>
	<div class="kt-portlet__body">
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
            <div className="kt-widget4">

  {this.state.allInvoices && this.state.allInvoices.length > 0 ? (

                        <GridUtils
                        columns={columns}
                        rows={this.state.allInvoices}
                        cellComponent={this.TableCell}
                        rowComponent={TableRow}
                        tableComponent={TableComponent}
                        />
    
                   
                      ) :  (
                          <div style={{ textAlign: "center" }} className="mt-5">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              // width="44px"
                              // height="44px"
                              viewBox="0 0 24 24"
                              version="1.1"
                              className="kt-svg-icon mb-4"
                              style={{ height: "36px", width: "36px" }}
                            >
                              <g
                                stroke="none"
                                strokeWidth="1"
                                fill="none"
                                fill-rule="evenodd"
                              >
                                <rect x="0" y="0" width="24" height="24" />
                                <path
                                  d="M4,7 L20,7 L20,19.5 C20,20.3284271 19.3284271,21 18.5,21 L5.5,21 C4.67157288,21 4,20.3284271 4,19.5 L4,7 Z M10,10 C9.44771525,10 9,10.4477153 9,11 C9,11.5522847 9.44771525,12 10,12 L14,12 C14.5522847,12 15,11.5522847 15,11 C15,10.4477153 14.5522847,10 14,10 L10,10 Z"
                                  fill="#000000"
                                />
                                <rect
                                  fill="#000000"
                                  opacity="0.3"
                                  x="2"
                                  y="3"
                                  width="20"
                                  height="4"
                                  rx="1"
                                />
                              </g>
                            </svg>
      
                            <h3>No Data</h3>
                            
                          </div>
                          )
      
                        }

</div>
	</div>

{/* <!--end:: Widgets/Authors Profit-->    */}

 </div>


      </>
    );
  }
}

export default connect(null, { signOut, updateUser })(USSDPaymentHistory);
