import React from "react";
import {Table} from "@devexpress/dx-react-grid-bootstrap4";
import GridUtils from "../../../Utilities/GridUtils";
import {
  NotificationManager
} from "react-notifications";
import { get } from "../../../services/Transport";
import { Modal, ModalBody, Spinner, ModalFooter } from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";
import qs from "qs";
import axios from "axios";
import { baseUrlProd } from "../../../Utilities/Utilities";




const columns = [
  { name: "id", title: "ID" },
  { name: "name", title: "Name" },
  { name: "description", title: "Description" },
  // { name: "base_code", title: "Base Code" },
  { name: "sub_code", title: "Sub Code" },
   { name: "remote_server_ip", title: "Remote Address" },
 { name: "callback_url", title: "Callback url" },
  // { name: "status", title: "Status" },
  { name: "actions", title: "Actions" }
];


const TableComponent = ({ ...restProps }) => (
  <Table.Table {...restProps} className="table-striped" />
);


class USSDApps extends React.Component {
  state = {
    allApps: [],
    selectedItem:"",
    rowInfo: {},
    editModal: false,
    name:'',
    description:'',
    remote_server_ip:'',
    callback_url:'',
    errorMessage:'',
    loading:false,
    appId:''

  };

  handleSelect = (event,restProps) => {
    const {history} = this.props
    this.setState({ selectedItem :event.target.value},()=>{
     if(this.state.selectedItem === "ViewSessions") {
      
       history.push(
        {
          pathname: `/v1/ussd/${restProps.row.uuid}/usersessions`,
       
          state: { clientName: restProps.row.name}
             }
       )
     }
    else if(this.state.selectedItem === "EditDetails") {
     this.setState({editModal:true,
      appId:restProps.row.uuid,
      name:restProps.row.name,
      description:restProps.row.description,
      remote_server_ip:restProps.row.remote_server_ip,
      callback_url:restProps.row.callback_url
      })
    }
    // else if(this.state.selectedItem == "ViewTickets") {
      
    //   history.push(
    //    {
    //      pathname: `/v1/ussd/${restProps.row.uuid}/usertickets`,
      
    //      state: { clientName: restProps.row.name}
    //         }
    //   )
    // }

    });
  };



  componentDidMount() {
    
    this.getUSSDApps()
  }

  getUSSDApps =()=>{
    let list = []
    this.setState({ loading: true })
    get(`/ussd/apps`)
    .then(res => {
     // console.log("all ussd",res)
      this.setState({ loading: false });
      if(res.data.code === 2000){
        const retrivedApps = res.data.data;
         if (retrivedApps && retrivedApps.length > 0) {
             
             retrivedApps.forEach((item,i)=>{
             list.push({
               id:i+1,
               name:item.name,
               description:item.description,
               base_code:item.base_code,
               sub_code:item.sub_code,
               status:item.status,
               starts_at:item.starts_at,
               ends_at:item.ends_at,
               uuid:item.uuid,
               remote_server_ip:item.remote_server_ip,
               callback_url:item.callback_url
               
 
 
             })
           })
           this.setState({ allApps: list });
           NotificationManager.success(res.data.message, "Success");
         } else {
           this.setState({ allApps: [] });
         }
      }
      
    })
    .catch(err => {
      // if (err.response) {
      //   if (err.response.status === 403) {
      //     this.props.signOut();
      //   }
      
      this.setState({ loading: false });
    }
    );
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
  if(restProps.column.name === "description"){
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
  if(restProps.column.name === "base_code"){
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
  if(restProps.column.name === "sub_code"){
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
  if(restProps.column.name === "starts_at"){
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
  if(restProps.column.name === "remote_server_ip"){
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
  if(restProps.column.name === "callback_url"){
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

  if(restProps.column.name === "ends_at"){
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
          
            <option value="ViewSessions">
              View Sessions
            </option>
            <option value="EditDetails">
              Edit App
            </option>
            {/* <option value="ViewPayments">
              View Payments
            </option>
            <option value="ViewTickets">
              View Tickets
            </option> */}
            {/* <option value="ViewSubscriber">
              View Subscribers
            </option> */}
          </select>
        </Table.Cell>
      );
  return <Table.Cell {...restProps} />;
 }

 handleChange = event => {
  const { name, value } = event.target;

  this.setState({[name]: value});

};

openEditModal = row => {
  this.setState({ editModal: true, rowInfo: row });
};

clearState = () => {
  this.setState({
    rowInfo: {},
    editModal: false,
    name:'',
    description:'',
    remote_server_ip:'',
    callback_url:'',
    errorMessage:''
  });
};


updateAppDetails = (e) => {
  const { name,description,callback_url,remote_server_ip, rowInfo,appId } = this.state;

  e.preventDefault()
  if (name.length > 0 && 
     description.length &&
     callback_url.length > 0 && 
     remote_server_ip.length > 0) {
    const payload = {
      name,
      description,
      callback_url,
      remote_server_ip,
        };
    axios.defaults.headers = {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    };
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(payload),
      url: `${baseUrlProd}/ussd/apps/${appId}/update`
    };

    axios(options)
      .then(res => {
        NotificationManager.success(res.data.message);
       this.getUSSDApps()
       this.setState({editModal:false})
      })
      .catch(err => {
       // console.log("after err",err)
        NotificationManager.error(err.response.data.message);
      });
  }
};

  render() {
  
    const { allApps,rowInfo } = this.state;
    return (
      <>
      <div className="alert alert-light alert-elevate" role="alert">
            <div className="alert-icon">
              <i className="flaticon-warning kt-font-brand"></i>
            </div>
            <div className="alert-text">
              Total in Account
            </div>
          </div>
        <div className="row">
          
          <div className="col-12">
            <div class="kt-portlet kt-portlet--mobile">
              <div class="kt-portlet__head">
                <div class="kt-portlet__head-label">
                  <h3 class="kt-portlet__head-title">
                    USSD <small>You are viewing all your registered USSD Applications</small>
                  </h3>
                </div>
              </div>
              <div class="kt-portlet__body">
                <GridUtils
                  columns={columns}
                  rows={allApps}
                  cellComponent={this.TableCell}
                  rowComponent={this.TableRow}
                  tableComponent={TableComponent}
                />
              </div>
            </div>
          </div>
          <Modal
          size="lg"
          show={this.state.editModal}
          onHide={this.clearState}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <ModalHeader closeButton>
            <span className="text-dark fw-400">Edit USSD App Details </span>
          </ModalHeader>
          <ModalBody>
            Are you sure you want to edit details for{" "}
            <span style={{ fontStyle: "bold", color: "blue" }}>
              {this.state.rowInfo.name}
            </span>
            ?
            {this.state.loading ? <Spinner/> :
            <form>
              <div className="form-group">
                <label htmlFor="groupname">Name</label>
                <input
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                  class="form-control col-6"
                 
                />
              </div>
              <div className="form-group">
                <label htmlFor="groupname">Description</label>
                <input
                  type="text"
                  name="description"
                  value={this.state.description}
                  onChange={this.handleChange}
                  class="form-control col-6"
                 
                />
              </div>
              <div className="form-group">
                <label htmlFor="groupname">Remote Url</label>
                <input
                  type="text"
                  name="remote_server_ip"
                  value={this.state.remote_server_ip}
                  onChange={this.handleChange}
                  class="form-control col-6"
                 
                />
              </div>
              <div className="form-group">
                <label htmlFor="groupname">Callback Url</label>
                <input
                  type="text"
                  name="callback_url"
                  value={this.state.callback_url}
                  onChange={this.handleChange}
                  class="form-control col-6"
                 
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
            }
          </ModalBody>
          <ModalFooter>
            <button
              onClick={(e) => this.updateAppDetails(e)}
              className="btn btn-primary"
            >
              Submit
            </button>
            <button onClick={this.clearState} className="btn btn-secondary">
              Cancel
            </button>
          </ModalFooter>
        </Modal>
        </div>
      </>
    );
  }
}

export default USSDApps;
