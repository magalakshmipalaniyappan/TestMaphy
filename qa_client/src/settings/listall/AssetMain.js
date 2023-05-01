import React, { Component } from 'react';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';


import AssetDetails from './AssetDetails';
import AssetCreate from './AssetCreate';
import AssetUpdate from './AssetUpdate';
import { withTranslation } from 'react-i18next'
//import AssetDetails from './AssetDetails';

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
class ListAllMain extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: "en",
      ListAllData: [],
      LabelData: [],
      LabelDataTotal: '',
      ListAllId: '',
      ListAllIdToUpdate: '',
      ListAllNametoUpdate: '',
      ListAllDataTotal: '',

      ShowCreate: false,
      ShowUpdate: false,
      ShowDetails: false,
      ShowAssets: false,
      ShowSerial: false,
      ShowCheckout: false,
      showCheckIn: false,
      showNotifications: false,
      NotificationMessage: false,

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
        text: 'Asset Name',
        sort: true,
        formatter: this.NameFormatter,
        headerStyle: { 'white-space': 'nowrap' }

      },
      {
        dataField: 'asset_tag',
        text: 'Asset Tag',
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
        dataField: 'assetdetails',
        text: 'Asset Details',
        sort: false,
        headerStyle: { 'white-space': 'nowrap' }

      },
      {
        dataField: 'assigned_to.name',
        text: 'Assigned To',
        sort: false,
        formatter: this.AssignedTypeFormatter,
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
        text: 'Vendor',
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
        dataField: 'tax_value',
        text: 'Tax',
        sort: false,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'excluding_tax',
        text: 'Excluding Tax',
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
        dataField: 'eol',
        text: 'EOL',
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
        text: 'Created At',
        sort: false,
        hidden: true,
        headerStyle: { 'white-space': 'nowrap' }
      },
      {
        dataField: 'updated_at.formatted',
        text: 'Updated At',
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
  async callServerData() {

    const url = Domain + '/hardware?limit=' + this.state.sizePerPage +
      '&offset=' + this.state.offset +
      '&search=' + this.state.searchText +
      '&sort=' + this.state.sortField +
      '&order=' + this.state.sortOrder + '';

    await axios.get(url)
      .then((response) => {
        this.setState({ ListAllData: response.data.rows });
        this.setState({ ListAllDataTotal: response.data.total });
      });
  }
  EditDeleteFormatter = (cell, row, rowIndex) => {
    const { t } = this.props;
    return (
      <div class="btn-group" role="group" aria-label="Basic example">
        {(userpermission.superuser === "1") ?
          <>
            <button name="edit" class="btn-sm btn-warning custombtn" data-tooltip="true" title={t('button.edit')} onClick={() => { this.Update(row) }}><i class="fa fa-edit" aria-hidden="true"></i></button>
            <button name="clone" class="btn-sm btn-info custombtn" data-tooltip="true" title={t('button.clone')} onClick={() => { this.Clone(row) }}><i class="fa fa-copy" aria-hidden="true"></i></button>
            <button name="delete" class="btn-sm btn-danger custombtn" data-tooltip="true" title={t('button.delete')} onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.deleteListAll(row.id) }}><i class="fa fa-trash" aria-hidden="true"></i></button>
            <button name="print" class="btn-secondary custombtn" data-tooltip="true" title={t('button.print')} onClick={() => { this.Label(row) }}><i class="fas fa-print"></i></button> </>
          : <button name="print" class=" btn-secondary custombtn" data-tooltip="true" title={t('button.print')} onClick={() => { this.Label(row) }}><i class="fas fa-print"></i></button>
        }
      </div>
    );
  };

  AssignedTypeFormatter = (cell, row, rowIndex) => {
    if (row.assigned_to.type === "user") {
      return (
        <div>
          <i class="fa fa-user" aria-hidden="true"></i> {row.assigned_to.name}
        </div>
      )
    }
    else {
      return (
        <div> {row.assigned_to.name}</div>
      )
    }
}

NameFormatter = (cell, row, rowIndex) => {
  return (
    <div>
      <button class="btn btn-link customlink-btn" name="btnSerial" onClick={() => { this.AssetDetails(row) }}>{row.name}</button>

    </div>
  );
};
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

deleteListAll = (id) => {

  const url = Domain + '/hardware/' + id;
  axios.delete(url)
    .then((response) => {
      this.setState({ showNotifications: true });
      console.log("delete message" + response.data.message);
      this.setState({ NotificationMessage: response.data.message });
      this.setState({ ListAllData: this.state.ListAllData.filter(result => result.id !== id) });

    })
}
Label = (row) => {
  console.log("labels", row);

  var selectedLabel = JSON.stringify(row);
  localStorage.setItem("AssetLabel", selectedLabel);
  window.open("/AssetLabel", "_blank");

}

Update = (row) => {
  this.setState({ ListAllDatatoUpdate: row });
  const { ShowUpdate } = this.state;
  this.setState({ ShowUpdate: !ShowUpdate });
  this.setState({ editProcess: "Update" });
}
Clone = (row) => {
  this.setState({ ListAllDatatoUpdate: row });
  const { ShowUpdate } = this.state;
  this.setState({ ShowUpdate: !ShowUpdate });
  this.setState({ editProcess: "Clone" });
}

AssetDetails = (row) => {
  this.setState({ ListAllDataDetails: row })
  const { ShowSerial } = this.state;
  this.setState({ ShowSerial: !ShowSerial });
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
  const { t } = this.props
  const { ShowCreate, ShowSerial, ShowUpdate } = this.state;
  const { ListAllData, sizePerPage, page } = this.state;
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
                  <label className="custom-toggle  custom-table table-responsive" >
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

  if (ShowCreate)
    return (
      <AssetCreate mainPage="ListAllMain" />
    )
  else if (ShowUpdate)
    return (<AssetUpdate ListAllDatatoUpdate={this.state.ListAllDatatoUpdate} editProcess={this.state.editProcess} mainPage="ListAllMain" />)

  else if (ShowSerial)
    return (<AssetDetails AssetData={this.state.ListAllDataDetails} mainPage="ListAllMain" />)
  else {
    return (
      < div >
        <div >
          <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800 custommain-title" name="allassets">{t('AssetsListall.allassets')} </h1>
            {(userpermission.superuser === "1") ? <button name="create" onClick={this.CreateBtnClick} className="btn btn-sm btn-primary shadow-sm custommain-title">
              {t('button.create')}</button>
              : null
            }
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

          <div >
            <RemoteAll
              data={ListAllData}
              page={page}
              sizePerPage={sizePerPage}
              totalSize={this.state.ListAllDataTotal}
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

export default withTranslation()(ListAllMain);