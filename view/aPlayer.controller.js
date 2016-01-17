/* global $, sap */
sap.ui.define([
  'ui5seed/view/BaseController'
], function (Controller) {
  'use strict'

  return Controller.extend('ui5seed.view.aPlayer', {
    /**
     * Called when a controller is instantiated and its View controls (if available) are already created.
     * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
     * @memberOf bwm.view.home
     */
    onInit: function () {
      // initialize the mode model on the view
      this.getView().setModel(new sap.ui.model.json.JSONModel(), 'mode')

      // initialize the player model on the view
      this.getView().setModel(new sap.ui.model.json.JSONModel(), 'player')

      // register an event handler on the onbeforeshow event of the view
      this.getView().addEventDelegate({
        onBeforeShow: $.proxy(this.onBeforeShow, this)
      })
    },
    ok: function () {
      var oPlayer = this.getView().getModel('player').getData()
      if (oPlayer.id) {
        this.getView().getModel().update()
      } else {
        this.getView().getModel().create('PlayerSet', oPlayer, {
          success: function () {}
        })
      }
    },
    onBeforeShow: function (evt) {
      this.getView().getModel('mode').setData({
        mode: evt.data.mode
      })

      this.getView().getModel('player').setData(evt.data.player || {})
    }

    /**
     * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
     * (NOT before the first rendering! onInit() is used for that one!).
     * @memberOf bwm.view.home
     */
    //  onBeforeRendering: function() {
    //
    //  },

    /**
     * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
     * This hook is the same one that SAPUI5 controls get after being rendered.
     * @memberOf bwm.view.home
     */
    //  onAfterRendering: function() {
    //
    //  },

  /**
   * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
   * @memberOf bwm.view.home
   */
  //  onExit: function() {
  //
  //  }
  })
})
