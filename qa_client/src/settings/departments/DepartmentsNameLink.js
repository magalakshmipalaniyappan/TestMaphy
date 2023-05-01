

import React, { Component } from 'react';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';

import DepartmentsCreate from '../departments/DepartmentsCreate';
import DepartmentsUpdate from '../departments/DepartmentsUpdate';
import DepartmentsMain from '../departments/DepartmentsMain';
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
        <div className="custom-table custompeople-tablelayout">
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
class DepartmentsNameLink extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: "en",
      DepartmentsDatatoUpdate: '',
      DepartmentsId: '',
      ShowDepartments: true,
      ShowMain: false,
      ShowCreate: false,
      ShowUpdate: false,
      ShowName: false,
      PeopleData: [],
      PeopleId: '',
      PeopleIdToUpdate: '',
      PeopleNametoUpdate: '',
      PeopleDataTotal: '',
      //CompanyId_Details: '',
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
        sort: true,
        hidden: true,
        headerStyle: { 'white-space': 'nowrap' }
      },

      {
        dataField: 'company.name',
        text: 'Company Name',
        sort: false,

        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'name',
        text: 'Name',
        sort: false,
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
        dataField: 'email',
        text: 'Email',
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
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'country',
        text: 'Country',
        sort: false,
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
        sort: true,
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

        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'manager.name',
        text: 'Manager',
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

      ]
    }

    this.handleTableChange = this.handleTableChange.bind(this);
    //this.handleTableChange = this.handleTableChange.bind(this);


    console.log("Departments" + this.props.DepartmentsDatatoUpdate.id)
  }
  componentDidMount() {
    this.setState({ NotificationMessage: this.props.NotificationMessage });
    this.setState({ showNotifications: this.props.showNotifications });
    this.callServerData(this.state.page);
  }
  async callServerData() {
    const url = Domain + '/users?department_id=' + this.props.DepartmentsDatatoUpdate.id +
      '&limit=' + this.state.sizePerPage +
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

  CreateBtnClick = () => {
    const { ShowCreate } = this.state;
    this.setState({ ShowCreate: !ShowCreate });
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


  deletePeople = (id) => {

    const url = Domain + '/users/' + id;
    
    axios.delete(url)
      .then((response) => {
        this.setState({ showNotifications: true });
        console.log("delete message" + response.data.messages);
        this.setState({ NotificationMessage: response.data.messages });
        this.setState({ PeopleData: this.state.PeopleData.filter(result => result.id !== id) });
      })
  }

  UpdatePeople = (peopleid, name) => {
    this.setState({ IdToUpdate: peopleid, PeopletoUpdate: name });
    const { ShowUpdate } = this.state;
    this.setState({ ShowUpdate: !ShowUpdate });
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
  BackBtnClick = () => {
    this.setState({ ShowDepartments: false });
    this.setState({ ShowCreate: false });
    this.setState({ ShowUpdate: false });
    this.setState({ ShowMain: true })
  }

  DepartmentUpdateClick = () => {
    this.setState({ ShowDepartments: false });
    this.setState({ ShowCreate: false });
    this.setState({ ShowUpdate: true });
    this.setState({ ShowMain: false })
  }
  onLanguageHandle = (event) => {
    let newLang = event.target.value;
    this.setState({ value: newLang })
    this.props.i18n.changeLanguage(newLang)
  }
  render() {
    const { t } = this.props
    const { ShowDepartments,ShowUpdate,ShowCreate } = this.state;
    const { PeopleData, sizePerPage, page } = this.state;
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



    if (ShowDepartments) {
      return (

        <div>
          <div>

            <div class="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 class="h3 mb-0 text-gray-800 custommain-title">{this.props.DepartmentsDatatoUpdate.name} </h1>

              <div class="row">
                <div class="col">
                  <button name="updatedepartment" onClick={this.DepartmentUpdateClick} className=" btn btn-sm btn-primary shadow-sm custommain-title">
                    {t('button.updatedept')}</button>

                  <button name="back" onClick={this.BackBtnClick} className=" btn btn-sm btn-primary shadow-sm custommain-title">
                    {t('button.back')}</button>
                </div>
              </div>
            </div>
          </div>
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
      )

    }
    else if (ShowUpdate) {

      return (<DepartmentsUpdate DepartmentsDatatoUpdate={this.props.DepartmentsDatatoUpdate} />)
    }
    else if (ShowCreate)
      return (<DepartmentsCreate />)
    else
      return (<DepartmentsMain />)
  }

}

export default withTranslation()(DepartmentsNameLink);