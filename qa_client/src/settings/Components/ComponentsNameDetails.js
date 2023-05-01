import React, { Component } from 'react';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
import ComponentsCheckin from './ComponentsCheckin';
import { withTranslation} from 'react-i18next'

import ComponentsCheckout from './ComponentsCheckout';
import ComponentsUpdate from './ComponentsUpdate';
import ComponentsMain from './ComponentsMain';

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
      keyField="item_id"
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
class ComponentsNameDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: "en",
      TableData: [],
      TableDataTotal: 0,
      ComponentsDetails: '',
      ComponentDatatoCheckout: '',
      ComponentstoUpdate: '',
      showNotifications: false,
      ShowCheckout: false,
      ShowUpdate: false,
      ShowMain: false,
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

    const url = Domain + '/components/' + this.props.ComponentsNameDetails.id + '/assets?' +

      'limit=' + this.state.sizePerPage +
      '&offset=' + this.state.offset +
      '&search=' + this.state.searchText +
      '&sort=' + this.state.sortField +
      '&order=' + this.state.sortOrder + '';

    axios.get(url)
      .then((response) => {
        this.setState({ TableData: response.data.rows });
        this.setState({ TableDataTotal: response.data.total });
      });
  }
  BackBtnClick = () => {
    this.setState({ ShowComponents: false });
    this.setState({ ShowCreate: false });
    this.setState({ ShowUpdate: false });
    this.setState({ ShowMain: true })
  }
  UpdateComponents = () => {
    this.setState({ ShowComponents: false });
    this.setState({ ShowCreate: false });
    this.setState({ ShowUpdate: true });
    this.setState({ ShowMain: false })
  }

  CheckoutComponents = () => {
    this.setState({ ShowComponents: false });
    this.setState({ ShowCheckout: true });
    this.setState({ ShowUpdate: false });
    this.setState({ ShowMain: false })
  }
  checkinComponents = (row) => {
    this.setState({ ComponentstoUpdate: row });
    const { ShowCheckin } = this.state;
    this.setState({ ShowCheckin: !ShowCheckin });
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
    const { ShowCheckin, ShowCheckout, ShowMain, ShowUpdate } = this.state;
    const { TableData, sizePerPage, page } = this.state;
    const { t } = this.props;

    const { ExportCSVButton } = CSVExport;
    const CustomToggleList = ({ columns, onColumnToggle, toggles }) => (
      <div className="text-center">
        <div class="pull-left">
          <div class="btn-group pull-left">
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

                    <label className="custom-toggle custom-table table-responsive" >
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


    const CheckinFormatter = (cell, row, rowIndex) => {
      const { t } = this.props

      return (
        <button name="btnCheckin" class="btn-sm custombg-checkout custombtn" onClick={() => { if (window.confirm('Are you sure you wish to Checkin these items?')) this.checkinComponents(row) }}>{t('button.checkin')}</button>
      );

    };
    const columns = [
      {
        dataField: 'assigned_pivot_id',
        text: 'Seat Id',
 hidden: true,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'name',
        text: 'Asset',
 headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'qty',
        text: 'Qty',
        sort: false,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'created_at',
        text: 'Checkout Date',
        sort: false,
        headerStyle: { 'white-space': 'nowrap' }
      },

      { dataField: "Actions", text: "Actions", sort: false, hidden: false, formatter: CheckinFormatter }];

    if (ShowCheckin) {
      return (
        <ComponentsCheckin ComponentstoUpdate={this.state.ComponentstoUpdate} ComponentsNameDetails={this.props.ComponentsNameDetails} />
      )
    }
    else if (ShowUpdate) {
      return (
        <ComponentsUpdate ComponentstoUpdate={this.props.ComponentsNameDetails} />
      )
    }
    else if (ShowCheckout) {
      return (
        <ComponentsCheckout ComponentDatatoCheckout={this.props.ComponentsNameDetails} />
      )
    }
    else if (ShowMain) {
      return (
        <ComponentsMain />
      )
    }
    else {
      return (

        <div>
          <div >
            <div class="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 class="h3 mb-0 text-gray-800 custommain-title" name="componentname">{t('component.componentname')}</h1>

              <div class="pull-left">
                <div class="btn-group pull-left">

                  <button name="actions" class=" btn btn-primary customcolumns-csv dropdown-toggle " data-toggle="dropdown">{t('button.actions')}

                  </button>
                  <ul class="dropdown-menu">
                    <li><button name="btnCheckout" class="btn btn-link" onClick={this.UpdateComponents}>{t('component.update')}</button></li>
                  </ul> &nbsp;
                  <button name="back" onClick={this.BackBtnClick} className="  btn btn-primary customcolumns-csv">
                    {t('button.back')}</button>
                </div>
              </div>
            </div>

            <div >
              <RemoteAll

                data={TableData}
                page={page}
                sizePerPage={sizePerPage}
                totalSize={this.state.TableDataTotal}
                columns={columns}
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
export default withTranslation()(ComponentsNameDetails);


