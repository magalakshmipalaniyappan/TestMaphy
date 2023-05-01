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
        <div>
          <div class="col">
            <div class="row ">
              <ExportCSVButton {...toolkitprops.csvProps} class="btn custom-csv"><span>Export CSV</span><i class="fa fa-download"></i></ExportCSVButton>
              <CustomToggleList {...toolkitprops.columnToggleProps} />

            </div>
          </div>
          <div class="mb-0">
          <BootstrapTable
            {...toolkitprops.baseProps}
            remote={{ pagination: true, sort: true }}
            keyField="id"
            pagination={paginationFactory({ page, sizePerPage, totalSize })}
            onTableChange={onTableChange}
          />
        </div>
        </div>
      ]}
    </ToolkitProvider>
  </div>
);
class Firm extends Component {
  constructor(props) {
    super(props)
    this.state = {

      CompanyData: [],
      companyDetails: [],
      CompanyId: '',
      CompanyIdToUpdate: '',
      CompanyNametoUpdate: '',
      CompanyDataTotal: '',
      CompanyId_Details: '',

      ShowDetails: false,

      offset: 0,
      sortField: 'id',
      sortOrder: 'desc',
      page: 1,
      sizePerPage: 10,
      searchText: ''
    }
    console.log("token", localStorage.getItem('token'));
    this.handleTableChange = this.handleTableChange.bind(this);
    //this.handleTableChange = this.handleTableChange.bind(this);
  }



  componentDidMount() {
    //console.log("per missions",)
    console.log("cdm nmm sns", this.props.NotificationMessage, this.props.showNotifications)
    this.setState({ NotificationMessage: this.props.NotificationMessage });
    this.setState({ showNotifications: this.props.showNotifications });
    this.callServerData(this.state.page);
  }

  callServerData() {
    const url = Domain + '/register/firms?limit=' + this.state.sizePerPage +
      '&offset=' + this.state.offset +
      '&search=' + this.state.searchText +
      '&sort=' + this.state.sortField +
      '&order=' + this.state.sortOrder + '';
    
    axios.get(url)
      .then((response) => {
 
        this.setState({ CompanyData: response.data.rows });
        this.setState({ CompanyDataTotal: response.data.total });
      });
  }

  CreateBtnClick = () => {
    const { ShowCreate } = this.state;
    this.setState({ ShowCreate: !ShowCreate });
  }

  deleteCompany = async (id) => {

    const url = Domain + '/register/firms/' + id;
    
    await axios.delete(url)
      .then((response) => {
        this.setState({ showNotifications: true });
        this.setState({ NotificationMessage: response.data.message });
        this.setState({ CompanyData: this.state.CompanyData.filter(result => result.id !== id) });
      })

  }
  activateCompany = (id) => {
    const url = Domain+'/register/firms/'+id+'/activate' ;
    
    axios.put(url)
      .then((response) => {
        this.setState({ showNotifications: true });
        console.log("delete message" + response.data.message);
        this.setState({ NotificationMessage: response.data.message });
        this.setState({ CompanyData: this.state.CompanyData.filter(result => result.id !== id) });
      this.callServerData(this.state.page);
      })
  }
 deactivateCompany = (id) => {
    const url = Domain+'/register/firms/'+id+'/deactivate' ;
    
    axios.put(url)
      .then((response) => {
        this.setState({ showNotifications: true });
        console.log("delete message" + response.data.message);
        this.setState({ NotificationMessage: response.data.message });
        this.setState({ CompanyData: this.state.CompanyData.filter(result => result.id !== id) });
      this.callServerData(this.state.page);
      })
  }
  UpdateCompany = (row) => {
    console.log("ShowUpdate" + row.id)
    this.setState({ GroupDetails: row });
    const { ShowUpdate } = this.state;
    this.setState({ ShowUpdate: !ShowUpdate });
    console.log("companyDetails" + this.state.companyDetails)
  }
  CompanyDetails = (row) => {
    console.log("row" + row.id)
    this.setState({ companyDetails: row });
    const { ShowDetails } = this.state;
    this.setState({ ShowDetails: !ShowDetails });
    console.log("companyDetails" + this.state.companyDetails)
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
    console.log("offset v", offset)
    if (sortField === null || sortField === 'undefined')
      sortField = this.state.sortField;
    if (sortOrder === null || sortOrder === 'undefined')
      sortOrder = this.state.sortOrder;

    await this.setState({ page: page, offset: offset, sizePerPage: sizePerPage, sortField: sortField, sortOrder: sortOrder });
    this.callServerData();
  }

  render() {
   // const { CompanyData } = this.state;
    const { CompanyData, sizePerPage, page } = this.state;
    const { ExportCSVButton } = CSVExport;
    const CustomToggleList = ({ columns, onColumnToggle, toggles }) => (
      <div className="text-center">
        <div class="pull-left">
          <div class="btn-group pull-left">
            <button class="btn btn-default dropdown-toggle custom-csv" data-toggle="dropdown">Columns
  
            </button>
            <ul class="dropdown-menu">

              {columns
                .map(column => ({
                  ...column,
                  toggle: toggles[column.dataField]
                }))
                .map((column, index) => (
                  <React.Fragment >
                    <br />
                    <label className="custom-toggle custom-table " >

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
    const FirmFormatter = (cell, row, name, rowIndex) => {
        if (row.activated === false) {
          console.log("true")
          return (
            <div>
   <button name="btnactivate" class="btn btn-sm custombg-activate" onClick={() => { if (window.confirm('Are you sure you wish to activate this item?')) this.activateCompany(row.id) }}>Activate</button>
            </div>
          );
        }
        else {
          console.log("false")
          return (
            <div> 
    <button name="btndeactivate" class="btn btn-sm custombg-activate" onClick={() => { if (window.confirm('Are you sure you wish to deactivate this item?')) this.deactivateCompany(row.id) }}>Deactivate</button> 
  
  
            </div>
          );
        }
      };

    const columns = [{
      dataField: 'id',
      text: 'ID',
      sort: true,
      headerStyle:  { 'white-space' : 'nowrap' }
     
    }, 
    {
      dataField: 'name',
      text: 'Company Name',
      sort: true,
      headerStyle:  { 'white-space' : 'nowrap' }
    },
    {
        dataField: 'created_at.formatted',
        text: 'Created At',
        sort: false,
        headerStyle:  { 'white-space' : 'nowrap' }
      },
      {
        dataField: 'updated_at.formatted',
        text: 'Updated At ',
        sort: false,
        headerStyle:  { 'white-space' : 'nowrap' }
      },
    {
         dataField: "Actions",
          text: "Actions", 
          sort: false, 
          hidden: false,
           formatter: FirmFormatter ,
           headerStyle:  { 'white-space' : 'nowrap' }
        },
        // {
        //     dataField: "Actions",
        //      text: "Delete", 
        //      sort: false, 
        //      hidden: false,
        //       formatter: DeleteFormatter ,
      //  headerStyle:  { 'white-space' : 'nowrap' }
        //    }
    ];

  return(
       <div>
       <h1 class="h3 mb-0 text-gray-800">Firm Management</h1> 
            <td>
              <div>
                <input type='text' placeholder="search" class="custombg-linksearchbar" name="searchText" onChange={this.myChangeHandler} />
                <button type='input' class="custombg-linksearch" onClick={this.SearchBtnClick}>Search</button>

                <RemoteAll
                  data={CompanyData}
                  page={page}
                  sizePerPage={sizePerPage}
                  totalSize={this.state.CompanyDataTotal}
                  columns={columns}
                  CSVExport={CSVExport}
                  ExportCSVButton={ExportCSVButton}
                  CustomToggleList={CustomToggleList}
                  onTableChange={this.handleTableChange}
                />
              </div></td>
              </div>
               )
           
}
  }


export default Firm;