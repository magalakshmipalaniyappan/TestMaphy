import React from 'react';
import axios from 'axios';
import ConsumablesMain from './ConsumablesMain';
import { withTranslation} from 'react-i18next';
const Domain = process.env.REACT_APP_URL;
var NotificationMessage = "";
var ResponseStatus="";
class CheckOutConsumable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: "en",
            errors: {},
            ShowCheckout: true,
            showNotifications: false
        }
        this.myChangeHandler = this.myChangeHandler.bind(this);
        this.mySubmitHandler = this.mySubmitHandler.bind(this);
    };

    async componentDidMount() {
        this.setState({ ConsumableName: this.props.ConsumablesDatatoUpdate.name });
        const managersurl = Domain + '/users/selectList?page=1';
        const [user_id] = await Promise.all([
            axios.get(managersurl)
        ]);
        this.setState({ managerData: user_id.data.items });
    }
    myChangeHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    mySubmitHandler = async (event) => {
        event.preventDefault();
    if (this.validateForm()) {
        await axios({
            method: 'post',
            url: Domain + '/consumables/' + this.props.ConsumablesDatatoUpdate.id + '/checkout',
            data: JSON.stringify({
                name: this.state.ConsumableName,
                assigned_to: this.state.user_id,
                notes: this.state.notes
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
            if(ResponseStatus)
            {
             this.setState({ ShowCheckout: false });
            }
           this.setState({ showNotifications: true });
        }
    }

    validateForm() {
        let state = this.state,errors = {},formIsValid = true;
        if (!state["notes"]) {
          formIsValid = false;
          errors["notes"] = "Please enter notes";
        }
        if (!state["user_id"]) {
          formIsValid = false;
          errors["user_id"] = "Please select user";
        }
        this.setState({  errors: errors });
        return formIsValid;
      }

    BackBtnClick = () => {
        NotificationMessage = '';
        this.setState({ showNotifications: false });
        this.setState({ ShowCheckout:false });
    }
    render() {

        const { showNotifications, ShowCheckout } = this.state;
        const { t } = this.props;

        if (ShowCheckout) {
            return (
                <div>
                    <div class="d-sm-flex align-items-center justify-content-between mb-4">
                        <h1 class="h3 mb-0 text-gray-800 custommain-title">{t('consumable.checkout')} <span></span></h1>
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
                                                                        <div class="alert alert-success alert-dismissible fade show" role="alert">
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
                                                                <label for="ConsumableName" class=" control-label customlabel-textcolor">{t('consumable.name')} <i style={{ color: "red" }}>*</i></label>
                                                                <input type="text" class="form-control "
                                                                    name="ConsumableName" id="ConsumableName" value={this.state.ConsumableName} aria-describedby="emailHelp"
                                                                    placeholder={t('consumable.name')}  onChange={this.myChangeHandler} disabled />
                                                            </div>
                                                        </div>

                                                        <div class="form-group row">
                                                            <div class="col-sm-8 mb-3 mb-sm-0">
                                                                <label for="user_id" class=" control-label customlabel-textcolor">{t('consumable.username')} <i style={{ color: "red" }}>*</i></label>

                                                                <select ref="user_id" class="form-control" onChange={this.myChangeHandler} id="user_id" name="user_id" >
                                                                    <option value="">{t('consumable.username')} </option>
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
                                                                </select>
                                                                <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.user_id}</div>


                                                            </div>

                                                        </div>
                                                        <div class="form-group row">
                                                            <div class="col-sm-8 mb-3 mb-sm-0">
                                                                <label for="Notes" class=" control-label customlabel-textcolor">{t('consumable.notes')}  <i style={{ color: "red" }}>*</i></label>
                                                                <textarea class="form-control " id="notes" name="notes"
                                                                    placeholder={t('consumable.notes')}  onChange={this.myChangeHandler} />
                                                            </div>
                                                            <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.notes}</div>
                                                        </div>
                                                        <div class="form-group">
                                                        <button name="btnCancel" onClick={this.BackBtnClick} class="btn btn-link text-left" >{t('button.cancel')}</button>
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
                <ConsumablesMain showNotifications={this.state.showNotifications} NotificationMessage="Checkout Successfully" />
            );
        }
    }
};
export default withTranslation()(CheckOutConsumable);

