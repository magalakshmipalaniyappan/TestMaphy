import React, { Component } from 'react';
import { withTranslation} from 'react-i18next'

import SuppliersAsset from './SuppliersAsset';
import SuppliersLicense from './SuppliersLicense';

import SuppliersAccessories from './SuppliersAccessories';
import SuppliersImprovements from './SuppliersImprovements';

import SuppliersUpdate from '../Suppliers/SuppliersUpdate';
import SuppliersMain from '../Suppliers/SuppliersMain';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab'

class SuppliersDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value:"en",
    SupplierstoUpdate:'',
    SuppliersDetails:'',
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
 
  SuppliersUpdateClick=()=>{
    this.setState({ShowAssets:false});
    this.setState({ShowCreate:false});
    this.setState({ShowUpdate:true});
    this.setState({ShowMain:false})
  }
  UpdateSuppliers = () => {
   
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
    const {ShowAssets,ShowUpdate}=this.state;
    const { t } = this.props;

    if(ShowAssets)
    {
      return (

        <div>
          <div>
          <div class="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 class="h3 mb-0 text-gray-800 custommain-title">{this.props.SuppliersDetails.name}</h1>
               <div class="row">
                <div class="col">
               <button onClick={this.UpdateSuppliers} className=" btn btn-sm btn-primary shadow-sm custommain-title">
               {t('supplier.update')}</button>
            <button onClick={this.BackBtnClick} className=" btn btn-sm btn-primary shadow-sm custommain-title">
                {t('button.back')}</button>
              </div>
               </div>
                </div>
            </div>
            <Tabs defaultActiveKey="Assets" id="uncontrolled-tab-example">
              <Tab eventKey="Assets" title="Assets">
                <SuppliersAsset SuppliersDetails={this.props.SuppliersDetails}/>
              </Tab>
              <Tab eventKey="Licenses" title="Licenses">
                <SuppliersLicense SuppliersDetails={this.props.SuppliersDetails}  />
              </Tab>
              <Tab eventKey="Accessories" title="Accessories" >
                <SuppliersAccessories SuppliersDetails={this.props.SuppliersDetails}/>
              </Tab>
              <Tab eventKey="Improvements" title="Improvements" >
                <SuppliersImprovements SuppliersDetails={this.props.SuppliersDetails}/>
              </Tab>
           
            </Tabs>
          </div>
      )
 
    }
    else if(ShowUpdate)

    return(<SuppliersUpdate SupplierstoUpdate={this.props.SuppliersDetails}/>)
     
    else
       return(<SuppliersMain/>)
    }
   
  }

export default withTranslation()(SuppliersDetails);



