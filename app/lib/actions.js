"use server"
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Department, User } from './models';
import { connectToDb } from './utils';
import bcrypt from "bcrypt";

export const addUser = async (formData) => {
    const { name, surname, email, phone, password, isManager, status, manager } 
    = Object.fromEntries(formData)

    try {
        connectToDb();

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt)

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

        await newUser.save();
    } catch (error) {
        console.log(error);
        throw new error("Failed to create new user")
    }
    revalidatePath('/dashboard/users');
    redirect('/dashboard/users');
}

export const updateUser = async (formData) => {
    const { id, name, surname, email, phone, password, isManager, status, manager } 
    = Object.fromEntries(formData)

    try {
        connectToDb();
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

        Object.keys(updateFields).forEach(
            (key) => 
            (updateFields[key] === '' || undefined) && delete updateFields[key]
        );

        await User.findByIdAndUpdate(id, updateFields);
    } catch (error) {
        console.log(error);
        throw new error("Failed to update user")
    }
    revalidatePath('/dashboard/users');
    redirect('/dashboard/users');
}

export const updateDepartment = async (formData) => {
    const { id, name, status, manager } 
    = Object.fromEntries(formData)

    try {
        connectToDb();
        const updateFields = {
            name, 
            status, 
            manager
        }

        Object.keys(updateFields).forEach(
            (key) => 
            (updateFields[key] === '' || undefined) && delete updateFields[key]
        );

        await Department.findByIdAndUpdate(id, updateFields);
    } catch (error) {
        console.log(error);
        throw new error("Failed to update department")
    }
    revalidatePath('/dashboard/departments');
    redirect('/dashboard/departments');
}



export const addDepartment = async (formData) => {
    const {name, manager, status} 
    = Object.fromEntries(formData)

    try {
        connectToDb()
        const newDepartment = new Department({
            name, 
            manager, 
            status
        })
        await newDepartment.save();
    } catch(error) {
        console.log(error);
        throw new Error('Could not add new department')
    }
    revalidatePath('/dashboard/departments');
    redirect('/dashboard/departments');
};

export const deleteUser = async (formData) => {
    const { id } = Object.fromEntries(formData)

    try {
        connectToDb()
        await User.findByIdAndDelete(id)
    } catch(error) {
        console.log(error);
        throw new Error('Could not delete department')
    }
    revalidatePath('/dashboard/users');
};

export const deleteDepartment = async (formData) => {
    const { id } = Object.fromEntries(formData)

    try {
        connectToDb()
        await Department.findByIdAndDelete(id)
    } catch(error) {
        console.log(error);
        throw new Error('Could not delete department')
    }
    revalidatePath('/dashboard/departments');
};


