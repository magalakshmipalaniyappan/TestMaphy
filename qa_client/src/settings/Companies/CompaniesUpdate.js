import React, { } from 'react';
import axios from 'axios';
import CompaniesMain from './CompaniesMain'

import { withTranslation } from 'react-i18next'
const Domain = process.env.REACT_APP_URL;
var NotificationMessage = "";
var ResponseStatus = "";
class CompaniesUpdate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: "en",
            errors:{},
            showUpdate: true,
            showNotifications: false
        }
    }
    componentDidMount() {
        this.setState({ CompanyName: this.props.companyDetails.name });
        this.setState({ CompanyId: this.props.companyDetails.id });
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
            method: 'put',
            url: Domain + '/companies/' + this.state.CompanyId,
            data: JSON.stringify({ name: this.state.CompanyName }),
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
    }
    validateForm() {
        let state = this.state,errors = {},formIsValid = true;
        if (!state["CompanyName"]) {
          formIsValid = false;
          errors["CompanyName"] = "Please enter Company name";
        }
    
        this.setState({ errors: errors});
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
                        <h1 class="h3 mb-0 text-gray-800 custommain-title" name="createcompany" >{t('company.updatecompany')}<span></span></h1>
                        <button onClick={this.BackBtnClick} name="back" className="btn btn-sm btn-primary shadow-sm custommain-title">
                            {t('company.back')}</button>
                    </div>
                    <div class="container">
                        <div class="row justify-content-center">

                            <div class="col-xl-10 col-lg-12 col-md-9">

                                <div class="card o-hidden border-0 shadow-lg my-5">
                                    <div class="card-body p-0">
                                        <div class="row">
                                            <div class="customcol-lg-10">
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
                                                            <label for="eula_text" class="customlabel-textcolor">{t('company.name')} <i style={{ color: "red" }}>*</i></label>
                                                            <input type="text" class="form-control"
                                                                value={this.state.CompanyName} name="CompanyName" id="CompanyName"
                                                                placeholder={t('company.name')} onChange={this.myChangeHandler} />
                                                                <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.CompanyName}</div>
                                                        </div>
                                                        <div class="form-group">
                                                            <button name="btnCancel" onClick={this.BackBtnClick} class="btn btn-link text-left" >{t('company.btnCancel')}</button>
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
                <CompaniesMain showNotifications={this.state.showNotifications} NotificationMessage={NotificationMessage} />
            )
        }
    }
};
export default withTranslation()(CompaniesUpdate);
