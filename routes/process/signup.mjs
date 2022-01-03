import app from "../../app/loaders/express.mjs";
import auth from "../../app/loaders/passport.mjs";

// sign up process
app.post("/signupprocess", auth.signup);