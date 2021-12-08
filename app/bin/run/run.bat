@echo off

call npx next build
call npx nodemon --config nodemon.json server.mjs