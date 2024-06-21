"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
var UserController_controller_1 = require("./controllers/UserController.controller");
exports.Routes = [
    {
        method: "post",
        route: "/users",
        controller: UserController_controller_1.UserController,
        action: "test"
    },
];
//# sourceMappingURL=routes.js.map