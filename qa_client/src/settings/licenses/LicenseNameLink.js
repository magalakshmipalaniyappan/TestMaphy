
import React, { Component } from 'react';
import LicensesUpdate from './LicensesUpdate';
import LicensesMain from './LicensesMain';
import LicensesCreate from './LicensesCreate';
import LicenseDetailsDisplay from './LicenseDetailsDisplay';
import LicenseSeats from './LicenseSeats';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab'
import { withTranslation } from 'react-i18next'

class LicenseNameLink extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: "en",
      ShowCompanies: true,
      ShowMain: false,
      ShowCreate: false,
      ShowUpdate: false
    }


  }

  // componentDidMount() {
  //   this.setState({ managerDetails: this.props.managerDetails.manager.name });
  //   this.setState({ managerDetails: this.props.managerDetails.manager.id });
  //   //this.setState({ CompanyId: this.props.companyDetails.id });
  //   console.log("c v: " + this.props.managerDetails.manager.name  + "hh:" + this.props.managerDetails.manager.id );
  // }
  BackBtnClick = () => {
    this.setState({ ShowCompanies: false });
    this.setState({ ShowCreate: false });
    this.setState({ ShowUpdate: false });
    this.setState({ ShowMain: true })
  }
  LicenseCreateClick = () => {
    this.setState({ ShowCompanies: false });
    this.setState({ ShowCreate: true });
    this.setState({ ShowUpdate: false });
    this.setState({ ShowMain: false })
  }
  UpdateLicense = () => {
    this.setState({ ShowCompanies: false });
    this.setState({ ShowCreate: false });
    this.setState({ ShowUpdate: true });
    this.setState({ ShowMain: false });
    this.setState({editProcess:"Update"});
  }
  onLanguageHandle = (event) => {
    let newLang = event.target.value;
    this.setState({ value: newLang })
    this.props.i18n.changeLanguage(newLang)
  }
  render() {
    const { t } = this.props;
    const { ShowCompanies, ShowUpdate, ShowCreate } = this.state;
    if (ShowCompanies) {
      return (

        <div>
          <div>

            <div class="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 class="h3 mb-0 text-gray-800">{t('license.license')} - {this.props.LicensesDatatoUpdate.name}</h1>
              <div class="pull-left">
                <div class="btn-group pull-left">

                  <button class="btn btn-primary customcolumns-csv dropdown-toggle  customcolumns-csv" data-toggle="dropdown" name="actions">{t('button.actions')}

                  </button>
                  <ul class="dropdown-menu">
                    <li><button name="btnCreate" class="btn btn-link" onClick={this.LicenseCreateClick}>{t('license.btnCreate')}</button></li>
                    <li><button name="btnUpdate" class="btn btn-link" onClick={this.UpdateLicense}>{t('license.btnUpdate')}</button></li>
                  </ul>&nbsp;
                  <button name="back" onClick={this.BackBtnClick} className="btn btn-primary customcolumns-csv">
                    {t('button.back')}</button>
                </div>
              </div>

            </div>
          </div>
          <Tabs defaultActiveKey="Details" id="uncontrolled-tab-example">
            <Tab eventKey="Details" title="Details" >
              <LicenseDetailsDisplay LicensesDatatoUpdate={this.props.LicensesDatatoUpdate} />
            </Tab>
            <Tab eventKey="Seats" title="Seats">
              <LicenseSeats LicensesDatatoUpdate={this.props.LicensesDatatoUpdate} />
            </Tab>
            { /*<Tab eventKey="File Uploads" title="File Uploads">
                <LicenseUploads  LicensesDatatoUpdate={this.props.LicensesDatatoUpdate} /> 
              </Tab>
              <Tab eventKey="CheckOut History" title="CheckOut History" >
                <LicenseHistory  LicensesDatatoUpdate={this.props.LicensesDatatoUpdate} /> 
              </Tab>
              <Tab eventKey="Consumables" title="Consumables" >
                <DepartmentConsumables  managerDetails={this.props.managerDetails} />
              </Tab>
              <Tab eventKey="Components" title="Components" >
                <DepartmentComponents  managerDetails={this.props.managerDetails} />
              </Tab>*/}

          </Tabs>
        </div>
      )

    }
    else if (ShowUpdate)

      return (<LicensesUpdate LicensesDatatoUpdate={this.props.LicensesDatatoUpdate} editProcess={this.state.editProcess}/>)

    else if (ShowCreate)
      return (<LicensesCreate />)
    else
      return (<LicensesMain />)
  }

}


export default withTranslation()(LicenseNameLink);