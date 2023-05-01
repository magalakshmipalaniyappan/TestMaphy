import React, { Component } from 'react';
import axios from 'axios';
import Chart from "react-google-charts";
import BootstrapTable from 'react-bootstrap-table-next';
import { withTranslation} from 'react-i18next'
//import { RadialBarChart, RadialBar } from 'recharts';
//import { Doughnut } from 'react-chartjs-2';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import { Link} from 'react-router-dom';
import jwt_decode from "jwt-decode";


const Domain = process.env.REACT_APP_URL;
var chartdata = [];
var ticketchartdata = [];
var licensechartdata = [];
var Userchartdata=[];

const RemoteAll = ({ data, columns }) => (
  <div>
    <ToolkitProvider
      keyField="id"
      data={data}
      columns={columns}
    >
      {toolkitprops => [
        <div className="custom-table custom-alignment">
          <div class="mb-0 custom-tablelayout">
            <BootstrapTable
              {...toolkitprops.baseProps}
              keyField="id"
            />
          </div>
        </div>
      ]}
    </ToolkitProvider>
  </div>
);
class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: "en",
      AssetTotal: 0,
      AccessoriesTotal: 0,
      LicensesTotal: 0,
      ConsumablesTotal: 0,
      ActivityReportData: [],
      ServerChartData: [],
      hiddenShowTicketChart: true,

    }

  }
  componentDidMount() {
   var token = localStorage.getItem("token");
    var decoded = jwt_decode(token);
    var userType = decoded.userType;
    this.callChartData();
    this.callDashboardData();
    this.callRecentActivityData();
    this.callLicenseChartData();
    this.callUserChartData();

    if (userType === "2") {
      this.setState({ hiddenShowTicketChart: false })
      this.callTicketChartData();
    }
  }
  callRecentActivityData() {
    const url = Domain + '/reports/activity';
    
    axios.get(url)
      .then((response) => {
 this.setState({ ActivityReportData: response.data.rows });
      });
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
  async callLicenseChartData() {
    const { t } = this.props;
    licensechartdata = [];
    const url = Domain + '/dashboard/chart/licenses';
    await axios.get(url)
      .then((response) => {
        var data = response.data;
        // var data={}
        if (Object.keys(data).length === 0 && data.constructor === Object) {
          console.log("data is empty!");
        }
        else {
          licensechartdata.push(["Licenses", t('chart.licensecount')]);
          licensechartdata.push([t('chart.totalseats'), response.data.TotalSeats]);
          licensechartdata.push([t('chart.availableseats'), response.data.AvailableSeats]);
          licensechartdata.push([t('chart.assignedseats'), response.data.AssignedSeats]);


        }
      });

  }
  async callUserChartData() {
    const { t } = this.props;
    Userchartdata = [];
    const url = Domain + '/dashboard/chart/users';
    await axios.get(url)
      .then((response) => {
        var data = response.data;
        // var data={}
        if (Object.keys(data).length === 0 && data.constructor === Object) {
          console.log("data is empty!");
        }
        else {
          Userchartdata.push(["Licenses", t('chart.licensecount')]);
          Userchartdata.push([t('chart.totalseats'), response.data.Technician]);
          Userchartdata.push([t('chart.availableseats'), response.data.Manager]);
          Userchartdata.push([t('chart.assignedseats'), response.data.User]);


        }
      });

  }
  async callChartData() {
    const { t } = this.props;
    chartdata = [];
    const url = Domain + '/dashboard/chart';
    await axios.get(url)
      .then((response) => {
        var data = response.data;
        // var data={}
        if (Object.keys(data).length === 0 && data.constructor === Object) {
          console.log("data is empty!");
        }
        else {
          chartdata.push(["Assets", t('chart.assetstatus')]);
          chartdata.push([t('chart.deployable'), response.data.deployableCount]);
          chartdata.push([t('chart.deployed'), response.data.undeployedCount]);
          chartdata.push([t('chart.undeployed'), response.data.deployedCount]);

        }
      });

  }
  callDashboardData() {
    const url = Domain + '/dashboard/';
    axios.get(url)
      .then((response) => {
        this.setState({ AssetTotal: response.data.assetsCount });
        this.setState({ AccessoriesTotal: response.data.accessoriesCount });
        this.setState({ LicensesTotal: response.data.licensesCount });
        this.setState({ ConsumablesTotal: response.data.consumablesCount });
        this.setState({ LicenseExpiredTotal: response.data.licenseExpiredCount });
        this.setState({ LicensesGoingToExpired: response.data.LicensesGoingToExpired });
        
      });
  }

  render() {

    const { ActivityReportData } = this.state;
    const { t } = this.props;

    const columns = [
      {
        dataField: 'created_at.formatted',
        text: 'Date',
        sort: false,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'admin.name',
        text: 'Admin',
        sort: true,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'action_type',
        text: 'Action',
        sort: true,
        headerStyle: { 'white-space': 'nowrap' }
      },

      {
        dataField: 'item.type',
        text: ' Type',
        sort: false,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'item.name',
        text: 'Item',
        sort: false,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'target.name',
        text: 'To',
        sort: false,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'note',
        text: ' Notes',
        sort: false,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'item_Changed',
        text: ' Changed',
        sort: false,
        hidden: true,
        headerStyle: { 'white-space': 'nowrap' }
      },
    ];


    return (

      <div>

     <div class="row">
          <h1 class="mt-4">Dashboard</h1>
          <div class="row">
            <div class="col-xl-2 col-md-6" >
              <div className="card bg-primary text-white" style={{width: '10rem'}}>
                <div class="card-body">
                 <div class="card-text"> {t('app.totalassets')} </div> 
                 <div  class="text-center"  style={{fontSize: 20}}>{this.state.AssetTotal} </div>
                </div>
                <Link to={'./AssetMain'} class="small text-white stretched-link">
                  <div class="card-footer d-flex align-items-center justify-content-between">
                    View Details
                    <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                  </div>
                </Link>

              </div>
            </div>

            <div class="col-xl-2 col-md-6">
              <div className="card bg-success text-white mb-4" style={{width: '10rem'}}>
                <div class="card-body">
                   <div>{t('app.totalaccessory')}</div> 
                   <div class="text-center"  style={{fontSize: 20}}>{this.state.AccessoriesTotal}</div>
                   </div>
                <Link to={'./AccessoriesMain'} class="small text-white stretched-link">

                  <div class="card-footer d-flex align-items-center justify-content-between">
                    View Details
                    <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                  </div>
                </Link>

              </div>
            </div>
            <div class="col-xl-2 col-md-6">
              <div class="card bg-info text-white mb-3" style={{width: '10rem'}}>
                <div class="card-body"> 
                <div>{t('app.totalconsumable')}</div>
                <div  class="text-center" style={{fontSize: 20}}> {this.state.ConsumablesTotal}</div>
                </div>
                <Link to={'./ConsumablesMain'} class="small text-white stretched-link">

                  <div class="card-footer d-flex align-items-center justify-content-between">
                    View Details
                    <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                  </div>
                </Link>

              </div>
            </div>
            <div class="col-xl-2 col-md-6 ">
              <div class="card bg-warning text-white mb-4" style={{width: '10rem'}}>
                <div class="card-body"> 
                <div>{t('app.totallicense')}</div>
                <div  class="text-center"  style={{fontSize: 20}}>{this.state.LicensesTotal}</div>
                </div>

                <Link  class="small text-white stretched-link" to={{  pathname: './LicensesMain', licenseprops: {type:"All" }}}>

                  <div class="card-footer d-flex align-items-center justify-content-between">
                    View Details
                    <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                  </div>
                </Link>

              </div>
            </div>
            <div class="col-xl-2 col-md-6">
              <div class="card bg-dark text-white mb-4" style={{width: '10rem'}}>
                <div className="card-body" >
                <div> {t('app.totallicenseexpired')}</div>
                <div  class="text-center"  style={{fontSize: 20}}>{this.state.LicenseExpiredTotal}</div>
                </div>

                <Link to={{  pathname: './LicensesMain',licenseType:"expired" }} class="small text-white stretched-link">

                  <div class="card-footer d-flex align-items-center justify-content-between">
                    View Details
                    <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                  </div>
                </Link>

              </div>
            </div>
            <div class="col-xl-2 col-md-6">
              <div class="card bg-danger text-white mb-4" style={{width: '10rem'}}>
                <div class="card-body"> 
                  <div> {t('app.licensegoingtoexpire')}</div>
                 <div  class="text-center"  style={{fontSize: 20}}> {this.state.LicensesGoingToExpired}</div>
                 
                </div>
                <Link  class="small text-white stretched-link" to={{  pathname: './LicensesMain', licenseType:"goingtoExpire" }}>

                  <div class="card-footer d-flex align-items-center justify-content-between">

                    View Details
                    <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                  </div>
                </Link>

              </div>
            </div>
          

          </div>
        </div>
 <div class="row">
          <div class="col-lg-6">
            <div class="card mb-4">
              <div class="container">
                <div class="card-header">
                  <i class="fas fa-chart-pie me-1"></i>
                  {t('app.assetstatus')}
                </div>
                <div id="assetpie" class="collapse show">
                  <div class="card-body">
                    <Chart
                      // width={'450px'}
                      // height={'250px'}
                      chartType="PieChart"
                      loader={<div>Loading Chart</div>}
                      data={chartdata}

                      options={{
                        colors: ["purple", "orange", "gray"],
                        is3D: true
                      }}
                      rootProps={{ 'data-testid': '2' }}
                    /></div>

                  <div class="card-footer small text-muted"></div>
                </div>
              </div>

            </div>
          </div>
          <div class="col-lg-6">
            <div class="card mb-4">
              <div class="container">
                <div class="card-header">
                  <i class="fas fa-chart-bar me-1"></i>
                  {t('app.assetstatus')}
                </div>
                {/* <button type="button" class="btn btn-sm customchart-button" data-toggle="collapse" data-target="#assetbar" aria-hidden="true"><i class="fa fa-plus " aria-hidden="true"></i></button> */}
                <div id="assetbar" class="collapse show">
                  <div class="card-body">
                    {/* <Doughnut data={data} /> */}
                    <Chart
                      // width={'450px'}
                      // height={'250px'}
                      chartType="BarChart"
                      loader={<div>Loading Chart</div>}
                      data={chartdata}

                      options={{
                        chartArea: { width: '50%' },
                        colors: ['#156b77'],
                        hAxis: {
                          title: t('chart.totalasset'),
                          minValue: 0,
                        },
                        is3D: true,
                      }}
                      rootProps={{ 'data-testid': '1' }}
                    /></div>

                  <div class="card-footer small text-muted"></div>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div class="row" hidden={this.state.hiddenShowTicketChart} >
          <div class="col-lg-6">
            <div class="card mb-4">
              <div class="container">
                <div class="card-header">
                  <i class="fas fa-chart-pie me-1"></i>
                  {t('app.ticketstatus')}
                </div>
                {/* <button type="button" class="btn btn-sm customchart-button" data-toggle="collapse" data-target="#ticketpie" aria-hidden="true"><i class="fa fa-plus" aria-hidden="true"></i></button> */}
                <div id="ticketpie" class="collapse show">
                  <div class="card-body">
                    <Chart
                      // width={'450px'}
                      // height={'250px'}
                      chartType="PieChart"
                      loader={<div>Loading Chart</div>}
                      data={ticketchartdata}

                      options={{
                        // colors: ["purple", "orange", "gray"],
                        is3D: true
                      }}
                      rootProps={{ 'data-testid': '2' }}
                    /></div>

                  <div class="card-footer small text-muted"></div>
                </div>
              </div>

            </div>
          </div>
          <div class="col-lg-6">
            <div class="card mb-4">
              <div class="container">
                <div class="card-header">
                  <i class="fas fa-chart-bar me-1"></i>
                  {t('app.ticketstatus')}
                </div>
                {/* <button type="button" class="btn btn-sm customchart-button" data-toggle="collapse" data-target="#ticketbar" aria-hidden="true"><i class="fa fa-plus" aria-hidden="true"></i></button> */}
                <div id="ticketbar" class="collapse show">
                  <div class="card-body">
                    {/* <Doughnut data={data} /> */}
                    <Chart
                      // width={'450px'}
                      // height={'250px'}
                      chartType="BarChart"
                      loader={<div>Loading Chart</div>}
                      data={ticketchartdata}

                      options={{
                        chartArea: { width: '50%' },
                        colors: ['#156b77'],
                        hAxis: {
                          title: t('chart.totalasset'),
                          minValue: 0,
                        },
                        is3D: true,
                      }}
                      rootProps={{ 'data-testid': '1' }}
                    /></div>

                  <div class="card-footer small text-muted"></div>
                </div>
              </div>
              {/* <div class="card-header">
                <i class="fas fa-chart-bar me-1"></i>
                {t('app.assetstatus')}
              </div>
              <div class="card-body">
                <Chart
                  width={'450px'}
                  height={'300px'}
                  chartType="BarChart"
                  loader={<div>Loading Chart</div>}
                  data={chartdata}

                  options={{
                    chartArea: { width: '50%' },
                    colors: ['#156b77'],
                    hAxis: {
                      title: t('chart.totalasset'),
                      minValue: 0,
                    },
                    is3D: true,
                  }}
                  rootProps={{ 'data-testid': '1' }}
                /></div>
              <div class="card-footer small text-muted"></div> */}
            </div>
          </div>
        </div>
      
        <div>


          <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h4 mb-0 text-gray-800">{t('app.recentactivity')}</h1>

            <button type="button" class="btn btn-sm " data-toggle="collapse" data-target="#recentcativity" aria-hidden="true"><i class="fa fa-plus" aria-hidden="true"></i></button>
          </div>
          <div id="recentcativity" class="collapse show">
            <div class="row">
              <div class="table-responsive table table-striped">
                <RemoteAll
                  data={ActivityReportData}
                  columns={columns}
                  onTableChange={this.handleTableChange}
                />

              </div>
            </div>
          </div>
        </div>
      </div>

    )

  }
}
export default withTranslation()(Dashboard);
