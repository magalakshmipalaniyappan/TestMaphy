
import React, { Component } from 'react';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';


import DepartmentsCreate from './DepartmentsCreate';
import DepartmentsUpdate from './DepartmentsUpdate';
import DepartmentsNameLink from './DepartmentsNameLink';
import DepartmentsCompanyLink from './DepartmentsCompanyLink';
import DepartmentsManagerLink from './DepartmentsManagerLink';
import DepartmentsLocationLink from './DepartmentsLocationLink';
import { withTranslation } from 'react-i18next'
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
        <div className="custom-table custom-tablelayout">
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

class DepartmentsMain extends Component {
  constructor(props) {
    super(props)
    this.state = {
 value: "en",
      DepartmentsData: [],
      managerDetails: [],
      companyDetails: [],
      DepartmentsId: '',
      DepartmentsIdToUpdate: '',
      DepartmentsNametoUpdate: '',
      DepartmentsDataTotal: '',
      LocationId: '',
      LocationDatatoUpdate: '',

      ShowCreate: false,
      ShowUpdate: false,
      ShowName: false,
      ShowCompany: false,
      ShowManager: false,
      ShowLocation: false,
      NotificationMessage: '',
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
        hidden: true,
        headerStyle: { 'white-space': 'nowrap' }
      },
  
      {
        dataField: 'name',
        text: 'Department Name',
        sort: true,
        formatter: this.linkFormatter,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'company.name',
        text: 'Company Name',
        sort: true,
        formatter: this.CompanylinkFormatter,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'manager.name',
        text: 'Manager',
        sort: true,
        formatter: this.ManagerlinkFormatter,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'users_count',
        text: 'Users',
        sort: true,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'location.name',
        text: 'Location',
        sort: true,
        formatter: this.LocationlinkFormatter,
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
    //this.handleTableChange = this.handleTableChange.bind(this);
  }


  componentDidMount() {
    this.setState({ NotificationMessage: this.props.NotificationMessage });
    this.setState({ showNotifications: this.props.showNotifications });
    this.setState({ LocationDatatoUpdate: this.props.LocationDatatoUpdate })
    this.callServerData(this.state.page);
  }

  async callServerData() {
    const url = Domain + '/departments?limit=' + this.state.sizePerPage +
      '&offset=' + this.state.offset +
      '&search=' + this.state.searchText +
      '&sort=' + this.state.sortField +
      '&order=' + this.state.sortOrder + '';

    
    await axios.get(url)
      .then((response) => {
        this.setState({ DepartmentsData: response.data.rows });
        this.setState({ DepartmentsDataTotal: response.data.total });
      });
  }
  EditDeleteFormatter = (cell, row, rowIndex) => {
    const { t } = this.props

    return (
      <div class="btn-group" role="group" >
        <button name="edit" class="btn-sm btn-warning custombtn" data-tooltip="true" title={t('button.edit')} onClick={() => { this.UpdateDepartment(row) }}><i class="fa fa-edit" aria-hidden="true"></i></button>
        {(row.users_count !== 0) ? <button name="delete" class="btn-sm btn-danger custombtn" data-tooltip="true" title={t('button.delete')} disabled><i class="fa fa-trash" aria-hidden="true"></i></button>
          : <button name="delete" class="btn-sm btn-danger custombtn" data-tooltip="true" title={t('button.delete')} onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.deleteDepartment(row.id) }}><i class="fa fa-trash" aria-hidden="true"></i></button>

        }
      </div>
    );
  };



  linkFormatter = (cell, row, rowIndex) => {
    return (
      <div>
        <button class="btn btn-link customlink-btn" name="btnupdate" onClick={() => { this.DepartmentDetails(row) }}>{row.name}</button>

      </div>
    );
  };
  CompanylinkFormatter = (cell, row, company, rowIndex) => {
    return (
      <div>
        <button class="btn btn-link customlink-btn" name="btnupdate" onClick={() => { this.CompanyDetails(row) }}>{row.company.name}</button>

      </div>
    );
  };
  ManagerlinkFormatter = (cell, row, manager, rowIndex) => {
    return (
      <div>
        <button class="btn btn-link customlink-btn" name="btnupdate" onClick={() => { this.ManagerDetails(row) }}>{row.manager.name}</button>

      </div>
    );
  };
  LocationlinkFormatter = (cell, row, rowIndex) => {
    return (
      <div>
        <button class="btn btn-link customlink-btn" name="btnupdate" onClick={() => { this.LocationDetails(row) }}>{row.location.name}</button>

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

  deleteDepartment = (id) => {

    const url = Domain + '/departments/' + id;
    
    axios.delete(url)
      .then((response) => {
        this.setState({ showNotifications: true });
        this.setState({ NotificationMessage: response.data.message });
        this.callServerData(this.state.page);
      })
  }

  UpdateDepartment = (row) => {
    this.setState({ DepartmentsDatatoUpdate: row });
    const { ShowUpdate } = this.state;
    this.setState({ ShowUpdate: !ShowUpdate });
  }
  DepartmentDetails = (row) => {
    this.setState({ DepartmentsDatatoUpdate: row });
    const { ShowName } = this.state;
    this.setState({ ShowName: !ShowName });
  }
  CompanyDetails = (row) => {
    //this.setState({ DepartmentsDatatoUpdate: row });
    let companyId={id:row.company.id,name:row.company.name};
    this.setState({companyDetails: companyId })
    const { ShowCompany } = this.state;
    this.setState({ ShowCompany: !ShowCompany });
  }
  ManagerDetails = (row) => {
    this.setState({ managerDetails: row });
    const { ShowManager } = this.state;
    this.setState({ ShowManager: !ShowManager });
  }

  LocationDetails = (row) => {
    this.setState({ LocationDatatoUpdate: row });
    const { ShowLocation } = this.state;
    this.setState({ ShowLocation: !ShowLocation });
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
    if (sortOrder == null || sortOrder==='undefined')
      sortOrder = this.state.sortOrder;

    await this.setState({ page: page, offset: offset, sizePerPage: sizePerPage, sortField: sortField, sortOrder: sortOrder });
    this.callServerData();
  }

  render() {
    const { t } = this.props
    const { ShowCreate, ShowName, ShowCompany, ShowManager, ShowLocation, ShowUpdate} = this.state;
    const { DepartmentsData, sizePerPage, page } = this.state;
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
        <DepartmentsCreate />
      )
    }

    else if (ShowUpdate) {
      return (
        <DepartmentsUpdate DepartmentsDatatoUpdate={this.state.DepartmentsDatatoUpdate} />
      )
    }
    else if (ShowName) {

      return (

        <DepartmentsNameLink DepartmentsDatatoUpdate={this.state.DepartmentsDatatoUpdate} />
      )
    }
    else if (ShowCompany) {

      return (
        <DepartmentsCompanyLink companyDetails={this.state.companyDetails} />
      )
    }
    else if (ShowManager) {
      return (
        <DepartmentsManagerLink managerDetails={this.state.managerDetails} />)
    }
    else if (ShowLocation) {

      return (
        <DepartmentsLocationLink LocationDatatoUpdate={this.state.LocationDatatoUpdate} />
      )
    }
    else {
      return (
        <div>
          <div >
            <div class="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 class="h3 mb-0 text-gray-800 custommain-title" name="departments">{t('departments.departments')}</h1>

              <div class="row mb-0">
                <div class="col">
                  <button name="create" onClick={this.CreateBtnClick} className="btn btn-sm btn-primary shadow-sm custommain-title">
                   {t('button.create')}</button>
                </div>
              </div>
            </div>
            {(() => {

              if (this.state.showNotifications) {
                return (
                  <div class="row" >
                    <div class="col-md-12">
                      <div class="alert alert-success alert-dismissible fade show" role="alert">
                        <strong> {this.state.NotificationMessage}</strong>

                      </div>
                    </div>
                  </div>
                )
              }


            })()}

            <div >
              <RemoteAll
                data={DepartmentsData}
                page={page}
                sizePerPage={sizePerPage}
                totalSize={this.state.DepartmentsDataTotal}
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

export default withTranslation()(DepartmentsMain);