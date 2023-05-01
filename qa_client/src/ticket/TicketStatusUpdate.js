import React, { } from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import jwt_decode from "jwt-decode";

import TicketsByStatus from './TicketsByStatus';

import { withTranslation } from 'react-i18next';
import MyTickets from './MyTickets';


const Domain = process.env.REACT_APP_URL;
var userType = "", ResponseStatus = "", NotificationMessage = "";

class TicketStatusUpdate extends React.Component {
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
        status_id: this.state.status_id,
        assigned_to: this.state.assigned_to
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
  IssueChangeHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
    if (event.target.value === "6" || event.target.value === 6) {
      this.setState({ showSisterTicket: true });
    }
    else if (event.target.value === "7" || event.target.value === 7) {
      this.setState({ hiddenAssignedusers: false });

    }
    else {
      this.setState({ hiddenAssignedusers: true });
      this.setState({ showSisterTicket: false });
    }
  }

  mySubmitSisterTicket = async (event) => {
    //event.preventDefault();
    const url = Domain + '/tickets/' + this.props.TicketDetails.id + '/sister';
    if (this.validateForm()) {
      await axios({
        method: 'post',
        url: url,
        data: JSON.stringify({
          asset_tag: this.props.TicketDetails.asset_tag,
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
          NotificationMessage = response.data.message;

        })
        .catch(function (response) {
          //handle error
          console.log("res" + response.error);
        });
      this.setState({ showNotifications: true });
      if (ResponseStatus === true) {
        this.setState({ ShowMain: true });
        this.setState({showSisterTicket:false});
      }

    }
  }

  BackBtnClick = () => {
    // NotificationMessage = '';
    // this.setState({ showNotifications: false });
    const { ShowDetails } = this.state;
    this.setState({ ShowDetails: !ShowDetails });
  }

  render() {
    const { ShowDetails, showNotifications } = this.state;
    if (ShowDetails) {
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
                          <div hidden={this.state.hiddenChangeStatus} >

                            <form class="user" onSubmit={this.mySubmitHandler}>
                              <div class="form-group">

                                <div class="form-group row">
                                  <div class="col-sm-10 mb-3 mb-sm-0">
                                    <label for="status" class="control-label customlabel-textcolor ">Ticket Status:</label>

                                    <select ref="ticket_status" class="form-control customdept-location" onChange={this.IssueChangeHandler} id="status_id" name="status_id">
                                      <option key="" value="">Select Ticket Status</option>
                                      {(() => {
                                        if (this.state.TicketStatusData) {
                                          return (
                                            this.state.TicketStatusData.map(obj => {
                                              return (
                                                <option
                                                  key={obj.id}
                                                  value={obj.id}
                                                  onChange={this.IssueChangeHandler}
                                                >
                                                  {obj.text}
                                                </option>
                                              );
                                            }
                                            )
                                          )
                                        }
                                      })()}
                                    </select><br></br>
                                  </div>
                                </div>

                                <div class="form-group row" hidden={this.state.hiddenAssignedusers}>
                                  <div class="col-sm-10 mb-3 mb-sm-0">
                                    <label for="assignedto" class=" control-label customlabel-textcolor" hidden={this.state.hiddenAssignedusers}> Assigned To:</label>

                                    <select ref="ticket_status" class="form-control customdept-location" onChange={this.myChangeHandler} id="assigned_to" name="assigned_to">
                                      <option key="" value="">Select User</option>
                                      {(() => {
                                        if (this.state.UsersData) {
                                          return (
                                            this.state.UsersData.map(obj => {
                                              return (
                                                <option
                                                  key={obj.id}
                                                  value={obj.id}
                                                  onChange={this.IssueChangeHandler}
                                                >
                                                  {obj.firstName}
                                                </option>
                                              );
                                            })
                                          )
                                        }
                                      })()}
                                    </select><br></br>
                                  </div>
                                </div>
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
                          &nbsp;&nbsp;


                          <Modal show={this.state.showSisterTicket} onHide={() => this.handleModal()}>
                            <Modal.Header closeButton>Create Ticket</Modal.Header>
                            <Modal.Body>
                              <div class="form-group row">

                                <input type="text" class="form-control customdept-location"
                                  name="asset_tag" id="asset_tag" value={this.state.TicketData.asset_tag}
                                  placeholder="Asset Tag Name..." onChange={this.myChangeHandler} required disabled />
                              </div>
                              <div class="form-group row">

                                <textarea class="form-control customdept-location " id="description" name="description" onChange={this.myChangeHandler}
                                  placeholder="Description" />
                              </div>
                              <div class="form-group row ">
                                <textarea class="form-control customdept-location" id="details" name="details" onChange={this.myChangeHandler}
                                  placeholder="Details" />
                              </div>
                              <div class="form-group row ">
                              <select ref="issue_id" class="form-control customdept-location" onChange={this.myChangeHandler} id="issue_id" name="issue_id">
                                <option key="0" value="">Select Ticket Issue</option>
                                {(() => {
                                  if (this.state.IssueData) {
                                    return (
                                      this.state.IssueData.map(obj => {
                                        return (
                                          <option
                                            key={obj.id}
                                            value={obj.id}
                                            onChange={this.myChangeHandler}
                                          >
                                            {obj.text}
                                          </option>
                                        );
                                      })
                                    )
                                  }
                                })()
                                }
                              </select>
                               </div>
                              <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.issue_id}</div>
                            </Modal.Body>
                            <Modal.Footer>
                              <div class="form-group ">
                                <Button onClick={() => { this.mySubmitSisterTicket() }}>
                                  Save
                                </Button >
                                <Button onClick={() => { this.handleModal() }}>
                                  Cancel
                                </Button >
                              </div>
                            </Modal.Footer>
                          </Modal>
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
      if(this.props.mainPage==="myTickets")
      {
        return (
          <MyTickets ticketStatus="99" />
        );
      }
      else{
      if (this.state.TicketStatus === "Open") {
        return (
          <TicketsByStatus ticketStatus="1" />
        );
      }
      if (this.state.TicketStatus === "Inprogress") {
        return (
          <TicketsByStatus ticketStatus="2" />
        );
      }
      else if (this.state.TicketStatus ==="Closed") {
        return (
          <TicketsByStatus ticketStatus="3" />
        );
      }
      else if (this.state.TicketStatus === "Sister Ticket") {
        return (
          <TicketsByStatus ticketStatus="6" />
        );
      }
      else if (this.state.TicketStatus === "Hold") {
        return (
          <TicketsByStatus ticketStatus="5" />
        );
      }
      else if (this.state.TicketStatus === "Escalate") {
        return (
          <TicketsByStatus ticketStatus="4" />
        );
      }
      else if (this.state.TicketStatus === "Escalate") {
        return (
          <TicketsByStatus ticketStatus="4" />
        );
      }
      else{
          return (
            <MyTickets ticketStatus="99" />
          );
        }
      }
    }
  }
};

export default withTranslation()(TicketStatusUpdate);