import React, { } from 'react';
import axios from 'axios';
import { withTranslation } from 'react-i18next'
import { Button, Modal } from 'react-bootstrap'
import AssetModelsMain from './AssetModelsMain'
const Domain = process.env.REACT_APP_URL;
var ResponseStatusModal = "";
var ResponseStatusCategory = "";
var NotificationMessage = "";
var NotificationMessageModal = "";
var NotificationMessageCategory = "";
var ResponseStatus="";
class AssetModelsCreate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: "en",
      errors: {},
      ShowCreate: true,
      showNotifications: false,
      showNotificationsModal: false,
      showNotificationsCategory: false,

      requestable: 0

    }
    this.myChangeHandler = this.myChangeHandler.bind(this);
    this.mySubmitHandler = this.mySubmitHandler.bind(this);
  };


  myChangeHandler = (event) => {

    this.setState({ [event.target.name]: event.target.value });
  }

  componentDidMount() {

    this.loadDropdownValues();

  }

  async loadDropdownValues() {
    const manufacturerurl = Domain + '/manufacturers/selectList?page=1';
    const categoryurl = Domain + '/categories/selectList/Asset?page=1';
    const depreciationurl = Domain + '/depreciations/selectList?page=1';


    const [manufacturer_id, category_id, depreciation_id] = await Promise.all([
      axios.get(manufacturerurl),
      axios.get(categoryurl),
      axios.get(depreciationurl),

    ]);

    this.setState({
      manufacturerData: manufacturer_id.data.items,
      categoryData: category_id.data,
      depreciationData: depreciation_id.data.items
    });

  }
  mySubmitHandler = async (event) => {
    event.preventDefault();
    if (this.validateForm()) {
      await axios({
        method: 'post',
        url: Domain + '/models',
        data: JSON.stringify({
          name: this.state.AssetModelsName,
          manufacturer_id: this.state.manufacturer_id,
          category_id: this.state.category_id,
          depreciation_id: this.state.depreciation_id,
          model_number: this.state.model_number,
          eol: this.state.eol,
          notes: this.state.notes,
          requestable: this.state.requestable
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(function (response) {
          ResponseStatus=response.data.success;
          NotificationMessage = response.data.message;
        })
        .catch(function (response) {
          console.log(response);
        });
      this.setState({ showNotifications: true });
      if (ResponseStatus) {
          this.setState({ ShowCreate: false });
       }

    }
  }
  validateForm() {
    let state = this.state,errors = {},formIsValid = true;
    if (!state["AssetModelsName"]) {
      formIsValid = false;
      errors["AssetModelsName"] = "Please enter AssetModels Name";
    }
    if (!state["manufacturer_id"]) {
      formIsValid = false;
      errors["manufacturer_id"] = "Please select Manufacturer";
    }
    if (!state["category_id"]) {
      formIsValid = false;
      errors["category_id"] = "Please select category";
    }
    if (!state["depreciation_id"]) {
      formIsValid = false;
      errors["depreciation_id"] = "Please select depreciation";
    }
    if (!state["model_number"]) {
      formIsValid = false;
      errors["model_number"] = "Please enter model number";
    }
    if (!state["notes"]) {
      formIsValid = false;
      errors["notes"] = "Please enter notes";
    }
    if (!state["eol"]) {
      formIsValid = false;
      errors["eol"] = "Please enter EOL";
    }
    else {
      if (typeof state["eol"] !== "undefined") {
        if (!state["eol"].match(/^\d{0,3}$/)) {
          formIsValid = false;
          errors["eol"] = "*Only allow integer and greater than zero..";
        }
      }
    }

    this.setState({ errors: errors });
    return formIsValid;
  }
  BackBtnClick = () => {
    NotificationMessage = '';
    this.setState({ showNotifications: false });
    this.setState({ ShowCreate: false });
  }
  CheckboxChanged = (event) => {
    let nam = event.target.name;
    let val;
    if (event.target.checked)
      val = "1";
    else
      val = "0";
    this.setState({ [nam]: val });
  }

  validateFormModalManufacture() {
    let state = this.state,errors = {},formIsValid = true;
    if (!state["manufacturer"]) {
      formIsValid = false;
      errors["manufacturer"] = "*Please enter manufacturer.";
    }
    this.setState({errors: errors});
    return formIsValid;

  }
  validateFormCategory() {
    let state = this.state,errors = {},formIsValid = true;
    if (!state["category"]) {
      formIsValid = false;
      errors["category"] = "*Please enter category .";
    }
    if (!state["CategoryType"]) {
      formIsValid = false;
      errors["CategoryType"] = "*Please select category type .";
    }
    this.setState({ errors: errors });
    return formIsValid;
  }

  addManufacture = async (event) => {
    if (this.validateFormModalManufacture()) {
      await axios({
        method: 'post',
        url: Domain + '/manufacturers',
        data: JSON.stringify({ name: this.state.manufacturer }),
        headers: {

          'Content-Type': 'application/json'
        }

      })
        .then(function (response) {
          //handle success
          ResponseStatusModal = response.data.success;
          console.log("res" + response.status, ":", response.data.message);
          NotificationMessageModal = response.data.message;
        })
        .catch(function (response) {
          //handle error
          console.log(response);
        });

      this.loadDropdownValues();
      this.setState({ showNotificationsModal: true });
      if (ResponseStatusModal === true) {
        this.setState({ showManufacture: !this.state.showManufacture });
        this.setState({ manufacturer: "" });

      }

    }
  }

  handleModalManufacture() {
    this.setState({ showManufacture: !this.state.showManufacture })
  }
  CancelModalManufacturer = () => {
    this.setState({ showManufacture: !this.state.showManufacture })
    this.setState({ errors: "" });
    this.setState({ showNotificationsModal: false });
    this.setState({ manufacturer: "" });

  };
  addCategory = async (event) => {

    if (this.validateFormCategory()) {
      await axios({
        method: 'post',
        url: Domain + '/categories',
        data: JSON.stringify({
          name: this.state.category,
          category_type: this.state.CategoryType
        }),
        headers: {

          'Content-Type': 'application/json'
        }

      })
        .then(function (response) {
          ResponseStatusCategory = response.data.success;
          NotificationMessageCategory = response.data.message;
        })
        .catch(function (response) {
          console.log(response);
        });

      this.loadDropdownValues();
      this.setState({ showNotificationsCategory: true });
      if (ResponseStatusCategory === true) {
        this.setState({ showCategory: !this.state.showCategory });
      }

    }
  }
  handleModalCategory() {
    this.setState({ showCategory: !this.state.showCategory })
  }
  CancelModalCategory = () => {
    this.setState({ showCategory: !this.state.showCategory })
    this.setState({ errors: "" });
    this.setState({ showNotificationsCategory: false });
    this.setState({ category: "" });
    this.setState({ CategoryType: "" });

  };

  render() {
    const { showNotifications, ShowCreate, showNotificationsModal, showNotificationsCategory } = this.state;
    const { t } = this.props;
    if (ShowCreate) {
      return (
        <div>

          <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800 custommain-title">{t('assetmodel.create')}</h1>

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
                          <form class="user" onSubmit={this.mySubmitHandler} >
                            <div class="form-group row">
                              <div class="col-sm-6 mb-3 mb-sm-0">

                                <label for="AssetModelsName" class=" control-label customlabel-textcolor">{t('assetmodel.name')} <i style={{ color: "red" }}>*</i></label>
                                <input type="text" class="form-control "
                                  name="AssetModelsName" id="AssetModelsName" placeholder={t('assetmodel.name')}
                                  onChange={this.myChangeHandler} />
                                <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.AssetModelsName}</div>
                              </div>

                            </div>
                            <div class="form-group row">
                              <div class="col-sm-6 mb-3 mb-sm-0">
                                <label for="manufacturer_id" class="control-label customlabel-textcolor">{t('assetmodel.manufacturer_id')} <i style={{ color: "red" }}>*</i></label>
                                <select ref="manufacturer_id" class="form-control" onChange={this.myChangeHandler} id="manufacturer_id" name="manufacturer_id" >
                                  <option value="">{t('select.manufacturer')}</option>
                                  {(() => {
                                    if (this.state.manufacturerData) {
                                      return (
                                        this.state.manufacturerData.map(obj => {
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
                                <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.manufacturer_id}</div>
                              </div>

                              <div class="col-sm-4">
                                <Button onClick={() => { this.handleModalManufacture() }}>{t('button.new')}</Button>
                                <Modal show={this.state.showManufacture} onHide={() => this.handleModalManufacture()}>
                                  <Modal.Header closeButton onClick={() => { this.CancelModalManufacturer() }}>{t('newbutton.manufacturer')}</Modal.Header>
                                  <Modal.Body>
                                    {(() => {
                                      if (showNotificationsModal) {
                                        return (
                                          <div class="row">
                                            <div class="col-md-12">

                                              {(NotificationMessageModal === "Created successfully") ? null

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

                                      <input type="text" class="form-control "
                                        name="manufacturer" id="manufacturer"
                                        placeholder={t('newbutton.manufacturername')} onChange={this.myChangeHandler} />
                                      <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.manufacturer}</div>

                                    </div>

                                  </Modal.Body>
                                  <Modal.Footer>
                                    <div class="form-group ">
                                      <Button onClick={() => { this.addManufacture() }}>
                                        {t('button.save')}
                                      </Button >
                                      <Button onClick={() => { this.CancelModalManufacturer() }}>
                                        {t('button.cancel')}
                                      </Button >
                                    </div>
                                  </Modal.Footer>
                                </Modal>
                              </div>
                            </div>

                            <div class="form-group row">
                              <div class="col-sm-6 mb-3 mb-sm-0">
                                <label for="category_id" class=" control-label customlabel-textcolor">{t('assetmodel.category_id')} <i style={{ color: "red" }}>*</i></label>
                                <select ref="category_id" class="form-control" onChange={this.myChangeHandler} id="category_id" name="category_id" >
                                  <option value="">{t('select.category')} </option>
                                  {(() => {
                                    if (this.state.categoryData) {
                                      return (
                                        this.state.categoryData.map(obj => {
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
                                <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.category_id}</div>
                              </div>
                              <div class="col-sm-4">
                                <Button onClick={() => { this.handleModalCategory() }}>{t('button.new')}</Button>
                                <Modal show={this.state.showCategory} onHide={() => this.handleModalCategory()}>
                                  <Modal.Header closeButton onClick={() => { this.CancelModalCategory() }}>{t('newbutton.category')}</Modal.Header>
                                  <Modal.Body>
                                    {(() => {
                                      if (showNotificationsCategory) {
                                        return (
                                          <div class="row">
                                            <div class="col-md-12">

                                              {(NotificationMessageCategory === "Created successfully") ? null

                                                : <div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                  <strong> {NotificationMessageCategory}</strong>

                                                </div>

                                              }

                                            </div>
                                          </div>
                                        )
                                      }

                                    })()}
                                    <div class="form-group row">
                                      <label for="category" class="customlabel-textcolor">{t('newbutton.categoryname')} <i style={{ color: "red" }}>*</i></label>

                                      <input type="text" class="form-control form-control-user"
                                        name="category" id="category"
                                        placeholder={t('newbutton.categoryname')} onChange={this.myChangeHandler} />
                                      <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.category}</div>
                                    </div>
                                    <div class="form-group row">
                                      <label for="CategoryType" class="customlabel-textcolor">{t('newbutton.categorytype')} <i style={{ color: "red" }}>*</i></label>
                                      <select ref="CategoryType" class="form-control" onChange={this.myChangeHandler} id="CategoryType" name="CategoryType">
                                        <option value="">{t('select.categorytype')}</option>
                                        <option value="Accessory" disabled>Accessory</option>
                                        <option value="License" disabled>License</option>
                                        <option value="Consumable" disabled>Consumable</option>
                                        <option value="Component" disabled>Component</option>
                                        <option value="Asset" >Asset</option>
                                      </select>
                                      <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.CategoryType}</div>

                                    </div>
                                  </Modal.Body>
                                  <Modal.Footer>
                                    <div class="form-group ">
                                      <Button onClick={() => { this.addCategory() }}>
                                        {t('button.save')}
                                      </Button >
                                      <Button onClick={() => { this.CancelModalCategory() }}>
                                        {t('button.cancel')}
                                      </Button >
                                    </div>
                                  </Modal.Footer>
                                </Modal>
                              </div>
                            </div>


                            <div class="form-group row">

                              <div class="col-sm-6 mb-3 mb-sm-0">
                                <label for="model_number" class=" control-label customlabel-textcolor">{t('assetmodel.model_number')} <i style={{ color: "red" }}>*</i></label>
                                <input type="text" class="form-control"
                                  name="model_number" id="model_number" placeholder={t('assetmodel.model_number')}
                                  onChange={this.myChangeHandler} />
                                <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.model_number}</div>
                              </div>


                              <div class="col-sm-6 ">
                                <label for="eol" class=" control-label customlabel-textcolor">{t('assetmodel.eol')} <i style={{ color: "red" }}>*</i></label>
                                <input type="text" class="form-control " name="eol" id="eol" placeholder={t('assetmodel.eol')} onChange={this.myChangeHandler} />
                                <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.eol}
                                </div>
                              </div>
                            </div>
                            <div class="form-group row">
                              <div class="col-sm-6 mb-3 mb-sm-0">
                                <label for="depreciation_id" class=" control-label customlabel-textcolor">{t('assetmodel.depreciation_id')} <i style={{ color: "red" }}>*</i></label>
                                <select ref="depreciation_id" class="form-control" onChange={this.myChangeHandler} id="depreciation_id" name="depreciation_id" >
                                  <option value="">{t('select.depreciation')}</option>
                                  {(() => {
                                    if (this.state.depreciationData) {
                                      return (
                                        this.state.depreciationData.map(obj => {
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
                                <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.depreciation_id}</div>
                              </div>
                            </div>


                            <div class="form-group row">
                              <div class="col-sm-6">
                                <label for="notes" class=" control-label customlabel-textcolor">{t('assetmodel.notes')} <i style={{ color: "red" }}>*</i></label>
                                <textarea class="form-control " id="notes" name="notes" onChange={this.myChangeHandler}
                                  placeholder={t('assetmodel.notes')} />
                                <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.notes}</div>
                              </div>
                            </div>
                            <div class="form-group row">
                              <div class="col-sm-6">
                                <input type="checkbox" id="requestable" name="requestable" onChange={this.CheckboxChanged} />
                                <label class="custom-checkbox" for="requestmodel">User Request model</label>
                              </div>
                            </div>

                            <div class="form-group">
                              <button name="btnCancel" onClick={this.BackBtnClick} class="btn btn-link text-left" >{t('button.cancel')}</button>
                              <button name='submit' class=" btn-primary" >{t('button.submit')}</button>

                              {/* <input type='submit' class=" btn-primary" /> */}
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
        <AssetModelsMain showNotifications={this.state.showNotifications} NotificationMessage={NotificationMessage} />

      );
    }
  }
};
export default withTranslation()(AssetModelsCreate);
