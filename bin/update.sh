#!/bin/bash

npm i cookie-parser dotenv express express-session hpp memorystore 
npm i mongoose next nodemailer nodemon passport passport-local socket.io react react-dom
npm i @types/cookie-parser @types/express @types/express-session @types/hpp @types/nodemailer --save-dev
npm fund
npm audit fix --force