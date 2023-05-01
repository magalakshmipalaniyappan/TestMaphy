import React from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap'
import ComponentsMain from './ComponentsMain'
import Countries from 'react-select-country';
import { withTranslation } from 'react-i18next';
var validator = require('validator');
const Domain = process.env.REACT_APP_URL;
var ResponseStatus = "";
var ResponseStatusModal = "";
var ResponseStatusLocation = "";

var NotificationMessage = "";
var NotificationMessageModal = "";
var NotificationMessageLocation = "";
class ComponentsUpdate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: "en",
      errors: {},
      ComponentstoUpdate: '',
      ComponentsName: '',
      country: '',
      options: this.options,
      ShowMain: false,
      showUpdate: true,
      showNotifications: false,
      showNotificationsModal: false,
      showNotificationsLocation: false
    }
  }

  async componentDidMount() {
    this.setState({ ComponentsName: this.props.ComponentstoUpdate.name });
    this.setState({ ComponentsId: this.props.ComponentstoUpdate.id });
    this.setState({ category_id: this.props.ComponentstoUpdate.category.id });
    this.setState({ company_id: this.props.ComponentstoUpdate.company.id });
    this.setState({ location_id: this.props.ComponentstoUpdate.location.id });
    this.setState({ serial: this.props.ComponentstoUpdate.serial });
    this.setState({ purchase_date: this.props.ComponentstoUpdate.purchase_date.formatted });
    this.setState({ purchase_cost: this.props.ComponentstoUpdate.purchase_cost });
    this.setState({ order_number: this.props.ComponentstoUpdate.order_number });
    this.setState({ qty: this.props.ComponentstoUpdate.qty });
    this.setState({ min_amt: this.props.ComponentstoUpdate.min_amt });
    this.loadDropdownValues();

  }
  async loadDropdownValues() {
    const categoryurl = Domain + '/categories/selectList/Component?page=1';
    const companyurl = Domain + '/companies/selectList?page=1';
    const locationsurl = Domain + '/locations/selectList?page=1';

    const [category_id, company_id, location_id] = await Promise.all([
      axios.get(categoryurl),
      axios.get(companyurl),
      axios.get(locationsurl)
    ]);
    this.setState({
      categoryData: category_id.data,
      companyData: company_id.data.items,
      locationData: location_id.data.items
    });
  }
  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  }

  validateForm() {
    let state = this.state,errors = {},formIsValid = true;
    if(!state["ComponentsName"])
    {
      formIsValid = false;
      errors["ComponentsName"] = "Please enter component name";
    }
    if (!state["location_id"]) {
      formIsValid = false;
      errors["location_id"] = "Please select location";
    }
    if (!state["category_id"]) {
      formIsValid = false;
      errors["category_id"] = "Please select category";
    }
    if (!state["order_number"]) {
      formIsValid = false;
      errors["order_number"] = "Please enter order number";
    }
    if (!state["serial"]) {
      formIsValid = false;
      errors["serial"] = "Please enter serial";
    }

    if (!state["company_id"]) {
      formIsValid = false;
      errors["company_id"] = "Please select company";
    }
    
    if (!state["qty"]) {
      formIsValid = false;
      errors["qty"] = "Please enter  Qty";
    }
    else {
      if (typeof state["qty"] !== "undefined") {
        if(!validator.isInt(state["qty"].toString(), {gt: 0}))
        {
          formIsValid = false;
          errors["qty"] = "*Only allow integer and  greater than zero";
        }
      }
    }

    if (!state["min_amt"]) {
      formIsValid = false;
      errors["min_amt"] = "Please enter Min.Qty";
    }
    else {
      if (typeof state["min_amt"] !== "undefined") {
        if(!validator.isInt(state["min_amt"].toString(), {gt: 0}))
        { 
          formIsValid = false;
          errors["min_amt"] = "Only allow integer and greater than zero..";
        }
      }
    }

    if((state["min_amt"] && state["qty"] )&& (validator.toInt(state["min_amt"].toString()) > validator.toInt(state["qty"].toString())))
    {
      formIsValid = false;
      errors["min_amt"] = "Minimum quantity should be less than quantity";
    }

    if (!state["purchase_cost"]) {
      formIsValid = false;
      errors["purchase_cost"] = "Please enter purchase cost";
    }
    else {
      if (typeof state["purchase_cost"] !== "undefined") {
       if(!validator.isFloat(state["purchase_cost"].toString(), {gt: 0}))
        {
           formIsValid = false;
           errors["purchase_cost"] = "*Only allow numerics and greater than zero..";
         }
      }
    }
    if (!state["purchase_date"]) {
      formIsValid = false;
      errors["purchase_date"] = "Please select purchase date";
    }
    else {
      if (!validator.isDate(this.state.purchase_date)) {
        formIsValid = false;
        errors["purchase_date"] = "Please enter valid purchase date";
      }
      else {  
        if(validator.isAfter(this.state.purchase_date))
        {
          formIsValid = false;
           errors["purchase_date"] = "Purchase date cannot be in the future";
        }
      }

    }   
    this.setState({
      errors: errors
    });
    return formIsValid;
  }

  mySubmitHandler = async (event) => {
    event.preventDefault();
    if (this.validateForm()) {
      await axios({
        method: 'put',
        url: Domain + '/components/' + this.state.ComponentsId,
        data: JSON.stringify({
          name: this.state.ComponentsName,
          category_id: this.state.category_id,
          company_id: this.state.company_id,
          location_id: this.state.location_id,
          serial: this.state.serial,
          purchase_date: this.state.purchase_date,
          purchase_cost: this.state.purchase_cost,
          qty: this.state.qty,
          min_amt: this.state.min_amt,
          order_number: this.state.order_number
        }),
        headers: { 'Content-Type': 'application/json' }
      })
        .then(function (response) {
          //handle success
          ResponseStatus = response.data.success;
          NotificationMessage = response.data.message;
        })
        .catch(function (response) {
          //handle error
          console.log(response);
        });
      this.loadDropdownValues();
      this.setState({ showNotifications: true });

      if (ResponseStatus === true) {
        this.setState({ showUpdate: false });
      }

    }
  };
  BackBtnClick = () => {
    this.setState({ showUpdate: false });
    this.setState({ showNotifications: false });

  }

  CancelBtnClick = () => {
    this.setState({ showNotifications: false });
    const { showUpdate } = this.state;
    this.setState({ showUpdate: !showUpdate });
  }

  validateFormModalCategory() {
    let state = this.state,errors = {},formIsValid = true;
    if (!state["category"]) {
      formIsValid = false;
      errors["category"] = "*Please enter Category.";
    }
    if (!state["CategoryType"]) {
      formIsValid = false;
      errors["CategoryType"] = "*Please select Category Type.";
    }


    this.setState({
      errors: errors
    });
    return formIsValid;

  }
  validateFormModalLocation() {
    
    let state = this.state,errors = {},formIsValid = true;
    if (!state["location"]) {
      formIsValid = false;
      errors["location"] = "*Please enter  Location.";
    }
    if (!state["city"]) {
      formIsValid = false;
      errors["city"] = "*Please enter  City.";
    }
    if (!state["country"]) {
      formIsValid = false;
      errors["country"] = "*Please select  Country.";
    }
    this.setState({
      errors: errors
    });
    return formIsValid;

  }
  addCategory = async (event) => {

    if (this.validateFormModalCategory()) {
      console.log("dSubmit categoryname:" + this.state.category);


      await axios({
        method: 'post',
        url: Domain + '/categories',
        data: JSON.stringify({
          name: this.state.category,
          category_type: this.state.CategoryType
        }),
        headers: {

          'Content-Type': 'application/json'
        }

      })
        .then(function (response) {
          //handle success
          ResponseStatusModal = response.data.success;
          console.log("res" + response.status, ":", response.data.message);
          NotificationMessageModal = response.data.message;
        })
        .catch(function (response) {
          //handle error
          console.log(response);
        });

      this.loadDropdownValues();
      this.setState({ showNotificationsModal: true });
      if (ResponseStatusModal === true) {
        this.setState({ showCategory: !this.state.showCategory });
        this.setState({ category: "" });
        this.setState({ CategoryType: "" });
      }

    }
  }
  handleModalCategory() {
    this.setState({ showCategory: !this.state.showCategory })
  }
  CancelModalCategory = () => {
    this.setState({ showCategory: !this.state.showCategory })
    this.setState({ errors: "" });
    this.setState({ showNotificationsModal: false });
    this.setState({ category: "" });
    this.setState({ CategoryType: "" });
  };
  addLocation = async (event) => {

    if (this.validateFormModalLocation()) {


      await axios({
        method: 'post',
        url: Domain + '/locations',
        data: JSON.stringify({
          name: this.state.location,
          city: this.state.city,
          country: this.state.country
        }),
        headers: {

          'Content-Type': 'application/json'
        }

      })
        .then(function (response) {
          //handle success
          ResponseStatusLocation = response.data.success;
          console.log("res" + response.status, ":", response.data.message);
          NotificationMessageLocation = response.data.message;
        })
        .catch(function (response) {
          //handle error
          console.log(response);
        });

      this.loadDropdownValues();
      this.setState({ showNotificationsLocation: true });
      if (ResponseStatusLocation === true) {
        this.setState({ showLocation: !this.state.showLocation });
        this.setState({ location: "" });
        this.setState({ city: "" });
        this.setState({ country: "" });
      }

    }
  }
  handleModalLocation() {
    this.setState({ showLocation: !this.state.showLocation })
  }
  CancelModalLocation = () => {
    this.setState({ showLocation: !this.state.showLocation })
    this.setState({ errors: "" });
    this.setState({ showNotificationsLocation: false });
    this.setState({ location: "" });
    this.setState({ city: "" });
    this.setState({ country: "" });
  };
  render() {
    const { showNotifications, showUpdate, showNotificationsModal, showNotificationsLocation } = this.state;
    const { t } = this.props;
    if (showUpdate) {
      return (
        <div>

          <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800 custommain-title"> {t('component.update')}</h1>
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
                                <label for="ComponentsName" class="control-label customlabel-textcolor">{t('component.name')} <i style={{ color: "red" }}>*</i></label>

                                <input type="text" class="form-control "
                                  value={this.state.ComponentsName} name="ComponentsName" id="ComponentsName"
                                  placeholder={t('component.name')} onChange={this.myChangeHandler} r />
                              </div>
                              <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.ComponentsName}</div>
                            </div>
                            <div class="form-group row">
                              <div class="col-sm-8 mb-3 mb-sm-0">
                                <label for="category_id" class=" control-label customlabel-textcolor">{t('component.category_id')} <i style={{ color: "red" }}>*</i></label>

                                <select ref="category_id" class="form-control" onChange={this.myChangeHandler} id="category_id" value={this.state.category_id} name="category_id" >
                                  <option value="">{t('component.category_id')}</option>
                                  {(() => {
                                    if (this.state.categoryData) {
                                      return (
                                        this.state.categoryData.map(obj => {
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
                                <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.category_id}</div>
                              </div>
                              <div class="col-sm-4">
                                <Button onClick={() => { this.handleModalCategory() }}>{t('button.new')}</Button>
                                <Modal show={this.state.showCategory} onHide={() => this.handleModalCategory()}>
                                  <Modal.Header closeButton onClick={() => { this.CancelModalCategory() }}>{t('newbutton.category')}</Modal.Header>
                                  <Modal.Body>
                                    {(() => {

                                      if (showNotificationsModal) {
                                        return (
                                          <div class="row">
                                            <div class="col-md-12">

                                              {(NotificationMessageModal ==="Created successfully") ? null
                                                : <div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                  <strong> {NotificationMessageModal}</strong>
                                                </div>
                                              }
                                            </div>
                                          </div>
                                        )
                                      }
                                    })()}
                                    <div class="form-group row">
                                      <label for="CategoryType" class="customlabel-textcolor">{t('newbutton.categoryname')} <i style={{ color: "red" }}>*</i></label>

                                      <input type="text" class="form-control "
                                        name="category" value={this.state.category} id="modal-category"
                                        placeholder={t('newbutton.categoryname')} onChange={this.myChangeHandler} />
                                      <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.category}</div>
                                    </div>
                                    <div class="form-group row">
                                      <label for="CategoryType" class="customlabel-textcolor">{t('newbutton.categorytype')} <i style={{ color: "red" }}>*</i></label>
                                      <select ref="CategoryType" class="form-control" onChange={this.myChangeHandler} id="CategoryType" value={this.state.CategoryType} name="CategoryType">
                                        <option value="">{t('newbutton.categorytype')}</option>
                                        <option value="Accessory" disabled>Accessory</option>
                                        <option value="License" disabled>License</option>
                                        <option value="Consumable" disabled>Consumable</option>
                                        <option value="Component">Component</option>
                                        <option value="Asset" disabled>Asset</option>
                                      </select>
                                      <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.CategoryType}</div>

                                    </div>
                                  </Modal.Body>
                                  <Modal.Footer>
                                    <div class="form-group ">
                                      <Button onClick={() => { this.addCategory() }}>
                                        {t('button.save')}
                                      </Button >
                                      <Button onClick={() => { this.CancelModalCategory() }}>
                                        {t('button.cancel')}
                                      </Button >
                                    </div>
                                  </Modal.Footer>
                                </Modal>
                              </div>
                            </div>

                            <div class="form-group row">
                              <div class="col-sm-8 mb-3 mb-sm-0">

                                <label for="qty" class=" control-label customlabel-textcolor">{t('component.qty')} <i style={{ color: "red" }}>*</i></label>

                                <input type="text" class="form-control "
                                  name="qty" id="qty" value={this.state.qty}
                                  placeholder={t('component.qty')} onChange={this.myChangeHandler}/>

                              </div>
                              <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.qty}</div>

                            </div>
                            <div class="form-group row">
                              <div class="col-sm-8 mb-3 mb-sm-0">

                                <label for="min_amt" class=" control-label customlabel-textcolor" >{t('component.min_amt')} <i style={{ color: "red" }}>*</i></label>

                                <input type="text" class="form-control "
                                  name="min_amt" id="min_amt" value={this.state.min_amt}
                                  placeholder={t('component.min_amt')} onChange={this.myChangeHandler}  />
                                <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.min_amt}</div>


                              </div>
                            </div>
                            <div class="form-group row">
                              <div class="col-sm-8 mb-3 mb-sm-0">
                                <label for="min_amt" class=" control-label customlabel-textcolor">  {t('component.serial')} <i style={{ color: "red" }}>*</i> </label>

                                <input type="text" class="form-control"
                                  name="serial" id="serial" value={this.state.serial}
                                  placeholder={t('component.serial')} onChange={this.myChangeHandler} />
                              </div>
                              <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.serial}</div>
                            </div>
                            <div class="form-group row">
                              <div class="col-sm-8 mb-3 mb-sm-0">
                                <label for="text" class=" control-label customlabel-textcolor">  {t('component.company_id')}  <i style={{ color: "red" }}>*</i></label>

                                <select ref="company_id" class="form-control" onChange={this.myChangeHandler} id="company_id" value={this.state.company_id} name="company_id">
                                  <option value="">{t('component.company_id')}</option>
                                  {(() => {
                                    if (this.state.companyData) {
                                      return (
                                        this.state.companyData.map(obj => {
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
                                <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.company_id}</div>
                              </div>
                            </div>

                            <div class="form-group row">
                              <div class="col-sm-8 mb-3 mb-sm-0">
                                <label for="text" class=" control-label customlabel-textcolor"> {t('component.location_id')} <i style={{ color: "red" }}>*</i></label>

                                <select ref="location_id" class="form-control" onChange={this.myChangeHandler} id="location_id" value={this.state.location_id} name="location_id" >
                                  <option value=""> {t('component.location_id')} </option>
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
                                <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.location_id}</div>
                              </div>
                              <div class="col-sm-4">
                                <Button onClick={() => { this.handleModalLocation() }}>{t('button.new')}</Button>
                                <Modal show={this.state.showLocation} onHide={() => this.handleModalLocation()}>
                                  <Modal.Header closeButton onClick={() => { this.CancelModalLocation() }}>{t('newbutton.location')}</Modal.Header>
                                  <Modal.Body>
                                    {(() => {

                                      if (showNotificationsLocation) {
                                        return (
                                          <div class="row">
                                            <div class="col-md-12">

                                              {(NotificationMessageLocation ==="Created successfully") ? null
                                                : <div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                  <strong> {NotificationMessageLocation}</strong>
                                                </div>
                                              }
                                            </div>
                                          </div>
                                        )
                                      }
                                    })()}
                                    <div class="form-group row">

                                      <input type="text" class="form-control form-control-user customdept-location"
                                        name="location" value={this.state.location} id="modal-location"
                                        placeholder={t('newbutton.locationname')} onChange={this.myChangeHandler} />
                                      <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.location}</div>
                                    </div>

                                    <div class="form-group row">

                                      <input type="text" class="form-control form-control-user customdept-location"
                                        name="city" id="city"
                                        placeholder={t('newbutton.locationcity')} onChange={this.myChangeHandler} />
                                      <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.city}</div>

                                    </div>
                                    <div class="form-group row">
                                      <Countries class="form-control customdept-location" ref="country" name="country" empty={t('newbutton.locationcountry')} onChange={this.myChangeHandler} />
                                      <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.country}</div>

                                    </div>

                                  </Modal.Body>
                                  <Modal.Footer>
                                    <div class="form-group ">
                                      <Button onClick={() => { this.addLocation() }}>
                                        {t('button.save')}
                                      </Button >
                                      <Button onClick={() => { this.CancelModalLocation() }}>
                                        {t('button.cancel')}
                                      </Button >
                                    </div>
                                  </Modal.Footer>
                                </Modal>
                              </div>

                            </div>
                            <div class="form-group row">
                              <div class="col-sm-8 mb-3 mb-sm-0">
                                <label for="text" class="control-label customlabel-textcolor"> {t('component.order_number')}  <i style={{ color: "red" }}>*</i></label>

                                <input type="text" class="form-control "
                                  name="order_number" id="order_number" value={this.state.order_number}
                                  placeholder={t('component.order_number')} onChange={this.myChangeHandler} />
                              </div>
                              <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.order_number}</div>
                            </div>
                            <div class="form-group row">
                              <div class="col-sm-8 mb-3 mb-sm-0">
                                <label for="text" class="control-label customlabel-textcolor">{t('component.purchase_date')} <i style={{ color: "red" }}>*</i></label>

                                <input type="date" class="form-control "
                                  name="purchase_date" id="purchase_date"
                                  placeholder={t('component.purchase_date')} onChange={this.myChangeHandler} value={this.state.purchase_date} />

                              </div>
                              <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.purchase_date}</div>
                            </div>

                            <div class="form-group row">
                              <div class="col-sm-8 mb-3 mb-sm-0">
                                <label for="text" class="control-label customlabel-textcolor"> {t('component.purchase_cost')} <i style={{ color: "red" }}>*</i></label>
                                <div class="input-group-append">
                                  <input type="text" class="form-control "
                                    name="purchase_cost" id="purchase_cost" value={this.state.purchase_cost}
                                    placeholder={t('component.purchase_cost')} onChange={this.myChangeHandler}/>
                                  <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.purchase_cost}</div>

                                </div>
                              </div>
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
    else {
      return (

        <ComponentsMain showNotifications={this.state.showNotifications} NotificationMessage={NotificationMessage} />
      )
    }
  }


};
export default withTranslation()(ComponentsUpdate);


