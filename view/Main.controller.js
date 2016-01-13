sap.ui.define([
    "ui5seed/view/BaseController"
], function (Controller) {
    "use strict";

    return Controller.extend("ui5seed.view.Main", {
        /**
         * Called when a controller is instantiated and its View controls (if available) are already created.
         * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
         * @memberOf bwm.view.home
         */
        onInit: function () {

        },
        toNewGame: function () {
            this.navTo("ui5seed.view.NewGame");
        },
        toPlayers: function () {
            this.navTo("ui5seed.view.Players");
        },
        toGames: function () {
          //add some comment

        },
        toAnalysis: function () {

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
    });
});
