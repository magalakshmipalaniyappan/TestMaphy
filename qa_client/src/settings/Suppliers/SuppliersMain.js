import React, { Component } from 'react';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
import { withTranslation} from 'react-i18next'

import SuppliersCreate from './SuppliersCreate';
import SuppliersUpdate from './SuppliersUpdate';
import SuppliersDetails from './SuppliersDetails';
const Domain = process.env.REACT_APP_URL;

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
        <div class="custom-table">
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
class SuppliersMain extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: "en",
      SuppliersData: [],
      SuppliersId: '',
      SuppliersDetails: [],
      SupplierstoUpdate: '',
      SuppliersId_Details: '',

      SuppliersNametoUpdate: '',
      SuppliersDataTotal: '',

      ShowCreate: false,
      ShowUpdate: false,
      ShowDetails: false,
      showNotifications: false,
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
 headerStyle: { 'white-space': 'nowrap' }

      }, 
      {
        dataField: 'name',
        text: 'Vendors Name',
        sort: true,
        formatter: this.DetailsFormatter,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'address',
        text: 'Vendors Address',
        sort: false,
        hidden: true,
        headerStyle: { 'white-space': 'nowrap' }

      },
      {
        dataField: 'address2',
        text: 'Vendors Address2',
        sort: false,
        hidden: true,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'city',
        text: 'City',
        sort: false,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'state',
        text: 'State',
        sort: false,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'zip',
        text: 'Zip Code',
        sort: false,
        hidden:true,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'country',
        text: 'Country',
        sort: false,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'phone',
        text: 'Phone',
        sort: false,
        formatter: this.PhoneFormatter,
        hidden: true,
        headerStyle: { 'white-space': 'nowrap' }

      },

      {
        dataField: 'email',
        text: 'Email',
        sort: false,
        formatter: this.EmailFormatter,
        hidden: true,
        headerStyle: { 'white-space': 'nowrap' }

      },
      {
        dataField: 'contact',
        text: 'Contact Name',
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
        dataField: 'url',
        text: 'URL',
        sort: false,
        hidden: true,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'assets_count',
        text: 'Assets',
        sort: false,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'accessories_count',
        text: 'Accessories',
        sort: false,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'licenses_count',
        text: 'Licenses',
        sort: false,
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
    this.setState({ NotificationMessage: this.props.NotificationMessage });
    this.setState({ showNotifications: this.props.showNotifications });
    this.callServerData(this.state.page);
  }
  callServerData() {
    const url = Domain + '/suppliers?limit=' + this.state.sizePerPage +
      '&offset=' + this.state.offset +
      '&search=' + this.state.searchText +
      '&sort=' + this.state.sortField +
      '&order=' + this.state.sortOrder + '';
    axios.get(url)
      .then((response) => {
         this.setState({ SuppliersData: response.data.rows });
        this.setState({ SuppliersDataTotal: response.data.total });
      });
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

  EditDeleteFormatter = (cell, row, rowIndex) => {
    const { t } = this.props

    return (
      <div class="btn-group" role="group" >
        <button name="edit" class=" btn-sm btn-warning custombtn" data-tooltip="true" title={t('button.edit')} onClick={() => { this.UpdateSuppliers(row) }}><i class="fa fa-edit" aria-hidden="true"></i></button>
        {(row.licenses_count || row.assets_count || row.accessories_count !== 0) ? <button name="delete" class=" btn-sm btn-danger custombtn" data-tooltip="true" title={t('button.delete')} disabled><i class="fa fa-trash" aria-hidden="true"></i></button>
          : <button name="delete" class=" btn-sm btn-danger custombtn" data-tooltip="true" title={t('button.delete')} onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.deleteSuppliers(row.id) }}><i class="fa fa-trash" aria-hidden="true"></i></button>
        }
      </div>
    );
  };

  DetailsFormatter = (cell, row, rowIndex) => {
    return (
      <div>
        <button class="btn btn-link customlink-btn customlink-formater" name="btnupdate" onClick={() => { this.SuppliersDetails(row) }}>{row.name}</button>

      </div>
    );
  };
  EmailFormatter = (cell, row, rowIndex) => {
    return (
      <div>

        <a href="mailto:#">{row.email}</a>
      </div>
    );
  };
  PhoneFormatter = (cell, row, rowIndex) => {
    return (
      <div>
        <a href="tel:#">{row.phone}</a>

      </div>
    );
  };
  CreateBtnClick = () => {
    const { ShowCreate } = this.state;
    this.setState({ ShowCreate: !ShowCreate });
  }

  deleteSuppliers = (id) => {
    const url = Domain + '/suppliers/' + id;
    axios.delete(url)
      .then((response) => {
        this.setState({ showNotifications: true });
        this.setState({ NotificationMessage: response.data.message });
        this.callServerData(this.state.page);
      })
  }

  UpdateSuppliers = (row) => {
    this.setState({ SupplierstoUpdate: row });
    const { ShowUpdate } = this.state;
    this.setState({ ShowUpdate: !ShowUpdate });

  }
  SuppliersDetails = (row) => {
    this.setState({ SuppliersDetails: row });
    const { ShowDetails } = this.state;
    this.setState({ ShowDetails: !ShowDetails });
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
    const { ShowCreate, ShowDetails, ShowUpdate } = this.state;
    const { SuppliersData, sizePerPage, page } = this.state;
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
<br />
                    <label className="custom-toggle custom-table  table-responsive" >

                      <input type="checkbox" key={column.dataField} id={column.dataField} checked={column.toggle} aria-checked={column.toggle ? "true" : "false"}
                        onChange={() => this.myColumnToggle(column.dataField, columns)} />
                       &nbsp;&nbsp;
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
        <SuppliersCreate />
      )
    }
    else if (ShowUpdate) {
      return (
        <SuppliersUpdate SupplierstoUpdate={this.state.SupplierstoUpdate} />
      )
    }
    else if (ShowDetails) {
      return (
        <SuppliersDetails SuppliersDetails={this.state.SuppliersDetails} />
      )
    }
    else {
      return (
        <div>
          <div >
            <div class="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 class="h3 mb-0 text-gray-800 custommain-title">{t('supplier.name')}</h1>

              <div class="row mb-0">
                <div class="col">
                  <button onClick={this.CreateBtnClick} className="btn btn-sm btn-primary shadow-sm custommain-title">
                  {t('button.create')}</button>
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
                data={SuppliersData}
                page={page}
                sizePerPage={sizePerPage}
                totalSize={this.state.SuppliersDataTotal}
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
export default withTranslation()(SuppliersMain);

