sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("sap.ui.demo.fiori2.controller.Detail", {
		onInit: function () {
			var oOwnerComponent = this.getOwnerComponent();

			this.oRouter = oOwnerComponent.getRouter();
			this.oModel = oOwnerComponent.getModel();

			this.oRouter.getRoute("master").attachPatternMatched(this._onProductMatched, this);
			this.oRouter.getRoute("detail").attachPatternMatched(this._onProductMatched, this);
		},

		_onProductMatched: function (oEvent) {
			this._product = oEvent.getParameter("arguments").product || this._product || "0";
			this.getView().bindElement({
				path: "/ProductCollection/" + this._product,
				model: "products"
			});
		},

		onEditToggleButtonPress: function () {
			var oObjectPage = this.getView().byId("ObjectPageLayout"),
				bCurrentShowFooterState = oObjectPage.getShowFooter();

			oObjectPage.setShowFooter(!bCurrentShowFooterState);
		},
		open: function () {
			if (!this.copyFromDialog) {
				this.copyFromDialog = this.loadFragment({
					name: "sap.ui.demo.fiori2.fragments.copyfrom"
				});
			}

			this.copyFromDialog.then(function (oDialog) {
				oDialog.open();
			});
		},
		onPressSelectSourceInspPoint: function () {
			if (!this.inspectionPointDialog) {
				this.inspectionPointDialog = this.loadFragment({
					name: "sap.ui.demo.fiori2.fragments.InspectionPointSelection"
				});
			}

			this.inspectionPointDialog.then(function (oDialog) {
				oDialog.open();
			});
		},
		onPressClosePopUp: function (oEvent) {
			this.byId("idCopyfromDialog").close();
		},
		onCloseInspFrag: function (oEvent) {
			this.byId("idInspectionPointSel").close();
		},

		onExit: function () {
			this.oRouter.getRoute("master").detachPatternMatched(this._onProductMatched, this);
			this.oRouter.getRoute("detail").detachPatternMatched(this._onProductMatched, this);
		}
	});
});
