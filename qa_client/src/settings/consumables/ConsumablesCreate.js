import React from 'react';
import { Button, Modal } from 'react-bootstrap'

import { withTranslation } from 'react-i18next'
import Countries from 'react-select-country';
import axios from 'axios';
import ConsumablesMain from './ConsumablesMain';
var validator = require('validator');

const Domain = process.env.REACT_APP_URL;
var ResponseStatus = "";
var ResponseStatusModal = "";
var ResponseStatusManufacturer = "";
var ResponseStatusCategory = "";

var NotificationMessage = "";
var NotificationMessageModal = "";
var NotificationMessageManufacturer = "";
var NotificationMessageCategory = "";

class ConsumablesCreate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: "en",
      errors: {},
      ShowCreate: true,
      showNotifications: false,
      showNotificationsModal: false,
      showNotificationsManufacturer: false,
      showNotificationsCategory: false,

      country: '',
      options: this.options,
      showCategory: false,
      showLocation: false,
      show: false,
    }
    this.myChangeHandler = this.myChangeHandler.bind(this);
    this.mySubmitHandler = this.mySubmitHandler.bind(this);
    this.addCategory = this.addCategory.bind(this);
    this.addManufacture = this.addManufacture.bind(this);
    this.addLocation = this.addLocation.bind(this);
  }
  componentDidMount() {
    this.loadDropdownValues();
  }
  async loadDropdownValues() {
    const companyurl = Domain + '/companies/selectList?page=1';
    const locationsurl = Domain + '/locations/selectList?page=1';
    const categoryurl = Domain + '/categories/selectList/Consumable?page=1';
    const manufactureurl = Domain + '/manufacturers/selectList?page=1';
    const [company_id, location_id, category_id, manufacturer_id] = await Promise.all([
      axios.get(companyurl),
      axios.get(locationsurl),
      axios.get(categoryurl),
      axios.get(manufactureurl)
    ]);

    this.setState({
      companyData: company_id.data.items,
      locationData: location_id.data.items,
      manufacturerData: manufacturer_id.data.items,
      categoryData: category_id.data
    });
  }
  validateFormLocation() {
    let state = this.state,errors = {},formIsValid = true;
    if (!state["location"]) {
      formIsValid = false;
      errors["location"] = "*Please enter location .";
    }
    if (!state["city"]) {
      formIsValid = false;
      errors["city"] = "*Please enter City .";
    }
    if (!state["country"]) {
      formIsValid = false;
      errors["country"] = "*Please select Country .";
    }
    this.setState({
      errors: errors
    });
    return formIsValid;
  }
  validateFormCategory() {
    let state = this.state,errors = {},formIsValid = true;
    if (!state["category"]) {
      formIsValid = false;
      errors["category"] = "*Please enter category .";
    }
    if (!state["CategoryType"]) {
      formIsValid = false;
      errors["CategoryType"] = "*Please select Category Type .";
    }
    this.setState({
      errors: errors
    });
    return formIsValid;
  }
  validateFormManufacture() {
    let state = this.state,errors = {},formIsValid = true;
    if (!state["manufacturer"]) {
      formIsValid = false;
      errors["manufacturer"] = "*Please enter manufacturer .";
    }
    this.setState({
      errors: errors
    });
    return formIsValid;


  }
  addLocation = async (event) => {



    if (this.validateFormLocation()) {
      await axios({
        method: 'post',
        url: Domain + '/locations',
        data: JSON.stringify({
          name: this.state.location,
          city: this.state.city,
          country: this.state.country
        }),
        headers: { 'Content-Type': 'application/json' }

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
    this.setState({ showNotificationsModal: false });
    this.setState({ location: "" });
    this.setState({ city: "" });
    this.setState({ country: "" });

  };
  addCategory = async (event) => {

    if (this.validateFormCategory()) {
      await axios({
        method: 'post',
        url: Domain + '/categories',
        data: JSON.stringify({
          name: this.state.category,
          category_type: this.state.CategoryType
        }),
        headers: { 'Content-Type': 'application/json' }

      })
        .then(function (response) {
          //handle success
          ResponseStatusCategory = response.data.success;
          console.log("res" + response.status, ":", response.data.message);
          NotificationMessageCategory = response.data.message;
        })
        .catch(function (response) {
          //handle error
          console.log(response);
        });

      this.loadDropdownValues();
      this.setState({ showNotificationsCategory: true });
      if (ResponseStatusCategory === true) {
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
    this.setState({ showNotificationsCategory: false });
    this.setState({ category: "" });
    this.setState({ CategoryType: "" });
  };
  addManufacture = async (event) => {

    if (this.validateFormManufacture()) {
      await axios({
        method: 'post',
        url: Domain + '/manufacturers',
        data: JSON.stringify({ name: this.state.manufacturer }),
        headers: {

          'Content-Type': 'application/json'
        }
      })
        .then(function (response) {
          //handle success
          ResponseStatusManufacturer = response.data.success;
          console.log("res" + response.status, ":", response.data.message);
          NotificationMessageManufacturer = response.data.message;
        })
        .catch(function (response) {
          //handle error
          console.log(response);
        });

      this.loadDropdownValues();
      this.setState({ showNotificationsManufacturer: true });
      if (ResponseStatusManufacturer === true) {
        this.setState({ show: !this.state.show });
        this.setState({ manufacturer: "" });
      }

    }
  }
  handleModal() {
    this.setState({ show: !this.state.show })
  }
  CancelModalManufacturer = () => {
    this.setState({ show: !this.state.show })
    this.setState({ errors: "" });
    this.setState({ showNotificationsManufacturer: false });
    this.setState({ manufacturer: "" });
  };
  onLanguageHandle = (event) => {
    let newLang = event.target.value;
    this.setState({ value: newLang })
    this.props.i18n.changeLanguage(newLang)
  }

  myChangeHandler = (event) => {

    this.setState({ [event.target.name]: event.target.value });
  }
  validateForm() {
    let state = this.state,errors = {},formIsValid = true; 
    if (!state["company_id"]) {
      formIsValid = false;
      errors["company_id"] = "Please select company";
    }
  
    if (!state["location_id"]) {
      formIsValid = false;
      errors["location_id"] = "Please select location";
    }
    if (!state["category_id"]) {
      formIsValid = false;
      errors["category_id"] = "Please select category";
    }

    if (!state["manufacturer_id"]) {
      formIsValid = false;
      errors["manufacturer_id"] = "Please select manufacturer";
    }
    if (!state["order_number"]) {
      formIsValid = false;
      errors["order_number"] = "Please enter order number";
    }
    if (!state["model_number"]) {
      formIsValid = false;
      errors["model_number"] = "Please enter model number";
    }
    if (!state["item_no"]) {
      formIsValid = false;
      errors["item_no"] = "Please enter item number";
    }

    if (!state["ConsumableName"]) {
      formIsValid = false;
      errors["ConsumableName"] = "Please enter consumable name";
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
        method: 'post',
        url: Domain + '/consumables',
        data: JSON.stringify({
          name: this.state.ConsumableName,
          manufacturer_id: this.state.manufacturer_id,
          company_id: this.state.company_id,
          location_id: this.state.location_id,
          category_id: this.state.category_id,
          qty: this.state.qty,
          model_number: this.state.model_number,
          item_no: this.state.item_no,
          order_number: this.state.order_number,
          purchase_cost: this.state.purchase_cost,
          purchase_date: this.state.purchase_date,
          min_amt: this.state.min_amt
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
    NotificationMessage="";
    this.setState({showNotifications:false});
    this.setState({ ShowCreate: false });
  }

  render() {

    const { showNotifications, ShowCreate, showNotificationsModal, showNotificationsManufacturer, showNotificationsCategory } = this.state;
    const { t } = this.props;
    if (ShowCreate) {
      return (
        <div>

          <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800 custommain-title">{t('consumable.create')}</h1>
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
                                <label for="text" class=" control-label customlabel-textcolor"> {t('consumable.company_id')}  <i style={{ color: "red" }}>*</i></label>

                                <select ref="company_id" class="form-control" onChange={this.myChangeHandler} id="company_id" name="company_id" >
                                  <option value="">{t('select.company')}</option>
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
                                <label for="text" class=" control-label customlabel-textcolor"> {t('consumable.name')} <i style={{ color: "red" }}>*</i></label>
                                <input type="text" class="form-control"
                                  name="ConsumableName" id="ConsumableName"
                                  placeholder={t('consumable.name')} onChange={this.myChangeHandler} />
                              </div>
                              <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.ConsumableName}</div>
                            </div>
                            <div class="form-group row">
                              <div class="col-sm-8 mb-3 mb-sm-0">
                                <label for="text" class=" control-label customlabel-textcolor"> {t('consumable.category_id')} <i style={{ color: "red" }}>*</i>  </label>
                                <select ref="category_id" class="form-control" onChange={this.myChangeHandler} id="category_id" name="category_id">
                                  <option value="">{t('select.category')} </option>
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

                                      if (showNotificationsCategory) {
                                        return (
                                          <div class="row">
                                            <div class="col-md-12">

                                              {(NotificationMessageCategory ==="Created successfully") ? null
                                                : <div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                  <strong> {NotificationMessageCategory}</strong>
                                                </div>
                                              }
                                            </div>
                                          </div>
                                        )
                                      }
                                    })()}
                                    <div class="form-group row">
                                      <label for="CategoryType" class="customlabel-textcolor">{t('newbutton.categoryname')} <i style={{ color: "red" }}>*</i></label>

                                      <input type="text" class="form-control"
                                        name="category" id="category"
                                        placeholder={t('newbutton.categoryname')} onChange={this.myChangeHandler} />
                                      <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.category}</div>
                                    </div>

                                    <div class="form-group row">
                                      <label for="CategoryType" class="customlabel-textcolor">{t('newbutton.categorytype')} <i style={{ color: "red" }}>*</i></label>
                                      <select ref="CategoryType" class="form-control" onChange={this.myChangeHandler} id="CategoryType" name="CategoryType">
                                        <option value="">{t('select.categorytype')}</option>
                                        <option value="Accessory" disabled>Accessory</option>
                                        <option value="License" disabled>License</option>
                                        <option value="Consumable" >Consumable</option>
                                        <option value="Component" disabled>Component</option>
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
                                <label for="text" class="control-label customlabel-textcolor"> {t('consumable.manufacturer_id')} <i style={{ color: "red" }}>*</i></label>

                                <select ref="manufacturer_id" class="form-control" onChange={this.myChangeHandler} id="manufacturer_id" name="manufacturer_id" >
                                  <option value="">{t('select.manufacturer')}</option>
                                  {(() => {
                                    if (this.state.manufacturerData) {
                                      return (
                                        this.state.manufacturerData.map(obj => {
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
                                <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.manufacturer_id}</div>
                              </div>


                              <div class="col-sm-4">
                                <Button onClick={() => { this.handleModal() }}>{t('button.new')}</Button>
                                <Modal show={this.state.show} onHide={() => this.handleModal()}>
                                  <Modal.Header closeButton onClick={() => { this.CancelModalManufacturer() }}>{t('newbutton.manufacturer')}</Modal.Header>
                                  <Modal.Body>
                                    {(() => {

                                      if (showNotificationsManufacturer) {
                                        return (
                                          <div class="row">
                                            <div class="col-md-12">
                                        {(NotificationMessageManufacturer ==="Created successfully") ? null
                                                : <div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                  <strong> {NotificationMessageManufacturer}</strong>
                                                </div>
                                              }
                                            </div>
                                          </div>
                                        )
                                      }
                                    })()}
                                    <div class="form-group row">

                                      <input type="text" class="form-control "
                                        name="manufacturer" id="modal-manufacturer"
                                        placeholder={t('newbutton.manufacturername')} onChange={this.myChangeHandler} />
                                      <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.manufacturer}</div>
                                    </div>

                                  </Modal.Body>
                                  <Modal.Footer>
                                    <div class="form-group ">
                                      <Button onClick={() => { this.addManufacture() }}>
                                        {t('button.save')}
                                      </Button >
                                      <Button onClick={() => { this.CancelModalManufacturer() }}>
                                        {t('button.cancel')}
                                      </Button >
                                    </div>
                                  </Modal.Footer>
                                </Modal>
                              </div>
                            </div>
                            <div class="form-group row">
                              <div class="col-sm-8 mb-3 mb-sm-0">
                                <label for="text" class=" control-label customlabel-textcolor"> {t('consumable.location_id')}   <i style={{ color: "red" }}>*</i></label>

                                <select ref="location_id" class="form-control" onChange={this.myChangeHandler} id="location_id" name="location_id" >
                                  <option value="">{t('select.location')} </option>
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

                                      <input type="text" class="form-control customdept-location"
                                        name="location" id="location"
                                        placeholder={t('newbutton.locationname')} onChange={this.myChangeHandler} />
                                      <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.location} </div>
                                    </div>

                                    <div class="form-group row">

                                      <input type="text" class="form-control customdept-location"
                                        name="city" id="city"
                                        placeholder={t('newbutton.locationcity')} onChange={this.myChangeHandler} />
                                      <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.city}</div>

                                    </div>
                                    <div class="form-group row">
                                      <Countries class="form-control" ref="country" name="country" empty={t('select.country')} onChange={this.myChangeHandler} />
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
                                <label for="text" class="control-label customlabel-textcolor">{t('consumable.model_number')}  <i style={{ color: "red" }}>*</i></label>

                                <input type="text" class="form-control"
                                  name="model_number" id="model_number"
                                  placeholder={t('consumable.model_number')} onChange={this.myChangeHandler} />
                              </div>
                              <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.model_number}</div>
                            </div>
                            <div class="form-group row">
                              <div class="col-sm-8 mb-3 mb-sm-0">
                                <label for="text" class="control-label customlabel-textcolor"> {t('consumable.item_no')} <i style={{ color: "red" }}>*</i></label>

                                <input type="text" class="form-control "
                                  name="item_no" id="item_no"
                                  placeholder={t('consumable.item_no')} onChange={this.myChangeHandler} />
                              </div>
                              <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.item_no}</div>
                            </div>
                            <div class="form-group row">
                              <div class="col-sm-8 mb-3 mb-sm-0">
                                <label for="text" class=" control-label customlabel-textcolor">  {t('consumable.order_number')} <i style={{ color: "red" }}>*</i></label>

                                <input type="text" class="form-control "
                                  name="order_number" id="order_number"
                                  placeholder={t('consumable.order_number')} onChange={this.myChangeHandler}/>
                              </div>
                              <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.order_number}</div>
                            </div>
                            <div class="form-group row">
                              <div class="col-sm-8 mb-3 mb-sm-0">
                                <label for="text" class=" control-label customlabel-textcolor"> {t('consumable.purchase_date')} <i style={{ color: "red" }}>*</i></label>

                                <input type="Date" class="form-control "
                                  name="purchase_date" id="purchase_date"
                                  placeholder={t('consumable.purchase_date')} onChange={this.myChangeHandler}  />
                              </div>
                              <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.purchase_date}</div>
                            </div>
                            <div class="form-group row">
                              <div class="col-sm-8 mb-3 mb-sm-0">
                                <label for="text" class=" control-label customlabel-textcolor"> {t('consumable.purchase_cost')} <i style={{ color: "red" }}>*</i></label>
                                <div class="input-group-append">
                                  <input type="text" class="form-control"
                                    name="purchase_cost" id="purchase_cost"
                                    placeholder={t('consumable.purchase_cost')} onChange={this.myChangeHandler}  />
                                </div>
                                <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.purchase_cost}</div>

                              </div>
                            </div>
                            <div class="form-group row">
                              <div class="col-sm-8 mb-3 mb-sm-0">
                                <label for="text" class=" control-label customlabel-textcolor"> {t('consumable.qty')} <i style={{ color: "red" }}>*</i></label>

                                <input type="number" class="form-control "
                                  name="qty" id="qty"
                                  placeholder={t('consumable.qty')} onChange={this.myChangeHandler} />
                              </div>
                              <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.qty}</div>

                            </div>
                            <div class="form-group row">
                              <div class="col-sm-8 mb-3 mb-sm-0">
                                <label for="text" class=" control-label customlabel-textcolor">{t('consumable.min_amt')} <i style={{ color: "red" }}>*</i></label>

                                <input type="number" class="form-control "
                                  name="min_amt" id="min_amt"
                                  placeholder={t('consumable.min_amt')} onChange={this.myChangeHandler} />
                              </div>
                              <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.min_amt}</div>

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
        <ConsumablesMain showNotifications={this.state.showNotifications} NotificationMessage={NotificationMessage} />
      );
    }
  }
};
export default withTranslation()(ConsumablesCreate);

