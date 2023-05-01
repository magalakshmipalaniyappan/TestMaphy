
import React, { Component } from 'react';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';

import PeopleUpdate from '../people/PeopleUpdate';


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
        <div >
        <div class="col">
          <div class="row">
           <div class="btn-group" role="group" >
               <CustomToggleList {...toolkitprops.columnToggleProps} />
             <div> <input type='text' placeholder="search" name="searchText"   onChange={myChangeHandler} />
                <button type='input'  data-tooltip="true" title="Search" class="custombg-search" onClick={SearchBtnClick}><i class="fa fa-search"></i></button></div>
                <ExportCSVButton {...toolkitprops.csvProps} class="btn-default custombg-search" data-tooltip="true" title="Export CSV"><i class="fa fa-download"></i></ExportCSVButton>&nbsp;
             </div>
                    </div>                  <BootstrapTable
          {...toolkitprops.baseProps}
          remote={{ pagination: true, sort: true }}
          keyField="item_id"
          pagination={paginationFactory({ page, sizePerPage, totalSize })}
          onTableChange={onTableChange}
        wrapperClasses="table-responsive table table-striped "
        />
  </div>
       
      </div>
      ]}
    </ToolkitProvider>
  </div>
);
class CompanyPeople extends Component {
  constructor(props) {
    super(props)
    this.state = {

      PeopleData: [],
      PeopleId: '',
      PeopleIdToUpdate: '',
      PeopleNametoUpdate: '',
      PeopleDataTotal: '',
      //CompanyId_Details: '',

      ShowCreate: false,
      ShowUpdate: false,
      //ShowDetails: false,
      NotificationMessage: '',
      showNotifications: false,

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

  callServerData() {
    const url = Domain + '/users?company_id=' + this.props.companyDetails.id +
    '&limit=' + this.state.sizePerPage +
      '&offset=' + this.state.offset +
      '&search=' + this.state.searchText +
      '&sort=' + this.state.sortField +
      '&order=' + this.state.sortOrder + '';

    
    axios.get(url)
      .then((response) => {
 
        this.setState({ PeopleData: response.data.rows });
        this.setState({ PeopleDataTotal: response.data.total });
      });
  }

  CreateBtnClick = () => {
    const { ShowCreate } = this.state;
    this.setState({ ShowCreate: !ShowCreate });
  }

  deletePeople = (id) => {

    const url = Domain + '/users/' + id;
    
    axios.delete(url)
      .then((response) => {
        this.setState({ showNotifications: true });
        console.log("delete message" + response.data.messages);
        this.setState({ NotificationMessage: response.data.messages });
        this.setState({ PeopleData: this.state.PeopleData.filter(result => result.id !== id) });
      })
  }

  UpdatePeople = (peopleid, name) => {
    this.setState({ IdToUpdate: peopleid, PeopletoUpdate: name });
    const { ShowUpdate } = this.state;
    this.setState({ ShowUpdate: !ShowUpdate });
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
    const { ShowCreate, ShowDetails, ShowUpdate, showNotifications } = this.state;
    const { PeopleData, sizePerPage, page } = this.state;
    const { ExportCSVButton } = CSVExport;
    const CustomToggleList = ({ columns, onColumnToggle, toggles }) => (
      <div className="text-center">
        <div class="pull-left">
                <div class="btn-group pull-left">
     <button class=" btn-default dropdown-toggle" data-toggle="dropdown">Columns
        
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

    const EditDeleteFormatter = (cell, row, rowIndex) => {
      return (
        <div>
          <button name="btnupdate" onClick={() => { if (window.confirm('Are you sure you wish to update these items?')) this.UpdatePeople(row.id, row.name) }}>Edit</button>
                 &nbsp;
          <button name="btndelete" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.deletePeople(row.id) }}>Delete</button>
        </div>
      );
    };


      const columns = [{
      dataField: 'id',
      text: 'ID',
      sort: true,
       headerStyle:  { 'white-space' : 'nowrap' }
    },
  
  
    {
      dataField: 'name',
      text: 'Name',
      sort: true,
       headerStyle:  { 'white-space' : 'nowrap' }
    },
    {
      dataField: 'jobtitle',
      text: 'Title',
      sort: true,
       headerStyle:  { 'white-space' : 'nowrap' }
    },
    {
      dataField: 'email',
      text: 'Email',
      sort: true,
       headerStyle:  { 'white-space' : 'nowrap' }
    },
    {
      dataField: 'phone',
      text: 'Phone No',
      sort: true,
       headerStyle:  { 'white-space' : 'nowrap' }
    },
    {
      dataField: 'address',
      text: 'Address',
      sort: true,
       headerStyle:  { 'white-space' : 'nowrap' }
    },
    {
      dataField: 'city',
      text: 'City',
      sort: true,
       headerStyle:  { 'white-space' : 'nowrap' }
    },
    {
      dataField: 'state',
      text: 'State',
      sort: true,
       headerStyle:  { 'white-space' : 'nowrap' }
    },
    {
      dataField: 'country',
      text: 'Country',
      sort: true,
       headerStyle:  { 'white-space' : 'nowrap' }
    },
    {
      dataField: 'zip',
      text: 'Zip',
      sort: true,
       headerStyle:  { 'white-space' : 'nowrap' }
    },
    {
      dataField: 'username',
      text: 'Username',
      sort: true,
       headerStyle:  { 'white-space' : 'nowrap' }
    },
    

   
    {
      dataField: 'department.name',
      text: 'Department',
      sort: true,
       headerStyle:  { 'white-space' : 'nowrap' }
    },
    
    {
      dataField: 'location.name',
      text: 'Location',
      sort: true,
       headerStyle:  { 'white-space' : 'nowrap' }
    },
    {
      dataField: 'manager.name',
      text: 'Manager',
      sort: true,
       headerStyle:  { 'white-space' : 'nowrap' }
    },
    {
      dataField: 'assets_count',
      text: 'Assets',
      sort: true,
       headerStyle:  { 'white-space' : 'nowrap' }
    },
    {
      dataField: 'licenses_count',
      text: 'Licenses',
      sort: true,
       headerStyle:  { 'white-space' : 'nowrap' }
    },
    {
      dataField: 'consumables_count',
      text: 'Consumables',
      sort: true,
       headerStyle:  { 'white-space' : 'nowrap' }
    },
   
    {
      dataField: 'notes',
      text: 'Notes',
      sort: true,
       headerStyle:  { 'white-space' : 'nowrap' }
    },

    {
      dataField: 'created_at.formatted',
      text: 'Created At',
      sort: true,
       headerStyle:  { 'white-space' : 'nowrap' }
    },
 
    { dataField: "Actions", text: "Actions", sort: false, hidden: false, formatter: EditDeleteFormatter }
    
  ];


    // if (ShowCreate) {
    //   return (
    //     <PeopleCreate />
    //   )
    // }
  if (ShowUpdate) {
      return (
        <PeopleUpdate PeopleId={this.state.IdToUpdate} PeopleName={this.state.PeopletoUpdate} />
      )
    }
    // else if (ShowDetails) {
    //   return (
    //     <CompaniesDetails CompanyId={this.state.ComapanyId_Details}></CompaniesDetails>
    //   )
    // }
    else {
      return (
        <div>

          <div>
        
               <div >
   
              <RemoteAll
                data={PeopleData}
                page={page}
                sizePerPage={sizePerPage}
                totalSize={this.state.PeopleDataTotal}
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

export default CompanyPeople;