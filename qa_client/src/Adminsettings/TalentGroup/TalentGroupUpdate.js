import React from 'react';
import axios from 'axios';
import TalentGroupMain from './TalentGroupMain'
import { withTranslation } from 'react-i18next'
const Domain = process.env.REACT_APP_URL;
var NotificationMessage = "";
var ResponseStatus = "";
class TalentGroupUpdate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: "en",
      ShowUpdate: true,
      showNotifications: false,
      errors:{}
    }
    this.myChangeHandler = this.myChangeHandler.bind(this);
    this.mySubmitHandler = this.mySubmitHandler.bind(this);

  };

 componentDidMount()
 {
   this.setState({description:this.props.talentGroupDetails.description});
   this.setState({name:this.props.talentGroupDetails.name})
 }

  myChangeHandler = (event) => {
    this.setState({ [event.target.name]:event.target.value  });
  }
  mySubmitHandler = async (event) => {

    event.preventDefault();
    if (this.validateForm()) {
      await axios({
        method: 'put',
        url: Domain + '/talentGroups/' + this.props.talentGroupDetails.id,
        data: JSON.stringify({ name: this.state.name,
                description:this.state.description}),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(function (response) {
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
        this.setState({ ShowUpdate: false });
      }
    }
    
  }

  BackBtnClick = () => {
    NotificationMessage = '';
    this.setState({ showNotifications: false });
    const { ShowUpdate } = this.state;
    this.setState({ ShowUpdate: !ShowUpdate });
  }

  validateForm() {
    let state = this.state,errors = {},formIsValid = true;
    if (!state["name"]) {
      formIsValid = false;
      errors["name"] = "Please enter talent group name";
    } 
    if (!state["description"]) {
      formIsValid = false;
      errors["description"] = "Please enter description";
    } 
    this.setState({ errors: errors  });
    return formIsValid;
  }


   onLanguageHandle = (event) => {
    let newLang = event.target.value;
    this.setState({ value: newLang })
    this.props.i18n.changeLanguage(newLang)
  }
  render() {
      const { t } = this.props;
    const { ShowUpdate, showNotifications } = this.state;
    if (ShowUpdate) {
      return (
        <div>
          <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800" name="updatetalent"> {t('talentgroup.updatetalent')}<span></span></h1>
            <button name="back" onClick={this.BackBtnClick} className="btn-sm btn-primary shadow-sm  customlogin-btn">
 {t('button.back')}</button>  </div>
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
                                      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                      </button>
                                    </div>


                                  </div>
                                </div>
                              )
                            }


                          })()}
                          <form class="user" onSubmit={this.mySubmitHandler}>
                            <div class="form-group">
                              <label for="name" class=" control-label customlabel-textcolor">{t('talentgroup.name')} <i style={{ color: "red" }}>*</i></label>

                              <input type="text" class="form-control " value={this.state.name}
                                name="name" id="name"  aria-describedby="emailHelp"
                                placeholder={t('talentgroup.name')} onChange={this.myChangeHandler} />
                             <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.name}</div>
                            </div>
                            <div class="form-group">
                              <label for="description" class=" control-label customlabel-textcolor">{t('talentgroup.description')} <i style={{ color: "red" }}>*</i></label>

                              <textarea class="form-control " value={this.state.description}
                                name="description" id="description"  aria-describedby="emailHelp" rows="3"
                                placeholder={t('talentgroup.description')} onChange={this.myChangeHandler}/>
                             <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.description}</div>
                            </div>
                          
                            <div class="form-group">
                               <button name="btnCancel" onClick={this.BackBtnClick} class="btn btn-link text-left" >{t('button.btnCancel')}</button>

                               <button name='submit' class="btn-primary  customlogin-btn" >{t('button.submit')}</button>
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
      <TalentGroupMain NotificationMessage={NotificationMessage} showNotifications={this.state.showNotifications}></TalentGroupMain>
        );
    }
  }
};

export default withTranslation()(TalentGroupUpdate);