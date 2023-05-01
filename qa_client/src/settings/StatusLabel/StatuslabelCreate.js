import React from 'react';
import axios from 'axios';

import StatuslabelMain from './StatuslabelMain';
import { withTranslation } from 'react-i18next'
const Domain = process.env.REACT_APP_URL;
var NotificationMessage = "";
var ResponseStatus = "";
class StatuslabelCreate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: "en",
      errors:{},
      show_in_nav: "false",
      default_label: "false",
      ShowCreate: true,
      showNotifications: false
    }
    this.myChangeHandler = this.myChangeHandler.bind(this);
    this.mySubmitHandler = this.mySubmitHandler.bind(this);

  };

   myChangeHandler = (event) => {
     this.setState({ [event.target.name]:event.target.value});
  }
 
  CheckboxChanged = (event) => {
    let nam = event.target.name;
    let val;
    if (event.target.checked)
      val = "true";
    else
      val = "false";
    this.setState({ [nam]: val });
  }
  mySubmitHandler = async (event) => {
    event.preventDefault(); 
    if (this.validateForm()) {  
      await axios({
        method: 'post',
        url: Domain + '/statuslabels',
        data: JSON.stringify({
           name: this.state.StatusLabelName, 
          type: this.state.type,
           color: this.state.color, 
           show_in_nav: this.state.show_in_nav , 
           default_label: this.state.default_label, 
           notes: this.state.notes }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(function (response) {
        ResponseStatus = response.data.success;
        NotificationMessage = response.data.message;

      })
      .catch(function (response) {
        console.log(response);
      });
    this.setState({ showNotifications: true });
    if (ResponseStatus === true) {
      this.setState({ ShowCreate: false });
    }
  }
}

validateForm() {
  let state = this.state,errors = {},formIsValid = true;
  if (!state["StatusLabelName"]) {
    formIsValid = false;
    errors["StatusLabelName"] = "Please enter StatusLabel name";
  }
  if (!state["type"]) {
    formIsValid = false;
    errors["type"] = "Please enter StatusLabel type";
  }
  if (!state["notes"]) {
    formIsValid = false;
    errors["notes"] = "Please enter notes";
  }

  this.setState({ errors: errors});
  return formIsValid;
}

BackBtnClick = () => {
  NotificationMessage = '';
  this.setState({ showNotifications: false });
  const { ShowCreate } = this.state;
  this.setState({ ShowCreate: !ShowCreate });
}

  render() {
    const { showNotifications, ShowCreate } = this.state;
    const { t } = this.props;
    if (ShowCreate) {
      return (
        <div>
   <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800 custommain-title">{t('statuslabel.create')} </h1>
            <button onClick={this.BackBtnClick} className=" btn btn-sm btn-primary shadow-sm custommain-title">
            {t('button.back')}</button>
          </div>
          <div class="container">
            <div class="row justify-content-center">

              <div class="col-xl-10 col-lg-12 col-md-9">

                <div class="card o-hidden border-0 shadow-lg my-5">
                  <div class="card-body p-0">
                    <div class="row">
                    <div class="col-xs-12 col-lg-10 col-md-9">
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

                              <div class="col-sm-6 mb-3 mb-sm-0">
                                <label for="StatusLabelName" class=" control-label customlabel-textcolor">{t('statuslabel.name')} <i style={{ color: "red" }}>*</i></label>
                                <input type="text" class="form-control"
                                  name="StatusLabelName" id="StatusLabelName"  
                                  placeholder={t('statuslabel.name')} onChange={this.myChangeHandler} />
                                <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.StatusLabelName}</div>
                              </div>
                               <div class="col-sm-6 ">
                                <label for="StatusLabelType" class=" control-label customlabel-textcolor">{t('statuslabel.type')} <i style={{ color: "red" }}>*</i></label>
                                <select ref="type" class="form-control" onChange={this.myChangeHandler} id="type"  name="type" >
                                  <option value="">{t('statuslabel.type')}</option>
                                  {/* <option value="deployable">{t('statuslabel.deployable')}</option>
                                  <option value="unDeployable">{t('statuslabel.undeployed')}</option>
                                  <option value="deployed">{t('statuslabel.deployed')}</option> */}
                                  <option value="deployable">Deployable</option>
                                  <option value="undeployable">UnDeployable</option>
                                  <option value="deployed">Deployed</option> 
                                </select>
                                <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.type}</div>
                              </div>
                            </div>

                            <div class="form-group row">
                              <div class="col-sm-12 mb-3 mb-sm-0">
                                <label for="notes" class=" control-label customlabel-textcolor">{t('statuslabel.notes')} <i style={{ color: "red" }}>*</i></label>
                                <textarea class=" form-control " aria-label="notes" name="notes" id="notes" onChange={this.myChangeHandler}
                                  placeholder={t('statuslabel.notes')} />
                              </div>
                              <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.notes}</div>
                            </div>
                            <div class="col-md-offset-6">
                              <input type="checkbox" id="show_in_nav" name="show_in_nav" onChange={this.CheckboxChanged} />
                              <label class="custom-checkbox" for="chkLogin"> {t('statuslabel.shownav')} </label>
                            </div>
                            <div class="col-md-offset-3">
                              <input type="checkbox" id="default_label" name="default_label" onChange={this.CheckboxChanged} />
                              <label class="custom-checkbox" for="chkLogin">{t('statuslabel.defaultlabel')} </label>
                              <p class="col-md-offset-3 ">
                              {t('statuslabel.paragraph')}
                             </p>
                                         </div>
                            <div class="form-group">
                            <button name="btnCancel" onClick={this.BackBtnClick} class="btn btn-link text-left" >{t('button.cancel')}</button>
                            <button name='submit' class="btn-primary" >{t('button.submit')}</button>

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
        <StatuslabelMain showNotifications={this.state.showNotifications} NotificationMessage={NotificationMessage} />
      );
    }
  }
};
export default withTranslation()(StatuslabelCreate);
