@echo off

call npx next build
call nodemon --config nodemon.json server.mjs