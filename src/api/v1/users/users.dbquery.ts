
import { ValidationError } from "sequelize";
import UserModel from "./users.models";

export const DB_getAllUser = async () => {
    try {
        const UserList = UserModel.findAll({
            // where: {
            //     id: 2,
            // },
        });
    } catch (error) {

    }
}

export const DB_getUser = async (id: number) => {
    try {
        // Use the decorated Sequelize instance
        const user = await UserModel.findByPk(id);
        return user;
    } catch (error) {
        return { message: 'Failed to retrieve users' }
    }
}

export const DB_createUser = async (user: Iuser) => {
    try {
        const { name, email } = user;
        if (!name || !email) {
            throw new Error("Name and email are required.");
        }

        // Check if email already exists before creating a new user
        const existingUser = await UserModel.findOne({ where: { email: user.email } });
        if (existingUser) {
            return {
                message: `Email already exists: ${existingUser.dataValues.email}`,
                userCreated: null
            }
        };

        const newUser = await UserModel.create({ name, email });
        return {
            message: `New user is created with id:${newUser.dataValues.id}`,
            userCreated: newUser
        };
    }
    catch (error) {
        // console.error("Error creating user:", error);
        if (error instanceof ValidationError) {
            if (error.errors.map((e) => e.message == "invalidEmailCategory")) {
                return {
                    message: "Pls provide validated emails",
                    userCreated: null
                }
            }
            return { message: "Validation Error", errors: error.errors.map((e) => e.message) };
        }
        return { message: "Failed to create a new user" };
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
                return {
                    message: `Email already exists: ${existingUser.dataValues.email}`,
                    userCreated: null
                }
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
        if (error instanceof ValidationError) {
            if (error.errors.map((e) => e.message == "invalidEmailCategory")) {
                return {
                    message: "Pls provide validated emails",
                    userUpdated: null
                }
            }
            return { message: "Validation Error", errors: error.errors.map((e) => e.message) };
        }
        return { message: "Failed to update user" };
    }
};