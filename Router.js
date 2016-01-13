sap.ui.define([
    "sap/ui/core/routing/Router",
    "sap/m/routing/RouteMatchedHandler",
    "sap/ui/core/mvc/View"

    ], function(Router, RouteMatchedHandler, View){
        "use strict";

        return Router.extend("ui5seed.Router", {
            constructor: function(){
                Router.apply(this, arguments);
            },

            appNavTo: function(oOptions) {

                var oApp,
                oTargetView;

                oApp = this._getApp(oOptions.currentView);
                oTargetView = this.getView(oOptions.targetViewName, "XML");
                oApp.addPage(oTargetView);
                oApp.to(oTargetView.getId(), oOptions.transitionName || "slide", oOptions.data, oOptions.transitionParameters || {} )

            },

            appNavBack: function(oCurrentView) {
                this._getApp(oCurrentView).back();
            },
             _getApp: function(oView) {
                var findApp = function(oView) {

                    if(oView instanceof View && oView.byId('idAppControl')){
                        return oView.byId('idAppControl');
                    }

                    return oView.getParent() ? findApp(oView.getParent()) : null;
                };

                return findApp(oView);
             }          
        });

    });