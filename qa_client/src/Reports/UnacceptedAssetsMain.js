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
class UnacceptedAssetsMain extends Component {
  constructor(props) {
    super(props)
    this.state = {
      UnacceptedAssetsData: [],
      UnacceptedAssetstotal: 0,
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
    const url = Domain +'/reports/Unaccepted_assets?limit=' + this.state.sizePerPage +
    '&offset=' + this.state.offset +
    '&search=' + this.state.searchText +
    '&sort=' + this.state.sortField +
    '&order=' + this.state.sortOrder + '';


    
    axios.get(url)
      .then((response) => {
 
        this.setState({ UnacceptedAssetsData: response.data });
        this.setState({ UnacceptedAssetsDataTotal: response.data });
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

    const { UnacceptedAssetsData, sizePerPage, page } = this.state;
    const { ExportCSVButton } = CSVExport;
    const CustomToggleList = ({ columns, onColumnToggle, toggles }) => (
      <div className="text-center">
        <div class="pull-left">
          <div class="btn-group pull-left">
            <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Columns
          <span class="caret"></span>
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
      sort: true
      }, {
      dataField: 'item_category',
      text: 'Category ',
      sort: true
      },
      {
        dataField: 'item_model',
        text: 'Model',
        sort: true
        },
        {
          dataField: 'item_assetname',
          text: 'Asset Name',
          sort: true
          },
          {
            dataField: 'item_assettag',
            text: 'Asset Tag',
            sort: true
            },
            {
              dataField: 'item_checkedout',
              text: 'Checked Out',
              sort: true
              },];
              
      return (
      <div>
      <div>
      <div class="table-responsive">
          <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Unaccepted Assets</h1>
          </div>
          <div>
            <input type='text' placeholder="search" name="searchText" onChange={this.myChangeHandler} />
            <button type='input' onClick={this.SearchBtnClick}>Search</button>
            <RemoteAll
              data={UnacceptedAssetsData}
              page={page}
              sizePerPage={sizePerPage}
              totalSize={this.state.UnacceptedAssetsTotal}
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

export default UnacceptedAssetsMain;



