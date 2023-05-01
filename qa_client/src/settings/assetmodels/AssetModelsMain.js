import React, { Component } from 'react';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { withTranslation} from 'react-i18next'

import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
import AssetModelsCreate from './AssetModelsCreate';
import AssetModelsUpdate from './AssetModelsUpdate';
import AssetModelsDetails from './AssetModelsDetails';
import AssetModelsViewDeleted from './AssetModelsViewDeleted';


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
class AssetModelsMain extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: "en",
      AssetModelsData: [],
      AssetModelsDetails: [],
      AssetModelstoUpdate: '',
      AssetModelsDatatotal: '',
      ShowCreate: false,
      ShowUpdate: false,
      ShowClone: false,
      ShowDelete: false,
      ShowDetails: false,
      ShowManufacture: false,
      ShowDepreciation: false,
      ShowCategories: false,
      NotificationMessage: '',
      showNotifications: false,
      editProcess:"",
      columns: [{
        dataField: 'id',
        text: 'ID',
        sort: true,
        hidden: true,
        headerStyle: { 'white-space': 'nowrap' }

      }, {
        dataField: 'name',
        text: 'Asset Models Name',
        sort: true,
        formatter: this.DetailsFormatter,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'model_number',
        text: 'Model Number',
        sort: true,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'assets_count',
        text: 'Asset',
        sort: true,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'manufacturer.name',
        text: 'Manufacturer Name',
        sort: true,
        headerStyle: { 'white-space': 'nowrap' }

      },
      {
        dataField: 'depreciation.name',
        text: 'Depreciation ',
        sort: true,
        headerStyle: { 'white-space': 'nowrap' }

      },
      {
        dataField: 'category.name',
        text: 'Category ',
        sort: true,
        headerStyle: { 'white-space': 'nowrap' }

      },
      {
        dataField: 'notes',
        text: 'Notes ',
        sort: true,
        hidden: true,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'eol',
        text: 'EOL ',
        sort: true,
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
        <button name="edit" class="btn-sm btn-warning custombtn" data-tooltip="true" title={t('button.edit')} onClick={() => { this.UpdateAssetModels(row) }}><i class="fa fa-edit" aria-hidden="true"></i></button>
        <button name="clone" class="btn-sm btn-info custombtn" data-tooltip="true" title={t('button.clone')} onClick={() => { this.CloneAssetModels(row) }}><i class="fa fa-copy" aria-hidden="true"></i></button>
        {(row.assets_count !== 0) ? <button name="delete" class="btn-sm btn-danger custombtn" data-tooltip="true" title={t('button.delete')} disabled><i class="fa fa-trash" aria-hidden="true"></i></button>
          : <button name="delete" class="btn-sm btn-danger custombtn" data-tooltip="true" title={t('button.delete')} onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.deleteAssetModels(row.id) }}><i class="fa fa-trash" aria-hidden="true"></i></button>

        }

      </div>
    );
  };
  DetailsFormatter = (cell, row, rowIndex) => {
    return (
      <div>
        <button class="btn btn-link customlink-btn" name="btnupdate" onClick={() => { this.AssetModelsDetails(row) }}>{row.name}</button>

      </div>
    );
  };

  callServerData() {
    const url = Domain + '/models?limit=' + this.state.sizePerPage +
      '&offset=' + this.state.offset +
      '&search=' + this.state.searchText +
      '&sort=' + this.state.sortField +
      '&order=' + this.state.sortOrder + '';
    axios.get(url)
      .then((response) => {
        this.setState({ AssetModelsData: response.data.rows });
        this.setState({ AssetModelsDataTotal: response.data.total });
      });
  }

  CreateBtnClick = () => {
    const { ShowCreate } = this.state;
    this.setState({ ShowCreate: !ShowCreate });
  }
  ViewDeleteBtnClick = () => {
    const { ShowDelete } = this.state;
    this.setState({ ShowDelete: !ShowDelete });
  }
  deleteAssetModels = (id) => {
    const url = Domain + '/models/' + id;
    axios.delete(url)
      .then((response) => {
        this.setState({ showNotifications: true });
        this.setState({ NotificationMessage: response.data.message });
        this.callServerData(this.state.page);
      })
  }
  showdeleted = (row) => {
    this.setState({ AssetModelstoUpdate: row });
    const { ShowUpdate } = this.state;
    this.setState({ ShowUpdate: !ShowUpdate });
  }
  UpdateAssetModels = (row) => {
    this.setState({ AssetModelstoUpdate: row });
    const { ShowUpdate } = this.state;
    this.setState({ ShowUpdate: !ShowUpdate });
    this.setState({editProcess:"Update"});
  }
  CloneAssetModels = (row) => {
    this.setState({ AssetModelstoUpdate: row });
    const { ShowUpdate } = this.state;
    this.setState({ ShowUpdate: !ShowUpdate });
    this.setState({editProcess:"Clone"});
  }
  AssetModelsDetails = (row) => {
    this.setState({ AssetModelsDetails: row });
    const { ShowDetails } = this.state;
    this.setState({ ShowDetails: !ShowDetails });
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

  render() {
    const { ShowCreate, ShowDelete, ShowDetails, ShowUpdate} = this.state;
    const { AssetModelsData, sizePerPage, page } = this.state;
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
        <AssetModelsCreate />
      )
    }
    else if (ShowDelete) {
      return (
        <AssetModelsViewDeleted />
      )
    }
    else if (ShowUpdate) {
      return (
        <AssetModelsUpdate AssetModelstoUpdate={this.state.AssetModelstoUpdate} editProcess={this.state.editProcess}/>
      )
    }
    else if (ShowDetails) {
      return (
        <AssetModelsDetails AssetModelsDetails={this.state.AssetModelsDetails} />
      )
    }

    else {
      return (
        <div>

          <div >
            <div class="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 class="h3 mb-0 text-gray-800 custommain-title">{t('assetmodel.name')}</h1>

              <div class="row mb-0">
                <div class="col">
                  <button onClick={this.ViewDeleteBtnClick} className=" btn btn-sm btn-primary shadow-sm custommain-title">
                    {t('button.viewdeleted')}</button>
                  <button onClick={this.CreateBtnClick} className=" btn btn-sm btn-primary shadow-sm custommain-title">
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
                        <strong>{this.state.NotificationMessage}</strong>

                      </div>
                    </div>
                  </div>
                )
              }
            })()}
            <div >
              <RemoteAll
                data={AssetModelsData}
                page={page}
                sizePerPage={sizePerPage}
                totalSize={this.state.AssetModelsDataTotal}
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
export default withTranslation()(AssetModelsMain);

