import React from "react";
//import TextField from '@material-ui/core/TextField';

const WorkStatusFieldUpdate = props => {
  return props.workStatus.map((val, idx) => {
    let fromTime = `fromTime-${idx}`,
      toTime = `toTime-${idx}`,
      task = `task-${idx}`,
      taskDescription = `taskDescription-${idx}`,
      status = `status-${idx}`;

    var UpdateDetails = JSON.parse(localStorage.getItem("UpdateDetails"));
    console.log("this.state.workStatus[0].fromTime", UpdateDetails)

    return (
      <div className="" key={val.index}>

        <div class="container">
          <div class="row justify-content-center  customworkstatus-form">

            <div class="col-xl-10 col-lg-12 col-md-9">

              <div class="card o-hidden border-0 shadow-lg ">
                <div class="card-body p-0">
                  <div class="row">
                    <div class="col-xs-12 col-lg-10 col-md-9">
                      <div class="p-4">
                        {/* <div >
                              <label class="customlabel1-textcolor">{idx + 1}</label>
                            </div>
     */}
                        <div class="row">
                          <div class="col-sm-6">

                            <label for="fromTime" class="control-label customlabel-textcolor">From Time</label>
                            <input
                              defaultValue="00:00"
                              type="time"
                              name="fromTime"
                              value={UpdateDetails.details[0].fromTime}

                              id={fromTime}
                              data-id={idx}
                              InputLabelProps={{
                                shrink: true,
                              }}
                              className="form-control "
                              required
                            />
                          </div>
                          <div class="col-sm-6">

                            <label for="toTime" class="control-label customlabel-textcolor">To Time</label>
                            <input
                              defaultValue="00:00"
                              type="time"
                              value={UpdateDetails.details[0].toTime}

                              InputLabelProps={{
                                shrink: true,
                              }}
                              className="form-control "
                              name="toTime"
                              id={toTime}
                              data-id={idx}
                              required
                            />
                          </div>
                        </div>

                        <div class="form-group row">
                          <div class="col-sm-12 mb-3 mb-sm-0">
                            <label for="task" class="control-label customlabel-textcolor"> Task</label>
                            <textarea class="form-control "
                              placeholder="Task"
                              name="task"
                              value={UpdateDetails.details[0].task}

                              rows="4"
                              id={task}
                              data-id={idx}
                              required
                            />
                          </div>
                        </div>
                        <div class="form-group row">
                          <div class="col-sm-12 mb-3 mb-sm-0">
                            <label for="taskDescription" class="control-label customlabel-textcolor"> Task Description</label>
                            <textarea class="form-control "
                              placeholder="Task Description"
                              name="taskDescription"
                              value={UpdateDetails.details[0].taskDescription}

                              rows="4"
                              id={taskDescription}
                              data-id={idx}
                              required
                            />
                          </div>

                          <div class="form-group row">
                            <div class="col-sm-12 mb-3 mb-sm-0">
                              <label for="task" class="control-label customlabel-textcolor"> Task</label>

                              <select
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                className="form-control "
                                name="status"
                                value={UpdateDetails.details[0].status}
                                id={status}
                                data-id={idx}
                                required
                              >
                                <option value="">Status</option>

                                <option value="completed">completed</option>
                                <option value="pending">pending</option>
                                <option value="inprogress">inprogress</option>
                              </select>
                            </div>
                          </div>
                          {/* <div class="col-sm-4">
                                {idx === 0 ? (
                                  <button
                                    onClick={() => props.add()}
                                    type="button"
                                    className="btn btn-primary text-center"
                                  >
                                    <i className="fa fa-plus-circle" aria-hidden="true" />
                                  </button>
                                ) : (
                                  <button
                                    className="btn btn-danger"
                                    onClick={() => props.delete(val)}
                                  >
                                    <i className="fa fa-minus" aria-hidden="true" />
                                  </button>
                                )}
                              </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div></div>
      </div>


    );
  });
};
export default WorkStatusFieldUpdate;

