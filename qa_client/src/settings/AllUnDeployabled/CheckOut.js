import React, { Component } from 'react';
import axios from 'axios';

import AllUnDeployableMain from './AllUnDeployableMain'

const Domain=process.env.REACT_APP_URL;
class CheckOut extends React.Component{
    constructor(props){
        super(props)
        this.state={
            fields: {},
           errors: {},   ShowCheckout:true,
           ShowMain:false,
           showNotifications:false,
           toggleUser: true,
           toggleLocation:false,
           toggleAsset:false,
           checkout_to_type:'user'

          }
          this.myChangeHandler = this.myChangeHandler.bind(this);
          this.mySubmitHandler = this.mySubmitHandler.bind(this);
         
      };
      async componentDidMount() {
        this.setState({ AssetName: this.props.ListAllDatatoCheckout.name });


        this.setState({ ListAllId: this.props.ListAllDatatoCheckout.id });
        this.setState({ model_id: this.props.ListAllDatatoCheckout.model.id });
        const managersurl = Domain + '/users/selectList?page=1';
        const locationurl = Domain + '/locations/selectList?page=1';
        const [ assigned_user, assigned_location] = await Promise.all([
        axios.get(managersurl),
            axios.get(locationurl)
        ]);
        this.setState({
        managerData: assigned_user.data.items,
            locationData: assigned_location.data.items

        });

    }       
       myChangeHandler = (event) => {

    this.setState({ [event.target.name]:event.target.value});
  }
    myChangeHandlerManager= (event) => {
        let fields = this.state.fields;
        fields[event.target.name] = event.target.value;
        this.setState({
          fields
        });
        this.setState({checkout_to_type:'user'})
    }
  
    myChangeHandlerLocation= (event) => {
        let fields = this.state.fields;
        fields[event.target.name] = event.target.value;
        this.setState({
          fields
        });
        this.setState({checkout_to_type:'location'})
    }
      mySubmitHandler = async(event) => {
        event.preventDefault();
        console.log("asset list submit",);
        console.log("co d",this.state.fields.checkout_at,);
        console.log("c in d" + this.state.fields.expected_checkin);
        console.log("n" + this.state.fields.notes);
        console.log("checkout_to_type",this.state.checkout_to_type)
        console.log("Submit assigned_asset Name:" + this.state.fields.assigned_user);
 console.log("Submit AssetName Name:" + this.state.AssetName, this.state.model_id);

        // if (this.validateForm()) {
        await axios({
            method: 'post',
            url: Domain + '/hardware/'+this.props.ListAllDatatoCheckout.id+'/checkout',
            data: JSON.stringify({
                name: this.state.AssetName,
                model_id: this.state.model_id,
               assigned_location: this.state.fields.assigned_location,
                assigned_user: this.state.fields.assigned_user,
                notes: this.state.fields.notes,
                checkout_at: this.state.fields.checkout_at,
                expected_checkin: this.state.fields.expected_checkin,
                checkout_to_type:this.state.checkout_to_type
            }),
            headers: {


                'Content-Type': 'application/json'
            }
        })
            .then(function (response) {
                //handle success
                console.log("res" + response.status);
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });
         

        const { ShowCheckout } = this.state;
        this.setState({ShowCheckout: !ShowCheckout});

        const { showNotifications } = this.state;
        this.setState({ showNotifications: !showNotifications });
      
    }
    onUserClick = () => {
        this.setState({ toggleUser: true })
        this.setState({ toggleAsset: false })
        this.setState({ toggleLocation: false })
        this.setState({ ShowMain: false })
        this.setState({ ShowCheckout: true })
    }
   

    onLocationClick = () => {
        this.setState({ toggleUser: false })
        this.setState({ toggleAsset: false })
        this.setState({ toggleLocation: true })
        this.setState({ ShowMain: false })
        this.setState({ ShowCheckout: true })
    }
    
    BackBtnClick=()=>{
        const { ShowCheckout } = this.state;
        this.setState({ShowCheckout: !ShowCheckout});
        const { ShowMain } = this.state;
        this.setState({ShowMain: !ShowMain});
      }

      CancelBtnClick=()=>{
        const { ShowCheckout } = this.state;
        this.setState({ShowCheckout: !ShowCheckout});
        const { ShowMain } = this.state;
        this.setState({ShowMain: !ShowMain});
      }
    render()
    {
        console.log("render")
        const {ShowCheckout,ShowMain}= this.state;
        console.log("show",ShowMain )
 if(ShowCheckout)
        {
          return (
            <div>
                <div class="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 class="h3 mb-0 text-gray-800">CheckOut Asset<span><i class="fa fa-life-ring"></i></span></h1>
                    <button onClick={this.BackBtnClick} className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
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
                                                    <div class="form-group">
                                                        <input type="text" class="form-control form-control-user"
                                                            name="model_id" id="model_id"
                                                            value={this.state.model_id}
                                                            placeholder="Model..." onChange={this.myChangeHandler} disabled />
                                                    </div>
                                                    <div class="form-group row">
                                                        <input type="text" class="form-control form-control-user" value={this.state.AssetName}
                                                            name="AssetName" id="AssetName" aria-describedby="emailHelp"
                                                            placeholder="Asset Name..." onChange={this.myChangeHandler} disabled/>
                                                    </div>
                                                    <div class="col-sm-12 mb-3 mb-sm-0">
                                                                                                 <div>Checked Out to:<button onClick={this.onUserClick} name="btnUser" class="btn btn-primary">User</button>                                                        
                                                                <button onClick={this.onLocationClick} name="btnLocation" class="btn btn-primary">Location</button>
                                                        </div>
                                                    </div>
                                                                                             <div class="col-sm-12 mb-3 mb-sm-0">
                                                        <div class="col-sm-10 mb-3 mb-sm-0">
                                                            {this.state.toggleUser ? <select ref="assigned_user" class="form-control" onChange={this.myChangeHandlerManager} id="assigned_user" name="assigned_user">
                                                                <option key="0" value="0">Select manager</option>
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
                                                                                        {obj.text}
                                                                                    </option>
                                                                                );
                                                                            })
                                                                        )
                                                                    }
                                                                })()}
                                                            </select> : null}
                                                                                                         {this.state.toggleLocation ? <select ref="assigned_location" class="form-control" onChange={this.myChangeHandlerLocation} id="assigned_location" name="assigned_location">
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
                                                                })()}
                                                            </select>
                                                                : null}
                                                        </div>
                                                                 <div class="col-sm-2">
                                                            <a href='#' data-toggle="modal" class="btn btn-sm btn-primary">New</a>
                                                        </div>

                                                        </div>

                                                                                                                                                                      <div class="input-group mb-3">

                                                        <input type="text" class="form-control form-control-user" value={this.state.fields.checkout_at}
                                                        name="checkout_at" id="checkout_at" aria-describedby="emailHelp"
                                                        placeholder="Checkout Date" onChange={this.myChangeHandler} />
                                                        <div class="input-group-append">
                                                        <span class="input-group-text"><input type="date" name="checkout_at" id="checkout_at" onChange={this.myChangeHandler}/>
                                                            <i class="fa fa-calender" aria-hidden="true"></i></span>

                                                        </div>
                                                        </div>
                                                    <div class="input-group mb-3">

                                                                    <input type="text" class="form-control form-control-user" value={this.state.fields.expected_checkin}
                                                                    name="expected_checkin" id="expected_checkin" aria-describedby="emailHelp"
                                                                    placeholder="CheckIn Date" onChange={this.myChangeHandler} />
                                                                    <div class="input-group-append">
                                                                    <span class="input-group-text"><input type="date" name="expected_checkin" id="expected_checkin" onChange={this.myChangeHandler}/>
                                                                        <i class="fa fa-calender" aria-hidden="true"></i></span>

                                                                    </div>
                                                  </div>
                                                    

                                                    <div class="form-group row">
                                                        <div class="col-sm-12 mb-3 mb-sm-0">
                                                            <textarea class=" form-control form-control-user" onChange={this.myChangeHandler}
                                                                aria-label="notes" spellcheck="false" id="notes" name="notes"
                                                                placeholder="Notes" />
                                                        </div>
                                                    </div>
                                                    <div class="form-group">
                                                        {/* <button name="btnCancel" onClick={this.CancelBtnClick} class="btn btn-link text-left" >Cancel</button> */}

                                                        <input type='submit' class="btn btn-primary"/>
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
        else{
            return (
                <AllUnDeployableMain showNotifications={this.state.showNotifications}/>       );
       }
    }
};

export default CheckOut;