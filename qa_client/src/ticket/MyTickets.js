import React, { Component } from 'react';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { withTranslation } from 'react-i18next'

import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
import TicketCreate from './TicketCreate';
import { Redirect } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import UpdateMyTickets from './UpdateMyTickets';

const Domain = process.env.REACT_APP_URL;
var userId = "";
//talentGroupId="";


const RemoteAll = ({ data,
  page,
  sizePerPage,
  defaultSorted,
  totalSize,
  indication,
  onTableChange,
  myChangeHandler,
  SearchBtnClick,
  columns,
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
class MyTickets extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value:"en",
      TicketData: [],
      TicketDataTotal: '',
      action:"",
      ShowCreate: false,
      ShowUpdate: false,
      ShowDetails: false,
      NotificationMessage: '',
      showNotifications: false,
      showAvailable: false,

      offset: 0,
      sortField: 'id',
      sortOrder: 'desc',
      page: 1,
      sizePerPage: 10,
      searchText: '',
      columns: [
        {
          dataField: 'id',
          text: 'ID',
          sort: true,
          formatter: this.TicketFormatter,
          headerStyle: { 'white-space': 'nowrap' }
        },
        {
          dataField: 'description',
          text: 'Description',
          sort: false,
          headerStyle: { 'white-space': 'nowrap' }
        },
        {
          dataField: 'asset_tag',
          text: 'Asset Tag',
          sort: false,
          headerStyle: { 'white-space': 'nowrap' }
        },
        {
          dataField: 'assigned',
          text: 'Assigned',
          sort: false,
          headerStyle: { 'white-space': 'nowrap' }
        },
        // {
        //   dataField: 'details[0].date',
        //   text: 'Details',
        //   sort: false,
        //   headerStyle: { 'white-space': 'nowrap' }
        // },
        {
          dataField: 'userName',
          text: 'User Name',
          headerStyle: { 'white-space': 'nowrap' }
        },
        {
          dataField: 'status',
          text: 'Status',
          sort: false,
          headerStyle: { 'white-space': 'nowrap' }
        },
        {
          dataField: 'ticketIssue.name',
          text: 'Ticket Issue',
          sort: false,
          headerStyle: { 'white-space': 'nowrap' }
        },
        {
          dataField: 'created_at.formatted',
          text: 'Created At',
          sort: false,
          headerStyle: { 'white-space': 'nowrap' }
        },
        {
          dataField: "Actions",
          text: "Actions",
          sort: false,
          formatter: this.DetailsFormatter,
          headerStyle: { 'white-space': 'nowrap' }
        }

      ]
    }

    this.handleTableChange = this.handleTableChange.bind(this);
    //this.handleTableChange = this.handleTableChange.bind(this);
  }



  componentDidMount() {
    //userpermission = JSON.parse(localStorage.getItem('permissions'));
    this.callServerData(this.state.page);
    var token = localStorage.getItem("token");
    var decoded = jwt_decode(token);
    userId=decoded.userId;
   
  }

  callServerData() {
    const url = Domain + '/tickets?limit=' + this.state.sizePerPage +
      '&offset=' + this.state.offset +
      '&search=' + this.state.searchText +
      '&sort=' + this.state.sortField +
      '&order=' + this.state.sortOrder +
      '&status_id=' + this.props.ticketStatus + '';
    axios.get(url)
      .then((response) => {
        this.setState({ TicketData: response.data.rows });
        this.setState({ TicketDataTotal: response.data.total });
      });
  }

  CreateBtnClick = () => {
    const { ShowCreate } = this.state;
    this.setState({ ShowCreate: !ShowCreate });
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

  CloseTicket = (row) => {
    this.setState({ TicketDetails: row });
    this.setState({ ShowUpdate:true });
    this.setState({action:"closeTicket"});
  }
  reOpen = (row) => {
    this.setState({ TicketDetails: row });
    this.setState({ ShowUpdate:true });
    this.setState({action:"reopen"});
  }
  TicketDetails = (row) => {
    const { ShowDetails } = this.state;
    this.setState({ ShowDetails: !ShowDetails });
  }

  handleAvailableChange = async (checked) => {
    this.setState({ technicianAvailable: checked });
    await axios({
      method: 'put',
      url: Domain + '/users/status/' + userId,
      data: JSON.stringify({ availability_status: checked }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        console.log("data:" + response.data.success);
      });
  }
  TicketFormatter = (cell, row, rowIndex) => {
    return (
      <div>
        <button class="btn btn-link customlink-btn" name="btnDetails" onClick={() => { this.TicketDetails(row) }}>{row.id}</button>
      </div>
    );
  };
  DetailsFormatter = (cell, row, rowIndex) => {
    const {t} = this.props;
    return (
      <div class="btn-group" role="group" >
        {((row.status === "Open" )) ? <button type="button" class="btn-secondary custombtn " onClick={() => { this.CloseTicket(row) }}> {t('button.close')}</button>
          : row.status === "Closed"  ? <button type="button" class="btn-secondary custombtn " onClick={() => { this.reOpen(row) }}> {t('button.reopen')}</button>
          : null}
      </div>
    );
  };
  render() {
    //const {t} = this.props
    const { ShowCreate, ShowDetails, ShowUpdate } = this.state;
    const { TicketData, sizePerPage, page } = this.state;
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
                        onChange={() => onColumnToggle(column.dataField)} />
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
      return (<TicketCreate />)
    }
    else if (ShowDetails) {
      return (
        <Redirect to={{ pathname: '/TicketDetails'}}></Redirect>
          //TicketDetails:this.state.TicketDetails
        
      )
    }
    else if (ShowUpdate) {
      return (<UpdateMyTickets TicketDetails={this.state.TicketDetails} action={this.state.action} />)
    }
    else {
      return (      
        <div>
          <div class="d-sm-flex align-items-center justify-content-between mb-4">
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
          <div>
            <div >
              <RemoteAll
                data={TicketData}
                page={page}
                sizePerPage={sizePerPage}
                totalSize={this.state.TicketDataTotal}
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
export default withTranslation()(MyTickets);
