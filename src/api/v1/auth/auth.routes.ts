import type { RouteOptions } from 'fastify';
import * as usersController from './auth.controllers';
import * as errHandler from "./auth.errorhandlers";

// const getAllUserRoute: RouteOptions = {
//     method: 'GET',
//     url: '/getallusers',
//     // handler: usersController.getAllUsers,
//     // schema: GetUsersSchema,
// };

// const getUserRoute: RouteOptions = {
//     method: 'GET',
//     url: '/:id',
//     handler: usersController.userRegistration,
//     // errorHandler:errHandler.errSingleUserbyID
//     // schema: GetUserSchema,
// };
const postCreateUserRoute: RouteOptions = {
    method: 'POST',
    url: '/signup',
    handler: usersController.userRegistration,
    errorHandler: errHandler.errUserRegistration
    // schema: PostUserSchema,
};

const authRoutes = [
    postCreateUserRoute,
];

export default authRoutes;