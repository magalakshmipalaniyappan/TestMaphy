
import React, { Component } from 'react';
import WorkStatusMain from './WorkStatusMain';

class WorkStatusDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      WorkStatusDetails: '',
      showDetails: true

    }
  }
  BackBtnClick = () => {
    this.setState({ showDetails: false });
  }

  render() {
    var WorkStatusDetails = JSON.parse(localStorage.getItem("WorkStatusDetails"));
    if (this.state.showDetails) {
    return (
      <div className="content">
        <div className="row" style={{ marginTop: 20 }}>
          <div className="col-sm-1" />
          <div className="col-sm-10">
          <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-0 text-gray-800">Task and Report Details</h1>
        <button onClick={this.BackBtnClick} className="btn btn-sm btn-primary shadow-sm">
          Back</button>
      </div>
          <div>          
            {(() => {
            if (WorkStatusDetails.details) {
              return (

                WorkStatusDetails.details.map(obj => {
                  return (


                    <table width="100%"  >
                      <tr>
                        <td width="30%"><b>From Time</b></td>
                        <td>{obj.fromTime}</td>
                      </tr>
                      <tr>
                        <td><b>To Time</b></td>
                        <td>{obj.toTime}</td>
                      </tr>

                      <tr>
                        <td><b>Task</b></td>
                        <td>{obj.task}</td>
                      </tr>

                      <tr>
                        <td><b>Description</b></td>
                        <td>{obj.taskDescription}</td>
                      </tr>
                      <tr>
                        <td><b>Status</b></td>
                        <td>{obj.status}</td>
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
        </div></div>
      );
    }
    else {
      return (<WorkStatusMain></WorkStatusMain>)

    }

  }

}


export default WorkStatusDetails;
