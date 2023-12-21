import { Department, User } from './models'
import { connectToDb } from './utils'

export const fetchUsers = async (q,page) => {
    const regex = new RegExp(q, "i");

    const ITEM_PER_PAGE = 5;
    try {
        connectToDb();
        const count = await User.find({ name: { $regex: regex } }).count();
        const users = await User.find({ name: { $regex: regex } }).limit(ITEM_PER_PAGE).skip(ITEM_PER_PAGE * (page - 1));
        return {count, users};
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch users");
    }
}

export const fetchUser = async (id) => {
    try {
        connectToDb();
        const user = await User.findById(id);
        return user;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch user");
    }
}


export const fetchDepartments = async (q,page) => {
    const regex = new RegExp(q, "i");

    const ITEM_PER_PAGE = 5;
    try {
        connectToDb();
        const count = await Department.find({ name: { $regex: regex } }).count();
        const departments = await Department.find({ name: { $regex: regex } }).limit(ITEM_PER_PAGE).skip(ITEM_PER_PAGE * (page - 1));
        return {count, departments};
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch Departments!");
    }
}

export const fetchDepartment = async (id) => {
    try {
        connectToDb();
        const department = await Department.findById(id);
        return department;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch department");
    }
}

export const fetchManagers = async () => {
    try {
        connectToDb();
        const users = await User.find({});
        const managers = users.filter(user => user.isManager === 'Yes');
        return managers;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch user");
    }
}

export const fetchUsersOnce = async () => {
    try {
        connectToDb();
        const users = await User.find({})
        return users;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch users");
    }
}

export const fetchDepartmentsOnce = async () => {
    try {
        connectToDb();
        const departments = await Department.find({})
        return departments;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch Departments!");
    }
}