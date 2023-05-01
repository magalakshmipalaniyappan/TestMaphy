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
class Asset extends Component {
  constructor(props) {
    super(props)
    this.state = {

      ListAllData: [],
      ListAllId: '',
      ListAllIdToUpdate: '',
      ListAllNametoUpdate: '',
      ListAllDataTotal: '',
      //CompanyId_Details: '',

     
      showNotifications: false,
       columns :[{
        dataField: 'id',
        text: 'ID',
        sort: true,
        hidden: true,
        headerStyle:  { 'white-space' : 'nowrap' }
    },
    {
        dataField: 'company.name',
        text: 'Company',
        sort: true,
        hidden: true,
        headerStyle:  { 'white-space' : 'nowrap' }
  
    },
    {
        dataField: 'name',
        text: 'Asset Name',
        sort: true,
        headerStyle:  { 'white-space' : 'nowrap' }
      
    },
  
    {
        dataField: 'asset_tag',
        text: 'Asset Tag',
        sort: true,
        hidden: true,
        headerStyle:  { 'white-space' : 'nowrap' }
  
    },
    {
        dataField: 'serial',
        text: 'Serial',
        sort: false,
        hidden: true,
        headerStyle:  { 'white-space' : 'nowrap' }
  
    },
    {
        dataField: 'model.name',
        text: 'Model',
        sort: false,
        headerStyle:  { 'white-space' : 'nowrap' }
  
    },
    {
        dataField: 'model_number',
        text: 'Model Number',
        sort: true,
        hidden: true,
        headerStyle:  { 'white-space' : 'nowrap' }
    },
    {
        dataField: 'category.name',
        text: 'Category',
        sort: true,
  headerStyle:  { 'white-space' : 'nowrap' }
    },
    {
        dataField: 'status_label.name',
        text: 'Status',
        sort: false,
        hidden: true,
        headerStyle:  { 'white-space' : 'nowrap' }
  
  
    },
  
    {
        dataField: 'assigned_to.name',
        text: 'Assigned To',
        sort: true,
        headerStyle:  { 'white-space' : 'nowrap' }
     
    },
  
    {
        dataField: 'location.name',
        text: 'Location',
        sort: false,
        hidden: true,
        headerStyle:  { 'white-space' : 'nowrap' }
  
    },
    {
        dataField: 'rtd_location.name',
        text: 'Default Location',
        sort: false,
        hidden:true,
        headerStyle:  { 'white-space' : 'nowrap' }
  
    },
    {
        dataField: 'manufacturer.name',
        text: 'Manufacturer',
        sort: false,
  headerStyle:  { 'white-space' : 'nowrap' }
    },
    {
        dataField: 'supplier.name',
        text: 'Supplier',
        sort: false,
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
        hidden: true,
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
        dataField: 'warranty_months',
        text: 'Warranty',
        sort: false,
        hidden: true,
        headerStyle:  { 'white-space' : 'nowrap' }
    },
    {
        dataField: 'warranty_expires.date',
        text: 'Warranty Expires',
        sort: false,
        hidden: true,
        headerStyle:  { 'white-space' : 'nowrap' }
    },
    {
        dataField: 'notes',
        text: 'Notes',
        sort: false,
        hidden: true,
        headerStyle:  { 'white-space' : 'nowrap' }
    },
    {
        dataField: 'checkin_counter',
        text: 'Checkins',
        sort: false,
        hidden: true,
        headerStyle:  { 'white-space' : 'nowrap' }
    },
    {
        dataField: 'requests_counter',
        text: 'Requests',
        sort: false,
        hidden: true,
        headerStyle:  { 'white-space' : 'nowrap' }
    },
    {
        dataField: 'created_at.formatted',
        text: 'Created At',
        sort: false,
        hidden: true,
        headerStyle:  { 'white-space' : 'nowrap' }
    },
    {
        dataField: 'updated_at.formatted',
        text: 'Updated At',
        sort: false,
        hidden: true,
        headerStyle:  { 'white-space' : 'nowrap' }
    },
    {
        dataField: 'last_checkout.date',
        text: 'Checkout Date',
        sort: false,
        hidden: true,
        headerStyle:  { 'white-space' : 'nowrap' }
    },
    {
        dataField: 'expected_checkin.date',
        text: 'Checkin Date',
        sort: false,
        hidden: true,
        headerStyle:  { 'white-space' : 'nowrap' }
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
    //this.handleTableChange = this.handleTableChange.bind(this);
  }



  componentDidMount() {
    this.setState({ NotificationMessage: this.props.NotificationMessage });
    this.setState({ showNotifications: this.props.showNotifications });
    this.callServerData(this.state.page);
  }

 async callServerData() {
    const url = Domain + '/hardware?asset_id=' + this.props.ListAllDetails.id +
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
    if (sortOrder == null || sortOrder === 'undefined')
      sortOrder = this.state.sortOrder;

    await this.setState({ page: page, offset: offset, sizePerPage: sizePerPage, sortField: sortField, sortOrder: sortOrder });
    this.callServerData();
  }

  render() {
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
                                                                <label className="custom-toggle custom-table table-responsive" >

                                            <input type="checkbox" key={column.dataField} id={column.dataField} checked={column.toggle} aria-checked={column.toggle ? "true" : "false"}
                                                onChange={() =>this.myColumnToggle(column.dataField,columns)} />
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
        <div >
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
       
      )
    }
  }


export default Asset;