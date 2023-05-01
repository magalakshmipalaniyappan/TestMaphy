
import React, { Component } from 'react';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
import LicensesMain from './LicensesMain';
import LicenseCheckIn from './LicenseCheckIn';
//import LicenseCheckOut from './LicenseSeatCheckout';
import LicenseCheckOut from './CheckOutLicense';
import { withTranslation } from 'react-i18next'


const Domain = process.env.REACT_APP_URL;

//var NotificationMessage = "";
const RemoteAll = ({ data,
  page,
  sizePerPage,
  defaultSorted,
  totalSize,
  onTableChange,
  columns,
  myChangeHandler,
    SearchBtnClick,
  ExportCSVButton,
  CustomToggleList }) => (
  <div>
    <ToolkitProvider
      keyField="id"
      data={data}
      columns={columns}
      defaultSorted={defaultSorted}
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
class LicenseSeats extends Component {
  constructor(props) {
    super(props)
    this.state = {
value:"en",
      LicensesData: [],
      ConsumablesId: '',
      ConsumablesIdToUpdate: '',
      LicensesDatatoUpdate: '',
      LicensesDataTotal: '',
      //CompanyId_Details: '',

      ShowMain: false,
      ShowUpdate: false,
      ShowCheckIn: false,
      ShowCheckOut: false,
      NotificationMessage: '',
      showNotifications: false,

      offset: 0,
      sortField: 'id',
      sortOrder: 'desc',
      page: 1,
      sizePerPage: 10,
      searchText: '',
       columns :[
      {
        dataField: 'name',
        text: 'Seat',
        sort: true,
        headerStyle:  { 'white-space' : 'nowrap' }
      },
      {
        dataField: 'assigned_user.name',
        text: 'User',
        sort: true,
        headerStyle:  { 'white-space' : 'nowrap' }
      },
      
      {
        dataField: 'assigned_asset.name',
        text: 'Asset',
        sort: true,
        headerStyle:  { 'white-space' : 'nowrap' }
      },

      {
        dataField: 'checkincheckout',
        text: 'CheckIn/checkOut',
        sort: false,
        formatter: this.CheckInFormatter,
        headerStyle:  { 'white-space' : 'nowrap' }
      },
    ]

    }

    this.handleTableChange = this.handleTableChange.bind(this);
  }



  componentDidMount() {

    this.callServerData(this.state.page);
  }

  callServerData() {
    const url = Domain + '/licenses/' + this.props.LicensesDatatoUpdate.id + '/seats?' +
      'limit=' + this.state.sizePerPage +
      '&offset=' + this.state.offset +
      '&search=' + this.state.searchText +
      '&sort=' + this.state.sortField +
      '&order=' + this.state.sortOrder + '';

    axios.get(url)
      .then((response) => {
    
        this.setState({ LicensesData: response.data.rows });
        this.setState({ LicensesDataTotal: response.data.total });
      });
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
  

 CheckInFormatter = (cell, row, name, rowIndex) => {
  const { t } = this.props

      if ((Object.keys(row.assigned_user).length === 0) && (Object.keys(row.assigned_asset).length === 0)) {
        return (
          <div>
            <button name="btnCheckout" class="btn-sm custombg-checkout custombtn" onClick={() => { if (window.confirm('Are you sure you wish to CheckOut this item?')) this.CheckOutLicenses(row) }}>{t('button.checkout')}</button>
          </div>
        );
      }
      else {
        return (
          <div>
            <button name="btnCheckin" class=" btn-sm custombg-checkout custombtn" onClick={() => { if (window.confirm('Are you sure you wish to CheckIn these items?')) this.CheckInLicenses(row) }}>{t('button.checkin')}</button>


          </div>
        );
      }
    };

    onLanguageHandle = (event) => {
      let newLang = event.target.value;
      this.setState({ value: newLang })
      this.props.i18n.changeLanguage(newLang)
    }


  myChangeHandler = (event) => {

    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  }

  SearchBtnClick = () => {
    this.callServerData();
  }
  CheckInLicenses = (row) => {
    this.setState({ LicensesSeatstoCheckin: row });
    const { ShowCheckIn } = this.state;
    this.setState({ ShowCheckIn: !ShowCheckIn });
  }

  CheckOutLicenses = (row) => {
    this.setState({ LicensesSeatstoCheckout: row });
    const { ShowCheckOut } = this.state;
    this.setState({ ShowCheckOut: !ShowCheckOut });
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

  render() {
    const { ShowMain, ShowCheckIn, ShowCheckOut } = this.state;
    const { LicensesData, sizePerPage, page } = this.state;
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
          <br />
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


    

    if (ShowMain) {
      return (
        <LicensesMain />
      )
    }
    else if (ShowCheckIn) {
      return (
        <LicenseCheckIn LicensesSeatstoCheckin={this.state.LicensesSeatstoCheckin} LicensesDatatoUpdate={this.props.LicensesDatatoUpdate} />
      )
    }
    else if (ShowCheckOut) {
      return (
        <LicenseCheckOut LicensesSeatstoCheckout={this.state.LicensesSeatstoCheckout} LicensesDatatoCheckout={this.props.LicensesDatatoUpdate} mainPage="licenseSeats"/>
      )
    }
    else {
      return (
        <div>

          <div>

            <div >
            <RemoteAll
                data={LicensesData}
                page={page}
                sizePerPage={sizePerPage}
                totalSize={this.state.LicensesDataTotal}
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
export default withTranslation()(LicenseSeats);
