import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import swal from 'sweetalert';
const Domain = process.env.REACT_APP_URL;
var  ResponseStatus = "";
var NotificationMessage="";
class Slack extends React.Component { 
  constructor(props) {
    super(props)
    this.state = {
      showNotifications: false,
      ShowCreate: true,
      errors:{},
    }

  };

  myChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  validateForm() {
    let state = this.state,errors = {},formIsValid = true;
    if (!state["message"]) {
      formIsValid = false;
      errors["message"] = "Please enter message";
    } 
    this.setState({ errors: errors  });
    return formIsValid;
  }
  
  

  mySubmitHandler = async (event) => {
    event.preventDefault();
    if (this.validateForm()) {
    await axios({
      method: 'post',
      url: Domain + '/users/slack',
      data: JSON.stringify({ message: this.state.message }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(function (response) {
        ResponseStatus = response.data.success;
        NotificationMessage=response.data.message;
      })
      .catch(function (response) {
        console.log(response);
      });
     
    if (ResponseStatus)
    { 
      event.target.reset();
      swal("Message sent successfully");
    } 
    else  
       this.setState({ showNotifications: true });
    }
  }
  BackBtnClick = () => {
    const { ShowCreate } = this.state;
    this.setState({ ShowCreate: !ShowCreate });
  }

  render() {
    if (this.state.ShowCreate) {
      return (
        <div>
          <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Slack</h1>
            <button onClick={this.BackBtnClick} className="btn-sm btn-primary shadow-sm  customlogin-btn">
              Back</button>
          </div>
          <div class="container">
            <div class="row justify-content-center">

              <div class="col-xl-10 col-lg-12 col-md-9">

                <div class="card o-hidden border-0 shadow-lg my-5">
                  <div class="card-body p-0">
                    <div class="row">
                      <div class="col-lg-10">
                        <div class="p-4">
                          <div class="box-header with-border">

                          </div>
                          {(() => {

                            if (this.state.showNotifications) {
                              return (
                                <div class="row">
                                  <div class="col-md-12">
                                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                                      <strong>{NotificationMessage}</strong>

                                    </div>


                                  </div>
                                </div>
                              )
                            }


                          })()}

                          <form class="user" onSubmit={this.mySubmitHandler}>


                            <div class="form-group row custom-branding">
                              <div class="col-md-3 ">
                                <label for="message">Message :  <i style={{ color: "red" }}>*</i></label>
                              </div>
                              <div class="col-md-9">
                                <textarea class="form-control" placeholder="Maphy Asset Management" rows="5" name="message" type="text" id="message" onChange={this.myChangeHandler}/>
                                <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.message}</div>
                              </div>   
                            </div>
                            <div class="form-group">
                              <button name="btnCancel" onClick={this.BackBtnClick} class="btn btn-link text-left custom-slack" >Cancel</button>
                              <input type='submit' class=" btn-primary  customlogin-btn" />
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
      return (
        <Redirect to={{
          pathname: '/Admin'
        }}></Redirect>
      );
    }
  }
};

export default Slack;