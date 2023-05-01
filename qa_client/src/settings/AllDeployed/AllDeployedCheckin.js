import React from 'react';

import axios from 'axios';
import AllDeployedMain from './AllDeployedMain'
import { withTranslation} from 'react-i18next'
var validator = require('validator');
//var NotificationMessage = "";
const Domain = process.env.REACT_APP_URL;

class AllDeployedCheckin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: "en",

            errors: {},
            ShowCheckin: true,
            showNotifications: false,
            ShowMain: false,


        }
        this.myChangeHandler = this.myChangeHandler.bind(this);
        this.mySubmitHandler = this.mySubmitHandler.bind(this);
    };
    async componentDidMount() {
        this.setState({ AssetName: this.props.ListAllDatatoCheckIn.name });
        this.setState({ ListAllId: this.props.ListAllDatatoCheckIn.id });
        this.setState({ model_id: this.props.ListAllDatatoCheckIn.model.id });

        const locationurl = Domain + '/locations/selectList?page=1';

        const statussurl = Domain + '/statuslabels/selectList?page=1';

        const [assigned_location, status_id] = await Promise.all([

            axios.get(locationurl),
            axios.get(statussurl)
        ]);
        this.setState({
            locationData: assigned_location.data.items,
            statusData: status_id.data.items


        });

    }
    myChangeHandler = (event) => {

        this.setState({ [event.target.name]: event.target.value });
    }

    validateForm() {
        let state = this.state,errors = {},formIsValid = true;
        if (!state["status_id"]) {
            formIsValid = false;
            errors["status_id"] = "*Please select StatusLabel type";
        }
 if (!state["notes"]) {
            formIsValid = false;
            errors["notes"] = "*Please enter notes";
        }

        if (!state["expected_checkin"]) {
            formIsValid = false;
            errors["expected_checkin"] = "*Please select checkin date";
        }
        else {
            if (!validator.isDate(this.state.expected_checkin)) {
              formIsValid = false;
              errors["expected_checkin"] = "Please enter valid checkin date";
            }
            else {  
              if(validator.isAfter(this.state.expected_checkin))
              {
                formIsValid = false;
                errors["expected_checkin"] = "CheckIn date cannot be in the future";
              }
            }
        }
        if (!state["assigned_location"]) {
            formIsValid = false;
            errors["assigned_location"] = "*Please select your Location.";
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
                url: Domain + '/hardware/' + this.props.ListAllDatatoCheckIn.id + '/checkin',
                data: JSON.stringify({
                    name: this.state.AssetName,
                    model_id: this.state.model_id,
                    note: this.state.notes,
                    assigned_location: this.state.assigned_location,
                    status_id: this.state.status_id,
                    expected_checkin: this.state.expected_checkin,
                    checkout_to_type: this.state.checkout_to_type
                }),
                headers: {


                    'Content-Type': 'application/json'
                }
            })
                .then(function (response) {
                    //handle success
                   // NotificationMessage = response.data.message;
                    console.log("res" + response.status);
                })
                .catch(function (response) {
                    //handle error
                    console.log(response);
                });

            this.setState({ showNotifications: true });

            this.setState({ ShowCheckin: false });


        }


    }
    BackBtnClick = () => {
        this.setState({ showNotifications: false });
        const { ShowCheckin } = this.state;
        this.setState({ ShowCheckin: !ShowCheckin });
        const { ShowMain } = this.state;
        this.setState({ ShowMain: !ShowMain });
    }

    CancelBtnClick = () => {
        this.setState({ showNotifications: false });
        const { ShowCheckin } = this.state;
        this.setState({ ShowCheckin: !ShowCheckin });
        const { ShowMain } = this.state;
        this.setState({ ShowMain: !ShowMain });
    }
    onLanguageHandle = (event) => {
        let newLang = event.target.value;
        this.setState({ value: newLang })
        this.props.i18n.changeLanguage(newLang)
    }


    render() {
        const { t } = this.props

        console.log('this is', this)
        console.log("render")

        const { ShowCheckin, ShowMain, showNotifications } = this.state;

        console.log("show", ShowMain)

        if (ShowCheckin) {
            return (
                <div>

                    <div class="d-sm-flex align-items-center justify-content-between mb-4">
                        <h1 class="h3 mb-0 text-gray-800 custommain-title" name="checkinasset">{t('Checkin.checkinasset')}<span></span></h1>
                        <button name="back" onClick={this.BackBtnClick} className=" btn btn-sm btn-primary shadow-sm custommain-title">
                            {t('button.back')}
                        </button>
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
                                                                        <div class="alert alert-success alert-dismissible fade show" role="alert">
                                                                            <strong> Checkin successfully</strong>

                                                                        </div>


                                                                    </div>
                                                                </div>
                                                            )
                                                        }


                                                    })()}

                                                    <form class="user" onSubmit={this.mySubmitHandler}>
                                                        <div class="form-group row">
                                                            <div class="col-sm-8 mb-3 mb-sm-0">
                                                                <label for="model_id" class=" control-label customlabel-textcolor">{t('Checkin.model_id')} <i style={{ color: "red" }}>*</i> </label>

                                                                <input type="text" class="form-control "
                                                                    name="model_id" id="model_id"
                                                                    value={this.state.model_id}
                                                                    placeholder="Model..." onChange={this.myChangeHandler} disabled />
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <div class="col-sm-8 mb-3 mb-sm-0">
                                                                <label for="AssetName" class=" control-label customlabel-textcolor">{t('Checkin.name')} <i style={{ color: "red" }}>*</i> </label>

                                                                <input type="text" class="form-control " value={this.state.AssetName}
                                                                    name="AssetName" id="AssetName" aria-describedby="emailHelp"
                                                                    placeholder="Asset Name..." onChange={this.myChangeHandler} disabled />
                                                            </div>
                                                        </div>

                                                        <div class="form-group row">
                                                            <div class="col-sm-8 mb-3 mb-sm-0">
                                                                <label for="status_id" class=" control-label customlabel-textcolor">{t('Checkin.status_id')} <i style={{ color: "red" }}>*</i> </label>
                                                                <select ref="status_id" class="form-control" value={this.state.status_id} onChange={this.myChangeHandler} id="status_id" name="status_id">
                                                                    <option value="">{t('Checkin.status_id')}</option>
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
                                                            </div>
                                                            <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.status_id} </div>
                                                        </div>

                                                        <div class="form-group row">
                                                            <div class="col-sm-8 mb-3 mb-sm-0">
                                                                <label for="assigned_to" class=" control-label customlabel-textcolor">{t('Checkin.assigned_location')} <i style={{ color: "red" }}>*</i> </label>

                                                                <select ref="assigned_location" class="form-control" onChange={this.myChangeHandler} id="assigned_location"
                                                                    name="assigned_location" >
                                                                    <option value="">{t('Checkin.assigned_location')}</option>
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
                                                                <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.assigned_location}</div>

                                                            </div>
                                                        </div>





                                                        <div class="form-group row">
                                                            <div class="col-sm-8 mb-3 mb-sm-0">
                                                                <label for="expected_checkin" class="control-label customlabel-textcolor">{t('Checkin.expected_checkin')} <i style={{ color: "red" }}>*</i> </label>
                                                                <input type="date" class="form-control " onChange={this.myChangeHandler} value={this.state.expected_checkin}
                                                                    name="expected_checkin" id="expected_checkin" aria-describedby="emailHelp"
                                                                    placeholder="CheckIn Date" />
                                                              <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.expected_checkin}</div>
                                                            </div>
                                                        </div>


                                                        <div class="form-group row">
                                                            <div class="col-sm-8 mb-3 mb-sm-0">
                                                                <label for="notes" class=" control-label customlabel-textcolor">{t('Checkin.notes')}  <i style={{ color: "red" }}>*</i> </label>

                                                                <textarea class=" form-control " onChange={this.myChangeHandler}
                                                                    aria-label="notes" spellcheck="false" id="notes" name="notes"
                                                                    placeholder={t('Checkin.notes')} />
                                                                <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.notes}</div>
                                                            </div>
                                                        </div>
                                                        <div class="form-group">
                                                            <button name="btnCancel" onClick={this.CancelBtnClick} class="btn btn-link text-left" >{t('button.btnCancel')}</button>

                                                            <button name='submit' class=" btn-primary" >{t('button.submit')}</button>
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
                <AllDeployedMain showNotifications={this.state.showNotifications} NotificationMessage="Checkin Successfully" />
            );
        }
    }
};
export default withTranslation()(AllDeployedCheckin);
