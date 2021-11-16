import React from "react";
import { get } from "../../../services/Transport";
import { connect } from "react-redux";
import { signOut } from "../carbonActions";
import { Link } from "react-router-dom";
import Select from 'react-select';

class Campaigncomponent extends React.Component {
  state = {
    sendernames: [],
    loading: true
  };

  componentWillMount() {
    get("/sendernames/approved")
      .then(res => {
        this.setState({
          sendernames: res.data.data,
          loading: false
        });
      })
      .catch(err => {
        if (err.response) {
          if (err.response.status === 403) {
            this.props.signOut();
          }
        }
      });
  }

  render() {
    const { step } = this.props;
    const { loading } = this.state;
    const sendernames = this.state.sendernames.reduce((pv, pc, ci)=>{
      const data = {
        value: pc.sendername,
        label: pc.sendername 
      }
      pv.push(data);
      return pv;
    },[])
    if (step === 1) {
      return (
        <div className="kt-portlet__body kt-portlet__body--fit">
          <div className="kt-grid">
            <div class="kt-grid__item kt-grid__item--fluid kt-wizard-v4__wrapper">
              <form className="kt-form">
                {loading ? (
                  <div className="container d-flex flex-column justify-content-center align-items-center">
                    <div>Please wait...</div>
                    <div className="spinner-border text-primary" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                ) : sendernames.length > 0 ? (
                  <div className="">
                    <div className="kt-heading kt-heading--md col-6 mx-auto">
                      Select Sender Name
                    </div>
                    <div className="form-group col-6 mx-auto">
                      <label className="form-label" htmlFor="formGridState">
                        Sender Name
                      </label>
                      <Select 
                        options={sendernames}
                        value={{
                          value: this.props.from,
                          label: this.props.from
                        }}
                        onChange={this.props.handleSelectSender}
                      />
                      <span class="form-text text-muted">
                       This is the sender of the message.
                      </span>
                    </div>
                  </div>
                ) : (
                  <div style={{ textAlign: "center" }} className="mt-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      width="44px"
                      height="44px"
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
                        <polygon points="0 0 24 0 24 24 0 24" />
                        <path
                          d="M12.9336061,16.072447 L19.36,10.9564761 L19.5181585,10.8312381 C20.1676248,10.3169571 20.2772143,9.3735535 19.7629333,8.72408713 C19.6917232,8.63415859 19.6104327,8.55269514 19.5206557,8.48129411 L12.9336854,3.24257445 C12.3871201,2.80788259 11.6128799,2.80788259 11.0663146,3.24257445 L4.47482784,8.48488609 C3.82645598,9.00054628 3.71887192,9.94418071 4.23453211,10.5925526 C4.30500305,10.6811601 4.38527899,10.7615046 4.47382636,10.8320511 L4.63,10.9564761 L11.0659024,16.0730648 C11.6126744,16.5077525 12.3871218,16.5074963 12.9336061,16.072447 Z"
                          fill="#000000"
                          fill-rule="nonzero"
                        />
                        <path
                          d="M11.0563554,18.6706981 L5.33593024,14.122919 C4.94553994,13.8125559 4.37746707,13.8774308 4.06710397,14.2678211 C4.06471678,14.2708238 4.06234874,14.2738418 4.06,14.2768747 L4.06,14.2768747 C3.75257288,14.6738539 3.82516916,15.244888 4.22214834,15.5523151 C4.22358765,15.5534297 4.2250303,15.55454 4.22647627,15.555646 L11.0872776,20.8031356 C11.6250734,21.2144692 12.371757,21.2145375 12.909628,20.8033023 L19.7677785,15.559828 C20.1693192,15.2528257 20.2459576,14.6784381 19.9389553,14.2768974 C19.9376429,14.2751809 19.9363245,14.2734691 19.935,14.2717619 L19.935,14.2717619 C19.6266937,13.8743807 19.0546209,13.8021712 18.6572397,14.1104775 C18.654352,14.112718 18.6514778,14.1149757 18.6486172,14.1172508 L12.9235044,18.6705218 C12.377022,19.1051477 11.6029199,19.1052208 11.0563554,18.6706981 Z"
                          fill="#000000"
                          opacity="0.3"
                        />
                      </g>
                    </svg>

                    <h3>You need an Approved Sender Name to begin with.</h3>
                    <p>
                      Click the button below to create your first Sender Name.
                    </p>
                    <Link
                      to="/v1/messaging/sendernames"
                      class="btn btn-primary"
                    >
                      Add Sender Name
                    </Link>
                  </div>
                )}
                <div className="container d-flex justify-content-end">
                  {sendernames.length > 0 && !loading && (
                    <button
                      type="button"
                      className="btn btn-info  btn-elevate btn-square"
                      onClick={this.props.handleNext}
                    >
                  
                     Continue   <i className="ti-angle-right"></i>
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    }
    return null;
  }
  //
}

export default connect(null, { signOut })(Campaigncomponent);
