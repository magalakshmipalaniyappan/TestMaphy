import React, { Component } from 'react';
const cryptoRandomString = require('crypto-random-string');
var AssetQrCode="";

class AssetInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ListAllDatatoUpdate:[],
      ShowCompanies:true,
      ShowMain:false,
      ShowCreate:false,
      ShowUpdate:false
    }
   var ramdomstring=cryptoRandomString({length: 12, type: 'alphanumeric'});
    AssetQrCode=ramdomstring+'_'+this.props.Asset_Details.asset_tag;
    console.log("randomString",AssetQrCode);
}

  render() {
     //const qr=this.state.Qrcode;
     console.log("q:", AssetQrCode)
      return (
        <div>
            <table width="100%">
                <tr>
                      <div class="table table-responsive">
                    <table class="table table-striped">

                      <tr>
                        <td class="text-nowrap">Status</td>
                        <td> {this.props.Asset_Details.id} </td>

                      </tr>
                          <tr>
                        <td class="text-nowrap">Asset Name</td>
                        <td> {this.props.Asset_Details.name} </td>
                              </tr>
                      <tr>
                        <td class="text-nowrap">Asset Tag</td>
                        <td> {this.props.Asset_Details.asset_tag} </td>
                              </tr>             
                         <tr>
                        <td class="text-nowrap">Serial</td>
                        <td> {this.props.Asset_Details.serial} </td>
                      </tr>
                      <tr>
                        <td class="text-nowrap">Asset Name</td>
                        <td> {this.props.Asset_Details.name} </td>
                              </tr>                      
                       <tr>
                        <td class="text-nowrap">Model Number</td>
                        <td> {this.props.Asset_Details.model_number} </td>

                      </tr>
                                    <tr>
                        <td class="text-nowrap">Notes</td>
                        <td> {this.props.Asset_Details.notes} </td>
                              </tr>
                      <tr>
                        <td class="text-nowrap">Checkout Counter</td>
                        <td> {this.props.Asset_Details.checkout_counter} </td>
                              </tr>
                      <tr>
                        <td class="text-nowrap">Checkin Counter</td>
                        <td> {this.props.Asset_Details.checkin_counter} </td>
                      </tr>
                   
                    </table>

                    </div>
                 </tr>
            </table>
          </div>          
      )
 
    }
    }
   
 
export default AssetInfo;
