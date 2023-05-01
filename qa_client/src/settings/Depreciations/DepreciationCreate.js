import React, {  } from 'react';
import axios from 'axios';
import { withTranslation } from 'react-i18next'
import DepreciationMain from './DepreciationMain'
const Domain = process.env.REACT_APP_URL;
var NotificationMessage = "";
var ResponseStatus = "";
class DepreciationCreate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: "en",
     errors:{},
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
    if (this.validateForm()) {
     await axios({
        method: 'post',
        url: Domain + '/depreciations',
        data: JSON.stringify({
          name: this.state.Depreciationname,
          months: this.state.DepreciationMonths
        }),
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

    let state = this.state;
    let errors = {};
    let formIsValid = true; 

    if (!state["Depreciationname"]) {
      formIsValid = false;
      errors["Depreciationname"] = "Please enter Depreciation Name";
    }
    if (!state["DepreciationMonths"]) {
      formIsValid = false;
      errors["DepreciationMonths"] = "Please enter Depreciation Months";
    }
    if (typeof state["DepreciationMonths"] !== "undefined") {
      var pattern = new RegExp(/^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/);
      if (!pattern.test(state["DepreciationMonths"])) {
        formIsValid = false;
        errors["DepreciationMonths"] = "*Only allow integer and greater than zero..";
      }
    }
      
    this.setState({  errors: errors});
    return formIsValid;
  }
BackBtnClick = () => {
  NotificationMessage = '';
  this.setState({ showNotifications: false });
  this.setState({ ShowCreate:false });
}
  render() {
    const {showNotifications ,ShowCreate} = this.state;
    const { t } = this.props;
    if (ShowCreate) {
      return (
        <div>
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800 custommain-title" name="createdepreciation"> {t('depreciation.createdepreciation')}<span></span></h1>
            <button name="back" onClick={this.BackBtnClick} className=" btn btn-sm btn-primary shadow-sm custommain-title">
             {t('button.back')} </button>
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

                              <div class="col-sm-6 mb-3 mb-sm-0">
                                <label for="Depreciationname" class=" control-label customlabel-textcolor">{t('depreciation.name')} <i style={{ color: "red" }}>*</i></label>

                                <input type="text" class="form-control"
                                  name="Depreciationname" id="Depreciationname"  
                                  placeholder={t('depreciation.name')} onChange={this.myChangeHandler}  />
                                                 </div>
                              <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.Depreciationname}</div>

                                 </div>
                            <div class="form-group row">

                              <div class="col-sm-6 mb-3 mb-sm-0">
                                <label for="Depreciationname" class=" control-label customlabel-textcolor">{t('depreciation.months')} <i style={{ color: "red" }}>*</i></label>

                                <input type="number" class="form-control " 
                                  name="DepreciationMonths" id="DepreciationMonths"
                                  placeholder={t('depreciation.months')} onChange={this.myChangeHandler} />
                                <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.DepreciationMonths}
                           </div>                        </div>


                                         </div>
                            <div class="form-group">
                              <button name="btnCancel" onClick={this.BackBtnClick} class="btn btn-link text-left" >{t('button.btnCancel')}</button>

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
        <DepreciationMain showNotifications={this.state.showNotifications} NotificationMessage={NotificationMessage} />
      );
    }
  }
};
export default withTranslation()(DepreciationCreate);
