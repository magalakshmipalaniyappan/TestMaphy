import React, { } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import { withTranslation } from 'react-i18next'
const Domain = process.env.REACT_APP_URL;
var NotificationMessage = "";
var ResponseStatus = "";
class Labels extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      LabelData: [],
      ShowMain: false,
      errors: '',
      showUpdate: true,
      showNotifications: false


    }

  }
  componentDidMount() {
    const labelurl = Domain + '/labels';
    axios.get(labelurl).then(
      response => {
        this.setState({ labels_fontsize: response.data.rows[0].labels_fontsize })
        this.setState({ labels_height: response.data.rows[0].labels_height })
        this.setState({ labels_width: response.data.rows[0].labels_width })
        this.setState({ labels_id: response.data.rows[0].id })

      }
    )
      .catch(error => {
        console.log(error)
      })

  }



  myChangeHandler = (event) => {

    this.setState({ [event.target.name]: event.target.value });
  }
  CheckboxChanged = (event) => {
    let nam = event.target.name;
    let val;
    if (event.target.checked)
      val = 1;
    else
      val = 0;

    this.setState({ [nam]: val });
  }
  validateForm() {
    let state = this.state,errors = {},formIsValid = true;

    if (!state["labels_fontsize"]) {
      formIsValid = false;
      errors["labels_fontsize"] = "Please enter Font Size.";
    }
    else{
      if (typeof state["labels_fontsize"] !== "undefined") {
        var pattern = new RegExp(/^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/);
        if (!pattern.test(state["labels_fontsize"])) {
          formIsValid = false;
          errors["labels_fontsize"] = "*Only allow integer, greater than zero..";
        }
      }
    }
  
    if (!state["labels_width"]) {
      formIsValid = false;
      errors["labels_width"] = "Please enter Font Width.";
    }
    else{
      if (typeof state["labels_width"] !== "undefined") {
        var lpattern = new RegExp(/^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/);
        if (!lpattern.test(state["labels_width"])) {
          formIsValid = false;
          errors["labels_width"] = "*Only allow integer, greater than zero..";
        }
      }
    }
 
    if (!state["labels_height"]) {
      formIsValid = false;
      errors["labels_height"] = "Please enter Font height.";
    }
    else{
      if (typeof state["labels_fontsize"] !== "undefined") {
        var spattern = new RegExp(/^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/);
        if (!spattern.test(state["labels_height"])) {
          formIsValid = false;
          errors["labels_height"] = "*Only allow integer, greater than zero..";
        }
      }
    }
   
    this.setState({ errors: errors  });
    return formIsValid;
  }
  mySubmitHandler = async (event) => {
    event.preventDefault();
    if (this.validateForm()) {
      await axios({
        method: 'put',
        url: Domain + '/labels/' + this.state.labels_id,
        data: JSON.stringify({
          labels_fontsize: this.state.labels_fontsize,
          labels_width: this.state.labels_width,
          labels_height: this.state.labels_height,
          created_at: this.state.created_at,
          updated_at: this.state.updated_at,
        }),
        headers: {
          'Content-Type': 'application/json'
        }

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

  }

  BackBtnClick = () => {
    this.setState({ showUpdate: false });
    this.setState({ showNotifications: false });
  }

  render() {
    const { t } = this.props;
    const { showNotifications, showUpdate } = this.state;
    if (showUpdate) {
      return (
        <div>

          <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800 custommain-title" name="createcompany" >Update Label<span></span></h1>
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
                              <label for="labels_fontsize" class=" control-label customlabel-textcolor"> {t('labels.labels_fontsize')}  <i style={{ color: "red" }}>*</i></label>

                              <div class="input-group-append">
                                <input type="text" class="form-control "
                                  name="labels_fontsize" id="labels_fontsize" value={this.state.labels_fontsize}
                                  onChange={this.myChangeHandler}  />
                                {/* <span class=" customlabel-pt">Pt</span> */}
                                <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.labels_fontsize}
                                </div>
                              </div>
                            </div>

                            <div class="form-group">
                              <label for="labels_width" class=" control-label customlabel-textcolor"> {t('labels.labels_width')}  <i style={{ color: "red" }}>*</i></label>
                              <div class="row">
                                <div class="col-sm-12 mb-3 mb-sm-0">
                                  <input type="text" class="form-control "
                                    name="labels_width" id="labels_width" value={this.state.labels_width}
                                    onChange={this.myChangeHandler}  />
                                  <span class="customlabel-h"  >W</span>
                                  <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.labels_width}
                                </div>
                                </div>
                                <div class="col-sm-12 mb-3 mb-sm-0">
                                  <input type="text" class="form-control "
                                    name="labels_height" id="labels_height" value={this.state.labels_height}
                                    onChange={this.myChangeHandler}  />
                                  <span class="customlabel-h">H</span>
                                  <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.labels_height}
                                </div>
                                </div>
                              </div>
                            </div>

                            <div class="form-group">
                              <button name="btnCancel" onClick={this.BackBtnClick} class="btn btn-link text-left" >{t('button.btnCancel')}</button>

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
          </div >
        </div >
      )
    }
    else {

      return (
        <Redirect to={{ pathname: '/Admin' }}></Redirect>)
    }
  }
};
export default withTranslation()(Labels);
