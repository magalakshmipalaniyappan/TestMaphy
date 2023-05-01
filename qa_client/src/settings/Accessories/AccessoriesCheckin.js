
import React from 'react';
import axios from 'axios';
import { withTranslation } from 'react-i18next';
//import AccessoriesMain from './AccessoriesMain';
import AccessoriesDetails from './AccessoriesNameDetails';
import swal from 'sweetalert';
var validator = require('validator');
var ResponseStatus="";
var NotificationMessage="";
const Domain = process.env.REACT_APP_URL;
class AccessoriesCheckin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: "en",
      errors: {},
      currentdate: '',

      ShowCheckin: true,
      showNotifications: false
    }
    this.myChangeHandler = this.myChangeHandler.bind(this);
    this.mySubmitHandler = this.mySubmitHandler.bind(this);

  };
  componentDidMount() {
    var date = { currentTime: new Date().toLocaleString() };
    this.setState({ currentdate: date });
  }

  myChangeHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }
  validateForm() {
    let state = this.state,errors = {},formIsValid = true;
    if (!state["notes"]) {
      formIsValid = false;
      errors["notes"] = "Please Enter Notes.";
    }

    if (!state["checkin_date"]) {
      formIsValid = false;
      errors["checkin_date"] = "Please select checkin date";
    }
    else {
      if (!validator.isDate(this.state.checkin_date)) {
        formIsValid = false;
        errors["checkin_date"] = "Please enter valid checkin date";
      }
      else {  
        if(validator.isAfter(this.state.checkin_date))
        {
          formIsValid = false;
           errors["checkin_date"] = "Checkin date cannot be in the future";
        }
      }
    }
    this.setState({  errors: errors });
    return formIsValid;
  }
  mySubmitHandler = async (event) => {
    event.preventDefault();
    if (this.validateForm()) {
      await axios({
        method: 'post',
        url: Domain + '/accessories/' + this.props.AccessoriestoUpdate.assigned_pivot_id + '/checkin',
        data: JSON.stringify({
          name: this.state.AssetName,
          checkin_date: this.state.checkin_date,
          note: this.state.notes
        }),
        headers: { 'Content-Type': 'application/json' }
      })
        .then(function (response) {
          NotificationMessage=response.data.message;
          ResponseStatus=response.data.success;
        })
        .catch(function (response) {
          //handle error
          console.log(response);
        });
      if(ResponseStatus)
      {
        swal("CheckedIn Successfully");
        this.setState({ ShowCheckin: false });
      }
      else{
        this.setState({showNotifications:true})
      }
    }
  }

  BackBtnClick = () => {
    //NotificationMessage = '';
    this.setState({ showNotifications: false });
    this.setState({ ShowCheckin: false});
  }
  render() {
    const { t } = this.props;
    const { showNotifications, ShowCheckin } = this.state;

    if (ShowCheckin) {
      return (
        <div>
          <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800custommain-title " name="checkinaccessory">{t('accessory.checkinaccessory')}</h1>
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
                            <h1 class="h3 mb-0 text-gray-800">{this.props.AccessoriesNameDetails.name}({this.props.AccessoriesNameDetails.remaining_qty})</h1>&nbsp;
                            <div class="form-group row">
                              <div class="col-sm-8 mb-3 mb-sm-0">
                                <label for="AssetName" class=" control-label customlabel-textcolor">{t('accessory.AssetName')}  <i style={{ color: "red" }}>*</i></label>
                                <input type="text" class="form-control "
                                  name="AssetName" id="AssetName" value={this.props.AccessoriesNameDetails.name}
                                  placeholder={t('accessory.AssetName')} onChange={this.myChangeHandler} disabled />
                              </div>

                            </div>

                            <div class="form-group row">
                              <div class="col-sm-8 mb-3 mb-sm-0">
                                <label for="notes" class=" control-label customlabel-textcolor">{t('accessory.notes')}  <i style={{ color: "red" }}>*</i> </label>
                                <textarea class=" form-control " id="notes"
                                  placeholder={t('accessory.notes')} name="notes" onChange={this.myChangeHandler} />
                              </div>
                              <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.notes}</div>

                            </div>

                            <div class="form-group row">
                              <div class="col-sm-8 mb-3 mb-sm-0">
                                <label for="checkin_date" class=" control-label customlabel-textcolor">{t('accessory.checkin_date')}  <i style={{ color: "red" }}>*</i> </label>
                                <input type="date" class="form-control "
                                  name="checkin_date" id="checkin_date"
                                  placeholder={t('accessory.checkin_date')} onChange={this.myChangeHandler}  />
                                <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.checkin_date}</div>

                              </div>
                            </div>
                            <div class="form-group">
                              <button name="btnCancel" onClick={this.BackBtnClick} class="btn btn-link text-left" >{t('button.btnCancel')}</button>
                              <button name='submit' class="btn-primary" onClick={this.mySubmitHandler}>{t('button.submit')}</button>
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
        <AccessoriesDetails AccessoriesNameDetails={this.props.AccessoriesNameDetails}/>
      );
    }
  }
};

export default withTranslation()(AccessoriesCheckin);