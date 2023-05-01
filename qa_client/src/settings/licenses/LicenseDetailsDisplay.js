import React, { Component } from 'react';
import axios from 'axios';


const Domain = process.env.REACT_APP_URL;

class LicenseDetailsDisplay extends Component {
    constructor(props) {
        super(props)
        this.state = {

            LicensesDatatoUpdate: [],
            ShowClone:false,
            ShowMain:false,
            ShowUpdate:false
        }
        console.log("people info",this.props.LicensesDatatoUpdate)
    }


    componentDidMount() {
        // this.setState({ NotificationMessage: this.props.PeopleData });
       // this.callServerData();
    }

    callServerData() {
        const id = this.props.LicensesDatatoUpdate.id;
        //const id = this.props.PeopleData.id;
        const url = Domain + '/users/' + id;

 axios.get(url)
            .then((response) => {
                console.log("data:" + response.data);
                this.setState({ LicensesDatatoUpdate: response.data });
            });
    }

    CreateBtnClick = () => {
        const { ShowCreate } = this.state;
        this.setState({ ShowCreate: !ShowCreate });
    }

    deletePeople = () => {
        const url = Domain + '/users/' + this.props.LicensesDatatoUpdate.id;
        
        axios.delete(url)
          .then((response) => {
            this.setState({ showNotifications: true });
            console.log("delete message" + response.data.messages);
            this.setState({ NotificationMessage: response.data.messages });
            //this.setState({ PeopleData: this.state.PeopleData.filter(result => result.id !== id) });
          })
          const { ShowMain } = this.state;
          this.setState({ ShowMain: !ShowMain});
      }

    UpdatePeople = () => {
        // this.setState({ PeopleData: this.props.PeopleData });
        const { ShowUpdate } = this.state;
        this.setState({ ShowUpdate: !ShowUpdate });
    }
    ClonePeople = () => {
        // this.setState({ PeopleData: this.props.PeopleData });
        const { ShowClone } = this.state;
        this.setState({ ShowClone: !ShowClone });
    }
    myChangeHandler = (event) => {

        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
    }

    render() {
 console.log("props data",this.props.LicensesDatatoUpdate.id);
            return (
                <div class="row">
                    <div class="col-md-2 text-center">
                    </div>

                    <div class="col-md-8">
                        <table class="table table-striped">

                            <tr>
                                <td class="text-nowrap">Manufacturer</td>
                                <td> {this.props.LicensesDatatoUpdate.manufacturer.name} </td>
                            </tr>
                            <tr>
                                <td class="text-nowrap">Product Key</td>
                                <td> {this.props.LicensesDatatoUpdate.serial} </td>
                            </tr>
                            <tr>
                                <td class="text-nowrap">Category</td>
                                <td> {this.props.LicensesDatatoUpdate.category.name} </td>
                            </tr>
                            <tr>
                                <td class="text-nowrap">Licensed to Name</td>
                                <td> {this.props.LicensesDatatoUpdate.license_name} </td>
                            </tr>
                            <tr>
                                <td class="text-nowrap">Licensed to Email</td>
                                <td> {this.props.LicensesDatatoUpdate.license_email} </td>
                            </tr>
                            <tr>
                                <td class="text-nowrap">Supplier</td>
                                <td> {this.props.LicensesDatatoUpdate.supplier.name} </td>
                            </tr>
                            <tr>
                                <td class="text-nowrap">Expiration Date</td>
                                <td> {this.props.LicensesDatatoUpdate.expiration_date.formatted} </td>
                            </tr>
                            <tr>
                                <td class="text-nowrap">Termination Date</td>
                                <td> {this.props.LicensesDatatoUpdate.termination_date.formatted} </td>
                            </tr>
                            <tr>
                                <td class="text-nowrap">Purchase Date</td>
                                <td> {this.props.LicensesDatatoUpdate.purchase_date.formatted} </td>
                            </tr>
                            <tr>
                                <td class="text-nowrap">Purchase Cost</td>
                                <td> {this.props.LicensesDatatoUpdate.purchase_cost} </td>
                            </tr>
                            <tr>
                                <td class="text-nowrap">Order Number</td>
                                <td> {this.props.LicensesDatatoUpdate.order_number} </td>
                            </tr>
                            <tr>
                                <td class="text-nowrap">Seats</td>
                                <td> {this.props.LicensesDatatoUpdate.seats} </td>
                            </tr>
                            <tr>
                                <td class="text-nowrap">Reassignable</td>
                                <td> {this.props.LicensesDatatoUpdate.reassignable===1?"True":"False"} </td>
                            </tr>
                            <tr>
                                <td class="text-nowrap">Notes</td>
                                <td> {this.props.LicensesDatatoUpdate.notes} </td>
                            </tr>
                            {/* <tr>
                                <td class="text-nowrap">Username</td>
                                <td>{this.props.LicensesDatatoUpdate.username}</td>
                            </tr>
                            <tr>
                                <td class="text-nowrap">Groups</td>
                                <td>

                                </td>
                            </tr> <tr>
                                <td class="text-nowrap">Created At</td>
                                                 <td>{this.props.LicensesDatatoUpdate.created_at.formatted}</td>  
                            </tr>

                            <tr>
                                <td class="text-nowrap">Login Enabled</td>

                                <td>
                                    {this.props.LicensesDatatoUpdate.activated ? (<div><i class="fa fa-check text-success" aria-hidden="true"></i> Yes</div>) :
                                        (<div>
                                            <i class="fa fa-check text-danger" aria-hidden="true"></i> No</div>)}
                                </td>
                            </tr> */}
                                    </table>
                    </div>
                   </div>
            )
        
    }
}

export default LicenseDetailsDisplay;
