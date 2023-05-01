import React, {  } from 'react';
import axios from 'axios';
import ManufactureMain from './ManufactureMain'

import { withTranslation } from 'react-i18next'
const Domain = process.env.REACT_APP_URL;
var NotificationMessage = "";
var ResponseStatus = "";
class ManufactureUpdate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: "en",
      errors: {},
      ManufacturetoUpdate: '',
      ManufactureName: '',
      ShowMain: false,
      showUpdate: true,
      showNotifications: false

    }

  }

  componentDidMount() {
    this.setState({ ManufactureName: this.props.ManufacturetoUpdate.name });
    this.setState({ ManufactureId: this.props.ManufacturetoUpdate.id });
    this.setState({ url: this.props.ManufacturetoUpdate.url });
    this.setState({ support_url: this.props.ManufacturetoUpdate.support_url });
    this.setState({ support_phone: this.props.ManufacturetoUpdate.support_phone });
    this.setState({ support_email: this.props.ManufacturetoUpdate.support_email });
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
        url: Domain + '/manufacturers/' + this.state.ManufactureId,
        data: JSON.stringify({
          name: this.state.ManufactureName,
          url: this.state.url,
          support_url: this.state.support_url,
          support_phone: this.state.support_phone,
          support_email: this.state.support_email
        }),
        headers: { 'Content-Type': 'application/json' }

      })
        .then((response) => {
          //handle success
          ResponseStatus = response.data.success;
          NotificationMessage = response.data.message;
        })
        .catch(function (response) {
          //handle error
          console.log(response);

        });

      this.setState({ showNotifications: true });

      if (ResponseStatus === true) {
        this.setState({ showUpdate: false });
      }

    }

  };
  BackBtnClick = () => {
    this.setState({ showUpdate: false });
    this.setState({ showNotifications: false });

  }

  validateForm() {
    let state = this.state,errors = {},formIsValid = true;
    if(!state["ManufactureName"] )
    {
      formIsValid = false;
      errors["ManufactureName"] = "*Please enter Manufacturer name";
    }
    if(!state["url"] )
    {
      formIsValid = false;
      errors["url"] = "*Please enter url";
    }
   else{
    if (typeof state["url"] !== "undefined") {

      var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i');
      if (!pattern.test(state["url"])) {
        formIsValid = false;
        errors["url"] = "*Please enter valid  url";
      }
    }
  }
  if(!state["support_url"] )
  {
    formIsValid = false;
    errors["support_url"] = "*Please support url";
  }
 else{
    if (typeof state["support_url"] !== "undefined") {

      var pattern1 = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i');
      if (!pattern1.test(state["support_url"])) {
        formIsValid = false;
        errors["support_url"] = "*Please enter valid support url";
      }
    }
  }
    if (!state["support_phone"]) {
      formIsValid = false;
      errors["support_phone"] = "*Please enter phone number.";
    }
 else{
    if (typeof state["support_phone"] !== "undefined") {
      if (!state["support_phone"].match(/^[0-9-,]+$/)) {
        formIsValid = false;
        errors["support_phone"] = "*Please enter valid phone number.";
      }
    }
  }
  if(!state["support_email"] )
  {
    formIsValid = false;
    errors["support_email"] = "*Please enter support email";
  }
 else{
    if (typeof state["support_email"] !== "undefined") {
      //regular expression for email validation
      var pattern2 = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!pattern2.test(state["support_email"])) {
        formIsValid = false;
        errors["support_email"] = "*Please enter valid Email-Id";
      }
    }
  }
    this.setState({
      errors: errors
    });
    return formIsValid;


  }
  onLanguageHandle = (event) => {
    let newLang = event.target.value;
    this.setState({ value: newLang })
    this.props.i18n.changeLanguage(newLang)
  }

 
  render() {
    const { t } = this.props

    console.log('this is', this)
    const { showNotifications, showUpdate } = this.state;

    if (showUpdate) {
      return (
        <div>

  <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800 custommain-title" name="updatemanufacture">{t('manufacturers.updatemanufacture')}</h1>
            <button onClick={this.BackBtnClick} name="back" className=" btn btn-sm btn-primary shadow-sm custommain-title">
            {t('manufacturers.back')}</button>
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
                            <div class="form-group col-md-7">
                              <label for="Manufacturename" class=" control-label customlabel-textcolor">{t('manufacturers.name')} <i style={{ color: "red" }}>*</i></label>

                              <input type="text" class="form-control "
                                value={this.state.ManufactureName} name="ManufactureName" id="ManufactureName"
                                placeholder={t('manufacturers.name')} onChange={this.myChangeHandler} />
                               <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.ManufactureName}</div>
                               </div>


                            <div class="form-group col-md-7">
                              <label for="URL" class=" control-label customlabel-textcolor">{t('manufacturers.url')} <i style={{ color: "red" }}>*</i></label>

                              <input type="text" class="form-control "
                                name="url" value={this.state.url} id="url" 
                                placeholder={t('manufacturers.url')} onChange={this.myChangeHandler} />
                              <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.url}</div>
                            </div>



                            <div class="form-group col-md-7">
                              <label for="URL" class="control-label customlabel-textcolor">{t('manufacturers.support_url')} <i style={{ color: "red" }}>*</i></label>

                              <input type="text" class="form-control "
                                name="support_url" id="support_url" value={this.state.support_url}
                                placeholder={t('manufacturers.support_url')} onChange={this.myChangeHandler} />
                              <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.support_url}</div>
                            </div>




                            <div class="form-group col-md-7">
                              <label for="URL" class="control-label customlabel-textcolor">{t('manufacturers.support_phone')} <i style={{ color: "red" }}>*</i></label>

                              <input type="text" class="form-control "
                                name="support_phone" id="support_phone" value={this.state.support_phone} 
                                placeholder={t('manufacturers.support_phone')} onChange={this.myChangeHandler} d/>
                              <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.support_phone}</div>
                            </div>


                            <div class="form-group col-md-7">
                              <label for="URL" class=" control-label customlabel-textcolor">{t('manufacturers.support_email')} <i style={{ color: "red" }}>*</i></label>

                              <input type="text" class="form-control" aria-describedby="emailHelp"
                                name="support_email" id="support_email" value={this.state.support_email} 
                                placeholder={t('manufacturers.support_email')} onChange={this.myChangeHandler} />
                              <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.support_email}</div>
                            </div>


                            <div class="form-group">
                               <button name="btnCancel" class="btn btn-link text-left" onClick={this.BackBtnClick} >{t('manufacturers.btnCancel')}</button>

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

        <ManufactureMain showNotifications={this.state.showNotifications} NotificationMessage={NotificationMessage} />
      )
    }
  }


};
export default withTranslation()(ManufactureUpdate);