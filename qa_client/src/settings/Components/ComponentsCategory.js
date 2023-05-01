import React, { Component } from 'react';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
import { withTranslation} from 'react-i18next'

import CategoriesCreate from '../categories/CategoriesCreate';
import CategoriesUpdate from '../categories/CategoriesUpdate';
import ComponentsMain from './ComponentsMain';



const Domain = process.env.REACT_APP_URL;

const RemoteAll = ({ data,
  page,
  sizePerPage,
  defaultSorted,
  totalSize,
  onTableChange,
  columns,
  myChangeHandler,
  SearchBtnClick,
  indication,
  ExportCSVButton,
  CustomToggleList }) => (
  <div>
    <ToolkitProvider
      keyField="id"
      data={data}
      columns={columns}
      defaultSorted={defaultSorted}
      noDataIndication={indication}
      search
      exportCSV
      columnToggle >
      {toolkitprops => [
         <div className="custom-table  custom-tablelayout"  >
         <div class="col">
             <div class="row">
            <div class="btn-group" role="group" >
               <CustomToggleList {...toolkitprops.columnToggleProps} />
             <div> <input type='text' placeholder="search" name="searchText"   onChange={myChangeHandler} />
                <button type='input'  data-tooltip="true" title="Search" class="custombg-search" onClick={SearchBtnClick}><i class="fa fa-search"></i></button></div>
                <ExportCSVButton {...toolkitprops.csvProps} class="btn-default custombg-search" data-tooltip="true" title="Export CSV"><i class="fa fa-download"></i></ExportCSVButton>&nbsp;
             </div>
                    </div>   
               <BootstrapTable
                 {...toolkitprops.baseProps}
                 remote={{ pagination: true, sort: true }}
                 keyField="id"
                 pagination={paginationFactory({ page, sizePerPage, totalSize })}
                 onTableChange={onTableChange}
 
                 data={data} columns={columns} noDataIndication="No Data Available"
                 wrapperClasses="table-responsive table table-striped "
 
               />
             </div>
           </div>
      ]}
    </ToolkitProvider>
  </div>
);
class ComponentsCategory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: "en",
      ComponentsData: [],
      ComponentsId: '',
      ComponentsIdToUpdate: '',
      ComponentsNametoUpdate: '',
      CategoriesDatatoUpdate: '',
      ComponentsDataTotal: '',
      ComponentstoUpdate: '',
      ShowCreate: false,
      showUpdate: false,
      ShowCategories: false,
      ShowMain: false,
      NotificationMessage: '',
      showNotifications: false,
      columns: [{
        dataField: 'id',
        text: 'ID',
        sort: true,
        headerStyle: { 'white-space': 'nowrap' }

      },
      {
        dataField: 'name',
        text: 'Components Name',
        sort: true,
        headerStyle: { 'white-space': 'nowrap' }


      },
      {
        dataField: 'serial',
        text: 'Serial',
        sort: false,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'category.name',
        text: 'Category ',
        sort: true,
        headerStyle: { 'white-space': 'nowrap' }

      },
      {
        dataField: 'location.name',
        text: 'Location ',
        sort: false,
        hidden: true,
        headerStyle: { 'white-space': 'nowrap' }

      },
      {
        dataField: 'company.name',
        text: 'Company ',
        sort: true,
        hidden: true,
        headerStyle: { 'white-space': 'nowrap' }

      },
      {
        dataField: 'qty',
        text: 'Total',
        sort: false,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'remaining',
        text: 'Remaining',
        sort: false,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'min_amt',
        text: 'Min Qty',
        sort: false,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'order_number',
        text: 'Order Number',
        sort: false,
        hidden: true,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'purchase_date.formatted',
        text: 'Purchase Date',
        sort: false,
        hidden: true,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'purchase_cost',
        text: 'Purchase Cost',
        sort: false,
        hidden: true,
        headerStyle: { 'white-space': 'nowrap' }
      }
      ],
      offset: 0,
      sortField: 'id',
      sortOrder: 'desc',
      page: 1,
      sizePerPage: 10,
      searchText: ''
    }

    this.handleTableChange = this.handleTableChange.bind(this);

  }



  componentDidMount() {
    this.setState({ NotificationMessage: this.props.NotificationMessage });
    this.setState({ showNotifications: this.props.showNotifications });
    this.setState({ CategoriesDatatoUpdate: this.props.CategoriesDatatoUpdate });
    this.callServerData(this.state.page);
  }

  callServerData() {
    const url = Domain + '/components?category_id=' + this.props.CategoriesDatatoUpdate.category.id +
      '&limit=' + this.state.sizePerPage +
      '&offset=' + this.state.offset +
      '&search=' + this.state.searchText +
      '&sort=' + this.state.sortField +
      '&order=' + this.state.sortOrder + '';

    axios.get(url)
      .then((response) => {
        this.setState({ ComponentsData: response.data.rows });
        this.setState({ ComponentsDataTotal: response.data.total });
      });
  }



  deleteAccessories = (id) => {

    const url = Domain + '/components/' + id;
    axios.delete(url)
      .then((response) => {
        this.setState({ showNotifications: true });
        console.log("delete message" + response.data.messages);
        this.setState({ NotificationMessage: response.data.messages });
        this.setState({ ComponentsData: this.state.ComponentsData.filter(result => result.id !== id) });
      })
  }
  myColumnToggle = (df, columns) => {
    var newTableColumns = columns.map((val) => {
      if (val.dataField === df) {
        val.hidden = !val.hidden
      }
      return val;
    });
    this.setState({ columns: newTableColumns })
  }
  myChangeHandler = (event) => {

    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  }
  BackBtnClick = () => {
    const { ShowCreate } = this.state;
    this.setState({ ShowCreate: !ShowCreate });
  }
  CreateBtnClick = () => {
    const { ShowCreate } = this.state;
    this.setState({ ShowCreate: !ShowCreate });
  }
  SearchBtnClick = () => {
    this.callServerData();
  }

  handleTableChange = async (type, { page, sizePerPage, sortField, sortOrder }) => {
    const offset = (page - 1) * sizePerPage;
    if (sortField == null || sortField === 'undefined')
      sortField = this.state.sortField;
    if (sortOrder == null || sortOrder==='undefined')
      sortOrder = this.state.sortOrder;

    await this.setState({ page: page, offset: offset, sizePerPage: sizePerPage, sortField: sortField, sortOrder: sortOrder });
    this.callServerData();
  }
  BackBtnClick = () => {
    this.setState({ ShowCategories: false });
    this.setState({ ShowCreate: false });
    this.setState({ showUpdate: false });
    this.setState({ ShowMain: true })
  }

  CategoriesCreateClick = () => {
    this.setState({ ShowCategories: false });
    this.setState({ ShowCreate: true });
    this.setState({ showUpdate: false });
    this.setState({ ShowMain: false })
  }

  UpdateCategories = () => {
    this.setState({ ShowCategories: false });
    this.setState({ ShowCreate: false });
    this.setState({ showUpdate: true });
    this.setState({ ShowMain: false })
  }
  onLanguageHandle = (event) => {
    let newLang = event.target.value;
    this.setState({ value: newLang })
    this.props.i18n.changeLanguage(newLang)
  }
  render() {
    const { ShowCreate, ShowMain, showUpdate } = this.state;
    const { ComponentsData, sizePerPage, page } = this.state;
    const { t } = this.props;

    const { ExportCSVButton } = CSVExport;
    const CustomToggleList = ({ columns, onColumnToggle, toggles }) => (
      <div className="text-center">
        <div class="pull-left">
          <div class="btn-group pull-left">
          <button class=" btn-default dropdown-toggle customcolumns-csv" data-toggle="dropdown" data-tooltip="true" title="Columns"><i class="fa fa-columns"></i>

</button>
            <ul class="dropdown-menu customcolumn-scroll">

              {columns
                .map(column => ({
                  ...column,
                  toggle: toggles[column.dataField]
                }))
                .map((column, index) => (
                  <React.Fragment >

                    <label className="custom-toggle custom-table table-responsive" >

                      <input type="checkbox" key={column.dataField} id={column.dataField} checked={column.toggle} aria-checked={column.toggle ? "true" : "false"}
                        onChange={() => this.myColumnToggle(column.dataField, columns)} />
                      &nbsp;
                      {column.text}
                    </label>
                  </React.Fragment>
                ))}
            </ul>
          </div>
        </div>
      </div>

    );





    if (ShowCreate) {
      return (
        <CategoriesCreate />
      )
    }
    else if (showUpdate) {
      return (
        <CategoriesUpdate CategoriesDatatoUpdate={this.props.CategoriesDatatoUpdate} />
      )
    }
    else if (ShowMain) {

      return (
        <ComponentsMain />
      )
    }
    else {
      return (
        <div>
          <div >

            <div class="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 class="h3 mb-0 text-gray-800 custommain-title">{t('component.componentname')}</h1>

              <div class="row mb-0">
                <div class="col">

                  <button onClick={this.BackBtnClick} className=" btn btn-sm btn-primary shadow-sm custommain-title">
                    {t('button.back')}</button>
                </div>
              </div>
            </div>
            <div >
              <RemoteAll
                data={ComponentsData}
                page={page}
                sizePerPage={sizePerPage}
                totalSize={this.state.ComponentsDataTotal}
                columns={this.state.columns}
                CSVExport={CSVExport}
                ExportCSVButton={ExportCSVButton}
                CustomToggleList={CustomToggleList}
                onTableChange={this.handleTableChange}
                myChangeHandler={this.myChangeHandler}
                SearchBtnClick={this.SearchBtnClick}
              />
            </div>
          </div>

        </div>
      )
    }
  }
}
export default withTranslation()(ComponentsCategory);

