// Importing necessary functions and modules
"use server"
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Department, User } from './models';
import { connectToDb } from './utils';
import { signIn } from "../auth";
import bcrypt from "bcrypt";

// Function to add a new user to the database
export const addUser = async (formData) => {
    // Destructuring form data to get individual fields
    const { name, surname, email, phone, password, isManager, status, manager } = Object.fromEntries(formData)
    
    try {
        // Connecting to the database
        connectToDb();

        // Generating a salt and hashing the password using bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        // Creating a new User instance with the provided data
        const newUser = new User({
            name, 
            surname, 
            email, 
            phone, 
            password: hashedPassword, 
            isManager, 
            status, 
            manager
        })
        
        // Logging the new user information
        console.log("new user", newUser);

        // Saving the new user to the database
        await newUser.save();
    } catch (error) {
        // Logging any errors and throwing a new error
        console.log(error);
        throw new Error("Failed to create new user")
    }
    
    // Refreshing the specified path and redirecting to the same path
    revalidatePath('/dashboard/users');
    redirect('/dashboard/users');
}

// Function to update an existing user in the database
export const updateUser = async (formData) => {
    // Destructuring form data to get individual fields
    const { id, name, surname, email, phone, password, isManager, status, manager } = Object.fromEntries(formData)

    try {
        // Connecting to the database
        connectToDb();
        
        // Creating an object with fields to be updated
        const updateFields = {
            name, 
            surname, 
            email, 
            phone, 
            password, 
            isManager, 
            status, 
            manager
        }

        // Removing empty or undefined fields from the update object
        Object.keys(updateFields).forEach(
            (key) => 
            (updateFields[key] === '' || updateFields[key] === undefined) && delete updateFields[key]
        );

        // Updating the user in the database using the provided ID and update fields
        await User.findByIdAndUpdate(id, updateFields);
    } catch (error) {
        // Logging any errors and throwing a new error
        console.log(error);
        throw new Error("Failed to update user")
    }
    
    // Refreshing the specified path and redirecting to the same path
    revalidatePath('/dashboard/users');
    redirect('/dashboard/users');
}

// Function to update an existing department in the database
export const updateDepartment = async (formData) => {
    // Destructuring form data to get individual fields
    const { id, name, status, manager } = Object.fromEntries(formData)

    try {
        // Connecting to the database
        connectToDb();

        // Creating an object with fields to be updated
        const updateFields = {
            name, 
            status, 
            manager
        }

        // Removing empty or undefined fields from the update object
        Object.keys(updateFields).forEach(
            (key) => 
            (updateFields[key] === '' || updateFields[key] === undefined) && delete updateFields[key]
        );

        // Updating the department in the database using the provided ID and update fields
        await Department.findByIdAndUpdate(id, updateFields);
    } catch (error) {
        // Logging any errors and throwing a new error
        console.log(error);
        throw new Error("Failed to update department")
    }
    
    // Refreshing the specified path and redirecting to the same path
    revalidatePath('/dashboard/departments');
    redirect('/dashboard/departments');
}

// Function to add a new department to the database
export const addDepartment = async (formData) => {
    // Destructuring form data to get individual fields
    const { name, manager, status } = Object.fromEntries(formData)

    try {
        // Connecting to the database
        connectToDb()

        // Creating a new Department instance with the provided data
        const newDepartment = new Department({
            name, 
            manager, 
            status
        })

        // Saving the new department to the database
        await newDepartment.save();
    } catch(error) {
        // Logging any errors and throwing a new error
        console.log(error);
        throw new Error('Could not add new department')
    }
    
    // Refreshing the specified path and redirecting to the same path
    revalidatePath('/dashboard/departments');
    redirect('/dashboard/departments');
};

// Function to delete a user from the database
export const deleteUser = async (formData) => {
    // Destructuring form data to get the user ID
    const { id } = Object.fromEntries(formData)

    try {
        // Connecting to the database
        connectToDb()

        // Deleting the user from the database using the provided ID
        await User.findByIdAndDelete(id)
    } catch(error) {
        // Logging any errors and throwing a new error
        console.log(error);
        throw new Error('Could not delete user')
    }
    
    // Refreshing the specified path
    revalidatePath('/dashboard/users');
};

// Function to delete a department from the database
export const deleteDepartment = async (formData) => {
    // Destructuring form data to get the department ID
    const { id } = Object.fromEntries(formData)

    try {
        // Connecting to the database
        connectToDb()

        // Deleting the department from the database using the provided ID
        await Department.findByIdAndDelete(id)
    } catch(error) {
        // Logging any errors and throwing a new error
        console.log(error);
        throw new Error('Could not delete department')
    }
    
    // Refreshing the specified path
    revalidatePath('/dashboard/departments');
};

// Function to authenticate a user
export const authenticate = async (formData) => {
    // Destructuring form data to get email and password
    const { email, password } = Object.fromEntries(formData)
    
    try {
        // Authenticating the user using the provided email and password
        await signIn("credentials", { email, password })
    } catch (error) {
        // Logging any errors and throwing the same error
        console.log(error)
        throw error
    }
}


