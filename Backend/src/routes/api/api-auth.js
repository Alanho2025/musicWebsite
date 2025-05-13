import express from "express";
import { getUserWithCredentials } from "../../data/users-dao.js";
import { createUserJWT } from "../../utils/jwt-utils.js";

const router = express.Router();

/**
 * Sending a POST request to /api/auth with a valid username and password will authenticate a user (log that user in) and
 * return the JWT auth token set as the "authToken" HTTP-only cookie. In addition, the user's username will be sent back
 * as JSON, in the response. This can be used to display the user's username on the frontend if required.
 *
 * If the user is already logged in, this will remove any old login details and replace the cookie with the new one.
 *
 * Sending invalid credentials will result in a 401. No difference between invalid username and invalid password.
 */
router.post("/", (req, res) => {
    const { username, password } = req.body;

    try {
        const user = getUserWithCredentials(username, password);

        if (!user) {
            return res.sendStatus(401); // Unauthorized
        }

        const authToken = createUserJWT(user);

        res.cookie("authToken", authToken, {
            path: "/",
            httpOnly: true,
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
        });

        res.json({ username: user.username });
    } catch (err) {
        console.error("Login error:", err);
        res.sendStatus(500);
    }
});

/**
 * Sending a DELETE request to /api/auth will invalidate the authToken cookie, essentially causing that user to be logged out.
 *
 * Since there's no harm in invalidating a cookie which doesn't exist, we don't need to check if the user is actually logged in
 * or not first.
 */
router.delete("/", (req, res) => {
    // TODO Complete me
    res.clearCookie("authToken", {
        path: "/",
        httpOnly: true
    });

    res.sendStatus(204); // 204 
});

export default router;
