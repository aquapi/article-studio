# Article Studio

## Functions
- Creating articles
- Editing articles by Github Markdown
- Publishing articles
- Sign up, login
- Voting articles
- Sort by articles views, votes

## Configure project
- Create a file named `.env`
- provide environment variables:
    + EMAIL: Your email
    + PASSWORD: Your email password
    + DB_URL: Your MongoDB URL
    + SESSION_SECRET: Anything you want (should be machine-generated)
- Generate an SSL certificate in directory `ssl`
    + Private key: `key.pem`
    + Certificate: `cert.pem`
