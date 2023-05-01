import React, { Component } from 'react';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';

import { withTranslation} from 'react-i18next'

import AssetMaintenancesCreate from './AssetMaintenancesCreate';
import AssetMaintenancesUpdate from './AssetMaintenancesUpdate';
import { Redirect } from 'react-router-dom';
const Domain = process.env.REACT_APP_URL;


const RemoteAll = ({ data,
  page,
  sizePerPage,
  defaultSorted,
  totalSize,
  onTableChange,
  columns,
  indication,
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

class AssetMaintenancesMain extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: "en",
      AssetMaintenancesData: [],
      AssetMaintenanceUpdate: '',
      AssetMaintenancesDataTotal: '',

      ShowCreate: false,
      ShowUpdate: false,

      ShowCompany: false,
      ShowName: false,
      ShowTag: false,
      ShowModel: false,
      ShowSupplier: false,
      ShowLocation: false,
      ShowUser: false,

      NotificationMessage: '',
      showNotifications: false,

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
        hidden: true,
        headerStyle: { 'white-space': 'nowrap' }

      },
      {
        dataField: 'asset.name',
        text: 'Asset Name',
        sort: true,
        formatter: this.AssetlinkFormatter,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'asset.asset_tag',
        text: 'Asset Tag',
        sort: true,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'model.name',
        text: 'Model',
        sort: true,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'supplier.name',
        text: 'Vendor',
        sort: false,
        hidden: true,
        headerStyle: { 'white-space': 'nowrap' }

      },
      {
        dataField: 'location.name',
        text: 'Location',
        sort: false,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'asset_maintenance_type',
        text: 'Maintenance Type',
        sort: false,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'title',
        text: 'Title',
        sort: false,
        hidden: true,
        headerStyle: { 'white-space': 'nowrap' }

      },
      {
        dataField: 'start_date.formatted',
        text: 'Start Date',
        sort: false,
        hidden: true,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'completion_date.formatted',
        text: 'Completion Date',
        sort: false,
        hidden: true,
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
        dataField: 'is_warranty',
        text: 'Warranty',
        sort: false,
        headerStyle: { 'white-space': 'nowrap' }

      },
      {
        dataField: 'cost',
        text: 'Cost',
        sort: false,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'user_id.name',
        text: 'Admin',
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
      ],
      offset: 0,
      sortField: 'id',
      sortOrder: 'desc',
      page: 1,
      sizePerPage: 10,
      searchText: ''
    }

    this.handleTableChange = this.handleTableChange.bind(this);
    //this.handleTableChange = this.handleTableChange.bind(this);
  }


  componentDidMount() {
    this.setState({ NotificationMessage: this.props.NotificationMessage });
    this.setState({ showNotifications: this.props.showNotifications });
    this.callServerData(this.state.page);
  }

  EditDeleteFormatter = (cell, row, rowIndex) => {
    const { t } = this.props

    return (
      <div class="btn-group" role="group" >
        <button name="edit" class="btn-sm btn-warning custombtn" data-tooltip="true" title={t('button.edit')} onClick={() => { this.UpdateAssetMaintenances(row) }}><i class="fa fa-edit" aria-hidden="true"></i></button>

        <button name="delete" class="btn-sm btn-danger custombtn" data-tooltip="true" title={t('button.delete')} onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.deleteAssetMaintenances(row.id) }}><i class="fa fa-trash" aria-hidden="true"></i></button>

      </div>
    );
  };

  AssetlinkFormatter = (cell, row, rowIndex) => {
    return (
      <div>
        <button class="btn btn-link customlink-btn" name="btnupdate" onClick={() => { this.AssetDetails(row) }}>{row.asset.name}</button>

      </div>
    );
  };

  async callServerData() {
    const url = Domain + '/maintenances?limit=' + this.state.sizePerPage +
      '&offset=' + this.state.offset +
      '&search=' + this.state.searchText +
      '&sort=' + this.state.sortField +
      '&order=' + this.state.sortOrder + '';

    await axios.get(url)
      .then((response) => {

        this.setState({ AssetMaintenancesData: response.data.rows });
        this.setState({ AssetMaintenancesDataTotal: response.data.total });
      });
  }

  CreateBtnClick = () => {
    const { ShowCreate } = this.state;
    this.setState({ ShowCreate: !ShowCreate });
  }

  deleteAssetMaintenances = (id) => {

    const url = Domain + '/maintenances/' + id;
    axios.delete(url)
      .then((response) => {
        this.setState({ showNotifications: true });
        this.setState({ NotificationMessage: response.data.message });
        this.callServerData(this.state.page);
      })
  }

  UpdateAssetMaintenances = (row) => {
    this.setState({ AssetMaintenanceUpdate: row });
    const { ShowUpdate } = this.state;
    this.setState({ ShowUpdate: !ShowUpdate });
  }

  AssetDetails = async(row) => {
    const url = Domain + '/hardware/' +row.asset.id 
    await axios.get(url)
      .then((response) => {
        this.setState({ AssetDetailstoShow: response.data});
        const { ShowName } = this.state;
        this.setState({ ShowName: !ShowName });
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
  onLanguageHandle = (event) => {
    let newLang = event.target.value;
    this.setState({ value: newLang })
    this.props.i18n.changeLanguage(newLang)
  }

  render() {
    const { ShowCreate, ShowName, ShowUpdate } = this.state;
    const { AssetMaintenancesData, sizePerPage, page } = this.state;
    const { t } = this.props

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
        <AssetMaintenancesCreate />
      )
    }
    else if (ShowUpdate) {
      return (
        <AssetMaintenancesUpdate AssetMaintenanceUpdate={this.state.AssetMaintenanceUpdate} />
      )
    }

    else if (ShowName) {
      return (
        <Redirect class="small text-white stretched-link" to={{ pathname: './AssetDetails', AssetData: this.state.AssetDetailstoShow, mainPage: "AssetMaintenancesMain" }}>
        </Redirect>)
    }


    else {
      return (
        <div>
          <div>
            <div class="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 class="h3 mb-0 text-gray-800 custommain-title">{t('AssetMaintenance.maintenancename')}</h1>

              <div class="row mb-0">
                <div class="col">
                  <button onClick={this.CreateBtnClick} className="btn btn-sm btn-primary shadow-sm custommain-title">
                    {t('button.create')}</button>
                </div>
              </div>
            </div>
            {(() => {

              if (this.state.showNotifications) {
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

            <div  >
              <RemoteAll
                data={AssetMaintenancesData}
                page={page}
                sizePerPage={sizePerPage}
                totalSize={this.state.AssetMaintenancesDataTotal}
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
export default withTranslation()(AssetMaintenancesMain);
