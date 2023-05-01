import React, { Component } from 'react';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
//import CompaniesDetails from './CompaniesDetails';
import FieldSetCreate from './FieldSetCreate';
import FieldSetUpdate from './FieldSetUpdate';
import { withTranslation } from 'react-i18next'
const headerSortingStyle = { backgroundColor: '#c8e6c9' };

const Domain = process.env.REACT_APP_URL;
const permissions = localStorage.getItem('permissions');
const RemoteAll = ({ data,
  page,
  sizePerPage,
  defaultSorted,
  totalSize,
  onTableChange,
  columns,
  SearchBtnClick,
  myChangeHandler,
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
        <div className="custom-table  custom-tablelayout">
          <div class="col">
            <div class="row">


              <div class="btn-group" role="group" >
                <CustomToggleList {...toolkitprops.columnToggleProps} />

                <div> <input type='text' placeholder="search" name="searchText" onChange={myChangeHandler} />
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
class FieldSetMain extends Component {
  constructor(props) {
    super(props)
    this.state = {

      CompanyData: [],
      companyDetails: [],
      CompanyId: '',
      CompanyIdToUpdate: '',
      CompanyNametoUpdate: '',
      CompanyDataTotal: '',
      CompanyId_Details: '',
      ShowCreate: false,
      ShowUpdate: false,
      ShowDetails: false,
      NotificationMessage: this.props.NotificationMessage,
      showNotifications: this.props.showNotifications,
      users_count: false,
      id: true,
      name: false,
      accessories_count: false,
      licenses_count: false,
      consumables_count: false,
      assets_count: false,
      components_count: false,
      Actions: false,
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
        dataField: 'name',
        text: 'FieldSet Name',
        sort: true,
        formatter: this.linkFormatter,
        headerStyle: { 'white-space': 'nowrap' }

      },
      {
        dataField: 'users_count',
        text: 'Qty Fields',
        sort: false,
        headerStyle: { 'white-space': 'nowrap' }
      },
    
      {
        dataField: 'components_count',
        text: 'Used By Models',
        sort: false,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'Actions',
        text: 'Actions',
        sort: false,
        hidden: false,
        formatter: this.EditDeleteFormatter
      }

      ]
    }
    this.handleTableChange = this.handleTableChange.bind(this);
    //this.handleTableChange = this.handleTableChange.bind(this);
  }


  columnToggle1 = (column) => {
    let columnToggle = this.state[column];
    this.setState({ [column]: !columnToggle });
  };

  componentDidMount() {
    this.setState({ NotificationMessage: this.props.NotificationMessage });
    this.setState({ showNotifications: this.props.showNotifications });
    this.callServerData(this.state.page);
  }

  callServerData() {
    const url = Domain + '/customFieldsets?limit=' + this.state.sizePerPage +
      '&offset=' + this.state.offset +
      '&search=' + this.state.searchText +
      '&sort=' + this.state.sortField +
      '&order=' + this.state.sortOrder + '';
    axios.get(url)
      .then((response) => {
        this.setState({ CompanyData: response.data.rows });
        this.setState({ CompanyDataTotal: response.data.total });
      });


  }

  EditDeleteFormatter = (cell, row, rowIndex) => {
    const { t } = this.props
    return (
      <div class="btn-group" role="group" >
        {/* <button name="edit" class="btn-sm btn-warning custombtn" data-tooltip="true" title={t('button.edit')} onClick={() => { this.UpdateCompany(row) }}><i class="fa fa-edit" aria-hidden="true"></i></button> */}

        {(row.accessories_count || row.assets_count || row.licenses_count || row.consumables_count || row.components_count || row.users_count !== 0) ? <button name="delete" class="btn-sm btn-danger custombtn" data-tooltip="true" title={t('button.delete')} disabled><i class="fa fa-trash" aria-hidden="true"></i></button>
          : <button name="delete" class="btn-sm btn-danger custombtn" data-tooltip="true" title={t('button.delete')} onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.deleteCompany(row.id) }}><i class="fa fa-trash" aria-hidden="true"></i></button>
        }

      </div>
    );
  };
  linkFormatter = (cell, row, rowIndex) => {
    return (

      <div>
        <button class="btn btn-link customlink-btn" name="btnupdate" onClick={() => { this.CompanyDetails(row) }}>{row.name}</button>

      </div>
    );
  };
  CreateBtnClick = () => {
    const { ShowCreate } = this.state;
    this.setState({ ShowCreate: !ShowCreate });
  }

  deleteCompany = async (id) => {

    const url = Domain + '/companies/' + id;
    await axios.delete(url)
      .then((response) => {
        this.setState({ showNotifications: true });
        this.setState({ NotificationMessage: response.data.message });
        this.callServerData(this.state.page);

      })

  }

  UpdateCompany = (row) => {

    this.setState({ companyDetails: row });
    const { ShowUpdate } = this.state;
    this.setState({ ShowUpdate: !ShowUpdate });

  }
  CompanyDetails = (row) => {

    this.setState({ companyDetails: row });
    const { ShowDetails } = this.state;
    this.setState({ ShowDetails: !ShowDetails });

  }
  myChangeHandler = (event) => {

    this.setState({ [event.target.name]: event.target.value });
  }

  SearchBtnClick = () => {
    this.callServerData();
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
  handleTableChange = async (type, { page, sizePerPage, sortField, sortOrder }) => {
    const offset = (page - 1) * sizePerPage;
    console.log("offset v", offset)
    if (sortField == null || sortField === 'undefined')
      sortField = this.state.sortField;
    if (sortOrder == null || sortOrder==='undefined')
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

    const { t } = this.props

    const { ShowCreate, ShowDetails, ShowUpdate } = this.state;
    const { CompanyData, sizePerPage, page } = this.state;
    const { ExportCSVButton } = CSVExport;
    const CustomToggleList = ({ columns, onColumnToggle, toggles }) => (
      <div className="text-center">
        <div class="pull-left ">
          <div class="btn-group pull-left ">
            <button class=" btn-default dropdown-toggle customcolumns-csv" data-toggle="dropdown" data-tooltip="true" title="Columns"><i class="fa fa-columns"></i>

            </button>
            <ul class="dropdown-menu customcolumn-scroll" >

              {columns
                .map(column => ({
                  ...column,
                  toggle: toggles[column.dataField]
                }))
                .map((column, index) => (
                  <React.Fragment >
                    <br />
                    <label className="custom-toggle custom-table " >

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
        <FieldSetCreate />
      )
    }
    else if (ShowUpdate) {
      return (
        <FieldSetUpdate companyDetails={this.state.companyDetails} />
      )
    }
    // else if (ShowDetails) {
    //   return (
    //     <CompaniesDetails companyDetails={this.state.companyDetails} />
    //   )
    // }
    else {
      return (
        <div>

          <div>
            <div class="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 class="h3 mb-0 text-gray-800 custommain-title" name="companytitle">FieldSet</h1>

              <div class="row mb-0">
                <div class="col">
                  <button onClick={this.CreateBtnClick} className="btn btn-sm btn-primary shadow-sm custommain-title" name="createnew">
                    {t('company.createnew')}</button>
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
                data={CompanyData}
                page={page}
                sizePerPage={sizePerPage}
                totalSize={this.state.CompanyDataTotal}
                columns={this.state.columns}
                CSVExport={CSVExport}
                ExportCSVButton={ExportCSVButton}
                CustomToggleList={CustomToggleList}
                onTableChange={this.handleTableChange}
                SearchBtnClick={this.SearchBtnClick}
                myChangeHandler={this.myChangeHandler}
              />
            </div>

          </div>
        </div>
      )
    }
  }
}

export default withTranslation()(FieldSetMain);

