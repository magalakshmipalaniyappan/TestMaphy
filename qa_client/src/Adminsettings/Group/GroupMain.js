import React, { Component } from 'react';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
import GroupCreate from './GroupCreate';
import GroupUpdate from './GroupUpdate';
import { withTranslation } from 'react-i18next'
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
class GroupMain extends Component {
  constructor(props) {
    super(props)
    this.state = {
  value: "en",
      GroupData: [],
      GroupDataTotal: '',
      GroupDetails: "",
      ShowCreate: false,
      ShowUpdate: false,
      ShowDetails: false,
      columns: [{
        dataField: 'id',
        text: 'ID',
        sort: true,
 headerStyle: { 'white-space': 'nowrap' }
      }, {
        dataField: 'name',
        text: 'Group Name',
        sort: true,
        headerStyle: { 'white-space': 'nowrap' }
      },

      { dataField: "Actions", text: "Actions", sort: false, hidden: false, formatter: this.EditDeleteFormatter }],


      offset: 0,
      sortField: 'id',
      sortOrder: 'desc',
      page: 1,
      sizePerPage: 10,
      searchText: ''
    }
    console.log("isSuperuser", localStorage.getItem('isSuperuser'));
    this.handleTableChange = this.handleTableChange.bind(this);
    //this.handleTableChange = this.handleTableChange.bind(this);
  }

  componentDidMount() {
    var token = localStorage.getItem("token");
    axios.defaults.headers.common['Authorization'] = "Bearer " + token;
    userpermission = JSON.parse(localStorage.getItem('permissions'));

    this.setState({ NotificationMessage: this.props.NotificationMessage });
    this.setState({ showNotifications: this.props.showNotifications });
    this.callServerData(this.state.page);

  }


  callServerData() {
    const url = Domain + '/groups?limit=' + this.state.sizePerPage +
      '&offset=' + this.state.offset +
      '&search=' + this.state.searchText +
      '&sort=' + this.state.sortField +
      '&order=' + this.state.sortOrder + '';
    
    axios.get(url)
      .then((response) => {
 
        this.setState({ GroupData: response.data.rows });
        this.setState({ GroupDataTotal: response.data.total });
      });
  }
  EditDeleteFormatter = (cell, row, rowIndex, isSuperuser) => {

   const { t } = this.props;
    return (
      <div class="btn-group" role="group" >

        {(userpermission.superuser !== "1") ? <button name="edit" class="btn-sm btn-warning custombtn" data-tooltip="true" title={t('button.edit')} disabled><i class="fa fa-edit" aria-hidden="true"></i></button>
          : <button name="edit" class="btn-sm btn-warning custombtn" data-tooltip="true" title={t('button.edit')} onClick={() => { this.UpdateGroup(row) }}><i class="fa fa-edit" aria-hidden="true"></i></button>

        }
{(userpermission.superuser !== "1") ? <button name="delete" class="btn-sm btn-danger custombtn" data-tooltip="true" title={t('button.delete')} disabled><i class="fa fa-trash" aria-hidden="true"></i></button>
          : <button name="delete" class="btn-sm btn-danger custombtn" data-tooltip="true" title={t('button.delete')} onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.deleteGroup(row.id) }}><i class="fa fa-trash" aria-hidden="true"></i></button>

        }
      </div>
    );
  };


  CreateBtnClick = () => {
    const { ShowCreate } = this.state;
    this.setState({ ShowCreate: !ShowCreate });
  }

  deleteGroup = async (id) => {

    const url = Domain + '/groups/' + id;
    
    await axios.delete(url)
      .then((response) => {
        this.setState({ showNotifications: true });
        console.log("delete message" + response.data.message);
        this.setState({ NotificationMessage: response.data.message });
        this.callServerData(this.state.page);
      })

  }

  UpdateGroup = (row) => {
    console.log("ShowUpdate" + row.id)
    this.setState({ GroupDetails: row });
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
    const { ShowCreate, ShowUpdate, showNotifications } = this.state;
    const { GroupData, sizePerPage, page } = this.state;
    const { ExportCSVButton } = CSVExport;
    const CustomToggleList = ({ columns, onColumnToggle, toggles }) => (
      <div className="text-center">
        <div class="pull-left ">
          <div class="btn-group pull-left ">
          <button class=" btn-default dropdown-toggle customcolumns-csv" data-toggle="dropdown" data-tooltip="true" title="Columns"><i class="fa fa-columns"></i>

</button>
            <ul class="dropdown-menu">

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
        <GroupCreate />
      )
    }
    else if (ShowUpdate) {
      console.log("this.state.GroupDetails1111", this.state.GroupDetails)

      return (
        <GroupUpdate GroupDetails={this.state.GroupDetails}></GroupUpdate>
      )
    }
    else {
      console.log("else show main design")
      return (
        <div>

          <div class="table-responsive">
            <div class="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 class="h3 mb-0 text-gray-800 custommain-title" name="management">{t('group.management')}</h1>

              <div class="row mb-0">
                <div class="col">
                      {(userpermission.superuser === "1") ? <button type="button" className=" btn btn-sm btn-primary shadow-sm custommain-title" onClick={this.CreateBtnClick}>{t('button.create')}</button>
                    : null
                  }
                </div>
              </div>
            </div>
            {(() => {

              if (showNotifications) {
                console.log("s noti true", this.state.NotificationMessage)
                return (
                  <div class="row">
                    <div class="col-md-12">
                      <div class="alert alert-success alert-dismissible fade show" role="alert">
                        <strong> {this.state.NotificationMessage}</strong>

                      </div>


                    </div>
                  </div>
                )
              }


            })()}
          <div>
                <RemoteAll
                  data={GroupData}
                  page={page}
                  sizePerPage={sizePerPage}
                  totalSize={this.state.GroupDataTotal}
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

export default withTranslation()(GroupMain);