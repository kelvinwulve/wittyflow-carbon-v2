import React, { useState, useContext, useEffect } from 'react'
import "./static/recharge.css";
import Button, { ZOOM_IN } from "react-ladda";
import { connect } from "react-redux";
import BillingCard from './BillingCard';
import { BillingContext } from '../../../redux/BillingContext';
import { post, get } from '../../../services/Transport';
import Status from "../../Generic/Status";

function addCommas(nStr) {
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

function RechargeBundle(props) {
    const {
        user,
        amount,
        transaction_fee,
        sms_credit,
        handlePayment,
        loading,
        setpaymentType,
        paymentType,
        redirectUrl,
        side,
        invoiceSuccess,
        setSide,
        invoiceId

    } = useContext(BillingContext);
    const [bundles, setBundles] = useState([]);
    const [timer, setTimer] = useState(5);
    const [rechargeSuccess, setRechargeSuccess] = useState(false);

    useEffect(() => {
        setSide(true)
       const query = new URLSearchParams(props.location.search);
       console.log("query",props.location)

       const invoice_id = query.get("invoice_id");
       console.log("invoice_id",invoice_id)

        if (invoice_id) {
       alert(invoice_id);
       console.log("invoice_id",invoice_id)
       // this.confirmRecharge(invoice_id);
       }
        get("/bundles/list").then(res => {
          //  console.log(res.data.data);
            setBundles(res.data.data)
        }).catch(err => { })
        
    }, [])

    const new_balance = eval(`${user.balance} + ${amount}`);
    console.log("redirectUrl",redirectUrl)
    console.log("invoiceId",invoiceId)
    useEffect(() => {
        if (invoiceSuccess && paymentType === "online") {
            const interval = setInterval(() => {
              if (timer > 0) {
                setTimer(timer - 1)
              }
            }, 1000);
            setTimeout(() => {
              clearInterval(interval);
              window.location.href = redirectUrl;
            }, 5000);
          }
    
         
     }, [invoiceSuccess])
   


    return (
        <>
            <div className="row">
                <div className="col-lg-8">
                    {/*begin::Portlet*/}
                    { !rechargeSuccess && !invoiceSuccess && (
                         <div className="kt-portlet kt-portlet--mobile">
                         <div className="kt-portlet__head">
                             <div className="kt-portlet__head-label">
                                 <h3 className="kt-portlet__head-title">
                              Select your prefered bundle
                                     {/* <small> Minimum of &cent; {user && settings.min_topup_amount} </small> */}
                                 </h3>
                             </div>
                         </div>
                         
                         <div className="kt-portlet__body row" style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                             {bundles && bundles.map(el => <BillingCard bundle={el} key={el.uuid} />)}
                             {!bundles && (
                                 <div>Loading</div>
                             )}
                         </div>
                     </div>
                    )}
                   

                    {/*end::Portlet*/}

                </div>

                <div className="col-lg-4">
                    {/*begin::Portlet*/}
                    {side && (
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
                                                 GHS&nbsp;
                                                  {addCommas(amount)}
                                             </h4>
                                         </div>
 
                                         <div className="sms-credit-content mt-1">
                                             <div className="sms-credit-key-box">
                                                 <span className="sms-credit-key">
                                                     <span>Transaction Fee</span>:
                             </span>
                                             </div>
                                             <h4 className="sms-credit-value"> GHS&nbsp; {addCommas(transaction_fee)} </h4>
                                         </div>
 
                                         <div className="sms-credit-content mt-1">
                                             <div className="sms-credit-key-box">
                                                 <span className="sms-credit-key">
                                                     <span>SMS Credits</span>:
                             </span>
                                             </div>
                                             <h4 className="sms-credit-value"> {addCommas(sms_credit)}</h4>
                                         </div>
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
                                                             onChange={(e) => setpaymentType(e.target.value)}
                                                         /> Pay Online (
                               MTN Mobile Money, Vodafone Cash, AirtelTigo Money )
                               <i className="input-helper" />
                                                         <span />
                                                     </label>
 
                                                     <label className="kt-radio kt-radio--bold kt-radio--brand">
                                                         <input
                                                             type="radio"
                                                             className="form-check-input"
                                                             name="payment_channel"
                                                             value="offline"
                                                             onChange={(e) => setpaymentType(e.target.value)}
                                                         /> Pay Offline (
                               Bank Transfer or Deposit )<span />
                                                     </label>
                                                 </div>
                                             </div>
                                         </div>
                                     </div>
 
                                     <div className="total-amount-box">
                                         <div className="css-1p0ipqa-StyledFlex e1u98m330">
                                             <h4 className="total-amount-key">
                                                 <span>Total</span>
                                             </h4>
                                         </div>
                                         <h2 className="total-amount-value">GHS&nbsp; {addCommas(parseFloat(transaction_fee) + parseFloat(amount))}</h2>
                                     </div>
                                     <div className="new-balance-box">
                                         <div className="css-1p0ipqa-StyledFlex e1u98m330">
                                             <p className="new-balance-key">
                                                 <span>New balance after payment</span>
                                             </p>
                                             <h5 className="new-balance-email">
                                                 {user && user.user_email}
                                             </h5>
                                         </div>
                                         <span className="new-balance-value">
                                             GHS&nbsp;
                                          {amount ? addCommas(parseFloat(new_balance).toFixed(3)) : addCommas(parseFloat(user.balance).toFixed(3))}
                                         </span>
                                     </div>
                                     <Button
                                         loading={loading}
                                         data-color="blue"
                                         data-style={ZOOM_IN}
                                         data-spinner-size={30}
                                         data-spinner-color="#ffffff"
                                         data-spinner-lines={12}
                                         className="ladda-button-primary btn-flat"
                                         onClick={handlePayment}
                                     >
                                         Checkout
                                   </Button>
 
                                 </div>
                             </div>
                         </div>
                     </div>
                 
                    )}
                   
                </div>
                <div className="col-md-12">
            { !rechargeSuccess && invoiceSuccess && (
              <div className="mt-5">
                <div className="amount-box" style={{ textAlign: "center" }}>
                  <Status />
                  <h4 className="how-much-header mt-2">
                    <span>Invoice Created Successfully.</span>
                  </h4>
                  <span className="type-amount-span mb-4">
                    {paymentType === "online" ? (
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
                  {paymentType === "online" && (
                    <p>Redirecting in {timer}</p>
                  )}
                </div>
              </div>
            )}

            {/* {rechargeSuccess && (
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
                        GHS {props.user.balance}
                      </span>
                    </span>
                  </span>{" "}
                </div>
              </div>
            )} */}

            {/* {!this.state.recharge_failed && (
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
            )} */}
          </div>
            </div>
        </>
    );
}


const mapStateToProps = state => {
    return {
        ...state.auth
    }
}

export default connect(mapStateToProps)(RechargeBundle)

