import React, { Component, useMemo } from "react";
import QuickStatsChart from "../Widgets/QuickStatsChart";
import OrderStatisticsChart from "../Widgets/OrderStatisticsChart";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";

const { brandColor, dangerColor, successColor, primaryColor } = {
  brandColor: "#0088fc",
  dangerColor: "#fd3995",
  successColor: "#34bfa3",
  primaryColor: "#5867dd"
};

const chartOptions = {
  chart1: {
    data: [10, 14, 18, 11, 9, 12, 14, 17, 18, 14],
    color: brandColor,
    border: 3
  },

  chart2: {
    data: [11, 12, 18, 13, 11, 12, 15, 13, 19, 15],
    color: dangerColor,
    border: 3
  },

  chart3: {
    data: [12, 12, 18, 11, 15, 12, 13, 16, 11, 18],
    color: successColor,
    border: 3
  },

  chart4: {
    data: [11, 9, 13, 18, 13, 15, 14, 13, 18, 15],
    color: primaryColor,
    border: 3
  }
};

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gross_message_volume: null,
      succesful_messages: null,
      messages_today: null,
      lifetime_expenditure: null
    };
  }
  componentDidMount() {
    this.setState({
      gross_message_volume: this.props.stats && (
        <QuickStatsChart
          value={this.props.stats.message_voume}
          desc="Gross Message Volume"
          data={chartOptions.chart1.data}
          color={chartOptions.chart1.color}
          border={chartOptions.chart1.border}
        />
      ),
      succesful_messages: this.props.stats && (
        <QuickStatsChart
          value={this.props.stats.successful_messages}
          desc="Successful Messages"
          data={chartOptions.chart2.data}
          color={chartOptions.chart2.color}
          border={chartOptions.chart2.border}
        />
      ),
      messages_today: this.props.stats && (
        <QuickStatsChart
          value={this.props.stats.total_sms_today}
          desc="SMS sent today"
          data={chartOptions.chart3.data}
          color={chartOptions.chart3.color}
          border={chartOptions.chart3.border}
        />
      ),
      lifetime_expenditure: this.props.stats && (
        <QuickStatsChart
          value={"GHS " + this.props.stats.lifetime_expenditure}
          desc="Lifetime Expenditure"
          data={chartOptions.chart4.data}
          color={chartOptions.chart4.color}
          border={chartOptions.chart4.border}
        />
      )
    });
  }
  render() {
    return (
      <>
        <Helmet>
          <title>Dashboard - Wittyflow</title>
        </Helmet>

        <div className="row">
          <div className="col-xl-6">
            {/*begin:: Widgets/Quick Stats*/}
            <div className="row row-full-height">
              <div className="col-sm-12 col-md-12 col-lg-6">
                <div className="kt-portlet kt-portlet--height-fluid-half kt-portlet--border-bottom-brand">
                  <div className="kt-portlet__body kt-portlet__body--fluid">
                    {this.props.stats && (
                      <QuickStatsChart
                        value={this.props.stats.message_voume}
                        desc="Gross Message Volume"
                        data={chartOptions.chart1.data}
                        color={chartOptions.chart1.color}
                        border={chartOptions.chart1.border}
                      />
                    )}
                  </div>
                </div>
                <div className="kt-space-20"></div>
                <div className="kt-portlet kt-portlet--height-fluid-half kt-portlet--border-bottom-danger">
                  <div className="kt-portlet__body kt-portlet__body--fluid">
                    {this.props.stats && (
                      <QuickStatsChart
                        value={this.props.stats.successful_messages}
                        desc="Successful Messages"
                        data={chartOptions.chart2.data}
                        color={chartOptions.chart2.color}
                        border={chartOptions.chart2.border}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-md-12 col-lg-6">
                <div className="kt-portlet kt-portlet--height-fluid-half kt-portlet--border-bottom-success">
                  <div className="kt-portlet__body kt-portlet__body--fluid">
                    {this.props.stats && (
                      <QuickStatsChart
                        value={this.props.stats.total_sms_today}
                        desc="SMS sent today"
                        data={chartOptions.chart3.data}
                        color={chartOptions.chart3.color}
                        border={chartOptions.chart3.border}
                      />
                    )}
                  </div>
                </div>
                <div className="kt-space-20"></div>
                <div className="kt-portlet kt-portlet--height-fluid-half kt-portlet--border-bottom-brand">
                  <div className="kt-portlet__body kt-portlet__body--fluid">
                    {this.props.stats && (
                      <QuickStatsChart
                        value={"GHS " + this.props.stats.lifetime_expenditure}
                        desc="Lifetime Expenditure"
                        data={chartOptions.chart4.data}
                        color={chartOptions.chart4.color}
                        border={chartOptions.chart4.border}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/*end:: Widgets/Quick Stats*/}
          </div>
          <div className="col-xl-6">
            {/*begin:: Widgets/Order Statistics*/}
            <div className="kt-portlet kt-portlet--height-fluid">
              <div className="kt-portlet__head">
                <div className="kt-portlet__head-label">
                  <h3 className="kt-portlet__head-title">
                    Lifetime Expenditure
                  </h3>
                </div>
                {/* <div className="kt-portlet__head-toolbar">
                  <a
                    href="#"
                    className="btn btn-label-brand btn-bold btn-sm dropdown-toggle"
                    data-toggle="dropdown"
                  >
                    Export
                  </a>
                  <div className="dropdown-menu dropdown-menu-fit dropdown-menu-right">
                    <ul className="kt-nav">
                      <li className="kt-nav__section kt-nav__section--first">
                        <span className="kt-nav__section-text">
                          Choose an action:
                        </span>
                      </li>
                      <li className="kt-nav__item">
                        <a href="#" className="kt-nav__link">
                          <i className="kt-nav__link-icon flaticon2-graph-1"></i>
                          <span className="kt-nav__link-text">Export</span>
                        </a>
                      </li>
                      <li className="kt-nav__item">
                        <a href="#" className="kt-nav__link">
                          <i className="kt-nav__link-icon flaticon2-calendar-4"></i>
                          <span className="kt-nav__link-text">Save</span>
                        </a>
                      </li>
                      <li className="kt-nav__item">
                        <a href="#" className="kt-nav__link">
                          <i className="kt-nav__link-icon flaticon2-layers-1"></i>
                          <span className="kt-nav__link-text">Import</span>
                        </a>
                      </li>
                      <li className="kt-nav__item">
                        <a href="#" className="kt-nav__link">
                          <i className="kt-nav__link-icon flaticon2-calendar-4"></i>
                          <span className="kt-nav__link-text">Update</span>
                        </a>
                      </li>
                      <li className="kt-nav__item">
                        <a href="#" className="kt-nav__link">
                          <i className="kt-nav__link-icon flaticon2-file-1"></i>
                          <span className="kt-nav__link-text">Customize</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>*/}
              </div>
              <div className="kt-portlet__body kt-portlet__body--fluid">
                {this.props.stats && (
                  <OrderStatisticsChart
                    topup_volume={this.props.stats.topup_volume}
                    delivery_rate={this.props.stats.delivery_rate}
                    total_spent_today={this.props.stats.total_spent_today}
                  />
                )}
              </div>
            </div>

            {/*end:: Widgets/Order Statistics*/}
          </div>
        </div>
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
