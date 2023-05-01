import React, { } from 'react';
import axios from 'axios';

import StatuslabelMain from './StatuslabelMain';
import { withTranslation } from 'react-i18next'
const Domain = process.env.REACT_APP_URL;
var NotificationMessage = "";
var ResponseStatus = "";
class StatuslabelUpdate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            errors: {},
            ShowMain: false,
            showUpdate: true,
            showNotifications: false
        }

    }

    componentDidMount() {
        this.setState({ StatusLabelName: this.props.StatusLabeltoUpdate.name });
        this.setState({ type: this.props.StatusLabeltoUpdate.type });
        this.setState({ StatusLabelId: this.props.StatusLabeltoUpdate.id });
        this.setState({ color: this.props.StatusLabeltoUpdate.color });
        this.setState({ show_in_nav: this.props.StatusLabeltoUpdate.show_in_nav });
        this.setState({ default_label: this.props.StatusLabeltoUpdate.default_label });
        this.setState({ notes: this.props.StatusLabeltoUpdate.notes });
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
        if (this.validateForm()) {
            await axios({
                method: 'put',
                url: Domain + '/statuslabels/' + this.state.StatusLabelId,
                data: JSON.stringify({
                    name: this.state.StatusLabelName,
                    type: this.state.type,
                    color: this.state.color,
                    show_in_nav: this.state.show_in_nav,
                    default_label: this.state.default_label,
                    notes: this.state.notes
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
            if (ResponseStatus === true) {
                this.setState({ showUpdate: false });
            }
        }
    }

    validateForm() {
        let state = this.state, errors = {}, formIsValid = true;
        if (!state["StatusLabelName"]) {
            formIsValid = false;
            errors["StatusLabelName"] = "Please enter StatusLabel name";
        }
        if (!state["type"]) {
            formIsValid = false;
            errors["type"] = "Please enter StatusLabel type";
        }
        if (!state["notes"]) {
            formIsValid = false;
            errors["notes"] = "Please enter notes";
        }

        this.setState({ errors: errors });
        return formIsValid;
    }

    BackBtnClick = () => {
        this.setState({ showNotifications: false });
        this.setState({ showUpdate: false });
    }

    render() {
        const { showNotifications, showUpdate } = this.state;
        const { t } = this.props;
        if (showUpdate) {
            return (
                <div>

                    <div class="d-sm-flex align-items-center justify-content-between mb-4">
                        <h1 class="h3 mb-0 text-gray-800 custommain-title">{t('statuslabel.update')}</h1>
                        <button onClick={this.BackBtnClick} className=" btn btn-sm btn-primary shadow-sm custommain-title">
                            {t('button.back')}</button>
                    </div>
                    <div class="container">
                        <div class="row justify-content-center">

                            <div class="col-xl-10 col-lg-12 col-md-9">

                                <div class="card o-hidden border-0 shadow-lg my-5">
                                    <div class="card-body p-0">
                                        <div class="row">
                                            <div class="col-xs-12 col-lg-10 col-md-9">
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

                                                            <div class="col-sm-6 mb-3 mb-sm-0">
                                                                <label for="StatusLabelName" class="control-label customlabel-textcolor">{t('statuslabel.name')} <i style={{ color: "red" }}>*</i></label>
                                                                <input type="text" class="form-control "
                                                                    value={this.state.StatusLabelName} name="StatusLabelName" id="StatusLabelName"
                                                                    placeholder={t('statuslabel.name')} onChange={this.myChangeHandler} />
                                                                <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.StatusLabelName}</div>
                                                            </div>
                                                            <div class="col-sm-6 ">
                                                                <label for="StatusLabelType" class="control-label customlabel-textcolor">{t('statuslabel.type')} <i style={{ color: "red" }}>*</i></label>

                                                                <select ref="type" class="form-control" onChange={this.myChangeHandler} id="type" value={this.state.type} name="type" >
                                                                    <option value="">{t('statuslabel.type')}</option>
                                                                    <option value="deployable">Deployable</option>
                                                                    <option value="undeployable">UnDeployable</option>
                                                                    <option value="deployed">Deployed</option> 
                                                                </select>

                                                                <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.type}</div>
                                                            </div>

                                                        </div>


                                                        <div class="form-group row">
                                                            <div class="col-sm-12 mb-3 mb-sm-0">
                                                                <label for="notes" class=" control-label customlabel-textcolor">{t('statuslabel.notes')} <i style={{ color: "red" }}>*</i></label>
                                                                <textarea class=" form-control " aria-label="notes" value={this.state.notes} spellcheck="false" id="notes" name="notes"
                                                                    placeholder={t('statuslabel.notes')} onChange={this.myChangeHandler} />
                                                            </div>
                                                            <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.notes}</div>
                                                        </div>
                                                        <div class="col-md-offset-6">
                                                            <input type="checkbox" id="show_in_nav" name="show_in_nav" onChange={this.CheckboxChanged} checked={this.state.show_in_nav} />
                                                            <label class="custom-checkbox" for="chkLogin"> {t('statuslabel.shownav')} </label>
                                                        </div>
                                                        <div class="col-md-offset-3">
                                                            <input type="checkbox" id="default_label" name="default_label" onChange={this.CheckboxChanged} checked={this.state.default_label} />
                                                            <label class="custom-checkbox" for="chkLogin">{t('statuslabel.defaultlabel')} </label>
                                                            <p class="col-md-offset-3 ">
                                                                {t('statuslabel.paragraph')}
                                                            </p>

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

                <StatuslabelMain showNotifications={this.state.showNotifications} NotificationMessage={NotificationMessage} />
            )
        }
    }


};
export default withTranslation()(StatuslabelUpdate);
