// Configure environment variables with our .env file
import dotenv from "dotenv";
dotenv.config();

// Imports which we will use
import express from "express";
const router = express.Router();
/**
 * Some data access functions to access todo items. Some of these will
 * need to be completed by you, in todos-dao.js.
 */
import {
    createTodo,
    retrieveTodoById,
    retrieveTodos,
    updateTodo,
    deleteTodo
} from "../../data/todos-dao.js";


// TODO Your todo route handlers go here!
// ----------------------------------------------------------

/**
 * GET /api/todos - Gets a list of todo items.
 *
 * title, isComplete, dateMin, and dateMax search terms may be supplied in the query string. If they are,
 * the returned todo list will be filtered accordingly.
 *
 * This will always return a 200 OK response with a JSON array (even if the array is empty).
 */
router.get("/", (req, res) => {
    const todos = retrieveTodos(req.query);
    return res.json(todos);
});

/**
 * GET /api/todos/:id - Gets a single todo item with the id matching the path param.
 *
 * If the todo exists, it will be returned as JSON, with a 200 OK response.
 *
 * If not, then a 404 Not Found response is returned.
 */
router.get("/:id", (req, res) => {
    const todo = retrieveTodoById(req.params.id);
    if (!todo) return res.sendStatus(404);
    return res.json(todo);
});

/**
 * POST /api/todos - Creates a new todo item with the information contained in the request body.
 *
 * A 201 Created response will be returned, along with a Location header pointing to the new todo
 * item, and a JSON representation of that todo item.
 */
router.post("/todos", (req, res) => {
    const newTodo = createTodo(req.body.title, req.body.dueDate);
    return res.status(201).location(`/api/todos/${newTodo.id}`).json(newTodo);
});

/**
 * PATCH /api/todos/:id - Updates the todo with the matching id with the information in the request
 * body, if it exists. If so, returns a 204 No Content response.
 *
 * If the todo item with that id doesn't exist, a 404 Not Found response will be returned instead.
 */
router.patch("/:id", (req, res) => {
    try {
        const updatedTodo = updateTodo(parseInt(req.params.id), req.body);
        return res.json(updatedTodo);
    } catch (err) {
        if (err.errors !== undefined) {
            // Yup 驗證錯誤
            return res.status(422).send(err.errors);
        } else if (err.status === 404) {
            return res.status(404).send("Todo not found");
        } else {
            // 其他未知錯誤
            return res.status(500).send("Server error");
        }
    }
});

/**
 * DELETE /api/todos/:id - Deletes the todo item with the matching id, if it exists. Either way,
 * returns a 204 No Content response.
 */
router.delete("/:id", (req, res) => {
    deleteTodo(req.params.id);
    return res.sendStatus(204);
});

export default router;