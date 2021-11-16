import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import MAIL_ICON from "../Messaging/static/mail.svg";
// import PHONE_ICON from "../Messaging/static/phone.png";
import EXCEL_ICON from "../Messaging/static/excel.png";
// import { AuthContext } from '../../../redux/AuthContext';


const style = {
    textAlign: "center"
};



function RechargeChoice(props) {

    // const { state } = useContext(AuthContext);
    // console.log(state)
    return (
        <>
            <div className="container">
                <div className="row">
                    <div class="kt-portlet kt-portlet--mobile">
                        <div class="kt-portlet__head">
                            <div class="kt-portlet__head-label">
                                <h3 class="kt-portlet__head-title">Select Recharge Type</h3>
                            </div>
                        </div>
                        <div class="kt-portlet__body">
                            <div className="row">
                                <div className="col-2"></div>
                                <div className="col-8 mb-5">
                                    <div className="row">
                                        <div className="col-6" style={style}>
                                            <img
                                                src={MAIL_ICON}
                                                alt=""
                                                width="100"
                                                className="mb-2"
                                            />
                                            <h3 className="mb-2">Bundle</h3>
                                            <p className="mb-4">
                                                Do you have your customers contacts already uploaded
                                                into Groups? Simply compose a message and send your
                                                bulk messages to a target contact group or custom
                                                contacts
                        </p>

                                            <Link
                                                to="/v1/billing/recharge/bundle"
                                                className="btn btn-primary"
                                            >
                                                Bundle
                        </Link>
                                        </div>

                                        <div className="col-6" style={style}>
                                            <img
                                                src={EXCEL_ICON}
                                                alt=""
                                                width="200"
                                                className="mb-2"
                                            />
                                            <h3 className="mb-3">Pay as you go</h3>
                                            <p className="mb-4">
                                                Do you have your customers information in an Excel or
                                                CSV file? Upload this information from an Excel or CSV
                                                file and send personalised messages unique to each
                                                recipient.
                        </p>

                                            <Link
                                                to="/v1/billing/recharge/payasyougo"
                                                className="btn btn-primary">
                                                Pay as you go
                                          </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-2"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RechargeChoice

