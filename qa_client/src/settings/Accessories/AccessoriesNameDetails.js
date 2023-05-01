
import React, { Component } from 'react';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';

import { withTranslation } from 'react-i18next'
import AccessoriesCheckin from './AccessoriesCheckin';

import AccessoriesCheckout from './AccessoriesCheckout';
import AccessoriesUpdate from './AccessoriesUpdate';

import AccessoriesMain from './AccessoriesMain';

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
      noDataIndication={ indication }
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
class AccessoriesNameDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
value: "en",
      AccessoriesData: [],
      AccessoriesId: '',
      AccessoriesIdToUpdate: '',
      AccessoriesDatatoUpdate: '',
      AccessoriesDataTotal: '',
      AccessoriesNameDetails: '',
      AccessoriestoUpdate: '',
      AccessoriesDatatoCheckout: '',

      ShowCreate: false,
      ShowUpdate: false,
      ShowCheckin: false,
      ShowMain: false,
      ShowAccessories: false,
      ShowCheckout: false,

      NotificationMessage: '',
      showNotifications: false,

     columns : [
      {
        dataField: 'assigned_pivot_id',
        text: 'Seat ',
 hidden: true,
        headerStyle:  { 'white-space' : 'nowrap' }
      },
      {
        dataField: 'name',
        text: 'Name',
headerStyle:  { 'white-space' : 'nowrap' }
      },
      {
        dataField: 'checkout_notes',
        text: 'Notes',
        sort: false,
        headerStyle:  { 'white-space' : 'nowrap' }
      },
      {
        dataField: 'last_checkout.formatted',
        text: 'Checkout Date',
        sort: false,
        headerStyle:  { 'white-space' : 'nowrap' }
      },

      { dataField: "Actions", text: "Actions", sort: false, hidden: false, formatter: this.CheckinFormatter }],
   

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
    console.log("AccessoriesNameDetails:", this.props.AccessoriesNameDetails);
    this.setState({ AccessoriestoUpdate: this.props.AccessoriestoUpdate });
    this.callServerData(this.state.page);
  }
  myColumnToggle = (df,columns) => {
    var newTableColumns = columns.map( (val) => {
       if( val.dataField === df) {
         val.hidden = !val.hidden
       }
       return val;
    });
    this.setState({columns:newTableColumns})
  }
  callServerData() {
    const url = Domain + '/accessories/' + this.props.AccessoriesNameDetails.id + '/checkedout?' +
      'limit=' + this.state.sizePerPage +
      '&offset=' + this.state.offset +
      '&search=' + this.state.searchText +
      '&sort=' + this.state.sortField +
      '&order=' + this.state.sortOrder + '';

    axios.get(url)
      .then((response) => {
this.setState({ AccessoriesData: response.data.rows });
        this.setState({ AccessoriesDataTotal: response.data.total });
      });
  }
  BackBtnClick = () => {
    this.setState({ ShowAccessories: false });
    this.setState({ ShowCreate: false });
    this.setState({ ShowUpdate: false });
    this.setState({ ShowMain: true })
  }
  CheckinFormatter = (cell, row, rowIndex) => {
    const { t } = this.props;    

    return (
      <button name="btnCheckin" class=" btn-sm custombg-checkout custombtn" onClick={() => { if (window.confirm('Are you sure you wish to Checkin these items?')) this.CheckinAccessories(row) }}>{t('button.checkin')}</button>
    );

  };
  CheckoutAccessories = () => {
    this.setState({ ShowAccessories: false });
    this.setState({ ShowCheckout: true });
    this.setState({ ShowUpdate: false });
    this.setState({ ShowMain: false })
  }

  UpdateAccessories = () => {
    this.setState({ ShowAccessories: false });
    this.setState({ ShowCreate: false });
    this.setState({ ShowUpdate: true });
    this.setState({ ShowMain: false })
  }
  CheckinAccessories = (row) => {
    this.setState({ AccessoriestoUpdate: row });
    const { ShowCheckin } = this.state;
    this.setState({ ShowCheckin: !ShowCheckin });
  }



  myChangeHandler = (event) => {

    this.setState({ [event.target.name]:event.target.value});
  }

  SearchBtnClick = () => {
    this.callServerData();
  }

  handleTableChange = async (type, { page, sizePerPage, sortField, sortOrder }) => {
    const offset = (page - 1) * sizePerPage;
    if (sortField == null || sortField === 'undefined')
      sortField = this.state.sortField;
    if (sortOrder == null || sortOrder === 'undefined')
      sortOrder = this.state.sortOrder;

    await this.setState({ page: page, offset: offset, sizePerPage: sizePerPage, sortField: sortField, sortOrder: sortOrder });
    this.callServerData();
  }
onLanguageHandle = (event) => {
    let newLang = event.target.value;
    this.setState({ value: newLang })
    this.props.i18n.changeLanguage(newLang)
  }
  render() {
    const { t } = this.props;    
    const {  ShowMain, ShowUpdate, ShowCheckin, ShowCheckout } = this.state;
    const { AccessoriesData, sizePerPage, page } = this.state;
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
                onChange={() =>this.myColumnToggle(column.dataField,columns)} />
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
   


    if (ShowCheckin) {
      return (
        <AccessoriesCheckin AccessoriesNameDetails={this.props.AccessoriesNameDetails} AccessoriestoUpdate={this.state.AccessoriestoUpdate} />
      )
    }
    else if (ShowUpdate) {
      return (
        <AccessoriesUpdate AccessoriestoUpdate={this.props.AccessoriesNameDetails} />
      )
    }
    else if (ShowMain) {

      return (
        <AccessoriesMain />
      )
    }
    else if (ShowCheckout) {
      return (
        <AccessoriesCheckout AccessoriesDatatoCheckout={this.props.AccessoriesNameDetails} />
      )
    }
    else {
      return (

        <div>
          <div >
            <div class="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 class="h3 mb-0 text-gray-800 custommain-title" name="accessoriestitle">{t('accessory.accessoriestitle')} - {this.props.AccessoriesNameDetails.name}</h1>
          <div class="pull-left">
              <div class="btn-group pull-left">
                  <button class="btn btn-primary customcolumns-csv dropdown-toggle  customcolumns-csv" data-toggle="dropdown" name="actions">{t('button.actions')}
                       </button>
                <ul class="dropdown-menu">
                 {this.props.AccessoriesNameDetails.remaining_qty > 0? <li><button name="btnCheckout" class="btn btn-link" onClick={this.CheckoutAccessories}>{t('accessory.checkoutaccessory')}</button></li> :null}
                  <li><button name="btnUpdate" class="btn btn-link" onClick={this.UpdateAccessories}>{t('accessory.updateaccessory')}</button></li>
                </ul> &nbsp;
                 <button name="back" onClick={this.BackBtnClick} className="  btn btn-primary customcolumns-csv">
               {t('button.back')}</button>
          </div>
              </div>
            </div>
            <div >
            <RemoteAll
              data={AccessoriesData}
              page={page}
              sizePerPage={sizePerPage}
              totalSize={this.state.AccessoriesDataTotal}
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

export default withTranslation()(AccessoriesNameDetails);