import React, { useState, useEffect,useRef, useCallback } from 'react';
import {
  Grid,
  Table,
  TableHeaderRow,
  Toolbar,
  SearchPanel,
  PagingPanel,
  ExportPanel,
} from '@devexpress/dx-react-grid-bootstrap4';
import {
  Template,
  TemplatePlaceholder,
  TemplateConnector,
} from "@devexpress/dx-react-core";
import {
  PagingState,
  CustomPaging,
  SearchState,
  IntegratedFiltering,
} from '@devexpress/dx-react-grid';
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';
import "../../Messaging/static/datatable-custom.css";
import { get } from "../../../../services/Transport";
import { connect } from "react-redux";
import { signOut } from "../../carbonActions";
import DatePicker from "react-datepicker";
import Select from "react-select";
import {NotificationContainer,NotificationManager} from "react-notifications";
import { Modal, ModalBody,ModalFooter} from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";
import "../../Messaging/static/sms-overview.css";
import { Helmet } from "react-helmet";
import { GridExporter } from "@devexpress/dx-react-grid-export";
import saveAs from "file-saver";
import "@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css";
import axios from "axios";
import qs from "qs";
import {baseUrlProd} from '../../../../Utilities/Utilities'



const HighlightedCell = ({ value, style, ...restProps }) => {
  let color;
  if (value == "Declined") {
    color = "btn-label-danger";
  } else if (value == "Approved") {
    color = "btn-label-success";
  } else if (value == "Pending") {
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

  return <Table.Cell {...props} />;
};

const TableComponent = ({ ...restProps }) => (
  <Table.Table {...restProps} className="table-striped" />
);

const statusTypes = [
  { value: "0", label: "All Sendernames" },
  { value: "Approved", label: "Approved" },
  { value: "Declined", label: "Declined" },
  { value: "Pending", label: "Pending" }

];
const approvalTypes = [
  { value: "1", label: "Approve" },
  { value: "2", label: "Decline" },

];
const approvalReasons = [
  { value: "Meets approved requirements", label: "Meets approved requirements" },
  { value: "Conflicts with an existing brand name", label: "Conflicts with an existing brand name"},
  { value: "Does not meet the specified requirements", label: "Does not meet the specified requirements"},

];


const onSave = (workbook) => {
  //  use as simple as
  let todayDate = new Date().toJSON().slice(0, 10).replace(/-/g, "/");

  workbook.xlsx.writeBuffer().then((buffer) => {
    saveAs(
      new Blob([buffer], { type: "application/octet-stream" }),
      `Wittyflow-Export-${todayDate}.xlsx`
    );
  });
};

const GridUtil=(props)=>{
  const { rows, columns,totalCount,currentPage,onCurrentPageChange} = props;
  const [pageSize] = useState(200);
 //const [currentPage, setCurrentPage] = useState(0);
  const exporterRef = useRef(null);
  const startExport = useCallback(() => {
  exporterRef.current.exportGrid();
  }, [exporterRef]);

 const [selection, setSelection] = React.useState([]);

return(
  <div className="">
  <Grid 
  rows={rows || []} 
  columns={columns || []}>
  <PagingState
      currentPage={currentPage}
      onCurrentPageChange={onCurrentPageChange}
      pageSize={pageSize}
    />
    <CustomPaging
      totalCount={totalCount}
    />
    <SearchState defaultValue="" />
    <IntegratedFiltering />
    <PagingPanel  />
    <Table
      cellComponent={props.cellComponent} //getting props here didn't work
      tableComponent={props.tableComponent}
      rowComponent={props.rowComponent}
    />
    <TableHeaderRow />
    <Toolbar />
    <ExportPanel startExport={startExport} />
    <SearchPanel />
    <Template name="toolbarContent">
      <TemplateConnector>
        {({ totalCount }) => (
          <React.Fragment>
            <div>Total Count: {totalCount} Records</div>
            <TemplatePlaceholder />
          </React.Fragment>
        )}
      </TemplateConnector>
    </Template>
  </Grid>
  <GridExporter
    ref={exporterRef}
    rows={rows}
    columns={columns}
    selection={selection}
    onSave={onSave}
  />
</div>
)
}



export default () => {
  const [columns] = useState([
  { name: "sendername", title: "Sendername" },
  { name: "description", title: "Description" },
  { name: "status", title: "Status" },
  { name: "name", title: "Name" },
  { name: "email", title: "Email" },
  { name: "created_at", title: "Date Created" }
  ]);
  const [rows] = useState([
    {
        uuid: "ec0b4c09-5584-43e6-9017-6b3c4bc1a212",
        sendername: "WestChart",
        description: "New Sendername for test",
        status: "2",
        status_reason: null,
        created_at: "2020-06-24T18:54:07.090994Z",
        updated_at: "2020-06-24T18:54:07.090994Z",
        user: {
            uuid: "5414da5b-d9d2-4a3a-99a0-b46f441cce92",
            name: "Kelvin Wulve",
            email: "88zxzyzz@gmail.com"
        }
    },
    {
        uuid: "ec0b4c09-5584-43e6-9017-6b3c4bc1a212",
        sendername: "WestChart",
        description: "New Sendername for test",
        status: "0",
        status_reason: null,
        created_at: "2020-06-24T18:54:07.090994Z",
        updated_at: "2020-06-24T18:54:07.090994Z",
        user: {
            uuid: "5414da5b-d9d2-4a3a-99a0-b46f441cce92",
            name: "Kelvin Wulve",
            email: "88zxzyzz@gmail.com"
        }
    },
    {
        uuid: "ec0b4c09-5584-43e6-9017-6b3c4bc1a212",
        sendername: "WestChart",
        description: "New Sendername for test",
        status: "1",
        status_reason: null,
        created_at: "2020-06-24T18:54:07.090994Z",
        updated_at: "2020-06-24T18:54:07.090994Z",
        user: {
            uuid: "5414da5b-d9d2-4a3a-99a0-b46f441cce92",
            name: "Kelvin Wulve",
            email: "88zxzyzz@gmail.com"
        }
    }
  
])
  const [pageSize] = useState(200);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [lastQuery, setLastQuery] = useState();
  const [senderNames, setSenderNames] = useState([]);
  const [approvedUsers, setApprovedUsers] = useState([]);
  const [pendingUsers, setPendingUsers] = useState([]);
  const [declinedUsers, setDeclinedUsers] = useState([]);
  const [rowInfo, setRowInfo] = useState({});
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [gridNumber, setGridNumber] = useState("0");
  const [selectedItem, setSelectedItem] = useState({value: "0",label: "All Sendernames"});
  const [selection, setSelection] = React.useState([]);
  const [count, setCount] = React.useState(0);
  const [approveUser, setApproveUser] = useState({value:"0",label: "Please Select"});
  const [approveStatus, setApproveStatus] = useState("0");
  const [submitStatus, setSubmitStatus] = useState(false);
  const [statusReason, setStatusReason] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [approvalReason, setApprovalReason] = useState({value:"0",label: "Please Select"});
  const [approvalReasonStatus, setApprovalReasonStatus] = useState('0');



   const exporterRef = useRef(null);
   const startExport = useCallback(() => {
   exporterRef.current.exportGrid();
   }, [exporterRef]);

   const TableRow = ({ classes, row, ...restProps }) => {
      return (
        <Table.Row
          {...restProps}
          // eslint-disable-next-line no-alert
          onClick={() => showModalItem(row)}
          // className={classes.tableStriped}
        />
      );
    };
   const showModalItem = row => {

    setShowModal(true)
    setRowInfo(row)
    };
 const closeModal = () => {
  setShowModal(false)
  setSubmitStatus(false)
  setStatusReason('')
  setApproveStatus("0")
    };


 const setDate = date => {

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

  const handleStartDateChange = date => {
    setStartDate(date)
  };
  
 const handleEndDateChange = date => {
    setEndDate(date) 
  };

  const handleSelect = selectedItem => {
    setSelectedItem(selectedItem)  
    setGridNumber(selectedItem.value)
  };
  const handleApproval = approveUser => {
    setApproveStatus(approveUser)  
    setApproveUser(approveUser.value)
  };
  const handleApprovalReason = reason => {
    setApprovalReasonStatus(reason)  
    setApprovalReason(reason.value)
  };

useEffect(()=>{
      if (gridNumber == "Approved") {
    var approved = senderNames.filter(
      item => item.status == "Approved"
    );
  setCount(approved.length)
    setApprovedUsers(approved)
  } else if (gridNumber == "Declined") {
    var declined = senderNames.filter(item => item.status == "Declined");
    setCount(declined.length)
    setDeclinedUsers(declined)
  }
  else if (gridNumber == "Pending") {
    var pending = senderNames.filter(
      item => item.status == "Pending"
    );

  setPendingUsers(pending)
  setCount(pending.length)
  }



},[gridNumber])
 
 

  const loadData = () => {
      let end_date = setDate(endDate)
      let start_date = setDate(startDate)
      const getQueryString = () => (
      `${baseUrlProd}/secure/users/sendernames?start_date=${start_date}&end_date=${end_date}`
     )
      let list = [];
      let status = ''
    const queryString = getQueryString();
      setLoading(true);
      get(queryString)
      .then(res => {
        setLoading(false);
        const retrivedData = res.data.data

        if (retrivedData && retrivedData.length > 0) {
            retrivedData.forEach((element,i) => {
              if(element.status == '0'){
                status = "Pending"
              }
              if(element.status == '1'){
                status = "Approved"
              }
              if(element.status == '2'){
                status = "Declined"
              }
              list.push({
                id:i+1,
                sendername: element.sendername,
                description: element.description,
                name: element.user.name,
                email: element.user.email,
                status: status,
                created_at: element.created_at,
                uuid:element.uuid
              });
              return element;
            });

          setSenderNames(list)
          setTotalCount(retrivedData.length);    
          setLoading(false);
        }
        else if(retrivedData && retrivedData.length == 0){
          setLoading(false);
  
        }
        

      }).catch(() => setLoading(false));
     
      setLastQuery(queryString);
    
  };

  const searchData=()=>{
    loadData()
  }

const submitUserApproval=(e)=>{

  e.preventDefault();
  const payload = {
    status: approveUser,
    status_reason:approvalReason
  }
  axios.defaults.headers = {
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded"
  };
  const options = {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    //data: qs.stringify(data),
    data: qs.stringify(payload),
    url: `${baseUrlProd}/secure/users/sendernames/${rowInfo.uuid}/switch`
  };

  if(approvalReasonStatus == "0"){
    setErrorMessage("Kindly select a reason")
    setSubmitStatus(false)
   //console.log("no status reason")
  }
  else if(approveStatus == "0"){
    setErrorMessage("Kindly select a status")
    setSubmitStatus(false)
    //console.log("no approver chose")

  }
 else{
    setErrorMessage("")
    setSubmitStatus(true)


    // {{CARBON_API_BASE}}/secure/users/sendernames/df506087-c7b5-4fe0-8fc6-309fbeea4e28/switch
      axios(options)
      .then(res => {
          setSubmitStatus(false)
              if (res.data.code == 2010) {
            NotificationManager.success(res.data.message);
            loadData()
            setShowModal(false)

    
          }
      
        })
        .catch(err => {
          setSubmitStatus(false)
         // NotificationManager.error(err.response.data.message);
        });
  }

}

  useEffect(() => loadData(),[]);

  let gridToShow;
  if (gridNumber == "0") {
    gridToShow = (
      <GridUtil
        columns={columns}
        rows={senderNames}
        cellComponent={TableCell}
        rowComponent={TableRow}
        tableComponent={TableComponent}
         totalCount={totalCount}
        currentPage={currentPage}
        onCurrentPageChange={setCurrentPage}
        pageSize={pageSize}
      />
    );
  } else if (gridNumber == "Approved") {
    gridToShow = (
      <GridUtil
        columns={columns}
        rows={approvedUsers}
        cellComponent={TableCell}
        rowComponent={TableRow}
        tableComponent={TableComponent}
        totalCount={count}
        currentPage={currentPage}
        onCurrentPageChange={setCurrentPage}
        pageSize={pageSize}
      />
    );
  } else if (gridNumber == "Declined") {
    gridToShow = (
      <GridUtil
        columns={columns}
        rows={declinedUsers}
        cellComponent={TableCell}
        rowComponent={TableRow}
        tableComponent={TableComponent}
        totalCount={count}
        currentPage={currentPage}
        onCurrentPageChange={setCurrentPage}
        pageSize={pageSize}
      />
    );
  }  else if (gridNumber == "Pending") {
    gridToShow = (
      <GridUtil
        columns={columns}
        rows={pendingUsers}
        cellComponent={TableCell}
        rowComponent={TableRow}
        tableComponent={TableComponent}
        totalCount={count}
        currentPage={currentPage}
        onCurrentPageChange={setCurrentPage}
        pageSize={pageSize}
      />
    );
  } 


  return (
    <>
      <Helmet>
        <title>Users Sendernames - Wittyflow</title>
        {/* <meta http-equiv="refresh" content="30"></meta> */}
      </Helmet>

      <div className="kt-portlet kt-portlet--mobile">
        <div className="kt-portlet__head kt-portlet__head--lg">
          <div className="kt-portlet__head-label">
            <span className="kt-portlet__head-icon">
              <i className="kt-font-brand flaticon2-line-chart"></i>
            </span>
            <h3 className="kt-portlet__head-title">All Sendernames</h3>
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
                          onChange={handleSelect}
                          className="form-control bootstrap-select custom-select"
                        />
                      </div>
                    </div>
                  </div>
                  
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
                              selected={startDate}
                              onChange={handleStartDateChange}
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
                              selected={endDate}
                              onChange={handleEndDateChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-4">
                        <button
                          className="btn btn-brand btn-icon-sm btn-elevate btn-square filterByDateBtn mb-2"
                          onClick={()=>searchData()}
                        >
                          <i className="ti-search"></i> Filter Results
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
            {loading ? (
              <div className="container d-flex flex-column justify-content-center align-items-center">
                <div>Please wait...</div>
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Loading...</span>
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
          show={showModal}
          onHide={closeModal}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <ModalHeader closeButton>
            <span className="text-dark fw-400">Approve Sendername for {rowInfo.sendername}</span>
          </ModalHeader>
          <ModalBody>
            Are you sure you want to edit details for{" "}
            <span style={{ fontStyle: "bold", color: "blue" }}>
              {rowInfo.sendername}
            </span>
            ?
            <form>

            <div className="form-row">
              <div className="form-group col-md-6">
              <label htmlFor="groupname">Name</label>
                <input
                  type="text"
                  name="sendername"
                  value={rowInfo.name}
                  //onChange={handleChange}
                  className="form-control"
                  disabled={true}
                />
              </div>
              <div className="form-group col-md-6">
              <label htmlFor="description">Description</label>
                <input
                  type="text"
                  name="description"
                  value={rowInfo.description}
                  //onChange={this.handleChange}
                  className="form-control"
                  disabled={true}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
              <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="email"
                  value={rowInfo.email}
                  //onChange={this.handleChange}
                  className="form-control"
                  disabled={true}
                />
              </div>
              <div className="form-group col-md-6">
              <label htmlFor="email">Reason</label>
                       <Select
                          name="status"
                          id="filter_select"
                          options={approvalReasons}
                          value={approvalReasonStatus}
                          onChange={handleApprovalReason}
                          className="form-control bootstrap-select custom-select"
                        />
              </div>
            </div>
            <div className="form-row">
             
              <div className="form-group col-md-6">
              <label htmlFor="description">Status</label>
                        <Select
                          name="status"
                          id="filter_select"
                          options={approvalTypes}
                          value={approveStatus}
                          onChange={handleApproval}
                          className="form-control bootstrap-select custom-select"
                        />
              </div>
            </div>
             
              <div>
                {errorMessage.length > 0 ? (
                  <h5>
                    <span style={{ fontStyle: "bold", color: "red" }}>
                      {errorMessage}
                    </span>
                  </h5>
                ) : null}
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            {submitStatus == true ?
             <div className="container d-flex flex-column justify-content-center align-items-center">
              <div className="spinner-border text-primary" role="status"/>
             </div>:
             <button
             onClick={(e) => submitUserApproval(e)}
             className="btn btn-primary">
              Submit
            </button>
            }
            
            <button onClick={closeModal} className="btn btn-secondary">
              Cancel
            </button>
          </ModalFooter>
        </Modal>
    </>
  );
};