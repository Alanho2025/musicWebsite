import jwt from "jsonwebtoken";
export function getUsernameFromJWT(token) {
    // Decode token; will throw an error if the token is invalid or expired.
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    if (!decoded.username) throw `JWT is valid but did not contain a username.`;
    return decoded.username;
}
export function createUserJWT(username, expiresIn = "24h") {
    return jwt.sign({ username }, process.env.JWT_KEY, { expiresIn });
}