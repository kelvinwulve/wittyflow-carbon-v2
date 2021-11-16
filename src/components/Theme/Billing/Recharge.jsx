import React, { Component } from "react";
import "./static/recharge.css";
import Button, { ZOOM_IN } from "react-ladda";
import { connect } from "react-redux";
import { get, post } from "../../../services/Transport";
import Status from "../../Generic/Status";
import { NotificationManager } from "react-notifications";

class Recharge extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timer: 5,
      loading: false,
      invoice_success: false,
      recharge_success: false,
      recharge_failed: true,
      user_amount: 0.0,
      tranx_fee: 0.03,
      payment_type: "online",
      payment_type_clicked: false,
      default_sms_rate: this.props.settings
        ? parseFloat(this.props.settings.default_sms_rate)
        : 0.03, //replace with data from api
      gateway_transaction_fee: this.props.settings
        ? parseFloat(this.props.settings.gateway_transaction_fee)
        : 0.03, //replace with data from api
      url: "",
      side: true,
      amount_paid: 0.0,
    };
  }

  componentDidMount() {
    document.title = "Recharge your account - Wittyflow";
    const query = new URLSearchParams(this.props.location.search);
    const invoice_id = query.get("invoice_id");
    if (invoice_id) {
      // alert(invoice_id);
      this.confirmRecharge(invoice_id);
    }
  }

  confirmRecharge = (invoice_id) => {
    console.log("confirming recharge")
    get(`/billing/invoices/retrieve?invoice_id=${invoice_id}`)
      .then((res) => {
        if (res.data.data.status === "PAID") {
          NotificationManager.success("paid");
          this.setState({
            recharge_success: true,
            amount_paid: res.data.data.amount,
            side: false,
          });
        } else {
          this.setState({
            recharge_failed: false,
            side: false,
          });
        }
      })
      .catch((err) => {
        if (err.response) {
          NotificationManager.error(err.response.data.message);
        }
        this.setState({
          recharge_failed: false,
          side: false,
        });
      });
  };

  handleAmountInput = (event) => {
    event.preventDefault();

    const { value } = event.target;

    this.setState({ user_amount: value });
  };


  handlePayment = (e) => {
    const { user_amount, payment_type, payment_type_clicked } = this.state;
    this.setState({ loading: true });
    if (!payment_type_clicked) {
      NotificationManager.warning("Please select your preferred payment type.");
      this.setState({ loading: false });
      return;
    }

    if (user_amount < parseFloat(this.props.settings.min_topup_amount)) {
      NotificationManager.warning(
        "Amount can not be lesser than the required minimum."
      );
      this.setState({ loading: false });
      return;
    }
    // alert(this.state.payment_type);
    post("/billing/invoices/create", {
      amount: user_amount,
      channel: payment_type,
    })
      .then((res) => {
        // alert(JSON.stringify(res.data.data));
        if (res.data.status === "success") {
          this.setState({
            url: res.data.data.redirect_url,
            invoice_success: true,
            side: false,
            loading: false,
          });
        } else {
          this.setState({ loading: false, side: true });
          NotificationManager.error(res.data.message);
        }
      })
      .catch((err) => {
        if (err.response) {
          NotificationManager.error(err.response.data.message);
        }
        this.setState({ loading: false, side: true });
      });
  };

  handlePaymentType = (e) => {
    // alert(e.target.value);
    this.setState({
      payment_type_clicked: true,
      payment_type: e.target.value,
    });
  };

  render() {
    let sms_credits = Math.ceil(
      this.state.user_amount / this.state.default_sms_rate
    );
    let fee = this.state.user_amount * this.state.gateway_transaction_fee; //remeber to replace the 0.03 with the data from system settings
    let tranx_fee = fee.toFixed(2);
    let total_cost = parseFloat(this.state.user_amount) + parseFloat(tranx_fee);

    if (this.state.invoice_success && this.state.payment_type === "online") {
      const interval = setInterval(() => {
        if (this.state.timer > 0) {
          this.setState({ timer: this.state.timer - 1 });
        }
      }, 1000);
      setTimeout(() => {
        clearInterval(interval);
        window.location.href = this.state.url;
      }, 5000);
    }

    return (
      <>
        <div className="row">
          <div className="col-lg-6">
            {/*begin::Portlet*/}
            {!this.state.invoice_success && !this.state.recharge_success && (
              <div className="kt-portlet kt-portlet--mobile">
                <div className="kt-portlet__head">
                  <div className="kt-portlet__head-label">
                    {this.props.settings && (
                      <h3 className="kt-portlet__head-title">
                        Add funds to your account{" "}
                        <small>
                          {" "}
                          Minimum of &cent;{" "}
                          {this.props.settings.min_topup_amount}{" "}
                        </small>
                      </h3>
                    )}
                  </div>
                </div>
                <div className="kt-portlet__body">
                  <div className="amount-box">
                    <div className="how-much-box  mb-3">
                      <h4 className="how-much-header">
                        <span>How much balance would you like to add?</span>
                      </h4>

                      {this.props.settings && (
                        <p className="minimum-amount-p">
                          <span>Minimum</span> GHS&nbsp;
                          {this.props.settings.min_topup_amount}
                        </p>
                      )}
                    </div>

                    <span className="type-amount-span mb-3">
                      <span>Type amount below:</span>
                    </span>
                    <div className="input-group mb-3mt-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">
                          GHS
                        </span>
                      </div>

                      <input
                        type="text"
                        className="form-control"
                        placeholder="Amount"
                        name="amount"
                        onChange={this.handleAmountInput}
                        value={this.state.user_amount}
                      />
                    </div>

                    <div className="mt-5">
                      <h4 className="how-much-header">
                        <span>How will you like to pay?</span>
                      </h4>
                      <span className="type-amount-span mb-4">
                        <span>Select your prefered payment option:</span>
                      </span>{" "}
                      <div className="col-md-12">
                        <div class="form-group">
                          <div class="kt-radio-list">
                            <label class="kt-radio kt-radio--bold kt-radio--brand">
                              <input
                                type="radio"
                                name="payment_channel"
                                value="online"
                                onChange={this.handlePaymentType}
                              />{" "}
                              Pay Online ( MTN Mobile Money, Vodafone Cash,
                              AirtelTigo Money )
                              <i className="input-helper" />
                              <span />
                            </label>

                            <label className="kt-radio kt-radio--bold kt-radio--brand">
                              <input
                                type="radio"
                                className="form-check-input"
                                name="payment_channel"
                                value="offline"
                                onChange={this.handlePaymentType}
                              />{" "}
                              Pay Offline ( Bank Transfer or Deposit )<span />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/*end::Portlet*/}
          </div>

          <div className="col-lg-6">
            {/*begin::Portlet*/}
            {this.state.side && (
              <div className="kt-portlet kt-portlet--mobile">
                <div className="kt-portlet__head">
                  <div className="kt-portlet__head-label">
                    <h3 className="kt-portlet__head-title">Order Summary</h3>
                  </div>
                </div>
                <div className="kt-portlet__body">
                  <div className="order-content-box">
                    <div className="order-content-detail">
                      <div className="order-amount-box">
                        <div className="order-amount-content">
                          <span className="order-amount-key">
                            <span>Order Amount</span>:
                          </span>
                          <h4 className="order-amount-value">
                            GHS&nbsp; {this.state.user_amount}{" "}
                          </h4>
                        </div>

                        <div className="sms-credit-content mt-1">
                          <div className="sms-credit-key-box">
                            <span className="sms-credit-key">
                              <span>Transaction Fee</span>:
                            </span>
                          </div>
                          <h4 className="sms-credit-value">
                            {" "}
                            GHS&nbsp; {tranx_fee}{" "}
                          </h4>
                        </div>

                        <div className="sms-credit-content mt-1">
                          <div className="sms-credit-key-box">
                            <span className="sms-credit-key">
                              <span>SMS Credits</span>:
                            </span>
                          </div>
                          <h4 className="sms-credit-value"> {sms_credits}</h4>
                        </div>
                      </div>

                      <div className="total-amount-box">
                        <div className="css-1p0ipqa-StyledFlex e1u98m330">
                          <h4 className="total-amount-key">
                            <span>Total</span>
                          </h4>
                        </div>
                        <h2 className="total-amount-value">
                          GHS&nbsp;{total_cost.toFixed(4)}
                        </h2>
                      </div>
                      <div className="new-balance-box">
                        <div className="css-1p0ipqa-StyledFlex e1u98m330">
                          <p className="new-balance-key">
                            <span>New balance after payment</span>
                          </p>
                          {this.props.user && (
                            <h5 className="new-balance-email">
                              {this.props.user.user_email}
                            </h5>
                          )}
                        </div>
                        {this.props.user && (
                          <span className="new-balance-value">
                            GHS&nbsp;
                            {this.state.user_amount
                              ? (
                                  parseFloat(this.props.user.balance) +
                                  parseFloat(this.state.user_amount)
                                ).toFixed(2)
                              : this.props.user.balance}
                          </span>
                        )}
                      </div>
                      <Button
                        loading={this.state.loading}
                        data-color="blue"
                        data-style={ZOOM_IN}
                        data-spinner-size={30}
                        data-spinner-color="#ffffff"
                        data-spinner-lines={12}
                        className="ladda-button-primary btn-flat"
                        onClick={this.handlePayment}
                      >
                        Checkout
                      </Button>
                      {/* <span className="checkout-footnote">
                    <span>Any other detail</span>
                  </span> */}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
         
          <div className="col-md-12">
            {!this.state.recharge_success && this.state.invoice_success && (
              <div className="mt-5">
                <div className="amount-box" style={{ textAlign: "center" }}>
                  <Status />
                  <h4 className="how-much-header mt-2">
                    <span>Invoice Created Successfully.</span>
                  </h4>
                  <span className="type-amount-span mb-4">
                    {this.state.payment_type === "online" ? (
                      <span>
                        Please wait while we redirect you to the payment gateway{" "}
                        <br /> to complete your payment...
                      </span>
                    ) : (
                      <span>
                        A Payment instruction has been sent to your email.{" "}
                        <br /> Please check your email to complete your payment
                        offline....
                      </span>
                    )}
                  </span>{" "}
                  {this.state.payment_type === "online" && (
                    <p>Redirecting in {this.state.timer}</p>
                  )}
                </div>
              </div>
            )}

            {this.state.recharge_success && (
              <div className="mt-5">
                <div className="amount-box" style={{ textAlign: "center" }}>
                  <Status />
                  <h4 className="how-much-header mt-2">
                    <span>Recharge Successful.</span>
                  </h4>
                  <span className="type-amount-span mb-4">
                    <span>
                      Your account has been credited with{" "}
                      <span className="text-primary bold">
                        {" "}
                        GHS {this.state.amount_paid}
                      </span>{" "}
                      <br />
                      Your new balance is GHS{" "}
                      <span className="text-primary bold">
                        {" "}
                        GHS {this.props.user.balance}
                      </span>
                    </span>
                  </span>{" "}
                </div>
              </div>
            )}

            {!this.state.recharge_failed && (
              <div className="mt-5">
                <div className="amount-box" style={{ textAlign: "center" }}>
                  <Status status="failed" />
                  <h4 className="how-much-header mt-2">
                    <span>Recharge Failed.</span>
                  </h4>
                  <span className="type-amount-span mb-4">
                    <span>
                      There was an issue processing your order.
                      <br />
                      Please try again or contact{" "}
                      <span className="text-primary">
                        {" "}
                        Customer Support{" "}
                      </span>{" "}
                      for assitance.
                    </span>
                  </span>{" "}
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.auth,
  };
};

export default connect(mapStateToProps)(Recharge);
