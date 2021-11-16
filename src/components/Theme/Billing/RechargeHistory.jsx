/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { get } from "../../../services/Transport";
import { connect } from "react-redux";
import { signOut, updateUser } from "../carbonActions";
import { Link } from 'react-router-dom';
import "../Messaging/static/datatable-custom.css";


class RechargeHistory extends Component {
  state = {
    invoices: []
  };

  componentWillMount() {
    get("/billing/invoices")
      .then(res => {
       // console.log(res.data.data);
        this.setState({ invoices: res.data.data });
      })
      .catch(err => {
        if (err.response) {
          if (err.response.status === 403) {
            this.props.signOut();
          }
        }
      });
    this.props.updateUser();
  }

  state = {
    allInvoices: [],
    paidInvoices: [],
    messageHeading: "All Invoices",
    gridNumber: 1,
    loading: false
  };
  componentDidMount() {
    let list = [];
    document.title = "Invoices - Wittyflow";
    get(`/billing/invoices`)
      .then(res => {
        if (res.data.code == 2000) {
          const retrivedData = res.data.data;

          if (retrivedData && retrivedData.length > 0) {
            retrivedData.forEach(element => {
              list.push({
                invoice_id: element.invoice_id,
                amount: `GHS ${element.amount}`,
                fees: element.fees,
                payment_channel: element.payment_channel,
                date: element.date,
                status: element.status,
                readable_date: element.readable_date
              });
              return element;
            });

            this.setState({ allInvoices: list });
          } else {
            this.setState({ allInvoices: [] });
          }
        }
      })
      .catch(err => {
        if (err.response) {
          if (err.response.status === 403) {
            this.props.signOut();
          }
        }
        this.setState({ loading: false });
      });
  }

  allInvoices = () => {
    this.setState({
      messageHeading: "All Invoices",
      gridNumber: 1
    });
  };

  paidInvoices = () => {
    if (this.state.allInvoices.length > 0) {
      var paid = this.state.allInvoices.filter(item => item.status == "PAID");

      this.setState({
        messageHeading: "Topup History",
        gridNumber: 2,
        paidInvoices: paid
      });
    }
  };

  render() {
    return (
      <>

        <div className="alert alert-light alert-elevate" role="alert">
          <div className="alert-icon">
            <i className="flaticon-warning kt-font-brand"></i>
          </div>
          <div className="alert-text">
            Here, you'll see an Overview of all your Recharge attempts overtime.
          </div>
        </div>

        <div class="col-xl-12">
          {/* <!--begin:: Widgets/Authors Profit--> */}
          <div class="kt-portlet kt-portlet--bordered-semi kt-portlet--height-fluid">
            <div class="kt-portlet__head">
              <div class="kt-portlet__head-label">
                <h3 class="kt-portlet__head-title">
                  Recharge History
			</h3>
              </div>
              <div class="kt-portlet__head-toolbar">
                <Link 
               // to="/v1/billing/recharge/choice" 
                to="/v1/billing/recharge/payasyougo" 
                class="btn btn-label-brand btn-bold btn-sm" aria-expanded="false">
                  Recharge
		          	</Link>
              </div>
            </div>
            <div class="kt-portlet__body">

              <div className="kt-widget4">

                {this.state.allInvoices && this.state.allInvoices.length > 0 ? (


                  this.state.allInvoices.map((item, i) => {

                    return (
                      <div class="kt-widget4__item" key={i}>
                        <div class="kt-widget4__pic kt-widget4__pic--logo">
                          <span class="kt-widget4__icon">
                            <i class="flaticon2-line-chart kt-font-brand"></i>
                          </span>
                        </div>
                        <div class="kt-widget4__info">
                          <a href="#" class="kt-widget4__title kt-font-brand">
                            {item.status}
                          </a>
                          <p class="kt-widget4__text">
                            {item.readable_date}
                          </p>
                        </div>
                        <span class="kt-widget4__number kt-font-brand">{item.amount}</span>
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

                      <h3>You haven't made any Recharges yet.</h3>
                      <p>
                        Recharge Your account by clicking the button below:
                            </p>
                      <Link
                        //to="/v1/billing/recharge/payasyougo"
                        to="/v1/billing/recharge/choice"
                        className="btn btn-primary"

                      >
                        Recharge Your Account
                            </Link>
                    </div>
                  )

                }

              </div>
            </div>
          </div>
          {/* <!--end:: Widgets/Authors Profit-->    */}

        </div>


      </>
    );
  }
}

export default connect(null, { signOut, updateUser })(RechargeHistory);
