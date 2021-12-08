@echo off

call npm i nodemailer mongoose express-session express dotenv cookie-parser next nodemon
call npm i @types/cookie-parser @types/express @types/express-session @types/nodemailer --save-dev
call npm fund

echo Update Success