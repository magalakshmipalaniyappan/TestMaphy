import React, { Component } from 'react';
import axios from 'axios';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
import AccessoriesCreate from './AccessoriesCreate';
import AccessoriesUpdate from './AccessoriesUpdate';
import AccessoriesCheckout from './AccessoriesCheckout';
import AccessoriesNameDetails from './AccessoriesNameDetails';
import { withTranslation } from 'react-i18next'
import AccessoriesCategory from './AccessoriesCategory';
const Domain = process.env.REACT_APP_URL;
var userpermission = "";


const RemoteAll = ({ data,
  page,
  sizePerPage,
  defaultSorted,
  totalSize,
  onTableChange,
  columns,
  indication,
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
class AccessoriesMain extends Component {
  constructor(props) {
    super(props)
    this.state = {
       value: "en",
      AccessoriesData: [],
      AccessoriesDetails: [],
      AccessoriesId: '',
      AccessoriestoUpdate: '',
      AccessoriesDataTotal: '',
      ShowCreate: false,
      ShowUpdate: false,
      ShowDetails: false,
      Showcompany: false,
      ShowCategory: false,
      ShowModel: false,
      ShowManufacture: false,
      ShowSupplier: false,
      ShowLocation: false,
      ShowCheckout: false,
      NotificationMessage: '',
      showNotifications: false,
      ShowName: false,
      offset: 0,
      sortField: 'id',
      sortOrder: 'desc',
      page: 1,
      sizePerPage: 10,
      searchText: '',
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
        text: 'Accessories Name',
        sort: true,
        formatter: this.NameDetailsFormatter,
        headerStyle: { 'white-space': 'nowrap' }

      },
      {
        dataField: 'category.name',
        text: 'Category',
        sort: true,
        formatter: this.CategoryFormatter,
        headerStyle: { 'white-space': 'nowrap' }
      },

      {
        dataField: 'model_number',
        text: 'Model Number',
        sort: false,
        hidden: true,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'qty',
        text: 'Qty',
        sort: false,
        headerStyle: { 'white-space': 'nowrap' }

      },
      {
        dataField: 'remaining_qty',
        text: 'Avail',
        sort: false,
        headerStyle: { 'white-space': 'nowrap' }

      },
      {
        dataField: 'min_qty',
        text: 'Min.Qty',
        sort: false,
        hidden: true,
        headerStyle: { 'white-space': 'nowrap' }

      },
      {
        dataField: 'location.name',
        text: 'Location',
        sort: true,
        hidden: true,

        headerStyle: { 'white-space': 'nowrap' }

      },
      {
        dataField: 'manufacturer.name',
        text: 'Manufacturer',
        sort: false,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'supplier.name',
        text: 'Vendor',
        sort: true,
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

      },
      {
        dataField: 'order_number',
        text: 'Order Number',
        sort: false,
        hidden: true,
        headerStyle: { 'white-space': 'nowrap' }

      },
      {
        dataField: 'checkincheckout',
        text: 'CheckIn/CheckOut',

        formatter: this.CheckoutFormatter,
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

      ]
    }
    this.handleTableChange = this.handleTableChange.bind(this);
  }
  componentDidMount() {
    userpermission = JSON.parse(localStorage.getItem('permissions'));

    this.setState({ NotificationMessage: this.props.NotificationMessage });
    this.setState({ showNotifications: this.props.showNotifications });
    this.callServerData(this.state.page);
    this.callLabel(this.state.page);

  }
  async callLabel() {
    const labelurl = Domain + '/labels';
    await axios.get(labelurl)
      .then((response) => {
        var LabelData = JSON.stringify(response.data.rows);
        localStorage.setItem("LabelData", LabelData);
      });

  }
  async callServerData() {
    const url = Domain + '/accessories?limit=' + this.state.sizePerPage +
      '&offset=' + this.state.offset +
      '&search=' + this.state.searchText +
      '&sort=' + this.state.sortField +
      '&order=' + this.state.sortOrder + '';

    await axios.get(url)
      .then((response) => {
         this.setState({ AccessoriesData: response.data.rows });
        this.setState({ AccessoriesDataTotal: response.data.total });
      });
  }

  EditDeleteFormatter = (cell, row, rowIndex) => {
    const { t } = this.props
    return (
      <div class="btn-group" role="group" >
        {(userpermission.superuser==="1") ?
          <>
            <button name="edit" class=" btn-sm btn-warning custombtn" data-tooltip="true" title={t('button.edit')} onClick={() => { this.UpdateAccessories(row) }}><i class="fa fa-edit" aria-hidden="true"></i></button>
            {(row.qty !== row.remaining_qty) ? <button name="delete" class=" btn-sm btn-danger custombtn" data-tooltip="true" title={t('button.delete')} disabled><i class="fa fa-trash" aria-hidden="true"></i></button>

              : <button name="delete" class="btn-sm btn-danger custombtn" data-tooltip="true" title={t('button.delete')} onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.deleteAccessories(row.id) }}><i class="fa fa-trash" aria-hidden="true"></i></button>

            }
            <button name="print" class=" btn-secondary custombtn" data-tooltip="true" title={t('button.print')} onClick={() => { this.LabelAccessories(row) }}><i class="fas fa-print"></i></button>
          </> :
          <button name="print" class=" btn-secondary custombtn" data-tooltip="true" title={t('button.print')} onClick={() => { this.LabelAccessories(row) }}><i class="fas fa-print"></i></button>
        }
      </div>
    );
  };

  NameDetailsFormatter = (cell, row, rowIndex) => {
    return (
      <div>
        <button class="btn btn-link customlink-btn" name="btnDetails" onClick={() => { this.AccessoriesNameDetails(row) }}>{row.name}</button>

      </div>
    );
  };

  CategoryFormatter = (cell, row, rowIndex) => {
    return (
      <div>
        <button class="btn btn-link customlink-btn" name="btnCategory" onClick={() => { this.AccessoriesCategory(row) }}>{row.category.name}</button>

      </div>
    );
  };

  CheckoutFormatter = (cell, row, rowIndex) => {
    const { t } = this.props

    if (row.remaining_qty > 0 && (userpermission.superuser==="1")) {
      return (
        <button name="btnCheckout" class="btn-sm custombg-checkout custombtn" onClick={() => { if (window.confirm('Are you sure you wish to Checkout these items?')) this.CheckoutAccessories(row) }}>{t('button.checkout')}</button>
      );
    }
    else {
      return (
        <button name="btnCheckout" class="btn-sm custombg-checkout custombtn" disabled>{t('button.checkout')}</button>
      );
    }
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

  deleteAccessories = (id) => {
    const url = Domain + '/accessories/' + id;
    axios.delete(url)
      .then((response) => {
        this.setState({ showNotifications: true });
        this.setState({ NotificationMessage: response.data.message });
        this.callServerData(this.state.page);
      })
  }

  UpdateAccessories = (row) => {
    this.setState({ AccessoriestoUpdate: row });
    const { ShowUpdate } = this.state;
    this.setState({ ShowUpdate: !ShowUpdate });
  }
  CheckoutAccessories = (row) => {
    this.setState({ AccessoriestoUpdate: row });
    const { ShowCheckout } = this.state;
    this.setState({ ShowCheckout: !ShowCheckout });
  }
  LabelAccessories = (row) => {

    var selectedAccessory = JSON.stringify(row);
    localStorage.setItem("AccessoryLabel", selectedAccessory);
    window.open("/AccessoriesLabel", "_blank");
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
  AccessoriesNameDetails = (row) => {
    this.setState({ AccessoriesNameDetails: row });
    const { ShowName } = this.state;
    this.setState({ ShowName: !ShowName });
    console.log("AccessoriesNameDetails" + this.state.AccessoriesNameDetails)
  }

  AccessoriesCategory = (row) => {
    this.setState({ CategoriesDatatoUpdate: row });
    const { ShowCategory } = this.state;
    this.setState({ ShowCategory: !ShowCategory });
  }
   onLanguageHandle = (event) => {
    let newLang = event.target.value;
    this.setState({ value: newLang })
    this.props.i18n.changeLanguage(newLang)
  }
  render() {
     const { t } = this.props;
    const { ShowCreate, ShowUpdate, ShowCategory, ShowName, ShowCheckout} = this.state;
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


    // const defaultSorted = [{
    //   dataField: 'id',
    //   order: 'desc'
    // }];

    if (ShowCreate) {
      return (
        <AccessoriesCreate />
      )
    }
    else if (ShowUpdate) {
      return (
        <AccessoriesUpdate AccessoriestoUpdate={this.state.AccessoriestoUpdate} />
      )
    }


    else if (ShowCheckout) {
      return (
        <AccessoriesCheckout AccessoriesDatatoCheckout={this.state.AccessoriestoUpdate} />
      )
    }

    else if (ShowName) {
      return (
        <AccessoriesNameDetails AccessoriesNameDetails={this.state.AccessoriesNameDetails} />
      )
    }

    else if (ShowCategory) {
      return (
        <AccessoriesCategory CategoriesDatatoUpdate={this.state.CategoriesDatatoUpdate} />
      )
    }

    else {
      return (
        <div>
          <div >
            <div class="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 class="h3 mb-0 text-gray-800 custommain-title" name="accessoriestitle">{t('accessory.accessoriestitle')}</h1>

              <div class="row mb-0">
                <div class="col">
                  {(userpermission.superuser==="1") ? <button name="create" onClick={this.CreateBtnClick} className="btn btn-sm btn-primary shadow-sm custommain-title">
                    {t('button.create')}</button>
                    : null}
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
export default withTranslation()(AccessoriesMain);