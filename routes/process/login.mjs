import auth from "../../app/loaders/passport.mjs";
import app from "../../app/loaders/express.mjs";

// login process
app.post("/loginprocess", auth.login);
