import React, { Component } from 'react';
import axios from 'axios';
import PeopleMain from './PeopleMain';
import { withTranslation} from 'react-i18next'
import Countries from 'react-select-country';
const Domain = process.env.REACT_APP_URL;
var NotificationMessage = "";
var ResponseStatus = "";
class PeopleCreate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: "en",
            fields: {},
            errors: {},

            ShowCreate: true,
            ShowMain: false,
            showNotifications: false,
            passwordtype: "password"
        }

        this.myChangeHandler = this.myChangeHandler.bind(this);
        this.mySubmitHandler = this.mySubmitHandler.bind(this);
    }
    async componentDidMount() {

        const departmenturl = Domain + '/departments/selectList?page=1';
        const companyurl = Domain + '/companies/selectList?page=1';
        const locationsurl = Domain + '/locations/selectList?page=1';
        const managersurl = Domain + '/users/selectList?page=1';
        const groupurl = Domain + '/groups/selectList?page=1';
        const talentgroupurl = Domain + '/talentGroups/selectList?page=1';
        const [company_id, location_id, manager_id, department_id, group_id, talent_group_id] = await Promise.all([
            axios.get(companyurl),
            axios.get(locationsurl),
            axios.get(managersurl),
            axios.get(departmenturl),
            axios.get(groupurl),
            axios.get(talentgroupurl)
        ]);
        this.setState({
            companyData: company_id.data.items,
            locationData: location_id.data.items,
            managerData: manager_id.data.items,
            departmentData: department_id.data.items,
            GroupData: group_id.data.items,
            TalentGroupData: talent_group_id.data.items
        });

    }


    myChangeHandler = (event) => {

        this.setState({ [event.target.name]: event.target.value });
    }

    CheckboxChanged1 = (event) => {
        (this.state.passwordtype === "text") ? this.setState({ passwordtype: "password" }) : this.setState({ passwordtype: "text" });
    }

    handleModal() {
        this.setState({ show: !this.state.show })
    }

    mySubmitHandler = async (event) => {
        event.preventDefault();
        if (this.validateForm()) {
                await axios({
                    method: 'post',
                    url: Domain + '/users',
                    data: JSON.stringify({
                        username: this.state.username,
                        first_name: this.state.first_name,
                        last_name: this.state.last_name,
                        //password_confirmation: this.state.password_confirmation,
                        //password: this.state.password,
                        activated: this.state.activated,
                        email_user: this.state.email_user,
                        email: this.state.email,
                        company_id: this.state.company_id,
                        employee_num: this.state.employee_num,
                        jobtitle: this.state.jobtitle,
                        manager_id: this.state.manager_id,
                        department_id: this.state.department_id,
                        location_id: this.state.location_id,
                        address: this.state.address,
                        website: this.state.website,
                        zip: this.state.zip,
                        notes: this.state.notes,
                        phone: this.state.phone,
                        state: this.state.state,
                        city: this.state.city,
                        country: this.state.country,
                        group_id: this.state.group_id,
                        talent_group_id: this.state.talent_group_id,
                        user_type: this.state.user_type


                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(function (response) {
                    //handle success
                    ResponseStatus = response.data.success;
                    NotificationMessage = response.data.message;
                })
                    .catch(function (response) {
                        //handle error
                        console.log(response);
                    });

                this.setState({ showNotifications: true });
                if (ResponseStatus) {
                    this.setState({ ShowCreate: false });
                    this.setState({ ShowMain: true });
                }
            }
        
     }
    validateForm() {

        let state = this.state,errors = {},formIsValid = true;
        if (!state["username"]) {
            formIsValid = false;
            errors["username"] = "*Please enter username";
        }
        if (!state["first_name"]) {
            formIsValid = false;
            errors["first_name"] = "*Please enter first name";
        }
        if (!state["last_name"]) {
            formIsValid = false;
            errors["last_name"] = "*Please enter last name";
        }
        if (!state["email"]) {
            formIsValid = false;
            errors["email"] = "*Please enter email";
        }
        if (!state["company_id"]) {
            formIsValid = false;
            errors["company_id"] = "*Please select company";
        }
        if (!state["employee_num"]) {
            formIsValid = false;
            errors["employee_num"] = "*Please enter employee number";
        }
        if (!state["jobtitle"]) {
            formIsValid = false;
            errors["jobtitle"] = "*Please enter job title";
        }
        if (!state["phone"]) {
            formIsValid = false;
            errors["phone"] = "*Please enter phone";
        }
        else
        {
            if (typeof state["phone"] !== "undefined") {
                if (!state["phone"].match(/^[0-9-,]+$/)) {
                    formIsValid = false;
                    errors["phone"] = "*Please enter valid mobile no.";
                }
            }
        }
       
        if (!state["address"]) {
            formIsValid = false;
            errors["address"] = "*Please enter address";
        }
        if (!state["city"]) {
            formIsValid = false;
            errors["city"] = "*Please enter city";
        }
        if (!state["state"]) {
            formIsValid = false;
            errors["state"] = "*Please enter state";
        }
        if (!state["country"]) {
            formIsValid = false;
            errors["country"] = "*Please select country";
        }

        if (!state["zip"]) {
            formIsValid = false;
            errors["zip"] = "*Please enter zip code";
        }

        if (!state["group_id"]) {
            formIsValid = false;
            errors["group_id"] = "*Please select group";
        }

        if (!state["country"]) {
            formIsValid = false;
            errors["country"] = "*Please enter country";
        }

        if (!state["notes"]) {
            formIsValid = false;
            errors["notes"] = "*Please enter notes";
        }

        if ((!state["talent_group_id"] && state["user_type"])  || (state["talent_group_id"] && !state["user_type"])){
            formIsValid = false;
            if(!state["talent_group_id"])
              errors["talent_group_id"] = "*Please select talent group";
            else
              errors["user_type"] = "*Please select user type";
        }

        this.setState({ errors: errors});
        return formIsValid;
    }
    BackBtnClick = () => {
        NotificationMessage = '';
        this.setState({ showNotifications: false });
        const { ShowCreate } = this.state;
        this.setState({ ShowCreate: !ShowCreate });
    }

    CheckboxChanged = (event) => {
        let nam = event.target.name;
        let val;
        if (event.target.checked)
            val = "1";
        else
            val = "0";
        this.setState({ [nam]: val });
    }

    render() {
        const { showNotifications, ShowCreate } = this.state;
        const { t } = this.props

        if (ShowCreate) {
            return (
                <div>
                    {/* { this.renderLanguageDropdown()} */}
                    <div>
                        <div>

                            <div class="d-sm-flex align-items-center justify-content-between mb-4">
                                <h1 class="h3 mb-0 text-gray-800 custommain-title">{t('people.create')}</h1>


                                <button onClick={this.BackBtnClick} className="btn btn-sm btn-primary shadow-sm custommain-title">
                                {t('button.back')}</button>
                            </div>
                        </div>
                        <div class="container">
                            <div class="row justify-content-center">

                                <div class="col-xl-10 col-lg-12 col-md-9">

                                    <div class="card o-hidden border-0 shadow-lg my-5">
                                        <div class="card-body p-0">
                                            <div class="row">
                                                 <div class="col-xs-12 col-lg-10 col-md-9">
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
                                                        <form class="user" onSubmit={this.mySubmitHandler}>

                                                            <div class="form-group row">
                                                                <div class="col-sm-6 mb-3 mb-sm-0">
                                                                    <label for="first_name" class=" control-label customlabel-textcolor">{t('people.first_name')} <i style={{ color: "red" }}>*</i></label>
                                                                    <input type="first_name" class="form-control " id="first_name" name="first_name"
                                                                        placeholder="First Name" onChange={this.myChangeHandler}  />
                                                                        <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.first_name}</div>
                                                                </div>
                                                                <div class="col-sm-6 mb-3 mb-sm-0">
                                                                    <label for="last_name" class=" control-label customlabel-textcolor">{t('people.last_name')} <i style={{ color: "red" }}>*</i></label>
                                                                    <input type="last_name" class="form-control " id="last_name" name="last_name"
                                                                        placeholder="Last Name" onChange={this.myChangeHandler}  />
                                                                         <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.last_name}</div>
                                                                </div>

                                                                
                                                               
                                                            </div>

                                                            {/* <div class="form-group row">
                                                                <div class="col-sm-6 mb-3 mb-sm-0">
                                                                    <label for="password" class=" control-label customlabel-textcolor">{t('people.password')}</label>
                                                                    <input type={this.state.passwordtype} class="form-control " name="password"
                                                                        id="password" placeholder=" Password" onChange={this.myChangeHandler} required />

                                                                       </div>
                                                                <div class="col-sm-6">
                                                                    <label for="password_confirmation" class=" control-label customlabel-textcolor">{t('people.password_confirmation')}</label>
                                                                    <input type={this.state.passwordtype} class="form-control " name="password_confirmation"
                                                                        id="password_confirmation" placeholder="Confirm Password" onChange={this.myChangeHandler} required />
                                                                    <input type="checkbox" id="activated" name="activated" onChange={this.CheckboxChanged1} />
                                                                    <label class="custom-checkbox" for="chkLogin"> Show Password</label>

                                                                     </div>
                                                                   </div> */}

                                                            <div class="form-group row">
                                                                <div class="col-sm-6 mb-3 mb-sm-0">
                                                                    <label for="email" class=" control-label customlabel-textcolor">{t('people.email')} <i style={{ color: "red" }}>*</i></label>
                                                                    <input type="email" class="form-control" id="email" name="email" onChange={this.myChangeHandler}
                                                                        placeholder="Email Address" />
                                                                        <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.email} </div>
                                                                    <input type="checkbox" id="email_user" name="email_user" value="email_user" onChange={this.CheckboxChanged} checked disabled />
                                                                    <label class="custom-checkbox" for="chkEmailcredentials"> Email this user their credentials?</label>

                                                                </div>
                                                                <div class="col-sm-6">
                                                                    <label for="username" class=" control-label customlabel-textcolor">{t('people.username')} <i style={{ color: "red" }}>*</i></label>
                                                                    <input type="text" class="form-control " id="username" name="username"
                                                                        placeholder="User Name" onChange={this.myChangeHandler} />
                                                                    <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.username}</div>
                                                                    <input type="checkbox" id="activated" name="activated" onChange={this.CheckboxChanged} />
                                                                    <label class="custom-checkbox" for="chkLogin"> This user can login </label>

                                                                </div>
                                                                {/* <div class="col-sm-6">
                                                                    <label for="password" class=" control-label customlabel-textcolor">{t('people.password')}</label>
                                                                    <input type={this.state.passwordtype} class="form-control " name="password"
                                                                        id="password" placeholder="Generate Password" onChange={this.myChangeHandler} required />
                                                                    <input type="checkbox" id="activated" name="activated" onChange={this.CheckboxChanged1} />
                                                                    <label class="custom-checkbox" for="chkLogin"> Show Password</label>


                                                                </div> */}
                                                            </div>

                                                            <div class="form-group row">

                                                                You must provide an email address for this user to send them credentials. Emailing credentials can only be done on user creation. Passwords are stored in a one-way hash and cannot be retrieved once saved.


                                                            </div>
                                                            <div class="form-group row">

                                                                <div class="col-sm-6 mb-3 mb-sm-0">
                                                                    <label for="company_id" class=" control-label customlabel-textcolor">{t('people.company_id')} <i style={{ color: "red" }}>*</i></label>
                                                                    <select ref="company_id" class="form-control" onChange={this.myChangeHandler} id="company_id" value={this.state.fields.company_id} name="company_id">
                                                                        <option value="">Select Company</option>
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
                                                                    <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.company_id}</div>
                                                                </div>



                                                                <div class="col-sm-6 ">
                                                                    <label for="employee_num" class=" control-label customlabel-textcolor">{t('people.employee_num')} <i style={{ color: "red" }}>*</i></label>
                                                                    <input type="text" class="form-control " onChange={this.myChangeHandler}
                                                                        id="employee_num" name="employee_num" placeholder="Employee No" />
                                                                        <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.employee_num}</div>
                                                                </div>
                                                            </div>


                                                            <div class="form-group row">
                                                                <div class="col-sm-6 mb-3 mb-sm-0">
                                                                    <label for="manager_id" class=" control-label customlabel-textcolor">{t('people.manager_id')}</label>
                                                                    <select ref="manager_id" class="form-control" onChange={this.myChangeHandler} id="manager_id" value={this.state.fields.manager_id} name="manager_id">
                                                                        <option value="">Select manager</option>
                                                                        {(() => {
                                                                            if (this.state.managerData) {
                                                                                return (
                                                                                    this.state.managerData.map(obj => {
                                                                                        return (
                                                                                            <option
                                                                                                key={obj.id}
                                                                                                value={obj.id}
                                                                                                onChange={this.myChangeHandler}
                                                                                            >
                                                                                                {obj.id}-{obj.text}

                                                                                            </option>
                                                                                        );
                                                                                    })
                                                                                )
                                                                            }
                                                                        })()}
                                                                    </select>
                                                                    <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.manager_id}</div>
                                                                </div>




                                                                <div class="col-sm-6 ">
                                                                    <label for="jobtitle" class=" control-label customlabel-textcolor">{t('people.jobtitle')} <i style={{ color: "red" }}>*</i></label>
                                                                    <input type="text" class="form-control" onChange={this.myChangeHandler}
                                                                        id="jobtitle" name="jobtitle" placeholder="Title"  />
                                                                    <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.jobtitle}</div>
                                                                </div>
                                                            </div>


                                                            <div class="form-group row">
                                                                <div class="col-sm-6 mb-3 mb-sm-0">
                                                                    <label for="department_id" class=" control-label customlabel-textcolor">{t('people.department_id')}</label>
                                                                    <select ref="department_id" class="form-control" onChange={this.myChangeHandler} id="department_id" value={this.state.fields.department_id} name="department_id">
                                                                        <option value="">Select department</option>
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
                                                                        })()}
                                                                    </select>

                                                                </div>


                                                                <div class="col-sm-6 mb-3 mb-sm-0">
                                                                    <label for="location_id" class=" control-label customlabel-textcolor">{t('people.location_id')}</label>
                                                                    <select ref="location_id" class="form-control" onChange={this.myChangeHandler} id="location_id" name="location_id">
                                                                        <option value="">Select Location</option>
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
                                                                    <label for="phone" class=" control-label customlabel-textcolor">{t('people.phone')} <i style={{ color: "red" }}>*</i></label>
                                                                    <input type="text" class="form-control " id="phone" name="phone" onChange={this.myChangeHandler}
                                                                        placeholder="Phone"  />
                                                                    <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.phone}</div>

                                                                </div>

                                                                <div class="col-sm-6 ">
                                                                    <label for="website" class=" control-label customlabel-textcolor">{t('people.website')} </label>
                                                                    <input type="text" class="form-control " id="website" name="website" onChange={this.myChangeHandler}
                                                                        placeholder="website" />
                                                                    <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.website}</div>
                                                                </div>
                                                            </div>

                                                            <div class="form-group row">
                                                                <div class="col-sm-6 mb-3 mb-sm-0">
                                                                    <label for="address" class="control-label customlabel-textcolor">{t('people.address')} <i style={{ color: "red" }}>*</i></label>
                                                                    <input type="text" class="form-control " id="address" name="address" onChange={this.myChangeHandler}
                                                                        placeholder="Address" />
                                                                         <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.address}</div>
                                                                </div>
                                                                <div class="col-sm-6 mb-3 mb-sm-0">
                                                                    <label for="city" class=" control-label customlabel-textcolor">{t('people.city')} <i style={{ color: "red" }}>*</i></label>
                                                                    <input type="text" class="form-control " id="city" name="city" onChange={this.myChangeHandler}
                                                                        placeholder="City"  />
                                                                        <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.city}</div>
                                                                </div>
                                                               
                                                                
                                                            </div>

                                                            <div class="form-group row">
                                                                <div class="col-sm-6 mb-3 mb-sm-0">
                                                                    <label for="state" class=" control-label customlabel-textcolor">{t('people.state')} <i style={{ color: "red" }}>*</i></label>
                                                                    <input type="text" class="form-control " id="state" name="state" onChange={this.myChangeHandler}
                                                                        placeholder="State"  />
                                                                    <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.state}</div>
                                                                </div>


                                                                <div class="col-sm-6 mb-3 mb-sm-0">
                                                                    <label for="country" class=" control-label customlabel-textcolor">{t('people.country')} <i style={{ color: "red" }}>*</i></label>
                                                                    <Countries class="form-control" ref="country" value={this.state.country} name="country" empty=" -- Select country --" onChange={this.myChangeHandler} />
                                                                    <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.country}</div>
                                                                </div>
                                                            </div>
                                                            <div class="form-group row">
                                                                <div class="col-sm-6 mb-3 mb-sm-0">
                                                                    <label for="zip" class=" control-label customlabel-textcolor">{t('people.zip')} <i style={{ color: "red" }}>*</i></label>
                                                                    <input type="text" class="form-control " id="zip" name="zip" onChange={this.myChangeHandler}
                                                                        placeholder="Zip" />
                                                                    <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.zip}</div>
                                                                </div>                                                               
                                                                <div class="col-sm-6 ">
                                                                    <label for="group_id" class=" control-label customlabel-textcolor">{t('people.group_id')} <i style={{ color: "red" }}>*</i></label>
                                                                    <select ref="group_id" class="form-control" onChange={this.myChangeHandler} id="group_id" name="group_id" >
                                                                        <option value="">Select Group</option>
                                                                        {(() => {
                                                                            if (this.state.GroupData) {
                                                                                return (
                                                                                    this.state.GroupData.map(obj => {
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
                                                                    
                                                                    <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.group_id}</div>
                                                                </div>
                                                            </div>


                                                            <div class="form-group row">
                                                                <div class="col-sm-6 mb-3 mb-sm-0">
                                                                    <label for="talent_group_id" class=" control-label customlabel-textcolor">{t('people.talent_group_id')}</label>
                                                                    <select ref="talent_group_id" class="form-control" onChange={this.myChangeHandler} id="talent_group_id" name="talent_group_id">
                                                                        <option value="">Select Talent Group</option>
                                                                        {(() => {
                                                                            if (this.state.TalentGroupData) {
                                                                                return (
                                                                                    this.state.TalentGroupData.map(obj => {
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
                                                                        <div className="errorMsg" style={{ color: "red" }} >{this.state.errors.talent_group_id}</div>
                                                               
                                                                </div>

                                                                <div class="col-sm-6 ">
                                                                    <label for="user_type" class=" control-label customlabel-textcolor">{t('people.user_type')}</label>
                                                                    <select ref="user_type" class="form-control" onChange={this.myChangeHandler} id="user_type " name="user_type">
                                                                        <option key="" value="">Select user type</option>
                                                                        <option value="1">Technician</option>
                                                                        <option value="2">Technical Manager</option>
                                                                    </select>
                                                                        <div className="errorMsg" style={{ color: "red" }} >{this.state.errors.user_type}</div>
                                                                    
                                                                </div>
                                                            </div>


                                                            <div class="form-group row">
                                                                <div class="col-sm-8 mb-3 mb-sm-0">
                                                                    <label for="notes" class=" control-label customlabel-textcolor">{t('people.notes')} <i style={{ color: "red" }}>*</i></label>
                                                                    <textarea class="form-control " id="notes" name="notes" onChange={this.myChangeHandler}
                                                                        placeholder="Notes" />
                                                                        <div className="errorMsg" style={{ color: "red" }}>{this.state.errors.notes}</div>
                                                                </div>
                                                            </div>

                                                            <div class="form-group">
                                                                <button name="btnCancel" onClick={this.BackBtnClick} class="btn btn-link text-left" >{t('button.cancel')}</button>
                                                                <button name='submit' class="btn-primary" >{t('button.submit')}</button>

                                                                {/* <input type='submit' class="btn btn-primary" /> */}
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




                    </div>
                    <div>

                    </div>
                </div>
            )
        }
        else {
            return (
                <PeopleMain showNotifications={this.state.showNotifications} NotificationMessage={NotificationMessage} />
            )
        }
    }
}
export default withTranslation()(PeopleCreate);