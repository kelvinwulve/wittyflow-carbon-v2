import React from 'react';

import Select from 'react-select';

const messageTypes =[
    {
        label:"Flash Message",
        value:0,
    },
    {
        label:"Plain Message",
        value:1,
    },
]

class Campaigncomponent extends React.Component{



    render(){
        const { step } = this.props;
       if(step === 3){  
        return (
            <div class="kt-portlet__body kt-portlet__body--fit">
            <div class="kt-grid">
                <div class="kt-grid__item kt-grid__item--fluid kt-wizard-v4__wrapper">
                    <form class="kt-form" id="kt_form">

                         <div className="kt-heading kt-heading--md">
                      Select Message Type
                    </div>
                    <div className="form-group col-md-4">
               
                      <Select 
                        options={messageTypes}
                        value={{
                        value: this.props.messageType,
                        label: this.props.messageType
                        }}
                        onChange={this.props.handleSelect}
                    />
                      
                    </div>
                        <div class="kt-wizard-v4__content" data-ktwizard-type="step-content" data-ktwizard-state="current">
                            <div class="kt-heading kt-heading--md">Add Message</div>
                            <div class="kt-form__section kt-form__section--first">
                                <textarea name="smsMessage" onChange={this.props.handleAddMessage} value={this.props.smsMessages} className="form-control" rows="7"></textarea>
                                <div placeholder="talk to your receippients" className="container d-flex justify-content-end">
                                    <p> {this.props.smsMessages.length}/765 {this.props.smsPages} SMS</p>
                                </div>
                            </div>
                        </div>
                        <div className="container d-flex justify-content-between">
                            <button type="button" onClick={this.props.handlePrev} className="btn btn-secondary"> <i className="ti-angle-left"></i> Go Back</button>
                            <button type="button" onClick={this.props.handleNext} className="btn btn-primary btn-elevate btn-square">    Preview   <i className="ti-angle-right"></i></button>
                        </div>
                    </form>
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