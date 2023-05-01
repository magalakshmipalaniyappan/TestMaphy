import React, { Component } from 'react';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
import { withTranslation } from 'react-i18next'

import WorkStatusCreate from './WorkStatusCreate';
import WorkStatusDetails from './WorkStatusDetails';
import WorkStatusUpdate from './WorkStatusUpdate';

const headerSortingStyle = { backgroundColor: '#c8e6c9' };
const Domain = process.env.REACT_APP_URL;
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
class WorkStatusMain extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: "en",
      workstatusData: [],

      ShowCreate: false,
      ShowUpdate: false,
      ShowDetails: false,
      ShowMain: true,
       NotificationMessage: false,
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
        formatter: this.IdFormatter,
        //hidden:true,
        headerSortingStyle
      },
      {
        dataField: 'details[0].task',
        text: 'Task',
        sort: false,
        headerSortingStyle
      },
      {
        dataField: 'details[0].taskDescription',
        text: 'Description',
        sort: false,
        headerSortingStyle
      },
      {
        dataField: 'details[0].status',
        text: 'Status',
        sort: false,
        headerSortingStyle
      },
      {
        dataField: 'details[0].fromTime',
        text: 'From Time',
        sort: false,
        headerSortingStyle
      },
      {
        dataField: 'details[0].toTime',
        text: 'To Time',
        sort: false,
        headerSortingStyle
      },
      {
        dataField: 'created_at.formatted',
        text: 'Timing',
        sort: false,
        headerSortingStyle
      },
      {
        dataField: "Actions",
        text: "Actions",
        sort: false,
        hidden: false,
        formatter: this.StatusFormatter,
        headerStyle: { 'white-space': 'nowrap' }
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

  async callServerData() {
    const url = Domain + '/workstatus?limit=' + this.state.sizePerPage +
      '&offset=' + this.state.offset +
      '&search=' + this.state.searchText +
      '&sort=' + this.state.sortField +
      '&order=' + this.state.sortOrder + '';
    await axios.get(url)
      .then((response) => {
        this.setState({ workstatusData: response.data.rows });
        this.setState({ workstatusDataTotal: response.data.total });

      });

  }
  CreateBtnClick = () => {
    const { ShowCreate } = this.state;
    this.setState({ ShowCreate: !ShowCreate });
  }
  WorkStatusDetails = (row) => {

    // this.setState({ WorkStatusDetails: row });
    var WorkStatusDetails = JSON.stringify(row);
    localStorage.setItem("WorkStatusDetails", WorkStatusDetails);

    const { ShowDetails } = this.state;
    this.setState({ ShowDetails: !ShowDetails });
  }
  UpdateDetails = (row) => {

    this.setState({ UpdateDetails: row });
    var UpdateDetails = JSON.stringify(row);
    localStorage.setItem("UpdateDetails", UpdateDetails);

    const { ShowUpdate } = this.state;
    this.setState({ ShowUpdate: !ShowUpdate });
  }

  myChangeHandler = (event) => {

    this.setState({ [event.target.name]: event.target.value });
  }

  SearchBtnClick = () => {
    this.callServerData();
  }
  IdFormatter = (cell, row, rowIndex) => {
    return (
      <div >
        <button class="btn btn-link" name="btnDetails" onClick={() => { this.WorkStatusDetails(row) }}>{row.id}</button>
      </div>
    );
  };
  StatusFormatter = (cell, row, rowIndex) => {
    return (
      <div class="btn-group" role="group" >
        {/* <button class="btn btn-secondary" name="btnDetails" onClick={() => { this.UpdateDetails(row) }}>Update Status</button> */}
        {(row.details[0].status !== "completed") ? <button class=" btn-secondary custombtn" name="btnDetails" onClick={() => { this.UpdateDetails(row) }}>Update Status</button>
          :
          <button class=" btn-secondary custombtn" name="btnDetails" disabled>Update Status</button>}

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
    const { ShowCreate, ShowDetails, ShowUpdate, showNotifications } = this.state;
    
    const { workstatusData, sizePerPage, page } = this.state;
    const { t } = this.props

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
        <WorkStatusCreate />
      )
    }
    else if (ShowUpdate) {
      return (

        <WorkStatusUpdate UpdateDetails={this.state.UpdateDetails} />
      )
    }

    else if (ShowDetails) {
      return (

        <WorkStatusDetails />
      )
    }
    else {
      return (
        <div>
          <div>
            <div class="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 class="h3 mb-0 text-gray-800 custommain-title">{t('workstatus.title')}</h1>

              <div class="row mb-0">
                <div class="col">
                  <button onClick={this.CreateBtnClick} className="btn btn-sm btn-primary shadow-sm custommain-title">
                    Create Status</button>
                  {/* {t('workstatus.update')}</button> */}
                </div>
              </div>
            </div>
            {(() => {

              if (showNotifications) {
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


            <div >

              <RemoteAll
                data={workstatusData}
                page={page}
                sizePerPage={sizePerPage}
                totalSize={this.state.workstatusDataTotal}
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
export default withTranslation()(WorkStatusMain);


