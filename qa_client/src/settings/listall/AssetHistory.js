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
class AssetHistory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ImportData: [],
      ImportId: '',
      ImportIdToUpdate: '',
      ImportNametoUpdate: '',
      ImportDatatotal: 0,
      ShowCreate: false,
      ShowUpdate: false,
      ShowProcess: false,
      NotificationMessage: '',
      showNotifications: false,
      columns: [
        {
          dataField: 'id',
          text: 'ID',
          sort: true,
          headerStyle: { 'white-space': 'nowrap' }
        },
        {
          dataField: 'created_at.formatted',
          text: 'Date',
          sort: false,
          headerStyle: { 'white-space': 'nowrap' }
        },
        {
          dataField: 'admin.name',
          text: 'Admin',
          sort: false,
          headerStyle: { 'white-space': 'nowrap' }
        },
        {
          dataField: 'action_type',
          text: 'Action',
          sort: false,
          headerStyle: { 'white-space': 'nowrap' }
        },

        {
          dataField: 'item.type',
          text: ' Type',
          sort: false,
          headerStyle: { 'white-space': 'nowrap' }
        },
        {
          dataField: 'item.name',
          text: 'Item',
          sort: false,
          headerStyle: { 'white-space': 'nowrap' }
        },
        {
          dataField: 'target.name',
          text: 'To',
          sort: false,
          headerStyle: { 'white-space': 'nowrap' }
        },
 
      ],
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
    this.setState({ NotificationMessage: this.props.NotificationMessage });
    this.setState({ showNotifications: this.props.showNotifications });
    this.callServerData(this.state.page);
  }
  callServerData() {
    const url = Domain + '/reports/activity?limit=' + this.state.sizePerPage +
      '&offset=' + this.state.offset +
      '&search=' + this.state.searchText +
      '&sort=' + this.state.sortField +
      '&order=' + this.state.sortOrder + '';
    axios.get(url)
      .then((response) => {
        this.setState({ ImportData: response.data.rows });
        this.setState({ ImportDataTotal: response.data.total });
      });
  }

  CreateBtnClick = () => {
    const { ShowCreate } = this.state;
    this.setState({ ShowCreate: !ShowCreate });
  }
  ProcessImport = () => {
    const { ShowProcess } = this.state;
    this.setState({ ShowProcess: !ShowProcess });
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
    const { ImportData, sizePerPage, page } = this.state;

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
                    <label className="custom-toggle custom-table table-responsive" >

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



    return (
      <div>

        <div>
          <div >

            <RemoteAll
              data={ImportData}
              page={page}
              sizePerPage={sizePerPage}
              totalSize={this.state.ImportDataTotal}
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
export default AssetHistory;