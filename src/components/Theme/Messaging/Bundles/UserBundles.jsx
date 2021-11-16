import React from "react";
import { get, post } from "../../../../services/Transport";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";

import BundleCard from "./BundleCard";

const bundles =[
  {
    uuid:123456,
    name:'GHs 1000',
    cost:200,
    sms_units:500,
    validity:'24',
    used:'4'
  },
  {
    uuid:67894,
    name:'GHs 400',
    cost:200,
    sms_units:500,
    validity:'24',
    used:'4'
  }
]


class UserBundles extends React.Component {
  state = {
   loading:false
  };

  componentDidMount() {
    document.title = "User Bundles - Wittyflow";
    //this.setState({loading:true})
  }

  componentWillMount() {
    var loadjs = require("loadjs");

    //this styles the select boxes
    loadjs("/external/js/sms-overview.js");
  }


  render() {

    return (
      <div className="row">
      <div className="col-lg-12">
                    {/*begin::Portlet*/}
              
                         <div className="kt-portlet kt-portlet--mobile">
                         <div className="kt-portlet__head">
                             <div className="kt-portlet__head-label">
                                 <h3 className="kt-portlet__head-title">
                              List of bundles you have
                                     {/* <small> Minimum of &cent; {user && settings.min_topup_amount} </small> */}
                                 </h3>
                             </div>
                         </div>
                         
                         <div className="kt-portlet__body row" style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                             {bundles && bundles.map(el => <BundleCard bundle={el} key={el.uuid} />)}
                             {!bundles && (
                                 <div>Loading</div>
                             )}
                         </div>
                     </div>
                
                   

                    {/*end::Portlet*/}

                </div>
      </div>
    );
  }
}

export default UserBundles;
