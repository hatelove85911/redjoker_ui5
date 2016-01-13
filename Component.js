sap.ui.define([
    "sap/ui/core/UIComponent"
], function (UIComponent, MyRouter) {
    "use strict";
    jQuery.sap.require("ui5seed.MyRouter");

    return UIComponent.extend("ui5seed.Component", {
        metadata: {
            name: "ui5seed",
            version: "1.0",
            includes: [],
            dependencies: {
                libs: ["sap.m", "sap.ui.layout"],
                components: []
            },
            rootView: "ui5seed.view.App",
            config: {
                resourceBundle: "i18n/i18n.properties",
                serviceConfig: {
                    name: "ui5seed",
                    serviceUrl: "/sap/opu/odata/path/to/srv/" // last slash important, must be there
                },
                appConfig: {
                    rootPath: "/redjoker_ui5" // don't need last slash, because this root path is used to compose a more complete path.
                }
            },
            routing: {
                config: {
                    routerClass: ui5seed.MyRouter,
                    viewType: "XML",
                    viewPath: "ui5seed.view",
                    targetAggregation: "pages",
                    clearTarget: false
                },
                routes: [{
                    pattern: "",
                    name: "main",
                    view: "Main",
                    targetControl: "idAppControl"
                }]
            },
        },
        init: function () {


            UIComponent.prototype.init.apply(this, arguments);

            var mConfig = this.getMetadata().getConfig();

            // always use absolute paths relative to our own component
            // (relative paths will fail if running in the Fiori Launchpad)
            // check for BSP environment and set reuse library path
            var rootPath;
            (function () {
                var iIndex = window.location.pathname.indexOf("/ui5_ui5/");
                rootPath = iIndex !== -1 ? mConfig.appConfig.rootPath : jQuery.sap.getModulePath("ui5seed");
            }());

            // set i18n model
            var i18nModel = new sap.ui.model.resource.ResourceModel({
                bundleUrl: [rootPath, mConfig.resourceBundle].join("/")
            });
            this.setModel(i18nModel, "i18n");

            // Create and set domain model to the component
            var sServiceUrl = mConfig.serviceConfig.serviceUrl;

            //Mock Server
            if (jQuery.sap.getUriParameters().get("responderOn") === "true") {
                jQuery.sap.require("sap.ui.core.util.MockServer");
                var oMockServer = new sap.ui.core.util.MockServer({
                    rootUri: sServiceUrl
                });
                var sMetadataUrl = rootPath + "/model/metadata.xml";
                var sMockdataBaseUrl = rootPath + "/model/";
                oMockServer.simulate(sMetadataUrl, sMockdataBaseUrl);
                oMockServer.start();
            }

            var oModel = new sap.ui.model.odata.ODataModel(sServiceUrl, true);
            this.setModel(oModel);
            // var oModel = new sap.ui.model.json.JSONModel();
            // this.setModel(oModel);


            // set device model
            var deviceModel = new sap.ui.model.json.JSONModel({
                isTouch: sap.ui.Device.support.touch,
                isNoTouch: !sap.ui.Device.support.touch,
                isPhone: sap.ui.Device.system.phone,
                isNoPhone: !sap.ui.Device.system.phone,
                listMode: sap.ui.Device.system.phone ? "None" : "SingleSelectMaster",
                listItemType: sap.ui.Device.system.phone ? "Active" : "Inactive"
            });
            deviceModel.setDefaultBindingMode("OneWay");
            this.setModel(deviceModel, "device");

            this.getRouter().initialize();
        },
    });
});
