var expressRoutes = require('./lib/expressRoutes.js');
var appConfig = require('./appConfig');

expressRoutes.accFiles();
expressRoutes.userGUI();
expressRoutes.adminPanel();
expressRoutes.defaultRoutes();

expressRoutes.appRun(appConfig.appPort);
