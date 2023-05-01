
var validator = require('validator');
  

const validateFields = () => {
     
  const validation = (state) => {
    let errors = {},formIsValid = true;
        if (!state["location_id"]) {
          formIsValid = false;
          errors["location_id"] = "Please select location";
        }
        if (!state["category_id"]) {
          formIsValid = false;
          errors["category_id"] = "Please select category";
        }
        if (!state["order_number"]) {
          formIsValid = false;
          errors["order_number"] = "Please enter order number";
        }
        if (!state["serial"]) {
          formIsValid = false;
          errors["serial"] = "Please enter serial";
        }
    
        if (!state["company_id"]) {
          formIsValid = false;
          errors["company_id"] = "Please select company";
        }
    
        if (!state["qty"]) {
          formIsValid = false;
          errors["qty"] = "Please enter Qty.";
        }
        else{
          if (typeof state["qty"] !== "undefined") {
            var pattern = new RegExp(/^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/);
            if (!pattern.test(state["qty"])) {
              formIsValid = false;
              errors["qty"] = "*Only allow integer, greater than zero..";
            }
          }
        }
       
    
        if (!state["min_amt"]) {
          formIsValid = false;
          errors["min_amt"] = "Please enter Min.Qty.";
        }
        else {
          if (typeof state["min_amt"] !== "undefined") {
            var pattern2 = new RegExp(/^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/);
            if (!pattern2.test(state["min_amt"])) {
              formIsValid = false;
              errors["min_amt"] = "*Only allow integer, greater than zero..";
            }
          }
        }
       debugger;
        if((state["min_amt"] && state["qty"] )&& (state["min_amt"]> state["qty"]))
        {
          formIsValid = false;
          errors["min_amt"] = "Minimum quantity should be greater than quantity";
        }
    
        if (!state["purchase_cost"]) {
          formIsValid = false;
          errors["purchase_cost"] = "Please enter purchase cost.";
        }
        else {
          if (typeof state["purchase_cost"] !== "undefined") {
            var pattern1 = new RegExp(/^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/);
            if (!pattern1.test(state["purchase_cost"])) {
              formIsValid = false;
              errors["purchase_cost"] = "*Only allow integer, greater than zero..";
            }
          }
        }
        if (!state["purchase_date"]) {
          formIsValid = false;
          errors["purchase_date"] = "Please select purchase date";
        }
        else {
          if (!validator.isDate(this.state.purchase_date)) {
            formIsValid = false;
            errors["purchase_date"] = "Please enter valid purchase date";
          }
          else {
            let d1 = new Date(this.state.current_date);
            let d2 = new Date(this.state.purchase_date);
         if (d1 < d2) {
              formIsValid = false;
              errors["purchase_date"] = "Purchase date should not be greater than current date";
            }
          }
    
        }

        return ({success:formIsValid, errors:errors}) ;
    
    }
    return {validation };
  }

  export default validateFields;
