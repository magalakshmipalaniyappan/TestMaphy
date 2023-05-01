import React from 'react';
import axios from 'axios';

import Countries from 'react-select-country';
import { withTranslation } from 'react-i18next'
import LocationMain from './LocationMain';

const Domain = process.env.REACT_APP_URL;
var NotificationMessage = "";
var ResponseStatus = "";
class LocationUpdate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: "en",
      country: '',
      options: this.options,
      errors: {},
      ShowMain: false,
      showUpdate: true,
      showNotifications: false
    }

  }
  componentDidMount() {
    this.loadDropdownValues();
    this.setState({ LocationId: this.props.LocationDatatoUpdate.id });
    this.setState({ LocationName: this.props.LocationDatatoUpdate.name });
    this.setState({ manager_id: this.props.LocationDatatoUpdate.manager.id });
    this.setState({ parent_id: this.props.LocationDatatoUpdate.parent.id });
    //this.setState({ location_id: this.props.LocationDatatoUpdate.location.id });
    this.setState({ address: this.props.LocationDatatoUpdate.address });
    this.setState({ address2: this.props.LocationDatatoUpdate.address2 });
    this.setState({ city: this.props.LocationDatatoUpdate.city });
    this.setState({ state: this.props.LocationDatatoUpdate.state });
    this.setState({ country: this.props.LocationDatatoUpdate.country });
    this.setState({ currency: this.props.LocationDatatoUpdate.currency });
    this.setState({ zip: this.props.LocationDatatoUpdate.zip });

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

    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
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
        method: 'put',
        url: Domain + '/locations/' + this.state.LocationId,
        data: JSON.stringify({
          name: this.state.LocationName
          , address: this.state.address,
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
      if (ResponseStatus) {
        this.setState({ showUpdate: false });
      }

    }
  }

  
  BackBtnClick = () => {
    this.setState({showNotifications:false});
    this.setState({ showNotifications: false });
    this.setState({ showUpdate: false });
  }

  render() {
    const { showUpdate, showNotifications } = this.state;
    const { t } = this.props;
    if (showUpdate) {
      return (
        <div>
   <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800 custommain-title">{t('location.update')}</h1>
            <button onClick={this.BackBtnClick} className=" btn btn-sm btn-primary shadow-sm custommain-title">
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

                                <label for="LocationName" class="control-label customlabel-textcolor">{t('location.name')}  <i style={{ color: "red" }}>*</i></label>
                                <input type="text" class="form-control"
                                  name="LocationName" value={this.state.LocationName} id="LocationName"
                                  placeholder={t('location.name')} onChange={this.myChangeHandler} />
                               </div>
                               <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.LocationName}</div>
                            </div>
                            <div class="form-group row">
                              <div class="col-sm-8 mb-3 mb-sm-0">
                                <label for="parent_id" class=" control-label customlabel-textcolor">{t('location.parent_id')} </label>
                                <select ref="parent_id" class="form-control " onChange={this.myChangeHandler} value={this.state.parent_id} id="parent_id" name="parent_id">
                                  <option  value="0">{t('select.parentlocation')}</option>
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
                                <select ref="manager_id" value={this.state.manager_id} class="form-control " onChange={this.myChangeHandler} id="manager_id" name="manager_id" >
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
                                  })()
                                  }
                                </select>
                               
                              </div>

                            </div>

                            <div class="form-group row">
                              <div class="col-sm-8 mb-3 mb-sm-0">
                                <label for="currency" class=" control-label customlabel-textcolor">{t('location.currency')}  <i style={{ color: "red" }}>*</i></label>
                                <input type="text" class="form-control "
                                  name="currency" value={this.state.currency} id="currency" 
                                  placeholder={t('location.currency')} onChange={this.myChangeHandler}  />
                                  <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.currency}</div>
                              </div>
                            </div>
                            <div class="form-group row">
                              <div class="col-sm-8 mb-3 mb-sm-0">
                                <label for="address" class=" control-label customlabel-textcolor">{t('location.address')}  <i style={{ color: "red" }}>*</i></label>

                                <input type="text" class="form-control "
                                  name="address" value={this.state.address} id="address" 
                                  placeholder={t('location.address')} onChange={this.myChangeHandler}  />
                                  <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.address}</div>

                              </div>
                            </div>
                            <div class="form-group row">
                              <div class="col-sm-8 mb-3 mb-sm-0">

                                <input type="text" class="form-control"
                                  name="address2" value={this.state.address2} id="address2" aria-describedby="emailHelp"
                                  placeholder={t('location.address')} onChange={this.myChangeHandler}  />
                                <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.address2}</div>

                              </div>
                            </div>
                            <div class="form-group row">
                              <div class="col-sm-8 mb-3 mb-sm-0">
                                <label for="city" class=" control-label customlabel-textcolor">{t('location.city')}  <i style={{ color: "red" }}>*</i></label>
                                <input type="text" class="form-control"
                                  name="city" value={this.state.city} id="city" 
                                  placeholder={t('location.city')} onChange={this.myChangeHandler}  />
                                <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.city}</div>
                              </div>
                            </div>
                            <div class="form-group row">
                              <div class="col-sm-8 mb-3 mb-sm-0">
                                <label for="state" class=" control-label customlabel-textcolor">{t('location.state')}  <i style={{ color: "red" }}>*</i></label>
                                <input type="text" class="form-control"
                                  name="state" value={this.state.state} id="state" 
                                  placeholder={t('location.state')} onChange={this.myChangeHandler}  />
                                <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.state}</div>
                              </div>
                            </div>
                            <div class="form-group row">
                              <div class="col-sm-8 mb-3 mb-sm-0">
                                <label for="country" class=" control-label customlabel-textcolor">{t('location.country')}  <i style={{ color: "red" }}>*</i></label>
                                <Countries class="form-control" ref="country" value={this.state.country} name="country" empty={t('select.country')} onChange={this.myChangeHandler}/>
                                <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.country}</div>

                              </div>
                            </div>
                            <div class="form-group row">
                              <div class="col-sm-8 mb-3 mb-sm-0">
                                <label for="zip" class=" control-label customlabel-textcolor">{t('location.zip')}  <i style={{ color: "red" }}>*</i></label>
                                <input type="text" class="form-control "
                                  name="zip" value={this.state.zip} id="zip" 
                                  placeholder={t('location.zip')} onChange={this.myChangeHandler}  />
                              </div>
                              <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.zip}</div>

                            </div>
                            <div class="form-group">
                            <button name="btnCancel" onClick={this.CancelBtnClick} class="btn btn-link text-left" >{t('button.cancel')}</button>
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
      )
    }
  }


};
export default withTranslation()(LocationUpdate);
