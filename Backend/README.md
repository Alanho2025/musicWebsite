# CS719 Lab - REST and API Design

In this lab, we'll first build on the previous lab by organizing our code properly using express routers, and by adding some validation of incoming client requests. We will then do an API design exercise, and implement the API you just designed.

## Exercise One - Express routers

Let's start by organizing our code from the last lab!

This lab, as given to you, contains the model solution for the previous lab (how convenient!). In [`app.js`](./src/app.js) lines 34 - 98, we have defined several route handlers allowing us to create, retrieve, update, and delete todo items. These routes use the [`todos-dao.js`](./src/data/todos-dao.js) functions which have been imported on line 14.

For this exercise, we want to maintain the exact functionality of this express server, while organizing our code better by moving those route handlers out of `app.js` into their own file, using express routers.

We recommend the following structure for your routes. If you decide to differ from this structure, make sure you have a **strong** reason for doing so - and check whether it is ok by consulting with one of the teaching staff!

- Your main `app.js` imports and mounts a router located at `routes/routes.js` (see below), at path **/**.

  - Your `routes/routes.js` file contains a router which imports and mounts a router located at `routes/api/api.js` (see below), at path **/api**.

    - Your `routes/api/api.js` file contains a router which imports and mounts a router located at `routes/api/api-todos.js` (see below), at path **/todos**.

      - Your `routes/api/api-todos.js` file contains a router which contains all the route handlers which were previously defined in `app.js`. Their paths should be changed to be relative to the parent router - e.g. **/** instead of **/api/todos**, and **/:id** instead of **/api/todos/:id**.

For an example of this kind of structure, please see the provided example code.

When complete, you should be able to access all of your route handlers using exactly the same URLs as you previously could. Make sure to test this for all routes.

## Exercise Two - Client request validation

Currently, our routes are functional, but contain no validation logic. Malicious or careless clients can send us junk JSON data, which our application might happily use to modify our "database" (the `todos` array). We want to prevent this!

Luckily, we can use packages such as [yup](https://www.npmjs.com/package/yup#arrayensure-this) to do some pretty complex data validation for incoming client requests.

### Validating "create todo" request

Firstly, we will validate requests to create new todo items (to endpoint `POST /api/todos`). We give step-by-step instructions here (but feel free to try yourself if you like!).

1. Firstly, in `todos-dao.js`, import the yup package near the top of the file (it is already installed in `package.json`):

   ```js
   import yup from "yup";
   ```

2. Next, create a _schema_ for the "create todo" request, called `createTodoSchema` (anywhere in the code is fine, but probably just before the `createTodo()` function makes the most sense). When creating a new todo item, new todos must have a `title` and a `dueDate`.

   - The `title` must be a string of at least three characters.
   - The `dueDate` must be a string that is also a valid `dayjs` date.

   The schema for this is given below. Note the use of the `test()` function to add the custom test for a valid dayjs date. If we need to, we can use this function to write custom validation logic, in the cases where the default yup functions don't suffice.

   ```js
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
   ```

3. Once we have our schema, let's use it. In the `createTodo()` function, use its `validateSync()` method to create an object containing the validated input data:

   ```js
   const validatedInput = createTodoSchema.validateSync(
     { title, dueDate }, // First argument
     { abortEarly: false, stripUnknown: true } // Second argument
   );
   ```

   The first argument is the object containing the data to validate. In this case, its an object consisting of the `title` and `dueDate` supplied to the `createTodo()` function.

   The second argument is configuration options. `abortEarly` set to `false` will make sure the validation logic runs on all properties to produce a better error message. `stripUnknown` will remove all unknown properties from the input.

4. Now that we have our validated data, use it when creating the new todo:

   ```js
   const newTodo = {
     id: todos.length + 1,
     isComplete: false,
     ...validatedInput
   };
   ```

   This code creates a new JS object with the given `id`, `isComplete`, and all properties contained within `validatedInput` (i.e. the `title` and `dueDate`, which we know by this point are valid). See this article on the [JS spread operator](https://www.freecodecamp.org/news/three-dots-operator-in-javascript/) for more info about the `...` syntax.

5. The `validateSync()` function above will throw an error if validation fails. So, for the last step, let's handle that. In `api-todos.js`, in the "create todo" route handler, add a `try` / `catch` block around the existing code. If an error occurs, return a `422` status code. Optionally, you can also return JSON detailing the errors, like so:

   ```js
   try {
     // Create todo, send 201 response
   } catch (err) {
     res.status(422).send(err.errors);
   }
   ```

   The `err` object is the error thrown by Yup. It adds an `errors` property, which is an array of reasons for the validation failure, e.g. "title must have at least three characters" or "dueDate must be a valid date string".

### Validating "update todo" request

Now, let's write some _similar_ (but _not_ exactly the same!) code to validate requests to update todos.

1. A valid "update todo" request will _optionally_ contain up to three values (all three are optional this time):

   - A `title`, which must be a string of at least three characters in length.
   - A `dueDate`, which must be a valid dayjs date.
   - An `isComplete`, which must be a boolean.

   All three are optional. But, if they are included, they must be valid.

2. This time, the object to validate is the entire `updateData` object supplied to the `updateTodo()` function.

3. Remember to change the `Object.assign(...)` line to use your _validated_ update data, rather than the raw `updateData`.

4. In the `api-todos.js` "update todo" route handler, we are already handling an error, because we are already throwing an error in our `updateTodo()` function if a todo isn't found. Modify this error handling code to return either a `404` error (if the todo wasn't found) or a `422` error (if the client input was invalid).

One way to do this could be to check for the existence of the `errors` property in the `err` object. If it exists (i.e. if `err.errors !== undefined`), it means the error is a validation error. Otherwise, it's a "todo not found" error.

## Exercise Three - Pet adoption service - API Design

Consider the following description for a REST service given to you by a client:

"We would like to create a REST service for a pet adoption service. We store a list of _pets_ who need adoption. Each pet has an id, name, age, species, breed, gender, and medical records (medical records are a simple string detailing any procedures the animal has had e.g. being neutered) Each pet also has an indication of whether or not it has already been adopted (true or false). Users of the system must be able to add new pets to the system, as well as delete them. Users must also be able to retrieve pets in different ways:

- Retrieve a list of all pets _who are not adopted_
- Retrieve a pet with a known id (whether or not it's adopted)
- Search for pets based on species, breed, and / or gender (_only_ return pets who are not adopted).

Users must also be able to create _adoption records_. Each adoption record has an id, a date when the adoption took place, the name of the user who made the adoption, and the id of the pet which was adopted. When an adoption record is created, "is adopted" status of that pet above should be set to true, in addition to creating the adoption record.

Finally, users must be able to get individual adoption records by id, and get a list of all of their own adoption records.

In the space below, create a REST API for the above service. For each REST endpoint (route), consider:

1. Title - What is this endpoint for, in English?
2. HTTP method
3. Path (noting any path parameters)
4. Required query parameters, if any (and whether or not they are optional)
5. Required information in request body, if any
6. Possible responses, including:

   - Status code
   - Response body
   - Any other info e.g. headers
   - When would this response be returned?

Be sure to consider error cases as well, not just success cases. For example, what happens if users supply wrong information? What happens when finding a pet with an id that doesn't exist? What happens when trying to adopt a pet who is already adopted? Etc.

You can see the "retrieve a pet by id" endpoint below already, for an example of what to do.

**Strong recommendation:** Work in pairs or small groups on Exercises Three and Four! Discuss and collaborate! And, get input from the teaching staff! Also remember that there's no one right answer to this exercise (but there are a lot of wrong answers, such as not handling all cases, or following poor APId design principles).

### TODO Your answer here

#### 1. GET /api/pets/:petId - Get a pet with a known id

- Path parameter `:id:`: the id of the pet to find
- Required query params: N/A
- Request body: N/A
- Possible responses:
  - If pet is found, `200 OK` response with JSON representation of the pet
  - Otherwise, `404 Not Found` response.

## Exercise Four - Pet adoption service - Implementation

For the final exercise of this lab, implement the pet adoption service you have defined in Exercies Three. Feel free to use ChatGPT or similar to generate some pets to add to your system initially. Remember:

- Separate your routes into different files (using express routers) according to the kind of resources they deal with - for example, pets and adoption records.

- Create a "dao" file with the data access functions, to separate that logic from your route handling logic. It will make the code easier to switch over to use an actual database later, as opposed to storing our data in arrays. It also makes the code easier to understand.

- Remember to use Yup validators to handle the validation of incoming client requests.

- You don't have to implement the full Create / Retrieve / Update / Delete functionality for each type of resource - focus only on the ones required by the design specification above.
