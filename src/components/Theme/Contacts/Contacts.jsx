import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {Table,Grid,TableHeaderRow, Toolbar} from "@devexpress/dx-react-grid-bootstrap4";
import GridUtils from "../../../Utilities/GridUtils";
import { get,post,deletee} from "../../../services/Transport";
import axios from "axios";
import qs from "qs";
import Delete from "@material-ui/icons/Delete";
import GH_FLAG from "./static/gh.svg";
import Tab from 'react-bootstrap/Tab'
import {Modal,ModalBody, Spinner,Tabs,Button,ModalFooter } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/ModalHeader';
import {ExcelRenderer} from 'react-excel-renderer';
import { Template, TemplatePlaceholder,TemplateConnector} from "@devexpress/dx-react-core";
import { NotificationManager } from 'react-notifications'
import { updateUser } from '../carbonActions';
import { connect } from 'react-redux';
import { baseUrlProd } from "../../../Utilities/Utilities";
const columns = [
  { name: "msisdn", title: "Contact" },
  { name: "custom_1", title: "Customs" },
  { name: "created_at", title: "Date Created" },
  { name: "updated_at", title: "Last Updated" },
  // { name: "actions", title: "Actions" }
];

const excelcolumns=[
 
  { name: "number", title: "Number" },
]

const ContactWithFlag = ({ value, style, ...restProps }) => {
  return (
    <Table.Cell {...restProps}>
      <img src={GH_FLAG} alt="" width="16" style={{ margin: "0px 8px" }} />
      <span
        className=""
        style={{
          fontSize: "14px",
          color: "#4a5669",
          lineHeight: "22px",
          fontWeight: "400"
        }}
      >
        +{value}
      </span>
    </Table.Cell>
  );
};



const TableComponent = ({ ...restProps }) => (
  <Table.Table {...restProps} className="table-striped" />
);
class Contacts extends Component {
  state = {
    contactList: [],
    groupName: "",
    contacts: [],
    errorMessage: "",
    addContactModal: false,
    groupId: "",
    contactsLength: 0,
    excelContacts:[],
    contactsToUpload:[],
    loading:false,
    deleteModal:false,
    selectedContact:{}
  };

  componentDidMount() {
    this.props.updateUser();
    const { location } = this.props;
    this.setState({loading:true})

    const groupId = this.props.match.params.group_uuid;
    const groupName = location.state.groupName;
    
    this.setState({ groupName, groupId },this.getContacts());
    //this.getContacts()
  }

  openAddContactModal = () => {
    this.setState({ addContactModal: true });
  };
  openDeleteContactModal = (selectedContact) => {
  //  console.log("selected contact",selectedContact)
    this.setState({ deleteModal: true,selectedContact });
  };
  openEditContactModal = (selectedContact) => {
    this.setState({ editModal: true,selectedContact });
  };


  handleReceipients = event => {
    const { name, value } = event.target;
    var list = [];
    const newValue = value.replace(/(\r\n|\n|\r)/gm, ",");

    list.push(newValue.split(","));
      const arrayLength = list.join(",").split(",").length;
      this.setState({
      [name]: newValue.split(","),
      contactsLength: arrayLength
    });
  };

  clearState = () => {
    this.setState({ 
      addContactModal: false, 
      deleteModal:false,
      editModal:false,
      selectedContact:{},
      contacts: [],
      excelContacts:[],
      contactsToUpload:[] });
  };

  TableRow = ({ classes, row, ...restProps }) => {
    return (
      <Table.Row
        {...restProps}
        onClick={() => {}}
      />
    );
  };

   TableCell = props => {
    const rowInfo = props.row
   
    // if (props.column.name === "actions")
    //   return (
    //     <Table.Cell {...props}>
    //       <Delete onClick={()=>this.openDeleteContactModal(rowInfo)} />
    //     </Table.Cell>
    //   );
  
    if (props.column.name === "msisdn") {
      return <ContactWithFlag {...props} />;
    }
    return <Table.Cell {...props} />;
  };


  getContacts=()=>{
    //const {  groupId } = this.state;
    const groupId = this.props.match.params.group_uuid;
    get(`/groups/${groupId}/contacts`)
    .then(res => {
      this.setState({loading:false})
      const contacts = res.data.data;
      if (res.data.code == 2000) {
        this.setState({
          contactList: contacts,
        });
      }

    })
    .catch(err => {
      if (err) {
        this.setState({loading:false})
        NotificationManager.error(err.response.data.message);

      }
    });
  }

  addContacts = e => {
    const { contacts, groupId } = this.state;
    e.preventDefault();
    this.clearState();
    if (contacts && contacts.length > 0 && contacts.length <= 5000) {
      const payload = {
        contacts: contacts
      };
      post(`/groups/${groupId}/contacts/bulk-upload`,
      payload, null).then(res => {
      if(res.data.code == 2000){
        NotificationManager.success(res.data.message);
        this.getContacts()

      }
      else{
        NotificationManager.error(res.data.message);
        this.setState({ loading: false});
      }
      })
      .catch(err => {
        NotificationManager.error(err.response.data.message);
        this.setState({ loading: false });

      });

    }
    //n0 contact list added
    else if (contacts && contacts.length == 0) {
      this.setState({ errorMessage: "Please add contacts" });
    }
    //more than 5000 records added,throw error
    else if (contacts && contacts.length > 5000) {
      this.setState({ errorMessage: "Only 5000 contacts can be added" });
    }
  };

  deleteContact = e => {
    const groupId = this.props.match.params.group_uuid;
    e.preventDefault();
    this.clearState();
  // console.log("groupId",groupId)
         // const payload = {
      //   contacts: contacts
      // };
      deletee(`/groups/${groupId}/delete`).then(res => {
      if(res.data.code == 2000){
        //console.log("groupId",res.data.message)

        //NotificationManager.success(res.data.message);
        this.getContacts()

      }
      else{
        NotificationManager.error(res.data.message);
        this.setState({ loading: false});
      }
      })
      .catch(err => {
        NotificationManager.error(err.response.data.message);
        this.setState({ loading: false });

      });

   
  };


  uploadContacts = e => {
    const { contactsToUpload, groupId } = this.state;
    e.preventDefault();
     if (contactsToUpload && contactsToUpload.length == 0) {
      this.setState({ errorMessage: "Please add contacts" });
    }
    //more than 5000 records added,throw error
    else if (contactsToUpload && contactsToUpload.length > 5000) {
      this.setState({ errorMessage: "Only 5000 contacts can be added" });
    }
   else if (contactsToUpload && contactsToUpload.length > 0 && contactsToUpload.length <= 5000) {
     // this.clearState()
      const payload = {
        contacts: contactsToUpload
      };
     
     this.setState({loading:true,errorMessage:''})
     post(`/groups/${groupId}/contacts/bulk-upload`,
      payload, null).then(res => {
        this.setState({ loading: false });

      if(res.data.code == 2000){
        NotificationManager.success(res.data.message);
        this.getContacts()
      }
      else{
        NotificationManager.success(res.data.message);
        this.setState({ loading: false });
      }
      
      
       // this.props.history.push('/v1/messaging/sms-overview/');
      })
      .catch(err => {
        NotificationManager.error(err.response.data.message);
        this.setState({ loading: false });

      });
    }
    //np contact list added
   
  };

  fileHandler = (event) => {
    let fileExtention = ""
    let fileObj = event.target.files[0];
 
    let validatedFile = fileObj.name.substr(fileObj.name.length - 4)
    if(validatedFile == ".csv" || validatedFile == ".xls")
    {
        fileExtention = validatedFile
    }
    else if(validatedFile == 'xlsx'){
        fileExtention = ".".concat(validatedFile)
    }

     if(fileExtention == '.xls' || fileExtention == ".xlsx" || fileExtention == ".csv"){
        //just pass the fileObj as parameter
         ExcelRenderer(fileObj, (err, resp) => {
        if(err){
        
         
          NotificationManager.error("Please Upload Valid Excel file")      
        }
        else{
          var newList = resp.rows.filter(item=>item[0] != "Name")
          let list =  []
          let testList =[]
          newList.forEach(item=>{
           
              list.push({
                 number:item[0]
              })
              testList.push(item[0])
            return list
          })
       
           this.setState({
           contactsToUpload:testList,
            excelContacts: list
          });
        
        }
      }); 
    }
   else  if(fileExtention != '.xls' || fileExtention != ".xlsx" || fileExtention != ".csv")
    {
      NotificationManager.warning("Please upload an Excel file")
      
    }
                  
  }


  render() {
    const { contactList, groupName, contacts, loading } = this.state;
    
    return (
     <div>
        <div className="alert alert-light alert-elevate" role="alert">
          <div className="alert-icon">
            <i className="flaticon-warning kt-font-brand"></i>
          </div>
          <div className="alert-text">
            Here, you'll see all contacts belonging to the selected Group.
          </div>
        </div>
        {/*Begin::Row*/}
        <div className="row">
          <div className="col-xl-12 col-lg-12 order-lg-3 order-xl-1">
            {/*begin:: Widgets/Best Sellers*/}
            <div class="kt-portlet">
              <div class="kt-portlet__head">
                <div class="kt-portlet__head-label">
                  <h3 class="kt-portlet__head-title">
                    <button
                      className="btn btn-light"
                      onClick={this.props.history.goBack}
                    >
                      <i className="ti-back-left"></i>
                    </button>{" "}
                    Contacts in {groupName} Group
                  </h3>
                </div>
                <div class="kt-portlet__head-toolbar">
                  <div
                    class="kt-portlet__head-actions"
                    onClick={this.openAddContactModal}
                  >
                    <a href="#" class="btn btn-brand btn-icon-sm">
                      <i class="flaticon2-add-1"></i> Add Contacts
                    </a>
                  </div>
                </div>
              </div>
              <div class="kt-portlet__body">
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
                  rows={contactList}
                  cellComponent={this.TableCell}
                  rowComponent={this.TableRow}
                  tableComponent={TableComponent}
                />
              }
                <div class="kt-separator kt-separator--space-lg kt-separator--border-dashed"></div>
              </div>
            </div>
          </div>
        </div>
        <Modal 
          size="lg"
          show={this.state.addContactModal}
          onHide={this.clearState}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          >
             <ModalHeader closeButton>
              <span className="text-dark fw-400">{`Add Contacts to ${groupName} Group`}</span>
                               
           </ModalHeader>
           <ModalBody>
           <Tabs defaultActiveKey="bulkupload" id="uncontrolled-tab-example">
            <Tab eventKey="bulkupload" title="Bulk Upload">

              <p className="text-dar">To add Contacts to this Group ({groupName}), Provide the Contact Numbers below:</p>
            <form>
            <div className="form-group">
              <label htmlFor="groupname">Add Contacts to Group (Maximum 5000)</label>
              <textarea
                onChange={this.handleReceipients}
                name="contacts"
                value={contacts.join(",")}
                type="number"
                className="form-control"
                rows="7"
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
            <div className="container d-flex justify-content-end">
              <p className="mt-1">{this.state.contactsLength}/5000 Contacts added</p>
            </div>
            <div style={{ marginBottom: 10 }}>
              <button
               
                className="btn btn-primary"
                onClick={this.addContacts}
              >
                Add Contacts
              </button>
              <button
                onClick={this.clearState}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
            </Tab>
            <Tab eventKey="excelupload" title="Excel Upload">
              <p>Upload one column excel sheet from the beginning of the row.</p>
              <div className="form-group">
                    <label htmlFor="uploadtitle" style={{color:'black'}}>Upload Excel file</label>
                    <div className="col-6">
                        <input type="file" onChange={this.fileHandler}  className="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01"/>
                        <label className="custom-file-label" for="inputGroupFile01">Choose Excel File</label>
                    </div>
                    
              </div>
              <div>
                {!this.state.loading ?
                <Button variant="primary"   onClick={this.uploadContacts}>
               
               Upload Contacts
              </Button>:
              <Button variant="primary" disabled>
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              Please Wait...
              </Button>
                 }

              
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
              <Grid columns={excelcolumns} rows={this.state.excelContacts}>
                 <Table/>
                 <TableHeaderRow />
                 <Toolbar />
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

            </Tab>
            
          </Tabs>
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
              <span className="text-dark fw-400"> Delete Contact </span>
                               
           </ModalHeader>
            <ModalBody>
            Are you sure you want to delete contact number{" "}
              <span style={{ fontStyle: "bold", color: "red" }}>
                {this.state.selectedContact.msisdn}
              </span>{" "}
           
            </ModalBody>
            <ModalFooter>
            <button
                onClick={this.deleteContact}
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

        {/*End::Row*/}
        </div>
    );
  }
}




export default withRouter(connect(null, { updateUser })(Contacts));
