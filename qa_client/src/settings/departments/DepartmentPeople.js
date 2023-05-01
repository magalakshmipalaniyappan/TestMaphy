import React, { Component } from 'react';
import axios from 'axios';

//import CompaniesDetails from './CompaniesDetails';
//import PeopleCreate from './PeopleCreate';
import PeopleUpdate from '../people/PeopleUpdate';

const Domain = process.env.REACT_APP_URL;

class DepartmentPeople extends Component {
    constructor(props) {
        super(props)
        this.state = {

            managerDetails: [],
            ShowClone:false,
            ShowMain:false,
            ShowUpdate:false
        }
        console.log("people info",this.props.managerDetails)
    }


    callServerData() {
        const id = this.props.managerDetails.manager.id;
        //const id = this.props.PeopleData.id;
        const url = Domain + '/users/' + id;

 axios.get(url)
            .then((response) => {
                console.log("data:" + response.data);
                this.setState({ managerDetails: response.data });
            });
    }

    CreateBtnClick = () => {
        const { ShowCreate } = this.state;
        this.setState({ ShowCreate: !ShowCreate });
    }

    deletePeople = () => {
        const url = Domain + '/users/' + this.props.managerDetails.manager.id;
        
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
        this.setState({editProcess:"Update"});
    }
    ClonePeople = () => {
        const { ShowUpdate } = this.state;
        this.setState({ ShowUpdate: !ShowUpdate });
        this.setState({editProcess:"Clone"});
    }
    myChangeHandler = (event) => {

        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
    }

    render() {
        const { ShowUpdate} = this.state;
        if (ShowUpdate) {
            return (
                <PeopleUpdate PeopleData={this.props.PeopleData} editProcess={this.state.editProcess}/>
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
                                <td> {this.props.managerDetails.manager.name} </td>
                            </tr>

                            <tr>
                                <td class="text-nowrap">Company</td>
                                <td>{this.props.managerDetails.company.name}</td>
                            </tr>
                            <tr>
                                <td class="text-nowrap">Department</td>
                                <td>{this.props.managerDetails.name}</td>
                            </tr>
                            <tr>
                                <td class="text-nowrap">Location</td>
                                <td>{this.props.managerDetails.location.name}</td>
                            </tr>
                            {/* <tr>
                                <td class="text-nowrap">Groups</td>
                                <td>{this.props.PeopleData.groups.rows[0].name}</td>
                            </tr> */}
                             <tr>
                                <td class="text-nowrap">Created At</td>
                                                 <td>{this.props.managerDetails.created_at.formatted}</td>  
                            </tr>

                            <tr>
                                <td class="text-nowrap">Login Enabled</td>

                                <td>
                                    {this.props.managerDetails.activated ? (<div><i class="fa fa-check text-success" aria-hidden="true"></i> Yes</div>) :
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

export default DepartmentPeople;
