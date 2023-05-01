import React, { Component } from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { Redirect } from 'react-router-dom';

const Domain = process.env.REACT_APP_URL;
var userType = "", ResponseStatus = "", selectedTicket = "";
//NotificationMessage = "";

class TicketDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ShowMain: false,
      ShowDetails: true,
      TicketData: "",
      TicketStatusData: [],
      status: 'sisterTicket',
      showSisterTicket: false,
      hiddenChangeStatus: true,

      hiddenAssignedusers: true,
      errors: {}
    }
    // console.log("props:",this.props.TicketDetails)
  }


  componentDidMount() {
    selectedTicket = localStorage.getItem("TicketId");
    var token = localStorage.getItem("token");
    var decoded = jwt_decode(token);
    var talentGroupId = decoded.talentGroupId;
    userType = decoded.userType;

    if (selectedTicket) {
      this.callServerData(selectedTicket);
    }

    this.getUserDetails(talentGroupId);
    this.loadDropdownValues();
  }
  async callServerData(selectedTicket, talentGroupId, userId) {
    const url = Domain + '/tickets/' + selectedTicket;
    await axios.get(url)
      .then((response) => {
        this.setState({ TicketDate: response.data.created_at.formatted });
        this.setState({ TicketData: response.data });
        this.setState({ TicketStatus: response.data.status });

        if (response.data.status !== "Open" || (talentGroupId)) {
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

  BackBtnClick = () => {
   // NotificationMessage = '';
    this.setState({ showNotifications: false });
    this.setState({ ShowMain: true });
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
      url: Domain + '/tickets/' + selectedTicket,
      data: JSON.stringify({
        detail: this.state.details,
        status_id: this.state.status_id,
        assigned_to: this.state.assigned_to
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        //handle success
        console.log(response);
        //NotificationMessage = response.data.message;
      })
      .catch(function (response) {
        //handle error
        console.log(response);

      });

    this.setState({ showNotifications: true });
    this.setState({ ShowMain: true });
    this.setState({ showSisterTicket: false })
  }



  myChangeHandler = (event) => {

    this.setState({ [event.target.name]: event.target.value });
  }

  IssueChangeHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
    if (event.target.value === 6) {
      this.setState({ showSisterTicket: true });
    }
    else if (event.target.value === 7) {
      this.setState({ hiddenAssignedusers: false });

    }
    else {
      this.setState({ hiddenAssignedusers: true });
      this.setState({ showSisterTicket: false });
    }
  }

  mySubmitSisterTicket = async (event) => {
    //event.preventDefault();
    const url = Domain + '/tickets/' + this.state.TicketData.id + '/sister';
    if (this.validateForm()) {
      await axios({
        method: 'post',
        url: url,
        data: JSON.stringify({
          asset_tag: this.state.TicketData.asset_tag,
          description: this.state.description,
          details: this.state.details,
          issue_id: this.state.issue_id
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(function (response) {
          //handle success
          ResponseStatus = response.data.success;
          console.log("res" + response.status, ":", response.data.message);
         // NotificationMessage = response.data.message;

        })
        .catch(function (response) {
          //handle error
          console.log("res" + response.error);
        });
      this.setState({ showNotifications: true });
      if (ResponseStatus === true) {
        this.setState({ ShowMain: true });
      }

    }
  }

  render() {
    console.log("props111:", this.state.TicketStatus)

   
    const { ShowMain, ShowDetails } = this.state;
    if (ShowMain) {
      return (
        <Redirect to={{
          pathname: '/TicketMain'
        }}></Redirect>
      )

    }

    else {
      if (ShowDetails) {
        return (

          <div >
               <h1 class="h3 mb-0 text-gray-800 custommain-title">Ticket Details</h1>

            <div class="d-sm-flex align-items-center justify-content-between mb-4">
 
              <button onClick={this.BackBtnClick} className="btn btn-sm btn-primary shadow-sm customticket-backbtn ">
                Back</button>

            </div>
 <div class="container">

                <div class=" row ">
                  <div class="col-sm-6 mb-3 mb-sm-0">

                    <label for="assigned" class=" control-label customlabel-textcolor customticket-assigned">Assigned To&nbsp;&nbsp; &nbsp;   :</label>

                    {this.state.TicketData.assigned}

                  </div>
                </div>
                <div class=" row ">
                  <div class="col-sm-6 mb-3 mb-sm-0">

                    <label for="assigned" class=" control-label customlabel-textcolor customticket-description">Description &nbsp;&nbsp; &nbsp; :</label>

                    {this.state.TicketData.description}

</div>
                  </div>
            <div class="row justify-content-center">
            <div class="row customticket-alignment">

         <div class=" form-group row text-nowrap ">
                                  <div class="row">
                                  <div class="col">
                                    <label for="status" class=" control-label  customticket-detailsUser">User</label>
                             </div>
                              <div class="col">
                                    <label for="status" class=" control-label  customticket-details">Status</label>
                             </div>
                              <div class="col">
                                    <label for="status" class=" control-label  customticket-detailsDate">Date</label>
                             </div>
                                            </div>
                  <div>

                    {(() => {
                      if (this.state.TicketData.details) {
                        return (
                          this.state.TicketData.details.map(obj => {
                            return (
                             <table>
                             <tr><td>
                                <div class="row ">
                                <div class="col">
                                               {obj.user} 
                                  </div>
                               <div class="col">
                                 {obj.status}
                                  </div>
                                   <div class="col">
                                        {obj.date}                                </div>
                                                                 </div>

                            </td>
                            </tr>
                                            </table>
                            );
                          })
                        )
                      }
                    })()
                    }
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
}

export default TicketDetails;