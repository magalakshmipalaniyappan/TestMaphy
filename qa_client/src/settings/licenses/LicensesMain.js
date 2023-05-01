
import React, { Component } from 'react';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
import LicenseNameLink from './LicenseNameLink';
import LicensesCreate from './LicensesCreate';
import LicensesUpdate from './LicensesUpdate';
//import LicenseClone from './LicenseClone';
import CheckOutLicense from './CheckOutLicense';
import { withTranslation } from 'react-i18next';

const Domain = process.env.REACT_APP_URL;

var userpermission = "";

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
                <div> <input type='text' placeholder="Search" name="searchText" onChange={myChangeHandler} />
                  <button type='input' data-tooltip="true" title="Search" class="custombg-search" onClick={SearchBtnClick}><i class="fa fa-search"></i></button></div>
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
class LicensesMain extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: "en",
      LicensesData: [],
      LicensesDataTotal: '',
      ShowCreate: false,
      ShowUpdate: false,
      ShowCheckOut: false,
      ShowLicense: false,
      NotificationMessage: '',
      showNotifications: false,
      licenseType: props.location ? props.location.licenseType : (props.licenseType ? props.licenseType : "all"),
      columns: [{
        dataField: 'id',
        text: 'ID',
        sort: true,
        hidden: true,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'company.name',
        text: 'Company',
        sort: true,
        hidden: true,
        headerStyle: { 'white-space': 'nowrap' }

      },
      {
        dataField: 'name',
        text: 'License',
        sort: true,
        formatter: this.LicenselinkFormatter,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'product_key',
        text: 'Product Key',
        sort: false,
        hidden: true,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'expiration_date.formatted',
        text: 'Expired Date',
        sort: false,
        hidden: true,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'license_email',
        text: 'Licensed To Email',
        sort: false,
        headerStyle: { 'white-space': 'nowrap' }

      },
      {
        dataField: 'license_name',
        text: 'Licensed To Name',
        sort: false,
        headerStyle: { 'white-space': 'nowrap' }

      },
      {
        dataField: 'category.name',
        text: 'Category',
        sort: false,
        headerStyle: { 'white-space': 'nowrap' }


      },
      {
        dataField: 'supplier.name',
        text: 'Vendor',
        sort: true,
        headerStyle: { 'white-space': 'nowrap' }

      },
      {
        dataField: 'manufacturer.name',
        text: 'Manufacturer',
        sort: false,
        headerStyle: { 'white-space': 'nowrap' }

      },
      {
        dataField: 'seats',
        text: 'Total',
        sort: false,
        headerStyle: { 'white-space': 'nowrap' }

      },
      {
        dataField: 'free_seats_count',
        text: 'Avail',
        sort: false,
        headerStyle: { 'white-space': 'nowrap' }

      },
      {
        dataField: 'purchase_date.formatted',
        text: 'Purchase Date',
        sort: false,
        headerStyle: { 'white-space': 'nowrap' }


      },
      {
        dataField: 'maintained',
        text: 'Maintained',
        sort: false,
        hidden: true,
        formatter: this.MaintainedFormatter,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'reassignable',
        text: 'Re-Assignable',
        sort: false,
        hidden: true,
        formatter: this.ReassignableFormatter,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'purchase_cost',
        text: 'Purchase Cost',
        sort: false,
        hidden: true,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'purchase_order',
        text: 'Purchase Number',
        sort: false,
        hidden: true,
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
        dataField: 'notes',
        text: 'Notes',
        sort: false,
        hidden: true,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'checkincheckout',
        text: 'Checkin/Checkout',
        sort: false,
        formatter: this.CheckOutFormatter,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: "Actions",
        text: "Actions",
        sort: false,
        hidden: false,
        formatter: this.EditDeleteFormatter,
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
    //this.handleTableChange = this.handleTableChange.bind(this);
  }



  componentDidMount() {
    userpermission = JSON.parse(localStorage.getItem('permissions'));
    this.setState({ NotificationMessage: this.props.NotificationMessage });
    this.setState({ showNotifications: this.props.showNotifications });
    this.callServerData(this.state.page);
  }

  callServerData() {
    const url = Domain + '/licenses?limit=' + this.state.sizePerPage +
      '&offset=' + this.state.offset +
      '&search=' + this.state.searchText +
      '&sort=' + this.state.sortField +
      '&order=' + this.state.sortOrder + 
      '&type=' + this.state.licenseType + '';
    axios.get(url)
      .then((response) => {

        this.setState({ LicensesData: response.data.rows });
        this.setState({ LicensesDataTotal: response.data.total });
      });
  }

  CheckOutFormatter = (cell, row, rowIndex) => {
    const { t } = this.props

    if (row.free_seats_count > 0 && (userpermission.superuser === "1")) {
      return (
        <button name="btnCheckout" class="btn-sm custombg-checkout custombtn" onClick={() => { if (window.confirm('Are you sure you wish to CheckOut these items?')) this.CheckOutLicenses(row) }}>{t('button.checkout')}</button>
      );
    }
    else {
      return (
        <button name="btnCheckout" class=" btn-sm custombg-checkout-disable custombtn" disabled>{t('button.checkout')}</button>
      );
    }
  };

  EditDeleteFormatter = (cell, row, rowIndex) => {
    const { t } = this.props

    return (
      <div class="btn-group" role="group" >
        {(userpermission.superuser === "1") ?
          <>
            <button name="edit" class="btn-sm btn-warning custombtn" data-tooltip="true" title={t('button.edit')} onClick={() => { this.UpdateLicenses(row) }}><i class="fa fa-edit" aria-hidden="true"></i></button>
            <button name="clone" class="btn-sm btn-info custombtn" data-tooltip="true" title={t('button.clone')} onClick={() => { this.CloneLicenses(row) }}><i class="fa fa-copy" aria-hidden="true"></i></button>
            {(row.seats !== row.free_seats_count) ? <button name="delete" class="btn-sm btn-danger custombtn" data-tooltip="true" title={t('button.delete')} disabled><i class="fa fa-trash" aria-hidden="true"></i></button>
              : <button name="delete" class="btn-sm btn-danger custombtn" data-tooltip="true" title={t('button.delete')} onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.deleteLicenses(row.id) }}><i class="fa fa-trash" aria-hidden="true"></i></button>

            }
          </>
          : <>
            <button name="edit" class="btn btn-sm btn-warning" data-tooltip="true" title={t('button.edit')} disabled><i class="fa fa-edit" aria-hidden="true"></i></button>
            <button name="clone" class="btn btn-sm btn-info" data-tooltip="true" title={t('button.clone')} disabled><i class="fa fa-copy" aria-hidden="true"></i></button>
            <button name="delete" class="btn btn-sm btn-danger" data-tooltip="true" title={t('button.delete')} disabled><i class="fa fa-trash" aria-hidden="true"></i></button>
          </>
        }

      </div>
    );
  };
  ReassignableFormatter = (cell, row, rowIndex) => {
    if (row.reassignable === 1) {
      return (<i class="fa fa-check text-success"></i>)
    }
    else {
      return (<i class="fa fa-times text-danger"></i>);
    }
  };

  MaintainedFormatter = (cell, row, rowIndex) => {
    if (row.reassignable === 1) {
      return (<i class="fa fa-check text-success"></i>)
    }
    else {
      return (<i class="fa fa-times text-danger"></i>);
    }
  };

  LicenselinkFormatter = (cell, row, name, rowIndex) => {
    return (
      <div>
        <button class="btn btn-link customlink-btn" name="btnupdate" onClick={() => { this.LicenseDetails(row) }}>{row.name}</button>
      </div>
    );
  };


  myColumnToggle = (df, columns) => {
    var newTableColumns = columns.map((val) => {
      if (val.dataField === df) {
        val.hidden = !val.hidden
      }
      return val;
    });
    this.setState({ columns: newTableColumns })
  }

  CreateBtnClick = () => {
    const { ShowCreate } = this.state;
    this.setState({ ShowCreate: !ShowCreate });
  }

  deleteLicenses = (id) => {

    const url = Domain + '/licenses/' + id;
    
    axios.delete(url)
      .then((response) => {
        this.setState({ showNotifications: true });
        this.setState({ NotificationMessage: response.data.message });
        this.callServerData(this.state.page);
      })
  }

  UpdateLicenses = (row) => {
    this.setState({ LicensesDatatoUpdate: row });
    const { ShowUpdate } = this.state;
    this.setState({ ShowUpdate: !ShowUpdate });
    this.setState({ editProcess: "Update" });
  }
  CloneLicenses = (row) => {
    this.setState({ LicensesDatatoUpdate: row });
    const { ShowUpdate } = this.state;
    this.setState({ ShowUpdate: !ShowUpdate });
    this.setState({ editProcess: "Clone" });
  }
  CheckOutLicenses = (row) => {
    this.setState({ LicensesDatatoUpdate: row });
    const { ShowCheckOut } = this.state;
    this.setState({ ShowCheckOut: !ShowCheckOut });
  }
  CheckInLicenses = (row) => {
    this.setState({ LicensesDatatoUpdate: row });
    const { ShowCheckIn } = this.state;
    this.setState({ ShowCheckIn: !ShowCheckIn });
  }

  LicenseDetails = (row) => {
    this.setState({ LicensesDatatoUpdate: row });
    const { ShowLicense } = this.state;
    this.setState({ ShowLicense: !ShowLicense });
  }


  myChangeHandler = (event) => {

    this.setState({ [event.target.name]: event.target.value });
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
    const { ShowCreate, ShowLicense, ShowCheckOut, ShowUpdate } = this.state;
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
                        onChange={() => this.myColumnToggle(column.dataField, columns)} />

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
        <LicensesCreate />
      )
    }
    else if (ShowUpdate) {
      return (
        <LicensesUpdate LicensesDatatoUpdate={this.state.LicensesDatatoUpdate} editProcess={this.state.editProcess} />
      )
    }

    else if (ShowCheckOut) {
      return (
        <CheckOutLicense LicensesDatatoCheckout={this.state.LicensesDatatoUpdate} mainPage="licenseMain" />
      )
    }


    else if (ShowLicense) {

      return (
        <LicenseNameLink LicensesDatatoUpdate={this.state.LicensesDatatoUpdate} />
      )
    }

    else {
      return (
        <div>
          <div >
            <div class="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 class="h3 mb-0 text-gray-800 custommain-title" name="softwarelicense">{t('license.softwarelicense')}</h1>

              <div class="row mb-0">
                <div class="col">
                  {(userpermission.superuser === "1") ?
                    <button name="create" onClick={this.CreateBtnClick} className="btn btn-sm btn-primary shadow-sm custommain-title">
                      {t('button.create')}</button> : null}
                </div>
              </div>
            </div>
            {(() => {
              if (this.state.showNotifications) {
                return (
                  <div class="row">
                    <div class="col-md-12">
                      <div class="alert alert-success alert-dismissible fade show" role="alert">
                        <strong>{this.state.NotificationMessage}</strong>

                      </div>
                    </div>
                  </div>
                )
              }
            })()}
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

export default withTranslation()(LicensesMain);