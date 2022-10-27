const soap = require('soap');
const appConfig = require('../appConfig.js');

module.exports = {
  request: function(zpamount, zpemail, zpphone, zpdesc, zppid, zpcallback) {
    var soap = require('soap');
    var url = appConfig.zarinpalSoapServer;
    var args = {
      'MerchantID': appConfig.zarinpalMerchant,
      'Amount': zpamount,
      'Description': zpdesc,
      'Email': zpemail,
      'Mobile': zpphone,
      'CallbackURL': appConfig.appAddress + ':' + appConfig.appPort + '/verify/?Amount=' + zpamount + '&pid=' + zppid
    };
    soap.createClient(url, function(err, client) {
      client.PaymentRequest(args, function(err, result) {
        var parseData = JSON.parse(JSON.stringify(result));
        if(Number(parseData.Status) === 100) {
          var status = true;
          var url = 'https://sandbox.zarinpal.com/pg/StartPay/' + parseData.Authority;
          zpcallback({'status': status, 'url': url});
        } else {
          var status = false;
          var code = parseData.Status;
          zpcallback({'status': status, 'code': 'خطایی پیش آمد! ' + code});
        }
      });
    });
  },
  verify: function(zpstatus, zpamount, zpau, zpcallback) {
    var soap = require('soap');
    var url = appConfig.zarinpalSoapServer;
    var args = {
      'MerchantID': appConfig.zarinpalMerchant,
      'Authority': zpau,
      'Amount': zpamount
    };
    soap.createClient(url, function(err, client) {
      client.PaymentVerification(args, function(err, result) {
        var parseData = JSON.parse(JSON.stringify(result));
        if(zpstatus==="OK") {
          if(Number(parseData.Status) === 100) {
            var status = true;
            zpcallback({'status': status, 'code': parseData.RefID});
          } else {
            var status = false;
            zpcallback({'status': status, 'code': parseData.Status});
          }
        } else {
          var status = false;
          var code = 'عملیات توسط کاربر لغو شده است.';
          zpcallback({'status': status, 'code': 'خطایی پیش آمد! ' + code});
        }
      });
    });
  },
}
