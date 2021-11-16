import React, { Component } from "react";
import Slider from "react-slick";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './dashboard.css';
import Chart from "react-apexcharts";
import { get } from "../../../services/Transport";


class Index extends Component {

  constructor(props) {
    super(props);
    this.formatDate = this.formatDate.bind(this);
    this.Last7Days = this.Last7Days.bind(this);
    this.state = {
      gross_message_volume: null,
      succesful_messages: null,
      messages_today: null,
      lifetime_expenditure: null,
      options: {
        chart: {
          id: "basic-bar"
        },
        colors: ['#3c4ccf', '#02a499','#f46a6a'],
        fill: {
          type: 'gradient' 
        },
        xaxis: {
          categories: [],
                  axisBorder: {
                show: true
            },
            axisTicks: {
                show: true
            }
        }, 
         legend: {
                  show: true
              },
        dataLabels: {
            enabled: true
        },
             stroke: {
            show: true,
            curve: 'smooth',
            width: 1.5,
            colors: ['#fff']
        },
                grid: {
            borderColor: '#f8f8fa',
            row: {
                colors: ['transparent', 'transparent',], // takes an array which will be repeated on columns
                opacity: 0.5
            }
        },
      },
      series: [
        {
          name: "Messages Sent",
          data: [],
          type: 'area',
        }
      ],
    //   options: {
    //     chart: {
    //         toolbar: {
    //             show: true,
    //         }
    //     },
    //     colors: ['#3c4ccf', '#02a499','#f46a6a'],
    //     plotOptions: {
    //         bar: {
    //             columnWidth: '35%',
    //             endingShape: 'rounded',
    //             dataLabels: {
    //                 show: true
    //             }
    //         }
    //     },
    //     legend: {
    //         show: true
    //     },
    //     dataLabels: {
    //         enabled: false
    //     },
    //     grid: {
    //         borderColor: '#f8f8fa',
    //         row: {
    //             colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
    //             opacity: 0.5
    //         }
    //     },
    //     stroke: {
    //         show: true,
    //         width: 1.5,
    //         colors: ['#fff']
    //     },
    //     xaxis: {
    //         categories: [],
    //         axisBorder: {
    //             show: true
    //         },
    //         axisTicks: {
    //             show: true
    //         }
    //     }
    // },
    // series: [{
    //     name: 'Messages Sent',
    //     data: []
    // },
  //    {
  //       name: 'Total Delivered',
  //       data: [90, 65, 40, 65, 40, 65, 90, 75]
  //   },
  //   {
  //     name: 'Total Failed',
  //     data: [120, 25, 62, 35, 30, 85, 50, 85]
  // }
  // ],
     total_recharge:0,
     total_used: 0,
     wallet_balance:0,
     contacts_added: 0,
    messages_sent: 0,
    recharge_volume: 0,
    sendernames: 0,
    available_bundle_buckets:0,
    
    };
  }
  componentDidMount() {
    //get wallet details
    get(`/statistics/wallet`).then(res=>{

    
   if(res.data.code == 2000){
      let walletInfo = res.data.data
     //console.log("walletInfo",walletInfo)
      this.setState({
        total_used:walletInfo.total_used,
        total_recharge:walletInfo.total_recharge,
        wallet_balance:walletInfo.wallet_balance,
        available_bundle_buckets:walletInfo.available_bundle_buckets
      })
   }
    }).catch(err=>console.log(err))

    //get usage
    get(`/statistics/usage`).then(res=>{

    //console.log("usage",res)
   if(res.data.code == 2000){
      let usageStats = res.data.data
      this.setState({
        messages_sent: usageStats.messages_sent,
        recharge_volume: usageStats.recharge_volume,
        sendernames: usageStats.sendernames
      })

   }
    }).catch(err=>console.log(err))
    //get user stats messages
    let xaxisValues = []
    let  yaxisValues = []
    
    get(`/statistics/messages?interval=21`).then(res=>{
      
   if(res.data.code == 2000){
      let messageStats = res.data.data.messages_sent
      //console.log("messageStats",messageStats)
      let optionsCopy = JSON.parse(JSON.stringify(this.state.options))
      let seriesCopy = JSON.parse(JSON.stringify(this.state.series))
     
      messageStats.map((value,i)=>{
       
        xaxisValues.push(value.event_date)
        yaxisValues.push(value.count)
        optionsCopy.xaxis.categories = xaxisValues
        seriesCopy[0].data = yaxisValues
        //console.log("mapped value y value",value.count)
      })
      this.setState({options:optionsCopy,series:seriesCopy})
     // console.log("optionsCopy",optionsCopy)
      //console.log("seriesCopy",seriesCopy[0].data)
     // console.log("xaxisValues",xaxisValues)

   }
    }).catch(err=>console.log(err))
    
  }


   formatDate(date){
    var dd = date.getDate();
    var mm = date.getMonth()+1;
    var yyyy = date.getFullYear();
    if(dd<10) {dd='0'+dd}
    if(mm<10) {mm='0'+mm}
    date = mm+'/'+dd+'/'+yyyy;
    return date
 }



 Last7Days () {
    var result = [];
    for (var i=0; i<7; i++) {
        var d = new Date();
        d.setDate(d.getDate() - i);
        result.push( this.formatDate(d) )
    }

    return(result.join(','));
 }



  render() {

    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ]
    };
    const {total_recharge,total_used,wallet_balance,messages_sent,recharge_volume,sendernames,available_bundle_buckets} = this.state

    // console.log('options', this.state.options);
    // console.log('series',this.state.series);
    return (
      <>
        <Helmet>
          <title>Dashboard - Wittyflow</title>
        </Helmet>



{/* START QUARTER & EIGHT ROW*/}

<div className="row">
<div className="col-4 4th-col"> 




<div className="row wallet-row">
<div className="col-12">
         <div className="image-card">
         
         <h3 className='wallet-title  text-dark'><i className="ti-wallet"></i> Wallet Summary</h3>

<div className="balance-row">
    <span className="balance-amount">   <span className='balance-value text-success'>{wallet_balance}</span> <span className='balance-currency text-success'>GHS</span> </span>
<p>Wallet Balance</p>
</div>
 <Link className="btn btn-elevate btn-square col-6 btn-success btn-block glow btn-md mr-2 ripple-btn"
                        // to="/v1/billing/recharge"
                        to="/v1/billing/recharge/payasyougo"
                      >
                        <i class="btn__icon_drip dripcons-effect"></i> Top up your wallet
                      </Link>

                                                <hr className='divider'/>

<div className="balance-stats">
<h5 class="balance-stats-header">Wallet Transactions <span class="text-danger" style={{"fontSize": "12px"}}>(Lifetime)</span></h5>

<div className="row">
  <div className="col-sm-4 col-12 mb-2">
<div className="media">
  <div className="icon-bar">
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
  </div>
  <div className="media-body">
  <h5 class="stats-name">Total Recharge</h5>
  <div class="d-flex align-items-baseline">
    <span class="stats-counter text-primary">{total_recharge}</span>
   </div>
  </div>
</div>

  </div>

  <div className="col-sm-4 col-12 mb-2">
<div className="media">
  <div className="icon-bar">
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
  </div>
  <div className="media-body">
  <h5 class="stats-name">Total Used</h5>
  <div class="d-flex align-items-baseline">
    <span class="stats-counter text-primary">{total_used}</span>
   </div>
  </div>
</div>

  </div>

  <div className="col-sm-4 col-12 mb-2">
<div className="media">
  <div className="icon-bar">
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
  </div>
  <div className="media-body">
  <h5 class="stats-name">Available Bundles</h5>
  <div class="d-flex align-items-baseline">
    <span class="stats-counter text-primary">{available_bundle_buckets}</span>
   </div>
  </div>
</div>

  </div>
</div>




</div>



         </div>

         
          </div>
{/* END WALLET DETAILS */}
</div>


<div className="row">

<div className="col-12">
  <div className="dashboard-card-header">
  <span>What's New ? </span> 
  </div>

</div>

</div>

<div className="row">

<div className="col-12">


<div className=" slider-container slider-row">
<Slider {...settings}>

<div   class="quickLinkBox" >
        <div class="quickLinkCard warningCard">

      <span class="quickLink-badge-text">
        <i></i>
        <b>Sender Names</b>
      </span>

      <div class="quickLink-card-desc">
        Quickly add sender names for approval                                     </div>

      <Link to="/v1/messaging/sendernames"  class="arrowss" tabindex="0">Get started </Link>

      </div>
</div>



{/* <div   class="quickLinkBox" >
        <div class="quickLinkCard primaryCard">

      <span class="quickLink-badge-text">
        <i></i>
        <b>SMS Bundles</b>
      </span>

      <div class="quickLink-card-desc">
       Save more on cheap bundles                                   </div>

      <Link to="/v1/billing/recharge/bundle" class="arrowss" tabindex="0">Buy Bundles </Link>

      </div>
</div> */}



<div   class="quickLinkBox" >
        <div class="quickLinkCard successCard">

      <span class="quickLink-badge-text">
        <i></i>
        <b> USSD Services </b>
      </span>

      <div class="quickLink-card-desc">
        Add USSD to your business offering                                 </div>

      <Link to="/v1/ussd/home"  class="arrowss" tabindex="0">Get USSD Code </Link>

      </div>
</div>




<div   class="quickLinkBox" >
        <div class="quickLinkCard successCard">

      <span class="quickLink-badge-text">
        <i></i>
        <b>Excel Messaging</b>
      </span>

      <div class="quickLink-card-desc">
       Send Personalized SMS from excel files.                              </div>

      <Link to="/v1/messaging/personalised-campaign/" data-name="3" class="arrowss" tabindex="0">Get started </Link>

      </div>
</div>



      </Slider>
</div>
</div>


</div>


</div> 
{/* END 4TH COL */}

<div className="col-8">

<div className="row statistics-row">


<div className="col-md-12 col-lg-6 col-xl-3">

  
                                        <div class="card-body bg-white-shadow">
                                            <div class="icon-rounded icNewDripper float-left m-r-20">
                                                <i class=" icdefcc icon  ti-comment"></i>
                                            </div>
                                            <h6 class="text-muted mlweighless m-t-10">
                                                Messages Sent
                                            </h6>
                                            <h5 class="card-title m-b-5 counter lgcounter" data-count="0">{messages_sent ? messages_sent : 0}  </h5>
                                            
                                                      <div className="progress progress-active-sessions mt-4" style={{"height" :"5px", "marginBottom": "10px"}}>
                                                          <div class="progress-bar bg-primary" id="message__sent__prog" role="progressbar" style={{width: "98%"}} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                                                      </div>
                                                      
                                            
                                        </div> 
                                    </div>


                                    <div className="col-md-12 col-lg-6 col-xl-3">
                                        <div className="card-body bg-white-shadow">
                                            <div className="icon-rounded icNewDripper float-left m-r-20">
                                                <i className=" icdefcc icon  ti-user"></i>
                                            </div>
                                            <h6 className="text-muted mlweighless m-t-10">
                                                Contacts Added
                                            </h6>
                                            <h5 className="card-title m-b-5 counter lgcounter" data-count="0"> {this.props.stats.contacts_added ? this.props.stats.contacts_added : 0} </h5>
                                            
                                            <div className="progress progress-active-sessions mt-4"  style={{"height" :"5px", "marginBottom": "10px"}}>
                                                <div className="progress-bar bg-success" id="message__sent__prog" role="progressbar" style={{width: "78%"}} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                            
                                        </div> 
                                    </div>
                                    <div className="col-md-12 col-lg-6 col-xl-3">
                                        <div className="card-body bg-white-shadow">
                                            <div className="icon-rounded icNewDripper float-left m-r-20">
                                                <i className=" icdefcc icon  ti-layers"></i>
                                            </div>
                                            <h6 className="text-muted mlweighless m-t-10">
                                                 Sender Names
                                            </h6>
                                            <h5 className="card-title m-b-5 counter lgcounter" data-count="0"> {sendernames ? sendernames : 0} </h5>
                                            
                                            <div className="progress progress-active-sessions mt-4"  style={{"height" :"5px", "marginBottom": "10px"}}>
                                                <div className="progress-bar bg-warning" id="message__sent__prog" role="progressbar" style={{width: "640%"}} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                           
                                        </div> 
                                    </div>
                                    <div className="col-md-12 col-lg-6 col-xl-3">
                                        <div class="card-body bg-white-shadow">
                                            <div class="icon-rounded icNewDripper float-left m-r-20">
                                                <i class=" icdefcc icon  ti-bar-chart-alt"></i>
                                            </div>
                                            <h6 class="text-muted mlweighless m-t-10">
                                               Recharge Volume
                                            </h6>
                                              <h5 class="card-title m-b-5 counter lgcounter" data-count="0">{recharge_volume ? recharge_volume : 0}</h5>
                                              <div className="progress progress-active-sessions mt-4"  style={{"height" :"5px", "marginBottom": "10px"}}>
                                                <div className="progress-bar bg-danger" id="message__sent__prog" role="progressbar" style={{width: "640%"}} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                           
                                        </div> 
                                    </div>

                        
</div>
   
{/* END STATISTICS  */}

{/* SMS HISTORY CHART */}
<div className="row">
  <div className="col-12">
    
  <div className="card">
  <div className="dashboard-card-header">
  <span>SMS HISTORY (PAST 3 WEEKS) </span> 
  </div>
    <div className="card-body">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="area"

         
              height="334"
            />
          </div>
          </div>
  </div>
</div>
{/* END SMS HISTORY CHART */}

</div>
{/* END 8TH COL  */}
</div>
        {/* END QUARTER AND EIGHT ROW  */}
     

{/* START WHATS NEW  */}
        <div className="row">
          <div className="col-xl-8 col-lg-8 col-sm-12 col-md-8 col-xs-12 col-sm-12  mt-mobile mg-t-0 mg-b-20">
            {/*begin:: Widgets/Quick Stats*/}








          </div>



        </div>

        {/* END WHATS NEW */}



      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state.auth
  };
};

export default connect(mapStateToProps)(Index);



{/* <div className="mixed-chart">
<Chart
  options={this.state.options}
  series={this.state.series}
  type="bar"
  width="500"
/>
</div> */}