import React from 'react';
import axios from 'axios';
import AssetMaintenancesMain from './AssetMaintenancesMain'
import { withTranslation} from 'react-i18next';
var validator = require('validator');
var NotificationMessage = "";
var ResponseStatus = "";

const Domain = process.env.REACT_APP_URL;

class AssetMaintenancesUpdate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: "en",
            errors: {},
            AssetMaintenanceUpdate: '',
            completion_date: '',
            assetData: [],
            asset: '',
            selectedasset: '',
            supplierData: [],
            supplier: '',
            selectedsupplier: '',
            showSupplier: false,
            validationError: "",
            ShowUpdate: true,
            showNotifications: false
        }

    }
    async componentDidMount() {
        this.setState({ AssetId: this.props.AssetMaintenanceUpdate.id });
        this.setState({ asset_id: this.props.AssetMaintenanceUpdate.asset.id });
        this.setState({ supplier_id: this.props.AssetMaintenanceUpdate.supplier.id });
        this.setState({ asset_maintenance_type: this.props.AssetMaintenanceUpdate.asset_maintenance_type });
        this.setState({ notes: this.props.AssetMaintenanceUpdate.notes });
        this.setState({ cost: this.props.AssetMaintenanceUpdate.cost });
        this.setState({ start_date: this.props.AssetMaintenanceUpdate.start_date.date });
        this.setState({ completion_date: this.props.AssetMaintenanceUpdate.completion_date.date });
        this.setState({ title: this.props.AssetMaintenanceUpdate.title });
        this.setState({ is_warranty: this.props.AssetMaintenanceUpdate.is_warranty });
        this.loadDropdownValues();
    }
    async loadDropdownValues() {
        const asseturl = Domain + '/hardware/selectList?page=1';
        const supplierurl = Domain + '/suppliers/selectList?page=1';

        const [asset_id, supplier_id] = await Promise.all([
            axios.get(asseturl),
            axios.get(supplierurl)
        ]);

        this.setState({
            assetData: asset_id.data.items,
            supplierData: supplier_id.data.items,

        });

    }

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
        if (this.ValidationForm()) {
            await axios({
                method: 'put',
                url: Domain + '/maintenances/' + this.state.AssetId,
                data: JSON.stringify({
                    asset_id: this.state.asset_id,
                    asset_maintenance_type: this.state.asset_maintenance_type,
                    title: this.state.title,
                    start_date: this.state.start_date,
                    completion_date: this.state.completion_date,
                    cost: this.state.cost,
                    notes: this.state.notes,
                    is_warranty: this.state.is_warranty,
                    supplier_id: this.state.supplier_id
                }),
                headers: {
                    'Content-Type': 'application/json'
                }

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


            this.setState({ showNotifications: true });
            if (ResponseStatus === true) {
                this.setState({ ShowUpdate: false });
            }
        }
    }
    ValidationForm() {
        let state = this.state, errors = {}, formIsValid = true;
        if (!state["asset_id"]) {
          formIsValid = false;
          errors["asset_id"] = "Please select  Asset";
        }
    
        if (!state["asset_maintenance_type"]) {
          formIsValid = false;
          errors["asset_maintenance_type"] = "Please select Maintenance Type";
        }
    
        if (!state["supplier_id"]) {
          formIsValid = false;
          errors["supplier_id"] = "*Please select vendor";
        }
        if (!state["cost"]) {
          formIsValid = false;
          errors["cost"] = "Please enter Cost";
        }
        else {
          if (typeof state["cost"] !== "undefined") {
            var pattern = new RegExp(/^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/);
            if (!pattern.test(state["cost"])) {
              formIsValid = false;
              errors["cost"] = "Only allow integer and greater than zero..";
            }
          }
        }
        if (!state["title"]) {
          formIsValid = false;
          errors["title"] = "Please enter title";
        }
        if (!state["start_date"]) {
          formIsValid = false;
          errors["start_date"] = "Please select start date";
        }
        else{
          if (!validator.isDate(this.state.start_date)) {
            formIsValid = false;
            errors["start_date"] = "Please enter valid start date";
          }
        }
        if (!state["completion_date"]) {
          formIsValid = false;
          errors["completion_date"] = "Please select completion date";
        }
        else{
          if (!validator.isDate(this.state.completion_date)) {
            formIsValid = false;
            errors["completion_date"] = "Please enter valid completion date";
          }
          else{
            if(this.state.start_date > this.state.completion_date) {
            formIsValid = false;
            errors["completion_date"] = "Start Date should be less than Completion date";
          }
        }
        }
    
        if (!state["notes"]) {
          formIsValid = false;
          errors["notes"] = "Please enter notes";
        }
    
        this.setState({ errors: errors });
        return formIsValid;
      }
    
    BackBtnClick = () => {
        NotificationMessage = '';
        this.setState({ showNotifications: false });
        const { ShowUpdate } = this.state;
        this.setState({ ShowUpdate: !ShowUpdate });
    }
    render() {
        const { t } = this.props

        const { showNotifications, ShowUpdate } = this.state;
        if (ShowUpdate) {

            return (
                <div>

                    <div class="d-sm-flex align-items-center justify-content-between mb-4">
                        <h1 class="h3 mb-0 text-gray-800 custommain-title">{t('AssetMaintenance.update')}</h1>
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
                                                                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                                                                <span aria-hidden="true">&times;</span>
                                                                            </button>
                                                                        </div>


                                                                    </div>
                                                                </div>
                                                            )
                                                        }


                                                    })()}
                                                    <form class="user" onSubmit={this.mySubmitHandler}>
                                                        <div class="form-group row">
                                                            <div class="col-sm-8 mb-3 mb-sm-0">

                                                                <label for="asset_id" class=" control-label customlabel-textcolor">{t('AssetMaintenance.name')} <i style={{ color: "red" }}>*</i></label>
                                                                <select ref="asset_id" class="form-control" onChange={this.myChangeHandler} id="asset_id"
                                                                    value={this.state.asset_id} name="asset_id" >
                                                                    <option value="">Select Asset</option>
                                                                    {(() => {
                                                                        if (this.state.assetData) {
                                                                            return (
                                                                                this.state.assetData.map(obj => {
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
                                                            <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.asset_id}</div>

                                                        </div>


                                                        <div class="form-group row">

                                                            <div class="col-sm-8 mb-3 mb-sm-0">
                                                                <label for="supplier_id" class="control-label customlabel-textcolor">{t('AssetMaintenance.supplier_id')} <i style={{ color: "red" }}>*</i></label>
                                                                <select ref="supplier_id" class="form-control" onChange={this.myChangeHandler}
                                                                    value={this.state.supplier_id} id="supplier_id" name="supplier_id">
                                                                    <option value="">Select supplier</option>
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
                                                            </div>
                                                            <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.supplier_id}</div>

                                                        </div>
                                                        <div class="form-group row">
                                                            <div class="col-sm-8 mb-3 mb-sm-0">

                                                                <label for="asset_maintenance_type" class="control-label customlabel-textcolor">{t('AssetMaintenance.asset_maintenance_type')} <i style={{ color: "red" }}>*</i></label>
                                                                <select ref="asset_maintenance_type" class="form-control" onChange={this.myChangeHandler}
                                                                    value={this.state.asset_maintenance_type} id="asset_maintenance_type" name="asset_maintenance_type" >
                                                                    <option key="0" value="">Select Asset Maintenance type</option>
                                                                    <option value="Maintenance">Maintenance</option> 
                                                                    <option value="Repair">Repair</option>
                                                                    <option value="Upgrade">Upgrade</option>
                                                                    <option value="PAT Test">PAT Test</option>
                                                                    <option value="Calibration">Calibration</option>
                                                                    <option value="Hardware Support">Hardware Support</option>
                                                                    <option value="Software Support">Software Support</option>

                                                                </select>
                                                            </div>
                                                            <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.asset_maintenance_type}</div>

                                                        </div>
                                                        <div class="form-group row">
                                                            <div class="col-sm-8 mb-3 mb-sm-0">
                                                                <label for="title" class=" control-label customlabel-textcolor">{t('AssetMaintenance.title')} <i style={{ color: "red" }}>*</i></label>
                                                                <input type="text" class="form-control "
                                                                    name="title" id="title" value={this.state.title}
                                                                    placeholder="Title.." onChange={this.myChangeHandler}  />
                                                            </div>

                                                        </div>
                                                        <div class="form-group row">
                                                            <div class="col-sm-8 mb-3 mb-sm-0">
                                                                <label for="start_date" class="control-label customlabel-textcolor">{t('AssetMaintenance.start_date')} <i style={{ color: "red" }}>*</i></label>
                                                                <input type="Date" class="form-control "
                                                                    name="start_date" id="start_date" value={this.state.start_date}
                                                                    placeholder="Start Date.." onChange={this.myChangeHandler}  />
                                                            </div>

                                                        </div>
                                                        <div class="form-group row">
                                                            <div class="col-sm-8 mb-3 mb-sm-0">
                                                                <label for="completion_date" class="control-label customlabel-textcolor">{t('AssetMaintenance.completion_date')} <i style={{ color: "red" }}>*</i></label>
                                                                <input type="Date" class="form-control "
                                                                    name="completion_date" id="completion_date" value={this.state.completion_date}
                                                                    placeholder="End Date.." onChange={this.myChangeHandler}  />
                                                                <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.completion_date}
                                                                </div>

                                                            </div>

                                                        </div>
                                                        <div class="form-group row">
                                                            <div class="col-sm-6">
                                                                <input type="checkbox" id="is_warranty" name="is_warranty"
                                                                    checked={this.state.is_warranty} onChange={this.CheckboxChanged} />
                                                                <label class="custom-checkbox" for="requestmodel">{t('AssetMaintenance.is_warranty')} </label>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <div class="col-sm-8 mb-3 mb-sm-0">
                                                                <label for="cost" class="control-label customlabel-textcolor">{t('AssetMaintenance.cost')} <i style={{ color: "red" }}>*</i></label>
                                                                <input type="text" class="form-control "
                                                                    value={this.state.cost} name="cost" id="cost" aria-describedby="emailHelp"
                                                                    placeholder="Cost.." onChange={this.myChangeHandler}  />
                                                            </div>
                                                            <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.cost}</div>

                                                        </div>
                                                        <div class="form-group row">
                                                            <div class="col-sm-8 mb-3 mb-sm-0">
                                                                <label for="notes" class="control-label customlabel-textcolor">{t('AssetMaintenance.notes')} <i style={{ color: "red" }}>*</i></label>
                                                                <textarea class="form-control " id="notes"
                                                                    value={this.state.notes} name="notes"
                                                                    onChange={this.myChangeHandler} placeholder="Notes"  />
                                                            </div>
                                                        </div>
                                                        <div class="form-group">
                                                            <button name="btnCancel" onClick={this.BackBtnClick} class="btn btn-link text-left" >{t('button.cancel')}</button>
                                                            <button name='submit' class="btn-primary" >{t('button.submit')}</button>

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
                <AssetMaintenancesMain showNotifications={this.state.showNotifications} NotificationMessage={NotificationMessage} />

            );
        }
    }
};

export default withTranslation()(AssetMaintenancesUpdate);