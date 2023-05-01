import React, {  } from 'react';
import axios from 'axios';

import { withTranslation } from 'react-i18next'
import FieldSetMain from './FieldSetMain';
const Domain = process.env.REACT_APP_URL;
var NotificationMessage = "";
var ResponseStatus = "";
class FieldSetCreate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        value: "en",
    
      message: '',

      ShowCreate: true,
      showNotifications: false
    }
    this.myChangeHandler = this.myChangeHandler.bind(this);
    this.mySubmitHandler = this.mySubmitHandler.bind(this);

  };



    myChangeHandler = (event) => {

    this.setState({ [event.target.name]:event.target.value});
  }
  mySubmitHandler = async (event) => {

    event.preventDefault();

   
      await axios({
        method: 'post',
        url: Domain + '/customFieldsets',
        data: JSON.stringify({ name: this.state.CompanyName }),
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
    this.setState({value: newLang})
    this.props.i18n.changeLanguage(newLang)
  }
 
  
  render() {
     const {t} = this.props
    
 console.log('this is', this)
    const { ShowCreate, showNotifications } = this.state;
    if (ShowCreate) {
      return (
        <div>
   <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800 custommain-title" name="createcompany" >Create FieldSet<span></span></h1>
            <button onClick={this.BackBtnClick} name="back" className="btn btn-sm btn-primary shadow-sm custommain-title">
               {t('company.back')}</button>
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
                              <label for="CompanyName" class=" control-label customlabel-textcolor"> FieldSet Name</label>

                              <input type="text" class="form-control "
                                name="CompanyName" id="CompanyName" 
                                placeholder="FieldSet Name" onChange={this.myChangeHandler} required/>
                            </div>
                                       <div class="form-group">
                              <button name="btnCancel" onClick={this.CancelBtnClick} class="btn btn-link text-left" >{t('company.btnCancel')}</button>

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
        <FieldSetMain showNotifications={this.state.showNotifications} NotificationMessage={NotificationMessage} />
      );
    }
  }
};

export default  withTranslation()(FieldSetCreate);