# ZPnode
Zarinpal Node.js payment gateway is a program which will help you to use Zarinpal on Node.js servers easily.

## Install
Before going any further make sure that you have Node.js installed on you computer, To install Node.js please visit https://nodejs.org/en/ .

In order to use this app you need to install MySQL. Doing this is easy by install XAMPP:

https://www.apachefriends.org/

Clone or download files and put them in a folder on your system and from your CLI ( On Windows CMD, On Linux and Mac Terminal ) change your directory to the folder you have these files in. Then kindly do the commands below to install dependencies.
```
npm i body-parser ejs express express-session jdate mime-types mysql soap
```
Next open appConfig.js file in order to set your options, And be sure that you have installed MySQL server on your computer or you have access to an appropriate one.

Then upload the file which is in "Database to Upload" folder in order to have your database ready.

After doing so run the program by the command below ( Make sure that you are in the folder which run.js file is located ):
```
node run.js
```
## For developers
There is an option called as "zarinpalSoapServer" in the appConfig.js file which you can set Zarinpal's soap server to sandbox like below:
```
zarinpalSoapServer: 'https://sandbox.zarinpal.com/pg/services/WebGate/wsdl'
```
