import React, { useState, useContext } from 'react'
import { BillingContext } from '../../../redux/BillingContext';

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

export default function BillingCard({ bundle }) {
    const { setAmount, settransaction_fee, setsms_credit, settings, setChosen, chosen } = useContext(BillingContext);

    const [selected, setselected] = useState(false);

    // function formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
    //     try {
    //         decimalCount = Math.abs(decimalCount);
    //         decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    //         // const negativeSign = amount < 0 ? "-" : "";

    //         let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
    //         let j = (i.length > 3) ? i.length % 3 : 0;

    //         return + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
    //     } catch (e) {
    //         console.log(e)
    //     }
    // };

    const handleSelected = e => {
        setselected(!selected)
        setAmount(+bundle.cost)
        settransaction_fee(parseFloat(settings.gateway_transaction_fee) * parseFloat(bundle.cost))
        setsms_credit(bundle.sms_units)
        setChosen(bundle.uuid)
    }
    return (
        <div className="col-xl-4 col-md-4">
            <div class="kt-portlet kt-portlet--height-fluid">
                <div class="kt-portlet__body">
                    <div class="kt-widget kt-widget--user-profile-2">
                        <div class="kt-widget__head">
                            <div class="kt-widget__media">
                                <div class="kt-widget__pic kt-widget__pic--danger kt-font-danger kt-font-boldest  kt-hidden-">
                                    {bundle.name}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="kt-widget__item">
                        <div className="order-amount-box">
                            <div className="sms-credit-content ">
                                <div className="sms-credit-key-box">
                                    <span className="sms-credit-key">
                                        <span>SMS Credits</span>:
                                    </span>
                                </div>
                                <h4 className="sms-credit-value">{addCommas(bundle.sms_units)} </h4>
                            </div>
                            <div className="order-amount-content mt-1">
                                <span className="order-amount-key">
                                    <span>Price</span>:
                          </span>
                                <h4 className="order-amount-value">
                                    GHS&nbsp;
                                                 {addCommas(bundle.cost)}
                                </h4>
                            </div>

                            <div className="sms-credit-content mt-1">
                                <div className="sms-credit-key-box">
                                    <span className="sms-credit-key">
                                        <span>Validity</span>:
                            </span>
                                </div>
                                <h4 className="sms-credit-value">{parseFloat(bundle.validity) / 24} days</h4>
                            </div>


                        </div>


                    </div>
                    <br/>

                    <div class="kt-widget__footer">
                        <button type="button" onClick={handleSelected} class={`btn btn-${chosen !== bundle.uuid ? "brand" : "danger"} btn-elevate btn-square`}>{chosen !== bundle.uuid ? "Select Bundle" : "Selected"}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
