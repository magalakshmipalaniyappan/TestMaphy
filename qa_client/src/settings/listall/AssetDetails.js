import React, { Component } from 'react';
import AssetInfo from './AssetInfo'
import AssetLicense from './AssetLicense';
import AssetComponents from './AssetComponents';
import AssetMaintenances from './AssetMaintenances'
import AssetHistory from './AssetHistory'
import ListAllMain from './AssetMain';
import AllDeployableMain from '../AllDeployable/AllDeployableMain';
import AllUnDeployableMain from '../AllUnDeployabled/AllUnDeployableMain';
import AllDeployedMain from '../AllDeployed/AllDeployedMain';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab'
import { withTranslation } from 'react-i18next'
import { Redirect } from 'react-router-dom';
class AssetDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: "en",
      AccessoriestoUpdate: '',
      ShowAssets: true,
      ShowCheckout: false,
      ShowMain: false,
      ShowCreate: false,
      ShowUpdate: false,
      AssetData: props.location ? props.location.AssetData : (props.AssetData ? props.AssetData : null),
      mainPage: props.location ? props.location.mainPage : (props.mainPage ? props.mainPage : "ListAllMain")
    }
  }


  BackBtnClick = () => {
    this.setState({ ShowAssets: false });
    this.setState({ ShowCreate: false });
    this.setState({ ShowUpdate: false });
    this.setState({ ShowMain: true })
  }
  render() {
    const { t } = this.props;
    const { ShowAssets, AssetData, mainPage } = this.state;
    if (ShowAssets && AssetData) {
      return (
        <div>
          <div>
            <div>
              <div class="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 class="h3 mb-0 text-gray-800 custommain-title" name="details">{this.state.AssetData.name} - {t('AssetsListall.details')}</h1>
                <button name="back" onClick={this.BackBtnClick} className=" btn btn-sm btn-primary shadow-sm custommain-title">
                  {t('button.back')}</button>
              </div>
            </div>
            <Tabs defaultActiveKey="AssetDetails" id="uncontrolled-tab-example">
              <Tab eventKey="AssetDetails" title="Info" >
                <AssetInfo Asset_Details={this.state.AssetData} />
              </Tab>
              <Tab eventKey="Licenses" title="Licenses">
                <AssetLicense Asset_Details={this.state.AssetData} />
              </Tab>
              <Tab eventKey="Components" title="Components" >
                <AssetComponents Asset_Details={this.state.AssetData} />
              </Tab>
              <Tab eventKey="Maintenances" title="Maintenances" >
                <AssetMaintenances Asset_Details={this.state.AssetData} />
              </Tab>
              <Tab eventKey="History" title="History" >
                <AssetHistory Asset_Details={this.state.AssetData} />
              </Tab>
            </Tabs>
          </div>
          <div>

          </div>
        </div>
      )
    }

    else {
      if (mainPage === "AllDeployedMain") {
        return (
          <AllDeployedMain />
        );
      }
      else if (mainPage === "AllUnDeployableMain") {
        return (
          <AllUnDeployableMain />
        );
      }
      else if (mainPage === "AllDeployableMain") {
        return (
          <AllDeployableMain />
        );
      }
      else if (mainPage === "PeopleMain") {
        return (
          <Redirect to={'./PeopleMain'}/>
        );
      }
      else if (mainPage === "LocationMain") {
        return (
          <Redirect to={'./LocationMain'}/>
        );
      }
      else if (mainPage === "AssetMaintenancesMain") {
        return (
          <Redirect to={'./AssetMaintenancesMain'}/>
        );
      }
      
      else {
        if(this.props.location)
        {
             if( this.props.location.pathname==="/AssetDetails")
               return ( <Redirect to={'./AssetMain'}/>)
             else
             return (  <ListAllMain />)
        }  
        else
          return (  <ListAllMain />)
        
      }

    }

  }

}



export default withTranslation()(AssetDetails);

