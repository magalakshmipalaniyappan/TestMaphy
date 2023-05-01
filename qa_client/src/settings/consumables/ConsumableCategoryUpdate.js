import React, { Component } from 'react';
import axios from 'axios';

import ConsumableDetails from './ConsumableDetails';

const Domain = process.env.REACT_APP_URL;

class ConsumableCategoryUpdate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            CategoriesDatatoUpdate: '',
            ShowMain: false,
            showUpdate: true,
            showNotifications: false,
            UpdateNotificationMessage: '',
            NotificationMessage: ''
        }
        }

    componentDidMount() {
        this.setState({ CategoriesName: this.props.CategoriesDatatoUpdate.name });
        this.setState({ CategoriesType: this.props.CategoriesDatatoUpdate.category_type });
        this.setState({ CategoriesId: this.props.CategoriesDatatoUpdate.id });
        this.setState({ checkin_email: this.props.CategoriesDatatoUpdate.checkin_email });
        this.setState({ has_eula: this.props.CategoriesDatatoUpdate.has_eula });
        this.setState({ require_acceptance: this.props.CategoriesDatatoUpdate.require_acceptance });

        }
    myChangeHandler = (event) => {

    this.setState({ [event.target.name]:event.target.value});
  }
    CheckboxChanged=(event)=>
  {
    let nam = event.target.name;
    let val;
    if( event.target.checked)
       val = true; 
    else 
       val=false;    
    this.setState({ [nam]: val });
  }
    mySubmitHandler = async (event) => {
        event.preventDefault();
       

        await axios({
            method: 'put',
            url: Domain + '/categories/' + this.state.CategoriesId,
            data: JSON.stringify({ name: this.state.CategoriesName,category_type:this.state.CategoriesType
          ,has_eula:this.state.has_eula,eula_text:this.state.eula_text,
          checkin_email:this.state.checkin_email,require_acceptance:this.state.require_acceptance }),
            headers: {
                'Content-Type': 'application/json'
            }

        })
            .then((response) => {
                //handle success
                console.log(response);
                console.log("update message:" + response.data.messages)
                this.setState({ UpdateNotificationMessage: response.data.messages });

                console.log("UpdateNotificationMessage in submit:" + this.state.UpdateNotificationMessage)
            })
            .catch(function (response) {
                //handle error
                console.log(response);

            });

        const { showUpdate } = this.state;
        this.setState({ showUpdate: !showUpdate });
        const { showNotifications } = this.state;
        this.setState({ showNotifications: !showNotifications });


    };
    BackBtnClick = () => {
        this.setState({ showUpdate: false });
        this.setState({ showNotifications: false });
        this.setState({ NotificationMessage: '' })
    }

    CancelBtnClick = () => {
        const { showUpdate } = this.state;
        this.setState({ showUpdate: !showUpdate });

        this.setState({ showNotifications: false });
        this.setState({ NotificationMessage: '' });
    }
    render() {
        const showUpdate = this.state.showUpdate;

        if (showUpdate) {
            return (
                <div>
                    <div class="d-sm-flex align-items-center justify-content-between mb-4">
                        <h1 class="h3 mb-0 text-gray-800">Update Categories<span><i class="fa fa-life-ring"></i></span></h1>
                        <button onClick={this.BackBtnClick} className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
                                        Back
                            </button>
                    </div>
                    <div class="container">
                        <div class="row justify-content-center">

                            <div class="col-xl-10 col-lg-12 col-md-9">

                                <div class="card o-hidden border-0 shadow-lg my-5">
                                    <div class="card-body p-0">
                                        <div class="row">
                                            <div class="col-lg-10">
                                                <div class="p-4">

                                                    <form class="user" onSubmit={this.mySubmitHandler}>
                                                        <div class="form-group">
                                                            <h6 class="h3 mb-0 text-gray-800">{this.state.CategoriesName}</h6>
                                                        </div>
                                                        <div class="form-group">
                                                            <input type="text" class="form-control form-control-user"
                                                                value={this.state.CategoriesName} name="CategoriesName" id="CategoriesName" aria-describedby="emailHelp"
                                                                placeholder="Categories Name..." onChange={this.myChangeHandler} />
                                                        </div>
                                                        <div class="form-group row">

                                                            <select ref="CategoriesType" class="form-control" onChange={this.myChangeHandler} id="CategoriesType" value={this.state.CategoriesType} name="CategoriesType">
                                                                <option key="0" value="0">Select category type</option>
                                                                <option value="Accessory">Accessory</option>
                                                                <option value="License">License</option>
                                                                <option value="Consumable">Consumable</option>
                                                                <option value="Component">Component</option>
                                                                <option value="Asset">Asset</option>


                                                                                                            </select>                                                    
                                                        </div>



                                                        <div class="form-group row">

                                                            <textarea class="form-control form-control-user" id="eula_text"
                                                                placeholder="Category EULA" onChange={this.myChangeHandler}/>
                                                            <p class="col-md-offset-3">This field allows you to customize your EULAs for specific types of assets. If you only have one EULA for all of your assets, you can check the box below to use the primary default. </p>
                                                            <p class="help-block">This EULA allows <a href="https://help.github.com/articles/github-flavored-markdown/">Github flavored markdown</a>. </p>
                                                        </div>

                                                        <div class="col-md-offset-6">
                                                            <input type="checkbox" id="has_eula" name="has_eula" checked={this.state.has_eula} onChange={this.CheckboxChanged} disabled/>
                                                            <label for="defaultval"> <del>Use the primary default EULA instead.</del> No primary default EULA is set. Please add one in Settings.</label>

                                                        </div>

                                                        <div class="col-md-offset-3">
                                                            <input type="checkbox" id="require_acceptance" name="require_acceptance" checked={this.state.require_acceptance} onChange={this.CheckboxChanged} />
                                                            <label for="acceptance">Require users to confirm acceptance of assets in this category..</label>

                                                        </div>
                                                        <div class=" col-md-offset-3">
                                                            <input type="checkbox" id="checkin_email" name="checkin_email" checked={this.state.checkin_email} onChange={this.CheckboxChanged} />
                                                            <label for="usermail">Send email to user on checkin/checkout.</label>

                                                        </div>
                                                        <div class="form-group">
                                                            <button name="btnCancel" onClick={this.CancelBtnClick} class="btn btn-link text-left" >Cancel</button>

                                                            <input type='submit' class="btn btn-primary" />
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
            )
        }
        else {
            return (

                <ConsumableDetails showNotifications={this.state.showNotifications}  />
            )
        }
    }


};

export default ConsumableCategoryUpdate;