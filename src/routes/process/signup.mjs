import User from "../../models/user.mjs";

// Sign up process
export default {
    path: "/signupprocess",
    method: "post",
    async handler(req, res, next) {
        const user = await User.findOne({
            username: req.body.name
        }).exec();
        if (!user) {
            // Create new user and save to database
            await new User({
                username: req.body.name,
                password: req.body.pass,
            }).save();

            // Assign session
            req.session.userID = req.body.name;
            // 200 OK
            res.writeHead(200);
        }
        // Assign session
        else if (req.body.pass === user.password) {
            req.session.userID = req.body.name;
            // 200 OK
            res.writeHead(200);
        }

        // Not success
        else {
            // 401 Unauthorized
            res.writeHead(401);
        }

        // Redirect to homepage if success
        res.end();
    }
};