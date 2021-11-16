import React, { useEffect, useMemo, useRef } from "react";
import { Chart } from "chart.js";

export default function OrderStatisticsChart(props) {
  const ref = useRef();
  const { brandColor, shape2Color, shape3Color } = {
    brandColor: "#0088fc",
    shape2Color: "#d9dffa",
    shape3Color: "#afb4d4"
  };

  const data = useMemo(
    () => ({
      labels: ["1 Jan", "2 Jan", "3 Jan", "4 Jan", "5 Jan", "6 Jan", "7 Jan"],
      datasets: [
        {
          fill: true,
          // borderWidth: 0,
          backgroundColor: Chart.helpers
            .color(brandColor)
            .alpha(0.6)
            .rgbString(),

          borderColor: Chart.helpers
            .color(brandColor)
            .alpha(0)
            .rgbString(),

          pointHoverRadius: 4,
          pointHoverBorderWidth: 12,
          pointBackgroundColor: Chart.helpers
            .color("#000000")
            .alpha(0)
            .rgbString(),
          pointBorderColor: Chart.helpers
            .color("#000000")
            .alpha(0)
            .rgbString(),
          pointHoverBackgroundColor: brandColor,
          pointHoverBorderColor: Chart.helpers
            .color("#000000")
            .alpha(0.1)
            .rgbString(),

          data: [20, 40, 50, 25, 35, 60, 30]
        },
        {
          fill: true,
          // borderWidth: 0,
          backgroundColor: Chart.helpers
            .color(brandColor)
            .alpha(0.2)
            .rgbString(),
          borderColor: Chart.helpers
            .color(brandColor)
            .alpha(0)
            .rgbString(),

          pointHoverRadius: 4,
          pointHoverBorderWidth: 12,
          pointBackgroundColor: Chart.helpers
            .color("#000000")
            .alpha(0)
            .rgbString(),
          pointBorderColor: Chart.helpers
            .color("#000000")
            .alpha(0)
            .rgbString(),
          pointHoverBackgroundColor: brandColor,
          pointHoverBorderColor: Chart.helpers
            .color("#000000")
            .alpha(0.1)
            .rgbString(),

          data: [25, 45, 55, 30, 40, 65, 35]
        }
      ]
    }),
    [brandColor]
  );

  useEffect(() => {
    // For more information about the chartjs, visit this link
    // https://www.chartjs.org/docs/latest/getting-started/usage.html

    const chart = new Chart(ref.current, {
      data,
      type: "line",
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: false,
        scales: {
          xAxes: [
            {
              categoryPercentage: 0.35,
              barPercentage: 0.7,
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Month"
              },
              gridLines: false,
              ticks: {
                display: true,
                beginAtZero: true,
                fontColor: shape3Color,
                fontSize: 13,
                padding: 10
              }
            }
          ],
          yAxes: [
            {
              categoryPercentage: 0.35,
              barPercentage: 0.7,
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Value"
              },
              gridLines: {
                color: shape2Color,
                drawBorder: false,
                offsetGridLines: false,
                drawTicks: false,
                borderDash: [3, 4],
                zeroLineWidth: 1,
                zeroLineColor: shape2Color,
                zeroLineBorderDash: [3, 4]
              },
              ticks: {
                max: 70,
                stepSize: 10,
                display: true,
                beginAtZero: true,
                fontColor: shape3Color,
                fontSize: 13,
                padding: 10
              }
            }
          ]
        },
        title: {
          display: false
        },
        hover: {
          mode: "ErrorsPage.js"
        },
        tooltips: {
          enabled: true,
          intersect: false,
          mode: "nearest",
          bodySpacing: 5,
          yPadding: 10,
          xPadding: 10,
          caretPadding: 0,
          displayColors: false,
          backgroundColor: brandColor,
          titleFontColor: "#ffffff",
          cornerRadius: 4,
          footerSpacing: 0,
          titleSpacing: 0
        },
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 5,
            bottom: 5
          }
        }
      }
    });

    return () => {
      chart.destroy();
    };
  }, [data, brandColor, shape2Color, shape3Color]);

  return (
    <div className="kt-widget12">
      <div className="kt-widget12__content">
        <div className="kt-widget12__item">
          <div className="kt-widget12__info">
            <span className="kt-widget12__desc">Total Spent Today</span>
            <span className="kt-widget12__value">
              &cent; {props.total_spent_today}
            </span>
          </div>
          <div className="kt-widget12__info">
            <span className="kt-widget12__desc">Delivery Rate</span>
            <span className="kt-widget12__value">{props.delivery_rate}</span>
          </div>
        </div>
        <div className="kt-widget12__item">
          <div className="kt-widget12__info">
            <span className="kt-widget12__desc">Gross Topup Volume</span>
            <span className="kt-widget12__value">
              &cent; {props.topup_volume}
            </span>
          </div>
          <div className="kt-widget12__info">
            <span className="kt-widget12__desc">Revenue Margin</span>
            <div className="kt-widget12__progress">
              <div className="progress kt-progress--sm">
                <div
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuenow={100}
                  aria-valuemax={100}
                  style={{ width: "98%" }}
                  className="progress-bar bg-success"
                />
              </div>
              <span className="kt-widget12__stat">98%</span>
            </div>
          </div>
        </div>
      </div>
      <div className="kt-widget12__chart" style={{ height: "250px" }}>
        <canvas
          ref={ref}
          width={683}
          height={312}
          id="kt_chart_order_statistics"
        />
      </div>
    </div>
  );
}
