import { MovieController } from "./controllers/Movie.controller";
import { UserController } from "./controllers/User.controller";
import { checkRoleUser } from "./middlewares/checkRole.middleware";
import { JwtMiddlewareAuth } from "./middlewares/Jwt.middleware";
import { AuthController } from "./controllers/Auth.controller";
import { FavorisController } from "./controllers/Favoris.controller";
import { JwtRefreshToken } from "./middlewares/JwtCheckRefreshToken.middleware";

export const Routes = [
    {
        method: "post",
        route: "/register",
        controller: AuthController,
        action: "register"
    },
    {
        method: "post",
        route: "/login",
        controller: AuthController,
        action: "login"
    },
    {
        method: "post",
        route: "/forgot-password",
        controller: AuthController,
        action: "forgotPassword"
    },
    {
        method: "post",
        route: "/auth/new-password/:uuid",
        controller: AuthController,
        action: "changePassword"
    },
    {
        method: "get",
        route: "/auth/refresh-token",
        controller: AuthController,
        action: "refreshToken",
        middleware: [JwtRefreshToken]
    },
    {
        method: "post",
        route: "/favories/:id",
        controller: FavorisController,
        action: "addMovieFavoris",
        middleware: [JwtMiddlewareAuth, checkRoleUser]
    },
    {
        method: "post",
        route: "/movies",
        controller: MovieController,
        action: "createMovie",
        middleware: [JwtMiddlewareAuth, checkRoleUser]
    },
    {
        method: "get",
        route: "/movies",
        controller: MovieController,
        action: "getAllMovies",
        // middleware: [JwtMiddlewareAuth, checkRoleUser],
    },
    {
        method: "get",
        route: "/movies/:id",
        controller: MovieController,
        action: "getOneMovie"
    },
    {
        method: "put",
        route: "/movies/:id",
        controller: MovieController,
        action: "updateMovie",
        middleware: [JwtMiddlewareAuth, checkRoleUser]
    },
    {
        method: "delete",
        route: "/movies/:id",
        controller: MovieController,
        action: "deleteMovie",
        middleware: [JwtMiddlewareAuth, checkRoleUser]
    }, 
    {
        method: "get",
        route: "/users",
        controller: UserController,
        action: "getAll",
        middleware: [JwtMiddlewareAuth, checkRoleUser]
    },
    {
        method: "get",
        route: "/users/:id",
        controller: UserController,
        action: "getOne",
        middleware: [JwtMiddlewareAuth, checkRoleUser]
    },
    {
        method: "put",
        route: "/users/:id",
        controller: UserController,
        action: "putUser",
        middleware: [JwtMiddlewareAuth, checkRoleUser]
    },
    {
        method: "patch",
        route: "/users/:id",
        controller: UserController,
        action: "patchUser",
        middleware: [JwtMiddlewareAuth, checkRoleUser]
    },
    {
        method: "delete",
        route: "/users/:id",
        controller: UserController,
        action: "deleteUser",
        middleware: [JwtMiddlewareAuth, checkRoleUser]
    },
]