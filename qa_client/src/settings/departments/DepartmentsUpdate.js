import React from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap'

import DepartmentsMain from './DepartmentsMain'
import Countries from 'react-select-country';
import { withTranslation } from 'react-i18next'

const Domain = process.env.REACT_APP_URL;
var ResponseStatus = "";
var ResponseStatusModal = "";
var NotificationMessage = "";
var NotificationMessageModal = "";

class DepartmentsUpdate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: "en",
      DepartmentsDatatoUpdate: '',
      country: '',
      options: this.options,
      errors: {},
      ShowMain: false,
      showUpdate: true,
      showNotifications: false,
      showNotificationsModal: false,

      show: false

    }
    this.addLocation = this.addLocation.bind(this);

  }
  componentDidMount() {
    this.loadDropdownValues();
    this.setState({ DepartmentsName: this.props.DepartmentsDatatoUpdate.name });
    this.setState({ location_id: this.props.DepartmentsDatatoUpdate.location.id });
    this.setState({ company_id: this.props.DepartmentsDatatoUpdate.company.id });
    this.setState({ manager_id: this.props.DepartmentsDatatoUpdate.manager.id });
    this.setState({ DepartmentsId: this.props.DepartmentsDatatoUpdate.id });



  }
  async loadDropdownValues() {
    const companyurl = Domain + '/companies/selectList?page=1';
    const locationsurl = Domain + '/locations/selectList?page=1';
    const managersurl = Domain + '/users/selectList?page=1';

    const [company_id, location_id, manager_id] = await Promise.all([
      axios.get(companyurl),
      axios.get(locationsurl),
      axios.get(managersurl)
    ]);

    this.setState({
      companyData: company_id.data.items,
      locationData: location_id.data.items,
      managerData: manager_id.data.items
    });

  }


  validateFormModalLocation() {
    let state = this.state,errors = {},formIsValid = true;
    if (!state["location"]) {
      formIsValid = false;
      errors["location"] = "*Please enter  Location.";
    }
    if (!state["city"]) {
      formIsValid = false;
      errors["city"] = "*Please enter  City.";
    }
    if (!state["country"]) {
      formIsValid = false;
      errors["country"] = "*Please enter  Country.";
    }

    this.setState({
      errors: errors
    });
    return formIsValid;

  }
  addLocation = async (event) => {

    if (this.validateFormModalLocation()) {

      await axios({
        method: 'post',
        url: Domain + '/locations',
        data: JSON.stringify({
          name: this.state.location,
          city: this.state.city,
          country: this.state.country
        }),
        headers: {

          'Content-Type': 'application/json'
        }

      })
        .then(function (response) {
          //handle success
          ResponseStatusModal = response.data.success;
          NotificationMessageModal = response.data.message;
        })
        .catch(function (response) {
          //handle error
          console.log(response);
        });

      this.loadDropdownValues();
      this.setState({ showNotificationsModal: true });
      if (ResponseStatusModal === true) {
        this.setState({ showLocation: !this.state.showLocation });
        this.setState({ location: "" });
        this.setState({ city: "" });
        this.setState({ country: "" });
      }

    }
  }
  handleModalLocation() {
    this.setState({ showLocation: !this.state.showLocation })
  }
  CancelModalLocation = () => {
    this.setState({ showLocation: !this.state.showLocation })
    this.setState({ errors: "" });
    this.setState({ showNotificationsModal: false });
    this.setState({ location: "" });
    this.setState({ city: "" });
    this.setState({ country: "" });
  };

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
      url: Domain + '/departments/' + this.state.DepartmentsId,
      data: JSON.stringify({
        name: this.state.DepartmentsName,
        manager_id: this.state.manager_id,
        location_id: this.state.location_id,
        company_id: this.state.company_id
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
      this.setState({ showUpdate: false });
    }
  }
}

validateForm(){
  let state = this.state,errors = {},formIsValid = true;  
    if(!state["DepartmentsName"] )
    {
        formIsValid = false;
        errors["DepartmentsName"] = "Please enter department name";   
    }
    if(!state["manager_id"] )
    {
        formIsValid = false;
        errors["manager_id"] = "Please select manager";   
    }
    if(!state["location_id"] )
    {
        formIsValid = false;
        errors["location_id"] = "Please select location";   
    }
    if(!state["company_id"] )
    {
        formIsValid = false;
        errors["company_id"] = "Please select company";   
    }
    this.setState({ errors: errors});
    return formIsValid;
  }

  BackBtnClick = () => {
    this.setState({ showNotifications: false });
    this.setState({ showUpdate: false });
  }

  render() {
    const { t } = this.props

    console.log('this is', this)
    const { showUpdate, showNotifications, showNotificationsModal } = this.state;

    if (showUpdate) {
      return (
        <div>

          <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800 custommain-title" name="createdept">{t('departments.updatedept')}</h1>

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
                                <label for="DepartmentsName" class=" control-label customlabel-textcolor">{t('departments.name')} <i style={{ color: "red" }}>*</i></label>
                                <input type="text" class="form-control "
                                  value={this.state.DepartmentsName} name="DepartmentsName" id="DepartmentsName"
                                  placeholder={t('departments.name')} onChange={this.myChangeHandler}  />
                              </div>
                              <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.DepartmentsName}</div>
                            </div>
                            <div class="form-group row">
                              <div class="col-sm-6 mb-3 mb-sm-0">
                                <label for="companyName" class=" control-label customlabel-textcolor">{t('departments.company_id')} <i style={{ color: "red" }}>*</i></label>
                                <select ref="company_id" class="form-control" onChange={this.myChangeHandler} id="company_id" value={this.state.company_id} name="company_id" >
                                  <option value="">{t('select.company')}</option>
                                  {(() => {
                                    if (this.state.companyData) {
                                      return (
                                        this.state.companyData.map(obj => {
                                          return (
                                            <option
                                              key={obj.id}
                                              value={obj.id}
                                              onChange={this.myChangeHandler}
                                            >
                                              {obj.text}
                                            </option>
                                          );
                                        })
                                      )
                                    }
                                  })()}
                                </select>
                                <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.company_id}</div>
                              </div>
                            </div>
                            <div class="form-group row">
                              <div class="col-sm-6 mb-3 mb-sm-0">
                                <label for="ManagerName" class=" control-label customlabel-textcolor">{t('departments.manager_id')} <i style={{ color: "red" }}>*</i></label>
                                <select ref="manager_id" class="form-control" onChange={this.myChangeHandler} id="manager_id" value={this.state.manager_id} name="manager_id" >
                                  <option value="">{t('select.manager')}</option>
                                  {(() => {
                                    if (this.state.managerData) {
                                      return (
                                        this.state.managerData.map(obj => {
                                          return (
                                            <option
                                              key={obj.id}
                                              value={obj.id}
                                              onChange={this.myChangeHandler}
                                            >
                                              {obj.text}
                                            </option>
                                          );
                                        })
                                      )
                                    }
                                  })()}
                                </select>
                                <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.manager_id}</div>
                              </div>
                            </div>
                            <div class="form-group row">
                              <div class="col-sm-6 mb-3 mb-sm-0">
                                <label for="text" class=" control-label customlabel-textcolor"> {t('component.location_id')} <i style={{ color: "red" }}>*</i></label>

                                <select ref="location_id" class="form-control" onChange={this.myChangeHandler} id="location_id" name="location_id" value={this.state.location_id} >
                                  <option value="">{t('select.location')}</option>
                                  {(() => {
                                    if (this.state.locationData) {
                                      return (
                                        this.state.locationData.map(obj => {
                                          return (
                                            <option
                                              key={obj.id}
                                              value={obj.id}
                                              onChange={this.myChangeHandler}
                                            >
                                              {obj.text}
                                            </option>
                                          );
                                        })
                                      )
                                    }
                                  })()}
                                </select>
                                <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.location_id}</div>
                              </div>


                              <div class="col-sm-4">
                                <Button onClick={() => { this.handleModalLocation() }}>{t('button.new')}</Button>
                                <Modal show={this.state.showLocation} onHide={() => this.handleModalLocation()}>
                                  <Modal.Header closeButton onClick={() => { this.CancelModalLocation() }} name="createlocation">{t('departments.createlocation')}</Modal.Header>
                                  <Modal.Body>
                                    {(() => {
                                      if (showNotificationsModal) {
                                        return (
                                          <div class="row">
                                            <div class="col-md-12">

                                              {(NotificationMessageModal ==="Created successfully") ? null

                                                : <div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                  <strong> {NotificationMessageModal}</strong>

                                                </div>

                                              }

                                            </div>
                                          </div>
                                        )
                                      }


                                    })()}
                                    <div class="form-group row">

                                      <input type="text" class="form-control form-control-user customdept-location"
                                        name="location" id="modal-location" aria-describedby="emailHelp"
                                        placeholder={t('departments.location')} onChange={this.myChangeHandler} />
                                      <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.location}</div>
                                    </div>

                                    <div class="form-group row">

                                      <input type="text" class="form-control form-control-user customdept-location"
                                        name="city" id="city" aria-describedby="emailHelp"
                                        placeholder={t('departments.city')} onChange={this.myChangeHandler} />
                                      <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.city}</div>

                                    </div>
                                    <div class="form-group row">
                                      <Countries class="form-control" ref="country" name="country" empty={t('select.country')} onChange={this.myChangeHandler} />
                                      <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.country}</div>

                                    </div>

                                  </Modal.Body>
                                  <Modal.Footer>
                                    <div class="form-group ">
                                      <Button name="save" onClick={() => { this.addLocation() }}>
                                        {t('button.save')}
                                      </Button >
                                      <Button name="cancel" onClick={() => { this.CancelModalLocation() }}>
                                        {t('button.cancel')}
                                      </Button >
                                    </div>
                                  </Modal.Footer>
                                </Modal>
                              </div>

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

        <DepartmentsMain showNotifications={this.state.showNotifications} NotificationMessage={NotificationMessage} />
      )
    }
  }


};
export default withTranslation()(DepartmentsUpdate);



