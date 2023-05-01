import React, { Component } from 'react';

 import LocationAsset from './LocationAsset';
 import LocationComponent from './LocationComponent';
import Locationpeople from './Locationpeople';

//import LocationUpdate from '../locations/LocationUpdate';
import DepartmentsMain from '../departments/DepartmentsMain';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab'
import { withTranslation } from 'react-i18next'
class DepartmentsLocationLink extends Component {
  constructor(props) {
    super(props)
    this.state = {
         value: "en",
      LocationDatatoUpdate:'',
      LocationName:'',
      LocationId:'',
      ShowLocation:true,
      ShowMain:false,
      ShowCreate:false,
      ShowUpdate:false,
      ShowName:false
    }
    console.log("ShowLocation" +this.props.LocationDatatoUpdate.name)
  }
  async componentDidMount() {
    this.setState({LocationDatatoUpdate:this.props.LocationDatatoUpdate});
    this.setState({LocationId:this.props.LocationDatatoUpdate.location.id});
    
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
    const {ShowLocation}=this.state;
    if(ShowLocation)
    {
      return (

        <div>
          <div>
           <div class="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 class="h3 mb-0 text-gray-800 custommain-title"> {this.props.LocationDatatoUpdate.location.name}</h1>
                <div class="row">
                <div class="col">
                {/* <button onClick={this.LocationUpdateClick} className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
                  <i class="btn btn-sm btn-primary">Update Location</i></button>
                 */}
                <button name="back" onClick={this.BackBtnClick} className=" btn btn-sm btn-primary shadow-sm custommain-title">
                 {t('button.back')}</button>
              </div>
                </div>
                  </div>
            </div>
            <Tabs defaultActiveKey="Assets" id="uncontrolled-tab-example">
            <Tab eventKey="People" title="People" >
                <Locationpeople LocationDatatoUpdate={this.props.LocationDatatoUpdate} />
              </Tab>
              <Tab eventKey="Assets" title="Assets">
                <LocationAsset LocationDatatoUpdate={this.props.LocationDatatoUpdate} />
              </Tab>
            <Tab eventKey="Components" title="Components" >
                <LocationComponent LocationDatatoUpdate={this.props.LocationDatatoUpdate} />
              </Tab>
          </Tabs>
          </div>
      )
  
    }
    // else if(ShowUpdate)

    // return(<LocationUpdate LocationDatatoUpdate={this.props.LocationDatatoUpdate}  />)
     
    
    else
       return(<DepartmentsMain/>)
    }
    
  }


export default withTranslation()(DepartmentsLocationLink);