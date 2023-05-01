import React, { } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { withTranslation } from 'react-i18next'
const Domain = process.env.REACT_APP_URL;
var NotificationMessage = "";
var ResponseStatus = "";
class changepassword extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: "en",
      message: '',
      errors:'',
      ShowCreate: true,
      showNotifications: false
    }
    this.myChangeHandler = this.myChangeHandler.bind(this);
    this.mySubmitHandler = this.mySubmitHandler.bind(this);

  };
  myChangeHandler = (event) => {

    this.setState({ [event.target.name]: event.target.value });
  }
  validate() {
    let state = this.state;
    let errors = {};
    let isValid = true;

    if (!state["currentpassword"]) {
      isValid = false;
      errors["currentpassword"] = "Please enter your password.";
    }

    if (!state["newpassword"]) {
      isValid = false;
      errors["newpassword"] = "Please enter your New Password.";
    }
  
    if (!state["confirm_password"]) {
      isValid = false;
      errors["confirm_password"] = "Please enter your Confirm Password.";
    }
    if (typeof state["confirm_password"] !== "undefined" && typeof state["newpassword"] !== "undefined") {

      if (state["confirm_password"] !== state["newpassword"]) {
        isValid = false;
        errors["confirm_password"] = "New Password and Confirm Password doesn't match.";
      }
    }

    this.setState({
      errors: errors
    });

    return isValid;
  }
  mySubmitHandler = async (event) => {
    event.preventDefault();
    if (this.validate()) {
    await axios({
      method: 'put',
      url: Domain + '/users/changePassword',
      data: JSON.stringify({
        oldPassword: this.state.currentpassword,
        newPassword: this.state.newpassword,
        firmId: 1
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

      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
    this.setState({ showNotifications: true });
    if (ResponseStatus === true) {
      this.setState({ ShowCreate: false });
    }
  }
  }

  BackBtnClick = () => {
    NotificationMessage = '';
    this.setState({ showNotifications: false });
    const { ShowCreate } = this.state;
    this.setState({ ShowCreate: !ShowCreate });
  }

  CancelBtnClick = () => {
    const { ShowCreate } = this.state;
    this.setState({ ShowCreate: !ShowCreate });
  }

  render() {
    const { t } = this.props

    console.log('this is', this)
    const { ShowCreate, showNotifications } = this.state;
    if (ShowCreate) {
      return (
        <div>

          <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800 custommain-title">{t('changepassword.changepassword')}<span></span></h1>
            <button onClick={this.BackBtnClick} className="btn btn-sm btn-primary shadow-sm custommain-title">
              {t('button.back')}</button>
          </div>
          <div class="container">
            <div class="row justify-content-center">
             <div class="col-xl-10 col-lg-12 col-md-9">
                <div class="card o-hidden border-0 shadow-lg my-5">
                  <div class="card-body p-0">
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="p-4">
                          {(() => {

                            if (showNotifications) {
                              return (
                                <div class="row">
                                  <div class="col-md-12">
                                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                                      <strong> {NotificationMessage}</strong>

                                    </div>


                                  </div>
                                </div>
                              )
                            }


                          })()}
                          <form class="user" onSubmit={this.mySubmitHandler}>
                            <div class="form-group row">
                              <label for="text" class=" control-label customlabel-textcolor"> {t('changepassword.currentpassword')}  </label>

                              <input type="password" class="form-control "
                                name="currentpassword" id="currentpassword" aria-describedby="emailHelp" 
                                placeholder="enter Current Password" onChange={this.myChangeHandler}  />
                            </div>
                            <div className="text-danger">{this.state.errors.currentpassword}</div>

                            <div class="form-group row">
                              <label for="text" class=" control-label customlabel-textcolor"> {t('changepassword.newpassword')}  </label>

                              <input type="password" class="form-control "
                                name="newpassword" id="newpassword" aria-describedby="emailHelp"
                                placeholder="enter New Password" onChange={this.myChangeHandler}  />
                            </div>
                            <div className="text-danger">{this.state.errors.newpassword}</div>
                                        <div class="form-group row">
                            <label for="text" class=" control-label customlabel-textcolor"> Confirm Password  </label>

                              <input
                                type="password"
                                name="confirm_password"
                                value={this.state.confirm_password}
                                onChange={this.myChangeHandler}
                                class="form-control"
                                placeholder="Enter confirm password"
                                id="confirm_password" />

                            </div>
                            <div className="text-danger">{this.state.errors.confirm_password}</div>

                            <div class="form-group">
                              <button name="btnCancel" class="btn btn-link text-left" onClick={this.CancelBtnClick} >{t('manufacturers.btnCancel')}</button>

                              <button name='submit' class=" btn-primary customlogin-btn" onClick={this.mySubmitHandler}>{t('manufacturers.submit')}</button>

                              {/* <input type='submit' class="btn btn-primary" /> */}
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
          pathname: '/'
        }}></Redirect>
      )
    }
  }
};

export default withTranslation()(changepassword);