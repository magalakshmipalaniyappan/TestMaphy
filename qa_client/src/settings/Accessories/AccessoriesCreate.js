import React from 'react';
import axios from 'axios';
import Countries from 'react-select-country';
import { Button, Modal } from 'react-bootstrap'
import AccessoriesMain from './AccessoriesMain'
import { withTranslation } from 'react-i18next';
var validator = require('validator');
const Domain = process.env.REACT_APP_URL;
var NotificationMessage = "";
var ResponseStatus = "";
var ResponseStatusCategory = "";
var NotificationMessageCategory = "";
var ResponseStatusSupplier = "";
var NotificationMessageSupplier = "";
var ResponseStatusManufacturer = "";
var NotificationMessageManufacturer = "";
var ResponseStatusLocation = "";
var NotificationMessageLocation = "";
class AccessoriesCreate extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      value: "en",

      errors: {},
      ShowCreate: true,
      showNotifications: false,
      showNotificationsCategory: false,
      showNotificationsSupplier: false,
      showNotificationsManufacturer: false,
      showNotificationsLocation: false


    }
    this.myChangeHandler = this.myChangeHandler.bind(this);
    this.mySubmitHandler = this.mySubmitHandler.bind(this);

  };
  myChangeHandler = (event) => {

    this.setState({ [event.target.name]: event.target.value });
  }

  async componentDidMount() {
    var today = new Date();
    var current_date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
   // var date = new Date().toDateString("dd/MM/yyyy");
    this.setState({ current_date: current_date })
    this.loadDropdownValues();

  }
  async loadDropdownValues() {
    const companyurl = Domain + '/companies/selectList?page=1';
    const locationsurl = Domain + '/locations/selectList?page=1';
    const categoryurl = Domain + '/categories/selectList/Accessory?page=1';
    const suppliersurl = Domain + '/suppliers/selectList?page=1';
    const manufactureurl = Domain + '/manufacturers/selectList?page=1';


    const [company_id, location_id, category_id, suppliers_id, manufacturer_id] = await Promise.all([
      axios.get(companyurl),
      axios.get(locationsurl),
      axios.get(categoryurl),
      axios.get(suppliersurl),
      axios.get(manufactureurl)
    ]);
    this.setState({
      companyData: company_id.data.items,
      locationData: location_id.data.items,
      categoryData: category_id.data,
      suppliersData: suppliers_id.data.items,
      manufactureData: manufacturer_id.data.items
    });
  }
  mySubmitHandler = async (event) => {
    event.preventDefault();
    if (this.validateForm()) {
      await axios({
        method: 'post',
        url: Domain + '/accessories',
        data: JSON.stringify({
          name: this.state.AccessoriesName,
          company_id: this.state.company_id,
          category_id: this.state.category_id,
          supplier_id: this.state.suppliers_id,
          manufacturer_id: this.state.manufacturer_id,
          location_id: this.state.location_id,
          qty: this.state.qty,
          min_amt: this.state.min_amt,
          model_number: this.state.model_number,
          order_number: this.state.order_number,
          purchase_date: this.state.purchase_date,
          purchase_cost: this.state.purchase_cost
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

      this.loadDropdownValues();
    }
  }
  BackBtnClick = () => {
    NotificationMessage="";
   this.setState({showNotifications:false});
    this.setState({ ShowCreate: false });
  }

  validateFormModalCategory() {
    let state = this.state,errors = {},formIsValid = true;
    if (!state["category"]) {
      formIsValid = false;
      errors["category"] = "*Please enter category.";
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
  validateFormModalManufacture() {
    let state = this.state,errors = {},formIsValid = true;
    if (!state["manufacturer"]) {
      formIsValid = false;
      errors["manufacturer"] = "*Please enter manufacturer.";
    }

    this.setState({
      errors: errors
    });
    return formIsValid;

  }
  validateFormModalSupplier() {
    let state = this.state,errors = {},formIsValid = true;
    if (!state["supplier"]) {
      formIsValid = false;
      errors["supplier"] = "*Please enter supplier.";
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
      errors["location"] = "*Please enter location";
    }
    if (!state["city"]) {
      formIsValid = false;
      errors["city"] = "*Please enter city";
    }
    if (!state["Country"]) {
      formIsValid = false;
      errors["Country"] = "*Please select country.";
    }
    this.setState({
      errors: errors
    });
    return formIsValid;

  }
  validateForm() {
    let state = this.state,errors = {},formIsValid = true;
    if (!state["company_id"]) {
      formIsValid = false;
      errors["company_id"] = "Please select company";
    }
    if (!state["AccessoriesName"]) {
      formIsValid = false;
      errors["AccessoriesName"] = "Please enter Accessories name";
    }
    if (!state["suppliers_id"]) {
      formIsValid = false;
      errors["suppliers_id"] = "Please select vendor";
    }
    if (!state["location_id"]) {
      formIsValid = false;
      errors["location_id"] = "Please select location";
    }
    if (!state["manufacturer_id"]) {
      formIsValid = false;
      errors["manufacturer_id"] = "Please select manufacturer";
    }

    if (!state["category_id"]) {
      formIsValid = false;
      errors["category_id"] = "Please select category";
    }
    if (!state["model_number"]) {
      formIsValid = false;
      errors["model_number"] = "Please enter model number";
    }

    if (!state["order_number"]) {
      formIsValid = false;
      errors["order_number"] = "Please enter order number";
    }
    if (!state["qty"]) {
      formIsValid = false;
      errors["qty"] = "Please enter  Qty";
    }
    else {
      if (typeof state["qty"] !== "undefined") {
        if(!validator.isInt(state["qty"], {gt: 0}))
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
        if(!validator.isInt(state["min_amt"], {gt: 0}))
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
       if(!validator.isFloat(state["purchase_cost"], {gt: 0}))
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
  addCategory = async (event) => {

    if (this.validateFormModalCategory()) {
      await axios({
        method: 'post',
        url: Domain + '/categories',
        data: JSON.stringify({
          name: this.state.category,
          category_type: this.state.CategoryType,
        }),
        headers: {

          'Content-Type': 'application/json'
        }

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
        this.setState({ show: !this.state.show });
        this.setState({ category: "" });
        this.setState({ CategoryType: "" });
      }

    }
  }
  handleModal() {
    this.setState({ show: !this.state.show })
  }
  CancelModalCategory = () => {
    this.setState({ show: !this.state.show })
    this.setState({ errors: "" });
    this.setState({ showNotificationsCategory: false });
    this.setState({ category: "" });
    this.setState({ CategoryType: "" });
  };
  addSupplier = async (event) => {

    if (this.validateFormModalSupplier()) {
      await axios({
        method: 'post',
        url: Domain + '/suppliers',
        data: JSON.stringify({ name: this.state.supplier }),
        headers: {

          'Content-Type': 'application/json'
        }

      })
        .then(function (response) {
          //handle success
          ResponseStatusSupplier = response.data.success;
          console.log("res" + response.status, ":", response.data.message);
          NotificationMessageSupplier = response.data.message;
        })
        .catch(function (response) {
          //handle error
          console.log(response);
        });

      this.loadDropdownValues();
      this.setState({ showNotificationsSupplier: true });
      if (ResponseStatusSupplier === true) {
        this.setState({ showSupplier: !this.state.showSupplier });
        this.setState({ supplier: "" });
      }

    }
  }
  handleModalSupplier() {
    this.setState({ showSupplier: !this.state.showSupplier })
  }
  CancelModalSupplier = () => {
    this.setState({ showSupplier: !this.state.showSupplier })
    this.setState({ errors: "" });
    this.setState({ showNotificationsSupplier: false });
    this.setState({ supplier: "" });
  };
  addManufacture = async (event) => {

    if (this.validateFormModalManufacture()) {
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
        this.setState({ showManufacture: !this.state.showManufacture });
        this.setState({ manufacturer: "" });
      }
    }
  }
  handleModalManufacture() {
    this.setState({ showManufacture: !this.state.showManufacture })
  }
  CancelModalManufacturer = () => {
    this.setState({ showManufacture: !this.state.showManufacture })
    this.setState({ errors: "" });
    this.setState({ showNotificationsManufacturer: false });
    this.setState({ manufacturer: "" });
  };
  addLocation = async (event) => {

    if (this.validateFormModalLocation()) {

      await axios({
        method: 'post',
        url: Domain + '/locations',
        data: JSON.stringify({
          name: this.state.location,
          city: this.state.city,
          country: this.state.Country
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
        this.setState({ showLocation: !this.state.showLocation })
        this.setState({ location: "" });
        this.setState({ city: "" });
        this.setState({ Country: "" });
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
    this.setState({ Country: "" });

  };
  onLanguageHandle = (event) => {
    let newLang = event.target.value;
    this.setState({ value: newLang })
    this.props.i18n.changeLanguage(newLang)
  }

  render() {
    const { showNotifications, ShowCreate, showNotificationsCategory, showNotificationsSupplier, showNotificationsManufacturer, showNotificationsLocation } = this.state;
    const { t } = this.props;
    if (ShowCreate) {
      return (
        <div>

          <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800 custommain-title" name="createaccessory">{t('accessory.createaccessory')}</h1>
            <button name="back" onClick={this.BackBtnClick} className=" btn btn-sm btn-primary shadow-sm custommain-title">
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
                                <label for="text" class=" control-label customlabel-textcolor"> {t('accessory.company_id')} <i style={{ color: "red" }}>*</i> </label>

                                <select ref="company_id" class="form-control" onChange={this.myChangeHandler} id="company_id" name="company_id" >
                                  <option value="">{t('select.company')} </option>
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

                              </div>
                              <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.company_id} </div>
                            </div>
                            <div class="form-group row">
                              <div class="col-sm-8 mb-3 mb-sm-0">
                                <label for="text" class=" control-label customlabel-textcolor"> {t('accessory.name')} <i style={{ color: "red" }}>*</i> </label>

                                <input type="text" class="form-control "
                                  name="AccessoriesName" id="AccessoriesName"
                                  placeholder={t('accessory.name')} onChange={this.myChangeHandler} />

                              </div>
                              <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.AccessoriesName} </div>

                            </div>
                            <div class="form-group row">
                              <div class="col-sm-8 mb-3 mb-sm-0">
                                <label for="text" class="control-label customlabel-textcolor">  {t('accessory.category_id')} <i style={{ color: "red" }}>*</i></label>

                                <select ref="category_id" class="form-control" onChange={this.myChangeHandler} id="category_id" name="category_id" >
                                  <option value=""> {t('select.category')}</option>
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
                                <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.category_id} </div>

                              </div>
                              <div class="col-sm-4">
                                <Button name="new" onClick={() => { this.handleModal() }}>{t('button.new')}</Button>
                                <Modal show={this.state.show} onHide={() => this.handleModal()}>
                                  <Modal.Header closeButton onClick={() => { this.CancelModalCategory() }} name="category">{t('newbutton.category')}</Modal.Header>
                                  <Modal.Body>

                                    {(() => {
                                      if (showNotificationsCategory) {
                                        return (
                                          <div class="row">
                                            <div class="col-md-12">

                                              {(NotificationMessageCategory === "Created successfully") ? null

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
                                      <label for="categoryname" class="customlabel-textcolor">{t('newbutton.categoryname')} </label>
                                      <input type="text" class="form-control "
                                        name="category" id="modal-category"
                                        placeholder={t('newbutton.categoryname')} onChange={this.myChangeHandler} />
                                      <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.category}</div>
                                    </div>
                                    <div class="form-group row">
                                      <label for="CategoryType" class="customlabel-textcolor">{t('newbutton.categorytype')} </label>
                                      <select ref="CategoryType" class="form-control" onChange={this.myChangeHandler} id="CategoryType" name="CategoryType">
                                        <option value="">{t('select.categorytype')}</option>
                                        <option value="Accessory" >{t('newbutton.Accessory')}</option>
                                        <option value="License" disabled>{t('newbutton.License')}</option>
                                        <option value="Consumable" disabled>{t('newbutton.Consumable')}</option>
                                        <option value="Component" disabled>{t('newbutton.Component')}</option>
                                        <option value="Asset" disabled>{t('newbutton.Asset')}</option>
                                      </select>
                                      <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.CategoryType}</div>

                                    </div>
                                  </Modal.Body>
                                  <Modal.Footer>
                                    <div class="form-group ">
                                      <Button name="save" onClick={() => { this.addCategory() }}>
                                        {t('button.save')}
                                      </Button >
                                      <Button name="cancel" onClick={() => { this.CancelModalCategory() }}>
                                        {t('button.cancel')}
                                      </Button >
                                    </div>
                                  </Modal.Footer>
                                </Modal>
                              </div>
                            </div>

                            <div class="form-group row">
                              <div class="col-sm-8 mb-3 mb-sm-0">
                                <label for="text" class=" control-label customlabel-textcolor"> {t('accessory.supplier_id')} <i style={{ color: "red" }}>*</i>  </label>

                                <select ref="suppliers_id" class="form-control" onChange={this.myChangeHandler} id="suppliers_id" name="suppliers_id">
                                  <option value=""> {t('select.vendor')}</option>
                                  {(() => {
                                    if (this.state.suppliersData) {
                                      return (
                                        this.state.suppliersData.map(obj => {
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
                                <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.suppliers_id} </div>
                              </div>
                              <div class="col-sm-4">
                                <Button name="new" onClick={() => { this.handleModalSupplier() }}>{t('button.new')}</Button>
                                <Modal show={this.state.showSupplier} onHide={() => this.handleModalSupplier()}>
                                  <Modal.Header closeButton onClick={() => { this.CancelModalSupplier() }} name="supplier">{t('newbutton.supplier')}</Modal.Header>
                                  <Modal.Body>

                                    {(() => {
                                      if (showNotificationsSupplier) {
                                        return (
                                          <div class="row">
                                            <div class="col-md-12">

                                              {(NotificationMessageSupplier === "Created successfully") ? null

                                                : <div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                  <strong> {NotificationMessageSupplier}</strong>

                                                </div>

                                              }

                                            </div>
                                          </div>
                                        )
                                      }


                                    })()}
                                    <div class="form-group row">

                                      <input type="text" class="form-control"
                                        name="supplier" id="modal-supplier"
                                        placeholder={t('newbutton.suppliername')} onChange={this.myChangeHandler} />
                                      <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.supplier}</div>
                                    </div>

                                  </Modal.Body>
                                  <Modal.Footer>
                                    <div class="form-group ">
                                      <Button name="save" onClick={() => { this.addSupplier() }}>
                                        {t('button.save')}
                                      </Button >
                                      <Button name="cancel" onClick={() => { this.CancelModalSupplier() }}>
                                        {t('button.cancel')}
                                      </Button >
                                    </div>
                                  </Modal.Footer>
                                </Modal>
                              </div>
                            </div>
                            <div class="form-group row">
                              <div class="col-sm-8 mb-3 mb-sm-0">
                                <label for="text" class=" control-label customlabel-textcolor"> {t('accessory.manufacturer_id')} <i style={{ color: "red" }}>*</i>  </label>

                                <select ref="manufacturer_id" class="form-control" onChange={this.myChangeHandler} id="manufacturer_id" name="manufacturer_id" >
                                  <option value=""> {t('select.manufacturer')}</option>
                                  {(() => {
                                    if (this.state.manufactureData) {
                                      return (
                                        this.state.manufactureData.map(obj => {
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
                                <Button name="new" onClick={() => { this.handleModalManufacture() }}>{t('button.new')}</Button>
                                <Modal show={this.state.showManufacture} onHide={() => this.handleModalManufacture()}>
                                  <Modal.Header closeButton onClick={() => { this.CancelModalManufacturer() }} name="manufacturer">{t('newbutton.manufacturer')}</Modal.Header>
                                  <Modal.Body>

                                    {(() => {
                                      if (showNotificationsManufacturer) {
                                        return (
                                          <div class="row">
                                            <div class="col-md-12">

                                              {(NotificationMessageManufacturer === "Created successfully") ? null

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
                                      <Button name="save" onClick={() => { this.addManufacture() }}>
                                        {t('button.save')}
                                      </Button >
                                      <Button name="cancel" onClick={() => { this.CancelModalManufacturer() }}>
                                        {t('button.cancel')}
                                      </Button >
                                    </div>
                                  </Modal.Footer>
                                </Modal>
                              </div>
                            </div>

                            <div class="form-group row">
                              <div class="col-sm-8 mb-3 mb-sm-0">
                                <label for="text" class=" control-label customlabel-textcolor"> {t('accessory.location_id')} <i style={{ color: "red" }}>*</i></label>

                                <select ref="location_id" class="form-control" onChange={this.myChangeHandler} id="location_id" name="location_id">
                                  <option value="">{t('select.location')}</option>
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
                                <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.location_id} </div>
                              </div>

                              <div class="col-sm-4">
                                <Button name="new" onClick={() => { this.handleModalLocation() }}>{t('button.new')}</Button>
                                <Modal show={this.state.showLocation} onHide={() => this.handleModalLocation()}>
                                  <Modal.Header closeButton onClick={() => { this.CancelModalLocation() }} name="location">{t('newbutton.location')}</Modal.Header>
                                  <Modal.Body>

                                    {(() => {
                                      if (showNotificationsLocation) {
                                        return (
                                          <div class="row">
                                            <div class="col-md-12">

                                              {(NotificationMessageLocation === "Created successfully") ? null

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

                                      <input type="text" class="form-control customdept-location"
                                        name="location" id="modal-location"
                                        placeholder={t('newbutton.locationname')} onChange={this.myChangeHandler} />
                                      <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.location}</div>
                                    </div>

                                    <div class="form-group row">


                                      <input type="text" class="form-control customdept-location"
                                        name="city" id="city"
                                        placeholder={t('newbutton.locationcity')} onChange={this.myChangeHandler} />
                                      <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.city}</div>

                                    </div>

                                    <div class="form-group row ">
                                      <Countries class="form-control" ref="Country" name="Country" empty={t('newbutton.locationcountry')} onChange={this.myChangeHandler} />
                                      <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.Country}</div>

                                    </div>

                                  </Modal.Body>
                                  <Modal.Footer>
                                    <div class="form-group ">
                                      <Button name="save" onClick={() => { this.addLocation() }}>
                                        {t('button.save')}
                                      </Button >
                                      <Button name="cancel" onClick={() => { this.CancelModalLocation() }}>
                                        {t('button.cancel')}
                                      </Button >
                                    </div>
                                  </Modal.Footer>
                                </Modal>
                              </div>

                            </div>

                            <div class="form-group row">
                              <div class="col-sm-8 mb-3 mb-sm-0">
                                <label for="text" class=" control-label customlabel-textcolor"> {t('accessory.qty')} <i style={{ color: "red" }}>*</i> </label>

                                <input type="number" class="form-control "
                                  name="qty" id="qty"
                                  placeholder={t('accessory.qty')} onChange={this.myChangeHandler} />
                              </div>
                              <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.qty}
                              </div>
                            </div>
                            <div class="form-group row">
                              <div class="col-sm-8 mb-3 mb-sm-0">
                                <label for="text" class=" control-label customlabel-textcolor"> {t('accessory.min_amt')} <i style={{ color: "red" }}>*</i></label>

                                <input type="number" class="form-control "
                                  name="min_amt" id="min_amt"
                                  placeholder={t('accessory.min_amt')} onChange={this.myChangeHandler} />
                              </div>
                              <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.min_amt}
                              </div>
                            </div>

                            <div class="form-group row">
                              <div class="col-sm-8 mb-3 mb-sm-0">
                                <label for="text" class="control-label customlabel-textcolor">{t('accessory.model_number')}<i style={{ color: "red" }}>*</i></label>

                                <input type="text" class="form-control "
                                  name="model_number" id="model_number"
                                  placeholder={t('accessory.model_number')} onChange={this.myChangeHandler} />
                              </div>
                              <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.model_number} </div>
                            </div>
                            <div class="form-group row">
                              <div class="col-sm-8 mb-3 mb-sm-0">
                                <label for="text" class=" control-label customlabel-textcolor"> {t('accessory.order_number')}<i style={{ color: "red" }}>*</i></label>

                                <input type="text" class="form-control "
                                  name="order_number" id="order_number"
                                  placeholder={t('accessory.order_number')} onChange={this.myChangeHandler} />
                              </div>
                              <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.order_number} </div>
                            </div>
                            <div class="form-group row">
                              <div class="col-sm-8 mb-3 mb-sm-0">
                                <label for="text" class=" control-label customlabel-textcolor">{t('accessory.purchase_date')} <i style={{ color: "red" }}>*</i></label>

                                <input type="date" class="form-control "
                                  name="purchase_date" id="purchase_date" max={this.state.current_date}
                                  placeholder={t('accessory.purchase_date')} onChange={this.myChangeHandler} />

                              </div>
                              <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.purchase_date} </div>
                            </div>
                            <div class="form-group row">
                              <div class="col-sm-8 mb-3 mb-sm-0">
                                <label for="text" class=" control-label customlabel-textcolor"> {t('accessory.purchase_cost')} <i style={{ color: "red" }}>*</i></label>
                                <div class="input-group-append">
                                  <input type="text" class="form-control "
                                    name="purchase_cost" id="purchase_cost"
                                    placeholder={t('accessory.purchase_cost')} onChange={this.myChangeHandler} />
                                </div>
                                <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.purchase_cost}
                                </div>
                              </div>
                            </div>
                            <div class="form-group">
                              <button name="btnCancel" onClick={this.BackBtnClick} class="btn btn-link text-left" >{t('button.btnCancel')}</button>

                              <button name='submit' class="btn-primary" >{t('button.submit')}</button>
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
        <AccessoriesMain showNotifications={this.state.showNotifications} NotificationMessage={NotificationMessage} />
      );
    }
  }
};
export default withTranslation()(AccessoriesCreate);

