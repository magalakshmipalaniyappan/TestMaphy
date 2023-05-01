import React from 'react';
import axios from 'axios';

import TicketMain from './TicketMain'
import { withTranslation} from 'react-i18next'
const Domain = process.env.REACT_APP_URL;
var NotificationMessage = "";
var ResponseStatus = "";
class TicketCreate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fields: {},
      errors: {},
      ShowCreate: true,
      showNotifications: false
    }
    this.myChangeHandler = this.myChangeHandler.bind(this);
    this.mySubmitHandler = this.mySubmitHandler.bind(this);

  };

  async componentDidMount() {
   // const managersurl = Domain + '/users';
    const issueurl = Domain + '/ticketIssues/selectList?page=1';
    axios.get(issueurl)
      .then((response) => {
        this.setState({ IssueData: response.data.items });
      });
  }
  myChangeHandler = (event) => {
    let fields = this.state.fields;
    fields[event.target.name] = event.target.value;
    this.setState({
      fields
    });
  }
  validateIssue() {
    let state = this.state,errors = {},formIsValid = true;
    if (!state.fields["issue_id"]) {
      formIsValid = false;
      errors["issue_id"] = "*Please Select Your Issue .";
    }
    
    this.setState({
      errors: errors
    });
    return formIsValid;
  }
  mySubmitHandler = async (event) => {
    event.preventDefault();
    if (this.validateIssue()) {
   await axios({
      method: 'post',
      url: Domain + '/tickets',
      data: JSON.stringify({
        asset_tag: this.state.fields.asset_tag,
        description: this.state.fields.description,
        details: this.state.fields.details,
        status_id: this.state.fields.status_id,
        issue_id: this.state.fields.issue_id
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
        console.log("res" + response.error);
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
    const { ShowCreate } = this.state;
    const { t } = this.props;
    if (ShowCreate) {
      return (
        <div>
   <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Create Ticket</h1>
            <button onClick={this.BackBtnClick} className="btn btn-sm btn-primary shadow-sm">
              Back</button>
          </div>
          <div class="container">
            <div class="row justify-content-center">

              <div class="col-xl-10 col-lg-12 col-md-9">

                <div class="card o-hidden border-0 shadow-lg my-5">
                  <div class="card-body p-0">
                    <div class="row">
                      <div class="col-xs-12 col-lg-10 col-md-9">
                        <div class="p-4">

                          <form class="user" onSubmit={this.mySubmitHandler}>
                            <div class="form-group row">
                              <div class="col-sm-8 mb-3 mb-sm-0">
                                <label for="asset_tag" class="control-label customlabel-textcolor">{t('ticket.asset_tag')}</label>
                                <input type="text" class="form-control "
                                  name="asset_tag" id="asset_tag" value={this.state.fields.asset_tag}
                                  placeholder="Asset Tag Name..." onChange={this.myChangeHandler} required/>
                              </div>
                              <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.asset_tag}</div>
                            </div>

                            <div class="form-group row">
                              <div class="col-sm-8 mb-3 mb-sm-0">
                                <label for="issue_id" class=" control-label customlabel-textcolor">{t('ticket.issue_id')}</label>
                                <select ref="issue_id" class="form-control" onChange={this.myChangeHandler} id="issue_id" name="issue_id" >
                                  <option  value="">Select Ticket Issue</option>
                                  {(() => {
                                    if (this.state.IssueData) {
                                      return (
                                        this.state.IssueData.map(obj => {
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
                                  })()
                                  }
                                </select>
                              </div>
                              <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.issue_id}</div>

                            </div>
                            <div class="form-group row">
                              <div class="col-sm-8 mb-3 mb-sm-0">
                                <label for="description" class="control-label customlabel-textcolor">{t('ticket.description')}</label>
                                <textarea class="form-control " id="description" name="description" onChange={this.myChangeHandler}
                                  placeholder="Description" required/>
                              </div>
                              <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.description}</div>
                            </div>
                            <div class="form-group row">
                              <div class="col-sm-8 mb-3 mb-sm-0">
                                <label for="details" class="control-label customlabel-textcolor">{t('ticket.details')}</label>
                                <textarea class="form-control" id="details" name="details" onChange={this.myChangeHandler}
                                  placeholder="Details" required/>
                              </div>
                              <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.details}</div>
                            </div>
                            <div class="form-group">
                              <button name="btnCancel" onClick={this.BackBtnClick} class="btn btn-link text-left" >Cancel</button>

                              <input type='submit' class="btn btn-primary customlogin-btn" />
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
        <TicketMain showNotifications={this.state.showNotifications} NotificationMessage={NotificationMessage} />
      );
    }
  }
};

export default withTranslation()(TicketCreate);
