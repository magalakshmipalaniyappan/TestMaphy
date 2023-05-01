import React, { Component } from 'react';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
import { withTranslation} from 'react-i18next'

import ComponentsCreate from './ComponentsCreate';
import ComponentsUpdate from './ComponentsUpdate';
import ComponentsNameDetails from './ComponentsNameDetails';

import ComponentsCheckout from './ComponentsCheckout';
import ComponentsCategory from './ComponentsCategory';
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
      noDataIndication={ indication }
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
class ComponentsMain extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: "en",
      ComponentsData: [],
      ComponentsId: '',
      ComponentstoUpdate: '',

      ComponentsDataTotal: '',

      ShowCreate: false,
      ShowUpdate: false,
      ShowCompany: false,
      ShowName: false,
      ShowCheckout: false,
      ShowLocation: false,
      ShowCategory: false,
      ShowSerial: false,
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
        hidden: true,
         headerStyle:  { 'white-space' : 'nowrap' }
      },
      {
        dataField: 'name',
        text: 'Components Name',
        sort: true,
        formatter: this.NameDetailsFormatter,
         headerStyle:  { 'white-space' : 'nowrap' }
  
      },
      {
        dataField: 'serial',
        text: 'Serial',
        sort: true,
        hidden: true,
         headerStyle:  { 'white-space' : 'nowrap' }
      },
      {
        dataField: 'category.name',
        text: 'Category ',
        sort: false,
        formatter: this.CategoryFormatter,
         headerStyle:  { 'white-space' : 'nowrap' }
      },
      {
        dataField: 'location.name',
        text: 'Location ',
        sort: false,
        hidden: true,
        headerStyle:  { 'white-space' : 'nowrap' }
      },
      {
        dataField: 'company.name',
        text: 'Company ',
        sort: false,
        headerStyle:  { 'white-space' : 'nowrap' }
      },
      {
        dataField: 'qty',
        text: 'Total',
        sort: false,
         headerStyle:  { 'white-space' : 'nowrap' }
      },
      {
        dataField: 'remaining',
        text: 'Remaining',
        sort: false,
         headerStyle:  { 'white-space' : 'nowrap' }
      },
      {
        dataField: 'min_amt',
        text: 'Min.Qty',
        sort: false,
         headerStyle:  { 'white-space' : 'nowrap' }
      },
      {
        dataField: 'order_number',
        text: 'Order Number',
        sort: false,
        hidden: true,
         headerStyle:  { 'white-space' : 'nowrap' }
      },
      {
        dataField: 'purchase_date.formatted',
        text: 'Purchase Date',
        sort: false,
        hidden: true,
         headerStyle:  { 'white-space' : 'nowrap' }
      },
      {
        dataField: 'purchase_cost',
        text: 'Purchase Cost',
        sort: false,
        headerStyle:  { 'white-space' : 'nowrap' }
      },
  
      {
        dataField: 'checkincheckout',
        text: 'Checkin/Checkout',
        sort: false,
        formatter: this.CheckoutFormatter,
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
    this.callLabel(this.state.page);

  }
  async callLabel() {
    const labelurl = Domain + '/labels';
    await axios.get(labelurl)
      .then((response) => {
        var LabelData = JSON.stringify(response.data.rows);
        localStorage.setItem("LabelData", LabelData);
      });

  }
  callServerData() {
    const url = Domain + '/components?limit=' + this.state.sizePerPage +
      '&offset=' + this.state.offset +
      '&search=' + this.state.searchText +
      '&sort=' + this.state.sortField +
      '&order=' + this.state.sortOrder + '';

    axios.get(url)
      .then((response) => {
        this.setState({ ComponentsData: response.data.rows });
        this.setState({ ComponentsDataTotal: response.data.total });
      });
  }
   
  EditDeleteFormatter = (cell, row, rowIndex) => {
    const { t } = this.props

    return (
      <div class="btn-group" role="group" >
           <button name="edit" class="btn-sm btn-warning custombtn" data-tooltip="true" title={t('button.edit')}  onClick={() => {  this.UpdateComponents(row) }}><i class="fa fa-edit" aria-hidden="true"></i></button>

             {(row.qty!== row.remaining) ? <button name="delete" class="btn-sm btn-danger custombtn" data-tooltip="true" title={t('button.delete')} disabled><i class="fa fa-trash" aria-hidden="true"></i></button>
          : <button name="delete" class=" btn-sm btn-danger custombtn" data-tooltip="true" title={t('button.delete')} onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.deleteComponents(row.id) }}><i class="fa fa-trash" aria-hidden="true"></i></button>

        }
             <button name="print" class="btn-secondary custombtn" data-tooltip="true" title={t('button.print')} onClick={() => {  this.LabelComponents(row) }}><i class="fas fa-print"></i></button>
    
</div>
    );
  };

   NameDetailsFormatter = (cell, row, rowIndex) => {
    return (
      <div>
        <button class="btn btn-link customlink-btn" name="btnNameDetails" onClick={() => { this.ComponentsNameDetails(row) }}>{row.name}</button>
      </div>
    );
  };
  
   CategoryFormatter = (cell, row, rowIndex) => {
    return (
      <div>
        <button class="btn btn-link customlink-btn" name="btnCategory" onClick={() => { this.ComponentsCategory(row) }}>{row.category.name}</button>

      </div>
    );
  };

   CheckoutFormatter = (cell, row, rowIndex) => {
    const { t } = this.props

    if (row.remaining > 0) {
      return (
        <button name="btnCheckout" class="btn-sm custombg-checkout custombtn" onClick={() => { if (window.confirm('Are you sure you wish to Checkout these items?')) this.checkoutComponents(row) }}>{t('button.checkout')}</button>
      );
    }
    else {
      return (
        <button name="btnCheckout" class="btn-sm custombg-checkout custombtn" disabled>{t('button.checkout')}</button>
      );
    }

  };
  CreateBtnClick = () => {
    const { ShowCreate } = this.state;
    this.setState({ ShowCreate: !ShowCreate });
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
  deleteComponents = (id) => {
    const url = Domain + '/components/' + id;
    axios.delete(url)
      .then((response) => {
        this.setState({ showNotifications: true });
        this.setState({ NotificationMessage: response.data.message });
           this.callServerData(this.state.page);
      })
  }
LabelComponents= (row) => {
  var selectedComponent=JSON.stringify(row);
  localStorage.setItem("ComponentLabel",selectedComponent);
  window.open("/ComponentsLabel","_blank");
  }

  UpdateComponents = (row) => {
    this.setState({ ComponentstoUpdate: row });
    const { ShowUpdate } = this.state;
    this.setState({ ShowUpdate: !ShowUpdate });
  }
  checkoutComponents = (row) => {
    this.setState({ checkoutComponentstoUpdate: row });
    const { ShowCheckout } = this.state;
    this.setState({ ShowCheckout: !ShowCheckout });
  }
  ComponentsCompanyDetails = (row) => {
    this.setState({ ComponentsCompanyDetails: row });
    const { ShowCompany } = this.state;
    this.setState({ ShowCompany: !ShowCompany });
  }
  ComponentsNameDetails = (row) => {
    this.setState({ ComponentsNameDetails: row });
    const { ShowName } = this.state;
    this.setState({ ShowName: !ShowName });
  }

  ComponentsCategory = (row) => {
    this.setState({ CategoriesDatatoUpdate: row });
    const { ShowCategory } = this.state;
    this.setState({ ShowCategory: !ShowCategory });
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
    const { ShowCreate, ShowUpdate, ShowName, ShowCheckout, ShowCategory } = this.state;
    const { ComponentsData, sizePerPage, page } = this.state;
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
                        onChange={() => this.myColumnToggle(column.dataField,columns)} />
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
        <ComponentsCreate />
      )
    }
    else if (ShowUpdate) {
      return (
        <ComponentsUpdate ComponentstoUpdate={this.state.ComponentstoUpdate} />
      )
    }
   
    else if (ShowName) {
      return (
        <ComponentsNameDetails ComponentsNameDetails={this.state.ComponentsNameDetails} />
      )
    }
    else if (ShowCheckout) {
      return (
        <ComponentsCheckout ComponentDatatoCheckout={this.state.checkoutComponentstoUpdate} />
      )
    }
    else if (ShowCategory) {
      return (
        <ComponentsCategory CategoriesDatatoUpdate={this.state.CategoriesDatatoUpdate} />
      )
    }
    
    else {
      return (
        <div>
          <div >
            <div class="d-sm-flex align-items-center justify-content-between mb-4 fixedContainer">
              <h1 class="h3 mb-0 text-gray-800 custommain-title">{t('component.componentname')}</h1>
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
                        <strong>{this.state.NotificationMessage}</strong>
                              </div>


                    </div>
                  </div>
                )
              }


            })()}
            <div >
              <RemoteAll
                data={ComponentsData}
                page={page}
                sizePerPage={sizePerPage}
                totalSize={this.state.ComponentsDataTotal}
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
export default withTranslation()(ComponentsMain);

