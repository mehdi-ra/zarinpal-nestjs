const express = require('express');
const app = express();
const fs = require('fs');
const mime = require('mime-types');
const appConfig = require('../appConfig.js');
const mySqlLib = require('./mySQLjobs');
const bodyParser = require("body-parser");
const zarinpalLib = require('./zarinpal');
const session = require('express-session');

app.use(session({secret: 'JHGhaASshyTJYWklnvzURbJYhjaois'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', './views');

var zpSession;

module.exports = {
	appRun: function(port) {
		app.listen(port, () => console.log('\
Zarinpal NodeJS payment app is running on port: ' + port + '\nThanks for using this app.\nFor further supports please visit our website: http://heradesign.ir\nSupport phone: 09393138160\n\
You also have the option to change the port in appConfig.js file.\
		'));
	},
	accFiles: function() {
		app.get('/acc/:type/:path', function (req, res) {
			var filePath = 'acc/' + req.params.path + '.' + req.params.type;
			if(fs.existsSync(filePath)) {
				var fileData = fs.readFileSync(filePath);
				var fileMimeType = mime.lookup(filePath);
				res.writeHeader(200, {'Content-Type': fileMimeType});
				res.write(fileData);
				res.end();
			} else {
				res.writeHeader(404, {'Content-Type': 'text/html'});
				res.write('404');
				res.end();
			}
		});
	},
	userGUI: function() {
		app.get('/x/:path', function (req, res) {
			var filePath = 'views/' + req.params.path + '.ejs';
			if(fs.existsSync(filePath)) {
				res.render(req.params.path, { zpTitle: appConfig.appTitle});
			} else {
				res.render('404', { zpTitle: appConfig.appTitle});
			}
		});
		app.post('/x/handle', function (req, res) {
			var dataToSend = {
				zpTitle: appConfig.appTitle,
				zpClientFirstName: req.body.firstname,
				zpClientLastName: req.body.lastname,
				zpClientEmail: req.body.email,
				zpClientPhone: req.body.phone,
				zpClientAmount: req.body.amount,
				zpClientDescription: req.body.description
			}
			res.render('accept', dataToSend);
		});
		app.post('/x/handle/accepted', function (req, res) {
			mySqlLib.addTransaction('Pending', req.body.acfirstname, req.body.aclastname, req.body.acemail, req.body.acphone, req.body.acamount, req.body.acdescription, function(getpid) {
				zarinpalLib.request(req.body.acamount, req.body.acemail, req.body.acphone, req.body.acdescription, getpid, function(data) {
					if(data.status) {
						res.writeHeader(302, {'Location': data.url});
						res.end();
					} else {
						res.render('error', {zpTitle: appConfig.appTitle, zpError: data.code});
					}
				});
			});
		});
		app.get('/verify', function (req, res) {
			zarinpalLib.verify(req.query.Status, req.query.Amount, req.query.Authority, function(data) {
				if(data.status) {
					res.render('success', { zpTitle: appConfig.appTitle, zpRefID: data.code});
					mySqlLib.updateTransaction(data.code, req.query.pid);
				} else {
					res.render('error', {zpTitle: appConfig.appTitle, zpError: data.code});
				}
			});
		});
	},
	defaultRoutes: function() {
		app.get('/x/', function (req, res) {
			res.writeHeader(302, {'Location': '/x/start'});
			res.end();
		});
		app.get('/', function (req, res) {
			res.writeHeader(302, {'Location': '/x/start'});
			res.end();
		});
		app.use(function (req, res) {
			res.render('404', { zpTitle: appConfig.appTitle});
		});
	},
	adminPanel: function() {
		app.get('/' + appConfig.adminPanelPath, function (req, res) {
      zpSession = req.session;
      if(req.session.adminValidate) {
				mySqlLib.getTransactions(function(data) {
					res.render('admin/transactions', { zpTitle: appConfig.appTitle, adminPanelPath: appConfig.adminPanelPath, transactionsData: data});
				});
      } else {
        res.render('admin/login', { zpTitle: 'پنل مدیریت', adminPanelPath: appConfig.adminPanelPath, errorNo: 'err0'});
      }
		});
    app.get('/' + appConfig.adminPanelPath + '/exit', function (req, res) {
      zpSession = req.session;
      zpSession.adminValidate = false;
      res.writeHeader(302, {'Location': '/' + appConfig.adminPanelPath});
      res.end();
		});
    app.post('/' + appConfig.adminPanelPath + '/login', function (req, res) {
      if(appConfig.adminUsername === req.body.zpAdminUsername && appConfig.adminPassword === req.body.zpAdminPassword) {
        req.session.adminValidate = true;
        res.writeHeader(302, {'Location': '/' + appConfig.adminPanelPath});
  			res.end();
      } else {
        res.render('admin/login', { zpTitle: 'پنل مدیریت', adminPanelPath: appConfig.adminPanelPath, errorNo: 'err1'});
      }
		});
	}
}
