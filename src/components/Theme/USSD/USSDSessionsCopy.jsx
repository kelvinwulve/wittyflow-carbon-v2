import React, { useState, useEffect,useRef, useCallback } from 'react';
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
import {
  Grid,
  Table,
  TableHeaderRow,
  Toolbar,
  SearchPanel,
  PagingPanel,
  ExportPanel,
} from '@devexpress/dx-react-grid-bootstrap4';
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';
import { GridExporter } from "@devexpress/dx-react-grid-export";
import saveAs from "file-saver";
import "@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css";
// import "./static/datatable-custom.css";
import "../Messaging/static/datatable-custom.css";
import { get } from "../../../services/Transport";
import { useParams, useLocation, useHistory, useRouteMatch } from 'react-router-dom';
import DatePicker from "react-datepicker";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import { Modal, ModalBody } from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";
import GH_FLAG from "../../../static/img/gh.svg";
import "../Messaging/static/sms-overview.css";
import { Helmet } from "react-helmet";
import axios from 'axios';


const columns = [
  { name: "id", title: "ID" },
  { name: "msisdn", title: "Msisdn" },
  { name: "network", title: "Network" },
  { name: "created_at", title: "Date" }
 
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

const statusTypes = [
  { value: "0", label: "All Messages" },
  { value: "Sent", label: "Sent Messages" },
  { value: "Delivered", label: "Delivered Messages" },
  { value: "Failed", label: "Failed Messages" },
  { value: "Rejected", label: "Rejected Messages" },
  { value: "Buffered", label: "Buffered Messages" }
];


export default () => {
 
  const [columns] = useState([
    { name: "id", title: "ID" },
    { name: "msisdn", title: "Msisdn" },
    { name: "network", title: "Network" },
    { name: "gateway_session_id", title: "Gateway Session" },
    { name: "created_at", title: "Date" }
    ]);

  const [pageSize] = useState(200);
  const [clientName,setClientName] = useState('');
  const [userId,setUserId] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [allSessions, setAllSessions] = useState([]);
  const [rows, setRows] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [lastQuery, setLastQuery] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [count, setCount] = React.useState(0);
  const exporterRef = useRef(null);
  const startExport = useCallback(() => {
  exporterRef.current.exportGrid();
  }, [exporterRef]);

  const handleStartDateChange = date => {
    setStartDate(date)
  };
  
 const handleEndDateChange = date => {
    setEndDate(date) 
  };

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

  const loadData = () => {
    let enddate = setDate(endDate)
    let startdate = setDate(startDate)
    console.log("user location",useLocation)
    // const userId = props.match.params.uuid;
    // const clientName = location.state.clientName;
    // console.log("clientName",clientName)
 ///   setClientName(clientName)
    // setUserId(userId)
    const getQueryString = () => (
      `ussd/apps/fa8a1d99-1883-4dc9-be89-0e8646e588d3/sessions?start_date=${startdate}&end_date=${enddate}`
      )

    let list = [];
    const queryString = getQueryString();
 
    setLoading(true);
    get(queryString)
    .then(res => {
     // console.log("all res",res)

      const retrivedData = res.data.data.data
     // console.log("all sessions",retrivedData)
      if (retrivedData && retrivedData.length > 0) {
          retrivedData.forEach((element,i) => {
            
            list.push({
              msisdn: element.msisdn,
              network: element.network,
              id: i+1,
              gateway_session_id:element.gateway_session_id
            
            });
            return element;
          });

          setAllSessions(list)
          setTotalCount(res.data.data.total);    
          NotificationManager.success("User sessions retrieved", "Success");

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

  // componentWillMount() {
  //   var loadjs = require("loadjs");

  //   //this styles the select boxes
  //   loadjs("external/js/custom.js");
  // }


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
             {/* <h3 className="kt-portlet__head-title">Activity Sessions - {clientName}</h3> */}
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
                <GridUtil
                  columns={columns}
                  rows={allSessions}
                  cellComponent={TableCell}
                  rowComponent={TableRow}
                  tableComponent={TableComponent}
                  totalCount={totalCount}
                  currentPage={currentPage}
                  onCurrentPageChange={setCurrentPage}
                  pageSize={pageSize}
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

