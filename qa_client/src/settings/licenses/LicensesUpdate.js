import React from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap'
import LicensesMain from './LicensesMain';
import { withTranslation } from 'react-i18next';
import validator from 'validator';

const Domain = process.env.REACT_APP_URL;
var NotificationMessage = "";
var ResponseStatus = "";
var ResponseStatusCategory = "";
var NotificationMessageCategory = "";
var ResponseStatusSupplier = "";
var NotificationMessageSupplier = "";
var ResponseStatusManufacturer = "";
var NotificationMessageManufacturer = "";
class LicensesUpdate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: "en",
            errors: {},
            LicensesName: '',
            ShowMain: false,
            showUpdate: true,
            showNotifications: false,
            showNotificationsCategory: false,
            showNotificationsSupplier: false,
            showNotificationsManufacturer: false,
            showCategory: false,

            show: false,
            showSupplier: false
        }
        this.addCategory = this.addCategory.bind(this);
        this.addManufacture = this.addManufacture.bind(this);
        this.addSupplier = this.addSupplier.bind(this);
    }
    componentDidMount() {
        this.loadDropdownValues();
        this.setState({editProcess:this.props.editProcess});
        this.setState({ LicensesName: this.props.LicensesDatatoUpdate.name });
        this.setState({ LicensesId: this.props.LicensesDatatoUpdate.id });
        this.setState({ company_id: this.props.LicensesDatatoUpdate.company.id });
        this.setState({ category_id: this.props.LicensesDatatoUpdate.category.id });
        this.setState({ supplier_id: this.props.LicensesDatatoUpdate.supplier.id });
        this.setState({ manufacturer_id: this.props.LicensesDatatoUpdate.manufacturer.id });
        this.setState({ serial: this.props.LicensesDatatoUpdate.serial });
        this.setState({ seats: this.props.LicensesDatatoUpdate.seats });
        this.setState({ license_name: this.props.LicensesDatatoUpdate.license_name });
        this.setState({ license_email: this.props.LicensesDatatoUpdate.license_email });
        this.setState({ order_number: this.props.LicensesDatatoUpdate.order_number });
        this.setState({ purchase_cost: this.props.LicensesDatatoUpdate.purchase_cost });
        this.setState({ purchase_date: this.props.LicensesDatatoUpdate.purchase_date.formatted });
        this.setState({ expiration_date: this.props.LicensesDatatoUpdate.expiration_date.date });
        this.setState({ termination_date: this.props.LicensesDatatoUpdate.termination_date.date });
        this.setState({ cost: this.props.LicensesDatatoUpdate.cost });
        this.setState({ purchase_order: this.props.LicensesDatatoUpdate.purchase_order });
        this.setState({ maintained: this.props.LicensesDatatoUpdate.maintained });
        this.setState({ reassignable: this.props.LicensesDatatoUpdate.reassignable });
        this.setState({ notes: this.props.LicensesDatatoUpdate.notes });

    }
    async loadDropdownValues() {
        const companyurl = Domain + '/companies/selectList?page=1';
        const supplierurl = Domain + '/suppliers/selectList?page=1';
        const categoriesurl = Domain + '/categories/selectList/License?page=1';
        const manufacturerurl = Domain + '/manufacturers/selectList?page=1';

        const [company_id, category_id, supplier_id, manufacturer_id] = await Promise.all([
            axios.get(companyurl),
            axios.get(categoriesurl),
            axios.get(supplierurl),
            axios.get(manufacturerurl)
        ]);

        this.setState({
            CompanyData: company_id.data.items,

            CategoriesData: category_id.data,
            SupplierData: supplier_id.data.items,
            ManufacturerData: manufacturer_id.data.items,

        });
    }

    addSupplier = async (event) => {

        if (this.validateSupplier()) {
            await axios({
                method: 'post',
                url: Domain + '/suppliers',
                data: JSON.stringify({
                    name: this.state.supplier

                }),
                headers: { 'Content-Type': 'application/json' }

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
    handleSupplier() {
        this.setState({ showSupplier: !this.state.showSupplier })
    }
    CancelModalSupplier = () => {
        this.setState({ showSupplier: !this.state.showSupplier })
        this.setState({ errors: "" });
        this.setState({ showNotificationsSupplier: false });
        this.setState({ supplier: "" });

    };
    addCategory = async (event) => {
        if (this.validateCategory()) {
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
                    NotificationMessageCategory = response.data.message;
                })
                .catch(function (response) {
                    //handle error
                    console.log(response);
                });

            this.loadDropdownValues();
            this.setState({ showNotificationsCategory: true });
            if (ResponseStatusCategory === true) {
                this.setState({ showCategory: !this.state.showCategory })
                this.setState({ category: "" });
                this.setState({ CategoryType: "" });
                //  }
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

        if (this.validateManufacture()) {
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
    validateCategory() {
        let state = this.state,errors = {},formIsValid = true;
        // if(state.seats)
        if (!state["category"]) {
            formIsValid = false;
            errors["category"] = "*Please select category.";
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
    validateSupplier() {
        let state = this.state,errors = {},formIsValid = true;
        if (!state["supplier"]) {
            formIsValid = false;
            errors["supplier"] = "*Please enter supplier";
        }

        this.setState({
            errors: errors
        });
        return formIsValid;

    }
    validateManufacture() {
        let state = this.state,errors = {},formIsValid = true;

        if (!state["manufacturer"]) {
            formIsValid = false;
            errors["manufacturer"] = "*Please enter manufacturer";
        }

        this.setState({
            errors: errors
        });
        return formIsValid;

    }
    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
    }
    CheckboxChanged = (event) => {
        let nam = event.target.name;
        let val;
        if (event.target.checked)
            val = true;
        else
            val = false;
        this.setState({ [nam]: val });
    }
    mySubmitHandler = async (event) => {
        event.preventDefault();
        if (this.ValidationForm()) {
            await axios({
                method:this.state.editProcess==="Update"?'put':'post',
                url:this.state.editProcess==="Update" ? Domain + '/licenses/' + this.state.LicensesId:Domain + '/licenses',
                data: JSON.stringify({
                    name: this.state.LicensesName,
                    company_id: this.state.company_id,
                    category_id: this.state.category_id,
                    supplier_id: this.state.supplier_id,
                    manufacturer_id: this.state.manufacturer_id,
                    seats: this.state.seats,
                    serial: this.state.serial,
                    license_name: this.state.license_name,
                    license_email: this.state.license_email,
                    reassignable: this.state.reassignable,
                    order_number: this.state.order_number,
                    purchase_cost: this.state.purchase_cost,
                    purchase_date: this.state.purchase_date,
                    purchase_order: this.state.purchase_order,
                    expiration_date: this.state.expiration_date,
                    cost: this.state.cost,
                    notes: this.state.notes,
                    termination_date: this.state.termination_date,
                    maintained: this.state.maintained
                }),
                headers: {

                    'Content-Type': 'application/json'
                }

            })
                .then((response) => {
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
   
    ValidationForm() {
        let state = this.state,errors = {},formIsValid = true;
        var today = new Date();
        var current_date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    
        if(!state["LicensesName"])
        {
          formIsValid = false;
          errors["LicensesName"] = "* Please enter License Name";   
        }
    
        if(!state["company_id"])
        {
          formIsValid = false;
          errors["company_id"] = "* Please select company";   
        }
        if(!state["category_id"])
        {
          formIsValid = false;
          errors["category_id"] = "* Please select category";   
        }
        if(!state["supplier_id"])
        {
          formIsValid = false;
          errors["supplier_id"] = "* Please select vendor";   
        }
        if(!state["manufacturer_id"])
        {
          formIsValid = false;
          errors["manufacturer_id"] = "* Please select manufacturer";   
        }
        if(!state["serial"])
        {
          formIsValid = false;
          errors["serial"] = "* Please enter product key";   
        }
        if(!state["seats"])
        {
          formIsValid = false;
          errors["seats"] = "* Please enter seats";   
        }
        else{
            if (typeof state["seats"] !== "undefined") {
                var pattern1 = new RegExp(/^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/);
                if (!pattern1.test(state["seats"])) {
                  formIsValid = false;
                  errors["seats"] = "*Only allow numeric and greater than zero";
                }
              }
        }
        if(!state["license_name"])
        {
          formIsValid = false;
          errors["license_name"] = "* Please enter licensed to name";   
        }
        if(!state["license_email"])
        {
          formIsValid = false;
          errors["license_email"] = "* Please enter licensed to email";   
        }
        else{
          if(!validator.isEmail(this.state.license_email))
          {
           formIsValid = false;
           errors["license_email"] = "* Please enter valid Email";
          }
         }
     
         if(!state["order_number"])
         {
           formIsValid = false;
           errors["order_number"] = "* Please enter order number";   
         }
         if(!state["purchase_cost"])
         {
           formIsValid = false;
           errors["purchase_cost"] = "* Please enter purchase cost";   
         }
         else{
            if (typeof state["purchase_cost"] !== "undefined") {
                var pattern = new RegExp(/^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/);
                if (!pattern.test(state["purchase_cost"])) {
                  formIsValid = false;
                  errors["purchase_cost"] = "*Only allow numeric and greater than zero";
                }
              }
         }
    
         if(!state["purchase_date"])
         {
           formIsValid = false;
           errors["purchase_date"] = "* Please select purchase date";   
         }
         else{
            if (!validator.isDate(this.state.purchase_date)) {
              formIsValid = false;
              errors["purchase_date"] = "Please enter valid expiration date";
            }
            else {  
                if(validator.isAfter(this.state.purchase_date))
                {
                  formIsValid = false;
                   errors["purchase_date"] = "Purchase date cannot be in the future";
                }
              }
           }
    
         if(!state["purchase_order"])
         {
           formIsValid = false;
           errors["purchase_order"] = "* Please enter purchase order";   
         }
    
         if(!state["termination_date"])
         {
           formIsValid = false;
           errors["termination_date"] = "* Please select renewal date";   
         }
         else{
            if (!validator.isDate(this.state.termination_date)) {
              formIsValid = false;
              errors["termination_date"] = "Please enter valid renewal date";
            }
           }
       if(!state["expiration_date"])
         {
           formIsValid = false;
           errors["expiration_date"] = "* Please select expiration date";   
         }
         else{
            if (!validator.isDate(this.state.expiration_date)) {
              formIsValid = false;
              errors["expiration_date"] = "Please enter valid expiration date";
            }
           }
         if(!state["notes"])
         {
           formIsValid = false;
           errors["notes"] = "* Please enter notes";   
         }
    
    
        if (this.state.purchase_date > current_date) {
          formIsValid = false;
          errors["purchase_date"] = "*Purchase Date cannot be in the future";
        }
        if (this.state.purchase_date > this.state.expiration_date) {
          formIsValid = false;
          errors["expiration_date"] = "*Purchase Date should be less than Expired date";
        }
        if (this.state.purchase_date > this.state.termination_date) {
          formIsValid = false;
          errors["termination_date"] = "*Purchase Date should be less than Renewal date";
        }

        this.setState({ errors: errors });
        return formIsValid;
      }

    BackBtnClick = () => {
        this.setState({ showUpdate: false });
        this.setState({ showNotifications: false });

    }

    render() {
        const { showNotifications, showUpdate, showNotificationsCategory, showNotificationsSupplier, showNotificationsManufacturer } = this.state;
        const { t } = this.props;
        if (showUpdate) {
            return (
                <div>

                    <div class="d-sm-flex align-items-center justify-content-between mb-4">
                        <h1 class="h3 mb-0 text-gray-800 custommain-title" name="updatelicense">  {this.state.editProcess==="Update"?t('license.updatelicense') :t('license.clonelicense')}<span></span></h1>
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
                                                                <label for="text" class=" control-label customlabel-textcolor"> {t('license.name')} <i style={{ color: "red" }}>*</i></label>

                                                                <input type="text" class="form-control "
                                                                    value={this.state.LicensesName} name="LicensesName" id="LicensesName"
                                                                    placeholder={t('license.name')} onChange={this.myChangeHandler}  />
                                                            </div>
                                                            <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.LicensesName}</div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <div class="col-sm-8 mb-3 mb-sm-0">
                                                                <label for="text" class=" control-label customlabel-textcolor"> {t('license.category_id')} <i style={{ color: "red" }}>*</i></label>

                                                                <select ref="category_id" class="form-control" value={this.state.category_id} onChange={this.myChangeHandler} id="category_id" name="category_id" >
                                                                    <option value="">{t('select.category')}</option>
                                                                    {(() => {
                                                                        if (this.state.CategoriesData) {
                                                                            return (
                                                                                this.state.CategoriesData.map(obj => {
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
                                                            <div class="col-sm-4 ">
                                                                <Button onClick={() => { this.handleModalCategory() }}>{t('button.new')}</Button>
                                                                <Modal show={this.state.showCategory} onHide={() => this.handleModalCategory()}>
                                                                    <Modal.Header closeButton onClick={() => { this.CancelModalCategory() }} name="createcategory">{t('license.createcategory')} </Modal.Header>
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
                                                                            <label for="CategoryType" class="customlabel-textcolor">Categories Name <i style={{ color: "red" }}>*</i></label>

                                                                            <input type="text" class="form-control "
                                                                                name="category" id="category"
                                                                                placeholder={t('license.category')} onChange={this.myChangeHandler} />
                                                                            <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.category}</div>
                                                                        </div>
                                                                        <div class="form-group row">
                                                                            <label for="CategoryType" class="customlabel-textcolor">Categories Type <i style={{ color: "red" }}>*</i></label>
                                                                            <select ref="CategoryType" class="form-control" onChange={this.myChangeHandler} id="CategoryType" name="CategoryType">
                                                                                <option value="">{t('select.categorytype')}</option>
                                                                                <option value="Accessory" disabled>{t('license.Accessory')}</option>
                                                                                <option value="License" >{t('license.License')}</option>
                                                                                <option value="Consumable" disabled>{t('license.Consumable')}</option>
                                                                                <option value="Component" disabled>{t('license.Component')}</option>
                                                                                <option value="Asset" disabled>{t('license.Asset')}</option>
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
                                                                <label for="text" class=" control-label customlabel-textcolor">  {t('license.serial')} <i style={{ color: "red" }}>*</i></label>

                                                                <textarea class="form-control " id="serial"
                                                                    onChange={this.myChangeHandler} name="serial"
                                                                    value={this.state.serial} placeholder={t('license.serial')} />
                                                            </div>
                                                            <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.serial}</div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <div class="col-sm-8 mb-3 mb-sm-0">
                                                                <label for="text" class=" control-label customlabel-textcolor"> {t('license.seats')} <i style={{ color: "red" }}>*</i></label>
                                                                <input type="text" class="form-control"
                                                                    value={this.state.seats} name="seats" id="seats"
                                                                    placeholder={t('license.seats')} onChange={this.myChangeHandler} />
                                                            </div>
                                                            <div style={{ color: "red" }}  > <div className="errorMsg">{this.state.errors.seats}</div></div>
                                                        </div>  <div class="form-group row">
                                                            <div class="col-sm-8 mb-3 mb-sm-0">
                                                                <label for="text" class=" control-label customlabel-textcolor">  {t('license.company_id')} <i style={{ color: "red" }}>*</i></label>

                                                                <select ref="company_id" class="form-control" value={this.state.company_id} onChange={this.myChangeHandler} id="company_id" name="company_id" >
                                                                    <option value="">{t('select.company')}</option>
                                                                    {(() => {
                                                                        if (this.state.CompanyData) {
                                                                            return (
                                                                                this.state.CompanyData.map(obj => {
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
                                                            <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.company_id}</div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <div class="col-sm-8 mb-3 mb-sm-0">
                                                                <label for="text" class="control-label customlabel-textcolor"> {t('license.manufacturer_id')} <i style={{ color: "red" }}>*</i></label>

                                                                <select ref="manufacturer_id" class="form-control" value={this.state.manufacturer_id} onChange={this.myChangeHandler} id="manufacturer_id" name="manufacturer_id" >
                                                                    <option value=""> {t('select.manufacturer')}</option>
                                                                    {(() => {
                                                                        if (this.state.ManufacturerData) {
                                                                            return (
                                                                                this.state.ManufacturerData.map(obj => {
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
                                                                    <Modal.Header closeButton onClick={() => { this.CancelModalManufacturer() }} name="createmanufacture">{t('license.createmanufacture')}</Modal.Header>
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
                                                                                name="manufacturer" value={this.state.manufacturer} id="modal-manufacturer"
                                                                                placeholder={t('license.manufacturer')} onChange={this.myChangeHandler} />
                                                                            <div style={{ color: "red" }}  > <div className="errorMsg">{this.state.errors.manufacturer}</div></div>
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

                                                                <label for="text" class=" control-label customlabel-textcolor">{t('license.license_name')} <i style={{ color: "red" }}>*</i></label>

                                                                <input type="text" class="form-control " value={this.state.license_name} name="license_name" id="license_name"
                                                                    placeholder={t('license.license_name')} onChange={this.myChangeHandler}  />
                                                            </div>
                                                            <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.license_name}</div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <div class="col-sm-8 mb-3 mb-sm-0">

                                                                <label for="text" class=" control-label customlabel-textcolor">{t('license.license_email')} <i style={{ color: "red" }}>*</i></label>

                                                                <input type="text" class="form-control " value={this.state.license_email}
                                                                    name="license_email" id="license_email"
                                                                    placeholder={t('license.license_email')} onChange={this.myChangeHandler} />
                                                            </div>
                                                            <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.license_email}</div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <div class="col-sm-6">
                                                                <input type="checkbox" id="reassignable" name="reassignable"
                                                                    onChange={this.CheckboxChanged} checked={this.state.reassignable} />
                                                                <label class="custom-checkbox" for="requestmodel"> {t('license.reassignable')} </label>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <div class="col-sm-8 mb-3 mb-sm-0">
                                                                <label for="text" class=" control-label customlabel-textcolor"> {t('license.supplier_id')} <i style={{ color: "red" }}>*</i></label>

                                                                <select ref="supplier_id" class="form-control" value={this.state.supplier_id} onChange={this.myChangeHandler} id="supplier_id" name="supplier_id" >
                                                                    <option value="">{t('select.vendor')} </option>
                                                                    {(() => {
                                                                        if (this.state.SupplierData) {
                                                                            return (
                                                                                this.state.SupplierData.map(obj => {
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
                                                                <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.supplier_id}</div>
                                                            </div>
                                                            <div class="col-sm-4">
                                                                <Button onClick={() => { this.handleSupplier() }}>{t('button.new')}</Button>
                                                                <Modal show={this.state.showSupplier} onHide={() => this.handleSupplier()}>
                                                                    <Modal.Header closeButton onClick={() => { this.CancelModalSupplier() }} name="createsupplier">{t('license.createsupplier')}</Modal.Header>
                                                                    <Modal.Body>
                                                                        {(() => {

                                                                            if (showNotificationsSupplier) {
                                                                                return (
                                                                                    <div class="row">
                                                                                        <div class="col-md-12">


                                                                                            {(NotificationMessageSupplier ==="Created successfully") ? null
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

                                                                            <input type="text" class="form-control "
                                                                                name="supplier" value={this.state.supplier} id="supplier"
                                                                                placeholder={t('license.supplier')} onChange={this.myChangeHandler} />
                                                                            <div style={{ color: "red" }}  > <div className="errorMsg">{this.state.errors.supplier}</div></div>
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
                                                                <label for="text" class=" control-label customlabel-textcolor"> {t('license.order_number')} <i style={{ color: "red" }}>*</i></label>
                                                                <input type="text" class="form-control " value={this.state.order_number}
                                                                    name="order_number" id="order_number"
                                                                    placeholder={t('license.order_number')} onChange={this.myChangeHandler} />
                                                            </div>
                                                            <div style={{ color: "red" }}  > <div className="errorMsg">{this.state.errors.order_number}</div></div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <div class="col-sm-8 mb-3 mb-sm-0">
                                                                <label for="text" class=" control-label customlabel-textcolor"> {t('license.purchase_cost')} <i style={{ color: "red" }}>*</i></label>
                                                                <div class="input-group-append">
                                                                    <input type="text" class="form-control "
                                                                        name="purchase_cost" id="purchase_cost" value={this.state.purchase_cost}
                                                                        placeholder={t('license.purchase_cost')} onChange={this.myChangeHandler} />
                                                                    <span class="custom-usd ">USD</span>
                                                                </div>
                                                                <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.purchase_cost} </div>

                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <div class="col-sm-8 mb-3 mb-sm-0">
                                                                <label for="text" class=" control-label customlabel-textcolor"> {t('license.purchase_date')} <i style={{ color: "red" }}>*</i></label>

                                                                <input type="date" class="form-control"
                                                                    name="purchase_date" id="purchase_date"
                                                                    placeholder={t('license.purchase_date')} onChange={this.myChangeHandler} value={this.state.purchase_date} />

                                                            </div>
                                                            <div style={{ color: "red" }}  > <div className="errorMsg">{this.state.errors.purchase_date}</div></div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <div class="col-sm-8 mb-3 mb-sm-0">
                                                                <label for="text" class=" control-label customlabel-textcolor">  {t('license.expiration_date')} <i style={{ color: "red" }}>*</i></label>

                                                                <input type="date" class="form-control "
                                                                    name="expiration_date" id="expiration_date"
                                                                    placeholder={t('license.expiration_date')} onChange={this.myChangeHandler} value={this.state.expiration_date} />
                                                                <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.expiration_date}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <div class="col-sm-8 mb-3 mb-sm-0">
                                                                <label for="text" class=" control-label customlabel-textcolor"> {t('license.termination_date')} <i style={{ color: "red" }}>*</i></label>

                                                                <input type="date" class="form-control "
                                                                    name="termination_date" id="termination_date"
                                                                    placeholder={t('license.termination_date')} onChange={this.myChangeHandler} value={this.state.termination_date} />
                                                                <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.termination_date}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <div class="col-sm-8 mb-3 mb-sm-0">
                                                                <label for="text" class=" control-label customlabel-textcolor"> {t('license.purchase_order')} <i style={{ color: "red" }}>*</i></label>

                                                                <input type="text" class="form-control " value={this.state.purchase_order}
                                                                    name="purchase_order" id="purchase_order"
                                                                    placeholder={t('license.purchase_order')} onChange={this.myChangeHandler}  />
                                                            </div>
                                                            <div style={{ color: "red" }}  > <div className="errorMsg">{this.state.errors.purchase_order}</div></div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <div class="col-sm-6">
                                                                <input type="checkbox" id="maintained" name="maintained"
                                                                    onChange={this.CheckboxChanged} checked={this.state.maintained} />
                                                                <label class="custom-checkbox" for="requestmodel"> {t('license.maintained')} </label>
                                                            </div>
                                                        </div>



                                                        <div class="form-group row">
                                                            <div class="col-sm-8 mb-3 mb-sm-0">
                                                                <label for="text" class=" control-label customlabel-textcolor"> {t('license.notes')} <i style={{ color: "red" }}>*</i></label>

                                                                <textarea class="form-control " name="notes"
                                                                    onChange={this.myChangeHandler} id="notes" value={this.state.notes}
                                                                    placeholder={t('license.notes')}  />
                                                            </div>
                                                            <div style={{ color: "red" }}  > <div className="errorMsg">{this.state.errors.notes}</div></div>
                                                        </div>

                                                        <div class="form-group">
                                                            <button name="btnCancel" onClick={this.CancelBtnClick} class="btn btn-link text-left" >{t('button.btnCancel')}</button>
                                                            <button name='submit' class="btn-primary customlogin-btn" >{t('button.submit')}</button>
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

                <LicensesMain showNotifications={this.state.showNotifications} NotificationMessage={NotificationMessage} />
            )
        }
    }


};
export default withTranslation()(LicensesUpdate);
