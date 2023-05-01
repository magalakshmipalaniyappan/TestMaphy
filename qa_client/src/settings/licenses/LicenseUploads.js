
import React, { Component } from 'react';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';

//import CompaniesDetails from './CompaniesDetails';
import LicensesMain from './LicensesMain';


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

  ExportCSVButton,
  CustomToggleList }) => (
  <div>
    <ToolkitProvider
      keyField="id"
      data={data}
      columns={columns}
      defaultSorted={defaultSorted}
      search
      exportCSV
      columnToggle >
      {toolkitprops => [
        <div className="custom-table ">
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
              keyField="item_id"
              pagination={paginationFactory({ page, sizePerPage, totalSize })}
              onTableChange={onTableChange}
              wrapperClasses="table-responsive"
            />
          </div>
        </div>
      ]}
    </ToolkitProvider>
  </div>
);
class LicenseUploads extends Component {
  constructor(props) {
    super(props)
    this.state = {

      LicensesData: [],
      ConsumablesId: '',
      ConsumablesIdToUpdate: '',
      LicensesDatatoUpdate: '',
      LicensesDataTotal: '',
      //CompanyId_Details: '',

      ShowCreate: false,
      ShowUpdate: false,
      ShowCheckIn: false,
      NotificationMessage: '',
      showNotifications: false,

      offset: 0,
      sortField: 'id',
      sortOrder: 'desc',
      page: 1,
      sizePerPage: 10,
      searchText: '',

      columns: [

        {
          dataField: 'file_name',
          text: 'File',
          sort: true,
          headerStyle: { 'white-space': 'nowrap' }
        },
        {
          dataField: 'notes',
          text: 'Notes',
          sort: true,
          headerStyle: { 'white-space': 'nowrap' }
        },
        {
          dataField: 'created_at',
          text: 'Created At',
          sort: true,
          headerStyle: { 'white-space': 'nowrap' }
        },
        {
          dataField: 'download',
          text: 'Download',
          sort: true,
          headerStyle: { 'white-space': 'nowrap' }
        },
        {
          dataField: 'delete',
          text: 'Delete',
          sort: true,
          headerStyle: { 'white-space': 'nowrap' }
        },
        {
          dataField: 'checkincheckout',
          text: 'Checkincheckout',
          sort: true,
          formatter: this.CheckInFormatter,
          headerStyle: { 'white-space': 'nowrap' }
        },
      ]

    }

    this.handleTableChange = this.handleTableChange.bind(this);
    //this.handleTableChange = this.handleTableChange.bind(this);
  }



  componentDidMount() {

    this.setState({ NotificationMessage: this.props.NotificationMessage });
    this.setState({ showNotifications: this.props.showNotifications });
    // this.setState({ LicensesData: this.props.LicensesData});
    this.callServerData(this.state.page);
  }

  callServerData() {
    const url = Domain + '/licenses/' + this.props.LicensesDatatoUpdate.id + '/seats?' +
      'limit=' + this.state.sizePerPage +
      '&offset=' + this.state.offset +
      '&search=' + this.state.searchText +
      '&sort=' + this.state.sortField +
      '&order=' + this.state.sortOrder + '';


    axios.get(url)
      .then((response) => {
        this.setState({ LicensesData: response.data });
        this.setState({ LicensesDataTotal: response.data });
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


  deleteConsumables = (id) => {

    const url = Domain + '/licenses/' + id;
    
    axios.delete(url)
      .then((response) => {
        this.setState({ showNotifications: true });
        console.log("delete message" + response.data.messages);
        this.setState({ NotificationMessage: response.data.messages });
        this.setState({ LicensesData: this.state.LicensesData.filter(result => result.id !== id) });
      })
  }



  myChangeHandler = (event) => {

    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  }

  SearchBtnClick = () => {
    this.callServerData();
  }
  CheckInLicenses = (row) => {
    this.setState({ LicensesDatatoUpdate: row });
    const { ShowCheckIn } = this.state;
    this.setState({ ShowCheckIn: !ShowCheckIn });
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

  render() {
    const { ShowCreate } = this.state;
    const { LicensesData, sizePerPage, page } = this.state;
    const { ExportCSVButton } = CSVExport;
    const CustomToggleList = ({ columns, onColumnToggle, toggles }) => (
      <div className="text-center">
        <div class="pull-left">
          <div class="btn-group pull-left">
            <button class="btn-default dropdown-toggle" data-toggle="dropdown">Columns

            </button>
            <ul class="dropdown-menu customcolumn-scroll">
              {columns
                .map(column => ({
                  ...column,
                  toggle: toggles[column.dataField]
                }))
                .map((column, index) => (
                  <React.Fragment >
                    <label className="custom-toggle custom-table custom-sorticon table-responsive" >

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
        <LicensesMain />
      )
    }
    //   else if(ShowCheckIn){
    //     console.log("LicensesDatatoCheckin",this.state.LicensesDatatoUpdate)
    //       return(
    //         <LicenseCheckIn LicensesDatatoCheckin={this.state.LicensesDatatoUpdate}/> 
    //       )
    //   }

    else {
      return (
        <div>

          <div>
            {(() => {

              if (this.state.showNotifications) {
                return (
                  <div class="row">
                    <div class="col-md-12">
                      <div class="alert alert-success alert-dismissible fade show" role="alert">
                        <strong> Consumables Created successfully..{this.state.NotificationMessage}</strong>
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

export default LicenseUploads;