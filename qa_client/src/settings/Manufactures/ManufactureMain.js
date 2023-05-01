import React, { Component } from 'react';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
import ManufactureCreate from './ManufactureCreate';
import ManufactureUpdate from './ManufactureUpdate';
import ManufactureDetails from './ManufactureDetails';
import ManufactureViewDeleted from './ManufactureViewDeleted';
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
      noDataIndication={ indication }
      search
      exportCSV
      columnToggle >
      {toolkitprops => [

       <div className="custom-table ">
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
class ManufactureMain extends Component {
  constructor(props) {
    super(props)
    this.state = {
       value: "en",
       ManufactureData: [],
      ManufactureId: '',
      ManufacturetoUpdate: '',
      ManufactureDetails: [],
      ManufactureDatatotal: '',

      ShowCreate: false,
      ShowDelete: false,
      ShowUpdate: false,
      ShowDetails: false,
      NotificationMessage: '',
      showNotifications: false,
      offset: 0,
      sortField: 'id',
      sortOrder: 'desc',
      page: 1,
      sizePerPage: 10,
      searchText: '',
      columns : [{
      dataField: 'id',
      text: 'ID',
      sort: true,
     headerStyle:  { 'white-space' : 'nowrap' }
    },
    {
      dataField: 'name',
      text: 'Manufacturer Name',
      sort: true,
      formatter: this.DetailsFormatter,
      headerStyle:  { 'white-space' : 'nowrap' }
    },
    {
      dataField: 'url',
      text: 'Url',
      sort: true,
      formatter: this.UrlFormatter,
      headerStyle:  { 'white-space' : 'nowrap' }

    },
    {
      dataField: 'support_url',
      text: 'Support Url',
      sort: true,
     
      formatter: this.SupportUrlFormatter,
      headerStyle:  { 'white-space' : 'nowrap' }

    },
    {
      dataField: 'support_phone',
      text: 'Support Phone',
      sort: true,
      formatter: this.PhoneFormatter,
      headerStyle:  { 'white-space' : 'nowrap' }

    },
    {
      dataField: 'support_email',
      text: 'Support Email',
      sort: true,
      
      formatter: this.EmailFormatter,
      headerStyle:  { 'white-space' : 'nowrap' }

    },
    {
      dataField: "Actions",
      text: "Actions",
      sort: false,
      hidden: false,
      formatter: this.EditDeleteFormatter,
      headerStyle:  { 'white-space' : 'nowrap' }
    }
]
    
    }
    this.handleTableChange = this.handleTableChange.bind(this);
  }
  componentDidMount() {
    this.setState({ NotificationMessage: this.props.NotificationMessage });
    this.setState({ showNotifications: this.props.showNotifications });
    this.callServerData(this.state.page);
  }
  callServerData() {
    const url = Domain + '/manufacturers?limit=' + this.state.sizePerPage +
      '&offset=' + this.state.offset +
      '&search=' + this.state.searchText +
      '&sort=' + this.state.sortField +
      '&order=' + this.state.sortOrder + '';

    axios.get(url)
      .then((response) => {
        this.setState({ ManufactureData: response.data.rows });
        this.setState({ ManufactureDataTotal: response.data.total });
      });
  }
  myColumnToggle = (df,columns) => {
    var newTableColumns = columns.map( (val) => {
       if( val.dataField === df) {
         val.hidden = !val.hidden
       }
       return val;
    });
    this.setState({columns:newTableColumns})
  }
  
     EditDeleteFormatter = (cell, row, rowIndex) => {
        const { t } = this.props;
      return (
        <div class="btn-group" role="group" >
  <button name="edit" class="btn-sm btn-warning custombtn" data-tooltip="true" title={t('button.edit')}  onClick={() => {  this.UpdateManufacture(row) }}><i class="fa fa-edit" aria-hidden="true"></i></button>

  {(row.accessories_count || row.assets_count || row.licenses_count || row.consumables_count  !== 0) ? <button name="delete" class="btn-sm btn-danger custombtn" data-tooltip="true" title={t('button.delete')} disabled><i class="fa fa-trash" aria-hidden="true"></i></button>
        : <button name="delete" class="btn-sm btn-danger custombtn" data-tooltip="true" title={t('button.delete')} onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.deleteManufacture(row.id) }}><i class="fa fa-trash" aria-hidden="true"></i></button>
        }

</div>
      );
    };

     DetailsFormatter = (cell, row, rowIndex) => {
      return (
        <div>
          <button class="btn btn-link customlink-btn" name="btnDetails" onClick={() => { this.ManufactureDetails(row) }}>{row.name}</button>

        </div>
      );
    };
     UrlFormatter = (cell, row, rowIndex) => {
      return (
        <div>
          <a href={row.url}>{row.url}</a>
        </div>
      );
    };
     SupportUrlFormatter = (cell, row, rowIndex) => {
      return (
        <div>
          <a href={row.support_url}>{row.support_url}</a>
        </div>
      );
    };
     PhoneFormatter = (cell, row, rowIndex) => {
      return (
        <div>
          <a href="tel:#">{row.support_phone}</a>

        </div>
      );
    };
     EmailFormatter = (cell, row, rowIndex) => {
      return (
        <div>
          <a href="mailto:#">{row.support_email}</a>

        </div>
      );
    };
  
  CreateBtnClick = () => {
    const { ShowCreate } = this.state;
    this.setState({ ShowCreate: !ShowCreate });
  }
  ShowDeleteBtnClick = () => {
    const { ShowDelete } = this.state;
    this.setState({ ShowDelete: !ShowDelete });
  }

  deleteManufacture = (id) => {
    const url = Domain + '/manufacturers/' + id;
    axios.delete(url)
      .then((response) => {
        this.setState({ showNotifications: true });
        console.log("delete message" + response.data.message);
        this.setState({ NotificationMessage: response.data.message });
        this.callServerData(this.state.page);
      })
  }
  showdeleted = (row) => {
    this.setState({ ManufacturetoUpdate: row });
    const { ShowUpdate } = this.state;
    this.setState({ ShowUpdate: !ShowUpdate });
  }
  UpdateManufacture = (row) => {
    this.setState({ ManufacturetoUpdate: row });
    const { ShowUpdate } = this.state;
    this.setState({ ShowUpdate: !ShowUpdate });
  }
  ManufactureDetails = (row) => {
    console.log("row" + row.id)
    this.setState({ ManufactureDetails: row });
    const { ShowDetails } = this.state;
    this.setState({ ShowDetails: !ShowDetails });
    console.log("ManufactureDetails" + this.state.ManufactureDetails)
  }

  myChangeHandler = (event) => {

    this.setState({ [event.target.name]:event.target.value});
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
   onLanguageHandle = (event) => {
    let newLang = event.target.value;
    this.setState({ value: newLang })
    this.props.i18n.changeLanguage(newLang)
  }

  render() {
     const { t } = this.props;
    const { ShowCreate, ShowDelete, ShowUpdate, ShowDetails } = this.state;
    const { ManufactureData, sizePerPage, page, } = this.state;

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
        <ManufactureCreate />
      )
    }
    else if (ShowDelete) {
      return (
        <ManufactureViewDeleted />
      )
    }
    else if (ShowUpdate) {
      return (
        <ManufactureUpdate ManufacturetoUpdate={this.state.ManufacturetoUpdate} />
      )
    }
    else if (ShowDetails) {
      return (
        <ManufactureDetails ManufactureDetails={this.state.ManufactureDetails} />
      )
    }
    else {
      return (
        <div >
          <div >
            <div class="d-sm-flex align-items-center justify-content-between mb-4">
               <h1 class="h3 mb-0 text-gray-800 custommain-title" name="manufacture">{t('manufacturers.manufacture')}</h1>
            <div class="row mb-0">
                <div class="col">
                 <button  name="showdeleted" onClick={this.ShowDeleteBtnClick} className=" btn btn-sm btn-primary shadow-sm custommain-title">
                  {t('manufacturers.showdeleted')}</button>
                  <button name="createnew" onClick={this.CreateBtnClick} className="btn btn-sm btn-primary shadow-sm custommain-title">
                    {t('manufacturers.createnew')}</button>
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
                data={ManufactureData}
                page={page}
                sizePerPage={sizePerPage}
                totalSize={this.state.ManufactureDataTotal}
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
export default withTranslation()(ManufactureMain);