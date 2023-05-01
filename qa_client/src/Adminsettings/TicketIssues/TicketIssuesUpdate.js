import React from 'react';
import axios from 'axios';
import TicketIssuesMain from './TicketIssuesMain'
import { withTranslation } from 'react-i18next'
const Domain = process.env.REACT_APP_URL;
var NotificationMessage = "";
var ResponseStatus = "";
class TicketIssuesUpdate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
         value: "en",
      ShowCreate: true,
      showNotifications: false,
      errors:{}
    }
    this.myChangeHandler = this.myChangeHandler.bind(this);
    this.mySubmitHandler = this.mySubmitHandler.bind(this);

  };

  componentDidMount()
    {
      this.loadTalentGroup();
    this.setState({name:this.props.ticketIssuesDetails.name});
    this.setState({description:this.props.ticketIssuesDetails.description});
    this.setState({talent_group_id:this.props.ticketIssuesDetails.talent_group.id})
    }
  

  loadTalentGroup() {
    const url = Domain + '/talentGroups/selectList?page=1'
    axios.get(url)
      .then((response) => {
        console.log("data:" + response.data);
        console.log("data:" + response.data.items);
        this.setState({ talentGroupData: response.data.items });
      });


  }
  validateForm() {
    let state = this.state,errors = {},formIsValid = true;
    if (!state["name"]) {
      formIsValid = false;
      errors["name"] = "Please enter ticket issue";
    } 
    if (!state["description"]) {
      formIsValid = false;
      errors["description"] = "Please enter description";
    } 

    if (!state["talent_group_id"]) {
      formIsValid = false;
      errors["talent_group_id"] = "Please select talent group";
    } 

    this.setState({ errors: errors  });
    return formIsValid;
  }

  myChangeHandler = (event) => {
    this.setState({ [event.target.name] :event.target.value });
  }
  mySubmitHandler = async (event) => {
    event.preventDefault();
    if (this.validateForm()) {
      await axios({
        method: 'put',
        url: Domain + '/ticketIssues/'+this.props.ticketIssuesDetails.id,
        data: JSON.stringify({ name: this.state.name,description:this.state.description,talent_group_id:this.state.talent_group_id}),
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

  BackBtnClick = () => {
    NotificationMessage = '';
    this.setState({ showNotifications: false });
    const { ShowCreate } = this.state;
    this.setState({ ShowCreate: !ShowCreate });
  }

  render() {
      const { t } = this.props;
    const { ShowCreate, showNotifications } = this.state;
    if (ShowCreate) {
      return (
        <div>
          <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800" name="updateissue"> {t('ticketissue.updateissue')}<span></span></h1>
            <button name="back" onClick={this.BackBtnClick} className="btn-sm btn-primary shadow-sm  customlogin-btn">
               {t('button.back')}</button>
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
                          <div class="form-group row">
                              <div class="col-sm-12 mb-6 mb-sm-0">
                                <label for="ticketIssue" class=" control-label customlabel-textcolor">{t('ticketissue.talent_group_id')} <i style={{ color: "red" }}>*</i></label>
                                <select ref="talent_group_id" class="form-control"   value={this.state.talent_group_id} onChange={this.myChangeHandler} id="talent_group_id"  name="talent_group_id" >
                                  <option key="0" value="">{t('select.talent_group')}</option>
                                  {(() => {
                                    if (this.state.talentGroupData) {
                                      return (
                                        this.state.talentGroupData.map(obj => {
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
                                  <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.talent_group_id}</div>                          
                              </div>
                            </div>
                            <div class="form-group">
                              <label for="name" class=" control-label customlabel-textcolor">{t('ticketissue.name')} <i style={{ color: "red" }}>*</i></label>

                              <input type="text" class="form-control "   value={this.state.name}
                                name="name" id="name"  aria-describedby="emailHelp"
                                placeholder={t('ticketissue.name')} onChange={this.myChangeHandler} />
                              <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.name}</div> 
                            </div>
                                         <div class="form-group">
                              <label for="description" class=" control-label customlabel-textcolor">{t('ticketissue.description')} <i style={{ color: "red" }}>*</i></label>
                              <textarea class="form-control "  value={this.state.description}
                                name="description" id="description"  aria-describedby="emailHelp" rows="3"
                                placeholder={t('ticketissue.description')} onChange={this.myChangeHandler} />
                               <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.description}</div> 
                            </div>
                            <div class="form-group">
                               <button name="btnCancel" onClick={this.BackBtnClick} class="btn btn-link text-left" >{t('button.btnCancel')}</button>
                               <button name='submit' class=" btn-primary  customlogin-btn" >{t('button.submit')}</button>
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
       <TicketIssuesMain NotificationMessage={NotificationMessage} showNotifications={showNotifications}></TicketIssuesMain>
        );
    }
  }
};

export default withTranslation()(TicketIssuesUpdate);