import React from 'react';
import Button, { ZOOM_IN } from 'react-ladda';
import Iphone from './static/iphone-mockup.png';
import { Modal, Spinner } from 'react-bootstrap';

class Campaigncomponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            contact: [],
            length: 0
        }
    }



    handleChange = e => {
        const { name, value } = e.target;
        var list = [];
        const newvalue = value.replace(/(\r\n|\n|\r)/gm, ",");
        list.push(newvalue.split(","));
        var arrayLength = list.join(",").split(",").length;
        this.setState({
            [name]: newvalue.split(","),
            length: arrayLength
        });
    };

    render() {
        const { step, data } = this.props;
        const { show_preview, contact, length } = this.state;
        if (step === 4) {
            return (
                <>
                    <div class="kt-portlet__body kt-portlet__body--fit">
                        <div class="kt-grid">
                            <div class="kt-grid__item kt-grid__item--fluid">
                                <div className="row campaign-preview-row">
                                    <div class="col-md-5">
                                        <div class="phone-mockup-container">
                                            <div class="phone-container" style={{ backgroundImage: `url(${Iphone})` }}>
                                                <div class="phone-content">
                                                    <p class="sender text-dark mt-3">
                                                        {data.from}
                                                    </p>
                                                    <div class="form-control msg-container ">
                                                        <span dir="auto" class="msg-content" style={{ whiteSpace: "pre-wrap" }}>
                                                            {data.smsMessage}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 campaign-summary">
                                        {/* <form class="kt-form" id="kt_form"> */}
                                        <div class="kt-wizard-v4__content" data-ktwizard-type="step-content" data-ktwizard-state="current">
                                            <div class="kt-heading kt-heading--md">Campaign Summary</div>
                                            <h4 className="text-primary">Message Detail</h4>
                                            <div className="row mb-5">
                                                <div className="col-3">
                                                    <h5> Length</h5>
                                                    <p>{this.props.data.smsMessage.length} Chars</p>
                                                </div>
                                                <div className="col-3">
                                                    <h5> Segments</h5>
                                                    <p>{data.smsPages} Pages</p>
                                                </div>
                                                <div className="col-3">
                                                    <h5>Valid Recipients</h5>
                                                    <p>{data.valid} Contacts</p>
                                                </div>
                                                <div className="col-3">
                                                    <h5>Invalid Recipients</h5>
                                                    <p>{data.invalid} Contacts</p>
                                                </div>
                                            </div>
                                            <h4 className="text-primary">Cost Detail</h4>
                                            <div className="row mb-5">
                                                <div className="col-3">
                                                    <h5>SMS Rate</h5>
                                                    <p>GHS {this.props.user.sms_rate}</p>
                                                </div>
                                                <div className="col-3">
                                                    <h5>Total Cost</h5>
                                                    <p>GHS {(data.valid * data.smsPages * parseFloat(this.props.user.sms_rate)).toFixed(4)}</p>
                                                </div>
                                                <div className="col-3">
                                                    <h5>Current Balance</h5>
                                                    <p>GHS {this.props.user.balance}</p>
                                                </div>
                                                <div className="col-3">
                                                    <h5>Balance After</h5>
                                                    <p>GHS {eval(`${this.props.user.balance} - ${data.valid * data.smsPages * parseFloat(this.props.user.sms_rate)}`).toFixed(4)}</p>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="container d-flex justify-content-between col-12">
                                                    <button type="button" onClick={this.props.handlePrev} className="btn btn-secondary btn-elevate btn-square"> <i className="ti-close"></i> Cancel Campaign</button>
                                                    <button type="button" onClick={this.props.handleOpenPreview} className="btn btn-success btn-elevate btn-square"> <i className="ti-mobile"></i> Send a Preview</button>
                                                    <button type="button" onClick={this.props.handleNext} className="btn btn-primary btn-elevate btn-square"> <i className="ti-location-arrow"></i> Launch Campaign</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <Modal show={data.show_preview} onHide={this.props.handleClosePreview}>
                        <Modal.Header closeButton>
                            <Modal.Title>Send a Preview of this Campaign.</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p className="text-dark">You can send a preview of this campaign to yourself or any other mobile number (10 numbers maximum)</p>

                            <div className="form-group">
                                <label htmlFor="receipients">Add Recipients Number Below:</label>
                                <textarea name="contact" value={contact.join(',')} onChange={this.handleChange} id="" cols="30" rows="7" className="form-control"></textarea>
                                <p className="pull-right mt-1">{length} /10 Recipients Added (Maximum of 10) </p>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            {data.previewing ? <Spinner /> : <button className="btn btn-block btn-primary btn-elevate btn-sqaure" onClick={() => this.props.handlePreview(contact)}>Send Preview</button>}
                        </Modal.Footer>
                    </Modal>
                </>
            )
        }

        return null
    }

}

export default Campaigncomponent