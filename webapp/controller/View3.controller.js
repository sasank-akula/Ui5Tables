sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], (Controller, MessageToast, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("com.sap.demo.controller.View3", {
        onInit() {
           
            
            
        },
        onAfterRendering: function () {
            // Get the main (OData) model
            var oModel = this.getView().getModel();
            if (!oModel) {
              oModel = this.getOwnerComponent().getModel();
            }
          
            // Static keys for ComboBox
            var aModel = new sap.ui.model.json.JSONModel({
              keys: [
                { key: "ProductName",text:"Name" },
                { key: "UnitPrice",text:"Price" },
                { key: "UnitsInStock",text:"Quantity" }
              ]
            });
          
            // Set model to the view with alias "comboKeys"
            this.getView().setModel(aModel, "comboKeys");
          },
          
        onSearch: function () {

            // Filterng
            let oFilter = []
            let oBinding = this.getView().byId("_IDGenTable1").getBinding("items")
            if (this.getView().byId("_IDGenInput1").getValue()) {
                oFilter.push(new Filter({
                    path: "ProductName",
                    operator: FilterOperator.Contains,
                    value1: this.getView().byId("_IDGenInput1").getValue()
                }))
            }
            if (this.getView().byId("_IDGenInput").getValue()) {
                oFilter.push(new Filter({
                    path: "UnitsInStock",
                    operator: FilterOperator.GT,
                    value1: this.getView().byId("_IDGenInput").getValue()
                }))
            }
            if (this.getView().byId("_IDGenInput2").getValue()) {
                oFilter.push(new Filter({
                    path: "UnitPrice",
                    operator: FilterOperator.EQ,
                    value1: this.getView().byId("_IDGenInput2").getValue()
                }))
            }
            let aFilter = [new Filter({
                filters: oFilter,
                and: false
            })]
            // sorting

            const sSortKey = this.getView().byId("comboBoxId").getSelectedKey();
            const oDirection=this.getView().byId("_IDGenButton").getIcon();
            debugger
            let aSorters = [];
            if (sSortKey) {
                aSorters.push(new sap.ui.model.Sorter(sSortKey, oDirection==="sap-icon://sort-descending"));
            }
            oBinding.sort(aSorters);
            if(oFilter.length>0){
                oBinding.filter(aFilter);
            }else {
                oBinding.filter([]);
            }

        },
        formatPrice: function (val) {
            return val + " /Unit";
        },
        onDelete: function () {
            MessageToast.show("Record deleted")
        },

        onPress: function () {
            let oButton = this.getView().byId("_IDGenButton");
            let currentIcon = oButton.getIcon();

            if (currentIcon === "sap-icon://sort-ascending") {
                oButton.setIcon("sap-icon://sort-descending");
            } else {
                oButton.setIcon("sap-icon://sort-ascending");
            }
        }
    });
});