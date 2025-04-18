import UserModel from "./users.models";
import type { Iuser } from "../../../types/user";
import { ValidationError } from "../../../configs/utils/errorhandlers/errors.handler";

export const DB_getAllUser = async () => {
    try {
        const UserList = UserModel.findAll();
        return UserList;
    } catch (error) {
        return error;
    }
}

export const DB_getUser = async (id: number) => {
    try {
        // Use the decorated Sequelize instance
        const user = await UserModel.findByPk(id);
        return user;
    } catch (error) {
        // return { message: 'Failed to retrieve users' } 
        return error;
    }
}

export const DB_createUser = async (user: Iuser) => {
    try {
        const { name, email, password } = user;
        if (!name || !email) {
            throw new Error("Name and email are required.");
        }

        // Check if email already exists before creating a new user
        const existingUser = await UserModel.findOne({ where: { email: user.email } });
        if (existingUser) {
            throw new ValidationError(`Email already exists: ${existingUser.dataValues.email}`)
        };

        const newUser = await UserModel.create({ name, email, password });
        return {
            message: `New user is created with id:${newUser.dataValues.id}`,
            userCreated: newUser
        };
    }
    catch (error) {
        return error;
    }
}

export const DB_updateUser = async (user: Iuser) => {
    try {
        const { id, name, email } = user;
        if (!id) {
            throw new Error("User ID is required.");
        }
        const updateData: Partial<{ name: string; email: string }> = {};
        if (name && name.length > 0) updateData.name = name;
        if (email && email.length > 0) {
            const existingUser = await UserModel.findOne({ where: { email: user.email } });
            if (existingUser) {
                throw new ValidationError(`Email already exists: ${existingUser.dataValues.email}`)
            };
            updateData.email = email;
        }

        if (Object.keys(updateData).length === 0) {
            throw new Error("At least one field (name or email) must be provided.");
        }

        const [updatedRows] = await UserModel.update(updateData,
            {
                where: {
                    id: id,
                },
            },
        );

        if (updatedRows === 0) {
            throw new Error("User not found or no changes made.");
        }

        return { message: "User updated successfully", updatedFields: updateData };
    } catch (error) {
        return error;
    }
};