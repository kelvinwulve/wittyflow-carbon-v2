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



const HighlightedCell = ({ value, style, ...restProps }) => {
  let color;
 if (value == "PAID") {
    color = "btn-label-success";
  } else if (value == "Failed") {
    color = "btn-label-danger";
  } 
  // else if (value == "Sent") {
  //   color = "btn-label-warning";
  // } else {
  //   color = "btn-label-warning";
  // }

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
  { value: "PAID", label: "Paid" },
  { value: "FAILED", label: "Failed" },

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
    { name: "id", title: "Id" },
  { name: "name", title: "Name" },
  { name: "email", title: "Email" },
  { name: "amount", title: "Amount" },
  { name: "fees", title: "Fees" },
  { name: "type", title: "Type" },
  { name: "status", title: "Status" },
  { name: "readable_date", title: "Date" }
  ]);
  const [pageSize] = useState(200);
  const [currentPage, setCurrentPage] = useState(0);
  const [rows, setRows] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [lastQuery, setLastQuery] = useState();
  const [allRecharges, setAllRecharges] = useState([]);
  const [failedReports, setFailedReports] = useState([]);
  const [paidReports, setPaidReports] = useState([]);
  const [rowInfo, setRowInfo] = useState({});
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [gridNumber, setGridNumber] = useState("0");
  const [messageHeading, setMessageHeading] = useState("All Payments");
  const [selectedItem, setSelectedItem] = useState({value: "0",label: "All Payments"});
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
      if (gridNumber == "PAID") {
    var paid = allRecharges.filter(
      item => item.status == "PAID"
    );
    setCount(paid.length)
    setPaidReports(paid)
  } else if (gridNumber == "FAILED") {
    var failed = allRecharges.filter(item => item.status == "FAILED");
    setCount(failed.length)
    setFailedReports(failed)
   
  }
  
 

},[gridNumber])
 
 

  const loadData = () => {
      let end_date = setDate(endDate)
      let start_date = setDate(startDate)
      const getQueryString = () => (
      `${baseUrlProd}/secure/users/recharges?start_date=${start_date}&end_date=${end_date}`
     )
      let list = [];
      let dateString  
      let timeString
      let date
    const queryString = getQueryString();
      setLoading(true);
      get(queryString)
      .then(res => {
        const retrivedData = res.data.data
        if (retrivedData && retrivedData.length > 0) {
            retrivedData.forEach((element,i) => {
              dateString = new Date(element.created_at).toDateString()
              timeString = new Date(element.created_at).toLocaleTimeString()
              date =  `${dateString},${timeString}`
              list.push({
                id: i+1,
                amount: `GHS${element.amount}`,
                channel: element.channel,
                fees: `GHS${element.fees}`,
                type: element.type,
                date: element.date,
                status: element.status,
                readable_date: date,
                name:element.user.name,
                email:element.user.email,
              });
              return element;
            });
            NotificationManager.success(res.data.message);

          setAllRecharges(list)
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
        rows={allRecharges}
        cellComponent={TableCell}
        rowComponent={TableRow}
        tableComponent={TableComponent}
         totalCount={totalCount}
        currentPage={currentPage}
        onCurrentPageChange={setCurrentPage}
        pageSize={pageSize}
      />
    );
  } else if (gridNumber == "PAID") {
    gridToShow = (
      <GridUtil
        columns={columns}
        rows={paidReports}
        cellComponent={TableCell}
        rowComponent={TableRow}
        tableComponent={TableComponent}
        totalCount={count}
        currentPage={currentPage}
        onCurrentPageChange={setCurrentPage}
        pageSize={pageSize}
      />
    );
  } else if (gridNumber == "FAILED") {
    gridToShow = (
      <GridUtil
        columns={columns}
        rows={failedReports}
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
        <title>Users Payments - Wittyflow</title>
        {/* <meta http-equiv="refresh" content="30"></meta> */}
      </Helmet>

      <div className="kt-portlet kt-portlet--mobile">
        <div className="kt-portlet__head kt-portlet__head--lg">
          <div className="kt-portlet__head-label">
            <span className="kt-portlet__head-icon">
              <i className="kt-font-brand flaticon2-line-chart"></i>
            </span>
            <h3 className="kt-portlet__head-title">Users Payments History</h3>
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
                          class="btn btn-brand btn-icon-sm btn-elevate btn-square filterByDateBtn mb-2"
                          onClick={()=>searchData()}
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
            {loading ? (
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
     
    </>
  );
};