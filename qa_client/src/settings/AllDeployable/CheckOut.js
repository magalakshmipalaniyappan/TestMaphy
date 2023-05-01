
import React from 'react';
import axios from 'axios';

import { Button } from 'react-bootstrap';
import AllDeployableMain from './AllDeployableMain';
import { withTranslation } from 'react-i18next';
var validator = require('validator');
var NotificationMessage = "";
var ResponseStatus="";
const Domain = process.env.REACT_APP_URL;
class CheckOut extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: "en",
            errors: {},
            ShowCheckout: true,
            showNotifications: false,
            ShowMain: false,

            toggleUser: true,
            toggleLocation: false,
            toggleAsset: false,
            checkout_to_type: 'user'

        }
        this.myChangeHandler = this.myChangeHandler.bind(this);
        this.mySubmitHandler = this.mySubmitHandler.bind(this);
    };
    async componentDidMount() {
        this.setState({ AssetName: this.props.ListAllDatatoCheckout.name });
        this.setState({ ListAllId: this.props.ListAllDatatoCheckout.id });
        this.setState({ model_id: this.props.ListAllDatatoCheckout.model.id });
        const managersurl = Domain + '/users/selectList?page=1';
        const locationurl = Domain + '/locations/selectList?page=1';
        const [assigned_user, assigned_location] = await Promise.all([
            axios.get(managersurl),
            axios.get(locationurl)
        ]);

        this.setState({
            managerData: assigned_user.data.items,
            locationData: assigned_location.data.items

        });

    }
    myChangeHandler = (event) => {

        this.setState({ [event.target.name]: event.target.value });
    }
    myChangeHandlerManager = (event) => {
        this.setState({ [event.target.name]: event.target.value });

        this.setState({ checkout_to_type: 'user' })
    }

    myChangeHandlerLocation = (event) => {
        this.setState({ [event.target.name]: event.target.value });
        this.setState({ checkout_to_type: 'location' })
    }
    mySubmitHandler = async (event) => {
        event.preventDefault();
         if (this.ValidationForm()) {
        await axios({
            method: 'post',
            url: Domain + '/hardware/' + this.props.ListAllDatatoCheckout.id + '/checkout',
            data: JSON.stringify({
                name: this.state.AssetName,
                model_id: this.state.model_id,
                status_id: this.state.StatusLabelType,
                assigned_location: this.state.assigned_location,
                assigned_user: this.state.assigned_user,
                notes: this.state.notes,
                checkout_at: this.state.checkout_at,
                expected_checkin: this.state.expected_checkin,
                checkout_to_type: this.state.checkout_to_type
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(function (response) {
                //handle success
                ResponseStatus=response.data.success;
                NotificationMessage = response.data.message;
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });
            this.setState({ showNotifications: true });
        if(ResponseStatus)
        {
            this.setState({ ShowCheckout: false });
        }      
    }
}
ValidationForm(){
    let state = this.state,errors = {},formIsValid = true;
    if((!state["assigned_location"] && !state["assigned_user"]))
    {
        formIsValid = false;
        errors["assigned"] = "Please select either user or location ";   
    }
      if (!state["checkout_at"]) {
        formIsValid = false;
        errors["checkout_at"] = "Please select checkout date";
      }
      else {
        if (!validator.isDate(this.state.checkout_at)) {
          formIsValid = false;
          errors["checkout_at"] = "Please enter valid checkout date";
        }
        else {  
          if(validator.isAfter(this.state.checkout_at))
          {
            formIsValid = false;
             errors["checkout_at"] = "Checkout date cannot be in the future";
          }
        }
      }

      if (!state["expected_checkin"]) {
        formIsValid = false;
        errors["expected_checkin"] = "Please select checkin date";
      }
      else {
        if (!validator.isDate(this.state.expected_checkin)) {
          formIsValid = false;
          errors["expected_checkin"] = "Please enter valid checkin date";
        }
        else {  
          if(!validator.isAfter(this.state.expected_checkin,this.state.checkout_at))
          {
            formIsValid = false;
            errors["expected_checkin"] = "CheckIn  date should be lesser than CheckOut date";
          }
        }
    }  
    if(!state["notes"])
    {
        formIsValid = false;
        errors["notes"] = "Please senter notes ";   
    }

    this.setState({ errors: errors});
    return formIsValid;
 }
    onUserClick = () => {
        this.setState({ toggleUser: true })
        this.setState({ toggleAsset: false })
        this.setState({ toggleLocation: false })
        this.setState({ ShowMain: false })
        this.setState({ ShowCheckout: true })
    }
    onLocationClick = () => {
        this.setState({ toggleUser: false })
        this.setState({ toggleAsset: false })
        this.setState({ toggleLocation: true })
        this.setState({ ShowMain: false })
        this.setState({ ShowCheckout: true })
    }

    BackBtnClick = () => {
        NotificationMessage = '';
        this.setState({ showNotifications: false });
        const { ShowCheckout } = this.state;
        this.setState({ ShowCheckout: !ShowCheckout });
        const { ShowMain } = this.state;
        this.setState({ ShowMain: !ShowMain });
    }

    CancelBtnClick = () => {
        NotificationMessage = '';
        this.setState({ showNotifications: false });
        const { ShowCheckout } = this.state;
        this.setState({ ShowCheckout: !ShowCheckout });
        const { ShowMain } = this.state;
        this.setState({ ShowMain: !ShowMain });
    }
  
    render() {
        const { t } = this.props;
        const { ShowCheckout, showNotifications } = this.state;
        if (ShowCheckout) {
            return (
                <div>
                    <div class="d-sm-flex align-items-center justify-content-between mb-4">
                        <h1 class="h3 mb-0 text-gray-800 custommain-title" name="checkoutasset">{t('Checkout.checkoutasset')}<span></span></h1>
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
                                                                            <strong>{NotificationMessage}</strong>
                                                                        </div>


                                                                    </div>
                                                                </div>
                                                            )
                                                        }
                                                    })()}

                                                    <form class="user" onSubmit={this.mySubmitHandler}>
                                                        <div class="form-group row">
                                                            <div class="col-sm-8 mb-3 mb-sm-0">
                                                                <label for="Model" class=" control-label customlabel-textcolor">{t('Checkout.model_id')} <i style={{ color: "red" }}>*</i> </label>

                                                                <input type="text" class="form-control "
                                                                    name="model_id" id="model_id"
                                                                    value={this.state.model_id}
                                                                    placeholder="Model..." onChange={this.myChangeHandler} disabled />
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <div class="col-sm-8 mb-3 mb-sm-0">
                                                                <label for="AssetName" class=" control-label customlabel-textcolor">{t('Checkout.AssetName')} <i style={{ color: "red" }}>*</i> </label>

                                                                <input type="text" class="form-control " value={this.state.AssetName}
                                                                    name="AssetName" id="AssetName" aria-describedby="emailHelp"
                                                                    placeholder={t('Checkout.AssetName')} onChange={this.myChangeHandler} disabled />
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <div class="col-sm-8 mb-3 mb-sm-0">
                                                                <label for="StatusLabelType" class="control-label customlabel-textcolor">{t('Checkout.status_id')} <i style={{ color: "red" }}>*</i> </label>
                                                                <input ref="StatusLabelType" value="deployed" class="form-control" onChange={this.myChangeHandler} id="StatusLabelType" name="StatusLabelType" disabled />

                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <div class="col-sm-8 mb-3 mb-sm-0">
                                                                <label for="checkout_to_type" class="control-label customlabel-textcolor">{t('Checkout.checkout_to_type')} <i style={{ color: "red" }}>*</i> </label>

                                                                &nbsp; <Button onClick={this.onUserClick} name="btnUser" class="btn btn-primary">{t('Checkout.btnUser')}</Button>&nbsp;
                                                                <Button onClick={this.onLocationClick} name="btnLocation" class="btn btn-primary">{t('Checkout.btnLocation')}</Button>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <div class="col-sm-8 mb-3 mb-sm-0">
                                                                {this.state.toggleUser ? <select ref="assigned_user" class="form-control" onChange={this.myChangeHandlerManager} id="assigned_user" name="assigned_user">
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
                                                                    })()}
                                                                </select> : null}

                                                                {this.state.toggleLocation ? <select ref="assigned_location" class="form-control" onChange={this.myChangeHandlerLocation} id="assigned_location" name="assigned_location">
                                                                    <option value="">{t('Checkout.location')}</option>
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
                                                                    : null}
                                                            </div>
                                                            <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.assigned}</div>

                                                        </div>




                                                        <div class="form-group row">
                                                            <div class="col-sm-8 mb-3 mb-sm-0">
                                                                <label for="CheckoutDate" class=" control-label customlabel-textcolor">{t('Checkout.checkout_at')} <i style={{ color: "red" }}>*</i> </label>

                                                                <input type="date" class="form-control "
                                                                    name="checkout_at" id="checkout_at" aria-describedby="emailHelp"
                                                                    placeholder={t('Checkout.checkout_at')} onChange={this.myChangeHandler} />
                                                              <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.checkout_at}</div>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <div class="col-sm-8 mb-3 mb-sm-0">
                                                                <label for="expected_checkin" class=" control-label customlabel-textcolor">{t('Checkout.expected_checkin')} <i style={{ color: "red" }}>*</i> </label>

                                                                <input type="date" class="form-control "
                                                                    name="expected_checkin" id="expected_checkin"
                                                                    placeholder={t('Checkout.expected_checkin')} onChange={this.myChangeHandler}  />
                                                                     <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.expected_checkin}
                                                                  </div>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <div class="col-sm-8 mb-3 mb-sm-0">
                                                                <label for="notes" class=" control-label customlabel-textcolor">{t('Checkout.notes')} <i style={{ color: "red" }}>*</i> </label>

                                                                <textarea class=" form-control " onChange={this.myChangeHandler}
                                                                    aria-label="notes" spellcheck="false" id="notes" name="notes"
                                                                    placeholder={t('Checkout.notes')} />
                                                            </div>
                                                        </div>
                                                        <div class="form-group">
                                                            <button name="btnCancel" onClick={this.CancelBtnClick} class="btn btn-link text-left" >{t('button.btnCancel')}</button>

                                                            <button name='submit' class=" btn-primary " >{t('button.submit')}</button>
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
                <AllDeployableMain showNotifications={this.state.showNotifications} NotificationMessage="Checkout Successfully" />
            );
        }
    }
};
export default withTranslation()(CheckOut);
