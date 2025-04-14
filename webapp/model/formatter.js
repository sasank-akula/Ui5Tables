sap.ui.define([], 
function (JSONModel, Device) {
    "use strict";

    return {
        formatFullName:function(firstname,lastname){
            
            return "Hi "+firstname+" "+ lastname;
        },
        formatQuantity:function(val){
            if(val>1){
                return val+" units"
            }
            else if(val==1){
                return val+" unit"
            }
            else{
                return "Out of stock";
            }
        }
    };

});