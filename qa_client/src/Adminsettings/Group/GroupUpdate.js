import React, { Component } from 'react';
import { withTranslation } from 'react-i18next'
import GroupMain from './GroupMain';
import axios from 'axios';
const Domain = process.env.REACT_APP_URL;
var NotificationMessage = "";
class GroupUpdate extends Component {
  constructor(props) {
    super(props)
    this.state = {
       value: "en",
      showNotifications: false,
      ShowUpdate: true,
      ShowMain: false,
      permissions: {
        superuser: this.props.GroupDetails.permissions.superuser,

             },

      errors: {}

    }

    this.onPermissionValueChange = this.onPermissionValueChange.bind(this);
    this.myChangeHandler = this.myChangeHandler.bind(this);
    this.mySubmitHandler = this.mySubmitHandler.bind(this);
  }

  componentDidMount() {
    this.setState({ GroupName: this.props.GroupDetails.name });

    let permissions = this.props.GroupDetails.permissions;

    permissions["admin"] = permissions.admin === true ? "true" : "false";
    permissions["importcsv"] = permissions.import === true ? "true" : "false";
    permissions["reportview"] = permissions.reportview === true ? "true" : "false";

    if ((permissions.accessoriesview && permissions.accessoriesedit && permissions.accessoriesdelete
      && permissions.accessoriescreate && permissions.accessoriescheckout && permissions.accessoriescheckin) === true) {
      permissions["accessoriesAll"] = "true";
      permissions["accessoriesview"] = "true";
      permissions["accessoriesedit"] = "true";
      permissions["accessoriesdelete"] = "true";
      permissions["accessoriescreate"] = "true";
      permissions["accessoriescheckout"] = "true";
      permissions["accessoriescheckin"] = "true";


    }
    else if ((permissions.accessoriesview && permissions.accessoriesedit && permissions.accessoriesdelete
      && permissions.accessoriescreate && permissions.accessoriescheckout && permissions.accessoriescheckin) === false) {
      permissions["accessoriesAll"] = "false";
      permissions["accessoriesview"] = "false";
      permissions["accessoriesedit"] = "false";
      permissions["accessoriesdelete"] = "false";
      permissions["accessoriescreate"] = "false";
      permissions["accessoriescheckout"] = "false";
      permissions["accessoriescheckin"] = "false";
    }

    this.setState({ permissions });

    if ((permissions.assetsaudit && permissions.assetscheckin && permissions.assetscheckout
      && permissions.assetscreate && permissions.assetsdelete && permissions.assetsedit
      && permissions.assetsview && permissions.assetsviewrequestable) === true) {
      permissions["assetsAll"] = "true";
      permissions["assetsaudit"] = "true";
      permissions["assetscheckin"] = "true";
      permissions["assetscheckout"] = "true";
      permissions["assetscreate"] = "true";
      permissions["assetsdelete"] = "true";
      permissions["assetsedit"] = "true";
      permissions["assetsview"] = "true";
      permissions["viewrequestable"] = "true";

    }

    else if ((permissions.assetsaudit && permissions.assetscheckin && permissions.assetscheckout
      && permissions.assetscreate && permissions.assetsdelete && permissions.assetsedit
      && permissions.assetsview && permissions.assetsviewrequestable) === false) {
      permissions["assetsAll"] = "false";
      permissions["assetsaudit"] = "false";
      permissions["assetscheckin"] = "false";
      permissions["assetscheckout"] = "false";
      permissions["assetscreate"] = "false";
      permissions["assetsdelete"] = "false";
      permissions["assetsedit"] = "false";
      permissions["assetsview"] = "false";
      permissions["viewrequestable"] = "false";

    }
    this.setState({ permissions });

    if ((permissions.consumablescreate && permissions.consumablescreate && permissions.consumablesdelete
      && permissions.consumablesedit && permissions.consumablesview) === true) {
      permissions["consumablesAll"] = "true";
      permissions["consumablescheckout"] = "true";
      permissions["consumablescreate"] = "true";
      permissions["consumablesdelete"] = "true";
      permissions["consumablesedit"] = "true";
      permissions["consumablesview"] = "true";

    }
    else if ((permissions.consumablescreate && permissions.consumablescreate && permissions.consumablesdelete
      && permissions.consumablesedit && permissions.consumablesview) === false) {
      permissions["consumablesAll"] = "false";
      permissions["consumablescheckout"] = "false";
      permissions["consumablescreate"] = "false";
      permissions["consumablesdelete"] = "false";
      permissions["consumablesedit"] = "false";
      permissions["consumablesview"] = "false";


    }

    this.setState({ permissions });

    if ((permissions.categoriescreate && permissions.categoriesdelete && permissions.categoriesedit
      && permissions.categoriesview) === true) {
      permissions["categoriesAll"] = "true";
      permissions["categoriescreate"] = "true";
      permissions["categoriesdelete"] = "true";
      permissions["categoriesedit"] = "true";
      permissions["categoriesview"] = "true";

    }
    else if ((permissions.categoriescreate && permissions.categoriesdelete && permissions.categoriesedit
      && permissions.categoriesview) === false) {
      permissions["categoriesAll"] = "false";
      permissions["categoriescreate"] = "false";
      permissions["categoriesdelete"] = "false";
      permissions["categoriesedit"] = "false";
      permissions["categoriesview"] = "false";

    }

    this.setState({ permissions });
    if ((permissions.statuslabelscreate && permissions.statuslabelsdelete && permissions.statuslabelsedit
      && permissions.statuslabelsview) === true) {
      permissions["statuslabelsAll"] = "true";
      permissions["statuslabelscreate"] = "true";
      permissions["statuslabelsdelete"] = "true";
      permissions["statuslabelsedit"] = "true";
      permissions["statuslabelsview"] = "true";

    }
    else if ((permissions.statuslabelscreate && permissions.statuslabelsdelete && permissions.statuslabelsedit
      && permissions.statuslabelsview) === false) {
      permissions["statuslabelsAll"] = "false";
      permissions["statuslabelscreate"] = "false";
      permissions["statuslabelsdelete"] = "false";
      permissions["statuslabelsedit"] = "false";
      permissions["statuslabelsview"] = "false";

    }

    this.setState({ permissions });
    if ((permissions.licensescheckout && permissions.licensescreate && permissions.licensesdelete
      && permissions.licensesedit && permissions.licenseskeys && permissions.licensesview) === true) {
      permissions["licensesAll"] = "true";
      permissions["licensescheckout"] = "true";
      permissions["licensescreate"] = "true";
      permissions["licensesdelete"] = "true";
      permissions["licensesedit"] = "true";
      permissions["licenseskey"] = "true";
      permissions["licensesview"] = "true";


    }
    else if ((permissions.licensescheckout && permissions.licensescreate && permissions.licensesdelete
      && permissions.licensesedit && permissions.licenseskeys && permissions.licensesview) === false) {
      permissions["licensesAll"] = "false";
      permissions["licensescheckout"] = "false";
      permissions["licensescreate"] = "false";
      permissions["licensesdelete"] = "false";
      permissions["licensesedit"] = "false";
      permissions["licenseskey"] = "false";
      permissions["licensesview"] = "false";


    }

    this.setState({ permissions });
    if ((permissions.componentscheckin && permissions.componentscheckout && permissions.componentscreate
      && permissions.componentsdelete && permissions.componentsedit && permissions.componentsview) === true) {
      permissions["componentsAll"] = "true";
      permissions["componentscheckin"] = "true";
      permissions["componentscheckout"] = "true";
      permissions["componentscreate"] = "true";
      permissions["componentsdelete"] = "true";
      permissions["componentsedit"] = "true";
      permissions["componentsview"] = "true";


    }
    else if ((permissions.componentscheckin && permissions.componentscheckout && permissions.componentscreate
      && permissions.componentsdelete && permissions.componentsedit && permissions.componentsview) === false) {
      permissions["componentsAll"] = "false";
      permissions["componentscheckin"] = "false";
      permissions["componentscheckout"] = "false";
      permissions["componentscreate"] = "false";
      permissions["componentsdelete"] = "false";
      permissions["componentsedit"] = "false";
      permissions["componentsview"] = "false";


    }

    this.setState({ permissions });
    if ((permissions.kitscheckout && permissions.kitscreate && permissions.kitsdelete
      && permissions.kitsedit && permissions.kitsview) === true) {
      permissions["kitsAll"] = "true";
      permissions["kitscheckout"] = "true";
      permissions["kitscreate"] = "true";
      permissions["kitsdelete"] = "true";
      permissions["kitsedit"] = "true";
      permissions["kitsview"] = "true";

    }
    else if ((permissions.kitscheckout && permissions.kitscreate && permissions.kitsdelete
      && permissions.kitsedit && permissions.kitsview) === false) {
      permissions["kitsAll"] = "false";
      permissions["kitscheckout"] = "false";
      permissions["kitscreate"] = "false";
      permissions["kitsdelete"] = "false";
      permissions["kitsedit"] = "false";
      permissions["kitsview"] = "false";

    }
    this.setState({ permissions });
    if ((permissions.userscreate && permissions.usersdelete && permissions.usersedit
      && permissions.usersview) === true) {
      permissions["usersAll"] = "true";
      permissions["userscreate"] = "true";
      permissions["usersdelete"] = "true";
      permissions["usersedit"] = "true";
      permissions["usersview"] = "true";


    }
    else if ((permissions.userscreate && permissions.usersdelete && permissions.usersedit
      && permissions.usersview) === false) {
      permissions["usersAll"] = "false";
      permissions["userscreate"] = "false";
      permissions["usersdelete"] = "false";
      permissions["usersedit"] = "false";
      permissions["usersview"] = "false";


    }
    this.setState({ permissions });
    if ((permissions.modelsview && permissions.modelsedit && permissions.modelsdelete
      && permissions.modelscreate) === true) {
      permissions["modelsAll"] = "true";
      permissions["modelsview"] = "true";
      permissions["modelsedit"] = "true";
      permissions["modelsdelete"] = "true";
      permissions["modelscreate"] = "true";



    }
    else if ((permissions.modelsview && permissions.modelsedit && permissions.modelsdelete
      && permissions.modelscreate) === false) {
      permissions["modelsAll"] = "false";
      permissions["modelsview"] = "false";
      permissions["modelsedit"] = "false";
      permissions["modelsdelete"] = "false";
      permissions["modelscreate"] = "false";

    }

    this.setState({ permissions });



    if ((permissions.departmentsview && permissions.departmentsedit && permissions.departmentsdelete
      && permissions.departmentscreate) === true) {
      permissions["departmentsAll"] = "true";
      permissions["departmentsview"] = "true";
      permissions["departmentsedit"] = "true";
      permissions["departmentsdelete"] = "true";
      permissions["departmentscreate"] = "true";



    }
    else if ((permissions.departmentsview && permissions.departmentsedit && permissions.departmentsdelete
      && permissions.departmentscreate) === false) {
      permissions["departmentsAll"] = "false";
      permissions["departmentsview"] = "false";
      permissions["departmentsedit"] = "false";
      permissions["departmentsdelete"] = "false";
      permissions["departmentscreate"] = "false";

    }

    this.setState({ permissions });

    if ((permissions.customfieldsview && permissions.customfieldsedit && permissions.customfieldsdelete
      && permissions.customfieldscreate) === true) {
      permissions["customfieldsAll"] = "true";
      permissions["customfieldsview"] = "true";
      permissions["customfieldsedit"] = "true";
      permissions["customfieldsdelete"] = "true";
      permissions["customfieldscreate"] = "true";


    }
    else if ((permissions.customfieldsview && permissions.customfieldsedit && permissions.customfieldsdelete
      && permissions.customfieldscreate) === false) {
      permissions["customfieldsAll"] = "false";
      permissions["customfieldsview"] = "false";
      permissions["customfieldsedit"] = "false";
      permissions["customfieldsdelete"] = "false";
      permissions["customfieldscreate"] = "false";

    }

    this.setState({ permissions });

    if ((permissions.suppliersview && permissions.suppliersedit && permissions.suppliersdelete
      && permissions.supplierscreate) === true) {
      permissions["suppliersAll"] = "true";
      permissions["suppliersview"] = "true";
      permissions["suppliersedit"] = "true";
      permissions["suppliersdelete"] = "true";
      permissions["supplierscreate"] = "true";


    }
    else if ((permissions.suppliersview && permissions.suppliersedit && permissions.suppliersdelete
      && permissions.supplierscreate) === false) {
      permissions["suppliersAll"] = "false";
      permissions["suppliersview"] = "false";
      permissions["suppliersedit"] = "false";
      permissions["suppliersdelete"] = "false";
      permissions["supplierscreate"] = "false";

    }

    this.setState({ permissions });



    if ((permissions.manufacturersview && permissions.manufacturersedit && permissions.manufacturersdelete
      && permissions.manufacturerscreate) === true) {
      permissions["manufacturersAll"] = "true";
      permissions["manufacturersview"] = "true";
      permissions["manufacturersedit"] = "true";
      permissions["manufacturersdelete"] = "true";
      permissions["manufacturerscreate"] = "true";



    }
    else if ((permissions.manufacturersview && permissions.manufacturersedit && permissions.manufacturersdelete
      && permissions.manufacturerscreate) === false) {
      permissions["manufacturersAll"] = "false";
      permissions["manufacturersview"] = "false";
      permissions["manufacturersedit"] = "false";
      permissions["manufacturersdelete"] = "false";
      permissions["manufacturerscreate"] = "false";

    }

    this.setState({ permissions });


    if ((permissions.depreciationsview && permissions.depreciationsedit && permissions.depreciationsdelete
      && permissions.depreciationscreate) === true) {
      permissions["depreciationsAll"] = "true";
      permissions["depreciationsview"] = "true";
      permissions["depreciationsedit"] = "true";
      permissions["depreciationsdelete"] = "true";
      permissions["depreciationscreate"] = "true";



    }
    else if ((permissions.depreciationsview && permissions.depreciationsedit && permissions.depreciationsdelete
      && permissions.depreciationscreate) === false) {
      permissions["depreciationsAll"] = "false";
      permissions["depreciationsview"] = "false";
      permissions["depreciationsedit"] = "false";
      permissions["depreciationsdelete"] = "false";
      permissions["depreciationscreate"] = "false";


    }

    this.setState({ permissions });


    if ((permissions.locationsview && permissions.locationsedit && permissions.locationsdelete
      && permissions.locationscreate) === true) {
      permissions["locationsAll"] = "true";
      permissions["locationsview"] = "true";
      permissions["locationsedit"] = "true";
      permissions["locationsdelete"] = "true";
      permissions["locationscreate"] = "true";



    }
    else if ((permissions.locationsview && permissions.locationsedit && permissions.locationsdelete
      && permissions.locationscreate) === false) {
      permissions["locationsAll"] = "false";
      permissions["locationsview"] = "false";
      permissions["locationsedit"] = "false";
      permissions["locationsdelete"] = "false";
      permissions["locationscreate"] = "false";

    }

    this.setState({ permissions });


    if ((permissions.companiesview && permissions.companiesedit && permissions.companiesdelete
      && permissions.companiescreate) === true) {
      permissions["companiesAll"] = "true";
      permissions["companiesview"] = "true";
      permissions["companiesedit"] = "true";
      permissions["companiesdelete"] = "true";
      permissions["companiescreate"] = "true";
    }
    else if ((permissions.companiesview && permissions.companiesedit && permissions.companiesdelete
      && permissions.companiescreate) === false) {
      permissions["companiesAll"] = "false";
      permissions["companiesview"] = "false";
      permissions["companiesedit"] = "false";
      permissions["companiesdelete"] = "false";
      permissions["companiescreate"] = "false";

    }

    this.setState({ permissions });
  
        if ((permissions.selftwo_factor && permissions.selfapi && permissions.selfedit_location
          && permissions.selfcheckout_assets) === true) {
          permissions["self"] = "true";
          permissions["two_factor"] = "true";
          permissions["api"] = "true";
          permissions["edit_location"] = "true";
          permissions["checkout_assets"] = "true";
    
}
      
       else if ((permissions.selftwo_factor && permissions.selfapi && permissions.selfedit_location
          && permissions.selfcheckout_assets) === false) {
          permissions["self"] = "false";
          permissions["two_factor"] = "false";
          permissions["api"] = "false";
          permissions["edit_location"] = "false";
          permissions["checkout_assets"] = "false";
    
}
    
        this.setState({ permissions });

  }

  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  }
  onPermissionValueChange = (event) => {
    let permissions = this.state.permissions;
    permissions[event.target.name] = event.target.value;
    this.setState({ permissions });
    //console.log(permissions[event.target.name] ,this.state.permissions.superuser);
  }
  onPermissionassetAllChange = (event) => {

    let permissions = this.state.permissions;
    permissions["assetsAll"] = event.target.value;
    permissions["assetscreate"] = event.target.value;
    permissions["assetsedit"] = event.target.value;
    permissions["assetsview"] = event.target.value;
    permissions["assetsdelete"] = event.target.value;
    permissions["assetscheckin"] = event.target.value;
    permissions["assetscheckout"] = event.target.value;
    permissions["assetsaudit"] = event.target.value;
    permissions["viewrequestable"] = event.target.value;
    this.setState({ permissions });

  }
  onPermissionaccessoriesAllChange = (event) => {
    let permissions = this.state.permissions;
    permissions["accessoriesAll"] = event.target.value;
    permissions["accessoriescreate"] = event.target.value;
    permissions["accessoriesedit"] = event.target.value;
    permissions["accessoriesview"] = event.target.value;
    permissions["accessoriesdelete"] = event.target.value;
    permissions["accessoriescheckin"] = event.target.value;
    permissions["accessoriescheckout"] = event.target.value;
    this.setState({ permissions });
  }
  onPermissionconsumablesAllChange = (event) => {
    let permissions = this.state.permissions;
    permissions["consumablesAll"] = event.target.value;
    permissions["consumablescreate"] = event.target.value;
    permissions["consumablesedit"] = event.target.value;
    permissions["consumablesview"] = event.target.value;
    permissions["consumablesdelete"] = event.target.value;
    permissions["consumablescheckout"] = event.target.value;
    this.setState({ permissions });
  }
  onPermissionlicensesAllChange = (event) => {
    let permissions = this.state.permissions;
    permissions["licensesAll"] = event.target.value;
    permissions["licensescreate"] = event.target.value;
    permissions["licensesedit"] = event.target.value;
    permissions["licensesview"] = event.target.value;
    permissions["licensesdelete"] = event.target.value;
    permissions["licensescheckout"] = event.target.value;
    permissions["licenseskey"] = event.target.value;
    this.setState({ permissions });
  }

  onPermissioncomponentsAllChange = (event) => {
    let permissions = this.state.permissions;
    permissions["componentsAll"] = event.target.value;
    permissions["componentscreate"] = event.target.value;
    permissions["componentsedit"] = event.target.value;
    permissions["componentsview"] = event.target.value;
    permissions["componentsdelete"] = event.target.value;
    permissions["componentscheckout"] = event.target.value;
    permissions["componentscheckin"] = event.target.value;
    this.setState({ permissions });
  }
  onPermissionkitsAllChange = (event) => {
    let permissions = this.state.permissions;
    permissions["kitsAll"] = event.target.value;
    permissions["kitscreate"] = event.target.value;
    permissions["kitsedit"] = event.target.value;
    permissions["kitsview"] = event.target.value;
    permissions["kitsdelete"] = event.target.value;
    permissions["kitscheckout"] = event.target.value;
    this.setState({ permissions });
  }

  onPermissionusersAllChange = (event) => {
    let permissions = this.state.permissions;
    permissions["usersAll"] = event.target.value;
    permissions["userscreate"] = event.target.value;
    permissions["usersedit"] = event.target.value;
    permissions["usersview"] = event.target.value;
    permissions["usersdelete"] = event.target.value;
    this.setState({ permissions });
  }


  onPermissionmodelsAllChange = (event) => {
    let permissions = this.state.permissions;
    permissions["modelsAll"] = event.target.value;
    permissions["modelscreate"] = event.target.value;
    permissions["modelsedit"] = event.target.value;
    permissions["modelsview"] = event.target.value;
    permissions["modelsdelete"] = event.target.value;
    this.setState({ permissions });

  }


  onPermissioncategoriesAllChange = (event) => {

    let permissions = this.state.permissions;
    permissions["categoriesAll"] = event.target.value;
    permissions["categoriescreate"] = event.target.value;
    permissions["categoriesedit"] = event.target.value;
    permissions["categoriesview"] = event.target.value;
    permissions["categoriesdelete"] = event.target.value;
    this.setState({ permissions });

  }


  onPermissiondepartmentsAllChange = (event) => {

    let permissions = this.state.permissions;
    permissions["departmentsAll"] = event.target.value;
    permissions["departmentscreate"] = event.target.value;
    permissions["departmentsedit"] = event.target.value;
    permissions["departmentsview"] = event.target.value;
    permissions["departmentsdelete"] = event.target.value;
    this.setState({ permissions });

  }


  onPermissionstatuslabelsAllChange = (event) => {

    let permissions = this.state.permissions;
    permissions["statuslabelsAll"] = event.target.value;
    permissions["statuslabelscreate"] = event.target.value;
    permissions["statuslabelsedit"] = event.target.value;
    permissions["statuslabelsview"] = event.target.value;
    permissions["statuslabelsdelete"] = event.target.value;
    this.setState({ permissions });

  }


  onPermissioncustomfieldsAllChange = (event) => {

    let permissions = this.state.permissions;
    permissions["customfieldsAll"] = event.target.value;
    permissions["customfieldscreate"] = event.target.value;
    permissions["customfieldsedit"] = event.target.value;
    permissions["customfieldsview"] = event.target.value;
    permissions["customfieldsdelete"] = event.target.value;
    this.setState({ permissions });

  }


  onPermissionsuppliersAllChange = (event) => {

    let permissions = this.state.permissions;
    permissions["suppliersAll"] = event.target.value;
    permissions["supplierscreate"] = event.target.value;
    permissions["suppliersedit"] = event.target.value;
    permissions["suppliersview"] = event.target.value;
    permissions["suppliersdelete"] = event.target.value;
    this.setState({ permissions });

  }


  onPermissionmanufacturersAllChange = (event) => {

    let permissions = this.state.permissions;
    permissions["manufacturersAll"] = event.target.value;
    permissions["manufacturerscreate"] = event.target.value;
    permissions["manufacturersedit"] = event.target.value;
    permissions["manufacturersview"] = event.target.value;
    permissions["manufacturersdelete"] = event.target.value;
    this.setState({ permissions });

  }

  onPermissiondepreciationsAllChange = (event) => {

    let permissions = this.state.permissions;
    permissions["depreciationsAll"] = event.target.value;
    permissions["depreciationscreate"] = event.target.value;
    permissions["depreciationsedit"] = event.target.value;
    permissions["depreciationsview"] = event.target.value;
    permissions["depreciationsdelete"] = event.target.value;
    this.setState({ permissions });

  }

  onPermissionlocationsAllChange = (event) => {

    let permissions = this.state.permissions;
    permissions["locationsAll"] = event.target.value;
    permissions["locationscreate"] = event.target.value;
    permissions["locationsedit"] = event.target.value;
    permissions["locationsview"] = event.target.value;
    permissions["locationsdelete"] = event.target.value;
    this.setState({ permissions });

  }

  onPermissioncompaniesAllChange = (event) => {

    let permissions = this.state.permissions;
    permissions["companiesAll"] = event.target.value;
    permissions["companiescreate"] = event.target.value;
    permissions["companiesedit"] = event.target.value;
    permissions["companiesview"] = event.target.value;
    permissions["companiesdelete"] = event.target.value;
    this.setState({ permissions });

  }
    

  onPermissionselfAllChange = (event) => {

    let permissions = this.state.permissions;
    permissions["self"] = event.target.value;
    permissions["two_factor"] = event.target.value;
    permissions["api"] = event.target.value;
    permissions["edit_location"] = event.target.value;
    permissions["checkout_assets"] = event.target.value;
    this.setState({ permissions });

  }
  mySubmitHandler = async (event) => {
    event.preventDefault();
    if (this.validateForm()) {
    await axios({
      method: 'put',
      url: Domain + '/groups/' + this.props.GroupDetails.id,
      data: JSON.stringify({
        name: this.state.GroupName,
        permissions: {
          "superuser": this.state.permissions.superuser,
          "admin": this.state.permissions.admin === 'true' ? true : false,
          "import": this.state.permissions.importcsv === 'true' ? true : false,
          "reportview": this.state.permissions.reportview === 'true' ? true : false,
          "assetsaudit": this.state.permissions.assetsaudit === 'true' ? true : false,
          "assetscheckin": this.state.permissions.assetscheckin === 'true' ? true : false,
          "assetscheckout": this.state.permissions.assetscheckout === 'true' ? true : false,
          "assetscreate": this.state.permissions.assetscreate === 'true' ? true : false,
          "assetsdelete": this.state.permissions.assetsdelete === 'true' ? true : false,
          "assetsedit": this.state.permissions.assetsedit === 'true' ? true : false,
          "assetsview": this.state.permissions.assetsview === 'true' ? true : false,
          "assetsviewrequestable": this.state.permissions.viewrequestable === 'true' ? true : false,
          "accessoriescheckin": this.state.permissions.accessoriescheckin === 'true' ? true : false,
          "accessoriescheckout": this.state.permissions.accessoriescheckout === 'true' ? true : false,
          "accessoriescreate": this.state.permissions.accessoriescreate === 'true' ? true : false,
          "accessoriesdelete": this.state.permissions.accessoriesdelete === 'true' ? true : false,
          "accessoriesedit": this.state.permissions.accessoriesedit === 'true' ? true : false,
          "accessoriesview": this.state.permissions.accessoriesview === 'true' ? true : false,
          "consumablescheckout": this.state.permissions.consumablescheckout === 'true' ? true : false,
          "consumablescreate": this.state.permissions.consumablescreate === 'true' ? true : false,
          "consumablesdelete": this.state.permissions.consumablesdelete === 'true' ? true : false,
          "consumablesedit": this.state.permissions.consumablesedit === 'true' ? true : false,
          "consumablesview": this.state.permissions.consumablesview === 'true' ? true : false,
          "licenseskeys": this.state.permissions.licenseskey === 'true' ? true : false,
          "licensescheckout": this.state.permissions.licensescheckout === 'true' ? true : false,
          "licensescreate": this.state.permissions.licensescreate === 'true' ? true : false,
          "licensesdelete": this.state.permissions.licensesdelete === 'true' ? true : false,
          "licensesedit": this.state.permissions.licensesedit === 'true' ? true : false,
          "licensesview": this.state.permissions.licensesview === 'true' ? true : false,
          "componentscheckin": this.state.permissions.componentscheckout === 'true' ? true : false,
          "componentscheckout": this.state.permissions.componentscheckin === 'true' ? true : false,
          "componentscreate": this.state.permissions.componentscreate === 'true' ? true : false,
          "componentsdelete": this.state.permissions.componentsdelete === 'true' ? true : false,
          "componentsedit": this.state.permissions.componentsedit === 'true' ? true : false,
          "componentsview": this.state.permissions.componentsview === 'true' ? true : false,

          "kitscheckout": this.state.permissions.kitscheckout === 'true' ? true : false,
          "kitscreate": this.state.permissions.kitscreate === 'true' ? true : false,
          "kitsdelete": this.state.permissions.kitsdelete === 'true' ? true : false,
          "kitsedit": this.state.permissions.kitsedit === 'true' ? true : false,
          "kitsview": this.state.permissions.kitsview === 'true' ? true : false,

          "userscreate": this.state.permissions.userscreate === 'true' ? true : false,
          "usersdelete": this.state.permissions.usersdelete === 'true' ? true : false,
          "usersedit": this.state.permissions.usersedit === 'true' ? true : false,
          "usersview": this.state.permissions.usersview === 'true' ? true : false,

          "modelscreate": this.state.permissions.modelscreate === 'true' ? true : false,
          "modelsdelete": this.state.permissions.modelsdelete === 'true' ? true : false,
          "modelsedit": this.state.permissions.modelsedit === 'true' ? true : false,
          "modelsview": this.state.permissions.modelsview === 'true' ? true : false,

          "departmentscreate": this.state.permissions.departmentscreate === 'true' ? true : false,
          "departmentsdelete": this.state.permissions.departmentsdelete === 'true' ? true : false,
          "departmentsedit": this.state.permissions.departmentsedit === 'true' ? true : false,
          "departmentsview": this.state.permissions.departmentsview === 'true' ? true : false,

          "statuslabelscreate": this.state.permissions.statuslabelscreate === 'true' ? true : false,
          "statuslabelsdelete": this.state.permissions.statuslabelsdelete === 'true' ? true : false,
          "statuslabelsedit": this.state.permissions.statuslabelsedit === 'true' ? true : false,
          "statuslabelsview": this.state.permissions.statuslabelsview === 'true' ? true : false,

          "customfieldscreate": this.state.permissions.customfieldscreate === 'true' ? true : false,
          "customfieldsdelete": this.state.permissions.customfieldsdelete === 'true' ? true : false,
          "customfieldsedit": this.state.permissions.customfieldsedit === 'true' ? true : false,
          "customfieldsview": this.state.permissions.customfieldsview === 'true' ? true : false,

          "categoriescreate": this.state.permissions.categoriescreate === 'true' ? true : false,
          "categoriesdelete": this.state.permissions.categoriesdelete === 'true' ? true : false,
          "categoriesedit": this.state.permissions.categoriesedit === 'true' ? true : false,
          "categoriesview": this.state.permissions.categoriesview === 'true' ? true : false,

          "supplierscreate": this.state.permissions.supplierscreate === 'true' ? true : false,
          "suppliersdelete": this.state.permissions.suppliersdelete === 'true' ? true : false,
          "suppliersedit": this.state.permissions.suppliersedit === 'true' ? true : false,
          "suppliersview": this.state.permissions.suppliersview === 'true' ? true : false,

          "manufacturerscreate": this.state.permissions.manufacturerscreate === 'true' ? true : false,
          "manufacturersdelete": this.state.permissions.manufacturersdelete === 'true' ? true : false,
          "manufacturersedit": this.state.permissions.manufacturersedit === 'true' ? true : false,
          "manufacturersview": this.state.permissions.manufacturersview === 'true' ? true : false,

          "depreciationscreate": this.state.permissions.depreciationscreate === 'true' ? true : false,
          "depreciationsdelete": this.state.permissions.depreciationsdelete === 'true' ? true : false,
          "depreciationsedit": this.state.permissions.depreciationsedit === 'true' ? true : false,
          "depreciationsview": this.state.permissions.depreciationsview === 'true' ? true : false,

          "locationscreate": this.state.permissions.locationscreate === 'true' ? true : false,
          "locationsdelete": this.state.permissions.locationsdelete === 'true' ? true : false,
          "locationsedit": this.state.permissions.locationsedit === 'true' ? true : false,
          "locationsview": this.state.permissions.locationsview === 'true' ? true : false,

          "companiescreate": this.state.permissions.companiescreate === 'true' ? true : false,
          "companiesdelete": this.state.permissions.companiesdelete === 'true' ? true : false,
          "companiesedit": this.state.permissions.companiesedit === 'true' ? true : false,
          "companiesview": this.state.permissions.companiesview === 'true' ? true : false,

          "selftwo_factor": this.state.permissions.two_factor === 'true' ? true : false,
          "selfapi": this.state.permissions.api === 'true' ? true : false,
          "selfedit_location": this.state.permissions.edit_location === 'true' ? true : false,
          "selfcheckout_assets": this.state.permissions.checkout_assets === 'true' ? true : false
        }
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function (response) {
      NotificationMessage = response.data.message;

    })
      .catch(function (response) {
        console.log(response);
      });

    this.setState({ showNotifications: true });
    this.setState({ ShowUpdate: false });
    this.setState({ ShowMain: true });

    }
  }
  validateForm() {
    let state = this.state,errors = {},formIsValid = true;
    if (!state["GroupName"]) {
      formIsValid = false;
      errors["GroupName"] = "Please enter group name";
    } 
    this.setState({ errors: errors  });
    return formIsValid;
  }

  BackBtnClick = () => {
    const { ShowUpdate } = this.state;
    this.setState({ ShowUpdate: !ShowUpdate });
    this.setState({ showNotifications: false })
    NotificationMessage = "";
  };

  render() {
    const { t } = this.props;
    const {ShowUpdate} = this.state;
    if (ShowUpdate) {
      return (
        <div>
          <div>
            <div>
              <div class="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 class="h3 mb-0 text-gray-800"name="updategroup"> {t('group.updategroup')}</h1>
                <button name="back" onClick={this.BackBtnClick} className="btn-sm btn-primary shadow-sm mb-0  customlogin-btn">
                 {t('button.back')}</button>
              </div>
              <div class="container">
                <div class="row justify-content-center">
                  <div class="col-xl-10 col-lg-12 col-md-9">
                    <div class="card o-hidden border-0 shadow-lg my-5">
                      <div class="card-body p-0">
                        <div class="row customgroup-row ">
                          <div class="col-xs-10 col-lg-10 col-md-9">
                            <div class="customgroup ">
                              <form class="user" onSubmit={this.mySubmitHandler}>
                                <div class="form-group row">
                                  <div class="col-sm-6 mb-3 mb-sm-0 customgroup-text">
                                    <label for="GroupName" class=" control-label customlabel-textcolor">{t('group.GroupName')} <i style={{ color: "red" }}>*</i> </label>
                                    <input type="text" class="form-control"  id="GroupName" name="GroupName"   onChange={this.myChangeHandler} value={this.state.GroupName}
                                      placeholder={t('group.GroupName')}/>
                                      <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.GroupName}</div>
                                  </div>
                                  <table class="table table table-striped mb-0">
                                    <thead>
                                      <tr class="col-md-12">
                                        <th class="col-md-6">{t('group.permission')}</th>
                                        <th class="col-md-2">{t('group.grant')}</th>
                                        <th class="col-md-2">{t('group.deny')}</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td><h3>{t('group.superuser')}</h3></td>
                                        <td><input type="radio" value="1" name="superuser" checked={this.state.permissions.superuser==="1"} onChange={this.onPermissionValueChange} /></td>
                                        <td><input type="radio" value="0" name="superuser" checked={this.state.permissions.superuser === "0"} onChange={this.onPermissionValueChange} /></td>

                                      </tr>
                                      <tr>
                                        <td><h4>{t('group.admin')}</h4></td>
                                        <td><input type="radio" value="true" name="admin" checked={this.state.permissions.admin === "true"} onChange={this.onPermissionValueChange} /></td>
                                        <td><input type="radio" value="false" name="admin" checked={this.state.permissions.admin === "false"} onChange={this.onPermissionValueChange} /></td>

                                      </tr>
                                      <tr>
                                        <td><h4>{t('group.csvimport')}</h4></td>
                                        <td><input type="radio" value="true" name="importcsv" checked={this.state.permissions.importcsv === "true"} onChange={this.onPermissionValueChange} /></td>
                                        <td><input type="radio" value="false" name="importcsv" checked={this.state.permissions.importcsv === "false"} onChange={this.onPermissionValueChange} /></td>
                                      </tr>
                                      <tr>
                                        <td><h4>{t('group.report')}</h4></td>
                                        <td><input type="radio" value="true" name="reportview" checked={this.state.permissions.reportview === "true"} onChange={this.onPermissionValueChange} /></td>
                                        <td><input type="radio" value="false" name="reportview" checked={this.state.permissions.reportview === "false"} onChange={this.onPermissionValueChange} /></td>

                                      </tr>
                                    </tbody>
                                    <tbody>

                                      <tr>
                                        <td><h5>{t('group.asset')}</h5></td>
                                                                <td><input type="radio" value="true" name="assetsAll" id="assetsAll" checked={this.state.permissions.assetsAll === "true"} onChange={this.onPermissionassetAllChange} /></td>
                                        <td><input type="radio" value="false" name="assetsAll" id="assetsAll" checked={this.state.permissions.assetsAll === "false"} onChange={this.onPermissionassetAllChange} /></td>

                                      </tr>
                                    </tbody>

                                    <tr hidden="true">
                                      <td>{t('group.view')}</td>
                                      <td><input type="radio" value="true" name="assetsview" checked={this.state.permissions.assetsview === "true"} onChange={this.onPermissionValueChange} /></td>
                                      <td><input type="radio" value="false" name="assetsview" checked={this.state.permissions.assetsview === "false"} onChange={this.onPermissionValueChange} /></td>

                                    </tr>


                                    <tr hidden="true">
                                      <td>{t('group.create')}</td>
                                      <td><input type="radio" value="true" name="assetscreate" checked={this.state.permissions.assetscreate === "true"} onChange={this.onPermissionValueChange} /></td>
                                      <td><input type="radio" value="false" name="assetscreate" checked={this.state.permissions.assetscreate === "false"} onChange={this.onPermissionValueChange} /></td>

                                    </tr>
                                    <tr hidden="true">
                                      <td>{t('group.edit')}</td>
                                      <td><input type="radio" value="true" name="assetsedit" checked={this.state.permissions.assetsedit === "true"} onChange={this.onPermissionValueChange} /></td>
                                      <td><input type="radio" value="false" name="assetsedit" checked={this.state.permissions.assetsedit === "false"} onChange={this.onPermissionValueChange} /></td>

                                    </tr>
                                    <tr hidden="true">
                                      <td>{t('group.delete')}</td>
                                      <td><input type="radio" value="true" name="assetsdelete" checked={this.state.permissions.assetsdelete === "true"} onChange={this.onPermissionValueChange} /></td>
                                      <td><input type="radio" value="false" name="assetsdelete" checked={this.state.permissions.assetsdelete === "false"} onChange={this.onPermissionValueChange} /></td>

                                    </tr>
                                    <tr hidden="true">
                                      <td>{t('group.checkin')}</td>
                                      <td><input type="radio" value="true" name="assetscheckin" checked={this.state.permissions.assetscheckin === "true"} onChange={this.onPermissionValueChange} /></td>
                                      <td><input type="radio" value="false" name="assetscheckin" checked={this.state.permissions.assetscheckin === "false"} onChange={this.onPermissionValueChange} /></td>

                                    </tr>
                                    <tr hidden="true">
                                      <td>{t('group.checkout')}</td>
                                      <td><input type="radio" value="true" name="assetscheckout" checked={this.state.permissions.assetscheckout === "true"} onChange={this.onPermissionValueChange} /></td>
                                      <td><input type="radio" value="false" name="assetscheckout" checked={this.state.permissions.assetscheckout === "false"} onChange={this.onPermissionValueChange} /></td>

                                    </tr>
                                    <tr hidden="true">
                                      <td>{t('group.audit')}</td>
                                      <td><input type="radio" value="true" name="assetsaudit" checked={this.state.permissions.assetsaudit === "true"} onChange={this.onPermissionValueChange} /></td>
                                      <td><input type="radio" value="false" name="assetsaudit" checked={this.state.permissions.assetsaudit === "false"} onChange={this.onPermissionValueChange} /></td>

                                    </tr>
                                    <tr hidden="true">
                                      <td>{t('group.reqasset')}</td>
                                      <td><input type="radio" value="true" name="viewrequestable" checked={this.state.permissions.viewrequestable === "true"} onChange={this.onPermissionValueChange} /></td>
                                      <td><input type="radio" value="false" name="viewrequestable" checked={this.state.permissions.viewrequestable === "false"} onChange={this.onPermissionValueChange} /></td>

                                    </tr>

                                    <tbody>
                                      <tr>
                                        <td><h5>{t('group.accessory')}</h5></td>
                                        <td><input type="radio" value="true" name="accessoriesAll" checked={this.state.permissions.accessoriesAll === "true"} onChange={this.onPermissionaccessoriesAllChange} /></td>
                                        <td><input type="radio" value="false" name="accessoriesAll" checked={this.state.permissions.accessoriesAll === "false"} onChange={this.onPermissionaccessoriesAllChange} /></td>

                                      </tr>
                                    </tbody>

                                    <tr hidden="true">
                                      <td>{t('group.view')}</td>
                                      <td><input type="radio" value="true" name="accessoriesview" checked={this.state.permissions.accessoriesview === "true"} onChange={this.onPermissionValueChange} /></td>
                                      <td><input type="radio" value="false" name="accessoriesview" checked={this.state.permissions.accessoriesview === "false"} onChange={this.onPermissionValueChange} /></td>

                                    </tr>


                                    <tr hidden="true">
                                      <td>{t('group.create')}</td>
                                      <td><input type="radio" value="true" name="accessoriescreate" checked={this.state.permissions.accessoriescreate === "true"} onChange={this.onPermissionValueChange} /></td>
                                      <td><input type="radio" value="false" name="accessoriescreate" checked={this.state.permissions.accessoriescreate === "false"} onChange={this.onPermissionValueChange} /></td>

                                    </tr>
                                    <tr hidden="true">
                                      <td>{t('group.edit')}</td>
                                      <td><input type="radio" value="true" name="accessoriesedit" checked={this.state.permissions.accessoriesedit === "true"} onChange={this.onPermissionValueChange} /></td>
                                      <td><input type="radio" value="false" name="accessoriesedit" checked={this.state.permissions.accessoriesedit === "false"} onChange={this.onPermissionValueChange} /></td>

                                    </tr>
                                    <tr hidden="true">
                                      <td>{t('group.delete')}</td>
                                      <td><input type="radio" value="true" name="accessoriesdelete" checked={this.state.permissions.accessoriesdelete === "true"} onChange={this.onPermissionValueChange} /></td>
                                      <td><input type="radio" value="false" name="accessoriesdelete" checked={this.state.permissions.accessoriesdelete === "false"} onChange={this.onPermissionValueChange} /></td>

                                    </tr>
                                    <tr hidden="true">
                                      <td>{t('group.checkin')}</td>
                                      <td><input type="radio" value="true" name="accessoriescheckin" checked={this.state.permissions.accessoriescheckin === "true"} onChange={this.onPermissionValueChange} /></td>
                                      <td><input type="radio" value="false" name="accessoriescheckin" checked={this.state.permissions.accessoriescheckin === "false"} onChange={this.onPermissionValueChange} /></td>

                                    </tr>
                                    <tr hidden="true">
                                      <td>{t('group.checkout')}</td>
                                      <td><input type="radio" value="true" name="accessoriescheckout" checked={this.state.permissions.accessoriescheckout === "true"} onChange={this.onPermissionValueChange} /></td>
                                      <td><input type="radio" value="false" name="accessoriescheckout" checked={this.state.permissions.accessoriescheckout === "false"} onChange={this.onPermissionValueChange} /></td>

                                    </tr>

                                    <tbody>
                                      <tr>
                                        <td><h5>{t('group.consumable')}</h5></td>
                                        <td><input type="radio" value="true" name="consumablesAll" checked={this.state.permissions.consumablesAll === "true"} onChange={this.onPermissionconsumablesAllChange} /></td>
                                        <td><input type="radio" value="false" name="consumablesAll" checked={this.state.permissions.consumablesAll === "false"} onChange={this.onPermissionconsumablesAllChange} /></td>

                                      </tr>
                                    </tbody>

                                    <tr hidden="true">
                                      <td>{t('group.view')}</td>
                                      <td><input type="radio" value="true" name="consumablesview" checked={this.state.permissions.consumablesview === "true"} onChange={this.onPermissionValueChange} /></td>
                                      <td><input type="radio" value="false" name="consumablesview" checked={this.state.permissions.consumablesview === "false"} onChange={this.onPermissionValueChange} /></td>

                                    </tr>


                                    <tr hidden="true">
                                      <td>{t('group.create')}</td>
                                      <td><input type="radio" value="true" name="consumablescreate" checked={this.state.permissions.consumablescreate === "true"} onChange={this.onPermissionValueChange} /></td>
                                      <td><input type="radio" value="false" name="consumablescreate" checked={this.state.permissions.consumablescreate === "false"} onChange={this.onPermissionValueChange} /></td>

                                    </tr>
                                    <tr hidden="true">
                                      <td>{t('group.edit')}</td>
                                      <td><input type="radio" value="true" name="consumablesedit" checked={this.state.permissions.consumablesedit === "true"} onChange={this.onPermissionValueChange} /></td>
                                      <td><input type="radio" value="false" name="consumablesedit" checked={this.state.permissions.consumablesedit === "false"} onChange={this.onPermissionValueChange} /></td>

                                    </tr>
                                    <tr hidden="true">
                                      <td>{t('group.delete')}</td>
                                      <td><input type="radio" value="true" name="consumablesdelete" checked={this.state.permissions.consumablesdelete === "true"} onChange={this.onPermissionValueChange} /></td>
                                      <td><input type="radio" value="false" name="consumablesdelete" checked={this.state.permissions.consumablesdelete === "false"} onChange={this.onPermissionValueChange} /></td>

                                    </tr>

                                    <tr hidden="true">
                                      <td>{t('group.checkout')}</td>
                                      <td><input type="radio" value="true" name="consumablescheckout" checked={this.state.permissions.consumablescheckout === "true"} onChange={this.onPermissionValueChange} /></td>
                                      <td><input type="radio" value="false" name="consumablescheckout" checked={this.state.permissions.consumablescheckout === "false"} onChange={this.onPermissionValueChange} /></td>

                                    </tr>
                                    <tbody>
                                      <tr>
                                        <td><h5>{t('group.license')}</h5></td>
                                        <td><input type="radio" value="true" name="licensesAll" checked={this.state.permissions.licensesAll === "true"} onChange={this.onPermissionlicensesAllChange} /></td>
                                        <td><input type="radio" value="false" name="licensesAll" checked={this.state.permissions.licensesAll === "false"} onChange={this.onPermissionlicensesAllChange} /></td>

                                      </tr>
                                    </tbody>

                                    <tr hidden="true">
                                      <td>{t('group.view')}</td>
                                      <td><input type="radio" value="true" name="licensesview" checked={this.state.permissions.licensesview === "true"} onChange={this.onPermissionValueChange} /></td>
                                      <td><input type="radio" value="false" name="licensesview" checked={this.state.permissions.licensesview === "false"} onChange={this.onPermissionValueChange} /></td>

                                    </tr>


                                    <tr hidden="true">
                                      <td>{t('group.create')}</td>
                                      <td><input type="radio" value="true" name="licensescreate" checked={this.state.permissions.licensescreate === "true"} onChange={this.onPermissionValueChange} /></td>
                                      <td><input type="radio" value="false" name="licensescreate" checked={this.state.permissions.licensescreate === "false"} onChange={this.onPermissionValueChange} /></td>

                                    </tr>
                                    <tr hidden="true">
                                      <td>{t('group.edit')}</td>
                                      <td><input type="radio" value="true" name="licensesedit" checked={this.state.permissions.licensesedit === "true"} onChange={this.onPermissionValueChange} /></td>
                                      <td><input type="radio" value="false" name="licensesedit" checked={this.state.permissions.licensesedit === "false"} onChange={this.onPermissionValueChange} /></td>

                                    </tr>
                                    <tr hidden="true">
                                      <td>{t('group.delete')}</td>
                                      <td><input type="radio" value="true" name="licensesdelete" checked={this.state.permissions.licensesdelete === "true"} onChange={this.onPermissionValueChange} /></td>
                                      <td><input type="radio" value="false" name="licensesdelete" checked={this.state.permissions.licensesdelete === "false"} onChange={this.onPermissionValueChange} /></td>

                                    </tr>

                                    <tr hidden="true">
                                      <td>{t('group.checkout')}</td>
                                      <td><input type="radio" value="true" name="licensescheckout" checked={this.state.permissions.licensescheckout === "true"} onChange={this.onPermissionValueChange} /></td>
                                      <td><input type="radio" value="false" name="licensescheckout" checked={this.state.permissions.licensescheckout === "false"} onChange={this.onPermissionValueChange} /></td>

                                    </tr>
                                    <tr hidden="true">
                                      <td>{t('group.viewlicense')}</td>
                                      <td><input type="radio" value="true" name="licenseskey" checked={this.state.permissions.licenseskey === "true"} onChange={this.onPermissionValueChange} /></td>
                                      <td><input type="radio" value="false" name="licenseskey" checked={this.state.permissions.licenseskey === "false"} onChange={this.onPermissionValueChange} /></td>

                                    </tr>
                                    <tbody>
                                      <tr>
                                        <td><h5>{t('group.component')}</h5></td>
                                        <td><input type="radio" value="true" name="componentsAll" checked={this.state.permissions.componentsAll === "true"} onChange={this.onPermissioncomponentsAllChange} /></td>
                                        <td><input type="radio" value="false" name="componentsAll" checked={this.state.permissions.componentsAll === "false"} onChange={this.onPermissioncomponentsAllChange} /></td>

                                      </tr>
                                    </tbody>
                                    <tr hidden="true">
                                      <td>{t('group.view')}</td>
                                      <td><input type="radio" value="true" name="componentsview" checked={this.state.permissions.componentsview === "true"} onChange={this.onPermissionValueChange} /></td>
                                      <td><input type="radio" value="false" name="componentsview" checked={this.state.permissions.componentsview === "false"} onChange={this.onPermissionValueChange} /></td>

                                    </tr>


                                    <tr hidden="true">
                                      <td>{t('group.create')}</td>
                                      <td><input type="radio" value="true" name="componentscreate" checked={this.state.permissions.componentscreate === "true"} onChange={this.onPermissionValueChange} /></td>
                                      <td><input type="radio" value="false" name="componentscreate" checked={this.state.permissions.componentscreate === "false"} onChange={this.onPermissionValueChange} /></td>

                                    </tr>
                                    <tr hidden="true">
                                      <td>{t('group.edit')}</td>
                                      <td><input type="radio" value="true" name="componentsedit" checked={this.state.permissions.componentsedit === "true"} onChange={this.onPermissionValueChange} /></td>
                                      <td><input type="radio" value="false" name="componentsedit" checked={this.state.permissions.componentsedit === "false"} onChange={this.onPermissionValueChange} /></td>

                                    </tr>
                                    <tr hidden="true">
                                      <td>{t('group.delete')}</td>
                                      <td><input type="radio" value="true" name="componentsdelete" checked={this.state.permissions.componentsdelete === "true"} onChange={this.onPermissionValueChange} /></td>
                                      <td><input type="radio" value="false" name="componentsdelete" checked={this.state.permissions.componentsdelete === "false"} onChange={this.onPermissionValueChange} /></td>

                                    </tr>

                                    <tr hidden="true">
                                      <td>{t('group.checkout')}</td>
                                      <td><input type="radio" value="true" name="componentscheckout" checked={this.state.permissions.componentscheckout === "true"} onChange={this.onPermissionValueChange} /></td>
                                      <td><input type="radio" value="false" name="componentscheckout" checked={this.state.permissions.componentscheckout === "false"} onChange={this.onPermissionValueChange} /></td>

                                    </tr>
                                    <tr hidden="true">
                                      <td>{t('group.checkin')}</td>
                                      <td><input type="radio" value="true" name="componentscheckin" checked={this.state.permissions.componentscheckin === "true"} onChange={this.onPermissionValueChange} /></td>
                                      <td><input type="radio" value="false" name="componentscheckin" checked={this.state.permissions.componentscheckin === "false"} onChange={this.onPermissionValueChange} /></td>

                                    </tr>
                                    {/* <tbody>
                                      <tr>
                                        <td><h5>kits</h5></td>
                                        <td><input type="radio" value="true" name="kitsAll" checked={this.state.permissions.kitsAll == "true"} onChange={this.onPermissionkitsAllChange} /></td>
                                        <td><input type="radio" value="false" name="kitsAll" checked={this.state.permissions.kitsAll == "false"} onChange={this.onPermissionkitsAllChange} /></td>

                                      </tr>
                                    </tbody>
                                    <tr hidden="true">
                                      <td>View</td>
                                      <td><input type="radio" value="true" name="kitsview" checked={this.state.permissions.kitsview == "true"} onChange={this.onPermissionValueChange} /></td>
                                      <td><input type="radio" value="false" name="kitsview" checked={this.state.permissions.kitsview == "false"} onChange={this.onPermissionValueChange} /></td>

                                    </tr>


                                    <tr hidden="true">
                                      <td>Create</td>
                                      <td><input type="radio" value="true" name="kitscreate" checked={this.state.permissions.kitscreate == "true"} onChange={this.onPermissionValueChange} /></td>
                                      <td><input type="radio" value="false" name="kitscreate" checked={this.state.permissions.kitscreate == "false"} onChange={this.onPermissionValueChange} /></td>

                                    </tr>
                                    <tr hidden="true">
                                      <td>Edit</td>
                                      <td><input type="radio" value="true" name="kitsedit" checked={this.state.permissions.kitsedit == "true"} onChange={this.onPermissionValueChange} /></td>
                                      <td><input type="radio" value="false" name="kitsedit" checked={this.state.permissions.kitsedit == "false"} onChange={this.onPermissionValueChange} /></td>

                                    </tr>
                                    <tr hidden="true">
                                      <td>Delete</td>
                                      <td><input type="radio" value="true" name="kitsdelete" checked={this.state.permissions.kitsdelete == "true"} onChange={this.onPermissionValueChange} /></td>
                                      <td><input type="radio" value="false" name="kitsdelete" checked={this.state.permissions.kitsdelete == "false"} onChange={this.onPermissionValueChange} /></td>

                                    </tr>

                                    <tr hidden="true">
                                      <td>CheckOut</td>
                                      <td><input type="radio" value="true" name="kitscheckout" checked={this.state.permissions.kitscheckout == "true"} onChange={this.onPermissionValueChange} /></td>
                                      <td><input type="radio" value="false" name="kitscheckout" checked={this.state.permissions.kitscheckout == "false"} onChange={this.onPermissionValueChange} /></td>

                                    </tr> */}
                                    <tbody>
                                      <tr>
                                        <td><h5>{t('group.user')}</h5></td>
                                        <td><input type="radio" value="true" name="usersAll" checked={this.state.permissions.usersAll === "true"} onChange={this.onPermissionusersAllChange} /></td>
                                        <td><input type="radio" value="false" name="usersAll" checked={this.state.permissions.usersAll === "false"} onChange={this.onPermissionusersAllChange} /></td>

                                      </tr>
                                    </tbody>
                                    <tr hidden="true">
                                      <td>{t('group.view')}</td>
                                      <td><input type="radio" value="true" name="usersview" checked={this.state.permissions.usersview === "true"} onChange={this.onPermissionValueChange} /></td>
                                      <td><input type="radio" value="false" name="usersview" checked={this.state.permissions.usersview === "false"} onChange={this.onPermissionValueChange} /></td>

                                    </tr>


                                    <tr hidden="true">
                                      <td>{t('group.create')}</td>
                                      <td><input type="radio" value="true" name="userscreate" checked={this.state.permissions.userscreate === "true"} onChange={this.onPermissionValueChange} /></td>
                                      <td><input type="radio" value="false" name="userscreate" checked={this.state.permissions.userscreate === "false"} onChange={this.onPermissionValueChange} /></td>

                                    </tr>
                                    <tr hidden="true">
                                      <td>{t('group.edit')}</td>
                                      <td><input type="radio" value="true" name="usersedit" checked={this.state.permissions.usersedit === "true"} onChange={this.onPermissionValueChange} /></td>
                                      <td><input type="radio" value="false" name="usersedit" checked={this.state.permissions.usersedit === "false"} onChange={this.onPermissionValueChange} /></td>

                                    </tr>
                                    <tr hidden="true">
                                      <td>{t('group.delete')}</td>
                                      <td><input type="radio" value="true" name="usersdelete" checked={this.state.permissions.usersdelete === "true"} onChange={this.onPermissionValueChange} /></td>
                                      <td><input type="radio" value="false" name="usersdelete" checked={this.state.permissions.usersdelete === "false"} onChange={this.onPermissionValueChange} /></td>

                                    </tr>

                                    <tbody>
                                      <tr>
                                        <td><h5>{t('group.models')}</h5></td>
                                        <td><input type="radio" value="true" name="modelsAll" checked={this.state.permissions.modelsAll === "true"} onChange={this.onPermissionmodelsAllChange} /></td>
                                        <td><input type="radio" value="false" name="modelsAll" checked={this.state.permissions.modelsAll === "false"} onChange={this.onPermissionmodelsAllChange} /></td>

                                      </tr>
                                    </tbody>
                                    <tr hidden="true">
                                      <td>{t('group.view')}</td>
                                      <td><input type="radio" value="true" name="modelsview" checked={this.state.permissions.modelsview === "true"} onChange={this.onPermissionValueChange} /></td>
                                      <td><input type="radio" value="false" name="modelsview" checked={this.state.permissions.modelsview === "false"} onChange={this.onPermissionValueChange} /></td>

                                    </tr>


                                    <tr hidden="true">
                                      <td>{t('group.create')}</td>
                                      <td><input type="radio" value="true" name="modelscreate" checked={this.state.permissions.modelscreate === "true"} onChange={this.onPermissionValueChange} /></td>
                                      <td><input type="radio" value="false" name="modelscreate" checked={this.state.permissions.modelscreate === "false"} onChange={this.onPermissionValueChange} /></td>

                                    </tr>
                                    <tr hidden="true">
                                      <td>{t('group.edit')}</td>
                                      <td><input type="radio" value="true" name="modelsedit" checked={this.state.permissions.modelsedit === "true"} onChange={this.onPermissionValueChange} /></td>
                                      <td><input type="radio" value="false" name="modelsedit" checked={this.state.permissions.modelsedit === "false"} onChange={this.onPermissionValueChange} /></td>

                                    </tr>
                                    <tr hidden="true">
                                      <td>{t('group.delete')}</td>
                                      <td><input type="radio" value="true" name="modelsdelete" checked={this.state.permissions.modelsdelete === "true"} onChange={this.onPermissionValueChange} /></td>
                                      <td><input type="radio" value="false" name="modelsdelete" checked={this.state.permissions.modelsdelete === "false"} onChange={this.onPermissionValueChange} /></td>

                                    </tr>


                                    <tbody>
                                      <tr>
                                        <td><h5>{t('group.category')}</h5></td>
                                        <td><input type="radio" value="true" name="categoriesAll" checked={this.state.permissions.categoriesAll === "true"} onChange={this.onPermissioncategoriesAllChange} /></td>
                                        <td><input type="radio" value="false" name="categoriesAll" checked={this.state.permissions.categoriesAll === "false"} onChange={this.onPermissioncategoriesAllChange} /></td>

                                      </tr>
                                    </tbody>

                                    <tr hidden="true">
                                      <td>{t('group.view')}</td>
                                      <td><input type="radio" value="true" name="categoriesview" checked={this.state.permissions.categoriesview === "true"} onChange={this.onPermissionValueChange} /></td>
                                      <td><input type="radio" value="false" name="categoriesview" checked={this.state.permissions.categoriesview === "false"} onChange={this.onPermissionValueChange} /></td>

                                    </tr>


                                    <tr hidden="true">
                                      <td>{t('group.create')}</td>
                                      <td><input type="radio" value="true" name="categoriescreate" checked={this.state.permissions.categoriescreate === "true"} onChange={this.onPermissionValueChange} /></td>
                                      <td><input type="radio" value="false" name="categoriescreate" checked={this.state.permissions.categoriescreate === "false"} onChange={this.onPermissionValueChange} /></td>

                                    </tr>
                                    <tr hidden="true">
                                      <td>{t('group.edit')}</td>
                                      <td><input type="radio" value="true" name="categoriesedit" checked={this.state.permissions.categoriesedit === "true"} onChange={this.onPermissionValueChange} /></td>
                                      <td><input type="radio" value="false" name="categoriesedit" checked={this.state.permissions.categoriesedit ==="false"} onChange={this.onPermissionValueChange} /></td>

                                    </tr>
                                    <tr hidden="true">
                                      <td>{t('group.delete')}</td>
                                      <td><input type="radio" value="true" name="categoriesdelete" checked={this.state.permissions.categoriesdelete === "true"} onChange={this.onPermissionValueChange} /></td>
                                      <td><input type="radio" value="false" name="categoriesdelete" checked={this.state.permissions.categoriesdelete === "false"} onChange={this.onPermissionValueChange} /></td>

                                    </tr>

                                    <tbody>
                                      <tr>
                                        <td><h5>{t('group.departments')}</h5></td>
                                        <td><input type="radio" value="true" name="departmentsAll" checked={this.state.permissions.departmentsAll === "true"} onChange={this.onPermissiondepartmentsAllChange} /></td>
                                        <td><input type="radio" value="false" name="departmentsAll" checked={this.state.permissions.departmentsAll === "false"} onChange={this.onPermissiondepartmentsAllChange} /></td>

                                      </tr>
                                    </tbody>

                                    <tr hidden="true">
                                      <td>{t('group.view')}</td>
                                      <td><input type="radio" value="true" name="departmentsview" checked={this.state.permissions.departmentsview === "true"} onChange={this.onPermissionValueChange} /></td>
                                      <td><input type="radio" value="false" name="departmentsview" checked={this.state.permissions.departmentsview === "false"} onChange={this.onPermissionValueChange} /></td>

                                    </tr>


                                    <tr hidden="true">
                                      <td>{t('group.create')}</td>
                                      <td><input type="radio" value="true" name="departmentscreate" checked={this.state.permissions.departmentscreate === "true"} onChange={this.onPermissionValueChange} /></td>
                                      <td><input type="radio" value="false" name="departmentscreate" checked={this.state.permissions.departmentscreate === "false"} onChange={this.onPermissionValueChange} /></td>

                                    </tr>
                                    <tr hidden="true">
                                      <td>{t('group.edit')}</td>
                                      <td><input type="radio" value="true" name="departmentsedit" checked={this.state.permissions.departmentsedit === "true"} onChange={this.onPermissionValueChange} /></td>
                                      <td><input type="radio" value="false" name="departmentsedit" checked={this.state.permissions.departmentsedit === "false"} onChange={this.onPermissionValueChange} /></td>

                                    </tr>
                                    <tr hidden="true">
                                      <td>{t('group.delete')}</td>
                                      <td><input type="radio" value="true" name="departmentsdelete" checked={this.state.permissions.departmentsdelete === "true"} onChange={this.onPermissionValueChange} /></td>
                                      <td><input type="radio" value="false" name="departmentsdelete" checked={this.state.permissions.departmentsdelete === "false"} onChange={this.onPermissionValueChange} /></td>

                                    </tr>


                                    <tbody>
                                      <tr>
                                        <td><h5>{t('group.statuslabel')}</h5></td>
                                        <td><input type="radio" value="true" name="statuslabelsAll" checked={this.state.permissions.statuslabelsAll === "true"} onChange={this.onPermissionstatuslabelsAllChange} /></td>
                                        <td><input type="radio" value="false" name="statuslabelsAll" checked={this.state.permissions.statuslabelsAll === "false"} onChange={this.onPermissionstatuslabelsAllChange} /></td>

                                      </tr>
                                    </tbody>

                                    <tr hidden="true">
                                      <td>{t('group.view')}</td>
                                      <td><input type="radio" value="true" name="statuslabelsview" checked={this.state.permissions.statuslabelsview === "true"} onChange={this.onPermissionValueChange} /></td>
                                      <td><input type="radio" value="false" name="statuslabelsview" checked={this.state.permissions.statuslabelsview === "false"} onChange={this.onPermissionValueChange} /></td>

                                    </tr>


                                    <tr hidden="true">
                                      <td>{t('group.create')}</td>
                                      <td><input type="radio" value="true" name="statuslabelscreate" checked={this.state.permissions.statuslabelscreate === "true"} onChange={this.onPermissionValueChange} /></td>
                                      <td><input type="radio" value="false" name="statuslabelscreate" checked={this.state.permissions.statuslabelscreate === "false"} onChange={this.onPermissionValueChange} /></td>

                                    </tr>
                                    <tr hidden="true">
                                      <td>{t('group.edit')}</td>
                                      <td><input type="radio" value="true" name="statuslabelsedit" checked={this.state.permissions.statuslabelsedit === "true"} onChange={this.onPermissionValueChange} /></td>
                                      <td><input type="radio" value="false" name="statuslabelsedit" checked={this.state.permissions.statuslabelsedit === "false"} onChange={this.onPermissionValueChange} /></td>

                                    </tr>
                                    <tr hidden="true">
                                      <td>{t('group.delete')}</td>
                                      <td><input type="radio" value="true" name="statuslabelsdelete" checked={this.state.permissions.statuslabelsdelete === "true"} onChange={this.onPermissionValueChange} /></td>
                                      <td><input type="radio" value="false" name="statuslabelsdelete" checked={this.state.permissions.statuslabelsdelete === "false"} onChange={this.onPermissionValueChange} /></td>

                                    </tr>
                                    {/* <tbody>
                                      <tr>
                                        <td><h5>Custom Fields</h5></td>
                                        <td><input type="radio" value="true" name="customfieldsAll" checked={this.state.permissions.customfieldsAll == "true"} onChange={this.onPermissioncustomfieldsAllChange} /></td>
                                        <td><input type="radio" value="false" name="customfieldsAll" checked={this.state.permissions.customfieldsAll == "false"} onChange={this.onPermissioncustomfieldsAllChange} /></td>

                                      </tr>
                                    </tbody>

                                    <tr hidden="true">
                                      <td>View</td>
                                      <td><input type="radio" value="true" name="customfieldsview" checked={this.state.permissions.customfieldsview == "true"} onChange={this.onPermissionValueChange} /></td>
                                      <td><input type="radio" value="false" name="customfieldsview" checked={this.state.permissions.customfieldsview == "false"} onChange={this.onPermissionValueChange} /></td>

                                    </tr>


                                    <tr hidden="true">
                                      <td>Create</td>
                                      <td><input type="radio" value="true" name="customfieldscreate" checked={this.state.permissions.customfieldscreate == "true"} onChange={this.onPermissionValueChange} /></td>
                                      <td><input type="radio" value="false" name="customfieldscreate" checked={this.state.permissions.customfieldscreate == "false"} onChange={this.onPermissionValueChange} /></td>

                                    </tr>
                                    <tr hidden="true">
                                      <td>Edit</td>
                                      <td><input type="radio" value="true" name="customfieldsedit" checked={this.state.permissions.customfieldsedit == "true"} onChange={this.onPermissionValueChange} /></td>
                                      <td><input type="radio" value="false" name="customfieldsedit" checked={this.state.permissions.customfieldsedit == "false"} onChange={this.onPermissionValueChange} /></td>

                                    </tr>
                                    <tr hidden="true">
                                      <td>Delete</td>
                                      <td><input type="radio" value="true" name="customfieldsdelete" checked={this.state.permissions.customfieldsdelete == "true"} onChange={this.onPermissionValueChange} /></td>
                                      <td><input type="radio" value="false" name="customfieldsdelete" checked={this.state.permissions.customfieldsdelete == "false"} onChange={this.onPermissionValueChange} /></td>

                                    </tr> */}

                                    <tbody>
                                      <tr>
                                        <td><h5>{t('group.supplier')}</h5></td>
                                        <td><input type="radio" value="true" name="suppliersAll" checked={this.state.permissions.suppliersAll === "true"} onChange={this.onPermissionsuppliersAllChange} /></td>
                                        <td><input type="radio" value="false" name="suppliersAll" checked={this.state.permissions.suppliersAll === "false"} onChange={this.onPermissionsuppliersAllChange} /></td>

                                      </tr>
                                    </tbody>

                                    <tr hidden="true">
                                      <td>{t('group.view')}</td>
                                      <td><input type="radio" value="true" name="suppliersview" checked={this.state.permissions.suppliersview === "true"} onChange={this.onPermissionValueChange} /></td>
                                      <td><input type="radio" value="false" name="suppliersview" checked={this.state.permissions.suppliersview === "false"} onChange={this.onPermissionValueChange} /></td>

                                    </tr>


                                    <tr hidden="true">
                                      <td>{t('group.create')}</td>
                                      <td><input type="radio" value="true" name="supplierscreate" checked={this.state.permissions.supplierscreate === "true"} onChange={this.onPermissionValueChange} /></td>
                                      <td><input type="radio" value="false" name="supplierscreate" checked={this.state.permissions.supplierscreate === "false"} onChange={this.onPermissionValueChange} /></td>

                                    </tr>
                                    <tr hidden="true">
                                      <td>{t('group.edit')}</td>
                                      <td><input type="radio" value="true" name="suppliersedit" checked={this.state.permissions.suppliersedit === "true"} onChange={this.onPermissionValueChange} /></td>
                                      <td><input type="radio" value="false" name="suppliersedit" checked={this.state.permissions.suppliersedit === "false"} onChange={this.onPermissionValueChange} /></td>

                                    </tr>
                                    <tr hidden="true">
                                      <td>{t('group.delete')}</td>
                                      <td><input type="radio" value="true" name="suppliersdelete" checked={this.state.permissions.suppliersdelete === "true"} onChange={this.onPermissionValueChange} /></td>
                                      <td><input type="radio" value="false" name="suppliersdelete" checked={this.state.permissions.suppliersdelete === "false"} onChange={this.onPermissionValueChange} /></td>

                                    </tr>


                                    <tbody>
                                      <tr>
                                        <td><h5>{t('group.manufacturers')}</h5></td>
                                        <td><input type="radio" value="true" name="manufacturersAll" checked={this.state.permissions.manufacturersAll === "true"} onChange={this.onPermissionmanufacturersAllChange} /></td>
                                        <td><input type="radio" value="false" name="manufacturersAll" checked={this.state.permissions.manufacturersAll === "false"} onChange={this.onPermissionmanufacturersAllChange} /></td>

                                      </tr>
                                    </tbody>

                                    <tr hidden="true">
                                      <td>{t('group.view')}</td>
                                      <td><input type="radio" value="true" name="manufacturersview" checked={this.state.permissions.manufacturersview === "true"} onChange={this.onPermissionValueChange} /></td>
                                      <td><input type="radio" value="false" name="manufacturersview" checked={this.state.permissions.manufacturersview === "false"} onChange={this.onPermissionValueChange} /></td>

                                    </tr>


                                    <tr hidden="true">
                                      <td>{t('group.create')}</td>
                                      <td><input type="radio" value="true" name="manufacturerscreate" checked={this.state.permissions.manufacturerscreate === "true"} onChange={this.onPermissionValueChange} /></td>
                                      <td><input type="radio" value="false" name="manufacturerscreate" checked={this.state.permissions.manufacturerscreate === "false"} onChange={this.onPermissionValueChange} /></td>

                                    </tr>
                                    <tr hidden="true">
                                      <td>{t('group.edit')}</td>
                                      <td><input type="radio" value="true" name="manufacturersedit" checked={this.state.permissions.manufacturersedit === "true"} onChange={this.onPermissionValueChange} /></td>
                                      <td><input type="radio" value="false" name="manufacturersedit" checked={this.state.permissions.manufacturersedit === "false"} onChange={this.onPermissionValueChange} /></td>

                                    </tr>
                                    <tr hidden="true">
                                      <td>{t('group.delete')}</td>
                                      <td><input type="radio" value="true" name="manufacturersdelete" checked={this.state.permissions.manufacturersdelete === "true"} onChange={this.onPermissionValueChange} /></td>
                                      <td><input type="radio" value="false" name="manufacturersdelete" checked={this.state.permissions.manufacturersdelete === "false"} onChange={this.onPermissionValueChange} /></td>

                                    </tr>


                                    <tbody>
                                      <tr>
                                        <td><h5>{t('group.location')}</h5></td>
                                        <td><input type="radio" value="true" name="locationsAll" checked={this.state.permissions.locationsAll === "true"} onChange={this.onPermissionlocationsAllChange} /></td>
                                        <td><input type="radio" value="false" name="locationsAll" checked={this.state.permissions.locationsAll === "false"} onChange={this.onPermissionlocationsAllChange} /></td>

                                      </tr>
                                    </tbody>

                                    <tr hidden="true">
                                      <td>{t('group.view')}</td>
                                      <td><input type="radio" value="true" name="locationsview" checked={this.state.permissions.locationsview === "true"} onChange={this.onPermissionValueChange} /></td>
                                      <td><input type="radio" value="false" name="locationsview" checked={this.state.permissions.locationsview === "false"} onChange={this.onPermissionValueChange} /></td>

                                    </tr>


                                    <tr hidden="true">
                                      <td>{t('group.create')}</td>
                                      <td><input type="radio" value="true" name="locationscreate" checked={this.state.permissions.locationscreate === "true"} onChange={this.onPermissionValueChange} /></td>
                                      <td><input type="radio" value="false" name="locationscreate" checked={this.state.permissions.locationscreate === "false"} onChange={this.onPermissionValueChange} /></td>

                                    </tr>
                                    <tr hidden="true">
                                      <td>{t('group.edit')}</td>
                                      <td><input type="radio" value="true" name="locationsedit" checked={this.state.permissions.locationsedit === "true"} onChange={this.onPermissionValueChange} /></td>
                                      <td><input type="radio" value="false" name="locationsedit" checked={this.state.permissions.locationsedit === "false"} onChange={this.onPermissionValueChange} /></td>

                                    </tr>
                                    <tr hidden="true">
                                      <td>{t('group.delete')}</td>
                                      <td><input type="radio" value="true" name="locationsdelete" checked={this.state.permissions.locationsdelete === "true"} onChange={this.onPermissionValueChange} /></td>
                                      <td><input type="radio" value="false" name="locationsdelete" checked={this.state.permissions.locationsdelete === "false"} onChange={this.onPermissionValueChange} /></td>

                                    </tr>


                                    <tbody>
                                      <tr>
                                        <td><h5>{t('group.company')}</h5></td>
                                        <td><input type="radio" value="true" name="companiesAll" checked={this.state.permissions.companiesAll === "true"} onChange={this.onPermissioncompaniesAllChange} /></td>
                                        <td><input type="radio" value="false" name="companiesAll" checked={this.state.permissions.companiesAll === "false"} onChange={this.onPermissioncompaniesAllChange} /></td>

                                      </tr>
                                    </tbody>

                                    <tr hidden="true">
                                      <td>{t('group.view')}</td>
                                      <td><input type="radio" value="true" name="companiesview" checked={this.state.permissions.companiesview === "true"} onChange={this.onPermissionValueChange} /></td>
                                      <td><input type="radio" value="false" name="companiesview" checked={this.state.permissions.companiesview === "false"} onChange={this.onPermissionValueChange} /></td>

                                    </tr>


                                    <tr hidden="true">
                                      <td>{t('group.create')}</td>
                                      <td><input type="radio" value="true" name="companiescreate" checked={this.state.permissions.companiescreate === "true"} onChange={this.onPermissionValueChange} /></td>
                                      <td><input type="radio" value="false" name="companiescreate" checked={this.state.permissions.companiescreate === "false"} onChange={this.onPermissionValueChange} /></td>

                                    </tr>
                                    <tr hidden="true">
                                      <td>{t('group.edit')}</td>
                                      <td><input type="radio" value="true" name="companiesedit" checked={this.state.permissions.companiesedit === "true"} onChange={this.onPermissionValueChange} /></td>
                                      <td><input type="radio" value="false" name="companiesedit" checked={this.state.permissions.companiesedit === "false"} onChange={this.onPermissionValueChange} /></td>

                                    </tr>
                                    <tr hidden="true">
                                      <td>{t('group.delete')}</td>
                                      <td><input type="radio" value="true" name="companiesdelete" checked={this.state.permissions.companiesdelete === "true"} onChange={this.onPermissionValueChange} /></td>
                                      <td><input type="radio" value="false" name="companiesdelete" checked={this.state.permissions.companiesdelete === "false"} onChange={this.onPermissionValueChange} /></td>

                                    </tr>

                                    <tbody>
                                      <tr>
                                        <td><h5>{t('group.depreciation')}</h5></td>
                                        <td><input type="radio" value="true" name="depreciationsAll" checked={this.state.permissions.depreciationsAll === "true"} onChange={this.onPermissiondepreciationsAllChange} /></td>
                                        <td><input type="radio" value="false" name="depreciationsAll" checked={this.state.permissions.depreciationsAll === "false"} onChange={this.onPermissiondepreciationsAllChange} /></td>

                                      </tr>
                                      <tr hidden="true">
                                        <td>{t('group.view')}</td>
                                        <td><input type="radio" value="true" name="depreciationsview" checked={this.state.permissions.depreciationsview === "true"} onChange={this.onPermissionValueChange} /></td>
                                        <td><input type="radio" value="false" name="depreciationsview" checked={this.state.permissions.depreciationsview === "false"} onChange={this.onPermissionValueChange} /></td>

                                      </tr>
                                      <tr hidden="true">
                                        <td>{t('group.create')}</td>
                                        <td><input type="radio" value="true" name="depreciationscreate" checked={this.state.permissions.depreciationscreate === "true"} onChange={this.onPermissionValueChange} /></td>
                                        <td><input type="radio" value="false" name="depreciationscreate" checked={this.state.permissions.depreciationscreate === "false"} onChange={this.onPermissionValueChange} /></td>

                                      </tr>
                                      <tr hidden="true">
                                        <td>{t('group.edit')}</td>
                                        <td><input type="radio" value="true" name="depreciationsedit" checked={this.state.permissions.depreciationsedit === "true"} onChange={this.onPermissionValueChange} /></td>
                                        <td><input type="radio" value="false" name="depreciationsedit" checked={this.state.permissions.depreciationsedit === "false"} onChange={this.onPermissionValueChange} /></td>

                                      </tr>
                                      <tr hidden="true">
                                        <td>{t('group.delete')}</td>
                                        <td><input type="radio" value="true" name="depreciationsdelete" checked={this.state.permissions.depreciationsdelete === "true"} onChange={this.onPermissionValueChange} /></td>
                                        <td><input type="radio" value="false" name="depreciationsdelete" checked={this.state.permissions.depreciationsdelete === "false"} onChange={this.onPermissionValueChange} /></td>

                                      </tr>


                                    </tbody>

                                    <tbody>
                                      <tr>
                                        <td><h5>{t('group.self')}</h5></td>
                                        <td><input type="radio" value="true" name="self" checked={this.state.permissions.self === "true"} onChange={this.onPermissionselfAllChange} /></td>
                                        <td><input type="radio" value="false" name="self" checked={this.state.permissions.self === "false"} onChange={this.onPermissionselfAllChange} /></td>

                                      </tr>
                                    </tbody>

                                    <tr hidden="true">
                                      <td>{t('group.twofactor')}</td>
                                      <td><input type="radio" value="true" name="two_factor" checked={this.state.permissions.two_factor === "true"} onChange={this.onPermissionValueChange} /></td>
                                      <td><input type="radio" value="false" name="two_factor" checked={this.state.permissions.two_factor === "false"} onChange={this.onPermissionValueChange} /></td>

                                    </tr>


                                    <tr hidden="true">
                                      <td>{t('group.api')}</td>
                                      <td><input type="radio" value="true" name="api" checked={this.state.permissions.api === "true"} onChange={this.onPermissionValueChange} /></td>
                                      <td><input type="radio" value="false" name="api" checked={this.state.permissions.api === "false"} onChange={this.onPermissionValueChange} /></td>

                                    </tr>
                                    <tr hidden="true">
                                      <td>{t('group.profile')}</td>
                                      <td><input type="radio" value="true" name="edit_location" checked={this.state.permissions.edit_location === "true"} onChange={this.onPermissionValueChange} /></td>
                                      <td><input type="radio" value="false" name="edit_location" checked={this.state.permissions.edit_location === "false"} onChange={this.onPermissionValueChange} /></td>
                                    </tr>
                                    <tr hidden="true">
                                      <td>{t('group.selfcheckout')}</td>
                                      <td><input type="radio" value="true" name="checkout_assets" checked={this.state.permissions.checkout_assets === "true"} onChange={this.onPermissionValueChange} /></td>
                                      <td><input type="radio" value="false" name="checkout_assets" checked={this.state.permissions.checkout_assets === "false"} onChange={this.onPermissionValueChange} /></td>

                                    </tr>
                                  </table>

                                  <div class="form-group">
                                      <button name="btnCancel" onClick={this.BackBtnClick} class="btn btn-link text-left" >{t('button.btnCancel')}</button>
                                      <button name='submit' class=" btn-primary customgroup-submitbtn" >{t('button.submit')}</button>
                                   </div></div>
                              </form>

                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      )
    }
    else {
      return (
        <GroupMain showNotifications={this.state.showNotifications} NotificationMessage={NotificationMessage}></GroupMain>
      )
    }
  }
}

export default withTranslation()(GroupUpdate);