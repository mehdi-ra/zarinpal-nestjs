const mysql = require('mysql');
const appConfig = require('../appConfig.js');
var jdate = require('jdate').JDate();

var DBconnect = mysql.createConnection({
  host: appConfig.mysqlAddress,
  user: appConfig.mysqlUserName,
  password: appConfig.mysqlPassword,
  database: appConfig.mysqlDatabase
});

DBconnect.connect(function(err) {
  if (err) {
    console.log("\nSomething is not right with Mysql and me! :(\nFix database info in appConfig.js file! And make sure your MySql server is running probably.\nI have to stop running! ");
    process.exit();
  };
  console.log("\nWe're talking with Mysql correctly!");
});

module.exports = {
  addTransaction: function(cstatus, cname, clastname, cemail, cphone, camount, cdesc, ccallback) {
    var pid = Math.floor(Math.random() * 100000000000);
    var nowDate = jdate.toString('yyyy/MMMM/dd HH:mm');
    var values = [
      ['', cstatus, cname, clastname, cemail, cphone, camount, cdesc, nowDate, pid]
    ];
    var DBquery = "INSERT INTO transactions (ID, TransactionCode, ClientFirstName, ClientLastName, ClientEmail, ClientPhone, ClientAmount, ClientDescription, payDate, PID) VALUES ?";
    DBconnect.query(DBquery, [values]);
    ccallback(pid);
  },
  updateTransaction: function(tcode, pid) {
    var DBquery = 'UPDATE transactions SET TransactionCode = ' + tcode + ', pid = \'null\' WHERE PID = ' + pid;
    DBconnect.query(DBquery);
  },
  getTransactions: function(callback) {
    var DBquery = "SELECT * FROM transactions";
    var totalToSend = '';
    DBconnect.query(DBquery, function (err, result, fields) {
      result.forEach(function(row) {
        var toFetch = '<tr>' +
  '<td>' + row.ID + '</td>' +
  '<td>' + row.TransactionCode + '</td>' +
  '<td>' + row.ClientFirstName + ' ' + row.ClientLastName + '</td>' +
  '<td>' + row.ClientEmail + '</td>' +
  '<td>' + row.ClientPhone + '</td>' +
  '<td>' + row.ClientAmount + '</td>' +
  '<td>' + row.payDate + '</td>' +
  '<td>' + row.ClientDescription + '</td>' +
'</tr>';
        totalToSend += toFetch;
      });
      callback(unescape(totalToSend));
    });
  }
}
