"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
require("dotenv/config");
// import { Routes } from "./routes";
var body_parser_1 = __importDefault(require("body-parser"));
var nats_1 = require("./nats");
var data_source_1 = require("./data-source");
var routes_1 = require("./routes");
data_source_1.dataBaseSource.AppDataSource.initialize().then(function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, port, natsUtils;
    return __generator(this, function (_a) {
        require('dotenv').config();
        app = (0, express_1.default)();
        app.use(body_parser_1.default.json());
        port = process.env.PORT;
        natsUtils = new nats_1.NatsUtils();
        // router.get('/unknowuser/movies', tintinController.getAllTintins);  // "OK"  
        // // route qui récupère les films les mieux notés jusqu'a 7 films
        // router.get('/tintin/best/rate', withAuth, tintinController.getTintinBestRate) // "OK" 
        // // route qui récupère les films les mieux notés jusqu'a 7 films pour un utilisateur non connecté
        // router.get('/tintin/best/rate/unknowuser',  tintinController.getTintinBestRate) // "OK" 
        // // route qui permet de poster une note sur un film
        // router.patch('/movie/rate', withAuth, tintinController.updateRateTintin) // "ok"
        /**
         *
         * Either we declare the routes of the application as above or as below
         * route qui renvoie tous les films de tintin pour les utilisateurs non inscrits
            router.get('/unknowuser/movies', tintinController.getAllTintins);  // "OK"
        
         */
        routes_1.Routes.forEach(function (route) {
            app[route.method](route.route, function (req, res, next) {
                var result = (new route.controller)[route.action](req, res, next);
                if (result instanceof Promise) {
                    result.then(function (result) { return result !== null && result !== undefined ? res.send(result) : undefined; });
                }
            });
        });
        natsUtils.subscribe('subject1', function (msg) { return __awaiter(void 0, void 0, void 0, function () {
            var message, products;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Message received in Server2:", msg);
                        message = msg.message, products = msg.products;
                        console.log("Message: ".concat(message));
                        console.log('Products:', products);
                        return [4 /*yield*/, natsUtils.emit('subject2', { response: 'Hello from Server2' })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        natsUtils.subscribe('test', function (msg) { return __awaiter(void 0, void 0, void 0, function () {
            var _a, message, products, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log("Message received in test:", msg);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        _a = JSON.parse(msg), message = _a.message, products = _a.products;
                        console.log("Message: ".concat(message));
                        console.log('Products:', products);
                        return [4 /*yield*/, natsUtils.emit('subject2', JSON.stringify({ response: 'Hello from test' }))];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _b.sent();
                        console.error("Error parsing JSON message", error_1.message);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        app.listen(port, function () {
            console.log("[server]: Server is running at http://localhost:".concat(port));
        });
        return [2 /*return*/];
    });
}); });
//# sourceMappingURL=index.js.map