/* global jQuery, sap */
jQuery.sap.declare('ui5seed.view.BaseController')
jQuery.sap.require('sap.ui.core.routing.History')
sap.ui.core.mvc.Controller.extend('ui5seed.view.BaseController', {
  getEventBus: function () {
    var sComponentId = sap.ui.core.Component.getOwnerIdFor(this.getView())
    return sap.ui.component(sComponentId).getEventBus()
  },

  getRouter: function () {
    return sap.ui.core.UIComponent.getRouterFor(this)
  },

  onNavButtonPressed: function () {
    this.getRouter().backWithoutHash(this.getView())
  },

  getComponent: function () {
    return this.getOwnerComponent()
  },

  getApp: function () {
    return this.getComponent().__App__
  },

  navTo: function (sTargetViewName, oData, sTransitionName) {
    var oApp,
      oView

    oApp = this.getApp()
    oView = this.getRouter().getView(sTargetViewName, 'XML')
    oApp.addPage(oView)
    oApp.to(oView.getId(), sTransitionName || 'slide', oData)
  },

  onNavBack: function (oEvent) {
    var oHistory, sPreviousHash

    oHistory = sap.ui.core.routing.History.getInstance()
    sPreviousHash = oHistory.getPreviousHash()

    if (sPreviousHash !== undefined) {
      window.history.go(-1)
    } else {
      this.getRouter().navTo('invitations', {}, true /*no history*/) // Home 
    }
  }

})
