sap.ui.define([
   "sap/ui/core/mvc/Controller"
], function (Controller) {
   "use strict";

   return Controller.extend("ui5seed.view.BaseController", {
    /**
     * Called when a controller is instantiated and its View controls (if available) are already created.
     * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
     * @memberOf bwm.view.home
     */
        _getRouter: function() {
            return sap.ui.core.UIComponent.getRouterFor(this);
        },
        _getComponent: function(){
            return this.getOwnerComponent();
        },
        _getModel: function(){
            return this.getOwnerComponent().getModel();
        }
     });

});