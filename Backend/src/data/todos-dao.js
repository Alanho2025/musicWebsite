import dayjs from "dayjs";
import yup from "yup";

/** Todo items */
const todos = [
  {
    id: 1,
    title: "Finish CS719 Lab 14",
    isComplete: true,
    dueDate: "2023-12-11"
  },
  {
    id: 2,
    title: "Deliver CS719 node.js lecture",
    isComplete: false,
    dueDate: "2023-12-13"
  },
  {
    id: 3,
    title: "Put up Xmas decorations",
    isComplete: true,
    dueDate: "2023-12-03"
  },
  {
    id: 4,
    title: "Attend staff Xmas function",
    isComplete: false,
    dueDate: "2023-12-11"
  }
];

// ---------- 🔍 Utility ----------
function parseBoolean(value) {
  return value !== undefined && value.toLowerCase() === "true";
}

// ---------- ✅ Validation Schemas ----------
const createTodoSchema = yup
  .object({
    title: yup.string().min(3).required(),
    dueDate: yup
      .string()
      .test("test-date", "dueDate must be a valid date string", (value) =>
        dayjs(value).isValid()
      )
      .required()
  })
  .required();

const updateTodoSchema = yup
  .object({
    title: yup.string().min(3),
    dueDate: yup
      .string()
      .test("test-date", "dueDate must be a valid date string", (value) =>
        value === undefined ? true : dayjs(value).isValid()
      ),
    isComplete: yup.boolean()
  })
  .required();

// ---------- 📥 CRUD ----------
export function retrieveTodos(search) {
  if (!search) return todos;

  let matchingTodos = todos;
  const { title, isComplete, dateMin, dateMax } = search;

  if (title) {
    matchingTodos = matchingTodos.filter((todo) =>
      todo.title.toLowerCase().includes(title.toLowerCase())
    );
  }

  if (isComplete) {
    matchingTodos = matchingTodos.filter((todo) => todo.isComplete === parseBoolean(isComplete));
  }

  if (dateMin) {
    matchingTodos = matchingTodos.filter((todo) =>
      dayjs(todo.dueDate).isAfter(dayjs(dateMin))
    );
  }

  if (dateMax) {
    matchingTodos = matchingTodos.filter((todo) =>
      dayjs(todo.dueDate).isBefore(dayjs(dateMax))
    );
  }

  return matchingTodos;
}

export function retrieveTodoById(id) {
  return todos.find((todo) => todo.id == id);
}

export function createTodo(title, dueDate) {
  const validatedInput = createTodoSchema.validateSync(
    { title, dueDate },
    { abortEarly: false, stripUnknown: true }
  );

  const newTodo = {
    id: todos.length + 1,
    isComplete: false,
    ...validatedInput
  };

  todos.push(newTodo);
  return newTodo;
}

export function updateTodo(id, updateData) {
  const todo = retrieveTodoById(id);
  if (!todo) {
    const err = new Error("Todo not found");
    err.status = 404;
    throw err;
  }

  const validatedData = updateTodoSchema.validateSync(updateData, {
    abortEarly: false,
    stripUnknown: true
  });

  Object.assign(todo, validatedData);
  return todo;
}

export function deleteTodo(id) {
  const index = todos.findIndex((t) => t.id == id);
  if (index >= 0) todos.splice(index, 1);
}
