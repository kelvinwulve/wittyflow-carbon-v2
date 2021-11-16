import React from "react";
import { Modal, Table, ModalBody, Spinner } from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";
import { get } from "../../../../services/Transport";
// import Modal from '../Widgets/Modal';
import GH_FLAG from "../../../../static/img/gh.svg";
import { SheetJSFT } from "./getColumns";
import { NotificationManager } from "react-notifications";
import EXCEL_ICON from "../static/excel.png";
class Campaigncomponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.refs.fileUploader.click();
  }

  render() {
    const { step } = this.props;
    if (step === 2) {
      return (
        <div className="kt-portlet__body kt-portlet__body--fit">
          <div className="kt-grid">
            <div className="kt-grid__item kt-grid__item--fluid kt-wizard-v4__wrapper">
              <form className="kt-form" id="kt_form">
                <div
                  className="kt-wizard-v4__content"
                  data-ktwizard-type="step-content"
                  data-ktwizard-state="current"
                >
                  {/* <div className="kt-heading kt-heading--md">
                    Upload Recipients' Data
                  </div> */}

                  <div className="kt-form__section kt-form__section--first">
                    <div className="row">
                      <div className="col-8">
                        <h4 className="mb-3">Excel Upload Guidelines:</h4>
                        <p>
                          Please follow the guide below to ensure a successful
                          Excel File upload for this campaign. <br />
                          You can{" "}
                          <a
                            className="kt-font-primary"
                            href="https://wittyflow-public-assets.s3.amazonaws.com/Wittyflow-Personalized-Campaign-Sample.xlsx"
                            target="_blank"
                          >
                            Download
                          </a>{" "}
                          our sample Excel File and use.
                        </p>
                        <ul style={{ lineHeight: "2em" }}>
                          <li>
                            1. The First row of the Excel File must be the
                            column headers.
                          </li>
                          <li>
                            2. The Excel File must have a maximum of{" "}
                            <strong> 5000 rows </strong>
                            of data and a maximum of<strong> 5 columns</strong>.
                          </li>
                          <li>
                            3. The first column in the Excel File must be the
                            Recipient Mobile Numbers.
                          </li>
                          <li>
                            4. The last four columns in the Excel File can be
                            the customized data for the personalized campaign.
                          </li>
                        </ul>
                      </div>

                      <div className="col-4" style={{ textAlign: "center" }}>
                        <div>
                          <img
                            src={EXCEL_ICON}
                            alt=""
                            width="100"
                            className="mb-2"
                          />
                        </div>

                        <input
                          type="file"
                          className="form-control"
                          onClick={this.props.handleClicked}
                          onChange={this.props.handleFileChange}
                          accept={SheetJSFT}
                          ref="fileUploader"
                          style={{ display: "none" }}
                        />

                        <span
                          className="btn btn-elevate btn-success btn-sqaure mt-5"
                          onClick={this.handleClick}
                        >
                          <i className="ti-cloud-up"></i> Upload Excel File
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="container d-flex justify-content-between">
                  <button
                    type="button"
                    onClick={this.props.handlePrev}
                    className="btn btn-secondary btn-elevate btn-square"
                  >
                    {" "}
                    <i className="ti-angle-left"></i> Go Back
                  </button>
                  <button
                    type="button"
                    onClick={this.props.handleNext}
                    className="btn btn-primary btn-elevate btn-square"
                  >
                    {" "}
                    Continue <i className="ti-angle-right"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Modal */}

          <Modal
            size="lg"
            show={this.props.showModal}
            onHide={this.props.handleCloseShowModal}
          >
            <Modal.Header>
                  Preview Your Uploaded Data
                  <button className="btn btn-primary btn-elevate btn-square" onClick={this.props.handleCloseShowModal}>Continue</button>
            </Modal.Header>
            <Modal.Body>
              <table className="table table-responsive">
                <thead>
                  {this.props.cols.map((el, index) => (
                    <th>{el.toUpperCase()}</th>
                  ))}
                </thead>
                <tbody>
                  {this.props.data.map((value, index) => (
                    <tr>
                      {Object.values(value).map((val, index) => (
                        <td>{val}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </Modal.Body>
          </Modal>

          {/* end of modal */}
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Campaigncomponent;
