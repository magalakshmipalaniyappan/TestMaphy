import './App.css';
import axios from 'axios';
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Categories from './settings/categories/CategoriesMain';
import CompaniesMain from './settings/Companies/CompaniesMain';
import CustomFieldsMain from './settings/CustomField/CustomFieldsMain';
import FieldSetMain from './settings/CustomFieldSet/FieldSetMain';
import StatuslabelMain from './settings/StatusLabel/StatuslabelMain';
import ManufactureMain from './settings/Manufactures/ManufactureMain';
import SuppliersMain from './settings/Suppliers/SuppliersMain';
import PeopleMain from './settings/people/PeopleMain';
import DepartmentsMain from './settings/departments/DepartmentsMain';
import LocationMain from './settings/locations/LocationMain';
import AssetModelsMain from './settings/assetmodels/AssetModelsMain';
import LicensesMain from './settings/licenses/LicensesMain';
import ConsumablesMain from './settings/consumables/ConsumablesMain';
import AccessoriesMain from './settings/Accessories/AccessoriesMain';
import ComponentsMain from './settings/Components/ComponentsMain';
import AssetMain from './settings/listall/AssetMain';
import AssetDetails from './settings/listall/AssetDetails';
import AssetCreate from './settings/listall/AssetCreate';


import AssetMaintenancesMain from './settings/assetmaintenance/AssetMaintenancesMain';
// import ImportHistoryCreate from './settings/ImportHistoryCreate';
// import BulkAuditCreate from './settings/bulkaudit/BulkAuditCreate';
//import OverDueForAuditCreate from './settings/overdueforaudit/OverDueForAuditCreate';
import AllDeployedMain from './settings/AllDeployed/AllDeployedMain';
import AllUnDeployableMain from './settings/AllUnDeployabled/AllUnDeployableMain';
import AllDeployableMain from './settings/AllDeployable/AllDeployableMain';
//import RequestableMain from './settings/RequestableMain';
//import DueforAuditCreate from './settings/DueforAuditCreate';
import BulkCheckoutCreate from './settings/BulkCheckout/BulkCheckoutCreate';
//import RequestedCreate from './settings/RequestedCreate';
//import DeletedMain from './settings/DeletedMain';
import DepreciationMain from './settings/Depreciations/DepreciationMain';
import Admin from './Adminsettings/Admin';
import ContactUsMain from './ContactUs/ContactUsMain';
import WorkStatusMain from './WorkStatus//WorkStatusMain';
//import WorkStatus from './WorkStatus/WorkStatus';
import Slack from './Adminsettings/Slack';
import LicenseNotifications from './Adminsettings/LicenseNotifications';

import Branding from './Adminsettings/Branding';
import changepassword from './changepassword';
import GroupMain from './Adminsettings/Group/GroupMain';
import TicketMain from './ticket/TicketMain';
import Login from './login';

import DashboardMain from './Dashboard/Dashboard';

import AccessoryReportMain from './Reports/AccessoryReportMain';
import ActivityReportMain from './Reports/ActivityReportMain';
import LicenseReportMain from './Reports/LicenseReportMain';
import DepreciationReportMain from './Reports/DepreciationReportMain';
import ComponentsReportMain from './Reports/ComponentsReportMain';
import ConsumableReportMain from './Reports/ConsumableReportMain';
import HardwareReportMain from './Reports/HardwareReportMain';

import AssetReportMain from './Reports/AssetReportMain';

// import AssetMaintenanceReportMain from './Reports/AssetMaintenanceReportMain';
// import AuditLogMain from './Reports/AuditLogMain';
// import CustomAssetReportMain from './Reports/CustomAssetReportMain';
// import UnacceptedAssetsMain from './Reports/UnacceptedAssetsMain';
import TalentGroupMain from './Adminsettings/TalentGroup/TalentGroupMain';
import TicketIssuesMain from './Adminsettings/TicketIssues/TicketIssuesMain';
import TicketDetails from './ticket/TicketDetails';
import Labels from './Adminsettings/Labels/Labels';
import jwt_decode from "jwt-decode";
import { withTranslation } from 'react-i18next'
import ListAllLabel from './settings/listall/AssetLabel';
import AccessoriesLabel from './settings/Accessories/AccessoriesLabel';
import ComponentsLabel from './settings/Components/ComponentsLabel';
import audit from './settings/audit/audit';

var loggeduser = "";
var userpermission = "";
var loggedUsername = "";
//const Domain = process.env.REACT_APP_URL;
class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: "en",
            errors: {},
            ishumberger: true,
            selectedLogo:'',
        }
    }

    // componentDidMount() {
    //     if (loggeduser) {
    //     const url = Domain + '/firms/getBrandingDetails';
    //     axios.get(url).then(
    //       response => {
    //           if(response.data.rows)
    //           {
    //             this.setState({ logo: response.data.rows[0].image })
    //             this.setState({ site_name: response.data.rows[0].site_name });

    //           }
    //       }
    //     )
    //       .catch(error => {
    //         console.log(error)
    //       })
    
    //     }
    //   }

    LogoutBtnClick = () => {
        localStorage.clear();
        loggeduser = false;
        axios.defaults.headers.common['Authorization'] = "";
        window.location.href = "/";
    }


    onLanguageHandle = (event) => {
        let newLang = event.target.value;
        this.setState({ value: newLang })
        this.props.i18n.changeLanguage(newLang)
    }

    render() {
        //var selectedLogo = JSON.parse(localStorage.getItem("selectedLogo"));
        const { t } = this.props
        const token = localStorage.getItem('token');
        if (token) {
            /* if (jwt_decode(token).exp < Date.now() / 1000) {
            localStorage.clear();
            loggeduser = false;
            window.location.href = "/";
            }*/
            /// else {
            var decoded = jwt_decode(token);
            loggeduser = true;
            axios.defaults.headers.common['Authorization'] = "Bearer " + token;
            userpermission = JSON.parse(localStorage.getItem('permissions'));
            loggedUsername = decoded.firstName;
            // }
        }


        axios.interceptors.response.use((response) => {
            return response
        },
            function (error) {
                localStorage.clear();
                loggeduser = false;
                window.location.href = "/";
            }
        );

        if (loggeduser) {
            if (window.location.pathname === "/AssetLabel") {
                return (<ListAllLabel />)
            }
            else if (window.location.pathname === "/AccessoriesLabel") {
                return (<AccessoriesLabel />)
            }
            else if (window.location.pathname === "/ComponentsLabel") {
                return (<ComponentsLabel />)
            }
            else {
                console.log(this.state.ishumberger)
                //const ishumbergeron = this.state.ishumberger;
                return (

                    <Router>
                        <nav class="sb-topnav navbar navbar-expand navbar-dark customnavbarbg-color ">
                            {/* Sidebar Toggle */}

                            <button class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i class="fas fa-bars"></i></button>
                            <img src={"./logo.png"} width="120" height="60" alt=""></img>
                            {/* <img width="120" height="60">{selectedLogo.image}</img> */}
                            {/* <h2 class="navbar-brand ps-3" href="x"> {this.state.site_name?this.state.site_name:t('app.assetmanagement')}</h2> */}
                            <h2 class="navbar-brand ps-3" href="x"> {t('app.assetmanagement')}</h2> 
                            {/* <button class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i class="fas fa-bars"></i></button> */}

                            {userpermission.assetsview ? <li class="nav-item custommenu-textscale custommenutext custommenutext-top"> <Link to={'/AssetMain'} className="nav-link" data-tooltip="true" title="Assets"><i class="fa fa-barcode customtext-color"></i> </Link> </li> : null}
                            {userpermission.licensesview ? <li class="nav-item custommenu-textscale  custommenutext-top"> <Link to={'/LicensesMain'} className="nav-link" data-tooltip="true" title="Licenses"><i class="fas fa-save customtext-color"></i> </Link> </li> : null}
                            {userpermission.accessoriesview ? <li class="nav-item custommenu-textscale custommenutext-top"> <Link to={'/AccessoriesMain'} className="nav-link" data-tooltip="true" title="Accessories"><i class="fas fa-keyboard customtext-color"></i> </Link> </li> : null}
                            {userpermission.consumablesview ? <li class="nav-item custommenu-textscale custommenutext-top"> <Link to={'/ConsumablesMain'} className="nav-link" data-tooltip="true" title="Consumables"><i class="fa fa-tint customtext-color"></i> </Link> </li> : null}
                            {userpermission.componentsview ? <li class="nav-item custommenu-textscale custommenutext-top"> <Link to={'/ComponentsMain'} className="nav-link" data-tooltip="true" title="Components"><i class="fas fa-hdd customtext-color"></i> </Link> </li> : null}

                            <form class=" form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                                <ul class="navbar-nav ">
                                    {userpermission.admin ? <li class="nav-item custommenu-textscale"> <Link to={'/Admin'} className="nav-link" data-tooltip="true" title="Admin Settings"><i class="fa fa-cogs fa-fw customadmintext-color" aria-hidden="true"></i> </Link>

                                        <div id="collapseAdmin" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                                            <div class="bg-white py-2 collapse-inner rounded">
                                                <li><Link to={'/Branding'} className="collapse-item">Branding</Link></li>
                                                <li><Link to={'/GroupMain'} className="collapse-item">Group</Link></li>
                                                <li><Link to={'/TalentGroupMain'} className="collapse-item">Talent Group</Link></li>
                                                <li><Link to={'/TicketIssuesMain'} className="collapse-item">Ticket Issues</Link></li>
                                                <li><Link to={'/Labels'} className="collapse-item">Labels</Link></li>
                                            </div>
                                        </div>
                                    </li> : null}
                                    <div className="customloggeduser-button">
                                        <li class="nav-item dropdown no-arrow ">
                                            <a class="nav-link dropdown-toggle customloggeduser-textcolor custommenu-textscale" href="#" id="userDropdown" role="button"
                                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                                                <span class="mr-2 customloggeduser-textcolor"><i class="fa fa-power-off custom-logouticon"></i>{loggedUsername}</span>

                                            </a>
                                            <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                                aria-labelledby="userDropdown">
                                                <Link to={'/changepassword'} class="userdropdown-item"> <i class="fa fa-lock mr-2 text-gray-400 custom-logouticon"></i>{t('changepassword.changepassword')}</Link>

                                                <Link to={'#'} class="userdropdown-item" data-toggle="modal" data-target="#logoutModal"> <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400  custom-logouticon"></i>{t('button.logout')} </Link>

                                            </div>
                                        </li>
                                    </div>
                                </ul>


                            </form>


                        </nav>

                        <div id="layoutSidenav">
                            <div id="layoutSidenav_nav">
                                <nav class="sb-sidenav accordion  customnavbarbg-color" id="sidenavAccordion">
                                    <div class="sb-sidenav-menu">
                                        <div class="nav">
                                            <li class="nav-item custommenu-textscale "> <Link to={'/'} className="nav-link ">
                                                <i class="fas fa-tachometer-alt customtext-color"></i>

                                                <span class="customtext-color">{t('app.dashboard')}</span></Link> </li>
                                            {(userpermission.superuser==="1") ? <li class="nav-item dropdown">
                                                <div class="container">

                                                    <a class="nav-link dropdown-toggle " data-toggle="collapse" data-target="#setting" href='#'>
                                                        <i class="fas fa-fw fa-cog customdropdowntext-color"></i>

                                                        <span class="customtext-color">{t('app.settings')}</span></a>
                                                    <div id="setting" class="collapse">
                                                        {userpermission.categoriesview ? <Link to={'/CategoriesMain'} class="dropdown-item">{t('app.categories')}</Link> : null}
                                                        {userpermission.companiesview ? <Link to={'/CompaniesMain'} className="dropdown-item">{t('app.companies')}</Link> : null}
                                                        {userpermission.manufacturersview ? <li><Link to={'/ManufactureMain'} className="dropdown-item">{t('app.manufacturers')}</Link></li> : null}

                                                        {userpermission.departmentsview ? <Link to={'/DepartmentsMain'} className="dropdown-item">{t('app.departments')}</Link> : null}
                                                        {userpermission.depreciationsview ? <li><Link to={'/DepreciationMain'} className="dropdown-item">{t('app.depreciations')}</Link></li> : null}

                                                        {userpermission.modelsview ? <Link to={'/AssetModelsMain'} className="dropdown-item">{t('app.assetmodels')}</Link> : null}
                                                        {userpermission.suppliersview ? <li><Link to={'/SuppliersMain'} className="dropdown-item">{t('app.vendors')}</Link></li> : null}

                                                        {userpermission.locationsview ? <li><Link to={'/LocationMain'} className="dropdown-item">{t('app.locations')}</Link></li> : null}
                                                        {userpermission.statuslabelsview ? <li><Link to={'/StatuslabelMain'} className="dropdown-item">{t('app.statuslabels')}</Link></li> : null}
                                                        {/* <li><Link to={'/FieldSetMain'} className="dropdown-item">Field Set </Link></li>
                                                        <li><Link to={'/CustomFieldsMain'} className="dropdown-item">Custom Field  </Link></li> */}

                                                    </div>
                                                </div>
                                            </li> : null}


                                            {userpermission.assetsview ? <li class="nav-item dropdown">
                                                <div class="container">

                                                    <a class="nav-link dropdown-toggle " data-toggle="collapse" data-target="#assets">
                                                        <i class="fa fa-barcode customdropdowntext-color"></i>
                                                        <span class="customtext-color"> {t('app.assets')}</span>
                                                    </a>
                                                    <div id="assets" class="collapse">
                                                        <Link to={'/AssetMain'} className="dropdown-item">{t('app.listall')} </Link>
                                                        <Link to={'/AllDeployableMain'} className="dropdown-item"> {t('app.deployable')} </Link>

                                                        <Link to={'/AllDeployedMain'} className="dropdown-item"> {t('app.deployed')} </Link>
                                                        <Link to={'/AssetMaintenancesMain'} className="dropdown-item"> {t('app.assetmaintenances')} </Link>

                                                        <Link to={'/AllUnDeployableMain'} className="dropdown-item"> {t('app.undeployed')}</Link>

                                                        <Link to={'/BulkCheckoutCreate'} className="dropdown-item">{t('app.bulkcheckout')} </Link>
                                                    </div>
                                                </div>
                                            </li> : null}


                                            {userpermission.licensesview ? <li class="nav-item custommenu-textscale"> <Link to={'/LicensesMain'} className="nav-link"><i class="fas fa-save customtext-color"></i> <span class="customtext-color">{t('app.licenses')}</span></Link> </li> : null}
                                            {userpermission.accessoriesview ? <li class="nav-item custommenu-textscale"> <Link to={'/AccessoriesMain'} className="nav-link"><i class="fas fa-keyboard customtext-color"></i> <span class="customtext-color">{t('app.accessories')}</span></Link> </li> : null}
                                            {userpermission.consumablesview ? <li class="nav-item custommenu-textscale"> <Link to={'/ConsumablesMain'} className="nav-link"><i class="fa fa-tint customtext-color"></i> <span class="customtext-color">{t('app.consumables')}</span></Link> </li> : null}
                                            {userpermission.componentsview ? <li class="nav-item custommenu-textscale"> <Link to={'/ComponentsMain'} className="nav-link"><i class="fas fa-hdd customtext-color"></i> <span class="customtext-color">{t('app.components')}</span></Link> </li> : null}
                                            <li class="nav-item custommenu-textscale"> <Link to={'/TicketMain'} className="nav-link">
                                                <i class="fas fa-ticket-alt customtext-color"></i>
                                                {/* <img src="./helpdesk.ico" width="60" height="30"></img> */}

                                                <span class="customtext-color">{t('app.helpdesk')}</span></Link> </li>

                                            {userpermission.usersview ? <li class="nav-item custommenu-textscale"> <Link to={'/PeopleMain'} className="nav-link"><i class="fas fa-users customtext-color"></i> <span class="customtext-color">{t('app.people')}</span></Link> </li> : null}

                                            {/* {userpermission.admin ?  <li class="nav-item custommenu-textscale"> <Link to={'/ContactUsMain'} className="nav-link "><i class="fa fa-phone customtext-color"></i><span class="customtext-color">Contact Us</span></Link> </li> :null } */}
                                            {userpermission.reportview ? <li class="nav-item dropdown">
                                                <div class="container">

                                                    <a class="nav-link dropdown-toggle " data-toggle="collapse" data-target="#reports">
                                                        <i class="fa fa-bars customdropdowntext-color"></i>
                                                        <span class="customtext-color">{t('app.reports')}</span>
                                                    </a>
                                                    <div id="reports" class="collapse">
                                                        <Link to={'/AccessoryReportMain'} className="dropdown-item">{t('app.accessoryreports')} </Link>
                                                        <Link to={'/ActivityReportMain'} className="dropdown-item"> {t('app.activityreports')} </Link>
                                                        <Link to={'/LicenseReportMain'} className="dropdown-item"> {t('app.licensereports')}</Link>
                                                        <Link to={'/DepreciationReportMain'} className="dropdown-item"> {t('app.depreciationreports')} </Link>
                                                        <Link to={'/ComponentsReportMain'} className="dropdown-item"> {t('app.componentsreports')} </Link>
                                                        <Link to={'/ConsumableReportMain'} className="dropdown-item"> {t('app.consumablereports')} </Link>
                                                        <Link to={'/HardwareReportMain'} className="dropdown-item"> {t('app.hardwarereports')} </Link>

                                                        {/* <Link to={'/AssetReportMain'} className="dropdown-item"> AssetReportMain </Link> */}

                                                    </div>
                                                </div>
                                            </li> : null}

                                            <li class="nav-item custommenu-textscale"> <Link to={'/WorkStatusMain'} className="nav-link "><i class="fa fa-tasks customtext-color"></i><span class="customtext-color">{t('app.workstatus')}</span></Link> </li>
                                            <li class="nav-item custommenu-textscale"> <Link to={'/audit'} className="nav-link "><i class="fa fa-history customtext-color"></i><span class="customtext-color">{t('app.audit')}</span></Link> </li>

                                        </div>
                                    </div>

                                </nav>
                            </div>
                            <div id="layoutSidenav_content">
                                <main>
                                    <div id="wrapper">


                                        <div id="content-wrapper" class="d-flex flex-column ">


                                            <div id="content">


                                                <div class="container-fluid">

                                                    <Switch>
                                                        <Route exact path='/' component={DashboardMain} />
                                                        <Route path='/CustomFieldsMain' component={CustomFieldsMain} />
                                                        <Route path='/FieldSetMain' component={FieldSetMain} />

                                                        <Route path='/CategoriesMain' component={Categories} />
                                                        <Route path='/PeopleMain' component={PeopleMain} />
                                                        <Route path='/DepartmentsMain' component={DepartmentsMain} />
                                                        <Route path='/LocationMain' component={LocationMain} />
                                                        <Route path='/StatuslabelMain' component={StatuslabelMain} />
                                                        <Route path='/SuppliersMain' component={SuppliersMain} />
                                                        {/* <Route path='/WorkStatus' component={WorkStatus} /> */}
                                                        <Route path='/ManufactureMain' component={ManufactureMain} />
                                                        <Route path='/CompaniesMain' component={CompaniesMain} />
                                                        <Route path='/AssetModelsMain' component={AssetModelsMain} />
                                                        <Route path='/LicensesMain' component={LicensesMain} />

                                                        <Route path='/AccessoriesMain' component={AccessoriesMain} />
                                                        <Route path='/ComponentsMain' component={ComponentsMain} />
                                                        <Route exact path='/ConsumablesMain' component={ConsumablesMain} />
                                                        <Route path='/AssetMain' component={AssetMain} />
                                                        <Route path='/AssetDetails' component={AssetDetails} />
                                                        <Route path='/AssetCreate' component={AssetCreate} />
                                                        

                                                        <Route path='/AssetMaintenancesMain' component={AssetMaintenancesMain} />
                                                        {/* <Route exact path='/ImportHistoryCreate' component={ImportHistoryCreate} />
                                                            <Route path='/BulkAuditCreate' component={BulkAuditCreate} />
                                                            <Route path='/OverDueForAuditCreate' component={OverDueForAuditCreate} /> */}
                                                        <Route path='/AllDeployedMain' component={AllDeployedMain} />
                                                        <Route path='/AllDeployableMain' component={AllDeployableMain} />
                                                        <Route path='/AllUnDeployableMain' component={AllUnDeployableMain} />
                                                        {/* <Route exact path='/RequestableMain' component={RequestableMain} />
<Route path='/DueforAuditCreate' component={DueforAuditCreate} /> */}
                                                        <Route path='/BulkCheckoutCreate' component={BulkCheckoutCreate} />
                                                        {/* <Route path='/RequestedCreate' component={RequestedCreate} />
<Route path='/DeletedMain' component={DeletedMain} /> */}
                                                        <Route path='/DepreciationMain' component={DepreciationMain} />
                                                        <Route path='/ContactUsMain' component={ContactUsMain} />
                                                        <Route path='/WorkStatusMain' component={WorkStatusMain} />
                                                        <Route path='/audit' component={audit} />

                                                        <Route path='/Slack' component={Slack} />
                                                         <Route path='/LicenseNotifications' component={LicenseNotifications} /> 
                                                                                                 <Route path='/Admin' component={Admin} />
                                                        <Route path='/Branding' component={Branding} />
                                                        <Route exact path='/changepassword' component={changepassword} />
                                                        <Route path='/GroupMain' component={GroupMain} />
                                                        <Route path='/PeopleMain' component={PeopleMain} />
                                                        <Route path='/TicketMain' component={TicketMain} />
                                                        <Route path='/AccessoryReportMain' component={AccessoryReportMain} />
                                                        <Route path='/LicenseReportMain' component={LicenseReportMain} />
                                                        <Route path='/DepreciationReportMain' component={DepreciationReportMain} />
                                                        <Route path='/ComponentsReportMain' component={ComponentsReportMain} />
                                                        <Route path='/ConsumableReportMain' component={ConsumableReportMain} />
                                                        <Route path='/HardwareReportMain' component={HardwareReportMain} />
                                                        <Route path='/AssetReportMain' component={AssetReportMain} />

                                                        <Route path='/ActivityReportMain' component={ActivityReportMain} />
                                                        <Route path='/TalentGroupMain' component={TalentGroupMain} />
                                                        <Route path='/TicketIssuesMain' component={TicketIssuesMain} />
                                                        <Route path='/TicketDetails' component={TicketDetails} />
                                                        <Route path='/Labels' component={Labels} />
                                                        {/* <Route path='/ContactUs' component={ContactUs} /> */}

                                                        {/* <Route path='/AssetMaintenanceReportMain' component={AssetMaintenanceReportMain} />
<Route path='/AuditLogMain' component={AuditLogMain} />
<Route path='/CustomAssetReportMain' component={CustomAssetReportMain} />
<Route path='/DepreciationReportMain' component={DepreciationReportMain} />
<Route path='/LicenseReportMain' component={LicenseReportMain} />
<Route path='/UnacceptedAssetsMain' component={UnacceptedAssetsMain} />  */}



                                                    </Switch>

                                                </div>


                                            </div>



                                        </div>

                                    </div>

                                </main>

                            </div>
                        </div>

                        <div class="modal fade" id="logoutModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                            aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">{t('logout.leavepage')}</h5>
                                        <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">×</span>
                                        </button>
                                    </div>

                                    <div class="modal-body">{t('logout.paragraph')}</div>
                                    <div class="modal-footer">
                                        <button class="btn btn-secondary" type="button" data-dismiss="modal" >{t('button.cancel')}</button>

                                        <button class="btn btn-primary" data-dismiss="modal" onClick={this.LogoutBtnClick}>{t('button.logout')}</button>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </Router>
                );
            }
        }
        else {
            return (
                <Login />
            )
        }
    }
}
export default withTranslation()(App);