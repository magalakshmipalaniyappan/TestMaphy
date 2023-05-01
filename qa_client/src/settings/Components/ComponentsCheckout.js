import React from 'react';
import axios from 'axios';
import ComponentsMain from './ComponentsMain'
import { withTranslation} from 'react-i18next'

const Domain = process.env.REACT_APP_URL;
var NotificationMessage = "", ResponseStatus="";

class ComponentsCheckout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: "en",
      errors:{},
      ShowCheckout: true,
      NotificationMessage:"",
      showNotifications: false
    }
    this.myChangeHandler = this.myChangeHandler.bind(this);
    this.mySubmitHandler = this.mySubmitHandler.bind(this);
  };
  async componentDidMount() {
    this.setState({ ComponentsName: this.props.ComponentDatatoCheckout.name })
    const asseturl = Domain + '/hardware/selectList?page=1';
    const [asset] = await Promise.all([
      axios.get(asseturl),
    ]);
    this.setState({ assetData: asset.data.items });
  }
  myChangeHandler = (event) => {

    this.setState({ [event.target.name]: event.target.value });
  }

  mySubmitHandler = async (event) => {
    event.preventDefault();
    if (this.validateForm()) {
    await axios({
      method: 'post',
      url: Domain + '/components/' + this.props.ComponentDatatoCheckout.id + '/checkout',
      data: JSON.stringify({
        asset_id: this.state.asset,
        name: this.state.ComponentsName,
        assigned_qty: this.state.qty,
        category_id: this.state.category_id
      }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(function (response) {
        NotificationMessage = response.data.message;
        ResponseStatus=response.data.success;
      })
      .catch(function (response) {
        //handle error
      });
      this.setState({ showNotifications: true });
      if (ResponseStatus === true) {
        this.setState({ ShowCheckout: false });
      }
    }
  }

  validateForm() {
    let state = this.state,errors = {},formIsValid = true;
    if(!state["asset"])
    {
      formIsValid = false;
      errors["asset"] = "Please select asset";
    }
    if (!state["qty"]) {
      formIsValid = false;
      errors["qty"] = "Please enter quantity";
    }
    else{
      if (typeof state["qty"] !== "undefined") {
        var pattern = new RegExp(/^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/);
        if (!pattern.test(state["qty"])) {
          formIsValid = false;
          errors["qty"] = "*Only allow integer and greater than zero..";
        }
      }
    }
   

    this.setState({ errors: errors});
    return formIsValid;
  }

  BackBtnClick = () => {
    NotificationMessage = '';
    this.setState({ showNotifications: false });
    this.setState({ ShowCheckout: false });
  }

  render() {

    const { showNotifications, ShowCheckout } = this.state;
    const { t } = this.props;

    if (ShowCheckout) {
      return (
        <div>
          <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800 custommain-title">{this.props.ComponentDatatoCheckout.name}({this.props.ComponentDatatoCheckout.remaining})</h1>
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
                          <form class="user" onSubmit={this.mySubmitHandler}>
                            <div class="form-group row">
                              <div class="col-sm-8 mb-3 mb-sm-0">
                                <label for="ComponentsName" class=" control-label customlabel-textcolor">{t('component.name')} <i style={{ color: "red" }}>*</i></label>

                                <input type="text" class="form-control"
                                  name="ComponentsName" id="ComponentsName" value={this.state.ComponentsName} aria-describedby="emailHelp"
                                  placeholder={t('component.name')}  onChange={this.myChangeHandler} disabled />
                              </div>
                            </div>
                            <div class="form-group row">
                              <div class="col-sm-8 mb-3 mb-sm-0">
                                <label for="asset" class=" control-label customlabel-textcolor">{t('component.assetname')} <i style={{ color: "red" }}>*</i> </label>

                                <select ref="asset" class="form-control" onChange={this.myChangeHandler} id="asset" name="asset" >
                                  <option value="">{t('component.assetname')} </option>
                                  {(() => {
                                    if (this.state.assetData) {
                                      return (
                                        this.state.assetData.map(obj => {
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
                              <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.asset}</div>
                            </div>

                            <div class="form-group row">
                              <div class="col-sm-8 mb-3 mb-sm-0">
                                <label for="Qty" class=" control-label customlabel-textcolor">{t('component.qty')} <i style={{ color: "red" }}>*</i></label>

                                <input type="number" class="form-control "
                                  name="qty" id="qty"
                                  placeholder={t('component.qty')}  onChange={this.myChangeHandler}  />
                              </div>
                              <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.qty}</div>
                            </div>
                            <div class="form-group">
                            <button name="btnCancel" onClick={this.BackBtnClick} class="btn btn-link text-left" >{t('button.cancel')}</button>
                            <button name='submit' class=" btn-primary" >{t('button.submit')}</button>
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
        <ComponentsMain showNotifications={this.state.showNotifications} NotificationMessage="Checkout Successfully" />
      );
    }
  }
};
export default withTranslation()(ComponentsCheckout);
