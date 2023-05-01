import React from "react";
//import TextField from '@material-ui/core/TextField';

const AddDataField = props => {
  return props.DataField.map((val, idx) => {
    let field_name = `field_name-${idx}`,
      field_type = `field_type-${idx}`;


    return (
      <div className="" key={val.index}>
        <button type="button" class="btn btn-primary" data-toggle="collapse" data-target="#assetbar" aria-hidden="true">Add Field</button>
                <div id="assetbar" class="collapse hide">
{/*       
<div class="col-sm-4" >
                {idx === 0 ? (
                  <button
                    onClick={() => props.add()}
                    type="button"
                    className="btn btn-primary text-center"
                  >
                    <i className="fa fa-plus-circle" aria-hidden="true" />
                  </button>
                ) : (
                  <button
                    className="btn btn-danger"
                    onClick={() => props.delete(val)}
                  >
                    <i className="fa fa-minus" aria-hidden="true" />
                  </button>
                )}
              </div> */}
         <div class="row justify-content-center  customworkstatus-form">

            {/* <div >
              <label class="customlabel1-textcolor">{idx + 1}</label>
            </div> */}
 <div class="form-group row">
 <div class="col-sm-8 mb-3 mb-sm-0">

                  <label for="field_type" class="control-label customlabel-textcolor"> RAM</label>
                  {/* <input class="form-control "
                              placeholder="status"
                              name="status"
                              id={status}
                              data-id={idx}
                              required
                            /> */}
                  <input
                    //defaultValue="completed"
                    //type="time"
                    placeholder="RAM"

                    InputLabelProps={{
                      shrink: true,
                    }}
                    className="form-control "
                    name="field_type"
                    id={field_type}
                    data-id={idx}
                    required
                  >
                    {/* <option value="">Field Type</option>

                    <option value="ram">RAM</option>
                    <option value="os">OS</option>
                    <option value="processor">Processor</option> */}
                  </input>
                </div>
                </div>
            <div class="form-group row">
            <div class="col-sm-8 mb-3 mb-sm-0">

                <label for="field_name" class="control-label customlabel-textcolor"> OS</label>
                <input type="text" class="form-control "
                  placeholder="Operating System"
                  name="field_name"
                   id={field_name}
                  data-id={idx}
                  required
                />
          </div>       
            </div>
            <div class="form-group row">
            <div class="col-sm-8 mb-3 mb-sm-0">

                <label for="field_name" class="control-label customlabel-textcolor"> Processor</label>
                <input type="text" class="form-control "
                  placeholder="Processor"
                  name="field_name"
                   id={field_name}
                  data-id={idx}
                  required
                />
             </div>
            </div>
            <div class="form-group row">
            <div class="col-sm-8 mb-3 mb-sm-0">

                <label for="field_name" class="control-label customlabel-textcolor"> Hard Disk</label>
                <input type="text" class="form-control "
                  placeholder="Hard Disk"
                  name="field_name"
                   id={field_name}
                  data-id={idx}
                  required
                />
             </div>
            </div>
            <div class="form-group row">
            <div class="col-sm-8 mb-3 mb-sm-0">

                <label for="field_name" class="control-label customlabel-textcolor"> Screen Size</label>
                <input type="text" class="form-control "
                  placeholder="Screen Size"
                  name="field_name"
                   id={field_name}
                  data-id={idx}
                  required
                />
             </div>
            </div>
          </div>
        </div>
        </div>

    );
  });
};
export default AddDataField;

