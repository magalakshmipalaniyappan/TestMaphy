import React, { Component } from 'react';

import CompaniesAsset from './CompaniesAsset';
import CompaniesLicenses from './CompaniesLicenses';
import CompanyConsumables from './CompanyConsumables';
import CompaniesAccessories from './CompaniesAccessories';
import CompanyComponents from './CompanyComponents';
import CompanyPeople from './CompanyPeople';

import CompaniesCreate from '../Companies/CompaniesCreate';
import CompaniesUpdate from '../Companies/CompaniesUpdate';
import CompaniesMain from '../Companies/CompaniesMain';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab'
import { withTranslation } from 'react-i18next'
class CompaniesDetails extends Component {
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

  componentDidMount() {
    this.setState({ CompanyName: this.props.companyDetails.name });
    this.setState({ CompanyId: this.props.companyDetails.id });

  }
  BackBtnClick = () => {
    this.setState({ ShowCompanies: false });
    this.setState({ ShowCreate: false });
    this.setState({ ShowUpdate: false });
    this.setState({ ShowMain: true })
  }
  ManufacturesCreateClick = () => {
    this.setState({ ShowCompanies: false });
    this.setState({ ShowCreate: true });
    this.setState({ ShowUpdate: false });
    this.setState({ ShowMain: false })
  }
  ManufacturesUpdateClick = () => {
    this.setState({ ShowCompanies: false });
    this.setState({ ShowCreate: false });
    this.setState({ ShowUpdate: true });
    this.setState({ ShowMain: false })
  }
onLanguageHandle = (event) => {
    let newLang = event.target.value;
    this.setState({value: newLang})
    this.props.i18n.changeLanguage(newLang)
  }
  render() {
    const {t} = this.props
    const { ShowCompanies,ShowUpdate, ShowCreate } = this.state;
    if (ShowCompanies) {
      return (

        <div>
          <div>

            <div class="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 class="h3 mb-0 text-gray-800 custommain-title">{this.props.companyDetails.name}</h1>
   
               <button onClick={this.BackBtnClick} name="back" className="btn btn-sm btn-primary shadow-sm custommain-title">
               {t('company.back')}</button>
       </div>
          </div>
          <Tabs defaultActiveKey="People" id="uncontrolled-tab-example">
          <Tab eventKey="People" title="People" >
              <CompanyPeople companyDetails={this.props.companyDetails} />
            </Tab>
            <Tab eventKey="Assets" title="Assets">
              <CompaniesAsset companyDetails={this.props.companyDetails} />
            </Tab>
            <Tab eventKey="Licenses" title="Licenses">
              <CompaniesLicenses companyDetails={this.props.companyDetails} />
            </Tab>
            <Tab eventKey="Accessories" title="Accessories" >
              <CompaniesAccessories companyDetails={this.props.companyDetails} />
            </Tab>
            <Tab eventKey="Consumables" title="Consumables" >
              <CompanyConsumables companyDetails={this.props.companyDetails} />
            </Tab>
            <Tab eventKey="Components" title="Components" >
              <CompanyComponents companyDetails={this.props.companyDetails} />
            </Tab>
       </Tabs>
        </div>
      )

    }
    else if (ShowUpdate)

      return (<CompaniesUpdate />)

    else if (ShowCreate)
      return (<CompaniesCreate />)
    else
      return (<CompaniesMain />)
  }

}


export default withTranslation()(CompaniesDetails);