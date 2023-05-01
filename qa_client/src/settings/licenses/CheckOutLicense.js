import React from 'react';

import { Button } from 'react-bootstrap';
import axios from 'axios';
import LicensesMain from './LicensesMain';
import LicenseSeats  from './LicenseSeats';
import { withTranslation } from 'react-i18next';

const Domain = process.env.REACT_APP_URL;
var ResponseStatus="";
var NotificationMessage = "";

class CheckOutLicense extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: "en",
            assetData: [],
            asset: '',
            selectedasset: '',
            userData: [],
            user: '',
            selecteduser: '',
            validationError: "",
            ShowCheckout: true,
             errors:{},
            showNotifications: false,
            Checked_to_type: '',
            toggleAsset: false,
            toggleUser: true
        }

    }
    async componentDidMount() {
    
        const asseturl = Domain + '/hardware/selectList?page=1';
        const managersurl = Domain + '/users/selectList?page=1';
        const [asset, manager] = await Promise.all([
            axios.get(asseturl),
            axios.get(managersurl)
        ]);
        this.setState({
            assetData: asset.data.items,
            managerData: manager.data.items
        });
    }

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });

    }

    CheckoutoTypeChange = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
        this.setState({ checkout_to_type: event.target.name });
    }

    mySubmitHandler = async (event) => {
        event.preventDefault();
        if (this.ValidationForm()) {
        await axios({
            method: 'post',
            url: Domain + '/licenses/' + this.props.LicensesDatatoCheckout.id + '/checkout',
            data: JSON.stringify({
                asset_id: this.state.asset,
                notes: this.state.notes,
                assigned_to: this.state.user,
                checkout_to_type: this.state.checkout_to_type
            }),
            headers: {

                'Content-Type': 'application/json'
            }

        })
            .then(function (response) {
                NotificationMessage = response.data.message;
                ResponseStatus=response.data.success;
            })
            .catch(function (response) {
                console.log(response);
            });
            this.setState({ showNotifications: true });
            if(ResponseStatus)
            {
                this.setState({ ShowCheckout: false });
            }
          
        }
        
    }

    ValidationForm() {
        let state = this.state,errors = {},formIsValid = true;
      
        if(!state["notes"])
        {
            formIsValid = false;
            errors["notes"] = "* Please enter notes";   
        }
        if(!state["user"] && !state["asset"] )
        {
            formIsValid = false;
            errors["assigned"] = "* Please select either Asset or User";   
        }
        // else{
        //     if(!state["user"] )
        //     {
        //         formIsValid = false;
        //         errors["notes"] = "* Please select either Asset or User";   
        //     }
        //     else
        //      {
        //             formIsValid = false;
        //             errors["notes"] = "* Please select either Asset or User";  
        //       }
        // }
        this.setState({ errors: errors });
        return formIsValid;
    }

    BackBtnClick = () => {
        NotificationMessage = '';
        this.setState({ showNotifications: false });
        const { ShowCheckout } = this.state;
        this.setState({ ShowCheckout: !ShowCheckout });
    }

    AssetClick = () => {
        this.setState({ toggleAsset: true });
        this.setState({ toggleUser: false });
    }
    UserClick = () => {
        this.setState({ toggleAsset: false });
        this.setState({ toggleUser: true });
    }

    render() {
        const { t } = this.props;
        const { showNotifications, ShowCheckout } = this.state;
        if (ShowCheckout) {
            return (
                <div>
                    <div class="d-sm-flex align-items-center justify-content-between mb-4">
                        <h1 class="h3 mb-0 text-gray-800 custommain-title" name="checkoutlicense"> {t('license.checkoutlicense')}</h1>
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
                                                                        <div class="alert alert-success alert-dismissible fade show" role="alert">
                                                                            <strong> {NotificationMessage}</strong>                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        }

                                                    })()}

                                                    <form class="user" onSubmit={this.mySubmitHandler}>
                                                        <div class="form-group row">
                                                            <div class="col-sm-8 mb-3 mb-sm-0">
                                                                <label for="AssetName" class=" control-label customlabel-textcolor">{t('Checkout.AssetName')} <i style={{ color: "red" }}>*</i></label>
                                                                <input type="text" class="form-control "
                                                                    name="AssetName " id="AssetName " value={this.props.LicensesDatatoCheckout.name}
                                                                    disabled />

                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <div class="col-sm-8 mb-3 mb-sm-0">
                                                                <label for="serial" class=" control-label customlabel-textcolor">{t('Checkout.serial')} <i style={{ color: "red" }}>*</i></label>
                                                                <input type="text" class="form-control "
                                                                    name="serial " value={this.props.LicensesDatatoCheckout.serial} id="serial "
                                                                    disabled />

                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <div class="col-sm-8 mb-3 mb-sm-0">
                                                                <div class=" control-label customlabel-textcolor" name="checkoutto">
                                                                    {t('Checkout.checkoutto')}:&nbsp; <i style={{ color: "red" }}>*</i>  &nbsp;
                                                                    <Button onClick={() => { this.UserClick() }} name="btnUser" class="customcheckout-btn" > {t('Checkout.btnUser')}</Button>&nbsp;
                                                                    <Button onClick={() => { this.AssetClick() }} name="btnAsset" >{t('Checkout.btnAsset')}</Button>

                                                                </div>
                                                                <div class="mb-0">
                                                                    {this.state.toggleUser ?
                                                                        <select ref="manager" class="form-control" onChange={this.CheckoutoTypeChange} id="user" name="user" >
                                                                            <option value="">{t('Checkout.user')}</option>
                                                                            {(() => {
                                                                                if (this.state.managerData) {
                                                                                    return (
                                                                                        this.state.managerData.map(obj => {
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
                                                                            })()}</select>

                                                                        : null}

                                                                    {this.state.toggleAsset ?
                                                                        <select ref="asset" class="form-control" onChange={this.CheckoutoTypeChange} id="asset" name="asset" >
                                                                            <option value="">{t('Checkout.asset')}</option>
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
                                                                        </select> : null}
                                                                    <br />

                                                                </div>
                                                                <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.assigned}</div>
                                                                                                            </div>
                                                        </div>

                                                        <div class="form-group row">
                                                            <div class="col-sm-8 mb-3 mb-sm-0">
                                                                <label for="Notes" class=" control-label customlabel-textcolor">{t('Checkout.notes')} <i style={{ color: "red" }}>*</i></label>
                                                                <textarea class=" form-control " onChange={this.myChangeHandler}
                                                                    aria-label="notes" spellcheck="false" id="notes" name="notes"
                                                                    placeholder={t('Checkout.notes')}  />
                                                            </div>
                                                            <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.notes}</div>
                                                        </div>

                                                        <div class="form-group">
                                                            <button name="btnCancel" class="btn btn-link text-left" onClick={this.BackBtnClick}>{t('button.btnCancel')}</button>
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
          if(this.props.mainPage==="licenseMain")
          {
            return ( <LicensesMain showNotifications={this.state.showNotifications} NotificationMessage="Checkout Successfully" />);
         }
         else {
            return (
                <LicenseSeats LicensesDatatoUpdate={this.props.LicensesDatatoCheckout} showNotifications={this.state.showNotifications} NotificationMessage="Checkin Successfully" />
            )
        }
    }

    }


}
//};

export default withTranslation()(CheckOutLicense);