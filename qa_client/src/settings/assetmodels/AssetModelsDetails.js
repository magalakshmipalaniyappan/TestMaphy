import React, { Component } from 'react';
import axios from 'axios';
import { withTranslation} from 'react-i18next'

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';

import AssetModelsCreate from '../assetmodels/AssetModelsCreate';
import AssetModelsUpdate from '../assetmodels/AssetModelsUpdate';
//import AssetModelsClone from '../assetmodels/AssetModelsClone';

import AssetModelsMain from '../assetmodels/AssetModelsMain';
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
        <div className="custom-table custompeople-tablelayout">
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
class AssetModelsDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: "en",
      AssetModelstoUpdate: '',
      AssetModelstDetails: '',
      ShowAssets: true,
      ShowMain: false,
      ShowCreate: false,
      ShowUpdate: false,
      ShowClone: false,
      TableData: [],
      TableDataTotal: 0,
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
        text: 'Asset Name',
        sort: true,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'asset_tag',
        text: 'Asset tag',
        sort: true,
        headerStyle: { 'white-space': 'nowrap' }

      },
      {
        dataField: 'serial',
        text: 'Serial',
        sort: false,
        headerStyle: { 'white-space': 'nowrap' }

      },
      {
        dataField: 'model.name',
        text: 'Model',
        sort: true,
        hidden: true,
        headerStyle: { 'white-space': 'nowrap' }

      },
      {
        dataField: 'model_number',
        text: 'Model Number',
        sort: false,
        hidden: true,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'category.name',
        text: 'Category',
        sort: false,
        headerStyle: { 'white-space': 'nowrap' }

      },
      {
        dataField: 'status_label.name',
        text: 'Status',
        sort: false,
        headerStyle: { 'white-space': 'nowrap' }


      },
      {
        dataField: 'assigned_to.name',
        text: 'Assigned To',
        sort: false,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'assigned_to.employee_num',
        text: 'Employee No',
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
        dataField: 'rtd_location.name',
        text: 'Default Location',
        sort: false,
        headerStyle: { 'white-space': 'nowrap' }

      },
      {
        dataField: 'manufacturer.name',
        text: 'Manufacturer',
        sort: false,
        hidden: true,
        headerStyle: { 'white-space': 'nowrap' }

      },
      {
        dataField: 'supplier.name',
        text: 'Supplier',
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
        dataField: 'order_number',
        text: 'Order Number',
        sort: false,
        hidden: true,
        headerStyle: { 'white-space': 'nowrap' }
      },

      {
        dataField: 'warranty_months',
        text: 'Warranty',
        sort: false,
        hidden: true,
        headerStyle: { 'white-space': 'nowrap' }
      },
     // {
       // dataField: 'warranty_expires.formatted',
       // text: 'Warranty Expires',
       // sort: false,
      //  hidden: true,
      //  headerStyle: { 'white-space': 'nowrap' }
     // },
      {
        dataField: 'notes',
        text: 'Notes',
        sort: false,
        hidden: true,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'checkout_counter',
        text: 'Checkouts',
        sort: false,
        hidden: true,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'checkin_counter',
        text: 'Checkins',
        sort: false,
        hidden: true,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'requestable',
        text: 'Requests',
        sort: false,
        hidden: true,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'created_at.formatted',
        text: 'Created at',
        sort: false,
        hidden: true,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'updated_at.formatted',
        text: 'Updated at',
        sort: false,
        hidden: true,
        headerStyle: { 'white-space': 'nowrap' }
      },
      // {
      //   dataField: 'last_checkout.date',
      //   text: 'Checkout Date',
      //   sort: false,
      //   hidden: true,
      //   headerStyle: { 'white-space': 'nowrap' }
      // },
      // {
      //   dataField: 'expected_checkin.date',
      //   text: ' Checkin Date',
      //   sort: false,
      //   hidden: true,
      //   headerStyle: { 'white-space': 'nowrap' }
      // },

      ],
      offset: 0,
      sortField: 'id',
      sortOrder: 'desc',
      page: 1,
      sizePerPage: 10,
      searchText: ''
    }
  }
  componentDidMount() {
    // this.setState({ AssetModelstoUpdate: this.props.AssetModelstoUpdate });
    //this.setState({ AssetModelstDetails: this.props.AssetModelstDetails });
    //this.setState({ showNotifications: this.props.showNotifications });
    this.callServerData(this.state.page);
  }
  async callServerData() {
    const url = Domain + '/hardware?model_id=' + this.props.AssetModelsDetails.id +
      '&limit=' + this.state.sizePerPage +
      '&offset=' + this.state.offset +
      '&search=' + this.state.searchText +
      '&sort=' + this.state.sortField +
      '&order=' + this.state.sortOrder + '';

    await axios.get(url)
      .then((response) => {
        this.setState({ TableData: response.data.rows });
        this.setState({ TableDataTotal: response.data.total });
      });
  }

  BackBtnClick = () => {
    this.setState({ ShowAssets: false });
    this.setState({ ShowCreate: false });
    this.setState({ ShowUpdate: false });
    this.setState({ ShowMain: true })
  }
  AssetModelsCreateClick = () => {
    this.setState({ ShowAssets: false });
    this.setState({ ShowCreate: true });
    this.setState({ ShowUpdate: false });
    this.setState({ ShowMain: false })
  }
  UpdateAssetModels = () => {
    this.setState({ ShowAssets: false });
    this.setState({ ShowCreate: false });
    this.setState({ ShowUpdate: true });
    this.setState({ ShowMain: false })

  }
  CloneAssetModels = () => {
    this.setState({ ShowAssets: false });
    this.setState({ ShowCreate: false });
    this.setState({ ShowClone: true });
    this.setState({ ShowMain: false })
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
    const { ShowAssets, ShowUpdate, ShowCreate,ShowClone, TableData, sizePerPage, page } = this.state;
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

    if (ShowAssets) {
      return (

        <div>
          <div>

            <div class="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 class="h3 mb-0 text-gray-800">{t('assetmodel.details')}</h1>

              <div class="pull-left">
                <div class="btn-group pull-left">
                  <button class="btn btn-primary customcolumns-csv dropdown-toggle " data-toggle="dropdown">{t('button.actions')}


                  </button>
                  <ul class="dropdown-menu">
                    <li><button name="btnCreate" class="btn btn-link" onClick={this.AssetModelsCreateClick}>{t('assetmodel.create')}</button></li>
                    <li><button name="btnUpdate" class="btn btn-link" onClick={this.UpdateAssetModels}>{t('assetmodel.update')}</button></li>
                    <li><button name="btnClone" class="btn btn-link" onClick={this.CloneAssetModels}>{t('assetmodel.clone')}</button></li>
                  </ul>&nbsp;
                  <button onClick={this.BackBtnClick} className="  btn btn-primary customcolumns-csv">
                  {t('button.back')}</button>


                </div>
              </div>
            </div>
          </div>

          <div >

            <RemoteAll
              data={TableData}
              page={page}
              sizePerPage={sizePerPage}
              totalSize={this.state.TableDataTotal}
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
      )

    }

    else if (ShowUpdate)
      return (<AssetModelsUpdate AssetModelstoUpdate={this.props.AssetModelsDetails} editProcess="Update"/>)
    else if (ShowClone)
      return ( <AssetModelsUpdate AssetModelstoUpdate={this.props.AssetModelsDetails} editProcess="Clone"/> )
    else if (ShowCreate)
      return (<AssetModelsCreate />)
    else
      return (<AssetModelsMain />)
  }

}

export default withTranslation()(AssetModelsDetails);
