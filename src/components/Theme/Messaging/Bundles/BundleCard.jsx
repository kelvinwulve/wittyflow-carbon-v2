import React from 'react'

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

export default function BundleCard({ bundle }) {



    return (
        <div className="col-xl-4 col-md-4" style={{borderColor:'black'}}>
            <div className="kt-portlet kt-portlet--height-fluid">
                <div className="kt-portlet__body">
                    <div className="kt-widget kt-widget--user-profile-2">
                        <div className="kt-widget__head">
                            <div className="kt-widget__media">
                                <div className="kt-widget__pic kt-widget__pic--danger kt-font-danger kt-font-boldest  kt-hidden-">
                                {bundle.name}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="kt-widget__item">
                        <div className="order-amount-box">
                            <div className="sms-credit-content ">
                                <div className="sms-credit-key-box">
                                    <span className="sms-credit-key">
                                        <span>SMS Credits</span>:
                                    </span>
                                </div>
                                <h4 className="sms-credit-value">{addCommas(bundle.sms_units)} </h4>
                            </div>
                            <div className="sms-credit-content ">
                                <div className="sms-credit-key-box">
                                    <span className="sms-credit-key">
                                        <span>Used Credits</span>:
                                    </span>
                                </div>
                                <h4 className="sms-credit-value">{addCommas(bundle.used)} </h4>
                            </div>
                            <div className="order-amount-content mt-1">
                                <span className="order-amount-key">
                                    <span>Price</span>:
                               </span>
                                <h4 className="order-amount-value">
                                GHS&nbsp; {addCommas(bundle.cost)}
                                </h4>
                            </div>

                            <div className="sms-credit-content mt-1">
                                <div className="sms-credit-key-box">
                                    <span className="sms-credit-key">
                                        <span>Validity</span>:
                            </span>
                                </div>
                                <h4 className="sms-credit-value">{parseFloat(bundle.validity)} days</h4>
                            </div>


                        </div>


                    </div>
                    <br/>

                    {/* <div className="kt-widget__footer">
                        <button type="button" onClick={handleSelected} class={`btn btn-${chosen !== bundle.uuid ? "brand" : "danger"} btn-elevate btn-square`}>{chosen !== bundle.uuid ? "Select Bundle" : "Selected"}</button>
                    </div> */}
                </div>
            </div>
        </div>
    )
}
