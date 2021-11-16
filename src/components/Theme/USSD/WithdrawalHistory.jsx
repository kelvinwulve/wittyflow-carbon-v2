import React from "react";
import {Table} from "@devexpress/dx-react-grid-bootstrap4";
import GridUtils from "../../../Utilities/GridUtils";
import {  get } from "../../../services/Transport";




const columns = [
  { name: "id", title: "ID" },
  { name: "name", title: "Name" },
  { name: "email", title: "Email" },
  { name: "phone", title: "Phone" },
  { name: "bill_type", title: "Bill Type" },
  { name: "status", title: "Status" },
  { name: "created_at", title: "Created By" },
  { name: "actions", title: "Actions" }
];

const rows=[
  {
             id:1,
              name:"Kwasi",
              email:"john@email.com",
              bill_type:"pre",
              status:"0",
              role:"2",
              sms_rate:"0.035",
              balance:"13",
              created_at:"12-10-2020",
              total_messages:"800",
              verified_email: "Yes",
              last_login_at:"12-10-2020",
              uuid:"23432-2343232-23432432",
              phone:"0244000000"
  },
  {
    id:2,
     name:"Kwasi",
     email:"john@email.com",
     bill_type:"pre",
     status:"0",
     role:"2",
     sms_rate:"0.035",
     balance:"13",
     created_at:"12-10-2020",
     total_messages:"800",
     verified_email: "Yes",
     last_login_at:"12-10-2020",
     uuid:"23432-2343232-23432432",
     phone:"0244000000"
}
]


const getStyleByValue = value => {
  

  if (value === "pre") return { color: "red" };
  if (value === "Declined") return { color: "red" };
  if (value === "Approved") return { color: "blue" };
  return undefined;
};


const HighlightedCell = ({ value, style, ...restProps }) => {
 
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
  


const TableComponent = ({ ...restProps }) => (
  <Table.Table {...restProps} className="table-striped" />
);


class WithdrawalHistory extends React.Component {
  state = {
    allUsers: [],
    selectedItem:""
  };

  handleSelect = (event,restProps) => {
    const {history} = this.props
   
    this.setState({ selectedItem :event.target.value},()=>{
     if(this.state.selectedItem == "ViewSessions") {
      
       history.push(
        {
          pathname: `/v1/secure/users/${restProps.row.uuid}/messages`,
       
          state: { clientName: restProps.row.name}
             }
       )
     }
    else if(this.state.selectedItem == "ViewPayments") {
      
      history.push(
       {
         pathname: `/v1/secure/users/${restProps.row.uuid}/recharges`,
      
         state: { clientName: restProps.row.name}
            }
      )
    }

    });
  };



  componentDidMount() {
    let list = []
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
              phone:item.phone,
              bill_type:item.bill_type,
              status:item.status,
              created_at:item.created_at,
              uuid:item.uuid,
              


            })
          })
          this.setState({ allUsers: list });
        } else {
          this.setState({ allUsers: [] });
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
  if(restProps.column.name == "email"){
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
  if(restProps.column.name == "status"){
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
  if(restProps.column.name == "created_at"){
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
  if(restProps.column.name == "name"){
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

  if(restProps.column.name == "phone"){
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
           
            
            <option value="ViewPayments">
              View Payments
            </option>
          </select>
        </Table.Cell>
      );
  return <Table.Cell {...restProps} />;
 }


  render() {
    const userColumns = [{ name: "number", title: "Number" }];
    const { allUsers } = this.state;
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
                    WITHDRAWALS <small>See list of all your withdrawal requests and status here.</small>
                  </h3>
                </div>
              </div>
              <div class="kt-portlet__body">
                <GridUtils
                  columns={columns}
                  rows={rows}
                  cellComponent={this.TableCell}
                  rowComponent={this.TableRow}
                  tableComponent={TableComponent}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default WithdrawalHistory;
