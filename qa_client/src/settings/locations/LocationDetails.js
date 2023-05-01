import React, { Component } from 'react';
import { withTranslation} from 'react-i18next'

import LocationAssets from './LocationAssets';
import LocationPeople from './LocationPeople';
import LocationAccessories from './LocationAccessories';
import LocationConsumables from './LocationConsumables';
import LocationComponents from './LocationComponents';

import LocationCreate from './LocationCreate';
import LocationUpdate from './LocationUpdate';
import LocationMain from './LocationMain';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab'

class LocationNameLink extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value:"en",
      LocationDatatoUpdate:'',
      LocationName:'',
      LocationId:'',
      ShowLocation:true,
      ShowMain:false,
      ShowCreate:false,
      ShowUpdate:false,
      ShowName:false
    }
  }
  async componentDidMount() {
    this.setState({LocationName:this.props.LocationName});
    this.setState({LocationId:this.props.LocationId});
  }
  BackBtnClick=()=>{
    this.setState({ShowLocation:false});
    this.setState({ShowCreate:false});
    this.setState({ShowUpdate:false});
    this.setState({ShowMain:true})
  }
 
  LocationUpdateClick=()=>{
    this.setState({ShowLocation:false});
    this.setState({ShowCreate:false});
    this.setState({ShowName:true});
    this.setState({ShowMain:false})
  }
  onLanguageHandle = (event) => {
    let newLang = event.target.value;
    this.setState({ value: newLang })
    this.props.i18n.changeLanguage(newLang)
  }
  render() {
    const {ShowLocation,ShowName,ShowCreate}=this.state;
    const { t } = this.props;

    if(ShowLocation)
    {
      return (

        <div>
          <div>
           <div class="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 class="h3 mb-0 text-gray-800 custommain-title">{t('location.location')} - {this.props.LocationDatatoUpdate.name}</h1>
                <div class="row">
                <div class="col">
                <button onClick={this.LocationUpdateClick} className=" btn btn-sm btn-primary shadow-sm custommain-title">
                {t('location.update')}</button>
                 <button onClick={this.BackBtnClick} className=" btn btn-sm btn-primary shadow-sm custommain-title">
                {t('button.back')}</button>
              </div>
               </div>
                </div>
            </div>
            <Tabs defaultActiveKey="Assets" id="uncontrolled-tab-example">
              <Tab eventKey="Assets" title="Assets">
                <LocationAssets LocationDatatoUpdate={this.props.LocationDatatoUpdate} />
              </Tab>
              <Tab eventKey="People" title="People" >
                <LocationPeople LocationDatatoUpdate={this.props.LocationDatatoUpdate} />
              </Tab>
              <Tab eventKey="Accessories" title="Accessories" >
                <LocationAccessories LocationDatatoUpdate={this.props.LocationDatatoUpdate} />
              </Tab>
              <Tab eventKey="Consumables" title="Consumables" >
                <LocationConsumables LocationDatatoUpdate={this.props.LocationDatatoUpdate} />
              </Tab>
              <Tab eventKey="Components" title="Components" >
                <LocationComponents LocationDatatoUpdate={this.props.LocationDatatoUpdate} />
              </Tab>
              
          </Tabs>
          </div>
      )
  
    }
    else if(ShowName)

    return(<LocationUpdate LocationDatatoUpdate={this.props.LocationDatatoUpdate} />)
     
    else if(ShowCreate)
       return(<LocationCreate/>)
    else
       return(<LocationMain/>)
    }
    
  }
  export default withTranslation()(LocationNameLink);

