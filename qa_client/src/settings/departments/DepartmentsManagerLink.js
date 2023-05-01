
import React, { Component } from 'react';

import DepartmentAsset from './DepartmentAsset';
import DepartmentLicenses from './DepartmentLicenses';
import DepartmentConsumables from './DepartmentConsumables';
import DepartmentAccessories from './DepartmentAccessories';

//import DepartmentCreate from '../departments/DepartmentCreate';
import DepartmentsUpdate from '../departments/DepartmentsUpdate';
import DepartmentsMain from '../departments/DepartmentsMain';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab'
import { withTranslation } from 'react-i18next'
class DepartmentsManagerLink extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: "en",
      ShowCompanies:true,
      ShowMain:false,
      ShowCreate:false,
      ShowUpdate:false
    }
  
  
}

componentDidMount() {
  this.setState({ managerDetails: this.props.managerDetails.manager.name });
  this.setState({ managerDetails: this.props.managerDetails.manager.id });
  //this.setState({ CompanyId: this.props.companyDetails.id });
  console.log("c v: " + this.props.managerDetails.manager.name  + "hh:" + this.props.managerDetails.manager.id );
}
  BackBtnClick=()=>{
    this.setState({ShowCompanies:false});
    this.setState({ShowCreate:false});
    this.setState({ShowUpdate:false});
    this.setState({ShowMain:true})
  }
  ManufacturesCreateClick=()=>{
    this.setState({ShowCompanies:false});
    this.setState({ShowCreate:true});
    this.setState({ShowUpdate:false});
    this.setState({ShowMain:false})
  }
  ManufacturesUpdateClick=()=>{
    this.setState({ShowCompanies:false});
    this.setState({ShowCreate:false});
    this.setState({ShowUpdate:true});
    this.setState({ShowMain:false})
  }
onLanguageHandle = (event) => {
    let newLang = event.target.value;
    this.setState({ value: newLang })
    this.props.i18n.changeLanguage(newLang)
  }
  render() {
       const { t } = this.props
    const {ShowCompanies,ShowUpdate}=this.state;
    if(ShowCompanies)
    {
      return (

        <div>
          <div>
           <div class="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 class="h3 mb-0 text-gray-800 custommain-title">{this.props.managerDetails.manager.name}</h1> 
                 <button name="back" onClick={this.BackBtnClick} className=" btn btn-sm btn-primary shadow-sm custommain-title">
                 {t('button.back')}</button>
              </div>
            </div>
            <Tabs defaultActiveKey="Assets" id="uncontrolled-tab-example">
                 {/* <Tab eventKey="People" title="People" >
                <DepartmentPeople  managerDetails={this.props.managerDetails} />
              </Tab>   */}
              <Tab eventKey="Assets" title="Assets">
                <DepartmentAsset  managerDetails={this.props.managerDetails} />
              </Tab>
              <Tab eventKey="Licenses" title="Licenses">
                <DepartmentLicenses  managerDetails={this.props.managerDetails} />
              </Tab>
              <Tab eventKey="Accessories" title="Accessories" >
                <DepartmentAccessories  managerDetails={this.props.managerDetails} />
              </Tab>
              <Tab eventKey="Consumables" title="Consumables" >
                <DepartmentConsumables  managerDetails={this.props.managerDetails} />
              </Tab>
              {/* <Tab eventKey="Components" title="Components" >
                <DepartmentComponents  managerDetails={this.props.managerDetails} />
              </Tab> */}
        </Tabs>
          </div>
      )
  
    }
       else if(ShowUpdate)

    return(<DepartmentsUpdate/>)
     
    // else if(ShowCreate)
    //    return(<DepartmentsCreate/>)
    else
       return(<DepartmentsMain/>)
    }
    
  }


export default withTranslation()(DepartmentsManagerLink);