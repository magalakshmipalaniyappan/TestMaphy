import React, { } from 'react';
import axios from 'axios';

import CategoriesMain from './CategoriesMain';
import { withTranslation } from 'react-i18next'
const Domain = process.env.REACT_APP_URL;
var NotificationMessage = "";
var ResponseStatus = "";
class CategoriesUpdate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: "en",
            CategoriesDatatoUpdate: '',
            errors: {},
            ShowMain: false,
            showUpdate: true,
            showNotifications: false
        }
    }

    componentDidMount() {
        this.setState({ CategoriesName: this.props.CategoriesDatatoUpdate.name });
        this.setState({ category_type: this.props.CategoriesDatatoUpdate.category_type });
        this.setState({ CategoriesId: this.props.CategoriesDatatoUpdate.id });
        this.setState({ checkin_email: this.props.CategoriesDatatoUpdate.checkin_email });
        this.setState({ has_eula: this.props.CategoriesDatatoUpdate.has_eula });
        this.setState({ eula_text: this.props.CategoriesDatatoUpdate.eula_text });
        this.setState({ require_acceptance: this.props.CategoriesDatatoUpdate.require_acceptance });

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
                url: Domain + '/categories/' + this.state.CategoriesId,
                data: JSON.stringify({
                    name: this.state.CategoriesName,
                    category_type: this.state.category_type,
                    has_eula: this.state.has_eula,
                    eula_text: this.state.eula_text,
                    checkin_email: this.state.checkin_email,
                    require_acceptance: this.state.require_acceptance
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
                    console.log(response);
                });
            this.setState({ showNotifications: true });
            if (ResponseStatus === true) {
                this.setState({ showUpdate: false });
            }
        }
    };

    validateForm() {
        let state = this.state,errors = {},formIsValid = true;
        if (!state["CategoriesName"]) {
            formIsValid = false;
            errors["CategoriesName"] = "Please enter Categories name";
        }
        if (!state["category_type"]) {
            formIsValid = false;
            errors["category_type"] = "Please select category type";
        }

        this.setState({ errors: errors });
        return formIsValid;
    }

    BackBtnClick = () => {
        this.setState({ showUpdate: false });
        this.setState({ showNotifications: false });
    }

    render() {
        const { t } = this.props;
        const { showNotifications, showUpdate } = this.state;

        if (showUpdate) {
            return (
                <div>
                    <div class="d-sm-flex align-items-center justify-content-between mb-4">
                        <h1 class="h3 mb-0 text-gray-800 custommain-title" name="categoriestitle">{t('category.updatecategory')} <span></span></h1>
                        <button name="back" onClick={this.BackBtnClick} className="btn btn-sm btn-primary shadow-sm custommain-title">
                            {t('category.back')}</button>
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
                                                        <div class="form-group">

                                                        </div>
                                                        <div class="form-group row">
                                                            <div class="col-sm-6 mb-3 mb-sm-0">
                                                                <label for="eula_text" class="customlabel-textcolor">{t('category.name')} <i style={{ color: "red" }}>*</i></label>
                                                                <input type="text" class="form-control "
                                                                    value={this.state.CategoriesName} name="CategoriesName" id="CategoriesName"
                                                                    placeholder={t('category.name')} onChange={this.myChangeHandler} />
                                                               <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.CategoriesName}</div>
                                                            </div>

                                                            <div class="col-sm-6 ">
                                                                <label for="eula_text" class="customlabel-textcolor">{t('category.category_type')} <i style={{ color: "red" }}>*</i></label>

                                                                <select ref="category_type" class="form-control" value={this.state.category_type} onChange={this.myChangeHandler} id="category_type" name="category_type">
                                                                    <option value="">{t('select.categorytype')} </option>
                                                                    <option value="Accessory">{t('category.Accessory')}</option>
                                                                    <option value="License">{t('category.License')}</option>
                                                                    <option value="Consumable">{t('category.Consumable')}</option>
                                                                    <option value="Component">{t('category.Component')}</option>
                                                                    <option value="Asset">{t('category.Asset')}</option>
                                                                </select>
                                                                <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.category_type}</div>

                                                            </div>

                                                        </div>

                                                        <div class="form-group ">
                                                            <label for="eula_text" class="customlabel-textcolor">{t('category.has_eula')}</label>

                                                            <textarea class="form-control " id="eula_text" name="eula_text" value={this.state.eula_text}
                                                                placeholder={t('category.has_eula')} onChange={this.myChangeHandler} />
                                                                                                         <p class="col-md-offset-3" name="eula">{t('category.eula')}</p>
                                                            {/* <p class="help-block" name="eulas">{t('category.eulas')} <a href="https://help.github.com/articles/github-flavored-markdown/" name="github">{t('category.github')}</a>. </p> */}
                                                        </div>

                                                        <div class="col-md-offset-6">
                                                            <input type="checkbox" id="has_eula" name="has_eula" checked={this.state.has_eula} onChange={this.CheckboxChanged} disabled />
                                                            <label class="custom-checkbox" for="defaultval" name="has_eulas1"> {t('category.has_eulas1')}</label>

                                                        </div>

                                                        <div class="col-md-offset-3">
                                                            <input type="checkbox" id="require_acceptance" name="require_acceptance" checked={this.state.require_acceptance} onChange={this.CheckboxChanged} />
                                                            <label class="custom-checkbox" for="acceptance">{t('category.require_acceptance')}</label>

                                                        </div>
                                                        <div class=" col-md-offset-3">
                                                            <input type="checkbox" id="checkin_email" name="checkin_email" checked={this.state.checkin_email} onChange={this.CheckboxChanged} />
                                                            <label class="custom-checkbox" for="usermail">{t('category.checkin_email')}.</label>

                                                        </div>
                                                        <div class="form-group">
                                                            <button name="btnCancel" onClick={this.BackBtnClick} class="btn btn-link text-left" >{t('category.btnCancel')}</button>

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

                <CategoriesMain showNotifications={this.state.showNotifications} NotificationMessage={NotificationMessage} />
            )
        }
    }
};
export default withTranslation()(CategoriesUpdate);

