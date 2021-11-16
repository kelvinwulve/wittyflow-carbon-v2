import React, { Component, Children } from 'react';

class Modal extends React.Component{



    constructor(props){

        super(props);

 }




render(){
    return( <div class="modal fade" id="kt_modal_6" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" style={{display:"none"}} aria-hidden="true">
                              <div class="modal-dialog modal-dialog-centered" role="document">
                                  <div class="modal-content">
                                      <div class="modal-header">
                                          <h5 class="modal-title" id="exampleModalLongTitle">{this.props.title}</h5>
                                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                          </button>
                                      </div>
                                      <div class="modal-body">
                                      { this.props.children } 
                                      </div>
                                      <div class="modal-footer">
                                          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                          <button type="button" class="btn btn-primary">Save changes</button>
                                      </div>
                                  </div>
                              </div>
                          </div>
                       
    );
}

}
export default Modal;