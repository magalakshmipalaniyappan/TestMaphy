
import React from 'react';
import axios from 'axios';
import { withTranslation } from 'react-i18next'
import AccessoriesMain from './AccessoriesMain'
var NotificationMessage = "";
var ResponseStatus="";
const Domain = process.env.REACT_APP_URL;
class AccessoriesCheckout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: "en",
      errors: {},
      ShowCheckout: true,
      showNotifications: false
    }
    this.myChangeHandler = this.myChangeHandler.bind(this);
    this.mySubmitHandler = this.mySubmitHandler.bind(this);

  };

  async componentDidMount() {
    this.setState({ AccessoriesName: this.props.AccessoriesDatatoCheckout.name });
    this.setState({ AccessoriesCategory: this.props.AccessoriesDatatoCheckout.category.name })

    const userurl = Domain + '/users/selectList?page=1';
    const [user] = await Promise.all([
      axios.get(userurl),
    ]);
    this.setState({  userData: user.data.items });

  }
  myChangeHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }
  validateForm() {
    let state = this.state,errors = {},formIsValid = true;
    if (!state["user"]) {
      formIsValid = false;
      errors["user"] = "Please Select User Name";
    }
    if (!state["notes"]) {
      formIsValid = false;
      errors["notes"] = "Please Enter Notes";
    }
     
    this.setState({
      errors: errors
    });
    return formIsValid;
  }
  mySubmitHandler = async (event) => {
    event.preventDefault();
    if (this.validateForm()) {
    await axios({
      method: 'post',
      url: Domain + '/accessories/' + this.props.AccessoriesDatatoCheckout.id + '/checkout',
      data: JSON.stringify({
        assigned_to: this.state.user,
        AccessoriesCategory: this.props.AccessoriesDatatoCheckout.category.name,
        note: this.state.notes
      }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(function (response) {
        //handle success
        NotificationMessage = response.data.message;
        ResponseStatus=response.data.success;
      })
      .catch(function (response) {
        console.log(response);
      });
      this.setState({ showNotifications: true });
      if(ResponseStatus)
      {
        this.setState({ ShowCheckout: false });
      }
    }
  }

  BackBtnClick = () => {
    NotificationMessage = '';
    this.setState({ showNotifications: false });
    this.setState({ ShowCheckout: false});
  }

  render() {
    const { t } = this.props;
    const { showNotifications, ShowCheckout } = this.state;
    if (ShowCheckout) {
      return (
        <div>
          <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800 custommain-title" name="checkoutaccessory">{t('accessory.checkoutaccessory')}</h1>
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
                              <div class="col-sm-8 mb-3 mb-sm-0">
                                <label for="AccessoriesName" class=" control-label customlabel-textcolor">{t('accessory.name')}  <i style={{ color: "red" }}>*</i></label>

                                <input type="text" class="form-control "
                                  name="AccessoriesName" id="AccessoriesName" value={this.state.AccessoriesName}
                                  placeholder={t('accessory.name')} onChange={this.myChangeHandler} disabled />
                              </div>
                            </div>
                            <div class="form-group row">
                              <div class="col-sm-8 mb-3 mb-sm-0">
                                <label for="AccessoriesCategory" class=" control-label customlabel-textcolor">{t('accessory.accessoriescategory')}  <i style={{ color: "red" }}>*</i> </label>

                                <input type="text" class="form-control "
                                  name="AccessoriesCategory" id="AccessoriesCategory" value={this.state.AccessoriesCategory}
                                  placeholder={t('accessory.accessoriescategory')} onChange={this.myChangeHandler} disabled />
                              </div>
                            </div>
                            <div class="form-group row">
                              <div class="col-sm-8 mb-3 mb-sm-0">
                                <label for="user" class=" control-label customlabel-textcolor">{t('accessory.user')}  <i style={{ color: "red" }}>*</i> </label>

                                <select ref="user" class="form-control" onChange={this.myChangeHandler} id="user" name="user" >
                                  <option value="">{t('accessory.user')}</option>
                                  {(() => {
                                    if (this.state.userData) {
                                      return (
                                        this.state.userData.map(obj => {
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
                              </div>
                              <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.user}</div>

                            </div>

                            <div class="form-group row">
                              <div class="col-sm-8 mb-3 mb-sm-0">
                                <label for="Notes" class=" control-label customlabel-textcolor">{t('accessory.notes')}  <i style={{ color: "red" }}>*</i></label>
                                <textarea class=" form-control " id="notes"
                                  placeholder={t('accessory.notes')} name="notes" onChange={this.myChangeHandler} />
                                <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.notes}</div>
                              </div>
                            </div>
                            <div class="form-group ">
                              <button name="btnCancel" onClick={this.BackBtnClick} class="btn btn-link text-left" >{t('button.btnCancel')}</button>
                              <button name='submit' class=" btn-primary" onClick={this.mySubmitHandler}>{t('button.submit')}</button>
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
        <AccessoriesMain showNotifications={this.state.showNotifications} NotificationMessage="Checkout Successfully" />
      );
    }
  }
};

export default withTranslation()(AccessoriesCheckout);