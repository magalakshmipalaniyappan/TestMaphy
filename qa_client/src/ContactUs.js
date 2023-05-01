import React from 'react';
import axios from 'axios';
import Dashboard from './Dashboard/Dashboard'

import { withTranslation } from 'react-i18next'

const Domain = process.env.REACT_APP_URL;
var NotificationMessage = "";
var ResponseStatus = "";

class ContactUs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: "en",
     
      ShowCreate: true,
      showNotifications: false,
     
    }
    this.myChangeHandler = this.myChangeHandler.bind(this);
    this.mySubmitHandler = this.mySubmitHandler.bind(this);

  }
   
   myChangeHandler = (event) => {

    this.setState({ [event.target.name]:event.target.value});
  }

  mySubmitHandler = async (event) => {
     await axios({
        method: 'post',
        url: Domain + '/contactus',
        data: JSON.stringify({
          email: this.state.email,
          customer_description: this.state.description,
              }),
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
    this.setState({ showNotifications: true });
    if (ResponseStatus === true) {
      this.setState({ ShowCreate: false });
    }
 
}

BackBtnClick = () => {
  NotificationMessage = '';
  this.setState({ showNotifications: false });
  const { ShowCreate } = this.state;
  this.setState({ ShowCreate: !ShowCreate });
}

CancelBtnClick = () => {
  const { ShowCreate } = this.state;
  this.setState({ ShowCreate: !ShowCreate });
}
  
  onLanguageHandle = (event) => {
    let newLang = event.target.value;
    this.setState({ value: newLang })
    this.props.i18n.changeLanguage(newLang)
  }
  
  render() {
    const { ShowCreate, showNotifications } = this.state;
    const { t } = this.props;
    if (ShowCreate) {
     
      return (
        <div>
     <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Contact Us </h1>

            <button onClick={this.BackBtnClick} className="btn btn-sm btn-primary shadow-sm">
              Back</button>
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

                                <label for="email" class=" control-label customlabel-textcolor">{t('contactus.email')}</label>
                                <input type="text" class="form-control "
                                  name="email"  id="email"
                                  placeholder={t('contactus.email')} onChange={this.myChangeHandler}  required/>
                                 </div>
                            </div>
                                        <div class="form-group row">
                              <div class="col-sm-8 mb-3 mb-sm-0">
                                <label for="description" class=" control-label customlabel-textcolor">{t('contactus.description')}</label>
                                <textarea type="text" class="form-control " rows="5"
                                  name="description" id="description"
                                  placeholder={t('contactus.description')} onChange={this.myChangeHandler} required />
                              </div>
                            </div>
                                        <div class="form-group">
                              <button name="btnCancel" onClick={this.CancelBtnClick} class="btn btn-link text-left" >Cancel</button>

                              <input type='submit' class="btn btn-primary" />
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
          <Dashboard showNotifications={this.state.showNotifications} NotificationMessage={NotificationMessage} />
        );
      }
  }
};
export default withTranslation()(ContactUs);
