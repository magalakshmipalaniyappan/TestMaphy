import React from 'react';
import axios from 'axios';
import SuppliersMain from './SuppliersMain';
import { withTranslation } from 'react-i18next'
import Countries from 'react-select-country';
var validator = require('validator');
const Domain = process.env.REACT_APP_URL;
var NotificationMessage = "";
var ResponseStatus = "";
class SuppliersCreate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: "en",
      errors: {},
      country: '',
      options: this.options,
      ShowCreate: true,
      showNotifications: false
    }
    this.myChangeHandler = this.myChangeHandler.bind(this);
    this.mySubmitHandler = this.mySubmitHandler.bind(this);
  };

  myChangeHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }
  changeHandler = value => {
    this.setState({ value });
  }

  mySubmitHandler = async (event) => {
    event.preventDefault();
    if (this.validateForm()) {
      await axios({
        method: 'post',
        url: Domain + '/suppliers',
        data: JSON.stringify({
          name: this.state.SuppliersName,
          address: this.state.address,
          address2: this.state.address2,
          city: this.state.city,
          state: this.state.state,
          country: this.state.country,
          phone: this.state.phone,
          email: this.state.email,
          contact: this.state.contact,
          url: this.state.url,
          zip: this.state.zip,
          notes: this.state.notes
        }),
        headers: { 'Content-Type': 'application/json' }
      })
        .then(function (response) {
          ResponseStatus = response.data.success;
          NotificationMessage = response.data.message;
        })
        .catch(function (response) {
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
    this.setState({ ShowCreate:false });
  }

  validateForm() {
    let state = this.state,errors = {},formIsValid = true;

    if (!state["SuppliersName"]) {
      formIsValid = false;
      errors["SuppliersName"] = "*Please enter vendor Name";
    }

    if (!state["address"]) {
      formIsValid = false;
      errors["address"] = "*Please enter address1";
    }

    if (!state["address2"]) {
      formIsValid = false;
      errors["address2"] = "*Please enter address2";
    }

    if (!state["city"]) {
      formIsValid = false;
      errors["city"] = "*Please enter city";
    }

    if (!state["state"]) {
      formIsValid = false;
      errors["state"] = "*Please enter state";
    }

    if (!state["country"]) {
      formIsValid = false;
      errors["country"] = "*Please select country";
    }
    if (!state["contact"]) {
      formIsValid = false;
      errors["contact"] = "*Please enter contact";
    }

    if (!state["zip"]) {
      formIsValid = false;
      errors["zip"] = "*Please enter zip";
    }

    if (!state["phone"]) {
      formIsValid = false;
      errors["phone"] = "*Please enter phone no";
    }
    else {
      if (typeof state["phone"] !== "undefined") {
        if (!state["phone"].match(/^[0-9-,]+$/)) {
          formIsValid = false;
          errors["phone"] = "*Please enter valid phone no";
        }
      }
    }
    if (!state["email"]) {
      formIsValid = false;
      errors["email"] = "*Please enter email id";
    }
   else{
    if (typeof state["email"] !== "undefined") {
      if (!validator.isEmail(state["email"])) {
        formIsValid = false;
        errors["email"] = "*Please enter valid email-ID";
      }
    }
  }
    if (!state["url"]) {
      formIsValid = false;
      errors["url"] = "*Please enter url";
    }
 else{
    if (typeof state["url"] !== "undefined") {

      var urlpattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i');
      if (!urlpattern.test(state["url"])) {
        formIsValid = false;
        errors["url"] = "*Please enter valid support url";
      }
    }
  }

  if (!state["notes"]) {
    formIsValid = false;
    errors["notes"] = "*Please enter notes";
  }

    this.setState({ errors: errors });
    return formIsValid;

  }
  render() {

    const { showNotifications, ShowCreate } = this.state;
    const { t } = this.props;
    if (ShowCreate) {
      return (
        <div>

          <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800 custommain-title">{t('supplier.create')}</h1>
            <button onClick={this.BackBtnClick} className="btn btn-sm btn-primary shadow-sm custommain-title">
              {t('button.back')}</button>
          </div>
          <div class="container">
            <div class="row justify-content-center">

              <div class="col-xl-10 col-lg-12 col-md-9">

                <div class="card o-hidden border-0 shadow-lg my-5">
                  <div class="card-body p-0">
                    <div class="row">
                      <div class="col-lg-10">
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
                              <div class="col-sm-8 mb-3 mb-sm-0">
                                <label for="SuppliersName" class=" control-label customlabel-textcolor">{t('supplier.name')} <i style={{ color: "red" }}>*</i></label>
                                <input type="text" class="form-control "
                                  name="SuppliersName" id="SuppliersName"
                                  placeholder={t('placeholder.vendorname')} onChange={this.myChangeHandler} /> </div>
                             <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.SuppliersName}</div>
                            </div>
                            <div class="form-group row">
                              <div class="col-sm-8 mb-3 mb-sm-0">
                                <label for="address" class=" control-label customlabel-textcolor">{t('supplier.address')} <i style={{ color: "red" }}>*</i></label>
                                <input type="text" class="form-control " name="address" id="address"
                                   placeholder={t('placeholder.address')} onChange={this.myChangeHandler}  />
                                </div>
                              <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.address}</div>
                              </div>
                            <div class="form-group row">
                              <div class="col-sm-8 mb-3 mb-sm-0">
                                <input type="text" class="form-control"  name="address2" id="address2"
                                  placeholder={t('placeholder.address')} onChange={this.myChangeHandler}  />
                              </div>
                              <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.address2}</div>
                            </div>

                            <div class="form-group row">

                              <div class="col-sm-8 mb-3 mb-sm-0">
                                <label for="city" class=" control-label customlabel-textcolor">{t('supplier.city')} <i style={{ color: "red" }}>*</i></label>
                                <input type="text" class="form-control "
                                  name="city" id="city" placeholder={t('placeholder.city')} onChange={this.myChangeHandler} />
                              </div>
                              <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.city}</div>

                            </div>
                            <div class="form-group row">

                              <div class="col-sm-8 mb-3 mb-sm-0">
                                <label for="state" class="
                                 control-label customlabel-textcolor">{t('supplier.state')} <i style={{ color: "red" }}>*</i></label>
                                <input type="text" class="form-control "
                                  name="state" id="state" placeholder={t('placeholder.state')}  onChange={this.myChangeHandler} />
                              </div>
                              <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.state}</div>
                            </div>
                            <div class="form-group row">

                              <div class="col-sm-8 mb-3 mb-sm-0">
                                <label for="country" class=" control-label customlabel-textcolor">{t('supplier.country')} <i style={{ color: "red" }}>*</i></label>
                                <Countries class="form-control" ref="country" name="country" empty={t('select.country')}  onChange={this.myChangeHandler}  />
                                <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.country}</div>
                              </div>
                                          </div>
                            <div class="form-group row">

                              <div class="col-sm-8 mb-3 mb-sm-0">
                                <label for="zip" class=" control-label customlabel-textcolor">{t('supplier.zip')} <i style={{ color: "red" }}>*</i></label>
                                <input type="text" class="form-control "
                                  name="zip" id="zip" aria-describedby="emailHelp"
                                  placeholder={t('placeholder.zip')} onChange={this.myChangeHandler} />
                              </div>
                              <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.zip}</div>
                            </div>
                            <div class="form-group row">

                              <div class="col-sm-8 mb-3 mb-sm-0">
                                <label for="contact" class=" control-label customlabel-textcolor">{t('supplier.contact')} <i style={{ color: "red" }}>*</i></label>
                                <input type="text" class="form-control"
                                  name="contact" id="contact" aria-describedby="emailHelp"
                                  placeholder={t('placeholder.contact')}  onChange={this.myChangeHandler} />
                              </div>
                              <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.contact}</div>
                            </div>
                            <div class="form-group row">

                              <div class="col-sm-8 mb-3 mb-sm-0">
                                <label for="phone" class=" control-label customlabel-textcolor">{t('supplier.phone')} <i style={{ color: "red" }}>*</i></label>
                                <input type="text" class="form-control"
                                  name="phone" id="phone"
                                  placeholder={t('placeholder.phone')}  onChange={this.myChangeHandler}  />
                              </div>
                            </div>
                            <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.phone}</div>

                            <div class="form-group row">

                              <div class="col-sm-8 mb-3 mb-sm-0">
                                <label for="email" class="control-label customlabel-textcolor">{t('supplier.email')} <i style={{ color: "red" }}>*</i></label>
                                <input type="text" class="form-control "
                                  name="email" id="email" aria-describedby="emailHelp"
                                  placeholder={t('placeholder.email')}  onChange={this.myChangeHandler} />
                              </div>
                                           </div>
                            <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.email}</div>
                            <div class="form-group row">

                              <div class="col-sm-8 mb-3 mb-sm-0">
                                <label for="url" class=" control-label customlabel-textcolor">{t('supplier.url')} <i style={{ color: "red" }}>*</i></label>
                                <input type="text" class="form-control "
                                  name="url" id="url"
                                  placeholder={t('placeholder.url')} onChange={this.myChangeHandler} />
                                <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.url}</div>

                              </div>
                                          </div>
                            <div class="form-group row">
                              <div class="col-sm-8 mb-3 mb-sm-0">
                                <label for="notes" class=" control-label customlabel-textcolor">{t('supplier.notes')} <i style={{ color: "red" }}>*</i></label>
                                <textarea class="form-control" name="notes" id="notes" onChange={this.myChangeHandler}
                                  placeholder={t('placeholder.notes')} />
                              </div>
                              <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.notes}</div>
                            </div>
                            <div class="form-group">
                              <button name="btnCancel" onClick={this.BackBtnClick} class="btn btn-link text-left" >{t('button.cancel')}</button>
                              <button name='submit' class="btn-primary customlogin-btn" >{t('button.submit')}</button>

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
        <SuppliersMain showNotifications={this.state.showNotifications} NotificationMessage={NotificationMessage} />

      );
    }
  }
};
export default withTranslation()(SuppliersCreate);
