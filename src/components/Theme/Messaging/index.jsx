import React, { Component } from "react";
import { Link } from "react-router-dom";
import MAIL_ICON from "./static/mail.svg";
import PHONE_ICON from "./static/phone.png";
import EXCEL_ICON from "./static/excel.png";

const style = {
  // textAlign: "center"
};

export default class index extends Component {
  render() {
    return (
      <>
        <div className="container">
          <div className="row">
            <div class="kt-portlet kt-portlet--mobile">
              <div class="kt-portlet__head">
                <div class="kt-portlet__head-label">
                  <h3 class="kt-portlet__head-title">Select Campaign Type</h3>
                </div>
              </div>
              <div class="kt-portlet__body">
                <div className="row">
                  <div className="col-2"></div>
                  <div className="col-8 mb-5">
                    <div className="row">
                      <div className="col-5" style={style}>
                        <img
                          src={MAIL_ICON}
                          alt=""
                          width="80"
                          className="mb-5"
                        />
                        <h3 className="mb-2">Send Bulk SMS</h3>

                        <p className="mb-4">
                          Do you have your customers contacts already uploaded
                          into Groups?
                          
                        </p>
                        <p> Simply compose a message and send your
                          bulk messages to a target contact group. </p>

                        <Link
                          to="/v1/messaging/campaign-builder"
                          className="btn btn-primary"
                        >
                          Start Bulk Campaign
                        </Link>
                      </div>
                      
                      <div className="col-1"></div>

                      <div className="col-6" >
                        <img
                          src={EXCEL_ICON}
                          alt=""
                          width="170"
                          className="mb-5"
                        />
                        <h3 className="mb-3">Send Personalized SMS</h3>
                        <p className="mb-4">
                          Do you have your customers information in an Excel or
                          CSV file? 
                        </p>

                        <p>
                        Upload this information from an Excel or CSV
                          file and send personalised messages unique to each
                          recipient.
                        </p>

                        <Link
                          to="/v1/messaging/personalised-campaign/"
                          className="btn btn-success"
                        >
                         Start Excel Campaign
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
    );
  }
}
