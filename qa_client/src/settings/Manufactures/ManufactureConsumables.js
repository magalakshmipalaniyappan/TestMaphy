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
                     indication,
                     ExportCSVButton,
                     CustomToggleList }) => (
  <div>
    <ToolkitProvider
      keyField="item_id"
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
class ManufactureConsumables extends Component {
  constructor(props) {
    super(props)
    this.state = {
      TableData: [],
      TableDataTotal: 0,
       offset: 0,
      sortField: 'id',
      sortOrder: 'desc',
      page: 1,
      sizePerPage: 10,
      searchText: '',
       columns :[{
      dataField: 'id',
      text: 'ID',
      sort: true,
      hidden:true,
      headerStyle:  { 'white-space' : 'nowrap' }
    },
    {
      dataField: 'company.name',
      text: 'Company',
      sort: true,
      hidden:true,
      headerStyle:  { 'white-space' : 'nowrap' }
    },
    {
      dataField: 'name',
      text: 'Consumable Name',
      sort: true,
      headerStyle:  { 'white-space' : 'nowrap' }
    },
    {
      dataField: 'category.name',
      text: 'Category',
      sort: true,
      headerStyle:  { 'white-space' : 'nowrap' }
    },
    {
      dataField: 'model_number',
      text: 'Model',
      sort: false,
      hidden:true,
      headerStyle:  { 'white-space' : 'nowrap' }
    },
    {
      dataField: 'item_no',
      text: 'Item No',
      sort: false,
      hidden:true,
      headerStyle:  { 'white-space' : 'nowrap' }
    },
    {
      dataField: 'qty',
      text: 'Total',
      sort: true,
      headerStyle:  { 'white-space' : 'nowrap' }
    },
    {
      dataField: 'remaining',
      text: 'Remaining',
      sort: true,
      headerStyle:  { 'white-space' : 'nowrap' }
    },
    {
      dataField: 'min_amt',
      text: 'Min.QTY',
      sort: true,
      headerStyle:  { 'white-space' : 'nowrap' }
    },
    {
      dataField: 'location.name',
      text: 'Location',
      sort: false,
      headerStyle:  { 'white-space' : 'nowrap' }
    },
    {
      dataField: 'manufacturer.name',
      text: 'Manufacturer',
      sort: false,
      hidden:true,
      headerStyle:  { 'white-space' : 'nowrap' }
    },
    {
      dataField: 'order_number',
      text: 'Order Number',
      sort: true,
      headerStyle:  { 'white-space' : 'nowrap' }
    },
    
    {
      dataField: 'purchase_date.formatted',
      text: 'Purchase Date',
      sort: false,
      headerStyle:  { 'white-space' : 'nowrap' }
    },
   
    {
      dataField: 'purchase_cost',
      text: 'Purchase Cost',
      sort: false,
      headerStyle:  { 'white-space' : 'nowrap' }
    },
    
   
       ]

    }
    this.handleTableChange = this.handleTableChange.bind(this);
  }
  componentDidMount() {
   
    this.callServerData(this.state.page);
  }
  callServerData() {
     const url = Domain +'/consumables?manufacturer_id=' + this.props.ManufactureDetails.id +
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
  render() {
   
    const {TableData, sizePerPage, page} = this.state;

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
  }

export default ManufactureConsumables;

