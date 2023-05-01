import React, { Component } from 'react';
import { withTranslation} from 'react-i18next'

import PeopleAsset from './PeopleAsset';
import PeopleLicenses from './PeopleLicenses';
import PeopleConsumables from './PeopleConsumables';
import PeopleAccessories from './PeopleAccessories';

import PeopleInfo from './PeopleInfo';


import PeopleCreate from './PeopleCreate';
import CompaniesUpdate from '../Companies/CompaniesUpdate';
import PeopleMain from './PeopleMain';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab'

class PeopleDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value:"en",
      ShowPeople:true,
      ShowMain:false,
      ShowCreate:false,
      ShowUpdate:false
    }
   
}


  BackBtnClick=()=>{
    this.setState({ShowPeople:false});
    this.setState({ShowCreate:false});
    this.setState({ShowUpdate:false});
    this.setState({ShowMain:true})
  }

  ManufacturesUpdateClick=()=>{
    this.setState({ShowCompanies:false});
    this.setState({ShowCreate:false});
    this.setState({ShowUpdate:true});
    this.setState({ShowMain:false})
  }

  UpdatePeople = () => {
    const { ShowUpdate } = this.state;
    this.setState({ ShowUpdate: !ShowUpdate });
}
CreateBtnClick = () => {
    this.setState({ShowCreate:true});
    this.setState({ShowUpdate:false});
    this.setState({ShowMain:false})
}
onLanguageHandle = (event) => {
  let newLang = event.target.value;
  this.setState({ value: newLang })
  this.props.i18n.changeLanguage(newLang)
}
  render() {
    const {ShowPeople,ShowUpdate,ShowCreate}=this.state;
    const { t } = this.props

    if(ShowPeople)
    {
      return (

        <div>
          <div>
           <div class="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 class="h3 mb-0 text-gray-800 custommain-title">{this.props.PeopleData.name}</h1>
                <div class="row">
                   <div class="col">
                <button onClick={this.BackBtnClick} className=" btn btn-sm btn-primary shadow-sm custommain-title">
                {t('button.back')}</button>
              </div>
               </div>
                 </div>
            </div>
            <Tabs defaultActiveKey="Info" id="uncontrolled-tab-example">
            <Tab eventKey="Info" title="Info">
                <PeopleInfo PeopleData={this.props.PeopleData} />
              </Tab>
              <Tab eventKey="Assets" title="Assets">
                <PeopleAsset PeopleData={this.props.PeopleData} />
              </Tab>
              <Tab eventKey="Licenses" title="Licenses">
                <PeopleLicenses PeopleData={this.props.PeopleData}/>
              </Tab>
              <Tab eventKey="Accessories" title="Accessories" >
                <PeopleAccessories PeopleData={this.props.PeopleData}/>
              </Tab>
              <Tab eventKey="Consumables" title="Consumables" >
                <PeopleConsumables PeopleData={this.props.PeopleData}/>
              </Tab>
          </Tabs>
          </div>
      )
  
    }
    else if(ShowUpdate)

    return(<CompaniesUpdate/>)
     
    else if(ShowCreate)
       return(<PeopleCreate/>)
    else
       return(<PeopleMain/>)
    }
    
  }

  export default withTranslation()(PeopleDetails);
