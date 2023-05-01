import React, { Component } from 'react';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import { withTranslation } from 'react-i18next'

import Chart from "react-google-charts";

const Domain = process.env.REACT_APP_URL;
var ticketchartdata = [];
class TicketChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value:"en",
      ShowTicket: true,
      hiddenShowTicketChart: true,
    }
  }

  componentDidMount() {
    var token = localStorage.getItem("token");
    var decoded = jwt_decode(token);
    var userType = decoded.userType;
   // userId = decoded.userId;
  
    if (userType === 2) {
      this.setState({ hiddenShowTicketChart: false })
      this.callTicketChartData();
    }

  }
  
  async callTicketChartData() {
    const { t } = this.props;
    ticketchartdata = [];
    const url = Domain + '/dashboard/chart/tickets';
    await axios.get(url)
      .then((response) => {
        var data = response.data;
        // var data={}
        if (Object.keys(data).length === 0 && data.constructor === Object) {
          console.log("data is empty!");
        }
        else {
          ticketchartdata.push(["Tickets", t('chart.ticketstatus')]);
          ticketchartdata.push([t('chart.openticket'), response.data.openCount]);
          ticketchartdata.push([t('chart.inprogressticket'), response.data.inProgressCount]);
          ticketchartdata.push([t('chart.closedticket'), response.data.closeCount]);
          ticketchartdata.push([t('chart.escalateticket'), response.data.escalateCount]);
          ticketchartdata.push([t('chart.sisterticket'), response.data.sisterTicketCount]);
          ticketchartdata.push([t('chart.reassignedticket'), response.data.reassignCount]);
          ticketchartdata.push([t('chart.holdedticket'), response.data.holdCount]);

        }
      });

  }
  onLanguageHandle = (event) => {
    let newLang = event.target.value;
    this.setState({value: newLang})
    this.props.i18n.changeLanguage(newLang)
  }
  render() {
    const { ShowTicket } = this.state;
    const {t} = this.props

    if (ShowTicket) {
      return (
        <div className="customtickets-spacing">
                <div class="row" hidden={this.state.hiddenShowTicketChart}>
            <div class="col-md-6">
              <div class="box box-default">
                <div class="box-header with-border">
                  <h3 class="box-title customchart-title">{t('app.ticketstatus')}</h3>

                </div>

                <div class="box-body">
                  <div class="row">
                    <div class="col-md-12">
                      <div class="chart-responsive">
                        <Chart
                          width={'500px'}
                          height={'300px'}
                          chartType="PieChart"
                          loader={<div>Loading Chart</div>}
                          data={ticketchartdata}
                          options={{
                            //title: 'Tickets By Status',
                            // Just add this option
                            is3D: true,
                          }}
                          rootProps={{ 'data-testid': '2' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-6">
              <div class="box box-default">
                <div class="box-header with-border">
                  <h3 class="box-title customchart-title">{t('app.ticketstatus')}</h3>

                </div>

                <div class="box-body">
                  <div class="row">
                    <div class="col-md-12">
                      <div class="chart-responsive">
                      <Chart
                          width={'500px'}
                          height={'300px'}
                          chartType="BarChart"
                          loader={<div>Loading Chart</div>}
                          data={ticketchartdata}
                          options={{
                            chartArea: { width: '50%' },
                            colors: ['#156b77'],
                            hAxis: {
                              title: t('chart.totalticket'),
                              minValue: 0,
                            },
                            is3D: true,
                          }}
                          rootProps={{ 'data-testid': '3' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> 
          </div>

       
      )

    }
      }

}
export default withTranslation()(TicketChart);
