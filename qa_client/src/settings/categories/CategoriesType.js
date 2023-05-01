
import React, { Component } from 'react';
import CategoriesAsset from './CategoriesAsset';
import CategoriesLicenses from './CategoriesLicenses';
import CategoriesConsumables from './CategoriesConsumables';
import CategoriesAccessories from './CategoriesAccessories';
import CategoriesComponents from './CategoriesComponents';


import CategoriesCreate from './CategoriesCreate';
import CategoriesUpdate from './CategoriesUpdate';
import CategoriesMain from './CategoriesMain';
import { withTranslation } from 'react-i18next'

class CategoriesType extends Component {
  constructor(props) {
    super(props)
    this.state = {
      CategoriesDatatoUpdate: '',
      ShowAssets: false,
      ShowMain: false,
      ShowCreate: false,
      showUpdate: false,
      showLicenses: false,
      showComponents: false,
      showConsumable: false,
      showAccessory: false
    }
  }
  componentDidMount() {
    const category_type = this.props.CategoriesDatatoUpdate.category_type;
    if (category_type === "Asset") {
      this.setState({ ShowAssets: true });
    }
    else if (category_type === "License") {
      this.setState({ showLicenses: true });
    }
    else if (category_type === "Accessory") {
      this.setState({ showAccessory: true });
    }
    else if (category_type === "Component") {
      this.setState({ showComponents: true });
    }
    else if (category_type === "Consumable") {
      this.setState({ showConsumable: true });
    }
    
    this.setState({ CategoriesDatatoUpdate: this.props.CategoriesDatatoUpdate });

  }

  BackBtnClick = () => {

    this.setState({ showLicenses: false });
    this.setState({ showComponents: false });
    this.setState({ showConsumable: false });
    this.setState({ showAccessory: false });
    this.setState({ ShowAssets: false });
    this.setState({ ShowCreate: false });
    this.setState({ showUpdate: false });
    this.setState({ ShowMain: true })
  }
  CategoriesCreateClick = () => {
    this.setState({ showLicenses: false });
    this.setState({ showComponents: false });
    this.setState({ showConsumable: false });
    this.setState({ showAccessory: false });
    this.setState({ ShowAssets: false });
    this.setState({ ShowCreate: true });
    this.setState({ showUpdate: false });
    this.setState({ ShowMain: false })
  }

  UpdateCategories = () => {
    this.setState({ showLicenses: false });
    this.setState({ showComponents: false });
    this.setState({ showConsumable: false });
    this.setState({ showAccessory: false });
    this.setState({ ShowAssets: false });
    this.setState({ ShowCreate: false });
    this.setState({ showUpdate: true });
    this.setState({ ShowMain: false })
  }
 onLanguageHandle = (event) => {
    let newLang = event.target.value;
    this.setState({value: newLang})
    this.props.i18n.changeLanguage(newLang)
  }
  render() {
    const {t} = this.props
    const { ShowAssets, showConsumable, showComponents, showAccessory, showLicenses, showUpdate, ShowCreate } = this.state;
    if (ShowAssets) {
      return (

        <div>
          <div>

            <div class="d-sm-flex align-items-center justify-content-between mb-4">
           <h1 class="h3 mb-0 text-gray-800">{t('category.Asset')} - {this.props.CategoriesDatatoUpdate.name}</h1>

              <div class="pull-left">
                <div class="btn-group pull-left">
                 <button class="btn btn-primary customcolumns-csv dropdown-toggle  customcolumns-csv" data-toggle="dropdown" name="actions">{t('category.actions')}
           </button>
                <ul class="dropdown-menu">
                    <li><button name="btnCreate" class="btn btn-link" onClick={this.CategoriesCreateClick}>{t('category.btnCreate')}</button></li>
                    <li><button name="btnUpdate" class="btn btn-link" onClick={this.UpdateCategories}>{t('category.btnUpdate')}</button></li>
                  </ul>&nbsp;
                    <button name="back" onClick={this.BackBtnClick} className="  btn btn-primary customcolumns-csv">
                     {t('category.back')}</button>
                  </div>
              </div>

            </div>
          </div>

          <CategoriesAsset CategoriesDatatoUpdate={this.props.CategoriesDatatoUpdate} />
        </div>
      )

    }
    else if (showLicenses)

      return (
        <div>
          <div>

            <div class="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 class="h3 mb-0 text-gray-800">{t('category.License')} - {this.props.CategoriesDatatoUpdate.name}</h1>
              <div class="pull-left">
                <div class="btn-group pull-left">
                  <button class="btn btn-primary customcolumns-csv dropdown-toggle " data-toggle="dropdown" name="actions">{t('category.actions')}
                          </button>
                  <ul class="dropdown-menu">
                    <li><button name="btnCreate" class="btn btn-link" onClick={this.CategoriesCreateClick}>{t('category.btnCreate')}</button></li>
                    <li><button name="btnUpdate" class="btn btn-link" onClick={this.UpdateCategories}>{t('category.btnUpdate')}</button></li>
                  </ul>&nbsp;
                 <button name="back" onClick={this.BackBtnClick} className="  btn btn-primary customcolumns-csv">
                     {t('category.back')}</button>
                 </div>
              </div>

            </div>
          </div>
          <CategoriesLicenses CategoriesDatatoUpdate={this.props.CategoriesDatatoUpdate} /> </div>
      )

    else if (showAccessory)

      return (
        <div>
          <div>

            <div class="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 class="h3 mb-0 text-gray-800">{t('category.Accessory')} - {this.props.CategoriesDatatoUpdate.name}</h1>
              <div class="pull-left">
                <div class="btn-group pull-left">
                  <button class="btn btn-primary customcolumns-csv dropdown-toggle  " data-toggle="dropdown" name="actions">{t('category.actions')}
                          </button>
                 <ul class="dropdown-menu">
                    <li><button name="btnCreate" class="btn btn-link" onClick={this.CategoriesCreateClick}>{t('category.btnCreate')}</button></li>
                    <li><button name="btnUpdate" class="btn btn-link" onClick={this.UpdateCategories}>{t('category.btnUpdate')}</button></li>
                  </ul>&nbsp;
                    <button name="back" onClick={this.BackBtnClick} className="  btn btn-primary customcolumns-csv">
                     {t('category.back')}</button>
                  </div>
              </div>

            </div>
          </div>
          <CategoriesAccessories CategoriesDatatoUpdate={this.props.CategoriesDatatoUpdate} />
        </div>
      )

    else if (showComponents)

      return (
        <div>
          <div>

            <div class="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 class="h3 mb-0 text-gray-800">{t('category.Component')} - {this.props.CategoriesDatatoUpdate.name}</h1>
              <div class="pull-left">
                <div class="btn-group pull-left">
                  <button class="btn btn-primary customcolumns-csv dropdown-toggle  " data-toggle="dropdown" name="actions">{t('category.actions')}
                          </button>
                  <ul class="dropdown-menu">
                    <li><button name="btnCreate" class="btn btn-link" onClick={this.CategoriesCreateClick}>{t('category.btnCreate')}</button></li>
                    <li><button name="btnUpdate" class="btn btn-link" onClick={this.UpdateCategories}>{t('category.btnUpdate')}</button></li>
                  </ul>&nbsp;
                   <button name="back" onClick={this.BackBtnClick} className="  btn btn-primary customcolumns-csv">
                     {t('category.back')}</button>
                  </div>
              </div>

            </div>
          </div>
          <CategoriesComponents CategoriesDatatoUpdate={this.props.CategoriesDatatoUpdate} />
        </div>
      )
    else if (showConsumable)

      return (
        <div>
          <div>

            <div class="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 class="h3 mb-0 text-gray-800">{this.props.CategoriesDatatoUpdate.name}</h1>
              <div class="pull-left">
                <div class="btn-group pull-left">
                 <button class="btn btn-primary customcolumns-csv dropdown-toggle  " data-toggle="dropdown" name="actions">{t('category.actions')}
                          </button>
                  <ul class="dropdown-menu">
                    <li><button name="btnCreate" class="btn btn-link" onClick={this.CategoriesCreateClick}>{t('category.btnCreate')}</button></li>
                    <li><button name="btnUpdate" class="btn btn-link" onClick={this.UpdateCategories}>{t('category.btnUpdate')}</button></li>
                  </ul>&nbsp;
                    <button name="back" onClick={this.BackBtnClick} className="  btn btn-primary customcolumns-csv">
                     {t('category.back')}</button>
                   </div>
              </div>

            </div>
          </div>
          <CategoriesConsumables CategoriesDatatoUpdate={this.props.CategoriesDatatoUpdate} />
        </div>
      )
    else if (showUpdate)

      return (<CategoriesUpdate CategoriesDatatoUpdate={this.state.CategoriesDatatoUpdate} />)

    else if (ShowCreate)
      return (<CategoriesCreate />)
    else
      return (<CategoriesMain />)
  }

}


export default withTranslation()(CategoriesType);