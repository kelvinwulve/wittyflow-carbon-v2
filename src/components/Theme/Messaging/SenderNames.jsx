import React from "react";
import {
  Table,
} from "@devexpress/dx-react-grid-bootstrap4";
import GridUtils from "../../../Utilities/GridUtils";
import "../Messaging/static/datatable-custom.css";
import axios from "axios";
import { get, post } from "../../../services/Transport";
import Delete from "@material-ui/icons/Delete";
import qs from "qs";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import { Modal, ModalBody, ModalFooter } from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";
import { baseUrlProd } from "../../../Utilities/Utilities";

const columns = [
  { name: "sendername", title: "Sender Name" },
  { name: "description", title: "Description" },
  { name: "created_at", title: "Date Created" },
  { name: "status", title: "Status" },
  { name: "custom", title: "Actions" }
];

function countProperties(obj) {
  var count = 0;

  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) ++count;
  }

  return count;
}

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

const TableComponent = ({ ...restProps }) => (
  <Table.Table {...restProps} className="table-striped" />
);

//on table row click
const TableRow = ({ classes, row, ...restProps }) => (
  <Table.Row
    {...restProps}
    // eslint-disable-next-line no-alert
    onClick={() => {}}
    // className={classes.tableStriped}
  />
);

class SenderNames extends React.Component {
  state = {
    showModal: false,
    pageNumber: 1,
    value: 0,
    sendername: "",
    senderNameList: [],
    loading: false,
    deleteModal: false,
    rowInfo: {},
    editModal: false,
    errorMessage: "",
    error: false,
    duplicateCount: false,
    description:''
  };

  componentDidMount() {
    document.title = "Sender Names - Wittyflow";
    this.setState({loading:true})
     this.getSenderNames()
  }

  getSenderNames=()=>{
    let list = [];
    let status = ''
    get(`/sendernames`)
      .then(res => {
        this.setState({loading:false})

        const sendernames = res.data.data;
        if (sendernames && sendernames.length > 0) {
          NotificationManager.success(res.data.message, "Success");
          sendernames.forEach((element,i) => {
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
              status: status,
              created_at: element.created_at,
              uuid:element.uuid
            });
            return element;
          });

          this.setState({ senderNameList: list });
        } else {
          this.setState({ sendernames: [],loading:false });
        }
      })
      .catch(err => {
        //  console.log("errrrr",err)
        //NotificationManager.error(err.response.data.message);
        this.setState({ loading: false });
      });
  }

  componentWillMount() {
    var loadjs = require("loadjs");

    //this styles the select boxes
    loadjs("/external/js/sms-overview.js");
  }

  showModal = () => {
    this.setState({ showModal: true });
  };

  checkDuplicate = sendernameCheck => {
    const { senderNameList } = this.state;
    let count = 0;

    if (senderNameList.length > 0) {
      senderNameList.forEach(item => {
        if (item.sendername.trim() == sendernameCheck.trim()) {
          count = count + 1;
        }
      });

      this.setState({
        errorMessage: "Duplicates detected,kindly use another name"
      });

      return count;
    } else if (senderNameList.length == 0) {
      return count;
    }
  };

  addSenderName = e => {
    const { sendername,description } = this.state;

    e.preventDefault();
    if (sendername.length == 0 || description.length == 0) {
      this.setState({
        errorMessage: "Sender/Description name cannot be empty",
        loading: false
      });
    } else if (sendername.length > 14) {
      this.setState({
        errorMessage: "Sender name must not be more than 14 characters",
        loading: false
      });
    } else if (sendername && sendername.length > 1) {
      const payload = {
        sendername: this.state.sendername.trim(),
        description: this.state.description.trim()
      };
      // axios.defaults.headers = {
      //   Accept: "application/json",
      //   "Content-Type": "application/x-www-form-urlencoded"
      // };
      // const options = {
      //   method: "POST",
      //   headers: { "content-type": "application/x-www-form-urlencoded" },
      //   //data: qs.stringify(data),
      //   data: qs.stringify(payload),
      //   url: `${baseUrlProd}/sendernames/create`
      // };
      this.setState({
        loading: false,
        errorMessage: "",
        showModal: false,
        sendername: ""
      });
        post('/sendernames/create',
					payload, null).then(res => {
					if(res.data.code == 2000){
            NotificationManager.success(res.data.message);
            this.getSenderNames()

          }
          else{
            NotificationManager.success(res.data.message);
            this.setState({ loading: false, sendername: "" });
          }
					
					 
						// this.props.history.push('/v1/messaging/sms-overview/');
					})
					.catch(err => {
            NotificationManager.error(err.response.data.message);
            this.setState({ loading: false, sendername: "" });

					});
    }
  };

  updateSenderName = () => {
    const { sendername, rowInfo,description} = this.state;

    if (sendername.length <= 14 && countProperties(rowInfo) > 0) {
      this.setState({ loading: false });
      const payload = {
        sendername: sendername,
        description: description,
      };
      axios.defaults.headers = {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      };
      const options = {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        //data: qs.stringify(data),
        data: qs.stringify(payload),
        url: `${baseUrlProd}/sendernames/${rowInfo.uuid}/update`
      };

      axios(options)
        .then(res => {
          NotificationManager.success(res.data.message);
          axios
            .get(`${baseUrlProd}/sendernames`)
            .then(res => {
              if (res.data.code == 2000) {
                const retrivedData = res.data.data;
                //  console.log("retrived sender names data", retrivedData);
                this.setState({
                  senderNameList: retrivedData,
                  loading: false,
                  editModal: false,
                  sendername: ""
                });
              } else {
                this.setState({ loading: false, sendername: "" });
              }
            })
            .catch(err => {
              this.setState({ loading: false });
            });
        })
        .catch(err => {
          NotificationManager.error(err.response.data.message);
        });
    }
  };

  deleteSenderName = () => {
    const { rowInfo } = this.state;
    this.setState({ deleteModal: false });
    if (countProperties(rowInfo) > 0) {
      this.setState({ loading: false });
      const payload = {
        sendername: rowInfo.sendername
      };
      axios.defaults.headers = {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      };
      const options = {
        method: "DELETE",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        //data: qs.stringify(data),
        data: qs.stringify(payload),
        url:`${baseUrlProd}/sendernames/${rowInfo.uuid}/delete`
      };

      axios(options)
        .then(res => {
          NotificationManager.success(res.data.message);
          axios
            .get(`${baseUrlProd}/sendernames`)
            .then(res => {
              if (res.data.code == 2000) {
                this.getSenderNames()
              } else {
                this.setState({ loading: false, sendername: "" });
              }
            })
            .catch(err => {
              this.setState({ loading: false });
            });
        })
        .catch(err => {
          NotificationManager.error(err.response.data.message);
        });
    }
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  openDeleteModal = row => {
    this.setState({ deleteModal: true, rowInfo: row });
  };
  openEditModal = row => {
    this.setState({ editModal: true, rowInfo: row });
  };

  TableCell = props => {
    if (props.column.name === "custom")
      return (
        <Table.Cell {...props}>
          <Delete onClick={() => this.openDeleteModal(props.row)}/>
        </Table.Cell>
      );
      if (props.column.name === "status") {
        return <HighlightedCell {...props} />;
      }
    return <Table.Cell {...props} />;
  };

  clearState = () => {
    this.setState({
      showModal: false,
      pageNumber: 1,
      value: 0,
      sendername: "",
      description:'',
      loading: false,
      deleteModal: false,
      editModal: false,
      errorMessage: "",
      error: false,
      duplicateCount: false
    });
  };

  render() {
    const { senderNameList, sendername ,description,loading} = this.state;

    return (
      <div>
        <div className="alert alert-light alert-elevate" role="alert">
          <div className="alert-icon">
            <i className="flaticon-warning kt-font-brand"></i>
          </div>
          <div className="alert-text">
            You can add sender names for SMS Campaigns.
          </div>
        </div>
        <div className="kt-portlet kt-portlet--mobile">
          <div className="kt-portlet__head kt-portlet__head--lg">
            <div className="kt-portlet__head-label">
              <span className="kt-portlet__head-icon">
                <i className="kt-font-brand flaticon2-line-chart"></i>
              </span>
              <h3 className="kt-portlet__head-title">Sender Names</h3>
            </div>

            <div class="kt-portlet__head-toolbar">
              <div class="kt-portlet__head-actions">
                <button
                  class="btn btn-brand btn-icon-sm"
                  onClick={this.showModal}
                >
                  <i class="flaticon2-add-1"></i> Add Sender Name
                </button>
              </div>
            </div>
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
            ) :
              <GridUtils
                columns={columns}
                rows={senderNameList}
                cellComponent={this.TableCell}
                rowComponent={TableRow}
                tableComponent={TableComponent}
              />}
            </div>

            {/*end: Datatable */}
          </div>
          <NotificationContainer />
        </div>
        <Modal
          size="lg"
          show={this.state.showModal}
          onHide={this.clearState}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <ModalHeader closeButton>
            <span className="text-dark fw-400"> Add Sender Name </span>
          </ModalHeader>
          <ModalBody>
            <div className="row">
              <div className="col-6">
                <h5> Please Note: </h5>

                <ul style={{ lineHeight: "2em" }}>
                  <li>
                    1. Sender Name is subject to approval from Mobile Network
                    Operators{" "}
                  </li>
                  <li>
                    {" "}
                    2. Maximum of 11 alpha numeric characters or 14 numbers{" "}
                  </li>
                  <li>3. Sender name can be a word or a Mobile number</li>
                  <li>4. Sender address can also contain underscores (_)</li>
                  <li>
                    5. Mobile number sender names must be entered in
                    international formats, example : 233244111222{" "}
                  </li>
                  <li>
                    <strong>
                    6. Description is required{" "}.
                    </strong>
                  </li>
                  <li>
                    7. Do not use names of <strong> Brand or Companies </strong>{" "}
                    you do not own or have any legitimate connections with. This
                    is considered as{" "}
                    <strong>
                      {" "}
                      spam and is a crime punishable by the laws of Ghana
                    </strong>
                    .
                  </li>
                </ul>
              </div>

              <div className="col-6">
                <form>
                  <div className="form-group">
                    <label htmlFor="groupname">Name</label>
                    <input
                      type="text"
                      name="sendername"
                      value={sendername}
                      onChange={this.handleChange}
                      class="form-control"
                      placeholder="How do you want to call your sender name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="groupname">Description</label>
                    <input
                      type="text"
                      name="description"
                      value={description}
                      onChange={this.handleChange}
                      class="form-control"
                      placeholder="How do you describe the sendername provided"
                    />
                  </div>
                  <div>
                    {this.state.errorMessage.length > 0 ? (
                      <h5>
                        <span style={{ fontStyle: "bold", color: "red" }}>
                          {this.state.errorMessage}
                        </span>
                      </h5>
                    ) : null}
                  </div>
                  <div style={{ marginBottom: 10 }}>
                    <button
                      onClick={this.addSenderName}
                      className="btn btn-primary"
                    >
                      Add Sender Name
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </ModalBody>
        </Modal>

        <Modal
          size="sm"
          show={this.state.deleteModal}
          onHide={this.clearState}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <ModalHeader closeButton>
            <span className="text-dark fw-400"> Delete Sender Name </span>
          </ModalHeader>
          <ModalBody>
            Are you sure you want to delete{" "}
            <span style={{ fontStyle: "bold", color: "red" }}>
              {this.state.rowInfo.sendername}
            </span>{" "}
            sender name?
          </ModalBody>
          <ModalFooter>
            <button onClick={this.deleteSenderName} className="btn btn-primary">
              Submit
            </button>
            <button
              onClick={() => this.setState({ deleteModal: false })}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </ModalFooter>
        </Modal>

        <Modal
          size="lg"
          show={this.state.editModal}
          onHide={this.clearState}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <ModalHeader closeButton>
            <span className="text-dark fw-400">Edit Sender Name </span>
          </ModalHeader>
          <ModalBody>
            Are you sure you want to edit details for{" "}
            <span style={{ fontStyle: "bold", color: "blue" }}>
              {this.state.rowInfo.sendername}
            </span>
            ?
            <form>
              <div className="form-group">
                <label htmlFor="groupname">Name</label>
                <input
                  type="text"
                  name="sendername"
                  value={sendername}
                  onChange={this.handleChange}
                  class="form-control col-6"
                  placeholder={this.state.rowInfo.sendername}
                />
              </div>
              <div>
                {this.state.errorMessage.length > 0 ? (
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
              onClick={() => this.updateSenderName()}
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
    );
  }
}

export default SenderNames;
