import React, { Component } from 'react';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
import { withTranslation} from 'react-i18next'

const Domain = process.env.REACT_APP_URL;

const RemoteAll = ({ data,
    page,
    sizePerPage,
    defaultSorted,
    totalSize,
    onTableChange,
    columns,
    indication,
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
                            footerClasses="footer-class"
                        >
                        </BootstrapTable>
                        <div>
                                             </div>
  
                    </div>

                </div>
            ]}
        </ToolkitProvider>

    </div>
);
class HardwareReportMain extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: "en",
            HardwareReportData: [],
            HardwareData: [],
            HardwareReportTotal: 0,
            HardwareReportDataTotal: '',
            HardwareTotal: '',
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
        this.callTotalAssetData(this.state.page);
    }
    callServerData() {
        const url = Domain + '/hardware?limit=' + this.state.sizePerPage +
            '&offset=' + this.state.offset +
            '&search=' + this.state.searchText +
            '&sort=' + this.state.sortField +
            '&order=' + this.state.sortOrder + '';

        axios.get(url)
            .then((response) => {
                this.setState({ HardwareReportData: response.data.rows });
                this.setState({ HardwareReportDataTotal: response.data.total });
                this.setState({ HardwareTotalCost: response.data.TotalAssetCost });
            });
    }
    callTotalAssetData() {
        const url = Domain + '/hardware/totalassetcost?limit=' + this.state.sizePerPage +
            '&offset=' + this.state.offset +
            '&search=' + this.state.searchText +
            '&sort=' + this.state.sortField +
            '&order=' + this.state.sortOrder + '';

        axios.get(url)
            .then((response) => {
                this.setState({ HardwareData: response.data.rows });
                this.setState({ HardwareTotal: response.data.total });
            });
    }
    CreateBtnClick = () => {
        const { ShowCreate } = this.state;
        this.setState({ ShowCreate: !ShowCreate });
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
    onLanguageHandle = (event) => {
        let newLang = event.target.value;
        this.setState({ value: newLang })
        this.props.i18n.changeLanguage(newLang)
    }
    render() {

        const { HardwareReportData, HardwareTotalCost, sizePerPage, page } = this.state;
        const { t } = this.props

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
        const columns = [{
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
            text: 'Total Purchase Cost',
            sort: false,
            headerStyle: { 'white-space': 'nowrap' }
        },
        {
            dataField: 'tax_value',
            text: 'Tax Cost',
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
            headerStyle: { 'white-space': 'nowrap' },
        },
        {
            dataField: 'updated_at.formatted',
            text: 'Updated At',
            sort: false,
            hidden: true,
            headerStyle: { 'white-space': 'nowrap' }
        },
];

        return (
            <div>
                <div>
                    <div >
                        <div class="d-sm-flex align-items-center justify-content-between mb-4">
                            <h1 class="h3 mb-0 text-gray-800 custommain-title"> {t('app.hardwarereports')}</h1>

                        </div>

                        <div >

                            <RemoteAll
                                data={HardwareReportData}
                                page={page}
                                sizePerPage={sizePerPage}
                                totalSize={this.state.HardwareReportDataTotal}
                                columns={columns}
                                CSVExport={CSVExport}
                                ExportCSVButton={ExportCSVButton}
                                CustomToggleList={CustomToggleList}
                                onTableChange={this.handleTableChange}
                                myChangeHandler={this.myChangeHandler}
                                SearchBtnClick={this.SearchBtnClick}
                            />
                            <div class="custom-purchasecost">Total Purchase Cost:{HardwareTotalCost}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default withTranslation()(HardwareReportMain);




