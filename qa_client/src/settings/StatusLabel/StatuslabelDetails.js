import React, { Component } from 'react';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
import StatuslabelMain from './StatuslabelMain';
import { withTranslation } from 'react-i18next';
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
            noDataIndication={indication}
            search
            exportCSV
            columnToggle >
            {toolkitprops => [
                <div class="custom-table">
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
class StatuslabelDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {

            AllDeployableData: [],
            AllDeployableId: '',
            AllDeployableIdToUpdate: '',
            AllDeployableNametoUpdate: '',
            AllDeployableDataTotal: '',

            ShowMain:false,
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
                sort: true,
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
                hidden: true,
                headerStyle: { 'white-space': 'nowrap' }

            },
            {
                dataField: 'serial',
                text: 'Serial',
                sort: true,
                hidden: true,
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
                dataField: 'location.name',
                text: 'Location',
                sort: false,
                hidden: true,
                headerStyle: { 'white-space': 'nowrap' }

            },
            {
                dataField: 'rtd_location.name',
                text: 'Default Location',
                sort: false,
                hidden: true,
                headerStyle: { 'white-space': 'nowrap' }

            },
            {
                dataField: 'manufacturer.name',
                text: 'Manufacturer',
                sort: false,
                headerStyle: { 'white-space': 'nowrap' }
            },
            {
                dataField: 'supplier.name',
                text: 'Supplier',
                sort: false,
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
                dataField: 'warranty_months',
                text: 'Warranty',
                sort: false,
                hidden: true,
                headerStyle: { 'white-space': 'nowrap' }
            },
            {
                dataField: 'warranty_expires.date',
                text: 'Warranty Expires',
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
                dataField: 'requests_counter',
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
            {
                dataField: 'last_checkout.date',
                text: 'Checkout Date',
                sort: false,
                hidden: true,
                headerStyle: { 'white-space': 'nowrap' }
            },
            {
                dataField: 'expected_checkin',
                text: 'Checkin Date',
                sort: false,
                hidden: true,
                headerStyle: { 'white-space': 'nowrap' }
            }
            ]

        }

        this.handleTableChange = this.handleTableChange.bind(this);


    }

    componentDidMount() {
        this.setState({ NotificationMessage: this.props.NotificationMessage });
        this.setState({ showNotifications: this.props.showNotifications });
        this.callServerData(this.state.page);
    }

    callServerData() {

        const url = Domain + '/hardware?status_id=' + this.props.StatuslabelDetails.id +
            '&limit=' + this.state.sizePerPage +
            '&offset=' + this.state.offset +
            '&search=' + this.state.searchText +
            '&sort=' + this.state.sortField +
            '&order=' + this.state.sortOrder + '';
        axios.get(url)
            .then((response) => {
                this.setState({ AllDeployableData: response.data.rows });
                this.setState({ AllDeployableDataTotal: response.data.total });
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

    BackBtnClick = () => {
      this.setState({ ShowMain: true })
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
        if (sortOrder == null || sortOrder === 'undefined')
            sortOrder = this.state.sortOrder;

        await this.setState({ page: page, offset: offset, sizePerPage: sizePerPage, sortField: sortField, sortOrder: sortOrder });
        this.callServerData();
    }

    render() {
        const { AllDeployableData, sizePerPage, page,ShowMain } = this.state;
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
          if(ShowMain)
          {
            return (<StatuslabelMain />)
          }
          else{
            return(
            <div>
          <div>

             <div class="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 class="h3 mb-0 text-gray-800 custommain-title">{this.props.StatuslabelDetails.name}</h1>
             <div class="pull-left">
                 <div class="btn-group pull-left">
                  <button onClick={this.BackBtnClick} className=" btn btn-sm btn-primary shadow-sm custommain-title">
                    {t('button.back')}</button>

                 </div> 
             </div>

             </div>
           </div>
                <div>
                    <div >

                        <RemoteAll
                            data={AllDeployableData}
                            page={page}
                            sizePerPage={sizePerPage}
                            totalSize={this.state.AllDeployableDataTotal}
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


export default withTranslation()(StatuslabelDetails);
// import React, { Component } from 'react';
// import StatusUnDeployable from './StatusUnDeployable';
// import StatusDeployed from './StatusDeployed';
// import StatusDeployable from './StatusDeployable';
// import { withTranslation } from 'react-i18next'

// import StatuslabelMain from './StatuslabelMain';


// class StatuslabelDetails extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       value: "en",
//       StatuslabelDetails: '',
//       ShowUnDeployable: false,
//       ShowMain: false,
//       ShowDeployed: false,
//       ShowDeployable: false
//     }
//   }
//   componentDidMount() {
//     const type = this.props.StatuslabelDetails.type;
//     if (type == "undeployed") {
//       this.setState({ ShowUnDeployable: true });
//     }

//     else if (type == "deployed") {
//       this.setState({ ShowDeployed: true });
//     }
//     else if (type == "deployable") {
//       this.setState({ ShowDeployable: true });
//     }

//     this.setState({ StatuslabelDetails: this.props.StatuslabelDetails });

//   }


//   onLanguageHandle = (event) => {
//     let newLang = event.target.value;
//     this.setState({ value: newLang })
//     this.props.i18n.changeLanguage(newLang)
//   }

//   render() {
//     const { ShowUnDeployable, ShowDeployed, ShowDeployable } = this.state;
//     const { t } = this.props;

//     if (ShowUnDeployable) {
//       return (

//         <div>
//           <div>

//             <div class="d-sm-flex align-items-center justify-content-between mb-4">
//               <h1 class="h3 mb-0 text-gray-800 custommain-title">{this.props.StatuslabelDetails.name}</h1>
//               <div class="pull-left">

//                 <button onClick={this.BackBtnClick} className=" btn btn-sm btn-primary shadow-sm custommain-title">
//                   {t('button.back')}</button>


//               </div>

//             </div>
//           </div>

//           <StatusUnDeployable StatuslabelDetails={this.props.StatuslabelDetails} />

//         </div>
//       )

//     }
//     else if (ShowDeployed)

//       return (
//         <div>
//           <div>

//             <div class="d-sm-flex align-items-center justify-content-between mb-4">
//              <h1 class="h3 mb-0 text-gray-800 custommain-title">{this.props.StatuslabelDetails.name}</h1>
             
//               <div class="pull-left">
//                 <div class="btn-group pull-left">
//                   <button onClick={this.BackBtnClick} className=" btn btn-sm btn-primary shadow-sm custommain-title">
//                     {t('button.back')}</button>

//                 </div>
//               </div>

//             </div>
//           </div>
//           <StatusDeployed StatuslabelDetails={this.props.StatuslabelDetails} /> </div>
//       )

//     else if (ShowDeployable)

//       return (
//         <div>
//           <div>

//             <div class="d-sm-flex align-items-center justify-content-between mb-4">
//               <h1 class="h3 mb-0 text-gray-800 custommain-title">{this.props.StatuslabelDetails.name}</h1>
             
//               <div class="pull-left">
//                 <div class="btn-group pull-left">
//                   <button onClick={this.BackBtnClick} className=" btn btn-sm btn-primary shadow-sm custommain-title" >
//                     {t('button.back')}</button>

//                 </div>
//               </div>

//             </div>
//           </div>
//           <StatusDeployable StatuslabelDetails={this.props.StatuslabelDetails} />
//         </div>
//       )



//     else
//       return (<StatuslabelMain />)
//   }

// }
// export default withTranslation()(StatuslabelDetails);

