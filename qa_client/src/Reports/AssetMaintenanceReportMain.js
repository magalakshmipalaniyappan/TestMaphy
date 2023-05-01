import React, { Component } from 'react';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
const Domain = process.env.REACT_APP_URL;

const RemoteAll = ({ data,
  page,
  sizePerPage,
  defaultSorted,
  totalSize,
  onTableChange,
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
      noDataIndication={ indication }
      search
      exportCSV
      columnToggle >
      {toolkitprops => [
        <div>
        <div class="col">
            <div class="row">
          <ExportCSVButton {...toolkitprops.csvProps}>Export CSV</ExportCSVButton>
          <CustomToggleList {...toolkitprops.columnToggleProps} />
         </div>
          </div>
          <BootstrapTable
            {...toolkitprops.baseProps}
            remote={{ pagination: true, sort: true }}
            keyField="id"
            pagination={paginationFactory({ page, sizePerPage, totalSize })}
            onTableChange={onTableChange}
            data={ data } columns={ columns } noDataIndication="No Data Available" 
          />
        </div>
      ]}
    </ToolkitProvider>
  </div>
);
class AssetMaintenanceReportMain extends Component {
  constructor(props) {
    super(props)
    this.state = {
      AssetMaintenanceReportData: [],
      AssetMaintenanceReporttotal: 0,
      AssetMaintenanceReportDataTotal:'',
      offset: 0,
      sortField: 'id',
      sortOrder: 'desc',
      page: 1,
      sizePerPage: 10,
      searchText: ''
    }
    this.handleTableChange = this.handleTableChange.bind(this);
  }
  componentDidMount() {

    this.callServerData(this.state.page);
  }
  callServerData() {
    const url = Domain + '/reports/asset_maintenances?limit=' + this.state.sizePerPage +
      '&offset=' + this.state.offset +
      '&search=' + this.state.searchText +
      '&sort=' + this.state.sortField +
      '&order=' + this.state.sortOrder + '';

   
   axios.get(url)
      .then((response) => {
 
        this.setState({ AssetMaintenanceReportData: response.data });
        this.setState({ AssetMaintenanceReportDataTotal: response.data});
      });
  }

  CreateBtnClick = () => {
    const { ShowCreate } = this.state;
    this.setState({ ShowCreate: !ShowCreate });
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
    if (sortOrder == null || sortOrder === 'undefined')
      sortOrder = this.state.sortOrder;

    await this.setState({ page: page, offset: offset, sizePerPage: sizePerPage, sortField: sortField, sortOrder: sortOrder });
    this.callServerData();
  }
  render() {

    const { AssetMaintenanceReportData, sizePerPage, page } = this.state;
    const { ExportCSVButton } = CSVExport;
   const CustomToggleList = ({ columns, onColumnToggle, toggles }) => (
      <div className="text-center">
        <div class="pull-left">
          <div class="btn-group pull-left">
            <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Columns
          <span class="caret"></span>
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
const columns = [{
      dataField: 'item_company',
      text: 'Company',
      sort: true,
      hidden:true
    }, {
      dataField: 'item_id',
      text: 'ID',
      sort: true,
        hidden:true
    },
    {
      dataField: 'item _assettag',
      text: 'Asset Tag',
      sort: true,
        hidden:true
    },
    {
      dataField: 'item_assetname',
      text: ' Asset Name',
      sort: true
    },
    {
      dataField: 'item_supplier',
      text: ' Supplier',
      sort: true
    },
    {
      dataField: 'item_assetmaintenancetype',
      text: ' Asset Maintenance Type',
      sort: true
    },
    {
      dataField: 'item_title',
      text: ' Title',
      sort: true
    },
    {
      dataField: 'item_startdate',
      text: ' Start Date',
      sort: true
    },
    {
      dataField: 'item_completiondate',
      text: ' Completion Date',
      sort: true
    },
    {
      dataField: 'item_assetmaintenancetime',
      text: ' Asset Maintenance Time(in days)',
      sort: true
    },
    {
      dataField: 'item_cost',
      text: ' Cost ',
      sort: true
    },
    {
      dataField: 'item_admin',
      text: ' Admin',
      sort: true
    },];

    return (
      <div>

        <div>
         <div class="table-responsive">
          <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Asset Maintenance Report</h1>
          </div>
     <div>
            <input type='text' placeholder="search" name="searchText" onChange={this.myChangeHandler} />
            <button type='input' onClick={this.SearchBtnClick}>Search</button>
            <RemoteAll
              data={AssetMaintenanceReportData}
              page={page}
              sizePerPage={sizePerPage}
              totalSize={this.state.AssetMaintenanceReportDataTotal}
              columns={columns}
              CSVExport={CSVExport}
              ExportCSVButton={ExportCSVButton}
              CustomToggleList={CustomToggleList}
              onTableChange={this.handleTableChange}
            />
           </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AssetMaintenanceReportMain;



