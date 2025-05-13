import yup from "yup";
import sqlite3 from 'sqlite3';
import path from 'path';
import { promisify } from 'util';
import { fileURLToPath } from 'url';



const __dirname = path.dirname(new URL(import.meta.url).pathname);
const dbPath = path.resolve(__dirname, 'users.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Failed to open database:', err.message);
    } else {
        console.log('Connected to the users.db database.');
    }
});
const dbRun = promisify(db.run.bind(db));
const dbAll = promisify(db.all.bind(db));


export const createUserSchema = yup.object({
    first_name: yup.string().required("❗ first_name is required"),
    last_name: yup.string().required("❗ last_name is required"),
    username: yup.string().required("❗ username is required"),
    password: yup.string().min(6, "❗ password must be at least 6 characters").required("❗ password is required"),
    email: yup.string().email("❗ invalid email format").required("❗ email is required"),
    birthday: yup.date().typeError("❗ birthday must be a valid date").required("❗ birthday is required"),
    gender: yup.string().oneOf(["female", "male", "nonbinary", "prefer-not-to-say"], "❗ invalid gender value").required("❗ gender is required"),
    phone: yup.string().notRequired(),
    avatar_url: yup.string().url("❗ avatar_url must be a valid URL").nullable()
}).required();
function dbRunWithLastID(sql, ...params) {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
            if (err) {
                return reject(err);
            }
            resolve({ lastID: this.lastID });
        });
    });
}
export async function createUser(userData) {
    try {
        console.log("📥 Received user data:", userData);

        const newUser = createUserSchema.validateSync(userData, {
            abortEarly: false,
            stripUnknown: false
        });

        console.log("✅ Validation passed. Inserting into DB...");

        const result = await dbRunWithLastID(
            `
            INSERT INTO Users (
                first_name,
                last_name,
                username,
                email,
                password,
                birthday,
                gender,
                phone,
                avatar_url
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            `,
            newUser.first_name,
            newUser.last_name,
            newUser.username,
            newUser.email,
            newUser.password,
            newUser.birthday,
            newUser.gender,
            newUser.phone,
            newUser.avatar_url
        );

        newUser.id = result.lastID;
        console.log("🎉 User successfully created with ID:", newUser.id);
        return newUser;

    } catch (err) {
        if (err.name === 'ValidationError') {
            console.error("🚫 Validation errors:");
            err.inner.forEach(e => {
                console.error(` - ${e.path}: ${e.message}`);
            });
        } else {
            console.error("💥 Unexpected error during user creation:", err.message || err);
        }
        throw err;
    }
}

export async function retrieveUsers() {
    const users = await dbAll("SELECT * FROM Users");
    return users;
}

export async function retrieveUsersSearch(search) {
    // 如果沒提供搜尋字串，就回傳所有使用者
    if (!search || search.trim().length === 0) {
        return await retrieveUsers();
    }

    const lowercaseSearch = search.toLowerCase();

    const users = await db.all(
        `
        SELECT * FROM Users
        WHERE
            LOWER(first_name) LIKE ?
            OR LOWER(last_name) LIKE ?
            OR LOWER(username) LIKE ?
            OR LOWER(email) LIKE ?
            OR LOWER(phone) LIKE ?
            OR LOWER(gender) LIKE ?
        `,
        `%${lowercaseSearch}%`,
        `%${lowercaseSearch}%`,
        `%${lowercaseSearch}%`,
        `%${lowercaseSearch}%`,
        `%${lowercaseSearch}%`,
        `%${lowercaseSearch}%`
    );

    return users;
}

export async function getUserWithUsername(username) {
    if (!username) return null;

    const user = await db.get(
        `
        SELECT * FROM Users
        WHERE username = ?
        `,
        username
    );

    return user || null;
}
const dbGet = promisify(db.get.bind(db));

export async function getUserWithCredentials(username, password) {
    if (!username || !password) return null;

    const user = await dbGet(
        `SELECT * FROM Users WHERE username = ? AND password = ?`,
        username,
        password
    );

    return user || null;
}