import type { RouteOptions } from 'fastify';
import * as usersController from './users.controllers';
import * as errHandler from "./user.errorhandler";

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
    errorHandler:errHandler.errSingleUserbyID
    // schema: GetUserSchema,
};
const postCreateUserRoute: RouteOptions = {
    method: 'POST',
    url: '/createuser',
    handler: usersController.postCreateUser,
    errorHandler: errHandler.errCreateUser
    // schema: PostUserSchema,
};

const putUpdateUserRoute: RouteOptions = {
    method: 'PUT',
    url: '/updateuser/:id',
    handler: usersController.putUpdateUser,
    errorHandler: errHandler.errUpdateUser
    // schema: PutUserSchema,
};
const deleteUserRoute: RouteOptions = {
    method: 'DELETE',
    url: '/deleteuser/:id',
    handler: usersController.deleteUser,
    errorHandler: errHandler.errDeleteUser
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