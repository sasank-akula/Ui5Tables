sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("com.sap.demo.controller.View1", {
        onInit() {
            let oData={
                firstname:"Sasank",
                lastname:"Akula",
                Data:{
                    Products:[
                        {
                            name:"oil",
                            quantity:6,
                            price:100
                        },
                        {
                            name:"Rice",
                            quantity:60,
                            price:50
                        },
                        {
                            name:"Flour",
                            quantity:100,
                            price:50
                        }
                    ]
                }
            }

            let oModel= new sap.ui.model.json.JSONModel();
            oModel.setData(oData);
            this.getView().setModel(oModel);
            console.log("Products:", oModel.getProperty("/Data/Products"));
        }
    });
});