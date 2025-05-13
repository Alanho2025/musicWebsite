import yup from "yup";
import sqlite3 from 'sqlite3';
import path from 'path';
import { promisify } from 'util';




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
    first_name: yup.string().required("First name is required"),
    last_name: yup.string().required("Last name is required"),
    username: yup.string().required("Username is required"),
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    confirmPassword: yup.string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
    birthday: yup.date().required("Birthday is required"),
    gender: yup.string().oneOf(["female", "male", "nonbinary", "prefer-not-to-say"]).required("Gender is required"),
    phone: yup.string().notRequired(),
    avatar_url: yup.string()
        .url("Avatar must be a valid URL")
        .nullable(),
    login_state: yup.boolean().default(false)
}).required();
export async function createUser(userData) {
    const newUser = createUserSchema.validateSync(userData, {
        abortEarly: false,
        stripUnknown: true // 避免多餘欄位進入資料庫
    });

    const result = await dbRun(
        `
        INSERT INTO Users (
            first_name,
            last_name,
            username,
            email,
            password,
            confirmPassword,
            birthday,
            gender,
            phone,
            avatar_url,
            login_state
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        newUser.first_name,
        newUser.last_name,
        newUser.username,
        newUser.email,
        newUser.password,
        newUser.confirmPassword,
        newUser.birthday,
        newUser.gender,
        newUser.phone,
        newUser.avatar_url,
        newUser.login_state
    );

    newUser.id = result.lastID;
    return newUser;
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