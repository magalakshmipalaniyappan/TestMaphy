import React from 'react';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';

import { withTranslation } from 'react-i18next'
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
            searchCompany
            searchStatus
            searchLocation
            searchFrom
            searchTo
            exportCSV
            columnToggle >
            {toolkitprops => [
                <div className="custom-table  custom-tablelayout"  >
                    <div class="col">
                        <div class="row">
                            <div class="btn-group" role="group" >
                                <CustomToggleList {...toolkitprops.columnToggleProps} />
                                {/* <div> <input type='text' placeholder="searchCompany" name="Category" onChange={myChangeHandler} />
                                    <input type='text' placeholder="searchStatus" name="Status" onChange={myChangeHandler} />
                                    <input type='text' placeholder="searchLocation" name="Location" onChange={myChangeHandler} />
                                    <input type='text' placeholder="searchFromDate" name="FromDate" onChange={myChangeHandler} />
                                    <input type='text' placeholder="ToDate" name="ToDate" onChange={myChangeHandler} />
                                    <button type='input' data-tooltip="true" title="Search" class="custombg-search" onClick={SearchBtnClick}><i class="fa fa-search"></i></button></div> */}
                                <ExportCSVButton {...toolkitprops.csvProps} class="btn-default custombg-search" title="Export CSV"> Generate<i class="fa fa-download"></i></ExportCSVButton>&nbsp;

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
var NotificationMessage = "";

class AssetReportMain extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: "en",
            ListAllData: [],
            message: '',

            ShowCreate: true,
            ShowCompany: true,
            ShowCategory: true,
            ShowLocation: true,
            showNotifications: false,
            offset: 0,
            sortField: 'id',
            sortOrder: 'desc',
            page: 1,
            sizePerPage: 10,
            searchText: '',

            company_id: '',
            status_id: '',
            location_id: '',
            FromDate: '',
            ToDate: '',
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
                text: 'Asset Tag',
                sort: true,
                hidden: true,
                headerStyle: { 'white-space': 'nowrap' }
            },
            {
                dataField: 'serial',
                text: 'Serial',
                sort: false,
                hidden: true,
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
                hidden: true,
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
                hidden: true,
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

            ]
        }
        this.handleTableChange = this.handleTableChange.bind(this);
        this.myChangeHandler = this.myChangeHandler.bind(this);
        // this.mySubmitHandler = this.mySubmitHandler.bind(this);

    };



    componentDidMount() {
        this.loadDropdownValues();
        this.callServerData(this.state.page);
    }
    async callServerData() {

        const url = Domain + '/hardware/totalassets?limit=' + this.state.sizePerPage +
            '&offset=' + this.state.offset +
            '&searchCompany=' + this.state.company_id +
            '&searchStatus=' + this.state.status_id +
            '&searchLocation=' + this.state.location_id +
            '&searchFrom=' + this.state.FromDate +
            '&searchTo=' + this.state.ToDate +

            '&sort=' + this.state.sortField +
            '&order=' + this.state.sortOrder + '';

        await axios.get(url)
            .then((response) => {
                this.setState({ ListAllData: response.data.rows });
                this.setState({ ListAllDataTotal: response.data.total });
            });
    }
    async loadDropdownValues() {
        const categoryurl = Domain + '/companies/selectList/?page=1';
        const locationsurl = Domain + '/locations/selectList?page=1';
        const statusurl = Domain + '/statuslabels/selectList?page=1';

        const [company_id, location_id, status_id] = await Promise.all([
            axios.get(categoryurl),
            axios.get(locationsurl),
            axios.get(statusurl)
        ]);

        this.setState({
            CompaniesData: company_id.data.items,
            locationData: location_id.data.items,
            statusData: status_id.data.items
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

    handleTableChange = async (type, { page, sizePerPage, sortField, sortOrder }) => {
        const offset = (page - 1) * sizePerPage;
        if (sortField == null || sortField === 'undefined')
            sortField = this.state.sortField;
        if (sortOrder == null || sortOrder === 'undefined')
            sortOrder = this.state.sortOrder;

        await this.setState({ page: page, offset: offset, sizePerPage: sizePerPage, sortField: sortField, sortOrder: sortOrder });
        this.callServerData();
    }
    // BackBtnClick = () => {
    //     NotificationMessage = '';
    //     this.setState({ showNotifications: false });
    //     const { ShowCreate } = this.state;
    //     this.setState({ ShowCreate: !ShowCreate });
    // }

    myChangeHandler = (event) => {

        this.setState({ [event.target.name]: event.target.value });
    }

    SearchBtnClick = () => {
        this.callServerData();
    }
    render() {
        const { t } = this.props

        console.log('this is', this)
        const { ShowCreate, showNotifications} = this.state;
        const { ListAllData, sizePerPage, page } = this.state;
        const { ExportCSVButton } = CSVExport;
        const CustomToggleList = ({ columns, onColumnToggle, toggles }) => (
            <div className="text-center">
                <div class="pull-left">
                    <div class="btn-group pull-left">
                        <button class=" btn-default dropdown-toggle customcolumns-reportcsv" data-toggle="dropdown" title="Columns"> Columns

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
        if (ShowCreate) {
            return (
                <div>

                    <div class="d-sm-flex align-items-center justify-content-between mb-4">
                        <h1 class="h3 mb-0 text-gray-800 custommain-title" name="createcompany" >Asset Reports<span></span></h1>
                        {/* <button onClick={this.BackBtnClick} name="back" className="btn btn-sm btn-primary shadow-sm custommain-title">
                            {t('company.back')}</button> */}
                    </div>
                    <div class="container">
                        <div class="row justify-content-center">

                            <div class="col-xl-10 col-lg-12 col-md-9">

                                <div class="card o-hidden border-0 shadow-lg my-5">
                                    <div class="card-body p-0">
                                        <div class="row">
                                            <div class="col-lg-6">
                                                <div class="p-4">
                                                    {(() => {

                                                        if (showNotifications) {
                                                            return (
                                                                <div class="row">
                                                                    <div class="col-md-12">
                                                                        <div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                                            <strong> {NotificationMessage}</strong>

                                                                        </div>


                                                                    </div>
                                                                </div>
                                                            )
                                                        }


                                                    })()}
                                                    <form class="user" >
                                                        <div class="form-group row">
                                                            <div class="col-sm-6 mb-3 mb-sm-0">
                                                                <label for="from_date" class=" control-label customlabel-textcolor">From Date</label>
                                                                <input type="Date" class="form-control "
                                                                    name="from_date" id="from_date" aria-describedby="emailHelp"
                                                                    placeholder="From Date" onChange={this.myChangeHandler} required />

                                                            </div>
                                                            <div class="col-sm-6 mb-3 mb-sm-0">
                                                                <label for="to_date" class=" control-label customlabel-textcolor">To Date</label>
                                                                <input type="Date" class="form-control "
                                                                    name="to_date" id="to_date" aria-describedby="emailHelp"
                                                                    placeholder="To date" onChange={this.myChangeHandler} required />

                                                            </div>
                                                        </div>
                                                        {/* {(() => {

                                                            if (ShowCompany) {
                                                                return (
                                                                    <div class="col-sm-6 mb-3 mb-sm-0">
                                                                        <select ref="company_id" class="form-control" placeholder="Search Company" name="company_id" id="company_id" onChange={this.myChangeHandler} >
                                                                            <option value="">{t('AssetsListall.company_id')}</option>
                                                                            {(() => {
                                                                                if (this.state.CompaniesData) {
                                                                                    return (
                                                                                        this.state.CompaniesData.map(obj => {
                                                                                            return (
                                                                                                <option
                                                                                                    key={obj.id}
                                                                                                    value={obj.id}
                                                                                                    onChange={this.myChangeHandler}
                                                                                                >
                                                                                                    {obj.text}
                                                                                                </option>
                                                                                            );
                                                                                        })
                                                                                    )
                                                                                }
                                                                            })()}
                                                                        </select>

                                                                    </div>
                                                                )
                                                            }


                                                        })()} */}
                                                        <div class="form-group row">
                                                            <div class="col-sm-6 mb-3 mb-sm-0">
                                                                <select ref="company_id" class="form-control" placeholder="Search Company" name="company_id" id="company_id" onChange={this.myChangeHandler} >
                                                                    <option value="">{t('AssetsListall.company_id')}</option>
                                                                    {(() => {
                                                                        if (this.state.CompaniesData) {
                                                                            return (
                                                                                this.state.CompaniesData.map(obj => {
                                                                                    return (
                                                                                        <option
                                                                                            key={obj.id}
                                                                                            value={obj.id}
                                                                                            onChange={this.myChangeHandler}
                                                                                        >
                                                                                            {obj.text}
                                                                                        </option>
                                                                                    );
                                                                                })
                                                                            )
                                                                        }
                                                                    })()}
                                                                </select>

                                                            </div>
                                                            <div class="col-sm-6 mb-3 mb-sm-0">
                                                                <select ref="status_id" placeholder="Search Status" class="form-control" onChange={this.myChangeHandler} id="status_id" name="status_id" required>
                                                                    <option value="">{t('AssetsListall.status_id')}</option>
                                                                    {(() => {
                                                                        if (this.state.statusData) {
                                                                            return (
                                                                                this.state.statusData.map(obj => {
                                                                                    return (
                                                                                        <option
                                                                                            key={obj.id}
                                                                                            value={obj.id}
                                                                                            onChange={this.myChangeHandler}
                                                                                        >
                                                                                            {obj.text}
                                                                                        </option>
                                                                                    );
                                                                                })
                                                                            )
                                                                        }
                                                                    })()}
                                                                </select>

                                                            </div></div>
                                                        <div class="form-group row">
                                                            <div class="col-sm-8 mb-3 mb-sm-0">
                                                                <select ref="location_id" placeholder="Search Location" class="form-control" onChange={this.myChangeHandler}
                                                                    id="location_id" name="location_id" required>
                                                                    <option value="">{t('AssetsListall.location_id')}</option>
                                                                    {(() => {
                                                                        if (this.state.locationData) {
                                                                            return (
                                                                                this.state.locationData.map(obj => {
                                                                                    return (
                                                                                        <option
                                                                                            key={obj.id}
                                                                                            value={obj.id}
                                                                                            onChange={this.myChangeHandler}
                                                                                        >
                                                                                            {obj.text}
                                                                                        </option>
                                                                                    );
                                                                                })
                                                                            )
                                                                        }
                                                                    })()}
                                                                </select>

                                                            </div>

                                                            <div>
                                                                <button type='input' title="Search" class="custombg-search" onClick={this.SearchBtnClick} >Search</button></div>
                                                        </div>
                                                    </form>

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>
                    </div>

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
};

export default withTranslation()(AssetReportMain);