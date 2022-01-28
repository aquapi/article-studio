# Article Studio

## Target user
- Programmers or professional article writers

## Do I copy the idea from another project?
- No, I think this is the first project that has this idea (I did not say this is the only one)

## Functions
- Completed:
    + Creating and editing articles
    + View articles
    + Theme changer
    + Vote
    + Discuss
    + Categories
    + Search
    + Sign up, log in
    + Private articles 
- In progress:
    + Refractoring (Always)
    + Co-authors
    + Discuss will only open if author is online

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
- `.\bin\SSL` in CMD or Powershell
- `./bin/SSL.sh` in Bash

Run the project using:
- `.\bin\run` in CMD or Powershell
- `./bin/run.sh` in Bash

## License
- Do not deploy this application on any cloud platform or machine
- Use this project for testing and learning only
