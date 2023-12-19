import { Department, User } from './models'
import { connectToDb } from './utils'

export const fetchUsers = async (q,page) => {
    const regex = new RegExp(q, "i");

    const ITEM_PER_PAGE = 1;
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

export const fetchDepartments = async (q,page) => {
    const regex = new RegExp(q, "i");

    const ITEM_PER_PAGE = 1;
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