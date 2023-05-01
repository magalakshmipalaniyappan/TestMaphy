import React, { Component } from 'react';
import axios from 'axios';
import Dashboard from '../Dashboard/Dashboard';
import { CSVLink} from "react-csv";
const Domain = process.env.REACT_APP_URL;
const csvData = [];

class CustomAssetReportMain extends Component {
  constructor(props) {
    super(props)
    this.state = {
      CustomAssetReportData: [],
      CustomAssetReporttotal: 0,
      CustomAssetReportDataTotal: '',
      ShowCreate: true,

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
    this.loadDropdownValues();
  }
  async loadDropdownValues() {
    const companyurl = Domain + '/companies/selectList?page=1';
    const locationsurl = Domain + '/locations/selectList?page=1';
    const departmenturl = Domain + '/departments/selectList?page=1';
    const suppliersurl = Domain + '/suppliers/selectList?page=1';
    const modelurl = Domain + '/models/selectList?page=1';
    const manufactureurl = Domain + '/manufacturers/selectList?page=1';
    const categoryurl = Domain + '/categories/selectList?page=1';
    const statusurl = Domain + '/statuslabels/selectList?page=1';

    const [company_id, location_id, department_id, suppliers_id, model_id, manufacture_id, category_id, status_id] = await Promise.all([
      axios.get(companyurl),
      axios.get(locationsurl),
      axios.get(departmenturl),
      axios.get(suppliersurl),
      axios.get(modelurl),
      axios.get(manufactureurl),
      axios.get(categoryurl),
      axios.get(statusurl)
    ]);

    this.setState({
      companyData: company_id.data.items,
      locationData: location_id.data.items,
      departmentData: department_id.data.items,
      suppliersData: suppliers_id.data.items,
      modelData: model_id.data.items,
      manufactureData: manufacture_id.data.items,

      categoryData: category_id.data.items,
      statusData: status_id.data.items
    });

  }
  callServerData() {
    const url = Domain + '/reports/custom?limit=' + this.state.sizePerPage +
      '&offset=' + this.state.offset +
      '&search=' + this.state.searchText +
      '&sort=' + this.state.sortField +
      '&order=' + this.state.sortOrder + '';

    
    axios.get(url)
      .then((response) => {
 
        this.setState({ CustomAssetReportData: response.data });
        this.setState({ CustomAssetReportDataTotal: response.data });
      });
  }

  CreateBtnClick = () => {
    const { ShowCreate } = this.state;
    this.setState({ ShowCreate: !ShowCreate });
  }
  BackBtnClick = () => {
    const { ShowCreate } = this.state;
    this.setState({ ShowCreate: !ShowCreate });
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
    const { ShowCreate } = this.state;
    if (ShowCreate) {
      return (
        <div>
          <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Custom Asset Report </h1>
            <button onClick={this.BackBtnClick} className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
              <i class="btn btn-sm btn-primary"> Back</i></button>
          </div>
          <div class="container">
            <div class="row justify-content-center">
              <div class="card o-hidden border-0 shadow-lg my-5">
                <div class="card-body p-0">
                  <div class="row">
                    <div class="col-lg-15">
                      <div class="p-4">

                        <td>
                          <div class="form-group row">
                            <div class="col-sm-6">
                              <div>
                                <div class="d-sm-flex align-items-center justify-content-between mb-4">
                                  <h1 class="h3 mb-0 text-gray-800">Customize Report </h1>
                                </div>
                                <div>
                                  <input type="checkbox" id="chkSelect All" name="chkSelect All" checked="Select All" />
                                  <label for="chkSelect All">Select All</label>
                                </div>
                                <input type="checkbox" id="chkCompany" name="chkCompany" checked="Company" />
                                <label for="chkCompany"> Company</label>
                              </div>
                              <input type="checkbox" id="chkAsset Tag" name="chkAsset Tag" checked="Asset Tag" />
                              <label for="chkAsset Tag"> Asset Tag</label>
                            </div>
                            <div class="container">
                              <div class="col-lg-15">
                                <div>
                                  <input type="checkbox" id="chkAsset Name" name="chkAsset Name" checked="Asset Name" />
                                  <label for="chkAsset Name"> Asset Name</label>
                                </div>
                                <div>
                                  <input type="checkbox" id="chkManufacturer" name="chkManufacturer" checked=" Manufacturer" />
                                  <label for="chkManufacturer">Manufacturer</label>
                                </div>
                                <div>
                                  <input type="checkbox" id="chkAsset Models" name="chkAsset Models" checked="  Asset Models" />
                                  <label for="chkAsset Models">   Asset Models</label>
                                </div>
                                <div>
                                  <input type="checkbox" id="chkCategory" name="chkCategory" checked="Category" />
                                  <label for="chkCategory">    Category</label>
                                </div>
                                <div>
                                  <input type="checkbox" id="chkSerial" name="chkSerial" checked="Serial" />
                                  <label for="chkSerial">    Serial</label>
                                </div>
                                <div>
                                  <input type="checkbox" id="chkPurchaseDate " name="chkPurchaseDate " checked=" PurchaseDate " />
                                  <label for="chkPurchaseDate ">Purchase Date</label>
                                </div>
                                <div>
                                  <input type="checkbox" id="chkPurchase Cost " name="chkPurchaseCost " checked=" PurchaseCost " />
                                  <label for="chkPurchaseCost ">Purchase Cost</label>
                                </div>
                                <div>
                                  <input type="checkbox" id="chkEOL" name="chkEOL" checked="EOL" />
                                  <label for="chkEOL"> EOL</label>
                                </div>
                                <div>
                                  <input type="checkbox" id="chkOrder Number " name="chkOrderNumber " checked="Order Number    " />
                                  <label for="chkOrderNumber ">Order Number </label>
                                </div>
                                <div>
                                  <input type="checkbox" id="chkSuppliers" name="chkSuppliers" checked=" Suppliers" />
                                  <label for="chkSuppliers">Suppliers</label>
                                </div>
                                <div>
                                  <input type="checkbox" id="chkDefaultLocation" name="chkDefaultLocation" checked=" DefaultLocation" />
                                  <label for="chkDefaultLocation"> Default Location</label>
                                </div>
                                <div>
                                  <input type="checkbox" id="chkCAddress" name="chkAddress" checked=" Address" />
                                  <label for="chkAddress">-Address</label>
                                </div>
                                <div>
                                  <input type="checkbox" id="chkLocation" name="chkLocation" checked="  Location" />
                                  <label for="chkLocation"> Location</label>
                                </div>
                                <div>
                                  <input type="checkbox" id="chkCAddress" name="chkAddress" checked=" Address" />
                                  <label for="chkAddress">-Address</label>
                                </div>
                                <div>
                                  <input type="checkbox" id="chkStatus" name="chkStatus" checked="  Status" />
                                  <label for="chkStatus"> Status</label>
                                </div>
                                <div>
                                  <input type="checkbox" id="chkWarranty" name="chkWarranty" checked="  Warranty" />
                                  <label for="chkWarranty"> Warranty</label>
                                </div>
                                <div>
                                  <input type="checkbox" id="chkDepreciation" name="chkDepreciation" checked="  Depreciation" />
                                  <label for="chkDepreciation"> Depreciation</label>
                                </div>
                                <div>
                                  <input type="checkbox" id="chkCheckout Date " name="chkCheckoutDate " checked=" CheckoutDate " />
                                  <label for="chkCheckoutDate ">Checkout Date </label>
                                </div>
                                <div>
                                  <input type="checkbox" id="chkExpectedCheckinDate " name="chkExpectedCheckinDate " checked=" Expected Checkin Date " />
                                  <label for="chkExpectedCheckinDate ">Expected Checkin Date </label>
                                </div>
                                <div>
                                  <input type="checkbox" id="chkCreated at  " name="chkCreated at" checked=" Created at" />
                                  <label for="chkCreated at ">Created at </label>
                                </div>
                                <div>
                                  <input type="checkbox" id="chkUpdated at  " name="chkUpdated at" checked="  Updated at" />
                                  <label for="chkUpdated at "> Updated at </label>
                                </div>
                                <div>
                                  <input type="checkbox" id="chkNotes" name="chkNotes" checked="  Notes" />
                                  <label for="chkNotes"> Notes</label>
                                </div>
                                <div>
                                  <div class="d-sm-flex align-items-center justify-content-between mb-4">
                                    <h1 class="h3 mb-0 text-gray-800">Checked Out To Fields: </h1>
                                  </div>
                                  <div>
                                    <input type="checkbox" id="chkAssignedTo" name="chkAssignedTo" checked="AssignedTo" />
                                    <label for="chkAssignedTo">   Assigned To </label>
                                  </div>
                                  <div>
                                    <input type="checkbox" id="chkUsername" name="chkUsername" checked="Username" />
                                    <label for="chkUsername"> Username </label>
                                  </div>
                                  <div>
                                    <input type="checkbox" id="chkEmployee No" name="chkEmployee No" checked=" Employee No" />
                                    <label for="chkEmployee No"> Employee No </label>
                                  </div>
                                  <div>
                                    <input type="checkbox" id="chkManager" name="chkManager" checked="  Manager" />
                                    <label for="chkManager">  Manager </label>
                                  </div>
                                  <div>
                                    <input type="checkbox" id="chkDepartment" name="chkDepartment" checked=" Department" />
                                    <label for="chkDepartment"> Department </label>
                                  </div>
                                  <div>
                                    <div class="d-sm-flex align-items-center justify-content-between mb-4">
                                      <h1 class="h3 mb-0 text-gray-800">Custom Fields: </h1>
                                    </div>

                                    <div>
                                      <input type="checkbox" id="mac  " name="mac " checked=" mac  " />
                                      <label for="mac  ">Mac Address  </label>
                                    </div>

                                    <div>
                                      <input type="checkbox" id="chkfirstcustomfield" name="chkfirstcustom field" checked=" firstcustomfield   " />
                                      <label for="chkfirstcustomfield"> first custom field    </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div class="form-group">
                            Select the fields you'd like to include in your custom report, and click Generate. The file (custom-asset-report-YYYY-mm-dd.csv) will download automatically, and you can open it in Excel.
                            If you'd like to export only certain assets, use the options below to fine-tune your results..
                          </div>


                          <div class="form-group row">
                            <div class="col-sm-6 mb-3 mb-sm-0">
                              <select ref="company_id" class="form-control" onChange={this.myChangeHandler} id="company_id" value={this.state.company_id} name="company_id">
                                <option key="0" value="0">Select Company</option>
                                {(() => {
                                  if (this.state.companyData) {
                                    return (
                                      this.state.companyData.map(obj => {
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

                          </div>

                          <div class="form-group row">
                            <div class="col-sm-6 mb-3 mb-sm-0">
                              <select ref="location_id" class="form-control" onChange={this.myChangeHandler} id="location_id" value={this.state.location_id} name="location_id">
                                <option key="0" value="0">Select Location</option>
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
                                })()
                                }
                              </select>
                            </div>
                          </div>


                          <div class="form-group row">
                            <div class="col-sm-6 mb-3 mb-sm-0">
                              <select ref="location_id" class="form-control" onChange={this.myChangeHandler} id="location_id" value={this.state.location_id} name="location_id">
                                <option key="0" value="0">Select Default Location</option>
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
                                })()
                                }
                              </select>
                            </div>
                          </div>



                          <div class="form-group row">
                            <div class="col-sm-6 mb-3 mb-sm-0">
                              <select ref="department_id" class="form-control" onChange={this.myChangeHandler} id="department_id" value={this.state.department_id} name="department_id">
                                <option key="0" value="0">Select  Department</option>
                                {(() => {
                                  if (this.state.departmentData) {
                                    return (
                                      this.state.departmentData.map(obj => {
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
                                })()
                                }
                              </select>
                            </div>
                          </div>


                          <div class="form-group row">
                            <div class="col-sm-6 mb-3 mb-sm-0">
                              <select ref="suppliers_id" class="form-control" onChange={this.myChangeHandler} id="suppliers_id" value={this.state.suppliers_id} name="suppliers_id">
                                <option key="0" value="0">Select  Suppliers</option>
                                {(() => {
                                  if (this.state.suppliersData) {
                                    return (
                                      this.state.suppliersData.map(obj => {
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
                                })()
                                }
                              </select>
                            </div>
                          </div>

                          <div class="form-group row">
                            <div class="col-sm-6 mb-3 mb-sm-0">
                              <select ref="model_id" class="form-control" onChange={this.myChangeHandler} id="model_id" value={this.state.model_id} name="model_id">
                                <option key="0" value="0">Select  Models</option>
                                {(() => {
                                  if (this.state.modelData) {
                                    return (
                                      this.state.modelData.map(obj => {
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
                                })()
                                }
                              </select>
                            </div>
                          </div>


                          <div class="form-group row">
                            <div class="col-sm-6 mb-3 mb-sm-0">
                              <select ref=" manufacture_id" class="form-control" onChange={this.myChangeHandler} id=" manufacture_id" value={this.state.manufacture_id} name=" manufacture_id">
                                <option key="0" value="0">Select  Manufacturer</option>
                                {(() => {
                                  if (this.state.manufactureData) {
                                    return (
                                      this.state.manufactureData.map(obj => {
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
                                })()
                                }
                              </select>
                            </div>
                          </div>
                          <div class="form-group row">
                            <div class="col-sm-6 mb-3 mb-sm-0">
                              <select ref="category_id" class="form-control" onChange={this.myChangeHandler} id=" category_id" value={this.state.category_id} name="category_id">
                                <option key="0" value="0">Select  Category</option>
                                {(() => {
                                  if (this.state.categoryData) {
                                    return (
                                      this.state.categoryData.map(obj => {
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
                                })()
                                }
                              </select>
                            </div>
                          </div>
                          <div class="form-group row">
                            <div class="col-sm-6 mb-3 mb-sm-0">
                              <select ref="status_id" class="form-control" onChange={this.myChangeHandler} id=" status_id" value={this.state.status_id} name="status_id">
                                <option key="0" value="0">Select  Status</option>
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
                                })()
                                }
                              </select>
                            </div>
                          </div>
                          <div class="form-group row">
                            <div class="col-sm-6 mb-3 mb-sm-0">
                              <label for="order_number"  >Order Number</label>
                              <input type="order_number" class="form-control form-control-user" id="order_number" name="order_number"
                              />
                            </div>
                          </div>
                          <div class="form-group purchase-range">
                            <label for="purchase_start" class="col-md-3 control-label ">Purchase Date Range</label>
                            <div class="input-daterange input-group col-md-6" id="datepicker">
                              <input type="date" class="input-sm form-control" name="purchase_start" aria-label="purchase_start" />
                              <span class="input-group-addon"> to </span>
                              <input type="date" class="input-sm form-control" name="purchase_end" aria-label="purchase_end" />
                            </div>
                          </div>
                          <div class="form-group purchase-range">
                            <label for="created_at" class="col-md-3 control-label">Created At Range</label>
                            <div class="input-daterange input-group col-md-6" id="datepicker">
                              <input type="date" class="input-sm form-control" name="purchase_start" aria-label="purchase_start" />
                              <span class="input-group-addon"> to </span>
                              <input type="date" class="input-sm form-control" name="purchase_end" aria-label="purchase_end" />
                            </div>
                          </div>
                          <div class="form-group purchase-range">
                            <label for="expected_checkin" class="col-md-3 control-label">Expected Checkin Range</label>
                            <div class="input-daterange input-group col-md-6" id="datepicker">
                              <input type="date" class="input-sm form-control" name="purchase_start" aria-label="purchase_start" />
                              <span class="input-group-addon"> to </span>
                              <input type="date" class="input-sm form-control" name="purchase_end" aria-label="purchase_end" />
                            </div>
                          </div>

                          <div>
                            <input type="checkbox" id="chkassetfirstcustomfield" name="chkassetfirstcustom field" value=" firstcustomfield   " />
                            <label for> Add a BOM (byte-order mark) to this CSV</label>

                          </div>
                        </td>
                        <CSVLink data={csvData}>Generate</CSVLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      );
    }
    else {
      return (
        <Dashboard />
      )
    }
  }
}

export default CustomAssetReportMain;



