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
      keyField="id"
      data={data}
      columns={columns}
      defaultSorted={defaultSorted}
      noDataIndication={ indication }
      search
      exportCSV
      columnToggle >
      {toolkitprops => [
        <div className="custom-table customasset-tablelayout">
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
class CategoriesAsset extends Component {
  constructor(props) {
    super(props)
    this.state = {
      TableData: [],
      TableDataTotal: 0,
      columns : [{
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
        text: 'Asset tag',
        sort: false,
         headerStyle:  { 'white-space' : 'nowrap' }
  
      },
      {
        dataField: 'serial',
        text: 'Serial',
        sort: false,
         headerStyle:  { 'white-space' : 'nowrap' }
  
      },
      // {
      //   dataField: 'model.name',
      //   text: 'Model',
      //   sort: true
  
      // },
      // {
      //   dataField: 'model_number',
      //   text: 'Model Number',
      //   sort: true,
      //   hidden:true 
      // },
      {
        dataField: 'category.name',
        text: 'Category',
        sort: false,
         headerStyle:  { 'white-space' : 'nowrap' }
  
      },
      {
        dataField: 'status_label.name',
        text: 'Status',
        sort: false,
         headerStyle:  { 'white-space' : 'nowrap' }
  
  
      },
      {
        dataField: 'assigned_to.name',
        text: 'Checked Out to',
        sort: false,
         headerStyle:  { 'white-space' : 'nowrap' }
      },
      {
        dataField: 'assigned_to.employee_num',
        text: 'Employee No',
        sort: false,
        hidden: true,
         headerStyle:  { 'white-space' : 'nowrap' }
      },
      {
        dataField: 'location.name',
        text: 'Location',
        sort: false,
        hidden:true ,
         headerStyle:  { 'white-space' : 'nowrap' }
      },
  
      {
        dataField: 'rtd_location.name',
        text: 'Default Location',
        sort: false,
         headerStyle:  { 'white-space' : 'nowrap' }
  
      },
      {
        dataField: 'manufacturer.name',
        text: 'Manufacturer',
        sort: false,
        hidden: true,
         headerStyle:  { 'white-space' : 'nowrap' }
  
      },
      {
        dataField: 'supplier.name',
        text: 'Supplier',
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
        dataField: 'order_number',
        text: 'Order Number',
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
        dataField: 'checkout_counter',
        text: 'Checkouts',
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
        dataField: 'requestable',
        text: 'Requests',
        sort: false,
        hidden: true,
         headerStyle:  { 'white-space' : 'nowrap' }
      },
      {
        dataField: 'created_at.formatted',
        text: 'Created at',
        sort: false,
        hidden: true,
         headerStyle:  { 'white-space' : 'nowrap' }
      },
      {
        dataField: 'updated_at.formatted',
        text: 'Updated at',
        sort: false,
        hidden: true,
         headerStyle:  { 'white-space' : 'nowrap' }
      },
      {
        dataField: 'last_checkout.formatted',
        text: 'Checkout Date',
        sort: false,
        hidden: true,
         headerStyle:  { 'white-space' : 'nowrap' }
      },
      {
        dataField: 'expected_checkin',
        text: ' Checkin Date',
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
  }
  componentDidMount() {

    this.callServerData(this.state.page);
  }
  callServerData() {
    const url = Domain + '/hardware?category_id=' + this.props.CategoriesDatatoUpdate.id +
      '&limit=' + this.state.sizePerPage +

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

    const { TableData, sizePerPage, page } = this.state;

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
                  <li>
                    <React.Fragment >

                      <label className="custom-toggle custom-table table-responsive" >
                        <input type="checkbox" key={column.dataField} id={column.dataField} checked={column.toggle} aria-checked={column.toggle ? "true" : "false"}
                          onChange={() => this.myColumnToggle(column.dataField,columns)} />
                         &nbsp;
                      {column.text}
                      </label>
                    </React.Fragment>
                  </li>
                ))}

            </ul>
          </div>
        </div></div>

    );



    return (
      <div>

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

export default CategoriesAsset;