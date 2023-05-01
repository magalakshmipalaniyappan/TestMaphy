import React, { Component } from 'react';
import TicketCreate from '../ticket/TicketCreate';
import TicketsByStatus from '../ticket/TicketsByStatus';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab'
import jwt_decode from "jwt-decode";
import Switch from "react-switch";
import axios from 'axios';
import TicketChart from './TicketChart';
import { withTranslation } from 'react-i18next'
import MyTickets from './MyTickets';

const Domain = process.env.REACT_APP_URL;
var ticketchartdata = [];
var userType = "", userId = "", talentGroupId = '';
class TicketMain extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value:"en",
      ShowTicket: true,
      ShowCreate: false,
      showAvailableStatus:false,
      showtalentGroupTabs:false,
      hiddenShowTicketChart: true,
      availabilityStatus: false,
      isManager:false
    }
  }

  componentDidMount() {
    var token = localStorage.getItem("token");
    var decoded = jwt_decode(token);
    var userType = decoded.userType;
    userId = decoded.userId;
    talentGroupId = decoded.talentGroupId;
    if(talentGroupId)
    {
      this.setState({showtalentGroupTabs:true})
      if (userType === 1 || userType === "1")  {
        this.setState({ showAvailableStatus: true })
        this.getUserAvailabilityStatus(userId);
      }
      if (userType === 2 || userType === "2") {
       this.setState({isManager:true});
        this.setState({ hiddenShowTicketChart: false })
        this.callTicketChartData();
      }
    }
  

  }
  async getUserAvailabilityStatus(userId) {
    const url = Domain + '/users/' + userId + '/status';
    await axios.get(url)
      .then((response) => {
        console.log("Avail data:" + response.data.availabilityStatus);
        this.setState({ availabilityStatus: response.data.availabilityStatus });
      });
  }
  async callTicketChartData() {
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
          ticketchartdata.push(["Tickets", "Tickets by status"]);
          ticketchartdata.push(["Open Ticket", response.data.openCount]);
          ticketchartdata.push(["Inprogress Ticket", response.data.inProgressCount]);
          ticketchartdata.push(["Closed Ticket", response.data.closeCount]);
          ticketchartdata.push(["Escalate Ticket", response.data.escalateCount]);
          ticketchartdata.push(["Sister Ticket", response.data.sisterTicketCount]);
          ticketchartdata.push(["Reassigned Ticket", response.data.reassignCount]);
          ticketchartdata.push(["Holded Ticket", response.data.holdCount]);

        }
      });

  }
  BackBtnClick = () => {
    this.setState({ ShowTicket: false });
    this.setState({ ShowCreate: false });
    this.setState({ ShowUpdate: false });
    this.setState({ ShowMain: true })
  }
  CreateBtnClick = () => {
    this.setState({ ShowTicket: false });
    this.setState({ ShowCreate: true });
    this.setState({ ShowUpdate: false });
    this.setState({ ShowMain: false })
  }
  handleAvailableChange = async (checked) => {
    var newstatus = "";
    this.setState({ availabilityStatus: checked});
    if (checked)
      newstatus = 1;
    else
      newstatus = 0;
    await axios({
      method: 'put',
      url: Domain + '/users/status/' + userId,
      data: JSON.stringify({ availability_status: newstatus }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        console.log("data:" + response.data.success);
        window.location.reload(false);
      });
  }
 
  render() {
    const { ShowTicket,showAvailableStatus,showtalentGroupTabs,isManager} = this.state;
    const {t} = this.props

    if (ShowTicket) {
      return (
        <div>
     <div className="table-responsive">
            <div>
              <div class="d-sm-flex align-items-center justify-content-between mb-4">
                 <div class="row mb-6">
                 { showAvailableStatus ?  
                  <div class="col">
                   <div>
                     <div>
                      <label htmlFor="normal-switch"> </label>
                     </div>
                     <div>
                     <span><h5 class="custom-available">Available:</h5>
                        <Switch
                          onChange={this.handleAvailableChange}
                          checked={this.state.availabilityStatus}

                          className="react-switch custom-availablebtn"
                          id="normal-switch"
                        />
                        </span>
                     </div>
                    </div>
                    <button onClick={this.CreateBtnClick} className="btn btn-sm btn-primary shadow-sm custom-ticketbtn custommain-title">
                    {t('button.create')}</button>
                     <h4 class=" customhelpdesk-title">{t('app.helpdesk')}</h4>
                    
                  </div>:<div class="col">
                  <button onClick={this.CreateBtnClick} className="btn btn-sm btn-primary shadow-sm custom-ticketbtn custommain-title">
                    {t('button.create')}</button>
                     <h4 class=" customhelpdesk-title">{t('app.helpdesk')}</h4>
                    </div>}
                </div>
              </div>
            </div>
            <Tabs defaultActiveKey="myTickets" id="uncontrolled-tab-example">
            <Tab eventKey="myTickets" title="My Tickets">
                <MyTickets ticketStatus="99" />
              </Tab>
            {(showtalentGroupTabs && isManager)?  
              <Tab eventKey="Open" title="Open">
                <TicketsByStatus ticketStatus="1" />
              </Tab>:null}
              {showtalentGroupTabs ?  <Tab eventKey="InProgress" title="InProgress">
                <TicketsByStatus ticketStatus="2" />
              </Tab>:null}
             {showtalentGroupTabs ?  <Tab eventKey="Hold" title="Hold" >
                <TicketsByStatus ticketStatus="5" />
              </Tab>:null}
              {showtalentGroupTabs ?   <Tab eventKey="Excalate" title="Escalate" >
                <TicketsByStatus ticketStatus="4" />
              </Tab>:null}
              {showtalentGroupTabs ?    <Tab eventKey="SisterTicket" title="SisterTicket" >
                <TicketsByStatus ticketStatus="6" />
              </Tab>:null}
              {showtalentGroupTabs ?   <Tab eventKey="Closed" title="Closed" >
                <TicketsByStatus ticketStatus="3" />
              </Tab>:null}
              { (showtalentGroupTabs && (userType === "2" || userType === 2)) ? <Tab eventKey="Chart" title="Chart" hidden={this.state.hiddenShowTicketChart}>
                <TicketChart />
              </Tab> : null}
            
            </Tabs>
          
          </div>

        </div>
      )

    }
    else
      return (<TicketCreate />)

  }

}
export default withTranslation()(TicketMain);
