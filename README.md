# Article Studio

## Functions
- Creating articles
- Editing articles by Github Markdown
- Publishing articles
- Sign up, login
- Voting articles
- Sort by articles views, votes

## Configure project
Create a file named `.env`
Provide environment variables:
- EMAIL: Your email
- PASSWORD: Your email password
- DB_URL: Your MongoDB URL
- SESSION_SECRET: Anything you want (should be machine-generated)
- NODE_ENV: `production` (`development` mode doesn't allow JSON that hasn't been parsed to string)
- HOST: Your local network IP
- PORT: Your server port (Optional)

Create a directory named `ssl`

Generate an SSL certificate using:
- `.\app\bin\ssl\SSL` in CMD or Powershell
- `./app/bin/ssl/SSL.sh` in Bash

Run the project using:
- `.\app\bin\run\run` in CMD or Powershell
- `./app/bin/run/run.sh` in Bash

## License
- Do not deploy this application on any cloud platform or machine
- Use this project for testing and learning only

## Import structure
```
     ╭┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈╮
     ┊                                             ┊
 server.mjs ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ socket.mjs             ┊
     ┊                            ┊                ┊
 config.mjs                       ┊                ┊
                                  ┊                ┊
 next.mjs ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ app.mjs ┈┈┈┈┈┈ index.mjs
```
