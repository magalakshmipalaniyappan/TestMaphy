
import React, { Component } from 'react';

class WorkStatusDetails extends Component {
  constructor(props) {
    super(props)
   this.state = {
    WorkStatusDetails:'',
    
   }
  }

  render() {
    var WorkStatusDetails = JSON.parse(localStorage.getItem("WorkStatusDetails"));


    console.log("WorkStatusDetails",WorkStatusDetails)
    
    return (
       
      <div>
          

          {(() => {
                      if (WorkStatusDetails.details) {
                        return (
                          WorkStatusDetails.details.map(obj => {
                            return (


                              <table width="100%"  >
<h1> Task And Reports</h1>
                                <tr>
                                  <td>From Time</td>
                                  <td>{obj.fromTime}</td>
                                </tr>
                                <tr>
                                  <td>To Time</td>
                                  <td>{obj.toTime}</td>
                                </tr>

                                <tr>
                                  <td>Task</td>
                                  <td>{obj.task}</td>
                                </tr>

                                <tr>
                                  <td>Description</td>
                                  <td>{obj.taskDescription}</td>
                                </tr>
                                <tr>
                                  <td>Status</td>
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
    );
       
    
  }
}

export default WorkStatusDetails;
