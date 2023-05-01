import React, { Component } from 'react';

import ManufactureAsset from './ManufactureAsset';
import ManufactureLicense from './ManufactureLicense';
import ManufactureConsumables from './ManufactureConsumables';
import ManufactureAccessories from './ManufactureAccessories';

import ManufactureCreate from '../Manufactures/ManufactureCreate';
import ManufactureUpdate from '../Manufactures/ManufactureUpdate';
import ManufactureMain from '../Manufactures/ManufactureMain';
import { withTranslation } from 'react-i18next'

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab'

class ManufactureDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
         value: "en",
      ManufactureDetails:'',
    ManufacturetoUpdate:'',
      ShowAssets:true,
      ShowMain:false,
      ShowCreate:false,
      ShowUpdate:false
    }
  }
 

  BackBtnClick=()=>{
    this.setState({ShowAssets:false});
    this.setState({ShowCreate:false});
    this.setState({ShowUpdate:false});
    this.setState({ShowMain:true})
  }
  ManufacturesCreateClick=()=>{
    this.setState({ShowAssets:false});
    this.setState({ShowCreate:true});
    this.setState({ShowUpdate:false});
    this.setState({ShowMain:false})
  }
  UpdateManufacture = () => {
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
     const { t } = this.props;
    const {ShowAssets,ShowUpdate,ShowCreate}=this.state;
    if(ShowAssets)
    {
      return (

        <div>
          <div>
          <div class="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 class="h3 mb-0 text-gray-800">{this.props.ManufactureDetails.name}</h1>
                <div class="pull-left">
                <div class="btn-group pull-left">
                <button  name="actions" class="btn btn-primary customcolumns-csv dropdown-toggle " data-toggle="dropdown">{t('button.actions')}

                        </button>
                <ul class="dropdown-menu">
                  <li><button name="btnCreate" class="btn btn-link" onClick={this.ManufacturesCreateClick}>{t('manufacturers.btnCreate')}</button></li>
                  <li><button name="btnUpdate" class="btn btn-link" onClick={this.UpdateManufacture}>{t('manufacturers.btnUpdate')}</button></li>
                                  </ul>&nbsp;
               <button name="back" onClick={this.BackBtnClick} className="  btn btn-primary customcolumns-csv">
                    {t('manufacturers.back')}</button>
              </div>
                </div>
                  </div>
            </div>
            <Tabs defaultActiveKey="Assets" id="uncontrolled-tab-example">
              <Tab eventKey="Assets" title="Assets">
                <ManufactureAsset ManufactureDetails={this.props.ManufactureDetails}/>
              </Tab>
              <Tab eventKey="Licenses" title="Licenses">
                <ManufactureLicense ManufactureDetails={this.props.ManufactureDetails} />
              </Tab>
              <Tab eventKey="Accessories" title="Accessories" >
                <ManufactureAccessories ManufactureDetails={this.props.ManufactureDetails}/>
              </Tab>
              <Tab eventKey="Consumables" title="Consumables" >
                <ManufactureConsumables ManufactureDetails={this.props.ManufactureDetails} />
              </Tab>
          </Tabs>
          </div>
      )
 
    }
    else if(ShowUpdate)

    return(<ManufactureUpdate  ManufacturetoUpdate={this.props.ManufactureDetails} />)
     
    else if(ShowCreate)
       return(<ManufactureCreate/>)
    else
       return(<ManufactureMain/>)
    }
   
  }


export default withTranslation()(ManufactureDetails);

