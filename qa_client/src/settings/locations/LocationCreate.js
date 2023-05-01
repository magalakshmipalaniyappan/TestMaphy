import React from 'react';
import axios from 'axios';
import Countries from 'react-select-country';
import { withTranslation } from 'react-i18next';
import LocationMain from './LocationMain';

const Domain = process.env.REACT_APP_URL;
var NotificationMessage = "";
var ResponseStatus = "";

class LocationCreate extends React.Component {
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
  }
  componentDidMount() {
    this.loadDropdownValues();
  }
  async loadDropdownValues() {
    const locationsurl = Domain + '/locations/selectList?page=1';
    const managersurl = Domain + '/users/selectList?page=1';
    const [parent_id, manager_id] = await Promise.all([
      axios.get(locationsurl),
      axios.get(managersurl)
    ]);

    this.setState({
      locationData: parent_id.data.items,
      managerData: manager_id.data.items
    });

  }

  myChangeHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }
  validateForm() {
    let state = this.state,errors = {},formIsValid = true;
    if (!state["locationName"]) {
      formIsValid = false;
      errors["locationName"] = "Please enter location name";
    }
    if (!state["address"]) {
      formIsValid = false;
      errors["address"] = "Please enter address";
    }
    if (!state["address2"] ) {
      formIsValid = false;
      errors["address2"] = "Please enter address";
    }
    if (!state["city"]) {
      formIsValid = false;
      errors["city"] = "Please enter city";
    }
    if (!state["state"]) {
      formIsValid = false;
      errors["state"] = "Please enter state";
    }

    if (!state["country"]) {
      formIsValid = false;
      errors["country"] = "Please select country";
    }
    if (!state["currency"]) {
      formIsValid = false;
      errors["currency"] = "Please enter currency";
    }
    if (!state["zip"]) {
      formIsValid = false;
      errors["zip"] = "Please enter zip";
    }
    else{
      if (typeof state["zip"] !== "undefined") {
        var pattern = new RegExp(/^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/);
        if (!pattern.test(state["zip"])) {
          formIsValid = false;
          errors["zip"] = "*Accept Only Numerical Values..";
        }
      }
    }
    this.setState({errors: errors});
    return formIsValid;
  }
  mySubmitHandler = async (event) => {
    event.preventDefault();
    if (this.validateForm()) {
    await axios({
      method: 'post',
      url: Domain + '/locations',
      data: JSON.stringify({
        name: this.state.LocationName,
        address: this.state.address,
        address2: this.state.address2,
        city: this.state.city,
        state: this.state.state,
        country: this.state.country,
        currency: this.state.currency,
        ldap_ou: this.state.ldap_ou,
        manager_id: this.state.manager_id,
        parent_id: this.state.parent_id,
        zip: this.state.zip
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
  render() {
    const { ShowCreate, showNotifications } = this.state;
    const { t } = this.props;
    if (ShowCreate) {

      return (
        <div>

          <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800 custommain-title">{t('location.create')}</h1>

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

                                <label for="LocationName" class=" control-label customlabel-textcolor">{t('location.name')} <i style={{ color: "red" }}>*</i></label>
                                <input type="text" class="form-control "
                                  name="LocationName" id="LocationName"
                                  placeholder={t('location.name')} onChange={this.myChangeHandler} />
                                  <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.locationName}</div>
                              </div>
                            </div>
                            <div class="form-group row">
                              <div class="col-sm-8 mb-3 mb-sm-0">
                                <label for="parent_id" class=" control-label customlabel-textcolor">{t('location.parent_id')} </label>
                                <select ref="parent_id" class="form-control" onChange={this.myChangeHandler} id="parent_id" name="parent_id" >
                                  <option value="">{t('select.parentlocation')}</option>
                                  {(() => {
                                    if (this.state.locationData) {
                                      return (
                                        this.state.locationData.map(obj => {
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


                            </div>

                            <div class="form-group row">
                              <div class="col-sm-8 mb-3 mb-sm-0">
                                <label for="manager_id" class=" control-label customlabel-textcolor">{t('location.manager_id')} </label>
                                <select ref="manager_id" class="form-control" onChange={this.myChangeHandler} id="manager_id" name="manager_id" >
                                  <option value="">{t('select.manager')}</option>
                                  {(() => {
                                    if (this.state.managerData) {
                                      return (
                                        this.state.managerData.map(obj => {
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
                                  })()}
                                </select>
                               
                              </div>


                            </div>
                            <div class="form-group row">
                              <div class="col-sm-8 mb-3 mb-sm-0">
                                <label for="currency" class=" control-label customlabel-textcolor">{t('location.currency')} <i style={{ color: "red" }}>*</i></label>
                                <input type="text" class="form-control "
                                  name="currency" id="currency"
                                  placeholder={t('location.currency')} onChange={this.myChangeHandler} />
                                    <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.currency}</div>
                              </div>
                            </div>
                            <div class="form-group row">
                              <div class="col-sm-8 mb-3 mb-sm-0">
                                <label for="address" class=" control-label customlabel-textcolor">{t('location.address')} <i style={{ color: "red" }}>*</i></label>
                                <input type="text" class="form-control"
                                  name="address" id="address"
                                  placeholder={t('location.address')} onChange={this.myChangeHandler} />
                                <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.address}</div>

                              </div>
                            </div>
                            <div class="form-group row">
                              <div class="col-sm-8 mb-3 mb-sm-0">

                                <input type="text" class="form-control "
                                  name="address2" id="address2"
                                  placeholder={t('location.address')} onChange={this.myChangeHandler} />
                                <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.address2}</div>
                              </div>
                            </div>
                            <div class="form-group row">
                              <div class="col-sm-8 mb-3 mb-sm-0">
                                <label for="city" class=" control-label customlabel-textcolor">{t('location.city')} <i style={{ color: "red" }}>*</i></label>
                                <input type="text" class="form-control "
                                  name="city" id="city"
                                  placeholder={t('location.city')} onChange={this.myChangeHandler} />
                                    <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.city}</div>
                              </div>
                            </div>
                            <div class="form-group row">
                              <div class="col-sm-8 mb-3 mb-sm-0">
                                <label for="state" class=" control-label customlabel-textcolor">{t('location.state')} <i style={{ color: "red" }}>*</i></label>
                                <input type="text" class="form-control "
                                  name="state" id="state"
                                  placeholder={t('location.state')} onChange={this.myChangeHandler}  />
                                  <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.state}</div>

                              </div>
                            </div>
                            <div class="form-group row">
                              <div class="col-sm-8 mb-3 mb-sm-0">
                                <label for="country" class=" control-label customlabel-textcolor">{t('location.country')} <i style={{ color: "red" }}>*</i></label>
                                <Countries class="form-control" ref="country" name="country" empty={t('select.country')} onChange={this.myChangeHandler}  />
                                <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.country}</div>
                              </div>
                            </div>
                            <div class="form-group row">
                              <div class="col-sm-8 mb-3 mb-sm-0">
                                <label for="zip" class=" control-label customlabel-textcolor">{t('location.zip')} <i style={{ color: "red" }}>*</i></label>
                                <input type="text" class="form-control"
                                  name="zip" id="zip"
                                  placeholder={t('location.zip')} onChange={this.myChangeHandler} />
                                 
                              </div>
                              <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.zip}</div>

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
        <LocationMain showNotifications={this.state.showNotifications} NotificationMessage={NotificationMessage} />

      );
    }
  }
};
export default withTranslation()(LocationCreate);
