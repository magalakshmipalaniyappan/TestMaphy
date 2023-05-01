import React from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import App from './App'

import bgimg from './loginBgImg.jpg'
import { withTranslation} from 'react-i18next'
const Domain = process.env.REACT_APP_URL;

var LoginMessage = '';
var IsLoginValid = false;
var permissions = {};
var NotificationMessage = "";
var ResponseStatus = "";

var NotificationMessage1 = "";
var ResponseStatus1 = "";

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: "en",
      message: '',
      ShowCreate: true,
      showModal: false,
      showNotifications: false,
      showNotifications1: false,
      ShowLoginNotifications: false,
      errors: {}

    }
    this.myChangeHandler = this.myChangeHandler.bind(this);

  };


  validate() {
    let state = this.state;
    let errors = {};
    let isValid = true;


    if (!state["password"]) {
      isValid = false;
      errors["password"] = "Please enter your password";
    }

    if (!state["confirm_password"]) {
      isValid = false;
      errors["confirm_password"] = "Please enter your confirm password";
    }
    if (!state["otp"]) {
      isValid = false;
      errors["otp"] = "Please enter your otp";
    }
    if (typeof state["confirm_password"] !== "undefined" && typeof state["password"] !== "undefined") {

      if (state["confirm_password"] !== state["password"]) {
        isValid = false;
        errors["confirm_password"] = "New Password and Confirm Password don't match";
      }
    }

    this.setState({
      errors: errors
    });

    return isValid;
  }
  LoginValidation() {
    let state = this.state;
    let errors = {};
    let isValid = true;

    if (!state["Email"]) {
      isValid = false;
      errors["Email"] = "Please enter your Email Address.";
    }

    if (typeof state["Email"] !== "undefined") {

      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!pattern.test(state["Email"])) {
        isValid = false;
        errors["Email"] = "Please enter valid Email address.";
      }
    }

    if (!state["Password"]) {
      isValid = false;
      errors["Password"] = "Please Enter Valid Password.";
    }
    this.setState({
      errors: errors
    });

    return isValid;
  }

  emailValidation() {
    let state = this.state;
    let errors = {};
    let isValid = true;

    if (!state["email"]) {
      isValid = false;
      errors["email"] = "Please enter your email Address.";
    }

    if (typeof state["email"] !== "undefined") {

      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!pattern.test(state["email"])) {
        isValid = false;
        errors["email"] = "Please enter valid email address.";
      }
    }

    this.setState({
      errors: errors
    });

    return isValid;
  }
  myChangeHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }
  RegisterBtnClick = () => {
    const { ShowCreate } = this.state;
    this.setState({ ShowCreate: !ShowCreate });
  }
  mySubmitHandler = async (event) => {
    this.setState({ ShowLoginNotifications: "" })
      event.preventDefault();
    if (this.LoginValidation()) {
      const url = Domain + '/users/login';
      ;
      await axios({
        method: 'post',
        url: url,
        data: JSON.stringify({
          email: this.state.Email,
          password: this.state.Password
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(function (response) {
          IsLoginValid = response.data.success;
          LoginMessage = response.data.message;
          permissions = response.data.permissions;
          localStorage.setItem('token', response.data.accessToken);
          localStorage.setItem('permissions', JSON.stringify(response.data.permissions));
          //localStorage.setItem('permissions', response.data.permissions);
          axios.defaults.headers.common['Authorization'] = "Bearer " + response.data.accessToken;
          //axios.defaults.headers.post['Content-Type'] = 'Content-Type': 'application/json'

        })
        .catch(function (response) {
          console.log(response);
        });

      this.setState({ message: IsLoginValid });
      this.setState({ ShowLoginNotifications: true });
      if (IsLoginValid === true) {
        this.setState({ ShowLoginNotifications: "" })

      }
    }

  }
  addModal = async (event) => {
    //  event.preventDefault();
    if (this.emailValidation()) {
      await axios({
        method: 'post',
        url: Domain + '/users/generateotp',
        data: JSON.stringify({
          email: this.state.email,
          firmId: 1,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

        .then(function (response) {
          ResponseStatus = response.data.success;
          NotificationMessage = response.data.message;
        })
        .catch(function (response) {
          console.log(response);
        });
      this.setState({ showNotifications: true });
      if (ResponseStatus) {
        this.setState({ showModal: !this.state.showModal })
        this.setState({ showModalSave: !this.state.showModalSave })
      }
    }
  }
  handleModal() {
    this.setState({ showModal: !this.state.showModal })
  }
  closeButton = () => {
    this.setState({ showModal: !this.state.showModal });
    this.setState({ showNotifications: false });
    this.setState({ email: "" });
    this.setState({ errors: "" });
  }

  addModalSave = async (event) => {
    this.setState({ showNotifications: false });
    if (this.validate()) {
      await axios({
        method: 'put',
        url: Domain + '/users/password/update',
        data: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
          otp: this.state.otp,
          firmId: 1,
        }),
        headers: {
          'Content-Type': 'application/json'
        }

      })
        .then(function (response) {
          ResponseStatus1 = response.data.success;
          NotificationMessage1 = response.data.message;
        })
        .catch(function (response) {
          console.log(response);
        });

      this.setState({ showNotifications1: true });
      if (ResponseStatus1 === true) {
        this.setState({ showModalSave: !this.state.showModalSave })
        this.setState({ email: "" });
        this.setState({ password: "" });
        this.setState({ otp: "" });
        this.setState({ confirm_password: "" });

      }
    }
  }
  handleModalSave() {
    this.setState({ showModalSave: !this.state.showModalSave })
  }
  CancelModalButton = () => {
    this.setState({ showNotifications1: false });
    this.setState({ showModalSave: !this.state.showModalSave });
    this.setState({ errors: "" });
    this.setState({ email: "" });
    this.setState({ password: "" });
    this.setState({ otp: "" });
    this.setState({ confirm_password: "" });
  }
  onLanguageHandle = (event) => {
    let newLang = event.target.value;
    this.setState({ value: newLang })
    this.props.i18n.changeLanguage(newLang)
  }
  renderLanguageDropdown = () => {
    return (
      <div class="col-xs-12 col-sm-6 col-md-4">
        <select ref="language" class="customlogin-selectlanguage" onChange={(e) => this.onLanguageHandle(e)} id="language" value="language" name="language">
          <option key="" value="">Select language</option>
          <option value="en">English</option>
          <option value="tn">Tamil</option>
          {/* <option value="jp">Japanese</option> */}
        </select>
      </div>
    )
  }
  render() {
    const { showNotifications1, showNotifications, ShowLoginNotifications } = this.state;
    const { t } = this.props;

    if (IsLoginValid) {
      return (
        <App permissions={permissions} />
      )
    }
    else {
      if (this.state.ShowCreate) {
        return (
          <div

            style={{
              backgroundImage: 'url(' + bgimg + ')',
              backgroundSize: "cover",
              height: "100vh",
              color: "rgb(21 19 19)"

            }}>
            {this.renderLanguageDropdown()}
            <section class="container-fluid">
              <section class="row justify-content-center">
                <section class="col-12 col-sm-6 col-md-4">

                  <form class="form-container" >

                    <div class="form-group">
                      <h6 class="text-center customlogin-heading">  {t('login.title1')}</h6>
                      <h6 class="text-center customlogin-heading">{t('login.title2')}</h6>

                      <label for="email" class="customlogin-labels"> {t('login.email')}  </label>
                      <input type="text" class="form-control "
                        name="Email" id="Email" aria-describedby="emailHelp"
                        placeholder={t('login.email')} onChange={this.myChangeHandler} required />
                      <span className="text-danger">{this.state.errors.Email}</span>

                    </div>
                    <div class="form-group">
                      <label for="password" class="customlogin-labels"> {t('login.password')} </label>
                      <input type="Password" class="form-control "
                        name="Password" id="Password" aria-describedby="emailHelp"
                        placeholder={t('login.password')} onChange={this.myChangeHandler} required />
                      <span className="text-danger">{this.state.errors.Password}</span>
                    </div>
                    {(() => {

                      if (ShowLoginNotifications) {
                        return (
                          <div class="row">
                            <div class="col-md-12">
                              {(LoginMessage === "Invalid Email or Password") ? <div className="errorMsg" style={{ color: "red" }}>
                                <strong> {LoginMessage}</strong>

                              </div>
                                : null

                              }

                            </div>
                          </div>
                        )
                      }


                    })()}
                    {/* <div className="errorMsg" style={{ color: "red" }}>{LoginMessage}</div> */}

                    <button name="btnSubmit" class=" btn-primary customlogin-btn" onClick={this.mySubmitHandler} >{t('login.submit')}</button>
                    <button name="btnSubmit" class="btn-primary customforgot customlogin-btn" onClick={() => { this.handleModal() }}>{t('login.forgotpassword')}</button>

                    <div class="col-sm-6  ">

                      <Modal show={this.state.showModal} onHide={() => this.handleModal()}>
                        <Modal.Header onClick={() => this.closeButton()} closeButton>{t('login.sentemail')}</Modal.Header>
                        <Modal.Body>
                          {(() => {
                            if (showNotifications) {
                              return (
                                <div class="row">
                                  <div class="col-md-12">

                                    {(NotificationMessage ==="Created successfully") ? null

                                      : <div class="alert alert-danger alert-dismissible fade show" role="alert">
                                        <strong> {NotificationMessage}</strong>

                                      </div>

                                    }

                                  </div>
                                </div>
                              )
                            }


                          })()}
                          <div class="form-group ">
                            <input type="email" name="email" onChange={this.myChangeHandler} className="form-control" />
                            <span className="text-danger">{this.state.errors.email}</span>

                          </div>

                        </Modal.Body>
                        <Modal.Footer>
                          <div class="form-group ">
                            <Button onClick={() => { this.addModal() }}>
                              {t('button.send')}
                            </Button >

                          </div>
                        </Modal.Footer>
                      </Modal>
                      &nbsp;&nbsp;

                      <Modal show={this.state.showModalSave} onHide={() => this.handleModalSave()}>
                        <Modal.Header closeButton onClick={() => this.CancelModalButton()}>{t('login.createpassword')}</Modal.Header>
                        <Modal.Body>
                          {(() => {

                            if (showNotifications) {
                              return (
                                <div class="row">
                                  <div class="col-md-12">
                                    {(NotificationMessage ==="Created successfully") ? <div class="alert alert-success alert-dismissible fade show" role="alert">
                                      <strong> Otp Sent successfully</strong>

                                    </div>
                                      : null

                                    }

                                  </div>
                                </div>
                              )
                            }


                          })()}
                          {(() => {

                            if (showNotifications1) {
                              return (
                                <div class="row">
                                  <div class="col-md-12">
                                    {(NotificationMessage1 === "Otp is invalid") ? <div class="alert alert-danger alert-dismissible fade show" role="alert">
                                      <strong> {NotificationMessage1}</strong>

                                    </div>
                                      : <div class="alert alert-success alert-dismissible fade show" role="alert">
                                        <strong> {NotificationMessage1}</strong>

                                      </div>

                                    }

                                  </div>
                                </div>
                              )
                            }


                          })()}
                          <form class="user">
                            <div class="form-group custom-spacing">
                              <input type="email" class="form-control form-control-user"
                                name="email" id="email" aria-describedby="emailHelp"
                                placeholder={t('login.emailid')} value={this.state.email} disabled />
                            </div>
                            <div class="form-group custom-spacing">
                              <input
                                type="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.myChangeHandler}
                                class="form-control"
                                placeholder="Enter new password"
                                id="password" />

                              <div className="text-danger">{this.state.errors.password}</div>
                            </div>
                            <div class="form-group custom-spacing">
                              <input
                                type="password"
                                name="confirm_password"
                                value={this.state.confirm_password}
                                onChange={this.myChangeHandler}
                                class="form-control"
                                placeholder="Enter confirm password"
                                id="confirm_password" />

                              <div className="text-danger">{this.state.errors.confirm_password}</div>
                            </div>
                            <div class="form-group custom-spacing">
                              <input type="text" class="form-control form-control-user"
                                name="otp" id="otp" aria-describedby="emailHelp"
                                placeholder={t('login.otp')} onChange={this.myChangeHandler} />
                              <div className="text-danger">{this.state.errors.otp}</div>

                            </div>
                          </form>
                        </Modal.Body>
                        <Modal.Footer>
                          <div class="form-group ">
                            <Button onClick={() => { this.addModalSave() }}>
                              {t('button.submit')}
                            </Button >

                          </div>

                        </Modal.Footer>
                      </Modal>
                    </div>

                  </form>
                </section>
              </section>
            </section>

          </div>

        )
      }


    }
  }
};

export default withTranslation()(Login);