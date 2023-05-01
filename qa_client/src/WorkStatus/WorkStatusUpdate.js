
import React from "react";
import axios from 'axios';
import WorkStatusMain from "./WorkStatusMain";

// import { NotificationContainer, NotificationManager } from 'react-notifications';
// import { Redirect } from 'react-router-dom';

var NotificationMessage = "";
var ResponseStatus = "";
const Domain = process.env.REACT_APP_URL;
class WorkStatusUpdate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      UpdateDetails: "",
      workStatus: [
        {
          fromTime: "",
          toTime: "",
          task: "",
          taskDescription: "",
          status: ""

        }
      ]
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };
  componentDidMount() {
    this.callServerData(this.state.page);
    var UpdateDetails = JSON.parse(localStorage.getItem("UpdateDetails"));
   //worksttaUpdateDetails.details[0].fromTime});
   let workStatus = [...this.state.workStatus];
    workStatus[0]["toTime"]=UpdateDetails.details[0].toTime;
    workStatus[0]["fromTime"]=UpdateDetails.details[0].fromTime;
    workStatus[0]["task"]=UpdateDetails.details[0].task;
    workStatus[0]["taskDescription"]=UpdateDetails.details[0].taskDescription;
    workStatus[0]["status"]=UpdateDetails.details[0].status;
  }
  handleChange = e => {
    if (
      ["fromTime", "toTime", "task", "taskDescription", "status"].includes(
        e.target.name
      )
    ) {
      let workStatus = [...this.state.workStatus];
      workStatus[0][e.target.name] = e.target.value;
      this.setState({workStatus:workStatus})
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };
  callServerData() {
    const url = Domain + '/workstatus/currentTime';
    axios.get(url)
      .then((response) => {
        this.setState({ currentTime: response.data.currentTime });
      });
  }

  BackBtnClick = () => {
    NotificationMessage = '';
    this.setState({ showNotifications: false });
    const { ShowMain } = this.state;
    this.setState({ ShowMain: !ShowMain });
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    var UpdateDetails = JSON.parse(localStorage.getItem("UpdateDetails"));
    console.log("this.state.workStatus[0].fromTime", this.props.UpdateDetails, UpdateDetails)
    if (this.ValidationForm()) {
      await axios({
        method: 'put',
        url: Domain + '/workstatus/' + this.props.UpdateDetails.id,
        data: JSON.stringify({
          details: this.state.workStatus
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
          console.log(response);
        });

      if (ResponseStatus) {
        this.setState({ showNotifications: true });
        this.setState({ ShowMain: true });

      }
      else {
        this.setState({ showNotifications: true });
      }
    }
  }
  ValidationForm() {
    let formIsValid = true;
    var utcDateString = (new Date()).toUTCString();
    var localTime = new Date(utcDateString);
    let currentHours = localTime.getHours();
    let currentMinute = localTime.getMinutes();
    currentHours = ("0" + currentHours).slice(-2);
    currentMinute = ("0" + currentMinute).slice(-2);
    let currentLocalTime = currentHours + ":" + currentMinute;
    if (this.state.workStatus[0].fromTime === '' || this.state.workStatus[0].toTime === '' || this.state.workStatus[0].task === '' || this.state.workStatus[0].taskDescription === '') {
      NotificationMessage = " All Fields are required please fill...";
      this.setState({ showNotifications: true });
      return false;
    }
    else {
      if (this.state.workStatus[0].fromTime >= this.state.workStatus[0].toTime) {
        NotificationMessage = " From time  must be an less than To time"
        this.setState({ showNotifications: true });
        return false;
      }
      var myString = this.state.workStatus[0].taskDescription;
      var stringLength = myString.length;
      console.log("stringLength", stringLength)
      if (stringLength > 191) {
        NotificationMessage = " Task description should not be greater than 191 characters"
        this.setState({ showNotifications: true });
        return false;
      }
      if (this.state.workStatus[0].toTime > currentLocalTime) {
        NotificationMessage = " To Time must not be greater than current time"
        this.setState({ showNotifications: true });
        return false;
      }
      else {
        NotificationMessage = "";
        this.setState({ showNotifications: false });
      }
    }
    return formIsValid;
  }

  render() {
    let { ShowMain, workStatus } = this.state;
    if (ShowMain) {
      return (
        <WorkStatusMain showNotifications={this.state.showNotifications} NotificationMessage={NotificationMessage} />
      )
    }
    else {
      return (
        <div className="content">
        <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
          <div className="row" style={{ marginTop: 20 }}>
            <div className="col-sm-1" />
            <div className="col-sm-10">
            <div class="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 class="h3 mb-0 text-gray-800">Update Task and Report</h1>
          <button onClick={this.BackBtnClick} className="btn btn-sm btn-primary shadow-sm">
            Back</button>
        </div>
              {(() => {
                if (this.state.showNotifications) {
                  return (
                    <div class="row">
                      <div class="col-md-12">
                        {(NotificationMessage !== "Created successfully") ? <div class="alert alert-danger alert-dismissible fade show" role="alert">
                          <strong> {NotificationMessage}</strong>
                        </div>
                          : <div class="alert alert-success alert-dismissible fade show" role="alert">
                            <strong> {NotificationMessage}</strong>
                          </div>
                        }
                      </div>
                    </div>
                  )
                }
              })()}
              <div className="container">
                <div className="row">
                  <div class="container">
                    <div class="row justify-content-center  customworkstatus-form">
                      <div class="col-xl-10 col-lg-12 col-md-9">
                        <div class="card o-hidden border-0 shadow-lg ">
                          <div class="card-body p-0">
                            <div class="row">
                              <div class="col-xs-12 col-lg-10 col-md-9">
                                <div class="p-4">
                                  <div class="row">
                                    <div class="col-sm-6">
                                      <label for="fromTime" class="control-label customlabel-textcolor">From Time <i style={{ color: "red" }}>*</i></label>
                                      <input
                                        defaultValue="00:00"
                                        type="time"
                                        name="fromTime"
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                        className="form-control "
                                        value={workStatus[0].fromTime}
                                      />
                                     
                                    </div>
                                    <div class="col-sm-6">

                                      <label for="toTime" class="control-label customlabel-textcolor">To Time <i style={{ color: "red" }}>*</i></label>
                                      <input
                                        defaultValue="00:00"
                                        type="time"
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                        className="form-control "
                                        name="toTime"
                                        value={workStatus[0].toTime}
                                      />
                                    </div>
                                   
                                  </div>
                                  <div class="form-group row">
                                    <div class="col-sm-12 mb-3 mb-sm-0">
                                      <label for="task" class="control-label customlabel-textcolor"> Task <i style={{ color: "red" }}>*</i></label>
                                      <textarea class="form-control "
                                        placeholder="Task"
                                        name="task"
                                        rows="4"
                                        value={workStatus[0].task}
                                      />
                                    </div>
                                  </div>
                                  <div class="form-group row">
                                    <div class="col-sm-12 mb-3 mb-sm-0">
                                      <label for="taskDescription" class="control-label customlabel-textcolor"> Task Description <i style={{ color: "red" }}>*</i></label>
                                      <textarea class="form-control "
                                        placeholder="Task Description"
                                        name="taskDescription"
                                        rows="4"
                                        value={workStatus[0].taskDescription}
                                      />                                    
                                    </div>
                                    <div class="form-group row">
                                      <div class="col-sm-12 mb-3 mb-sm-0">
                                        <label for="task" class="control-label customlabel-textcolor"> Status <i style={{ color: "red" }}>*</i></label>
                                        <select
                                          InputLabelProps={{
                                            shrink: true,
                                          }}
                                          className="form-control "
                                          name="status"
                                          value={workStatus[0].status}
                                        >
                                          <option value="">Status</option>

                                          <option value="completed">completed</option>
                                          <option value="pending">pending</option>
                                          <option value="inprogress">inprogress</option>
                                        </select>
                                      </div>
                                     
                                    </div>

                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div></div>
                </div>
                <button type="submit" className=" btn-primary text-center customworkstatus-formsubmit ">Submit</button>
                <button onClick={this.BackBtnClick} className=" btn-primary shadow-sm ">
                  Cancel</button>
              </div>
            </div>
          </div>
        </form>
        <div className="col-sm-1" />
      </div>


      );
    }
  }
}
export default WorkStatusUpdate;
