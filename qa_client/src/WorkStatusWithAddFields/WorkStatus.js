
import React from "react";
import axios from 'axios';
import WorkStatusFields from "./WorkStatusFields";
import WorkStatusMain from "./WorkStatusMain";
var NotificationMessage = "";
var ResponseStatus = "";
const Domain = process.env.REACT_APP_URL;
class WorkStatus extends React.Component {
  state = {
    workStatus: [
      {
        //index: Math.random(),
        fromTime: "",
        toTime: "",
        task: "",
        taskDescription: "",
        status:""
        // showNotifications: false,
        // ShowMain: false,

      }
    ]
  };
  componentDidMount() {
    this.setState({ NotificationMessage: this.props.NotificationMessage });
    this.setState({ showNotifications: this.props.showNotifications });
    this.callServerData(this.state.page);
  }
  handleChange = e => {
    if (
      ["fromTime", "toTime", "task", "taskDescription","status"].includes(
        e.target.name
      )
    ) {
      let workStatus = [...this.state.workStatus];
      workStatus[e.target.dataset.id][e.target.name] = e.target.value;
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };
  callServerData() {
    const url = Domain + '/workstatus/currentTime';
    
    axios.get(url)
      .then((response) => {
        console.log("data:" + response.data.currentTime);
        this.setState({ currentTime: response.data.currentTime });
      });
  }
  handleDateChange = (date) => {
    this.setState("date", date);
  };
  myChangeHandler = (event) => {

    this.setState({ [event.target.name]:event.target.value});
  }
 
  BackBtnClick = () => {
     NotificationMessage = '';
     this.setState({ showNotifications: false });
    const { ShowMain } = this.state;
    this.setState({ ShowMain: !ShowMain });
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    if (this.ValidationForm()) {
      await axios({
        method: 'post',
        url: Domain + '/workstatus',
        data: JSON.stringify({
          details: this.state.workStatus,
         // status:this.state.status
                  }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(function (response) {
          //handle success
          ResponseStatus = response.data.success;
          console.log("res" + response.status, ":", response.data.message);
          NotificationMessage = response.data.message;
          console.log("NotificationMessage" + NotificationMessage);

        })
        .catch(function (response) {
          //handle error
          console.log(response);
        });

      if (ResponseStatus === true) {
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
    const currentTime = this.state.currentTime;
    console.log("server current time", currentTime);

    var utcDateString = (new Date()).toUTCString();
    console.log("utcDateString ", utcDateString);

    // utcTime.toLocaleTimeString();
    var localTime = new Date(utcDateString);
    // var localTime = new Date();
    console.log("local time", localTime);

    let currentHours = localTime.getHours();
    let currentMinute = localTime.getMinutes()
    // const currentHours =  localTime.getHours();
    // const currentMinute =  localTime.getMinutes();
    currentHours = ("0" + currentHours).slice(-2);
    currentMinute = ("0" + currentMinute).slice(-2);
    let currentLocalTime = currentHours + ":" + currentMinute;


    for (var i = 0; i < this.state.workStatus.length; i++) {
      if (this.state.workStatus[i].fromTime === '' || this.state.workStatus[i].toTime === '' || this.state.workStatus[i].task === '' || this.state.workStatus[i].taskDescription === '') {
      //  NotificationMessage = "In row  " + row + " All Fields are required please fill...";
        NotificationMessage =  " All Fields are required please fill...";
        this.setState({ showNotifications: true });
        return false;
      }
      else {
        if (this.state.workStatus[i].fromTime >= this.state.workStatus[i].toTime) {
          //NotificationMessage = "In row  " + row + " From time  must be an less than To time"
          NotificationMessage =" From time  must be an less than To time"
          this.setState({ showNotifications: true });
          return false;
        }
        var myString = this.state.workStatus[i].taskDescription;
        var stringLength = myString.length;
        console.log("stringLength", stringLength)
        if (stringLength > 191) {
         // NotificationMessage = "In row  " + row + " Task description should not be greater than 191 characters"
          NotificationMessage = " Task description should not be greater than 191 characters"
          this.setState({ showNotifications: true });
          return false;
        }
        if (this.state.workStatus[i].toTime > currentLocalTime) {
         // NotificationMessage = "In row  " + row + " To Time must not be greater than current time"
          NotificationMessage =  " To Time must not be greater than current time"
          this.setState({ showNotifications: true });
          return false;
        }
        else {
          NotificationMessage = "";
          this.setState({ showNotifications: false });
        }
      }
    }
    return formIsValid;
  }
  addNewRow = e => {
    this.setState(prevState => ({
      workStatus: [
        ...prevState.workStatus,
        {
          //index: Math.random(),
          fromTime: "",
          toTime: "",
          task: "",
          taskDescription: "",
           status:""
        }
      ],
    }));

  };

  deteteRow = index => {
    this.setState({
      workStatus: this.state.workStatus.filter(
        (s, sindex) => index !== sindex
      )
    });
  };

  clickOnDelete(record) {
    this.setState({
      workStatus: this.state.workStatus.filter(r => r !== record)
    });
  }
  render() {
    let {ShowMain } = this.state;
    if (ShowMain) {

      return (
        <WorkStatusMain  showNotifications={this.state.showNotifications} NotificationMessage={NotificationMessage}/>
      )
    }
    else {
      return (
        <div className="content">
          <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
            <div className="row" style={{ marginTop: 20 }}>
              <div className="col-sm-1" />
              <div className="col-sm-10">
                <h2 className="text-center customworkstatus-title"> Task And Report</h2>
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
                    <WorkStatusFields
                      //handleDateChange={this.handleDateChange}
                     // add={this.addNewRow}
                      //delete={this.clickOnDelete.bind(this)}
                      workStatus={this.state.workStatus}
                    />
                  </div>
                  <div >
                  {/* <div class="col-sm-6 ">
                                <label for="StatusLabelType" class=" control-label customlabel-textcolor">Status</label>
                                <select ref="status" class="form-control" onChange={this.myChangeHandler} id="status"  name="status" required>
                                  <option value="">Status</option>
                                   <option value="inprogress">Inprogress</option>
                                  <option value="pending">Pending</option>
                                  <option value="completed">Completed</option>
                                </select>
                                               </div> */}
                    <button type="submit" className=" btn-primary text-center customworkstatus-formsubmit ">Submit</button>
                    <button onClick={this.BackBtnClick} className=" btn-primary shadow-sm ">
                      Cancel</button>
                  </div>
                </div>
              </div>
              <div className="col-sm-1" />
            </div>
          </form>
        </div>
      );
    }
  }
}
export default WorkStatus;
