import { getUserWithUsername } from "../data/users-dao.js";
import { getUsernameFromJWT } from "../utils/jwt-utils.js";

/**
 * TODO: Create a middleware which will get the auth JWT from req.cookies.authToken, verify it, find the matching user, and add it to req.user.
 *
 * If any of those processes fail, a 401 status will be returned. Otherwise, the next() function will be called to continue executing
 * your route handlers.
 */
export function requiresAuthentication(req, res, next) {
    // TODO Complete this function
    console.log({ cookies: req.cookies })
    const token = req.cookies?.authToken;

    if (!token) {
        return res.sendStatus(401); // No token = not authenticated
    }

    let user;
    try {
        user = getUsernameFromJWT(token);
    } catch (err) {
        console.error("Invalid JWT:", err);
        return res.sendStatus(401); // Token malformed or invalid
    }
    console.log({ user })
    const userinfo = getUserWithUsername(user.username);

    if (!userinfo) {
        return res.sendStatus(401); // No such user
    }

    req.user = userinfo; // Attach user to request
    next(); // Pass control to the next middleware/handler
}
