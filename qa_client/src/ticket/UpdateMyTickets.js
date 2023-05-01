import React, { } from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { withTranslation } from 'react-i18next';
import MyTickets from './MyTickets';


const Domain = process.env.REACT_APP_URL;
var userType = "", ResponseStatus = "", NotificationMessage = "";

class UpdateMyTickets extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ShowMain: false,
      ShowUpdate: true,
      TicketData: "",
      TicketStatusData: [],
      hiddenChangeStatus: true,

      hiddenAssignedusers: true,
      errors: {}
    }
    console.log("this.props.TicketDetails.id", this.props.TicketDetails)
  };

  componentDidMount() {
    // selectedTicket = localStorage.getItem("TicketId");
    var token = localStorage.getItem("token");
    var decoded = jwt_decode(token);
    var talentGroupId = decoded.talentGroupId;
    userType = decoded.userType;

    // var userId = decoded.userId;


    this.callServerData();


    this.getUserDetails(talentGroupId);
    this.loadDropdownValues();
  }
  async callServerData() {
    console.log("this.props.TicketDetails.id", this.props.TicketDetails.id)
    const url = Domain + '/tickets/' + this.props.TicketDetails.id;
    await axios.get(url)
      .then((response) => {
        this.setState({ TicketDate: response.data.created_at.formatted });
        this.setState({ TicketData: response.data });
        this.setState({ TicketStatus: response.data.status });

        if (response.data.status !== "Open" || (this.props.TicketDetails.talentGroup.id)) {
          this.setState({ hiddenChangeStatus: false })
        }
      });
  }
  async getUserDetails(talentGroupId) {
    const getUsersurl = Domain + '/tickets/' + talentGroupId + '/users ';
    await axios.get(getUsersurl)
      .then((response) => {
        this.setState({ UsersData: response.data });
      });
  }

  async loadDropdownValues() {
    const ticketstatusurl = Domain + '/tickets/ticketstatus?userType=' + userType;
    const issueurl = Domain + '/ticketIssues/selectList?page=1';
    const [issue_id, status_id] = await Promise.all([
      axios.get(issueurl),
      axios.get(ticketstatusurl)
    ]);

    this.setState({
      IssueData: issue_id.data.items,
      TicketStatusData: status_id.data.items
    });

  }
  handleModal() {
    this.setState({ showSisterTicket: !this.state.showSisterTicket })
  }
  validateForm() {
    let state = this.state,errors = {},formIsValid = true;
    if (!state["description"]) {
      formIsValid = false;
      errors["description"] = "*Please enter Description.";
    }
    if (!state["issue_id"]) {
      formIsValid = false;
      errors["issue_id"] = "*Please select your issue id.";
    }
    return formIsValid;
  }

  ChangeTicketStatus = async (event) => {

    event.preventDefault();

    await axios({
      method: 'put',
      url: Domain + '/tickets/' + this.props.TicketDetails.id,
      data: JSON.stringify({
        detail: this.state.details,
        status_id: this.props.action==="reopen"?7:3
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        NotificationMessage = response.data.message;
        ResponseStatus=response.data.success;
      })
      .catch(function (response) {
        console.log(response);

      });
    if(ResponseStatus)
    {
      this.setState({ ShowMain: true });
      this.setState({ showSisterTicket: false });
    }
    this.setState({ showNotifications: true });
    
  }

  myChangeHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

   
  BackBtnClick = () => {
    const { ShowUpdate } = this.state;
    this.setState({ ShowUpdate: !ShowUpdate });
  }

  render() {
    const { ShowUpdate, showNotifications } = this.state;
    if (ShowUpdate) {
      return (
        <div>

          <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Update Ticket Status<span></span></h1>
            <button onClick={this.BackBtnClick} className="btn btn-sm btn-primary shadow-sm">
              Back</button>
          </div>
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-xl-10 col-lg-12 col-md-9">
                <div class="card o-hidden border-0 shadow-lg my-5">
                  <div class="card-body p-0">
                    <div class="row">
                      <div class="col-lg-8">
                        <div class="p-4">
                          {(() => {
                            if (showNotifications) {
                              return (
                                <div class="row">
                                  <div class="col-md-12">
                                    <div class="alert alert-success alert-dismissible fade show" role="alert">
                                      <strong> {NotificationMessage}</strong>
                                    </div>
                                  </div>
                                </div>
                              )
                            }
                          })()}
                            <form class="user" onSubmit={this.mySubmitHandler}>
                              <div class="form-group">  
                                <div class="form-group row">
                                  <div class="col-sm-10 mb-3 mb-sm-0">
                                    <label for="status" class=" control-label customlabel-textcolor">Description:</label>
                                    <textarea class="form-control customdept-location" id="details" name="details" rows="5" onChange={this.myChangeHandler}
                                      placeholder="Description" /><br></br>
                                  </div>
                                </div>
                                <button name="btnAssign" class=" btn-primary customticketchange" onClick={this.ChangeTicketStatus} >Change</button>
                              </div>
                            </form>
                        </div>
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
    else {
        return ( <MyTickets ticketStatus="99" />  );
    }
  }
};

export default withTranslation()(UpdateMyTickets);