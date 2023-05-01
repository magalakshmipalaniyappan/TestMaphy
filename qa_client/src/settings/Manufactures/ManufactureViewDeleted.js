import React, { Component } from 'react';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
import ManufactureCreate from './ManufactureCreate';
import ManufactureUpdate from './ManufactureUpdate';
import ManufactureDetails from './ManufactureDetails';
import { withTranslation } from 'react-i18next'
import ManufactureMain from './ManufactureMain';
const Domain = process.env.REACT_APP_URL;
const RemoteAll = ({ data,
    page,
    sizePerPage,
    defaultSorted,
    totalSize,
    onTableChange,
    myChangeHandler,
    SearchBtnClick,
    columns,
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
class ManufactureDelete extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: "en",
            ManufactureData: [],
            ManufactureId: '',
            ManufacturetoUpdate: '',


            Manufacture_Details: '',
            ManufactureDataTotal: '',

            ShowCreate: false,
            ShowUpdate: false,
            ShowDetails: false,
            ShowMain: false,
            NotificationMessage: '',
            showNotifications: false,
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
            }, {
                dataField: 'name',
                text: 'Manufacture Name',
                sort: true,
                headerStyle: { 'white-space': 'nowrap' }
            },
            {
                dataField: 'url',
                text: 'Url',
                sort: true,
                headerStyle: { 'white-space': 'nowrap' }

            },
            {
                dataField: 'support_url',
                text: 'Support Url',
                sort: true,
                hidden: true,
                headerStyle: { 'white-space': 'nowrap' }

            },
            {
                dataField: 'support_phone',
                text: 'Support Phone',
                sort: true,
                headerStyle: { 'white-space': 'nowrap' }

            },
            {
                dataField: 'support_email',
                text: 'Support Email',
                sort: true,
                hidden: true,
                headerStyle: { 'white-space': 'nowrap' }

            },

            {
                dataField: "Actions",
                text: "Actions",
                sort: false,
                hidden: false,
                formatter: this.EditDeleteFormatter
            }]


        }
        this.handleTableChange = this.handleTableChange.bind(this);
    }
    componentDidMount() {
        this.setState({ NotificationMessage: this.props.NotificationMessage });
        this.setState({ showNotifications: this.props.showNotifications });
        this.callServerData(this.state.page);
    }
    callServerData() {
        const url = Domain + '/manufacturers?deleted=true' + this.state.id +
            ' &limit=' + this.state.sizePerPage +
            '&offset=' + this.state.offset +
            '&search=' + this.state.searchText +
            '&sort=' + this.state.sortField +
            '&order=' + this.state.sortOrder + '';
        axios.get(url)
            .then((response) => {
                this.setState({ ManufactureData: response.data.rows });
                this.setState({ ManufactureDataTotal: response.data.total });
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
    EditDeleteFormatter = (cell, row, rowIndex) => {
        const { t } = this.props;
        return (
            <div>
                <button name="restore" class="btn-sm btn-warning custombtn" data-tooltip="true" title={t('button.restore')} onClick={() => { if (window.confirm('Are you sure you wish to restore these items?')) this.RestoreManufacture(row.id) }}><i class="fa fa-retweet" aria-hidden="true"></i></button>
                &nbsp;
            </div>
        );
    };
    CreateBtnClick = () => {
        const { ShowCreate } = this.state;
        this.setState({ ShowCreate: !ShowCreate });
    }

    CurrentBtnClick = () => {
        this.setState({ ShowDelete: false });
        this.setState({ ShowCreate: false });
        this.setState({ ShowUpdate: false });
        this.setState({ ShowMain: true })

    }

    RestoreManufacture = async (id) => {
        const url = Domain + '/manufacturers/restore/' + id;
        
        await axios.put(url)
            .then((response) => {
                this.setState({ showNotifications: true });
                console.log("restore message" + response.data.message);
                this.setState({ NotificationMessage: response.data.messages });

            })
        const { ShowMain } = this.state;
        this.setState({ ShowMain: !ShowMain })
    }
    showdeleted = (row) => {
        this.setState({ ManufacturetoUpdate: row });
        const { ShowUpdate } = this.state;
        this.setState({ ShowUpdate: !ShowUpdate });
    }
    UpdateManufacture = (row) => {
        this.setState({ ManufacturetoUpdate: row });
        const { ShowUpdate } = this.state;
        this.setState({ ShowUpdate: !ShowUpdate });
    }
    ManufactureDetails = (row) => {
        this.setState({ ManufacturetoUpdate: row });
        const { ShowDetails } = this.state;
        this.setState({ ShowDetails: !ShowDetails });
    }
    UpdateUrl = (row) => {
        this.setState({ ManufacturetoUpdate: row });
        const { ShowUpdate } = this.state;
        this.setState({ ShowUpdate: !ShowUpdate });
    }
    UpdateSupportUrl = (row) => {
        this.setState({ ManufacturetoUpdate: row });
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
    onLanguageHandle = (event) => {
        let newLang = event.target.value;
        this.setState({ value: newLang })
        this.props.i18n.changeLanguage(newLang)
    }

    render() {
        const { t } = this.props;
        const { ShowCreate, ShowMain, ShowUpdate, ShowDetails } = this.state;
        const { ManufactureData, sizePerPage, page } = this.state;

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



        if (ShowCreate) {
            return (
                <ManufactureCreate />
            )
        }



        else if (ShowUpdate) {
            return (
                <ManufactureUpdate ManufacturetoUpdate={this.state.ManufacturetoUpdate} />
            )
        }
        else if (ShowDetails) {
            return (
                <ManufactureDetails ManufacturetoUpdate={this.state.ManufacturetoUpdate} />
            )
        }
        else if (ShowMain) {
            return (
                <ManufactureMain showNotifications={this.state.showNotifications} NotificationMessage="Restored Successfully" />
            )
        }
        else {
            return (
                <div>

                    <div>
                        <div >
                            <div class="d-sm-flex align-items-center justify-content-between mb-4">
                                <h1 class="h3 mb-0 text-gray-800 custommain-title" name="manufacture">{t('manufacturers.manufacture')}</h1>

                                <div class="row">
                                    <div class="col">
                                        <button name="showcurrent" onClick={this.CurrentBtnClick} className=" btn btn-sm btn-primary shadow-sm custommain-title">
                                            {t('button.showcurrent')}</button>
                                        <button name="createnew" onClick={this.CreateBtnClick} className=" btn btn-sm btn-primary shadow-sm custommain-title">
                                            {t('manufacturers.createnew')}</button>
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
                                                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            })()}
                            <div >

                                <RemoteAll
                                    data={ManufactureData}
                                    page={page}
                                    sizePerPage={sizePerPage}
                                    totalSize={this.state.ManufactureDataTotal}
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
                </div>
            )
        }
    }
}
export default withTranslation()(ManufactureDelete);