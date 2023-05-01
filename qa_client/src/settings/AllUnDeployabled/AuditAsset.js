import React from 'react';

import axios from 'axios';
import AllUnDeployableMain from './AllUnDeployableMain'


const Domain = process.env.REACT_APP_URL;

class AuditAsset extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ListAllDatatoAudit: '',
            locationData: [],
            location: '',
            selectedlocation: '',
            ShowAudit: true
        }

    }

    async componentDidMount() {
        this.setState({ asset_tag: this.props.ListAllDatatoAudit.name });


        this.setState({ ListAllId: this.props.ListAllDatatoAudit.id });
        this.setState({ model_id: this.props.ListAllDatatoAudit.model.id });
const locationurl = Domain + '/locations/selectList?page=1';

        const [location_id] = await Promise.all([
            axios.get(locationurl)

        ]);
       

        this.setState({
            locationData: location_id.data.items,

        });

    }


  myChangeHandler = (event) => {

    this.setState({ [event.target.name]:event.target.value});
  }
    mySubmitHandler = async (event) => {
        event.preventDefault();
await axios({
            method: 'post',
            url: Domain + '/hardware/audit/ '+ this.props.ListAllDatatoAudit.id +'',
            data: JSON.stringify({
                asset_tag: this.state.asset_tag,
                location_id: this.state.location_id,
                model_id: this.state.model_id,
                notes: this.state.notes,
                update_location: this.state.update_location,
                next_audit_date: this.state.next_audit_date,

             }),
            headers: {

                'Content-Type': 'application/json'
            }

        })

    }
    CheckboxChanged = (event) => {

        let nam = event.target.name;
let val;
        if (event.target.checked)
          val = 1;
        else
   
          val = 0;
   
        this.setState({ [nam]: val });
      }
    BackBtnClick = () => {
        const { ShowAudit } = this.state;
        this.setState({ ShowAudit: !ShowAudit });
    };

    CancelBtnClick = () => {

        const { ShowAudit } = this.state;
        this.setState({ ShowAudit: !ShowAudit });
    }

    render() {
        const ShowAudit = this.state.ShowAudit;

        if (ShowAudit) {
        return (
                <div>
                    <div class="d-sm-flex align-items-center justify-content-between mb-4">
                        <h1 class="h3 mb-0 text-gray-800">Audit</h1>

                        <button onClick={this.BackBtnClick} className="btn btn-sm btn-primary shadow-sm">
                            <i class="btn btn-sm btn-primary"> Back</i></button>
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
                                                        <div class="form-group row">
                                                    <div class="col-sm-8 mb-3 mb-sm-0">
 

                                                            <input type="text" class="form-control "
                                                                name="model_id" id="model_id" value={this.state.model_id}
                                                                placeholder=" Model " onChange={this.myChangeHandler} disabled />

                                                        </div>
                                                            </div>
                                                         <div class="form-group row">
                                                    <div class="col-sm-8 mb-3 mb-sm-0">
 


                                                            <input type="text" class="form-control "
                                                                name="asset_tag" id="asset_tag" value={this.state.asset_tag}
                                                                placeholder=" Asset Tag " onChange={this.myChangeHandler} disabled />

                                                        </div>
                                                         </div>
                                                        <div class="form-group row">
                                                    <div class="col-sm-8 mb-3 mb-sm-0">
 
                                                                <select ref="location_id" class="form-control" onChange={this.myChangeHandler} id="location_id" name="location_id">
                                                                    <option key="0" value="0">Select location</option>
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

                                                                                                  </div>
                                                        <div class="col-sm-6">
                                                            <input type="checkbox"  name="update_location" id="update_location"
                                                             onChange={this.CheckboxChanged}/>
                                                            <label for="requestmodel"> Update Asset Loaction</label>


                                                        </div>
                                                        <div class="form-group row">
                                                    <div class="col-sm-8 mb-3 mb-sm-0">
 
                                                            <input type="Date" class="form-control "
                                                                name="next_audit_date" id="next_audit_date" aria-describedby="emailHelp"
                                                                placeholder="Next Audit Date.." onChange={this.myChangeHandler} />
                                                        </div>
                                                        </div>

                                                         <div class="form-group row">
                                                    <div class="col-sm-8 mb-3 mb-sm-0">
                                                            <textarea class="form-control "
                                                            onChange={this.myChangeHandler} id="notes" name="notes"
                                                                placeholder="Notes" />
                                                        </div>
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
                <AllUnDeployableMain showNotifications={this.state.showNotifications} />

            );
        }
    }
};

export default AuditAsset;