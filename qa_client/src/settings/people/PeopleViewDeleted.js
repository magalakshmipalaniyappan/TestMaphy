import React, { Component } from 'react';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
import { withTranslation} from 'react-i18next'

import PeopleCreate from './PeopleCreate';
import PeopleUpdate from './PeopleUpdate';
import PeopleDetails from './PeopleDetails';
import PeopleMain from './PeopleMain';
import jwt_decode from "jwt-decode";

const Domain = process.env.REACT_APP_URL;
var NotificationMessage = "";
var userpermission = "";

const RemoteAll = ({ data,
  page,
  sizePerPage,
  defaultSorted,
  totalSize,
  onTableChange,
  myChangeHandler,
  SearchBtnClick,
  columns,
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
class PeopleViewDeleted extends Component {
  constructor(props) {
    super(props)
    this.state = {
value:"en",
      PeopleData: [],
      PeopleDetails: [],
      PeopleId: '',
      PeopleIdToUpdate: '',
      PeopleNametoUpdate: '',
      PeopleDataTotal: '',
      //CompanyId_Details: '',

      ShowCreate: false,
      ShowUpdate: false,
      //ShowDetails: false,
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
        sort: false,
        hidden: true,
        headerStyle: { 'white-space': 'nowrap' }
      },

      {
        dataField: 'name',
        text: 'Name',
        sort: false,
        formatter: this.linkFormatter,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'email',
        text: 'Email',
        sort: true,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'first_name',
        text: 'First Name',
        sort: true,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'last_name',
        text: 'Last Name',
        sort: true,
        headerStyle: { 'white-space': 'nowrap' }
      },
      // {
      //   dataField: 'groups.rows[0].id',
      //   text: 'Groups Id',
      //   sort: false,
      //   hidden: true,
      //   headerStyle: { 'white-space': 'nowrap' }
      // },
      {
        dataField: 'groups.rows[0].name',
        text: 'Groups Name',
        sort: false,
        //hidden: true,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'talentGroup.name',
        text: 'Talent Group',
        sort: false,
        hidden: false,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'jobtitle',
        text: 'Title',
        sort: false,
        hidden: true,
        headerStyle: { 'white-space': 'nowrap' }
      },
     
      {
        dataField: 'phone',
        text: 'Phone No',
        sort: false,
        hidden: true,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'address',
        text: 'Address',
        sort: false,
        hidden: true,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'city',
        text: 'City',
        sort: false,
        hidden: true,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'state',
        text: 'State',
        sort: false,
        hidden: true,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'country',
        text: 'Country',
        sort: false,
        hidden: true,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'zip',
        text: 'Zip',
        sort: false,
        hidden: true,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'username',
        text: 'Username',
        sort: false,
        hidden: true,
        headerStyle: { 'white-space': 'nowrap' }
      },

      {
        dataField: 'employee_num',
        text: 'Employee No ',
        sort: false,
        hidden: true,
        headerStyle: { 'white-space': 'nowrap' }
      },

      {
        dataField: 'department.name',
        text: 'Department',
        sort: false,
        headerStyle: { 'white-space': 'nowrap' }
      },

      {
        dataField: 'location.name',
        text: 'Location',
        sort: false,
        hidden: true,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'manager.name',
        text: 'Manager',
        sort: false,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'company.name',
        text: 'Company Name',
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
        dataField: 'licenses_count',
        text: 'Licenses',
        sort: false,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'consumables_count',
        text: 'Consumables',
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
        dataField: 'notes',
        text: 'Notes',
        sort: false,
        hidden: true,
        headerStyle: { 'white-space': 'nowrap' }
      },

      {
        dataField: 'created_at.formatted',
        text: 'Created At',
        sort: false,
        hidden: true,
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
    var token = localStorage.getItem("token");
    var decoded = jwt_decode(token);
    axios.defaults.headers.common['Authorization'] = "Bearer " + token;
    userpermission = JSON.parse(localStorage.getItem('permissions'));

    this.setState({ NotificationMessage: this.props.NotificationMessage });
    this.setState({ showNotifications: this.props.showNotifications });
    this.callServerData(this.state.page);
  }
  callServerData() {
    const url = Domain + '/users?deleted=true' + this.state.id +
      ' &limit=' + this.state.sizePerPage +
      '&offset=' + this.state.offset +
      '&search=' + this.state.searchText +
      '&sort=' + this.state.sortField +
      '&order=' + this.state.sortOrder + '';

    axios.get(url)
      .then((response) => {
this.setState({ PeopleData: response.data.rows });
        this.setState({ PeopleDataTotal: response.data.total });
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
    const { t } = this.props;
    return (
      <div>
        <button name="restore" class="btn-sm btn-warning custombtn" data-tooltip="true" title={t('button.restore')} onClick={() => { if (window.confirm('Are you sure you wish to restore these items?')) this.RestorePeople(row.id) }}><i class="fa fa-retweet" aria-hidden="true"></i></button>
        &nbsp;
      </div>
    );
  };

  CreateBtnClick = () => {
    const { ShowCreate } = this.state;
    this.setState({ ShowCreate: !ShowCreate });
  }

  CurrentBtnClick = () => {
    this.setState({ ShowDelete: false });
    this.setState({ ShowCreate: false });
    this.setState({ ShowUpdate: false });
    this.setState({ ShowMain: true })

  }

  RestorePeople = async (id) => {
    const url = Domain + '/users/restore/' + id;
    
    await axios.put(url)
      .then((response) => {
        this.setState({ showNotifications: true });
        console.log("restore message" + response.data.message);
        this.setState({ NotificationMessage: response.data.messages });


      })
    const { ShowMain } = this.state;
    this.setState({ ShowMain: !ShowMain })
  }

  showdeleted = (row) => {
    this.setState({ PeopleData: row });
    const { ShowUpdate } = this.state;
    this.setState({ ShowUpdate: !ShowUpdate });
  }
  UpdatePeople = (row) => {
    this.setState({ PeopleData: row });
    const { ShowUpdate } = this.state;
    this.setState({ ShowUpdate: !ShowUpdate });
  }
  PeopleDetails = (row) => {
    this.setState({ PeopleDetails: row });
    const { ShowDetails } = this.state;
    this.setState({ ShowDetails: !ShowDetails });
  }

  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
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
  onLanguageHandle = (event) => {
    let newLang = event.target.value;
    this.setState({ value: newLang })
    this.props.i18n.changeLanguage(newLang)
  }
  render() {
    const { ShowCreate, ShowMain, ShowUpdate, ShowDetails } = this.state;
    const { PeopleData, sizePerPage, page } = this.state;
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
        <PeopleCreate />
      )
    }



    else if (ShowUpdate) {
      return (
        <PeopleUpdate PeopleData={this.state.PeopleData} />
      )
    }
    else if (ShowDetails) {
      return (
        <PeopleDetails PeopleData={this.state.PeopleDetails} />
      )
    }
    else if (ShowMain) {
      return (
        <PeopleMain showNotifications={this.state.showNotifications} NotificationMessage="Restored Successfully" />
      )
    }
    else {
      return (
        <div>

          <div>

            <div class="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 class="h3 mb-0 text-gray-800 custommain-title">{t('people.viewdeleted')}</h1>

              <div class="row mb-0">
                <div class="col">
                  <button onClick={this.CurrentBtnClick} className="btn btn-sm btn-primary shadow-sm custommain-title">
                  {t('people.viewcurrent')}</button>
                  {(userpermission.superuser==="1") ? <button type="button" className=" btn btn-sm btn-primary shadow-sm custommain-title" onClick={this.CreateBtnClick}> {t('button.create')}</button>
                    : null
                  }
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
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )
              }
            })()}
            <div>
              <div >
                <RemoteAll
                  data={PeopleData}
                  page={page}
                  sizePerPage={sizePerPage}
                  totalSize={this.state.PeopleDataTotal}
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
        </div>
      )
    }
  }
}
export default withTranslation()(PeopleViewDeleted);

