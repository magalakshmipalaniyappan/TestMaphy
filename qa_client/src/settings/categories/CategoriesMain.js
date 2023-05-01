import React, { Component } from 'react';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
import { withTranslation } from 'react-i18next'

import CategoriesCreate from './CategoriesCreate';
import CategoriesUpdate from './CategoriesUpdate';
import CategoriesType from './CategoriesType';

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
      noDataIndication={indication}
      defaultSorted={defaultSorted}
      search
      exportCSV
      columnToggle >
      {toolkitprops => [

        <div className="custom-table  custom-tablelayout"  >
          <div class="col">
            <div class="row ">

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
class CategoriesMain extends Component {

  constructor(props) {
    super(props)
    this.state = {

      CategoriesData: [],
      CategoriesId: '',

      Categories_Details: '',
      CategoriesDataTotal: '',

      ShowCreate: false,
      showUpdate: false,
      ShowDetails: false,
      NotificationMessage: '',
      showNotifications: false,

      columns: [{
        dataField: 'id',
        text: 'ID',
        sort: true,
        hidden: true,
        headerStyle: { 'white-space': 'nowrap' }
      }, {
        dataField: 'name',
        text: 'Categories Name',
        sort: true,
        formatter: this.linkFormatter,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'category_type',
        text: 'Type',
        sort: true,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'item_count',
        text: 'QTY',
        sort: false,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'has_eula',
        text: 'EULA',
        sort: false,
        formatter: this.TrueFalseFormatter,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'checkin_email',
        text: 'Check In Mail',
        sort: false,
        formatter: this.TrueFalseEmailFormatter,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'require_acceptance',
        text: 'Acceptance',
        sort: false,
        formatter: this.TrueFalseAcceptanceFormatter,
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


  TrueFalseFormatter = (row) => {

    if (row.has_eula === 1) {
      return (

        <i class="fa fa-check text-success"></i>
      )
    }
    else {
      return (
        <i class="fa fa-times text-danger"></i>
      );
    }

  };
  TrueFalseEmailFormatter = (cel, row, rowIndex) => {
    if (row.checkin_email === true) {
      return (

        <i class="fa fa-check text-success"></i>
      )
    }
    else {
      return (
        <i class="fa fa-times text-danger"></i>
      );
    }

  };
  TrueFalseAcceptanceFormatter = (cell, row, rowIndex) => {
    if (row.require_acceptance === true) {
      return (

        <i class="fa fa-check text-success"></i>
      )
    }
    else {
      return (
        <i class="fa fa-times text-danger"></i>
      );
    }

  };

  EditDeleteFormatter = (cell, row, rowIndex) => {
    const { t } = this.props
    return (
      <div class="btn-group" role="group" >
        <button name="edit" class="btn-sm btn-warning custombtn" data-tooltip="true" title={t('button.edit')} onClick={() => { this.UpdateCategories(row) }}>  <i class="fa fa-edit" aria-hidden="true"></i></button>
        {(row.item_count !== 0) ? <button name="delete" class="btn-sm btn-danger custombtn" data-tooltip="true" title={t('button.delete')} disabled><i class="fa fa-trash" aria-hidden="true"></i></button>
          : <button name="delete" class="btn-sm btn-danger custombtn" data-tooltip="true" title={t('button.delete')} onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.deleteCategories(row.id) }}><i class="fa fa-trash" aria-hidden="true"></i></button>

        }

      </div>
    );
  };

  linkFormatter = (cell, row, rowIndex) => {
    return (
      <div>
        <button class="btn btn-link customlink-btn" name="btnupdate" onClick={() => { this.CategoryDetails(row) }}>{row.name}</button>

      </div>
    );
  };


  componentDidMount() {
    this.setState({ NotificationMessage: this.props.NotificationMessage });
    this.setState({ showNotifications: this.props.showNotifications });
    this.callServerData(this.state.page);
  }

  callServerData() {
    const url = Domain + '/categories?limit=' + this.state.sizePerPage +
      '&offset=' + this.state.offset +
      '&search=' + this.state.searchText +
      '&sort=' + this.state.sortField +
      '&order=' + this.state.sortOrder + '';

    axios.get(url)
      .then((response) => {
        this.setState({ CategoriesData: response.data.rows });
        this.setState({ CategoriesDataTotal: response.data.total });
      });
  }

  CreateBtnClick = () => {
    const { ShowCreate } = this.state;
    this.setState({ ShowCreate: !ShowCreate });
  }

  deleteCategories = (id) => {

    const url = Domain + '/categories/' + id;
    axios.delete(url)
      .then((response) => {
        this.setState({ showNotifications: true });
        console.log("delete message" + response.data.message);
        this.setState({ NotificationMessage: response.data.message });

        this.callServerData(this.state.page);
      })
  }

  UpdateCategories = (row) => {
    this.setState({ CategoriesDatatoUpdate: row });
    const { showUpdate } = this.state;
    this.setState({ showUpdate: !showUpdate });
  }
  CategoryDetails = (row) => {
    this.setState({ CategoriesDatatoUpdate: row });
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
  onLanguageHandle = (event) => {
    let newLang = event.target.value;
    this.setState({ value: newLang })
    this.props.i18n.changeLanguage(newLang)
  }

  render() {
    const { t } = this.props
    const { ShowCreate, ShowDetails, showUpdate } = this.state;
    const { CategoriesData, sizePerPage, page } = this.state;
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
                    <label className="custom-toggle custom-table table-responsive " >

                      <input type="checkbox" key={column.dataField} id={column.dataField} checked={column.toggle} aria-checked={column.toggle ? "true" : "false"}
                        onChange={() => this.myColumnToggle(column.dataField, columns)} />
                      &nbsp;&nbsp;
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
        <CategoriesCreate />
      )
    }
    else if (showUpdate) {
      return (
        <CategoriesUpdate CategoriesDatatoUpdate={this.state.CategoriesDatatoUpdate} />
      )
    }
    else if (ShowDetails) {
      return (
        <CategoriesType CategoriesDatatoUpdate={this.state.CategoriesDatatoUpdate}></CategoriesType>
      )
    }

    else {
      return (
        <div>
          <div >
            <div class="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 class="h3 mb-0 text-gray-800 custommain-title" name="categories"> {t('category.categories')}</h1>


              <button onClick={this.CreateBtnClick} name="createnew" className="btn btn-sm btn-primary shadow-sm custommain-title">
                {t('category.createnew')}</button>

            </div>
            {(() => {
              if (this.state.showNotifications) {
                return (
                  <div class="row">
                    <div class="col-md-12">
                      <div class="alert alert-success alert-dismissible fade show customcreate-alert" role="alert">
                        <strong>{this.state.NotificationMessage}</strong>

                      </div>
                    </div>
                  </div>
                )
              }
            })()}
            <div>
              {/* <div> <input type='text' placeholder="search" name="searchText" class="customtext-search" onChange={this.myChangeHandler} />
                <button type='input' class=" custombg-search" data-tooltip="true" title="Search" onClick={this.SearchBtnClick}><i class="fa fa-search"></i></button></div>
              */}
            </div>
            <div >

              <RemoteAll
                data={CategoriesData}
                page={page}
                sizePerPage={sizePerPage}
                totalSize={this.state.CategoriesDataTotal}
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

export default withTranslation()(CategoriesMain);