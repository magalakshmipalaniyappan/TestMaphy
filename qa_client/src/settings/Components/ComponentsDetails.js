import React, { Component } from 'react';

import ComponentsAsset from './ComponentsAsset';
import ComponentsLicense from './ComponentsLicense';
import ComponentsConsumables from './ComponentsConsumables';
import ComponentsAccessories from './ComponentsAccessories';
import ComponentsComponents from './ComponentsComponents';
import  ComponentsPeople from './ComponentsPeople';
import { withTranslation} from 'react-i18next'

import ComponentsCreate from '../Components/ComponentsCreate';
import ComponentsUpdate from '../Components/ComponentsUpdate';
import ComponentsMain from '../Components/ComponentsMain';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab'

class ComponentsDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value:"en",
      ComponentstoUpdate:'',
      ComponentsDetails:'',
      ShowAssets:true,
      ShowMain:false,
      ShowCreate:false,
      ShowUpdate:false
    }
  }
  componentDidMount() {
    this.setState({ ManufacturetoUpdate: this.props.ManufacturetoUpdate });
    //this.setState({ showNotifications: this.props.showNotifications });
  //  this.callServerData(this.state.page);
  }

  BackBtnClick=()=>{
    this.setState({ShowAssets:false});
    this.setState({ShowCreate:false});
    this.setState({ShowUpdate:false});
    this.setState({ShowMain:true})
  }
  AccessoriesCreateClick=()=>{
    this.setState({ShowAssets:false});
    this.setState({ShowCreate:true});
    this.setState({ShowUpdate:false});
    this.setState({ShowMain:false})
  }
  UpdateAccessories = () => {
     this.setState({ShowAssets:false});
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
    const {ShowAssets,ShowUpdate,ShowCreate}=this.state;
    const { t } = this.props;

    if(ShowAssets)
    {
      return (

        <div>
          <div>
           <div class="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 class="h3 mb-0 text-gray-800">Assets</h1>
                 <button onClick={this.BackBtnClick} className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
                {t('button.back')}</button>
              </div>
            </div>
            <Tabs defaultActiveKey="Assets" id="uncontrolled-tab-example">
              <Tab eventKey="Assets" title="Assets">
                <ComponentsAsset ComponentsDetails={this.props.ComponentsDetails} />
              </Tab>
              <Tab eventKey="Licences" title="Licences">
                <ComponentsLicense  ComponentsDetails={this.props.ComponentsDetails}/>
              </Tab>
              <Tab eventKey="Accessories" title="Accessories" >
                <ComponentsAccessories ComponentsDetails={this.props.ComponentsDetails}/>
              </Tab>
              <Tab eventKey="Consumables" title="Consumables" >
                <ComponentsConsumables ComponentsDetails={this.props.ComponentsDetails}/>
              </Tab>
              <Tab eventKey="Components" title="Components" >
                <ComponentsComponents ComponentsDetails={this.props.ComponentsDetails}/>
              </Tab>
              <Tab eventKey="People" title="People" >
                <ComponentsPeople ComponentsDetails={this.props.ComponentsDetails}/>
              </Tab>
            </Tabs>
          </div>
      )
  
    }
    else if(ShowUpdate)

    return(<ComponentsUpdate/>)
     
    else if(ShowCreate)
       return(<ComponentsCreate/>)
    else
       return(<ComponentsMain/>)
    }
    
  }
  export default withTranslation()(ComponentsDetails);


