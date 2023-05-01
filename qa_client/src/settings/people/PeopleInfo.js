import React, { Component } from 'react';
import axios from 'axios';

//import CompaniesDetails from './CompaniesDetails';
//import PeopleCreate from './PeopleCreate';
import PeopleUpdate from './PeopleUpdate';

const Domain = process.env.REACT_APP_URL;

class PeopleInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {

            PeopleData: [],
            ShowClone:false,
            ShowMain:false,
            ShowUpdate:false
        }
        
    }


    CreateBtnClick = () => {
        const { ShowCreate } = this.state;
        this.setState({ ShowCreate: !ShowCreate });
    }

    deletePeople = () => {
        const url = Domain + '/users/' + this.props.PeopleData.id;
        
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
        const { ShowUpdate, ShowClone } = this.state;
        if (ShowUpdate) {
            return (
                <PeopleUpdate PeopleData={this.props.PeopleData} editProcess="Update"/>
            )
        }
        else if(ShowClone)
        {
            return (
                <PeopleUpdate PeopleData={this.props.PeopleData} editProcess="Clone"/>
            )
        }
        else {
            return (
                <div class="row">
                    <div class="col-md-2 text-center">
                    </div>

                    <div class="col-md-8">
                        <table class="table table-striped">

                            <tr>
                                <td class="text-nowrap">Name</td>
                                <td> {this.props.PeopleData.name} </td>
                            </tr>
                            <tr>
                                <td class="text-nowrap">Company</td>
                                <td> {this.props.PeopleData.company.name} </td>
                            </tr>
                            <tr>
                                <td class="text-nowrap">Username</td>
                                <td>{this.props.PeopleData.username}</td>
                            </tr>
                            <tr>
                                <td class="text-nowrap">Address</td>
                                <td>
                                    <div>{this.props.PeopleData.address}</div>
                                    <div>{this.props.PeopleData.city},{this.props.PeopleData.state}</div>
                                    <div>{this.props.PeopleData.country}</div>
                                </td>
                            </tr>
                            <tr>
                                <td class="text-nowrap">Groups</td>
                                <td>{this.props.PeopleData.groups.rows[0].name}</td> 
                            </tr> 
                            <tr>
                                <td class="text-nowrap">Job Title</td>
                                <td>{this.props.PeopleData.jobtitle}</td> 
                            </tr> 
                            <tr>
                                <td class="text-nowrap">Employee Number</td>
                                <td>{this.props.PeopleData.employee_num}</td> 
                            </tr> 
                            <tr>
                                <td class="text-nowrap">Manager</td>
                                <td>{this.props.PeopleData.manager.name}</td> 
                            </tr> 
                            <tr>
                                <td class="text-nowrap">Email</td>
                                <td>{this.props.PeopleData.email}</td> 
                            </tr>
                            <tr>
                                <td class="text-nowrap">Website</td>
                                <td>{this.props.PeopleData.website}</td> 
                            </tr> 
                            <tr>
                                <td class="text-nowrap">Phone</td>
                                <td>{this.props.PeopleData.phone}</td> 
                            </tr>  
                            <tr>
                                <td class="text-nowrap">Department</td>
                                <td>{this.props.PeopleData.department.name}</td> 
                            </tr> 
                            <tr>
                                <td class="text-nowrap">Created At</td>
                                                 <td>{this.props.PeopleData.created_at.formatted}</td>  
                            </tr>

                            <tr>
                                <td class="text-nowrap">Login Enabled</td>

                                <td>
                                    {this.props.PeopleData.activated ? (<div><i class="fa fa-check text-success" aria-hidden="true"></i> Yes</div>) :
                                        (<div>
                                            <i class="fa fa-check text-danger" aria-hidden="true"></i> No</div>)}
                                </td>
                            </tr>
                                    </table>
                    </div>
                    </div>
            )
        }
    }
}

export default PeopleInfo;
