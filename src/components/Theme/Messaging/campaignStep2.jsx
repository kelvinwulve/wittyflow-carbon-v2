import React from 'react';
import {
    Modal, Table,
    ModalBody,
    Spinner
} from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/ModalHeader';
import { get } from '../../../services/Transport';
// import Modal from '../Widgets/Modal';
import GH_FLAG from "../../../static/img/gh.svg";

class Campaigncomponent extends React.Component{

    state = {
        showGroupsModal: false,
        groups: [],
        loading: true,
        contactsClicked: false,
        contacts: [],
        selectedContacts:[],
        addAll: false
    }

    loadGroups = e => {
        e.preventDefault();
        this.setState({ showGroupsModal: true })
        get('/groups')
        .then(res =>{
            this.setState({ 
                groups: res.data.data,
                loading: false 
            });
        })
    }

    loadContacts = app => {
        this.setState({ contactsClicked: true, loading: true });
        get(`/groups/${app.uuid}/contacts`)
        .then(res => {
            const contacts = res.data.data;
            contacts.map(el => {
                el.added = false;
            });
            this.setState({ contacts, loading: false });
        })
    }

    handleChoosecontact = contact => {
        let selectedContacts =this.state.selectedContacts;
        const contacts = this.state.contacts;
       if(!contact.added){
           contacts.map(el => {
               if(el.uuid === contact.uuid){
                   el.added = true;
               }
            });
            selectedContacts.push(contact);
           this.setState({ contacts, selectedContacts });
       }else{
        contacts.map(el => {
            if(el.uuid === contact.uuid){
                el.added = false;
            }
         });
         selectedContacts = selectedContacts.filter(el => el.uuid !== contact.uuid);
        //  alert(JSON.stringify(selectedContacts));
        this.setState({ contacts, selectedContacts });
       }       
    }

    handleAddAll = e => {
        const selectedContacts = [];
        const contacts = this.state.contacts;
        if(!this.state.addAll){
            contacts.map(el => {
                el.added = true;
                selectedContacts.push(el);
            })
        }else{
            contacts.map(el =>{
                el.added = false;
            })
        }

        this.setState({ selectedContacts, contacts, addAll: !this.state.addAll });

    }

    handleCloseModal = e => {
        this.setState({ selectedContacts: [], contactsClicked: false, showGroupsModal: false, addAll: false });
    }



    handleSubmitContacts = () => {
        const contacts = this.state.selectedContacts;
        this.setState({ selectedContacts: [], contactsClicked: false, showGroupsModal: false, addAll: false });
        this.props.handleContactsFromGroup(contacts);
    }

    render(){
        const { step } = this.props;
        const { showGroupsModal, loading, groups, contactsClicked, contacts, selectedContacts, addAll } = this.state;
       if(step === 2){  
        return (
            
            <div className="kt-portlet__body kt-portlet__body--fit">
                <div className="kt-grid">
                    <div className="kt-grid__item kt-grid__item--fluid kt-wizard-v4__wrapper">
                        <form className="kt-form" id="kt_form">
                            <div className="kt-wizard-v4__content" data-ktwizard-type="step-content" data-ktwizard-state="current">
                                <div className="kt-heading kt-heading--md">Add Recipients
                                <div className="float-right">
                                        <button type="button" onClick={this.loadGroups} className="btn btn-secondary btn-elevate btn-sqaure">
                                            <i className="ti-user"></i> Add Contacts from Groups</button>
                                    </div>
                                </div>
                                <div className="kt-form__section kt-form__section--first">
                                    <textarea onChange={this.props.handleAddReceiver} name="receipients" value={this.props.receipients.join(',')} className="form-control" rows="7"></textarea>
                           
                                    <div className="container d-flex justify-content-end fw-400">
                                        <p>{this.props.receipients.length} / 5,000 Recipients Added</p>
                                    </div>
                                    {/* <div className="row ml-1">
                                        <button type="button" onClick={this.loadGroups} className="btn btn-primary btn-outline">Select Contacts from Group</button>
                                    </div> */}
                                </div>
                            </div>
                            <div className="container d-flex justify-content-between">
                                <button type="button" onClick={this.props.handlePrev} className="btn btn-secondary btn-elevate btn-square">   <i className="ti-angle-left"></i> Go Back</button>
                                <button type="button" onClick={this.props.handleNext} className="btn btn-primary btn-elevate btn-square">    Continue   <i className="ti-angle-right"></i></button>
                            </div>
                        </form>
                        <Modal 
                            size="lg"
                            show={showGroupsModal} 
                            onHide={this.handleCloseModal}
                            aria-labelledby="contained-modal-title-vcenter"
                            centered
                            >
                            <ModalHeader closeButton>
                              <span className="text-dark fw-400 mt-3"> {contactsClicked? `${selectedContacts.length} Contacts Selected`: "Groups you have created"} </span>
                               {contactsClicked&& <button className="btn btn-primary btn-elevate btn-square mr-2 ml-3" onClick={this.handleAddAll}><i className='ti-layout-grid2'></i>  { addAll? " Remove All ": " Select All "} </button>}
                            </ModalHeader>
                            <ModalBody>
                                {!loading&&!contactsClicked&&<div class="kt-notification-v2">
                            {groups.map((el, key)=>(
                                                        
                            <div  className="kt-notification-v2__item group-item" key={key + 1}
                                                    >
                          <div className="kt-notification-v2__item-icon">
                            <i className="ti-archive kt-font-primary"></i>
                          </div>
                          <div className="kt-notification-v2__itek-wrapper">
                            <div className="kt-notification-v2__item-title">
                            {el.name}
                            </div>
                         
                            <div className="kt-notification-v2__item-desc">
                            {el.contacts} Contacts Added
                            </div>
                          </div>

                          <div className="pull-right">
                            <button
                              className="btn btn-primary btn-elevate btn-square"  onClick={()=>this.loadContacts(el)}>
                            View Contacts
                            </button>

                          </div>
                        </div>
                          ))}
                        </div>


                                 }
                                {loading&&(
                                    <div className="d-flex justify-content-center align-items-center">
                                        <Spinner animation="border" style={{ alignSelf:'center' }} />
                                    </div>)}

                                    {/*  show contacts of a particular group */}
                                    {contactsClicked&&!loading&&(
                                        <div style={{overflow: "scroll", height: "300px"}}>
                                        <Table className="table">
                                            <thead>
                                                {/* <th>#</th> */}
                                               
                                                <th>Contact</th>
                                                <th>Action</th>
                                            </thead>
                                            <tbody>
                                                {contacts.map((el, key)=> (
                                                    <tr style={{height: 0}}>
                                               
                                                        <td>  <img src={GH_FLAG} alt="" width="16" style={{ margin: "0px 8px" }} />  <span>{el.msisdn} </span> </td>
                                                        <td>
                                                            {!el.added? 
                                                                <button onClick={()=>this.handleChoosecontact(el)} className="btn btn-outline-primary btn-elevate btn-square">Select</button>:
                                                            <button onClick={()=>this.handleChoosecontact(el)} className="btn btn-outline-danger btn-elevate btn-square">Remove</button>}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                        </div>

                                    )}

                            
                            </ModalBody>
                            <ModalHeader>
                                {contactsClicked&&<button onClick={()=>this.setState({ contactsClicked: false })} className="btn btn-secondary btn-elevate btn-square">Back to Groups</button>}
                                {contactsClicked&&(selectedContacts.length > 0)&& <button className="btn btn-primary btn-elevate btn-square" onClick={this.handleSubmitContacts}> <i className="ti-check-box"></i> Use Selected Contacts </button>}

                            </ModalHeader>
                        </Modal>
                    </div>
                </div>
            </div>
        )
        }else{
            return null 
        } 
    }

}

export default Campaigncomponent