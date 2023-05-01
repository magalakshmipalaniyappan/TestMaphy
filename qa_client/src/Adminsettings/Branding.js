import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import swal from 'sweetalert';
const Domain = process.env.REACT_APP_URL;
var responeStatus = "";
var NotificationMessage = "";
class Branding extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showNotifications: false,
      ShowCreate: true,
      uploaded_file: '',
    }
    this.onFileChange = this.onFileChange.bind(this);
    this.myChangeHandler = this.myChangeHandler.bind(this);
    this.mySubmitHandler = this.mySubmitHandler.bind(this);

  };
  componentDidMount() {
    const url = Domain + '/firms/getBrandingDetails';
    axios.get(url).then(
      response => {
        this.setState({ id: response.data.rows[0].id })
        this.setState({ brandtype: response.data.rows[0].brandtype })
        this.setState({ image: response.data.rows[0].image })
        this.setState({ site_name: response.data.rows[0].site_name })
        var selectedLogo = JSON.stringify(response.data.rows);
        localStorage.setItem("selectedLogo", selectedLogo);
      }
    )
      .catch(error => {
        console.log(error)
      })

  }
  myChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
  onFileChange(e) {
    this.setState({ uploaded_file: e.target.files[0] })
  }

  mySubmitHandler = async (event) => {
    event.preventDefault();
    //url: Domain + '/labels/' + this.state.labels_id,
    const url = Domain + '/firms/uploadLogo';
    const formData = new FormData()
    formData.append('uploaded_file', this.state.uploaded_file);
    formData.append('brandtype', this.state.brandtype);
    formData.append('site_name', this.state.site_name);
    await axios.put(url, formData, {
    }).then(response => {
      responeStatus = response.data.success;
      NotificationMessage=response.data.message;
    });

    if (responeStatus) {
      this.setState({ showNotifications: true });
      swal("Updated successfully!")
      window.location.reload(false);
    }
    else {
      this.setState({ showErrorNotifications: true });
    }

  }

  BackBtnClick = () => {
    const { ShowCreate } = this.state;
    this.setState({ ShowCreate: !ShowCreate });
  }

  render() {
    if (this.state.ShowCreate) {
      return (
        <div>
          <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Update Branding Settings</h1>
            <button onClick={this.BackBtnClick} className="btn-sm btn-primary shadow-sm  customlogin-btn">
              Back</button>
          </div>
          <div class="container">
            <div class="row justify-content-center">

              <div class="col-xl-10 col-lg-12 col-md-9">

                <div class="card o-hidden border-0 shadow-lg my-5">
                  <div class="card-body p-0">
                    <div class="row">
                      <div class="col-lg-10">
                        <div class="p-4">
                          <div class="box-header with-border">
                            {(() => {

                              if (this.state.showNotifications) {
                                return (
                                  <div class="row">
                                    <div class="col-md-12">
                                      <div class="alert alert-success alert-dismissible fade show" role="alert">
                                        <strong> {NotificationMessage}</strong>
                                      </div>
                                    </div>
                                  </div>
                                )
                             
                              }
                              if (this.state.showErrorNotifications){
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


                          </div>
                          <form class="user" onSubmit={this.mySubmitHandler}>


                            <div class="form-group row custom-branding">
                              <div class="col-md-3 ">
                                <label for="qr_code">Site Name <i style={{ color: "red" }}>*</i> </label>
                              </div>
                              <div class="col-md-9">
                                <input class="form-control" placeholder="Maphy Asset Management" name="site_name" type="text" value={this.state.site_name} id="site_name" onChange={this.myChangeHandler} required />
                              </div>
                            </div>
                            <div class="form-group row">
                              <div class="col-md-3">
                                <label for="webbrandingtype">Web Branding Type <i style={{ color: "red" }}>*</i> </label>
                              </div>
                              <div class="col-md-9">
                                <select class="form-control select2" id="brandtype" name="brandtype" value={this.state.brandtype} onChange={this.myChangeHandler} required>
                                  <option value="">Select Brand Type</option>
                                  <option value="logo">Logo</option></select>
                              </div>
                            </div>

                            <div class="form-group row custom-brandinglogo">

                              <label for="Logo">Logo</label>
                            </div>
                            <div class="custom-brandingfile">
                              <input type="file" class=" form-control-user js-uploadFile " onChange={this.onFileChange} name="uploaded_file" required />

                            </div>


                            <div class="form-group">
                              <button name="btnCancel" onClick={this.CancelBtnClick} class="btn btn-link text-left" >Cancel</button>

                              <input type='submit' class=" btn-primary  customlogin-btn" />
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
        <Redirect to={{
          pathname: '/Admin'
        }}></Redirect>
      );
    }
  }
};

export default Branding;