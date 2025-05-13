import express from "express";
import dotenv from "dotenv";
dotenv.config();

import {
    createUser,
    retrieveUsers,
    retrieveUsersSearch
} from "../../data/users-dao.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        // Create the new customer, create a location based on its id, and send everything back with a 201.
        const newUser = await createUser(req.body);
        const location = `/api/users/${newUser.id}`;
        return res.status(201).location(location).json(newUser);
    } catch (err) {
        // console.err(err); // Log the error to console...

        // The createCustomer function will throw an error if it fails, so we can catch that error
        // to return the appropriate status code. We will also return the error message as JSON
        // (we don't have to do that, but could be useful for debug purposes).
        return res.status(422).json(err.errors);
    }
});
router.get("/", async (req, res) => {
    const search = req.query.search;

    if (!search) return res.json(await retrieveUsers());

    return res.json(await retrieveUsersSearch(search));
});

export default router;