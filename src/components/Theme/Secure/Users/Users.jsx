import React from "react";
import {
  Table,

} from "@devexpress/dx-react-grid-bootstrap4";
import GridUtils from "../../../../Utilities/GridUtils";
import { post, get } from "../../../../services/Transport";
import { Modal, ModalBody,  ModalFooter } from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";
import {NotificationManager} from "react-notifications";


const columns = [
  { name: "id", title: "ID" },
  { name: "name", title: "Name" },
  { name: "email", title: "Email" },
  { name: "balance", title: "Balance" },
  { name: "phone", title: "Phone" },
  { name: "bill_type", title: "Bill Type" },
  { name: "status", title: "Status" },
  { name: "role", title: "Role" },
  { name: "sms_rate", title: "SMS Rate" },
  { name: "verified_email", title: "Verified Email" },
  { name: "created_at", title: "Created By" },
  { name: "last_login_at", title: "Last Login" },
  { name: "total_messages", title: "Total Msgs" },
  { name: "actions", title: "Actions" }
];


const TableComponent = ({ ...restProps }) => (
  <Table.Table {...restProps} className="table-striped" />
);


class Users extends React.Component {
  state = {
    allUsers: [],
    selectedItem:"",
    name:'',
    email:'',
    oldSmsRate:'',
    newSmsRate:'',
    errorMessage:'',
    editModal:false,
    loading:false,
    uuid:''

  };

  handleSelect = (event,restProps) => {
    const {history} = this.props
    this.setState({ selectedItem :event.target.value},()=>{
     if(this.state.selectedItem === "SMSReport") {
      
       history.push(
        {
          pathname: `/v1/secure/users/${restProps.row.uuid}/messages`,
       
          state: { clientName: restProps.row.name}
             }
       )
     }
    else if(this.state.selectedItem === "PaymentHistory") {
      
      history.push(
       {
         pathname: `/v1/secure/users/${restProps.row.uuid}/recharges`,
      
         state: { clientName: restProps.row.name}
            }
      )
    }
    else if(this.state.selectedItem === 'EditSMSRate'){
      this.setState({
        editModal:true,
        name:restProps.row.name,
        email:restProps.row.email,
        oldSmsRate:restProps.row.sms_rate,
        uuid:restProps.row.uuid
    })
    }

    });
  };

   getUsers=()=>{
    let list = []
    this.setState({ loading: true })
    get(`/secure/users`)
      .then(res => {
        this.setState({ loading: false });
        const retrivedUsers = res.data.data;
       
        if (retrivedUsers && retrivedUsers.length > 0) {
          retrivedUsers.forEach((item,i)=>{
            list.push({
              id:i+1,
              name:item.name,
              email:item.email,
              bill_type:item.bill_type,
              status:item.status,
              role:item.role,
              sms_rate:item.sms_rate,
              balance:item.balance,
              created_at:item.created_at,
              total_messages:item.total_messages,
              verified_email:item.verified_email == "1" ? "Yes" : "No",
              last_login_at:item.last_login_at,
              uuid:item.uuid,
              phone:item.phone


            })
          })
          this.setState({ allUsers: list });
        } else {
          this.setState({ allUsers: [] });
        }
      })
      .catch(err => {
        // if (err.response) {
         
        
        this.setState({ loading: false });
      }
      );
   }

  componentDidMount() {
    this.getUsers()
  }

  TableRow = ({ classes, row, ...restProps }) => {
    return (
      <Table.Row
        {...restProps}
        // eslint-disable-next-line no-alert
        onClick={() => {}}
        // className={classes.tableStriped}
      />
    );
  };

 TableCell = ({ value, classes, style, ...restProps }) => {
  // console.log("row restProps",restProps)
  const {selectedItem}  = this.state
  if(restProps.column.name === "email"){
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
  if(restProps.column.name == "bill_type"){
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
  if(restProps.column.name === "balance"){
    return <Table.Cell {...restProps}>
    <span
        style={{
          color: "grey"
        }}
      >
        {value}
      </span>
      </Table.Cell>

  }
  if(restProps.column.name === "status"){
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
  if(restProps.column.name === "created_at"){
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
  if(restProps.column.name === "created_at"){
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
  if(restProps.column.name === "sms_rate"){
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
  if(restProps.column.name === "verified_email"){
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
  if(restProps.column.name === "name"){
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
  if(restProps.column.name === "id"){
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
  if(restProps.column.name === "total_messages"){
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
  if(restProps.column.name === "last_login_at"){
    return <Table.Cell {...restProps}>
    <span
        style={{
          color: "indigo"
        }}
      >
        {value}
      </span>
      </Table.Cell>

  }
  if(restProps.column.name === "phone"){
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
            
           <option value="SMSReport">
              SMS Overview
            </option>
           
            
            <option value="PaymentHistory">
              Payment History
            </option>
            <option value="EditSMSRate">
              Edit SMS Rate
            </option>
          </select>
        </Table.Cell>
      );
  return <Table.Cell {...restProps} />;
 }


clearState = ()=>{
  this.setState({
    editModal:false,
    //loading:true,
    name:'',
    email:'',
    oldSmsRate:'',
    newSmsRate:'',
    errorMessage:''})
}

handleChange = event => {
  const { name, value } = event.target;

  this.setState({[name]: value});

};

  handleSMSRateChange=(e)=>{
    e.preventDefault()
    const payload = {
     rate:this.state.newSmsRate
    };
    post(`secure/users/${this.state.uuid}/smsRate/change`,payload)
        .then(res => {
          //console.log("sms rate response",res)
          let code = res.data.code
          if (code == 2010 || code == 2000) {
            NotificationManager.success(res.data.message, "Success");
          this.setState({editModal:false})
          this.getUsers()
          }
        })
        .catch(err => {
          NotificationManager.error(err.response?.data?.message);
        });
  }


  render() {
    const { allUsers } = this.state;
    return (
      <>
        <div className="row">
          <div className="col-12">
            <div class="kt-portlet kt-portlet--mobile">
              <div class="kt-portlet__head">
                <div class="kt-portlet__head-label">
                  <h3 class="kt-portlet__head-title">
                    Users <small>You are viewing all users</small>
                  </h3>
                </div>
              </div>
              <div class="kt-portlet__body">
              {this.state.loading ? (
                <div className="container d-flex flex-column justify-content-center align-items-center">
                  <div>Please wait...</div>
                  <div class="spinner-border text-primary" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                </div>
              ) : <GridUtils
                  columns={columns}
                  rows={allUsers}
                  cellComponent={this.TableCell}
                  rowComponent={this.TableRow}
                  tableComponent={TableComponent}
                />
                }
              </div>
            </div>
          </div>
        </div>
        <Modal
          size="sm"
          show={this.state.editModal}
          onHide={this.clearState}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <ModalHeader closeButton>
            <span className="text-dark fw-400">Edit SMS Rate for {this.state.name} </span>
          </ModalHeader>
          <ModalBody>
            {/* Are you sure you want to edit details for{" "}
            <span style={{ fontStyle: "bold", color: "blue" }}>
              {this.state.rowInfo.name}
            </span>
            ? */}
           
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                  class="form-control"
                  disabled
                 
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  class="form-control"
                  disabled
                 
                />
              </div>
              <div className="form-group">
                <label htmlFor="oldSmsRate">Old SMS Rate</label>
                <input
                  type="text"
                  name="oldSmsRate"
                  value={this.state.oldSmsRate}
                  onChange={this.handleChange}
                  class="form-control"
                  disabled
                 
                />
              </div>
              <div className="form-group">
                <label htmlFor="newSmsRate">New SMS Rate</label>
                <input
                  type="text"
                  name="newSmsRate"
                  value={this.state.newSmsRate}
                  onChange={this.handleChange}
                  class="form-control"
                 
                />
              </div>
              <div>
                {this.state.errorMessage && this.state.errorMessage.length > 0 ? (
                  <h5>
                    <span style={{ fontStyle: "bold", color: "red" }}>
                      {this.state.errorMessage}
                    </span>
                  </h5>
                ) : null}
              </div>
            </form>
            
          </ModalBody>
          <ModalFooter>
            <button
              onClick={(e) => this.handleSMSRateChange(e)}
              className="btn btn-primary"
            >
              Submit
            </button>
            <button onClick={this.clearState} className="btn btn-secondary">
              Cancel
            </button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default Users;
