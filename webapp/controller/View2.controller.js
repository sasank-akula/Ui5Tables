sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], (Controller, MessageToast, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("com.sap.demo.controller.View2", {
        onInit() {
            let oData = {
                firstname: "Sasank",
                lastname: "Akula",
                ColumnCollection: [
                    { key: "name", text: "Products" },
                    { key: "quantity", text: "Quantity" },
                    { key: "price", text: "Price" }
                ],
                Data: {
                    Products: [
                        {
                            name: "oil",
                            quantity: 6,
                            price: 100
                        },
                        {
                            name: "Rice",
                            quantity: 0,
                            price: 50
                        },
                        {
                            name: "Flour",
                            quantity: 100,
                            price: 50
                        }
                    ]
                }
            }

            let oModel = new sap.ui.model.json.JSONModel();
            oModel.setData(oData);
            this.getView().setModel(oModel);

        },
        onSearch: function () {

            // Filterng
            let oFilter = []
            let oBinding = this.getView().byId("_IDGenTable1").getBinding("items")
            if (this.getView().byId("_IDGenInput1").getValue()) {
                oFilter.push(new Filter({
                    path: "name",
                    operator: "Contains",
                    value1: this.getView().byId("_IDGenInput1").getValue()
                }))
            }
            if (this.getView().byId("_IDGenInput").getValue()) {
                oFilter.push(new Filter({
                    path: "quantity",
                    operator: FilterOperator.GT,
                    value1: this.getView().byId("_IDGenInput").getValue()
                }))
            }
            if (this.getView().byId("_IDGenInput2").getValue()) {
                oFilter.push(new Filter({
                    path: "price",
                    operator: FilterOperator.EQ,
                    value1: this.getView().byId("_IDGenInput2").getValue()
                }))
            }
            let aFilter = [new Filter({
                filters: oFilter,
                and: false
            })]
            const sSortKey = this.getView().byId("_IDGenComboBox1").getSelectedKey();
            const oDirection=this.getView().byId("_IDGenButton").getIcon();
            let aSorters = [];
            if (sSortKey) {
                aSorters.push(new sap.ui.model.Sorter(sSortKey, oDirection==="sap-icon://sort-descending"));
            }
            oBinding.sort(aSorters);
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