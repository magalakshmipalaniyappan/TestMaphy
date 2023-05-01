import React from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap'
import Countries from 'react-select-country';
import ListAllMain from './AssetMain';
import AllDeployableMain from '../AllDeployable/AllDeployableMain';
import AllUnDeployableMain from '../AllUnDeployabled/AllUnDeployableMain';
import AllDeployedMain from '../AllDeployed/AllDeployedMain';
import { withTranslation } from 'react-i18next';
var validator = require('validator');
const Domain = process.env.REACT_APP_URL;
var NotificationMessage = "";
var ResponseStatus = "";
var ResponseStatusModal = "";
var NotificationMessageModal = "";

var ResponseStatusSupplier = "";
var NotificationMessageSupplier = "";

var ResponseStatusLocation = "";
var NotificationMessageLocation = "";

var ResponseStatusModalStatus = "";
var NotificationMessageModalStatus = "";
class ListAllUpdate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            values: [],
            errors: {},
            country: '',
            options: this.options,
            value: null,
            ListAllDatatoUpdate: '',
            ListAllName: '',

            ShowMain: false,
            showUpdate: true,
            showNotifications: false,
            showNotificationsModal: false,
            showNotificationsStatus: false,
            showNotificationsSupplier: false,
            showNotificationsLocation: false
        }

    }

    async componentDidMount() {
        let a=this.props.editProcess;
        console.log(a);
        this.setState({ AssetName: this.props.ListAllDatatoUpdate.name });

        this.setState({ location_id: this.props.ListAllDatatoUpdate.rtd_location.id });
        this.setState({ company_id: this.props.ListAllDatatoUpdate.company.id });
        this.setState({ model_id: this.props.ListAllDatatoUpdate.model.id });
        this.setState({ supplier_id: this.props.ListAllDatatoUpdate.supplier.id });
        this.setState({ ListAllId: this.props.ListAllDatatoUpdate.id });

        this.setState({ asset_tag: this.props.ListAllDatatoUpdate.asset_tag });
        this.setState({ serial: this.props.ListAllDatatoUpdate.serial });
        this.setState({ status_id: this.props.ListAllDatatoUpdate.status_label.id });
        this.setState({ purchase_date: this.props.ListAllDatatoUpdate.purchase_date.formatted });
        this.setState({ order_number: this.props.ListAllDatatoUpdate.order_number });
        this.setState({ purchase_cost: this.props.ListAllDatatoUpdate.purchase_cost });
        this.setState({ warranty_months: this.props.ListAllDatatoUpdate.warranty_months });
        this.setState({ notes: this.props.ListAllDatatoUpdate.notes });

        this.setState({ requestable: this.props.ListAllDatatoUpdate.requestable });
        this.setState({ mainPage: this.props.mainPage });

        this.loadDropdownValues();
    }

    createUI() {
        return this.state.values.map((el, i) =>
            <div key={i}>
                <input type="text" value={el || ''} onChange={this.handleChange.bind(this, i)} />
                <input type='button' class=" btn-primary" value='Remove' onClick={this.removeClick.bind(this, i)} />
            </div>
        )
    }

    handleChange(i, event) {
        let values = [...this.state.values];
        values[i] = event.target.value;
        this.setState({ values });
    }

    addClick() {
        this.setState(prevState => ({ values: [...prevState.values, ''] }))
    }

    removeClick(i) {
        let values = [...this.state.values];
        values.splice(i, 1);
        this.setState({ values });
    }
    addInput = ev => {
        this.setState(prev => ({ inputs: [...prev.inputs, 'Hi'] }))
    }
    async loadDropdownValues() {
        const companyurl = Domain + '/companies/selectList?page=1';
        const modelsurl = Domain + '/models/selectList?page=1';
        const statussurl = Domain + '/statuslabels/selectList?page=1';
        const supplierurl = Domain + '/suppliers/selectList?page=1';
        const locationurl = Domain + '/locations/selectList?page=1';
        const categoriesurl = Domain + '/categories/selectList/Asset?page=1';
        const manufacturerurl = Domain + '/manufacturers/selectList?page=1';
        const [company_id, model_id, category_id, manufacturer_id, status_id, supplier_id, location_id] = await Promise.all([
            axios.get(companyurl),
            axios.get(modelsurl),
            axios.get(categoriesurl),
            axios.get(manufacturerurl),
            axios.get(statussurl),
            axios.get(supplierurl),
            axios.get(locationurl),
        ]);

        this.setState({
            companyData: company_id.data.items,
            modelData: model_id.data.items,
            statusData: status_id.data.items,
            supplierData: supplier_id.data.items,
            locationData: location_id.data.items,
            ManufacturerData: manufacturer_id.data.items,
            CategoriesData: category_id.data,
        });
    }


    validateFormModels() {

        let state = this.state,errors = {},formIsValid = true;
        if (!state["modelname"]) {
            formIsValid = false;
            errors["modelname"] = "*Please enter modelname.";
        }
        if (!state["manufacturer_id"]) {
            formIsValid = false;
            errors["manufacturer_id"] = "*Please select your manufacturer.";
        }
        if (!state["category_id"]) {
            formIsValid = false;
            errors["category_id"] = "*Please select your category .";
        }
        if (!state["model_number"]) {
            formIsValid = false;
            errors["model_number"] = "*Please enter Model Number  .";
        }
        this.setState({
            errors: errors
        });
        return formIsValid;

    }
    validateFormSupplier() {
        let state = this.state,errors = {},formIsValid = true;
        if (!state["supplier"]) {
            formIsValid = false;
            errors["supplier"] = "*Please enter supplier .";
        }
        this.setState({
            errors: errors
        });
        return formIsValid;


    }
    validateFormLocation() {
        let state = this.state,errors = {},formIsValid = true;
        if (!state["location"]) {
            formIsValid = false;
            errors["location"] = "*Please enter location";
        }
        if (!state["city"]) {
            formIsValid = false;
            errors["city"] = "*Please enter city";
        }
        if (!state["country"]) {
            formIsValid = false;
            errors["country"] = "*Please select country";
        }
        this.setState({
            errors: errors
        });
        return formIsValid;


    }
    validateFormStatus() {
        let state = this.state,errors = {},formIsValid = true;
        if (!state["statusname"]) {
            formIsValid = false;
            errors["statusname"] = "*Please enter statusname .";
        }
        if (!state["status_type"]) {
            formIsValid = false;
            errors["status_type"] = "*Please enter status type.";
        }
        this.setState({
            errors: errors
        });
        return formIsValid;


    }

    addModels = async (event) => {
        if (this.validateFormModels()) {
            await axios({
                method: 'post',
                url: Domain + '/models',
                data: JSON.stringify({
                    name: this.state.modelname,
                    manufacturer_id: this.state.manufacturer_id,
                    category_id: this.state.category_id,
                    model_number: this.state.model_number
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
                this.setState({ showmodels: !this.state.showmodels })
                this.setState({ modelname: "" });
                this.setState({ manufacturer_id: "" });
                this.setState({ category_id: "" });
                this.setState({ model_number: "" });
            }
        }
    }
    handleModels() {
        this.setState({ showmodels: !this.state.showmodels })
    }
    CancelModalModels = () => {
        this.setState({ showmodels: !this.state.showmodels })
        this.setState({ errors: "" });
        this.setState({ showNotificationsModal: false });
        this.setState({ modelname: "" });
        this.setState({ manufacturer_id: "" });
        this.setState({ category_id: "" });
        this.setState({ model_number: "" });
    };
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
                this.setState({ show: !this.state.show });
                this.setState({ location: "" });
                this.setState({ city: "" });
                this.setState({ country: "" });
            }
        }
    }
    handleModal() {
        this.setState({ show: !this.state.show })
    }
    CancelModalLocation = () => {
        this.setState({ show: !this.state.show })
        this.setState({ errors: "" });
        this.setState({ showNotificationsLocation: false });
        this.setState({ location: "" });
        this.setState({ city: "" });
        this.setState({ country: "" });
    };
    addSupplier = async (event) => {
        if (this.validateFormSupplier()) {
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
    handleModalSupplier() {
        this.setState({ showSupplier: !this.state.showSupplier })
    }

    CancelModalSupplier = () => {
        this.setState({ errors: "" });
        this.setState({ showSupplier: !this.state.showSupplier })
        this.setState({ showNotificationsSupplier: false });
        this.setState({ supplier: "" });
    };

    addStatus = async (event) => {
        if (this.validateFormStatus()) {
            await axios({
                method: 'post',
                url: Domain + '/statuslabels',
                data: JSON.stringify({
                    name: this.state.statusname,
                    type: this.state.status_type,

                }),
                headers: { 'Content-Type': 'application/json' }

            })
                .then(function (response) {
                    //handle success
                    ResponseStatusModalStatus = response.data.success;
                    console.log("res" + response.status, ":", response.data.message);
                    NotificationMessageModalStatus = response.data.message;
                })
                .catch(function (response) {
                    //handle error
                    console.log(response);
                });

            this.loadDropdownValues();
            this.setState({ showNotificationsModalStatus: true });
            if (ResponseStatusModalStatus === true) {
                this.setState({ showStatus: !this.state.showStatus });
                this.setState({ statusname: "" });
                this.setState({ status_type: "" });

            }
        }
    }
    handleModalStatus() {
        this.setState({ showStatus: !this.state.showStatus })
    }
    CancelModalStatus = () => {
        this.setState({ showStatus: !this.state.showStatus })
        this.setState({ errors: "" });
        this.setState({ showNotificationsModalStatus: false });
        this.setState({ statusname: "" });
        this.setState({ status_type: "" });

    };
    CheckboxChanged = (event) => {

        let nam = event.target.name;

        let val;
        if (event.target.checked)
            val = 1;
        else

            val = 0;

        this.setState({ [nam]: val });
    }

    myChangeHandler = (event) => {

        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
    }

    mySubmitHandler = async (event) => {
        event.preventDefault();
        if (this.validateForm()) {
            await axios({
                method:this.props.editProcess==="Update"?'put':"post",
                url: this.props.editProcess==="Update"?Domain + '/hardware/' + this.state.ListAllId : Domain + '/hardware',

                data: JSON.stringify({
                    name: this.state.AssetName,
                    //asset_tag: this.state.asset_tag,
                    model_id: this.state.model_id,
                    serial: this.state.serial,
                    purchase_date: this.state.purchase_date,
                    purchase_cost: this.state.purchase_cost,
                    order_number: this.state.order_number,
                    assigned_to: this.state.assigned_to,
                    notes: this.state.notes,
                    user_id: this.state.user_id,

                    status_id: this.state.status_id,

                    warranty_months: this.state.warranty_months,

                    supplier_id: this.state.supplier_id,
                    requestable: this.state.requestable,

                    company_id: this.state.company_id,

                    rtd_location_id: this.state.location_id,
                    assetdetails: this.state.values.join('/')

                }),
                headers: {
                    'Content-Type': 'application/json'
                }

            })
                .then((response) => {
                    //handle success
                    ResponseStatus = response.data.success;
                    NotificationMessage = response.data.message;
                })
                .catch(function (response) {
                    //handle error
                    console.log(response);

                });
            if (ResponseStatus) {
                this.loadDropdownValues();
                this.setState({ showNotifications: true });
                this.setState({ showUpdate: false });
            }
            else {
                this.setState({ showNotifications: true });
            }
        }
    };

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
        if (!state["supplier_id"]) {
          formIsValid = false;
          errors["supplier_id"] = "Please select vendor";
        }
        if (!state["status_id"]) {
          formIsValid = false;
          errors["status_id"] = "Please select status";
        }
        if (!state["AssetName"]) {
          formIsValid = false;
          errors["AssetName"] = "Please enter asset name";
        }
        if (!state["model_id"]) {
          formIsValid = false;
          errors["model_id"] = "Please select model";
        }
        if (!state["serial"]) {
          formIsValid = false;
          errors["serial"] = "Please enter serial";
        }
        if (!state["order_number"]) {
          formIsValid = false;
          errors["order_number"] = "Please enter order number";
        }
        if (!state["notes"]) {
          formIsValid = false;
          errors["notes"] = "Please enter notes";
        }
        if (!state["purchase_date"]) {
          formIsValid = false;
          errors["purchase_date"] = "Please enter purchase date";
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
          
        if (!state["purchase_cost"]) {
          formIsValid = false;
          errors["purchase_cost"] = "Please enter Purchase Cost.";
        }
        else{
          if (typeof state["purchase_cost"] !=="undefined") {
            var pattern = new RegExp(/^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/);
            if (!pattern.test(state["purchase_cost"])) {
              formIsValid = false;
              errors["purchase_cost"] = "*Only allow integer, greater than zero..";
            }
          }
        }
      if(!state["gst"] )
      {
        formIsValid = false;
        errors["gst"] = "*Please enter GST";
      }
      else{
        if (typeof state["gst"] !== "undefined") {
          var gstpattern = new RegExp(/^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/);
          if (!gstpattern.test(state["gst"])) {
            formIsValid = false;
            errors["gst"] = "*Only allow integer, greater than zero..";
          }
        }
      }
      if(!state["warranty_months"] )
      {
        formIsValid = false;
        errors["warranty_months"] = "*Please enter warranty months";
      }
      else{
        if (typeof state["warranty_months"] !== "undefined") {
          var warrantypattern = new RegExp(/^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/);
          if (!warrantypattern.test(state["warranty_months"])) {
            formIsValid = false;
            errors["warranty_months"] = "*Only allow integer, greater than zero..";
          }
        }
      }
        this.setState({ errors: errors });
        return formIsValid;
      }
    BackBtnClick = () => {
        this.setState({ showUpdate: false });
        this.setState({ showNotifications: false });
    }

    render() {
        const { t } = this.props
        const { showUpdate,showNotifications, showNotificationsModal, showNotificationsModalStatus, showNotificationsSupplier, showNotificationsLocation, mainPage } = this.state;
        if (showUpdate) {
            return (
                <div>

                    <div class="d-sm-flex align-items-center justify-content-between mb-4">
                        <h1 class="h3 mb-0 text-gray-800 custommain-title" name="updateasset">{this.props.editProcess==="Update"?t('AssetsListall.updateasset'):t('AssetsListall.cloneasset')}</h1>
                        <button name="back" onClick={this.BackBtnClick} className="btn btn-sm btn-primary shadow-sm custommain-title">
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
                                                                <label for="AssetName" class="control-label customlabel-textcolor">{t('AssetsListall.AssetName')} <i style={{ color: "red" }}>*</i> </label>
                                                                <input type="text" class="form-control " value={this.state.AssetName}
                                                                    name="AssetName" id="AssetName" aria-describedby="emailHelp"
                                                                    placeholder={t('AssetsListall.AssetName')} onChange={this.myChangeHandler} />
                                                              <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.AssetName}</div>
                                                            </div>
                                                            <div class="col-sm-4 ">
                                                                <input type='button' class="btn btn-primary" value='Add info' onClick={this.addClick.bind(this)} />

                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            {this.createUI()}
                                                        </div>


                                                        <div class="form-group row">
                                                            <div class="col-sm-8 mb-3 mb-sm-0">
                                                                <label for="serial" class=" control-label customlabel-textcolor">{t('AssetsListall.serial')} <i style={{ color: "red" }}>*</i> </label>
                                                                <input type="text" class="form-control "
                                                                    name="serial" id="serial" value={this.state.serial}
                                                                    onChange={this.myChangeHandler}  />
                                                                 <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.serial}</div>
                                                            </div>
                                                        </div>


                                                        <div class="form-group row">
                                                            <div class="col-sm-8 mb-3 mb-sm-0">
                                                                <label for="model_id" class=" control-label customlabel-textcolor">{t('AssetsListall.model_id')} <i style={{ color: "red" }}>*</i> </label>
                                                                <select ref="model_id" class="form-control" value={this.state.model_id} onChange={this.myChangeHandler} id="model_id" name="model_id" >
                                                                    <option value="">{t('select.model')}</option>
                                                                    {(() => {
                                                                        if (this.state.modelData) {
                                                                            return (
                                                                                this.state.modelData.map(obj => {
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

                                                            <div class="col-sm-4">
                                                                <Button name="new" onClick={() => { this.handleModels() }}>{t('button.new')}</Button>
                                                                <Modal show={this.state.showmodels} onHide={() => this.handleModels()}>
                                                                    <Modal.Header closeButton onClick={() => { this.CancelModalModels() }} name="models">{t('newbutton.models')}</Modal.Header>
                                                                    <Modal.Body>
                                                                        {(() => {

                                                                            if (showNotificationsModal) {
                                                                                return (
                                                                                    <div class="row">
                                                                                        <div class="col-md-12">
                                                                                            {(NotificationMessageModal === "Created successfully") ? null
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

                                                                            <input type="text" class="form-control form-control-user customdept-location"
                                                                                name="modelname" value={this.state.modelname} id="modelname" aria-describedby="emailHelp"
                                                                                placeholder={t('newbutton.modelname')} onChange={this.myChangeHandler} />
                                                                            <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.modelname}</div>

                                                                        </div>

                                                                        <div class="form-group row">

                                                                            <select ref="manufacturer_id" class="form-control customdept-location" value={this.state.manufacturer_id} onChange={this.myChangeHandler} id="manufacturer_id" name="manufacturer_id">
                                                                                <option value="">{t('select.manufacturer')}</option>
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
                                                                        <div class="form-group row">
                                                                            <select ref="category_id" class="form-control customdept-location" value={this.state.category_id} onChange={this.myChangeHandler} id="category_id" name="category_id">
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
                                                                        <div class="form-group row">

                                                                            <input type="text" class="form-control form-control-user customdept-location"
                                                                                name="model_number" value={this.state.model_number} id="model_number" aria-describedby="emailHelp"
                                                                                placeholder={t('newbutton.modelnumber')} onChange={this.myChangeHandler} />
                                                                            <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.model_number}</div>

                                                                        </div>
                                                                    </Modal.Body>
                                                                    <Modal.Footer>
                                                                        <div class="form-group ">
                                                                            <Button name="save" onClick={() => { this.addModels() }}>
                                                                                {t('button.save')}
                                                                            </Button >
                                                                            <Button name="cancel" onClick={() => { this.CancelModalModels() }}>
                                                                                {t('button.cancel')}
                                                                            </Button >
                                                                        </div>
                                                                    </Modal.Footer>
                                                                </Modal>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <div class="col-sm-8 mb-3 mb-sm-0">
                                                                <label for="company_id" class=" control-label customlabel-textcolor">{t('AssetsListall.company_id')} <i style={{ color: "red" }}>*</i> </label>
                                                                <select ref="company_id" class="form-control" value={this.state.company_id} onChange={this.myChangeHandler} id="company_id" name="company_id" >
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
                                                                <label for="status_id" class=" control-label customlabel-textcolor">{t('AssetsListall.status_id')} <i style={{ color: "red" }}>*</i> </label>
                                                                <select ref="status_id" class="form-control" value={this.state.status_id} onChange={this.myChangeHandler} id="status_id" name="status_id" >
                                                                    <option value="">{t('select.status')}</option>
                                                                    {(() => {
                                                                        if (this.state.statusData) {
                                                                            return (
                                                                                this.state.statusData.map(obj => {
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
                                                                <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.status_id}</div>
                                                            </div>

                                                            <div class="col-sm-4">
                                                                <Button name="new" onClick={() => { this.handleModalStatus() }}>{t('button.new')}</Button>
                                                                <Modal show={this.state.showStatus} onHide={() => this.handleModalStatus()}>
                                                                    <Modal.Header closeButton onClick={() => { this.CancelModalStatus() }} name="status">{t('newbutton.status')}</Modal.Header>
                                                                    <Modal.Body>
                                                                        {(() => {

                                                                            if (showNotificationsModalStatus) {
                                                                                return (
                                                                                    <div class="row">
                                                                                        <div class="col-md-12">
                                                                                            {(NotificationMessageModalStatus === "Created successfully") ? null
                                                                                                : <div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                                                                    <strong> {NotificationMessageModalStatus}</strong>
                                                                                                </div>
                                                                                            }
                                                                                        </div>
                                                                                    </div>
                                                                                )
                                                                            }
                                                                        })()}
                                                                        <div class="form-group row">

                                                                            <input type="text" class="form-control form-control-user customdept-location"
                                                                                name="statusname" id="statusname" aria-describedby="emailHelp"
                                                                                placeholder={t('newbutton.statusname')} onChange={this.myChangeHandler} />
                                                                            <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.statusname}</div>

                                                                        </div>

                                                                        <div class="form-group row">
                                                                            <select ref="status_type" class="form-control customdept-location" onChange={this.myChangeHandler} id="status_type" name="status_type" >
                                                                                <option value="">{t('select.status')}</option>
                                                                                <option value="deployable">{t('newbutton.deployable')}</option>
                                                                                <option value="undeployable">{t('newbutton.undeployable')}</option>
                                                                                <option value="deployed">{t('newbutton.deployed')}</option>
                                                                            </select>

                                                                            <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.status_type}</div>

                                                                        </div>
                                                                    </Modal.Body>
                                                                    <Modal.Footer>
                                                                        <div class="form-group ">
                                                                            <Button name="save" onClick={() => { this.addStatus() }}>
                                                                                {t('button.save')}
                                                                            </Button >
                                                                            <Button name="cancel" onClick={() => { this.CancelModalStatus() }}>
                                                                                {t('button.cancel')}
                                                                            </Button >
                                                                        </div>
                                                                    </Modal.Footer>
                                                                </Modal>
                                                            </div>
                                                        </div>


                                                        <div class="form-group row">
                                                            <div class="col-sm-8 mb-3 mb-sm-0">
                                                                <label for="purchase_date" class=" control-label customlabel-textcolor">{t('AssetsListall.purchase_date')} <i style={{ color: "red" }}>*</i> </label>
                                                                <input type="Date" class="form-control"
                                                                    name="purchase_date" id="purchase_date" value={this.state.purchase_date}
                                                                    placeholder={t('AssetsListall.purchase_date')} onChange={this.myChangeHandler} />

                                                            </div>
                                                            <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.purchase_date}</div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <div class="col-sm-8 mb-3 mb-sm-0">
                                                                <label for="supplier_id" class=" control-label customlabel-textcolor">{t('AssetsListall.supplier_id')} <i style={{ color: "red" }}>*</i> </label>
                                                                <select ref="supplier_id" class="form-control" value={this.state.supplier_id} onChange={this.myChangeHandler} id="supplier_id" name="supplier_id" >
                                                                    <option value="">{t('select.vendor')}</option>
                                                                    {(() => {
                                                                        if (this.state.supplierData) {
                                                                            return (
                                                                                this.state.supplierData.map(obj => {
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

                                                                            <input type="text" class="form-control form-control-user customdept-location"
                                                                                name="supplier" value={this.state.supplier} id="supplier" aria-describedby="emailHelp"
                                                                                placeholder={t('newbutton.suppliername')} onChange={this.myChangeHandler} />
                                                                        </div>
                                                                        <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.supplier}</div>


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
                                                                <label for="order_number" class=" control-label customlabel-textcolor">{t('AssetsListall.order_number')} <i style={{ color: "red" }}>*</i> </label>
                                                                <input type="text" class="form-control "
                                                                    name="order_number" id="order_number" value={this.state.order_number}
                                                                    placeholder={t('AssetsListall.order_number')} onChange={this.myChangeHandler} />
                                                            </div>
                                                            <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.order_number}</div>
                                                        </div>

                                                        <div class="form-group row">
                                                            <div class="col-sm-8 mb-3 mb-sm-0">
                                                                <label for="purchase_cost" class="customlabel-textcolor">{t('AssetsListall.purchase_cost')} <i style={{ color: "red" }}>*</i> </label>
                                                                <div class="input-group-append">
                                                                    <input type="text" class="form-control "
                                                                        name="purchase_cost" id="purchase_cost" value={this.state.purchase_cost}
                                                                        placeholder={t('AssetsListall.purchase_cost')} onChange={this.myChangeHandler}  />
                                                                </div>
                                                                <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.purchase_cost}</div>
                                                            </div>
                                                        </div>

                                                        <div class="form-group row">
                                                            <div class="col-sm-8 mb-3 mb-sm-0">
                                                                <label for="warranty_months" class="control-label customlabel-textcolor">{t('AssetsListall.warranty_months')} <i style={{ color: "red" }}>*</i> </label>
                                                                <input type="number" class="form-control "
                                                                    name="warranty_months" id="warranty_months" value={this.state.warranty_months}
                                                                    placeholder={t('AssetsListall.warranty_months')} onChange={this.myChangeHandler} r/>
                                                              <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.warranty_months}</div>
                                                            </div>
                                                            <div class="col-sm-4">
                                                                <span class="input-group-text">{t('AssetsListall.months')}</span>
                                                            </div>
                                                        </div>

                                                        <div class="form-group row">
                                                            <div class="col-sm-8 mb-3 mb-sm-0">
                                                                <label for="notes" class=" control-label customlabel-textcolor">{t('AssetsListall.notes')} <i style={{ color: "red" }}>*</i> </label>
                                                                <textarea class="form-control " id="notes"
                                                                    name="notes" value={this.state.notes} onChange={this.myChangeHandler}
                                                                    placeholder={t('AssetsListall.notes')} />
                                                               <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.notes}</div>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <div class="col-sm-8 mb-3 mb-sm-0">
                                                                <label for="location_id" class=" control-label customlabel-textcolor">{t('AssetsListall.location_id')} <i style={{ color: "red" }}>*</i> </label>
                                                                <select ref="location_id" class="form-control" value={this.state.location_id} onChange={this.myChangeHandler} id="location_id" name="location_id" >
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
                                                                <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.location_id}</div>
                                                            </div>

                                                            <div class="col-sm-4">
                                                                <Button name="new" onClick={() => { this.handleModal() }}>{t('button.new')}</Button>
                                                                <Modal show={this.state.show} onHide={() => this.handleModal()}>
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

                                                                            <input type="text" class="form-control form-control-user customdept-location"
                                                                                name="location" value={this.state.location} id="location" aria-describedby="emailHelp"
                                                                                placeholder={t('newbutton.locationname')} onChange={this.myChangeHandler} />
                                                                        </div>
                                                                        <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.location}</div>

                                                                        <div class="form-group row">

                                                                            <input type="text" class="form-control form-control-user customdept-location"
                                                                                name="city" id="city" aria-describedby="emailHelp"
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
                                                            <div class="col-sm-6">
                                                                <input type="checkbox" id="requestable" name="requestable" checked={this.state.requestable}
                                                                    onChange={this.CheckboxChanged} />
                                                                <label class="custom-checkbox" for="requestmodel"> {t('AssetsListall.requestable')}  </label>
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
            if (mainPage === "AllDeployedMain") {
                return (
                    <AllDeployedMain showNotifications={this.state.showNotifications} NotificationMessage={NotificationMessage} />
                );
            }
            else if (mainPage === "AllUnDeployableMain") {
                return (
                    <AllUnDeployableMain showNotifications={this.state.showNotifications} NotificationMessage={NotificationMessage} />
                );
            }
            else if (mainPage === "AllDeployableMain") {
                return (
                    <AllDeployableMain showNotifications={this.state.showNotifications} NotificationMessage={NotificationMessage} />
                );
            }
            else {
                return (
                    <ListAllMain showNotifications={this.state.showNotifications} NotificationMessage={NotificationMessage} />
                );
            }
            // return (

            //     <ListAllMain showNotifications={this.state.showNotifications} NotificationMessage={NotificationMessage} />
            // )
        }
    }


};
export default withTranslation()(ListAllUpdate);
