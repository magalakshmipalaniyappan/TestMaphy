import React from 'react';
//import branding from './admin/branding';
import { Link } from 'react-router-dom';

import { withTranslation } from 'react-i18next'
import GroupMain from './Group/GroupMain';
import Firm from './Firm';
//import changepassword from './changepassword';
class admin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: "en",
            ShowAdmin: true
        }

    };


    AdminBtnClick = () => {
        this.setState({ showGroups: true })
        this.setState({ ShowAdmin: false });
    }

    FirmBtnClick = () => {
        this.setState({ showFirms: true })
        this.setState({ ShowAdmin: false });
    }

    onLanguageHandle = (event) => {
        let newLang = event.target.value;
        this.setState({ value: newLang })
        this.props.i18n.changeLanguage(newLang)
    }
    render() {
        const { t } = this.props;
        const { ShowAdmin, showFirms } = this.state;

        if (ShowAdmin) {
            return (

                <div class="row custommain-title">


                    <div class="col-xl-3 col-md-6 mb-4">
                        <div class="card border-left-primary shadow h-100 py-2">
                            <div class="card-body">
                                <div class="row no-gutters align-items-center">
                                    <div class="col mr-2">
                                        <h5>
                                            <Link to={'/Branding'} className="collapse-item"><i class="far fa-copyright  " aria-hidden="true"></i>  <span class="name">{t('Admin.branding')}</span> </Link>


                                        </h5>
                                        <p class="help-block">{t('Admin.logo')}</p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-3 col-md-6 mb-4">
                        <div class="card border-left-primary shadow h-100 py-2">
                            <div class="card-body">
                                <div class="row no-gutters align-items-center">
                                    <div class="col mr-2">
                                        <h5>
                                            <Link to={'/TicketIssuesMain'} className="collapse-item "><i class="fas fa-ticket-alt "></i>
                                            <span className="customrow-spacing">{t('Admin.ticketissues')}</span> </Link>

                                        </h5>
                                        <p class="help-block">{t('Admin.classification')}</p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-3 col-md-6 mb-4">
                        <div class="card border-left-primary shadow h-100 py-2">
                            <div class="card-body">
                                <div class="row no-gutters align-items-center">
                                    <div class="col mr-2">
                                        <h5>
                                            <Link to={'/TalentGroupMain'} className="collapse-item"><i class="fas fa-users "></i> <span className="customrow-spacing">{t('Admin.talentgruop')}
                                            </span></Link>

                                        </h5>
                                        <p class="help-block">{t('Admin.skill')}</p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-3 col-md-6 mb-4">
                        <div class="card border-left-primary shadow h-100 py-2">
                            <div class="card-body">
                                <div class="row no-gutters align-items-center">
                                    <div class="col mr-2">
                                        <h5>
                                            <Link to={'/Slack'} className="collapse-item"><i class="fas fa-users "></i>
                                            <span className="customrow-spacing">{t('Admin.slack')}
                                            </span></Link>

                                        </h5>
                                        <p class="help-block">{t('Admin.slack')}</p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                       <div class="col-xl-3 col-md-6 mb-4">
                        <div class="card border-left-success shadow h-100 py-2">
                            <div class="card-body">
                                <div class="row no-gutters align-items-center">
                                    <div class="col mr-2">
                                        <h5>
                                            <Link to={'/GroupMain'} className="collapse-item"><i class="fas fa-users  "></i> {t('Admin.groups')}</Link>

                                        </h5>
                                        <p class="help-block">{t('Admin.permissiongroups')}</p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-md-6 mb-4">
                        <div class="card border-left-success shadow h-100 py-2">
                            <div class="card-body">
                                <div class="row no-gutters align-items-center">
                                    <div class="col mr-2">
                                        <h5>
                                            <Link to={'/Labels'} className="collapse-item"><i class="fa fa-tags  "></i>  {t('Admin.label')}</Link>

                                        </h5>
                                        <p class="help-block">{t('Admin.labelsize')}</p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-3 col-md-6 mb-4">
                        <div class="card border-left-success shadow h-100 py-2">
                            <div class="card-body">
                                <div class="row no-gutters align-items-center">
                                    <div class="col mr-2">
                                        <h5>
                                            <Link to={'/LicenseNotifications'} className="collapse-item"><i class="fa fa-save"></i>  {t('Admin.license')}</Link>

                                        </h5>
                                        <p class="help-block">{t('Admin.licenseNotifications')}</p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div> 
        </div>


            )
        }
        else if (showFirms) {
            return (
                <Firm />
            )
        }
        else {
            return (
                <GroupMain />
            )
        }

    }
};

export default withTranslation()(admin);