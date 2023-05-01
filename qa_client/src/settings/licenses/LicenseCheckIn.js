import React from 'react';
import axios from 'axios';
import LicenseSeats from './LicenseSeats';
import { withTranslation } from 'react-i18next';
import swal from 'sweetalert';
const Domain = process.env.REACT_APP_URL;
var NotificationMessage = "", checkinStatus = "";
class LicenseCheckIn extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: "en",
            assetData: [],
            errors:{},
            asset: '',
            selectedasset: '',
            userData: [],
            user: '',
            selecteduser: '',
            validationError: "",
            ShowCreate: true,
            NotificationMessage: '',
            showNotifications: false,
            ShowSeats: false,
            toggleUser: true,
            toggleAsset: false,
            Checked_to_type: ''
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

    mySubmitHandler =async (event) => {
        event.preventDefault();
        let reassignable = this.props.LicensesDatatoUpdate.reassignable;
        if (reassignable === 0) {
            NotificationMessage = "Error! License not reassignable";
            this.setState({ showNotifications: true });
            this.setState({ShowSeats:false}); 
        }
        else {
            if (this.ValidationForm()) {
            await axios({
                method: 'post',
                url: Domain + '/licenses/' + this.props.LicensesSeatstoCheckin.id + '/checkin',
                data: JSON.stringify({
                    asset_id: this.state.AssetName,
                    notes: this.state.notes,
                    serial: this.state.serial,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }

            })
                .then(function (response) {
                    NotificationMessage = response.data.message;
                    checkinStatus = response.data.success;
                })
                .catch(function (response) {
                    console.log(response);
                });
            if (checkinStatus) {
                swal("CheckedIn Successfully");
                this.setState({ ShowSeats: true });
            }
            else {
                this.setState({ showNotifications: true });
            }
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
this.setState({ errors: errors });
        return formIsValid;
    }
    CancelBtnClick = () => {
        NotificationMessage = '';
        this.setState({ showNotifications: false });
        const { ShowSeats } = this.state;
        this.setState({ ShowSeats: !ShowSeats });
    }

    render() {
        const { t } = this.props;
        const { ShowSeats, showNotifications } = this.state;

        if (ShowSeats) {
            return (
                <LicenseSeats LicensesDatatoUpdate={this.props.LicensesDatatoUpdate} showNotifications={this.state.showNotifications} NotificationMessage="Checkin Successfully" />
            )
        }
        else {
            return (
                <div>
                    <div class="d-sm-flex align-items-center justify-content-between mb-4">
                        <h1 class="h3 mb-0 text-gray-800 custommain-title" name="chekinlicense">{t('Checkin.chekinlicense')}</h1>
                        <button name="btnCancel" class="btn btn-primary text-left" onClick={this.CancelBtnClick}>Back to Seats</button>
                    </div>
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-xl-10 col-lg-12 col-md-9">

                                <div class="card o-hidden border-0 shadow-lg my-5">
                                    <div class="card-body p-0">
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
                                                            <label for="AssetName" class=" control-label customlabel-textcolor">{t('Checkin.name')} <i style={{ color: "red" }}>*</i></label>
                                                            <input type="text" class="form-control "
                                                                name="AssetName " id="AssetName " onChange={this.myChangeHandler}
                                                                value={this.props.LicensesDatatoUpdate.name}
                                                                disabled />

                                                        </div>
                                                    </div>
                                                    <div class="form-group row">
                                                        <div class="col-sm-8 mb-3 mb-sm-0">
                                                            <label for="serial" class=" control-label customlabel-textcolor">{t('Checkin.serial')} <i style={{ color: "red" }}>*</i></label>
                                                            <input type="text" class="form-control "
                                                                name="serial " value={this.props.LicensesDatatoUpdate.serial}
                                                                onChange={this.myChangeHandler} id="serial "
                                                                disabled />

                                                        </div>
                                                    </div>
                                                    <div class="form-group row">
                                                        <div class="col-sm-8 mb-3 mb-sm-0">
                                                            <label for="Notes" class=" control-label customlabel-textcolor">{t('Checkin.notes')} <i style={{ color: "red" }}>*</i> </label>
                                                            <textarea class=" form-control " onChange={this.myChangeHandler}
                                                                id="notes" name="notes"
                                                                placeholder={t('Checkin.notes')} />
                                                        </div>
                                                        <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.notes}</div>
                                                    </div>

                                                    <div class="form-group">
                                                        <button name="btnCancel" class="btn btn-link text-left" onClick={this.CancelBtnClick}>Cancel</button>
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
            )
        }
    }


}
//};

export default withTranslation()(LicenseCheckIn);