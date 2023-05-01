import React, { Component } from 'react';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';

import ContactUsUpdate from './ContactUsUpdate';
const headerSortingStyle = { backgroundColor: '#c8e6c9' };

const Domain = process.env.REACT_APP_URL;
const RemoteAll = ({ data,
  page,
  sizePerPage,
  defaultSorted,
  totalSize,
  onTableChange,
  columns,
  SearchBtnClick,
  myChangeHandler,
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
        <div className="custom-table  custom-tablelayout">
          <div class="col">
            <div class="row">
              <ExportCSVButton {...toolkitprops.csvProps} class="btn-default custom-csv "><span>Export CSV</span><i class="fa fa-download"></i></ExportCSVButton>&nbsp;
              <CustomToggleList {...toolkitprops.columnToggleProps} />&nbsp;
              <input type='text' placeholder="search" name="searchText" class="customtext-search" onChange={myChangeHandler} />
              <button type='input' class=" custombg-search" onClick={SearchBtnClick}>Search</button>

              <BootstrapTable
                {...toolkitprops.baseProps}
                remote={{ pagination: true, sort: true }}
                keyField="id"
                pagination={paginationFactory({ page, sizePerPage, totalSize })}
                onTableChange={onTableChange}
                data={data} columns={columns} noDataIndication="No Data Available"
                wrapperClasses="table-responsive"
              />
            </div>
          </div>

        </div>
      ]}
    </ToolkitProvider>
  </div>
);
class contactusMain extends Component {
  constructor(props) {
    super(props)
    this.state = {

      ContactData: [],
      ContactId: '',
      ContactDataTotal: '',
      
      ShowUpdate: false,
      NotificationMessage: this.props.NotificationMessage,
      showNotifications: this.props.showNotifications,
     
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
        headerSortingStyle
      },
      {
        dataField: 'email',
        text: 'Email',
        sort: true,
      },
      {
        dataField: 'customer_description',
        text: 'Customer Description',
        sort: false,
      },
      {
        dataField: 'admin_description',
        text: 'Admin Description',
        sort: false,
        headerSortingStyle
      },
      {
        dataField: 'status',
        text: 'Status',
        sort: false,
      },
   
      {
        dataField: "Actions",
        text: "Actions",
        sort: false,
        hidden: false,
        formatter: this.EditDeleteFormatter
      }

      ]
    }
    console.log("token", localStorage.getItem('token'));
    this.handleTableChange = this.handleTableChange.bind(this);
    //this.handleTableChange = this.handleTableChange.bind(this);
  }


  columnToggle1 = (column) => {
    let columnToggle = this.state[column];
    this.setState({ [column]: !columnToggle });
  };

  componentDidMount() {
    this.setState({ NotificationMessage: this.props.NotificationMessage });
    this.setState({ showNotifications: this.props.showNotifications });
    this.callServerData(this.state.page);
  }

  callServerData() {
    const url = Domain + '/contactus?limit=' + this.state.sizePerPage +
      '&offset=' + this.state.offset +
      '&search=' + this.state.searchText +
      '&sort=' + this.state.sortField +
      '&order=' + this.state.sortOrder + '';
    
    axios.get(url)
      .then((response) => {
 
        this.setState({ ContactData: response.data.rows });
        this.setState({ ContactDataTotal: response.data.total });
      });


  }
  EditDeleteFormatter = (cell, row, rowIndex) => {
   
    if(row.status ==="open")
    {
        return (  <button name="btnupdate" class="btn btn-secondary" onClick={() => { if (window.confirm('Are you sure you wish to update these items?')) this.replyCustomerFeedBack(row) }}>Reply</button>)
    }
    else
    {
        return (  <button name="btnupdate" class="btn btn-secondary" onClick={() => { if (window.confirm('Are you sure you wish to update these items?')) this.replyCustomerFeedBack(row) }}>View</button>)
    }


};

  
  CreateBtnClick = () => {
    const { ShowCreate } = this.state;
    this.setState({ ShowCreate: !ShowCreate });
  }

//   deleteContactUs= async (id) => {

//     const url = Domain + '/contactus/' + id;
//     
//     await axios.delete(url)
//       .then((response) => {
//         this.setState({ showNotifications: true });
//         console.log("delete message" + response.data.message);
//         this.setState({ NotificationMessage: response.data.message });

//         this.callServerData(this.state.page);

//       })

//   }

replyCustomerFeedBack = (row) => {

    this.setState({ customerFeedback: row });
    const { ShowUpdate } = this.state;
    this.setState({ ShowUpdate: !ShowUpdate });
  }
 
  myChangeHandler = (event) => {

    this.setState({ [event.target.name]: event.target.value });
  }

  SearchBtnClick = () => {
    this.callServerData();
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
  handleTableChange = async (type, { page, sizePerPage, sortField, sortOrder }) => {
    const offset = (page - 1) * sizePerPage;
    console.log("offset v", offset)
    if (sortField == null || sortField === 'undefined')
      sortField = this.state.sortField;
    if (sortOrder == null || sortOrder === 'undefined')
      sortOrder = this.state.sortOrder;

    await this.setState({ page: page, offset: offset, sizePerPage: sizePerPage, sortField: sortField, sortOrder: sortOrder });
    this.callServerData();
  }

  render() {
    const {  ShowUpdate} = this.state;
    const { ContactData, sizePerPage, page } = this.state;
    const { ExportCSVButton } = CSVExport;
    const CustomToggleList = ({ columns, onColumnToggle, toggles }) => (
      <div className="text-center">
        <div class="pull-left ">
          <div class="btn-group pull-left ">
            <button class=" btn-default dropdown-toggle custom-csv" data-toggle="dropdown">Columns

            </button>
            <ul class="dropdown-menu customcolumn-scroll" >

              {columns
                .map(column => ({
                  ...column,
                  toggle: toggles[column.dataField]
                }))
                .map((column, index) => (
                  <React.Fragment >

                    <label className="custom-toggle custom-table  table-responsive" >

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
   
     if (ShowUpdate) {
      return (
<ContactUsUpdate customerFeedback={this.state.customerFeedback}></ContactUsUpdate>   
   )
    }
  
    else {
      return (
        <div>
          <div>
            <div class="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 class="h3 mb-0 text-gray-800">Contact Us </h1>
              <div class="row mb-0">
                <div class="col">
                </div>
              </div>
              <div class="row mb-0">
                <div class="col">
                  {/* <button onClick={this.CreateBtnClick} className="btn btn-sm btn-primary shadow-sm">
                   Contact Us</button> */}
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
            <td>
              <div >
                <RemoteAll
                  data={ContactData}
                  page={page}
                  sizePerPage={sizePerPage}
                  totalSize={this.state.ContactDataTotal}
                  columns={this.state.columns}
                  CSVExport={CSVExport}
                  ExportCSVButton={ExportCSVButton}
                  CustomToggleList={CustomToggleList}
                  onTableChange={this.handleTableChange}
                  SearchBtnClick={this.SearchBtnClick}
                  myChangeHandler={this.myChangeHandler}
                />
              </div></td>

          </div>
        </div>
      )
    }
  }
}

export default contactusMain;

