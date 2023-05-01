import React from 'react';
import axios from 'axios';
import { withTranslation } from 'react-i18next';
import { Redirect } from 'react-router-dom';
import swal from 'sweetalert';

const Domain = process.env.REACT_APP_URL;
var NotificationMessage = "";
var ResponseStatus = "";
class LicenseNotifications extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        value: "en",
        errors: {},
      ShowCreate: true,
      showNotifications: false
    }
    this.myChangeHandler = this.myChangeHandler.bind(this);
    this.mySubmitHandler = this.mySubmitHandler.bind(this);

  };

  componentDidMount() {
    const labelurl = Domain + '/licenseNotifications';
    axios.get(labelurl).then(
      response => {
        this.setState({ no_of_days: response.data.rows[0].no_of_days })
        this.setState({ description: response.data.rows[0].description })
      }
    )
      .catch(error => {
        console.log(error)
      })

  }

  myChangeHandler = (event) => {
    this.setState({
      [event.target.name]:event.target.value
    });
  }
  mySubmitHandler = async (event) => {
    event.preventDefault();
    if (this.ValidationForm()) {
      await axios({
        method: 'post',
        url: Domain + '/licenseNotifications',
        data: JSON.stringify({ no_of_days: this.state.no_of_days,
                description:this.state.description}),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(function (response) {
          //handle success
          ResponseStatus = response.data.success;
          console.log("res" + response.status, ":", response.data.message);
          NotificationMessage = response.data.message;

        })
        .catch(function (response) {
          //handle error
          console.log(response);
        });
      if (ResponseStatus === true) {
        swal("Changes has been submitted successfully")
        this.setState({ ShowCreate: false });
      }
    }
  
  }
  ValidationForm() {

    let state = this.state;
    let errors = {};
    let formIsValid = true;
   if(!state["no_of_days"])
   {
    formIsValid = false;
    errors["no_of_days"] = "* Please enter No of days";
   }
   if(!state["description"])
   {
    formIsValid = false;
    errors["description"] = "* Please enter description";
   }
   this.setState({
    errors: errors
  });
  return formIsValid;
  }

  BackBtnClick = () => {
    NotificationMessage = '';
    this.setState({ showNotifications: false });
    const { ShowCreate } = this.state;
    this.setState({ ShowCreate: !ShowCreate });
  }

  CancelBtnClick = () => {
    NotificationMessage = '';
    this.setState({ showNotifications: false });
    const { ShowCreate } = this.state;
    this.setState({ ShowCreate: !ShowCreate });
  }
  onLanguageHandle = (event) => {
    let newLang = event.target.value;
    this.setState({ value: newLang })
    this.props.i18n.changeLanguage(newLang)
  }
  render() {
      const { t } = this.props;
    const { ShowCreate, showNotifications } = this.state;
    if (ShowCreate) {
      return (
        <div>
          <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800" name="licenseNotofications">{t('licenseExpiryNotifications.license_notifications')}<span></span></h1>
            <button name="back" onClick={this.BackBtnClick} className="btn-sm btn-primary shadow-sm  customlogin-btn">
             {t('button.back')}</button>
          </div>
          <div class="container">
            <div class="row justify-content-center">

              <div class="col-xl-10 col-lg-12 col-md-9">
                <div class="card o-hidden border-0 shadow-lg my-5">
                  <div class="card-body p-0">
                    <div class="row">
                   <div class="col-lg-6">
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
                              <label for="no_of_days" class=" control-label customlabel-textcolor">{t('licenseExpiryNotifications.days')} <i style={{ color: "red" }}>*</i> </label>
                              <input type="number" class="form-control "
                                name="no_of_days" id="no_of_days"  aria-describedby="emailHelp" value={this.state.no_of_days}
                                placeholder={t('licenseExpiryNotifications.days')} onChange={this.myChangeHandler} />
                               <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.no_of_days}</div>
                            </div>                        
                            <div class="form-group">
                              <label for="description" class=" control-label customlabel-textcolor">{t('licenseExpiryNotifications.description')}  <i style={{ color: "red" }}>*</i></label>
                              <textarea class="form-control " value={this.state.description}
                                name="description" id="description"  aria-describedby="emailHelp"
                                placeholder={t('licenseExpiryNotifications.description')} onChange={this.myChangeHandler} />
                            <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.description}</div>
                            </div> 
                            <div class="form-group">
                              <button name="btnCancel" onClick={this.CancelBtnClick} class="btn btn-link text-left" >{t('button.btnCancel')}</button>
                              <button name='submit' class=" btn-primary customlogin-btn" >{t('button.submit')}</button>
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
        <Redirect to={{
          pathname: '/Admin'
        }}></Redirect>
      );
    }
  }
};

export default withTranslation()(LicenseNotifications);