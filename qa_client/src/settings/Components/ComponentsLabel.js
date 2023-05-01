

import React, { Component } from 'react';
import Qrcode from 'qrcode.react';
class ComponentsLabel extends Component {
  constructor(props) {
    super(props)
   this.state = {
    LabelData:'',
    selectedComponent:'',
    
   }
  }
  render() {
    var LabelData = JSON.parse(localStorage.getItem("LabelData"));
    var selectedComponent = JSON.parse(localStorage.getItem("ComponentLabel"));
   // var fontsize=LabelData[0].labels_fontsize+"pt";

    console.log("LabelData",LabelData[0].labels_fontsize)
    const mystyle = {
     
       width:LabelData[0].labels_width,
       height:LabelData[0].labels_height,
       marginLeft:115,
       marginTop:-52
 
     };
     const labelstyle = {
     
     paddingLeft:29,
     fontSize:LabelData[0].labels_fontsize+"pt"
     
    };
    const  AssetQRCode=selectedComponent.name+'/'+selectedComponent.category.name+'/'+selectedComponent.location.name;

    return (
      <div>
      <style dangerouslySetInnerHTML={{__html: "\n        body {\n            font-family: arial, helvetica, sans-serif;\n            width: 2.25000in;\n            height: 1.25000in;\n            margin: 0.00000in 0.00000in 0.00000in 0.00000in;\n     }\n\n        .label {\n            width: 2.25in;\n            height: 1.25in;\n            padding: 0in;\n            margin-right: 0.00000in;\n            /* the gutter */\n            margin-bottom: 0.00000in;\n            display: inline-block;\n            overflow: hidden;\n        }\n\n        .page-break {\n            page-break-after: always;\n        }\n\n        div.qr_img {\n            width:'100%';\n            height:'100%';\n\n            float: left;\n            display: inline-flex;\n            padding-right: -0.85in;\n        }\n\n        img.qr_img {\n\n            width: 100%;\n            height: 100%;\n            margin-top: -6.9%;\n            margin-left: -6.9%;\n            padding-bottom: .04in;\n        }\n\n        img.barcode {\n            display: block;\n\n            padding-top: .11in;\n            width: 100%;\n        }\n\n        div.label-logo {\n            float: right;\n            display: inline-block;\n        }\n\n        img.label-logo {\n            height: 0.5in;\n        }\n\n        .qr_text {\n            width: 2.25in;\n            height: 1.25in;\n            padding-top: 0.00000in;\n   margin-left: -20px;\n           font-family: arial, helvetica, sans-serif;\n                   padding-right: .0001in;\n            overflow: hidden !important;\n            display: inline;\n            word-wrap: break-word;\n            word-break: break-all;\n        }\n\n        div.barcode_container {\n\n            width: 100%;\n            display: inline;\n            overflow: hidden;\n        }\n\n        .next-padding {\n            margin: 0.00000in 0.00000in 0.00000in 0.00000in;\n        }\n\n        @media print {\n            .noprint {\n                display: none !important;\n            }\n\n            .next-padding {\n                margin: 0.00000in 0.00000in 0.00000in 0.00000in;\n             }\n        }\n\n        @media screen {\n            .label {\n                outline: .02in black solid;\n                /* outline doesn't occupy space like border does */\n            }\n\n            .noprint {\n                    padding-bottom: 15px;\n            }\n        }\n    " }} />

        <div className="label" >

    <div  className="qr_text">
            <div className="pull-left">
            <div style={labelstyle} ><strong>{selectedComponent.company.name}</strong></div>      
            </div>
            <div className="pull-left">
               <div style={labelstyle}><strong>{selectedComponent.serial}</strong></div>
            </div>

          </div>
    <Qrcode style={mystyle} value={AssetQRCode} level="H" size='100'/>

      </div>
        <div className="page-break" />
       
        <div className="next-padding">&nbsp;</div>
      </div>
    );
       
    
  }
}

export default ComponentsLabel;

