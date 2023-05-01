import React, { Component } from 'react';
import AccessoriesCheckout from '../Accessories/AccessoriesCheckout';
import AccessoriesUpdate from '../Accessories/AccessoriesUpdate';
import AccessoriesMain from '../Accessories/AccessoriesMain';

class AccessoriesCompany extends Component {
  constructor(props) {
    super(props)
    this.state = {
     AccessoriestoUpdate:'',
      ShowAccessories:true,
      ShowMain:false,
      ShowCreate:false,
      ShowUpdate:false,
       Showcheckout:false
    }
  }
  componentDidMount() {
    this.setState({ AccessoriestoUpdate: this.props.AccessoriestoUpdate });
  }

  BackBtnClick=()=>{
    this.setState({ShowAccessories:false});
    this.setState({ShowCreate:false});
    this.setState({ShowUpdate:false});
    this.setState({ShowMain:true})
  }
 
  UpdateAccessories = () => {
     this.setState({ShowAccessories:false});
    this.setState({ShowCreate:false});
    this.setState({ShowUpdate:true});
    this.setState({ShowMain:false})
  
  }
  AccessoriesCheckout=()=>{
    this.setState({ShowAccessories:false});
    this.setState({Showcheckout:true});
    this.setState({ShowUpdate:false});
    this.setState({ShowMain:false})
  }
 
  render() {
    const {ShowAccessories,ShowCheckout,ShowUpdate}=this.state;
    if(ShowAccessories)
    {
      return (

        <div>
          <div>
           <div class="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 class="h3 mb-0 text-gray-800">Accessories</h1>
                 <div class="pull-left">
              <div class="btn-group pull-left">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Actions

                        <span class="caret"></span>
                </button>
                <ul class="dropdown-menu">
                    <li><button name="btnUpdate" class="btn btn-link" onClick={this.UpdateAccessories}>Edit Accessory</button></li>
                   <li><button name="btnCheckout" class="btn btn-link" onClick={this.AccessoriesCheckout}>Checkout Accessory</button></li>
                                  </ul>
              </div>
            </div>
                <button onClick={this.BackBtnClick} className=" btn btn-sm btn-primary shadow-sm">
                 Back</button>
              </div>
            </div>
            {/* <Accessories /> */}      
          </div>
      )
  
    }
    else if(ShowUpdate)

    return(<AccessoriesUpdate  AccessoriestoUpdate={this.state.AccessoriestoUpdate} />)
     
    else if(ShowCheckout)
       return(<AccessoriesCheckout/>)
    else
       return(<AccessoriesMain/>)
    }
    
  }


export default AccessoriesCompany;
