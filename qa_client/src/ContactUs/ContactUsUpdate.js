
import React, { } from 'react';
import axios from 'axios';
import ContactUsMain from './ContactUsMain'

import { withTranslation } from 'react-i18next'
const Domain = process.env.REACT_APP_URL;
var NotificationMessage = "";
var ResponseStatus = "";
class ContactUsUpdate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: "en",
            showUpdate: true,
            showNotifications: false

        }
    }
    componentDidMount() {
        console.log("data:",)
        this.setState({ id: this.props.customerFeedback.id });
        this.setState({ email: this.props.customerFeedback.email });
        this.setState({ customer_description: this.props.customerFeedback.customer_description })
        this.setState({ admin_description: this.props.customerFeedback.admin_description });
        this.setState({ status: this.props.customerFeedback.status });
    }
    myChangeHandler = (event) => {

        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
    }
    mySubmitHandler = async (event) => {
        event.preventDefault();
        await axios({
            method: 'put',
            url: Domain + '/contactus/' + this.props.customerFeedback.id,
            data: JSON.stringify({ admin_description: this.state.admin_description }),
            headers: {
                'Content-Type': 'application/json'
            }

        })
            .then((response) => {
                //handle success
                ResponseStatus = response.data.success;
                NotificationMessage = response.data.message;
            })
            .catch(function (response) {
                //handle error
                console.log(response);

            });
        this.setState({ showNotifications: true });
        if (ResponseStatus === true) {
            this.setState({ showUpdate: false });
        }


    }

    BackBtnClick = () => {
        this.setState({ showUpdate: false });
        this.setState({ showNotifications: false });

    }

    CancelBtnClick = () => {
        const { showUpdate } = this.state;
        this.setState({ showUpdate: !showUpdate });

        this.setState({ showNotifications: false });
    }

    onLanguageHandle = (event) => {
        let newLang = event.target.value;
        this.setState({ value: newLang })
        this.props.i18n.changeLanguage(newLang)
    }


    render() {
        const { showNotifications, showUpdate } = this.state;

        if (showUpdate) {
            return (
                <div>

                    <div class="d-sm-flex align-items-center justify-content-between mb-4">
                        <h1 class="h3 mb-0 text-gray-800">Customer FeedBack<span></span></h1>
                        <button onClick={this.BackBtnClick} className=" btn btn-sm btn-primary shadow-sm">
                            Back</button>
                    </div>
                    <div class="container">
                        <div class="row justify-content-center">

                            <div class="col-xl-10 col-lg-12 col-md-9">

                                <div class="card o-hidden border-0 shadow-lg my-5">
                                    <div class="card-body p-0">
                                        <div class="row">
                                            <div class="customcol-lg-10">
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
                                                        <div class="form-group">
                                                            <label for="email" class="customlabel-textcolor">Email  </label>

                                                            <input type="text" class="form-control" rows="5"
                                                                name="email" id="email"
                                                                placeholder="Email ..." value={this.state.email} disabled />
                                                        </div>
                                                        <div class="form-group">
                                                            <label for="customer_description" class="customlabel-textcolor">Customer Description </label>

                                                            <textarea type="text" class="form-control" rows="5"
                                                                name="customer_description" id="customer_description"
                                                                placeholder="Customer Description..." value={this.state.customer_description} disabled />
                                                        </div>
                                                        <div class="form-group">
                                                            <label for="admin_description" class="customlabel-textcolor">Admin Description </label>
                                                            {this.state.status === "open" ?                                                                       <textarea type="text" class="form-control" rows="5"
                                                                    name="admin_description" id="admin_description"
                                                                    placeholder="Admin Description..." onChange={this.myChangeHandler} required /> 
                                                                    : <textarea class="form-control" value={this.state.admin_description} rows="5"
                                                                        name="admin_description" placeholder="Admin Description..." disabled />}

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
                     console.log("contactusMain",this.state.showUpdate)
            return (
                <ContactUsMain showNotifications={this.state.showNotifications} NotificationMessage={NotificationMessage} />
            )
        }
    }
};
export default withTranslation()(ContactUsUpdate);
