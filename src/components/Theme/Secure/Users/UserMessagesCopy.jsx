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
import { Modal, ModalBody } from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";
import GH_FLAG from "../../../../static/img/gh.svg";
import "../../Messaging/static/sms-overview.css";
import { Helmet } from "react-helmet";
import { GridExporter } from "@devexpress/dx-react-grid-export";
import saveAs from "file-saver";
import "@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css";
import {baseUrlProd} from '../../../../Utilities/Utilities'


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
    { name: "recipient", title: "Recipient" },
  { name: "sender", title: "Sender" },
  { name: "channel", title: "Channel" },
  { name: "message", title: "Message" },
  { name: "status", title: "Status" },
  { name: "readable_date", title: "Send Date" }
  ]);
  const [pageSize] = useState(200);
  const [currentPage, setCurrentPage] = useState(0);
  const [rows, setRows] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [lastQuery, setLastQuery] = useState();
  const [smsReports, setSmsReports] = useState([]);
  const [deliveredMessages, setDeliveredMessages] = useState([]);
  const [failedMessages, setFailedMessages] = useState([]);
  const [sentMessages, setSentMessages] = useState([]);
  const [bufferedMessages, setBufferedMessages] = useState([]);
  const [rejectedMessages, setRejectedMessages] = useState([]);
  const [submittedMessages, setSubmittedMessages] = useState([]);
  const [rowInfo, setRowInfo] = useState({});
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [gridNumber, setGridNumber] = useState("0");
  const [messageHeading, setMessageHeading] = useState("All Messages");
  const [selectedItem, setSelectedItem] = useState({value: "0",label: "All Messages"});
  const [selection, setSelection] = React.useState([]);
  const [count, setCount] = React.useState(0);


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

useEffect(()=>{
      if (gridNumber == "Delivered") {
    var deliveredMsg = smsReports.filter(
      item => item.status == "Delivered"
    );
  setCount(deliveredMsg.length)
    setDeliveredMessages(deliveredMsg)
  } else if (gridNumber == "Sent") {
    var sent = smsReports.filter(item => item.status == "Sent");
    setCount(sent.length)
    setSentMessages(sent)
  }
  else if (gridNumber == "Failed") {
    var failed = smsReports.filter(
      item => item.status == "Failed"
    );

  setFailedMessages(failed)
  setCount(failed.length)
  }
  else if (gridNumber == "Rejected") {
    var rejected = smsReports.filter(
      item => item.status == "Rejected"
    );
    setCount(rejected.length)
  setRejectedMessages(rejected)
  } 
  else if (gridNumber == "Buffered") {
    var buffered = smsReports.filter(
      item => item.status == "Buffered"
    );
    setCount(buffered.length)
    setBufferedMessages(buffered)
  }

},[gridNumber])
 
 

  const loadData = () => {
      let end_date = setDate(endDate)
      let start_date = setDate(startDate)
      const getQueryString = () => (
      `${baseUrlProd}/secure/messages/paginate?start_date=${start_date}&end_date=${end_date}&per_page=${pageSize}&page=${currentPage+1}`
     )
      let list = [];
      let status = ''
    const queryString = getQueryString();
      setLoading(true);
      get(queryString)
      .then(res => {
        const retrivedData = res.data.data.data
        if (retrivedData && retrivedData.length > 0) {
            retrivedData.forEach(element => {
              if(element.status == 'sent'){
                status = "Sent"
              }
              if(element.status == 'delivered'){
                status = "Delivered"
              }
              if(element.status == 'failed'){
                status = "Failed"
              }
              if(element.status == 'rejected'){
                status = "Rejected"
              }
              if(element.status == 'submitted'){
                status = "Submitted"
              }
              list.push({
                sender: element.sender,
                recipient: element.recipient,
                channel: element.channel,
                message: decodeURIComponent(element.message).replace(/[\+]/g,' '),
                date: element.date,
                status: status,
                readable_date: element.created_at
              });
              return element;
            });

          setSmsReports(list)
          setTotalCount(res.data.data.total);    
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

  useEffect(() => loadData(),[currentPage]);

  let gridToShow;
  if (gridNumber == "0") {
    gridToShow = (
      <GridUtil
        columns={columns}
        rows={smsReports}
        cellComponent={TableCell}
        rowComponent={TableRow}
        tableComponent={TableComponent}
         totalCount={totalCount}
        currentPage={currentPage}
        onCurrentPageChange={setCurrentPage}
        pageSize={pageSize}
      />
    );
  } else if (gridNumber == "Sent") {
    gridToShow = (
      <GridUtil
        columns={columns}
        rows={sentMessages}
        cellComponent={TableCell}
        rowComponent={TableRow}
        tableComponent={TableComponent}
        totalCount={count}
        currentPage={currentPage}
        onCurrentPageChange={setCurrentPage}
        pageSize={pageSize}
      />
    );
  } else if (gridNumber == "Delivered") {
    gridToShow = (
      <GridUtil
        columns={columns}
        rows={deliveredMessages}
        cellComponent={TableCell}
        rowComponent={TableRow}
        tableComponent={TableComponent}
        totalCount={count}
        currentPage={currentPage}
        onCurrentPageChange={setCurrentPage}
        pageSize={pageSize}
      />
    );
  } else if (gridNumber == "Rejected") {
    gridToShow = (
      <GridUtil
        columns={columns}
        rows={rejectedMessages}
        cellComponent={TableCell}
        rowComponent={TableRow}
        tableComponent={TableComponent}
        totalCount={count}
        currentPage={currentPage}
        onCurrentPageChange={setCurrentPage}
        pageSize={pageSize}
      />
    );
  } else if (gridNumber == "Buffered") {
    gridToShow = (
      <GridUtil
        columns={columns}
        rows={bufferedMessages}
        cellComponent={TableCell}
        rowComponent={TableRow}
        tableComponent={TableComponent}
        totalCount={count}
        currentPage={currentPage}
        onCurrentPageChange={setCurrentPage}
        pageSize={pageSize}
      />
    );
  } else if (gridNumber == "Failed") {
    gridToShow = (
      <GridUtil
        columns={columns}
        rows={failedMessages}
        cellComponent={TableCell}
        rowComponent={TableRow}
        tableComponent={TableComponent}
        totalCount={count}
        currentPage={currentPage}
        onCurrentPageChange={setCurrentPage}
        pageSize={pageSize}
      />
    );
  }else if (gridNumber == "Submitted") {
    gridToShow = (
      <GridUtil
        columns={columns}
        rows={submittedMessages}
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
        <title>User Messages - Wittyflow</title>
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
            //   <div className="">
            //   <Grid 
            //   rows={smsReports} 
            //   columns={columns}>
            //   <PagingState
            //       currentPage={currentPage}
            //       onCurrentPageChange={setCurrentPage}
            //       pageSize={pageSize}
            //     />
            //     <CustomPaging
            //       totalCount={totalCount}
            //     />
            //     <SearchState defaultValue="" />
            //     <IntegratedFiltering />
            //     <PagingPanel  />
            //     <Table
            //       // cellComponent={TableCell} //getting props here didn't work
            //       // tableComponent={TableComponent}
            //       // rowComponent={TableRow}
            //     />
            //     <TableHeaderRow />
            //     <Toolbar />
            //     <ExportPanel startExport={startExport} />
            //     <SearchPanel />
            //     <Template name="toolbarContent">
            //       <TemplateConnector>
            //         {({ totalCount }) => (
            //           <React.Fragment>
            //             <div>Total Count: {totalCount} Records</div>
            //             <TemplatePlaceholder />
            //           </React.Fragment>
            //         )}
            //       </TemplateConnector>
            //     </Template>
            //   </Grid>
            //   <GridExporter
            //     ref={exporterRef}
            //     rows={smsReports}
            //     columns={columns}
            //     selection={selection}
            //     onSave={onSave}
            //   />
            // </div>
            
            )}
          </div>
          <NotificationContainer />
          {/*end: Datatable */}
        </div>
      </div>
     
    </>
  );
};