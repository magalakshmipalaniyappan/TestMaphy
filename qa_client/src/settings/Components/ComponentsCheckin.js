import React from 'react';
import axios from 'axios';
import { withTranslation} from 'react-i18next';
import ComponentsNameDetails from './ComponentsNameDetails';
import swal from 'sweetalert';
var NotificationMessage = "";
var ResponseStatus="";
const Domain = process.env.REACT_APP_URL;
class ComponentsCheckin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: "en",
      errors: {},
      ShowCheckin: true,
      showNotifications: false
    }
    this.myChangeHandler = this.myChangeHandler.bind(this);
    this.mySubmitHandler = this.mySubmitHandler.bind(this);
  };

  myChangeHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  mySubmitHandler = async (event) => {
    event.preventDefault();
    if (this.validateForm()) {
    await axios({
      method: 'post',
      url: Domain + '/components/' + this.props.ComponentstoUpdate.assigned_pivot_id + '/checkin',

      data: JSON.stringify({
        name: this.state.ComponentsName,
        assigned_qty: this.state.qty,
        notes: this.state.notes
      }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(function (response) {
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
      swal("Checkin Successfully!") 
     this.setState({ ShowCheckin: false });
     }
    }
  }

  validateForm() {
    let state = this.state,errors = {},formIsValid = true;

    if(!state["notes"])
    {
      formIsValid = false;
      errors["notes"] = "Please enter your notes";
    }
    if (!state["qty"]) {
      formIsValid = false;
      errors["qty"] = "Please enter quantity";
    }
    else{
      if (typeof state["qty"] !== "undefined") {
        var pattern = new RegExp(/^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/);
        if (!pattern.test(state["qty"])) {
          formIsValid = false;
          errors["qty"] = "*Only allow integer and greater than zero..";
        }
      }
    }
    this.setState({ errors: errors});
    return formIsValid;
  }


  BackBtnClick = () => {
    NotificationMessage = '';
    this.setState({ showNotifications: false });
    this.setState({ ShowCheckin:false });
  }

  render() {
    const { showNotifications, ShowCheckin } = this.state;
    const { t } = this.props;
    if (ShowCheckin) {
      return (
        <div>
          <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800 custommain-title">{this.props.ComponentsNameDetails.name}({this.props.ComponentsNameDetails.remaining})</h1>
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
                                    </div>
                                  </div>
                                </div>
                              )
                            }


                          })()}
                          <form class="user" onSubmit={this.mySubmitHandler}>
                            <div class="form-group row">
                              <div class="col-sm-8 mb-3 mb-sm-0">
                                <label for="ComponentsName" class=" control-label customlabel-textcolor">{t('component.name')} <i style={{ color: "red" }}>*</i></label>

                                <input type="text" class="form-control "
                                  name="ComponentsName" id="ComponentsName" value={this.props.ComponentsNameDetails.name} 
                                  placeholder={t('component.name')} onChange={this.myChangeHandler} disabled />
                              </div>
                            </div>

                            <div class="form-group row">
                              <div class="col-sm-8 mb-3 mb-sm-0">
                                <label for="Qty" class=" control-label customlabel-textcolor">{t('component.qty')}  <i style={{ color: "red" }}>*</i></label>

                                <input type="text" class="form-control "
                                  name="qty" id="qty"
                                  placeholder={t('component.qty')} onChange={this.myChangeHandler} />
                              </div>
                              <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.qty}</div>
                            </div>
                            <div class="form-group row">
                              <div class="col-sm-8 mb-3 mb-sm-0">
                                <label for="Notes" class=" control-label customlabel-textcolor">{t('component.notes')} <i style={{ color: "red" }}>*</i></label>

                                <textarea class=" form-control " onChange={this.myChangeHandler}
                                  spellcheck="false" id="notes" name="notes"
                                  placeholder={t('component.notes')} />
                              </div>
                              <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.notes}</div>
                            </div>
                            <div class="form-group">
                            <button name="btnCancel" onClick={this.BackBtnClick} class="btn btn-link text-left" >{t('button.cancel')}</button>
                            <button name='submit' class=" btn-primary" >{t('button.submit')}</button>

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
        <ComponentsNameDetails ComponentsNameDetails={this.props.ComponentsNameDetails} showNotifications={this.state.showNotifications} NotificationMessage="Checkin Successfully" />
      );
    }
  }
};
export default withTranslation()(ComponentsCheckin);
