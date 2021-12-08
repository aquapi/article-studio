@echo off

call git add server.mjs
call git commit -m "Server"
call git push -f origin main

call git add next.config.mjs
call git commit -m "Next.js config"
call git push -f origin main

call git add package.json
call git commit -m "Package info"
call git push -f origin main

call git add pages
call git commit -m "Pages"
call git push -f origin main

call git add routes
call git commit -m "Routes"
call git push -f origin main

call git add public
call git commit -m "Stylesheets, Images"
call git push -f origin main

call git add models
call git commit -m "Models"
call git push -f origin main

call git add .gitignore
call git commit -m Gitignore
call git push -f origin main

call git add nodemon.json
call git commit -m "Nodemon config"
call git push -f origin main

call git add README.md
call git commit -m "README"
call git push -f origin main

call git add app
call git commit -m "App configs"
call git push -f origin main

echo Sync sucessful
