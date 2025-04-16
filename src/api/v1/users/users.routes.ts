import type { RouteOptions } from 'fastify';
import * as usersController from './users.controllers';

const getAllUserRoute: RouteOptions = {
    method: 'GET',
    url: '/getallusers',
    handler: usersController.getAllUsers,
    // schema: GetUsersSchema,
};

const getUserRoute: RouteOptions = {
    method: 'GET',
    url: '/:id',
    handler: usersController.getSingleUserbyID,
    // schema: GetUserSchema,
};
const postCreateUserRoute: RouteOptions = {
    method: 'POST',
    url: '/createuser',
    handler: usersController.postCreateUser,
    // schema: PostUserSchema,
};

const putUpdateUserRoute: RouteOptions = {
    method: 'PUT',
    url: '/updateuser/:id',
    handler: usersController.putUpdateUser,
    // schema: PutUserSchema,
};
const deleteUserRoute: RouteOptions = {
    method: 'DELETE',
    url: '/deleteuser/:id',
    handler: usersController.deleteUser,
    // schema: DeleteUserSchema,
};

const userRoutes = [
    getAllUserRoute,
    getUserRoute,
    postCreateUserRoute,
    putUpdateUserRoute,
    deleteUserRoute,
];

export default userRoutes;