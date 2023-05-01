import React, { Component } from 'react';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
import { withTranslation} from 'react-i18next';
import ConsumableCategories from './ConsumableCategories';
import ConsumableDetails from './ConsumableDetails';
import ConsumablesCreate from './ConsumablesCreate';
import ConsumablesUpdate from './ConsumablesUpdate';
import CheckOutConsumable from './CheckOutConsumable';


const Domain = process.env.REACT_APP_URL;
var userpermission = "";

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
class ConsumablesMain extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: "en",
      ConsumablesData: [],
      ConsumablesId: '',
      ConsumablesIdToUpdate: '',
      ConsumablesNametoUpdate: '',
      CategoriesDatatoUpdate: '',
      ConsumablesDataTotal: '',


      ShowCreate: false,
      ShowUpdate: false,
      ShowCheckOut: false,
      ShowCompany: false,
      ShowName: false,
      ShowId: false,
      ShowCategory: false,
      ShowLocation: false,
      ShowManufacturer: false,
      NotificationMessage: '',
      showNotifications: false,
      offset: 0,
      sortField: 'id',
      sortOrder: 'desc',
      page: 1,
      sizePerPage: 10,
      searchText: '',
      columns: [{
        dataField: 'id',
        text: 'ID',
        sort: true,
        hidden: true,
        headerStyle: { 'white-space': 'nowrap' }

      },
      {
        dataField: 'company.name',
        text: 'Company',
        sort: false,
        hidden: true,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'name',
        text: 'Consumable Name',
        sort: true,
        formatter: this.NamelinkFormatter,
        headerStyle: { 'white-space': 'nowrap' }

      },
      {
        dataField: 'category.name',
        text: 'Category',
        sort: false,
        formatter: this.CategorylinkFormatter,
        headerStyle: { 'white-space': 'nowrap' }

      },
      {
        dataField: 'model_number',
        text: 'Model',
        sort: false,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'item_no',
        text: 'Item No',
        sort: false,
        hidden: true,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'qty',
        text: 'Total',
        sort: false,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'remaining',
        text: 'Remaining',
        sort: false,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'min_amt',
        text: 'Min.QTY',
        sort: false,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'location.name',
        text: 'Location',
        sort: false,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'manufacturer.name',
        text: 'Manufacturer',
        sort: true,
        hidden: true,
        headerStyle: { 'white-space': 'nowrap' }

      },
      {
        dataField: 'order_number',
        text: 'Order Number',
        sort: false,
        hidden: true,
        headerStyle: { 'white-space': 'nowrap' }
      },

      {
        dataField: 'purchase_date.formatted',
        text: 'Purchase Date',
        sort: false,
        hidden: true,
        headerStyle: { 'white-space': 'nowrap' }
      },

      {
        dataField: 'purchase_cost',
        text: 'Purchase Cost',
        sort: false,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'change',
        text: 'Checkin/Checkout',
        sort: false,
        formatter: this.CheckOutFormatter,
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


      ]
    }

    this.handleTableChange = this.handleTableChange.bind(this);
    //this.handleTableChange = this.handleTableChange.bind(this);
  }



  componentDidMount() {
    userpermission = JSON.parse(localStorage.getItem('permissions'));

    this.setState({ NotificationMessage: this.props.NotificationMessage });
    this.setState({ showNotifications: this.props.showNotifications });
    this.callServerData(this.state.page);
  }

  async callServerData() {
    const url = Domain + '/consumables?limit=' + this.state.sizePerPage +
      '&offset=' + this.state.offset +
      '&search=' + this.state.searchText +
      '&sort=' + this.state.sortField +
      '&order=' + this.state.sortOrder + '';

    await axios.get(url)
      .then((response) => {
        this.setState({ ConsumablesData: response.data.rows });
        this.setState({ ConsumablesDataTotal: response.data.total });
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
  CreateBtnClick = () => {
    const { ShowCreate } = this.state;
    this.setState({ ShowCreate: !ShowCreate });
  }

  deleteConsumables = async (id) => {

    const url = Domain + '/consumables/' + id;
    await axios.delete(url)
      .then((response) => {
        this.setState({ showNotifications: true });
        this.setState({ NotificationMessage: response.data.message });
        this.callServerData(this.state.page);
      })

  }

  UpdateConsumables = (row) => {
    this.setState({ ConsumablesDatatoUpdate: row });
    const { ShowUpdate } = this.state;
    this.setState({ ShowUpdate: !ShowUpdate });
  }
  CheckOutConsumable = (row) => {
    this.setState({ ConsumablesDatatoUpdate: row });
    const { ShowCheckOut } = this.state;
    this.setState({ ShowCheckOut: !ShowCheckOut });
  }
  IdDetails = (row) => {
    this.setState({ ConsumablesDatatoUpdate: row, CategoriesDatatoUpdate: row });
    const { ShowId } = this.state;
    this.setState({ ShowId: !ShowId });
  }
  NameDetails = (row) => {
    this.setState({ ConsumablesDatatoUpdate: row });
    const { ShowName } = this.state;
    this.setState({ ShowName: !ShowName });
  }
  myChangeHandler = (event) => {

    this.setState({ [event.target.name]: event.target.value });
  }
  SearchBtnClick = () => {
    this.callServerData();
  }
  EditDeleteFormatter = (cell, row, rowIndex) => {
    const { t } = this.props

    return (
      <div class="btn-group" role="group" >
        {(userpermission.superuser==="1") ?
          <>
            <button name="edit" class="btn-sm btn-warning custombtn" data-tooltip="true" title={t('button.edit')} onClick={() => { this.UpdateConsumables(row) }}><i class="fa fa-edit" aria-hidden="true"></i></button>
            {(row.qty !== row.remaining_qty) ? <button name="delete" class="btn-sm btn-danger custombtn" data-tooltip="true" title={t('button.delete')} disabled><i class="fa fa-trash" aria-hidden="true"></i></button>
              : <button name="delete" class="btn-sm btn-danger custombtn" data-tooltip="true" title={t('button.delete')} onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.deleteConsumables(row.id) }}><i class="fa fa-trash" aria-hidden="true"></i></button>

            }
          </> :
          <>
            <button name="edit" class="btn btn-sm btn-warning" data-tooltip="true" title={t('button.edit')} disabled><i class="fa fa-edit" aria-hidden="true"></i></button>
            <button name="delete" class="btn btn-sm btn-danger" data-tooltip="true" title={t('button.delete')} disabled><i class="fa fa-trash" aria-hidden="true"></i></button>
          </>}
      </div>
    );
  };

  CheckOutFormatter = (cell, row, rowIndex) => {
    const { t } = this.props

    if (row.remaining > 0 && (userpermission.superuser==="1")) {
      return (
        <button name="btnCheckout" class="btn-sm custombg-checkout custombtn" onClick={() => { if (window.confirm('Are you sure you wish to CheckOut these items?')) this.CheckOutConsumable(row) }}>{t('button.checkout')}</button>
      );
    }
    else {
      return (
        <button name="btnCheckout" class="btn-sm custombg-checkout custombtn" disabled >{t('button.checkout')}</button>
      );
    }
  };
  CategorylinkFormatter = (cell, row, name, rowIndex) => {
    return (
      <div>
        <button class="btn btn-link customlink-btn" name="btnupdate" onClick={() => { this.IdDetails(row) }}>{row.category.name}</button>

      </div>
    );
  };


  NamelinkFormatter = (cell, row, name, rowIndex) => {
    return (
      <div>
        <button class="btn btn-link customlink-btn" name="btnupdate" onClick={() => { this.NameDetails(row) }}>{row.name}</button>

      </div>
    );
  };
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
    const { ShowCreate, ShowId, ShowName, ShowCheckOut, ShowUpdate } = this.state;
    const { ConsumablesData, sizePerPage, page } = this.state;
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
        <ConsumablesCreate />
      )
    }
    else if (ShowUpdate) {
      return (
        <ConsumablesUpdate ConsumablesDatatoUpdate={this.state.ConsumablesDatatoUpdate} />
      )
    }
    else if (ShowCheckOut) {
      return (
        <CheckOutConsumable ConsumablesDatatoUpdate={this.state.ConsumablesDatatoUpdate} />
      )
    }
    else if (ShowId) {
      return (
        <ConsumableCategories ConsumablesDatatoUpdate={this.state.ConsumablesDatatoUpdate} CategoriesDatatoUpdate={this.state.CategoriesDatatoUpdate} />
      )
    }
    else if (ShowName) {
      return (
        <ConsumableDetails ConsumablesDatatoUpdate={this.state.ConsumablesDatatoUpdate} />
      )
    }
    else {
      return (
        <div>
          <div >
            <div class="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 class="h3 mb-0 text-gray-800 custommain-title"> {t('consumable.consumablename')}</h1>

              <div class="row mb-0">
                <div class="col">
                  {(userpermission.superuser==="1") ?
                    <button onClick={this.CreateBtnClick} className="btn btn-sm btn-primary shadow-sm custommain-title">
                      {t('button.create')}</button>
                    : null}
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
                data={ConsumablesData}
                page={page}
                sizePerPage={sizePerPage}
                totalSize={this.state.ConsumablesDataTotal}
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
export default withTranslation()(ConsumablesMain);

