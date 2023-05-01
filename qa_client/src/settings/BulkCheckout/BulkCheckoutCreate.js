import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import ListAllMain from '../listall/AssetMain';
import { withTranslation} from 'react-i18next';
var validator = require('validator');
//var NotificationMessage = "";
const Domain = process.env.REACT_APP_URL;
const animatedComponents = makeAnimated();
class BulkCheckoutCreate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: "en",
      selected_asset: [],
      assetData: [],
      asset: '',
      userData: [],
      user: '',
      selecteduser: '',
      validationError: "",
      ShowCheckout: true,
      ShowMain: false,
      showNotifications: false,
      toggleUser: true,
      toggleLocation: false,
      errors:{}

    }

    this.addItem = this.addItem.bind(this);
  }
  addItem() {
    this.selectedValues.push({ key: "Option 3", cat: "Group 1" });
  }

  async componentDidMount() {
    this.loadDropdownValues();

  }
  async loadDropdownValues() {
    const asseturl = Domain + '/hardware/selectList?page=1&type=bulkcheckout';
    const managerurl = Domain + '/users/selectList?page=1';
    const locationurl = Domain + '/locations/selectList?page=1';

    const [asset, manager, location] = await Promise.all([
      axios.get(asseturl),
      axios.get(managerurl),
      axios.get(locationurl)
    ]);


    this.setState({
      assetData: asset.data.items,
      managerData: manager.data.items,
      locationData: location.data.items,
    });

  }
  onChange = (opt, { option }) => {
    let value = option.value;
    this.setState({ selected_asset: [...this.state.selected_asset, value] })
  }

  myChangeHandler = (event) => {

    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  }
  mySubmitHandler = async (event) => {
    event.preventDefault();
    if (this.ValidationForm()) {
    await axios({
      method: 'post',
      url: Domain + '/hardware/bulkcheckout',
      data: JSON.stringify({
        // asset: this.state.asset,
        assigned_user: this.state.assigned_user,
        assigned_location: this.state.assigned_location,
        checkout_date: this.state.checkout_date,
        expected_checkin_date: this.state.expected_checkin_date,
        selected_assets: this.state.selected_asset,
        note: this.state.notes,
      }),
      headers: { 'Content-Type': 'application/json' }

    })
      .then((response) => {
        //handle success
        // ResponseStatus = response.data.success;
        console.log("update message:" + response.data.message);
       // NotificationMessage = response.data.message;
      })
      .catch(function (response) {
        //handle error
        console.log(response);

      });
    this.loadDropdownValues();
    this.setState({ showNotifications: true });

    //if (ResponseStatus === true) {
    this.setState({ ShowCheckout: false });
    //}
    }

  }

  ValidationForm(){
    let state = this.state,errors = {},formIsValid = true;
    if((!state["assigned_location"] && !state["assigned_user"]))
    {
        formIsValid = false;
        errors["assigned"] = "Please select either user or location ";   
    }
      if (!state["checkout_date"]) {
        formIsValid = false;
        errors["checkout_date"] = "Please select checkout date";
      }
      else {
        if (!validator.isDate(this.state.checkout_date)) {
          formIsValid = false;
          errors["checkout_date"] = "Please enter valid checkout date";
        }
        else {  
          if(validator.isAfter(this.state.checkout_date))
          {
            formIsValid = false;
             errors["checkout_date"] = "Checkout date cannot be in the future";
          }
        }
      }

      if (!state["expected_checkin_date"]) {
        formIsValid = false;
        errors["expected_checkin_date"] = "Please select checkin date";
      }
      else {
        if (!validator.isDate(this.state.expected_checkin_date)) {
          formIsValid = false;
          errors["expected_checkin_date"] = "Please enter valid checkin date";
        }
        else {  
          if(!validator.isAfter(this.state.expected_checkin_date,this.state.checkout_date))
          {
            formIsValid = false;
            errors["expected_checkin_date"] = "CheckIn  date should be lesser than CheckOut date";
          }
        }
    }
    
    if (!state["notes"]) {
      formIsValid = false;
      errors["notes"] = "Please enter notes";
    }

    if (this.state.selected_asset.length<1) {
      formIsValid = false;
      errors["selected_asset"] = "Please select asset";
    }


    this.setState({ errors: errors});
    return formIsValid;
 }

  onUserClick = () => {
    this.setState({ toggleUser: true })
    this.setState({ toggleAsset: false })
    this.setState({ toggleLocation: false })
    this.setState({ ShowMain: false })
    this.setState({ ShowCreate: true })
  }


  onLocationClick = () => {
    this.setState({ toggleUser: false })
    this.setState({ toggleAsset: false })
    this.setState({ toggleLocation: true })
    this.setState({ ShowMain: false })
    this.setState({ ShowCreate: true })
  }

  BackBtnClick = () => {
    this.setState({ showNotifications: false });
    const { ShowCheckout } = this.state;
    this.setState({ ShowCheckout: !ShowCheckout });
    const { ShowMain } = this.state;
    this.setState({ ShowMain: !ShowMain });
  }

  CancelBtnClick = () => {
    const { ShowCheckout } = this.state;
    this.setState({ ShowCheckout: !ShowCheckout });
    const { ShowMain } = this.state;
    this.setState({ ShowMain: !ShowMain });
  }
  Assets() {
    return (this.state.assetData.map(data => ({ label: data.text, value: data.id })))
  }

  onLanguageHandle = (event) => {
    let newLang = event.target.value;
    this.setState({ value: newLang })
    this.props.i18n.changeLanguage(newLang)
  }


  render() {
    const { t } = this.props

    const { ShowCheckout, showNotifications } = this.state;

    if (ShowCheckout) {
      return (
        <div class="table-responsive">

          <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800 custommain-title">{t('BulkCheckout.name')}</h1>
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
                                      <strong> Checkout Successfully</strong>

                                    </div>


                                  </div>
                                </div>
                              )
                            }


                          })()}
                          <form class="user" onSubmit={this.mySubmitHandler}>
                            <div class="form-group row">
                              <div class="col-sm-8 mb-3 mb-sm-0">
                                <div class="control-label customlabel-textcolor">{t('BulkCheckout.assigned_user')}:  <Button onClick={this.onUserClick} name="btnUser" class="btn btn-primary ">{t('BulkCheckout.userbutton')}</Button>

                                  <Button onClick={this.onLocationClick} name="btnLocation" class="btn btn-primary">{t('BulkCheckout.locationbutton')}</Button></div>
                              </div>

                            </div>

                            <div class="form-group row">
                              <div class="col-sm-8 mb-3 mb-sm-0">
                                {this.state.toggleUser ? <select ref="assigned_user" class="form-control" onChange={this.myChangeHandler} id="assigned_user" name="assigned_user" >                                  <option value="">{t('BulkCheckout.manager')}</option>
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
                                </select> : null}

                                {this.state.toggleLocation ? <select ref="assigned_location" class="form-control" onChange={this.myChangeHandler} id="assigned_location" name="assigned_location" >
                                  <option value="">{t('BulkCheckout.location')}</option>
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
                                  })()}
                                </select>
                                  : null}
                              </div>
                              <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.assigned}</div>
                            </div>

                            <div class="form-group row">
                              <div class="col-sm-8 mb-3 mb-sm-0">
                                <label for="checkout_date" class="control-label customlabel-textcolor">{t('BulkCheckout.checkout_date')} <i style={{ color: "red" }}>*</i></label>
                                <input type="date" class="form-control "
                                  name="checkout_date" id="checkout_date"
                                  placeholder={t('BulkCheckout.checkout_date')} onChange={this.myChangeHandler}  />

                              </div>
                              <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.checkout_date}</div>
                            </div>
                            <div class="form-group row">
                              <div class="col-sm-8 mb-3 mb-sm-0">
                                <label for="expected_checkin_date" class="control-label customlabel-textcolor">{t('BulkCheckout.expected_checkin_date')} <i style={{ color: "red" }}>*</i></label>
                                <input type="date" class="form-control "
                                  name="expected_checkin_date" id="expected_checkin_date"
                                  placeholder={t('BulkCheckout.checkout_date')} onChange={this.myChangeHandler} />

                              </div>
                              <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.expected_checkin_date}</div>
                            </div>
                            <div class="form-group row">
                              <div class="col-sm-8 mb-3 mb-sm-0">
                                <label for="notes" class="control-label customlabel-textcolor">{t('BulkCheckout.notes')} <i style={{ color: "red" }}>*</i></label>
                                <textarea class="form-control"
                                  onChange={this.myChangeHandler} id="notes" name="notes"
                                  placeholder={t('BulkCheckout.notes')} />
                              </div>
                              <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.notes}</div>
                            </div>
                            <div class="form-group row">
                              <div class="col-sm-8 mb-3 mb-sm-0">

                                <label for="Assets" class="control-label customlabel-textcolor">{t('BulkCheckout.selected_assets')} <i style={{ color: "red" }}>*</i></label>
                                <Select options={this.Assets()} onChange={this.onChange} id="selected_asset" name="selected_asset" components={animatedComponents}
                                  isMulti/>

                              </div>
                              <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.selected_asset}</div>
                            </div>
                            <div class="form-group">
                            <button name="btnCancel" onClick={this.CancelBtnClick} class="btn btn-link text-left" >{t('button.cancel')}</button>
                            <button name='submit' class=" btn-primary" >{t('button.submit')}</button>

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
    else
      return (
        <ListAllMain showNotifications={this.state.showNotifications} NotificationMessage="Checkout Successfully" />
      );

  }
};
export default withTranslation()(BulkCheckoutCreate);
