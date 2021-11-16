import React from "react";
import { Link } from "react-router-dom";
import { post, get } from "../../../services/Transport";
import {
  NotificationManager
} from "react-notifications";
import "./static/groups.css";
import axios from "axios";
import qs from "qs";
import {Modal,ModalBody,ModalFooter} from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/ModalHeader';
import { updateUser } from '../carbonActions';
import { connect } from 'react-redux';
import { baseUrlProd } from "../../../Utilities/Utilities";


function countProperties(obj) {
  var count = 0;

  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) ++count;
  }

  return count;
}

class Groups extends React.PureComponent {
  state = {
    groupList: [],
    group: "",
    addGroupModal: false,
    errorMessage: "",
    loading: false,
    editModal: false,
    deleteModal: false,
    rowInfo: {}
  };

  componentDidMount() {
    //  this.setState({ loading: true });
    this.props.updateUser();
    get("/groups")
      .then(res => {
        const groups = res.data.data;
        if (res.data.code == 2000) {
          NotificationManager.success(res.data.message, "Success");
          this.setState({
            groupList: groups
          });
        } else {
          NotificationManager.success("Error retrieving Group list", "Error");
        }
      })
      .catch(err => {
        NotificationManager.error(err.response?.data?.message);
      });
  }

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  addGroup = e => {
    e.preventDefault();
  
   if(this.state.group.length == 0){
    this.setState({
      errorMessage: "Group field can not be empty"
    });
   }
   else if (this.state.group.length > 0) {
    this.clearState()
      post("/groups/create", { group: this.state.group })
        .then(res => {
          var code = res.data.code;

          if (code == 2010 || code == 2000) {
            NotificationManager.success(res.data.message, "Success");
            get("/groups").then(res => {
              const groups = res.data.data;
              if (res.data.code == 2000) {
                this.setState({
                  groupList: groups
                });
              }
            });
          }
        })
        .catch(err => {
          NotificationManager.error(err.response.data.message);
        });
    }
  };

  updateGroup = () => {
    const { rowInfo } = this.state;
    this.clearState();
    if (this.state.group.length > 0) {
      post(`/groups/${rowInfo.uuid}/update`, { group: this.state.group })
        .then(res => {
          //console.log("edit groups", res);
          var code = res.data.code;
          if (code == 2000 || code == 2010) {
            NotificationManager.success(res.data.message, "Success");
            get("/groups").then(res => {
              // console.log("all groups",res)
              const groups = res.data.data;
              if (res.data.code == 2000) {
                this.setState({
                  groupList: groups
                });
              }
            }).catch(err=>{
              NotificationManager.error(err.response.data.message);
            })
          } 
        })
        .catch(err => {
          NotificationManager.error(err.response.data.message);
        });
    } else {
      this.setState({
        errorMessage: "Group field can not be empty"
      });
    }
  };

  deleteGroup = () => {
    const { rowInfo } = this.state;
    this.setState({ deleteModal: false });
    if (countProperties(rowInfo) > 0) {
      this.setState({ loading: false });
      const payload = {
        group: rowInfo.name
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
        url: `${baseUrlProd}/groups/${rowInfo.uuid}/delete`
      };

      axios(options)
        .then(res => {
          NotificationManager.success(res.data.message);
          axios
            .get(`${baseUrlProd}/groups`)
            .then(res => {
              if (res.data.code == 2000) {
                const retrivedData = res.data.data;

                this.setState({
                  groupList: retrivedData,
                  loading: false
                });
              } else {
                this.setState({ loading: false });
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

  clearState = () => {
    this.setState({
      addGroupModal: false,
      editModal: false,
      deleteModal: false,
      group: "",
      errorMessage:''
    });
  };

  openAddGroupModal = () => {
    this.setState({ addGroupModal: true });
  };
  editGroupModal = item => {
    this.setState({ editModal: true, rowInfo: item });
  };
  deleteGroupModal = item => {
    this.setState({ deleteModal: true, rowInfo: item });
  };

  render() {
    const { groupList, group } = this.state;
    return (
     
     
        <div>
        <div className="row">
          <div className="col-xl-12 col-lg-12 order-lg-3 order-xl-1">
            {/*begin:: Widgets/Best Sellers*/}
            <div class="kt-portlet">
              <div class="kt-portlet__head">
                <div class="kt-portlet__head-label">
                  <h3 class="kt-portlet__head-title">Contact Groups</h3>
                </div>
                <div
                  class="kt-portlet__head-toolbar"
                  onClick={this.openAddGroupModal}
                >
                  <div class="kt-portlet__head-actions">
                    <a href="#" class="btn btn-brand btn-icon-sm">
                      <i class="flaticon2-add-1"></i> Add Group
                    </a>
                  </div>
                </div>
              </div>
              <div class="kt-portlet__body">
                <div class="kt-notification-v2">
                  {groupList && groupList.length > 0 ? (
                    groupList.map((item, i) => {
                      return (
                        <div
                          key={i}
                          href="#"
                          class="kt-notification-v2__item group-item"
                        >
                          <div class="kt-notification-v2__item-icon">
                            <i class="ti-archive kt-font-primary"></i>
                          </div>
                          <div class="kt-notification-v2__itek-wrapper">
                            <div class="kt-notification-v2__item-title">
                              <Link
                                to={{
                                  pathname: `/v1/groups/${item.uuid}/contacts`,
                                  state: {
                                    groupId: item.uuid,
                                    groupName: item.name
                                  }
                                }}
                              >
                                {item.name}
                              </Link>
                            </div>
                            <div class="kt-notification-v2__item-desc">
                              Date: {item.updated_at}
                            </div>
                            <div class="kt-notification-v2__item-desc">
                              {item.contacts} Contacts Added
                            </div>
                          </div>

                          <div className="pull-right">
                            <span
                              className="right-action-button"
                              onClick={() => this.editGroupModal(item)}
                            >
                              <i className="ti-pencil kt-font-primary"></i>
                            </span>

                            <span
                              className="right-action-button"
                              onClick={() => this.deleteGroupModal(item)}
                            >
                              <i className="ti-trash kt-font-primary"></i>
                            </span>
                          </div>
                        </div>
                      );
                    })
                  ) : (
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
                          stroke-width="1"
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

                      <h3>You have not added any Groups yet.</h3>
                      <p>
                        You can create Groups now by clicking the button below
                      </p>
                      <button
                        type="button"
                        class="btn btn-primary"
                        onClick={this.openAddGroupModal}
                      >
                        Create Group
                      </button>
                    </div>
                    )

                  }
             
                </div>
                <div class="kt-separator kt-separator--space-lg kt-separator--border-dashed"></div>
              </div>
            </div>
          </div>
        </div>
        <Modal 
          size="lg"
          show={this.state.addGroupModal}
          onHide={this.clearState}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          >
           <ModalHeader closeButton>
              <span className="text-dark fw-400"> Add Group </span>
                               
           </ModalHeader>
            <ModalBody>
                <form>
              <div className="form-group">
                <label htmlFor="groupname">Group Name</label>
                <input
                  type="text"
                  name="group"
                  value={group}
                  onChange={this.handleChange}
                  class="form-control"
                  placeholder="How do you want to name your group"
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
            <ModalFooter>
            <button
                onClick={this.addGroup}
                className="btn btn-primary"
              >
                  Add Group
              </button>
              <button
                onClick={this.clearState}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </ModalFooter>
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
              <span className="text-dark fw-400"> Delete Group </span>
                               
           </ModalHeader>
            <ModalBody>
            Are you sure you want to delete{" "}
              <span style={{ fontStyle: "bold", color: "red" }}>
                {this.state.rowInfo.name}
              </span>{" "}
             group?
            </ModalBody>
            <ModalFooter>
            <button
                onClick={this.deleteGroup}
                className="btn btn-primary"
              >
                Submit
              </button>
              <button
                onClick={this.clearState}
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
              <span className="text-dark fw-400">Edit Group </span>
                               
           </ModalHeader>
            <ModalBody>
            Are you sure you want to edit details for{" "}
              <span style={{ fontStyle: "bold", color: "blue" }}>
                {this.state.rowInfo.name}
              </span>
              ?
              <form>
              <div className="form-group">
                <label htmlFor="groupname">Name</label>
                <input
                  type="text"
                  name="group"
                  value={group}
                  onChange={this.handleChange}
                  class="form-control"
                  placeholder={this.state.rowInfo.name}
                />
              </div>
            </form>
            </ModalBody>
            <ModalFooter>
            <button
                onClick={this.updateGroup}
                className="btn btn-primary"
              >
                Submit
              </button>
              <button
                onClick={this.clearState}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </ModalFooter>
        </Modal>
       
        
        </div>
      
     
    );
  }
}

export default connect(null, { updateUser })(Groups);
