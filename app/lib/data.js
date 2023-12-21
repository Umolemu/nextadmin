// Importing necessary modules and functions
import { Department, User } from './models'
import { connectToDb } from './utils'

// Function to fetch a paginated list of users based on a search query
export const fetchUsers = async (q, page) => {
    // Creating a case-insensitive regular expression for the search query
    const regex = new RegExp(q, "i");

    // Setting the number of items per page
    const ITEMS_PER_PAGE = 5;
    try {
        // Connecting to the database
        connectToDb();

        // Counting the total number of users matching the search query
        const count = await User.find({ name: { $regex: regex } }).count();

        // Fetching a paginated list of users based on the search query
        const users = await User.find({ name: { $regex: regex } }).limit(ITEMS_PER_PAGE).skip(ITEMS_PER_PAGE * (page - 1));

        // Returning the count and the paginated list of users
        return { count, users };
    } catch (error) {
        // Logging any errors and throwing a new error
        console.log(error);
        throw new Error("Failed to fetch users");
    }
}

// Function to fetch a single user by ID
export const fetchUser = async (id) => {
    try {
        // Connecting to the database
        connectToDb();

        // Fetching a user by ID
        const user = await User.findById(id);

        // Returning the user
        return user;
    } catch (error) {
        // Logging any errors and throwing a new error
        console.log(error);
        throw new Error("Failed to fetch user");
    }
}

// Function to fetch a paginated list of departments based on a search query
export const fetchDepartments = async (q, page) => {
    // Creating a case-insensitive regular expression for the search query
    const regex = new RegExp(q, "i");

    // Setting the number of items per page
    const ITEMS_PER_PAGE = 5;
    try {
        // Connecting to the database
        connectToDb();

        // Counting the total number of departments matching the search query
        const count = await Department.find({ name: { $regex: regex } }).count();

        // Fetching a paginated list of departments based on the search query
        const departments = await Department.find({ name: { $regex: regex } }).limit(ITEMS_PER_PAGE).skip(ITEMS_PER_PAGE * (page - 1));

        // Returning the count and the paginated list of departments
        return { count, departments };
    } catch (error) {
        // Logging any errors and throwing a new error
        console.log(error);
        throw new Error("Failed to fetch Departments!");
    }
}

// Function to fetch a single department by ID
export const fetchDepartment = async (id) => {
    try {
        // Connecting to the database
        connectToDb();

        // Fetching a department by ID
        const department = await Department.findById(id);

        // Returning the department
        return department;
    } catch (error) {
        // Logging any errors and throwing a new error
        console.log(error);
        throw new Error("Failed to fetch department");
    }
}

// Function to fetch a list of managers
export const fetchManagers = async () => {
    try {
        // Connecting to the database
        connectToDb();

        // Fetching all users from the database
        const users = await User.find({});

        // Filtering users to get only those marked as managers
        const managers = users.filter(user => user.isManager === 'Yes');

        // Returning the list of managers
        return managers;
    } catch (error) {
        // Logging any errors and throwing a new error
        console.log(error);
        throw new Error("Failed to fetch user");
    }
}

// Function to fetch all users from the database
export const fetchUsersOnce = async () => {
    try {
        // Connecting to the database
        connectToDb();

        // Fetching all users from the database
        const users = await User.find({})

        // Returning the list of users
        return users;
    } catch (error) {
        // Logging any errors and throwing a new error
        console.log(error);
        throw new Error("Failed to fetch users");
    }
}

// Function to fetch all departments from the database
export const fetchDepartmentsOnce = async () => {
    try {
        // Connecting to the database
        connectToDb();

        // Fetching all departments from the database
        const departments = await Department.find({})

        // Returning the list of departments
        return departments;
    } catch (error) {
        // Logging any errors and throwing a new error
        console.log(error);
        throw new Error("Failed to fetch Departments!");
    }
}
