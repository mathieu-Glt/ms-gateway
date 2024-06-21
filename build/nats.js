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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NatsUtils = void 0;
var ts_nats_1 = require("ts-nats");
var NatsUtils = /** @class */ (function () {
    function NatsUtils() {
        this.nc = null;
        this.natsConnection();
    }
    NatsUtils.emit = function (arg0, arg1) {
        throw new Error("Method not implemented.");
    };
    NatsUtils.subscribe = function (arg0, arg1) {
        throw new Error("Method not implemented.");
    };
    // Méthode pour la connexion
    NatsUtils.prototype.natsConnection = function () {
        return __awaiter(this, void 0, void 0, function () {
            var options, _a, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.nc) {
                            return [2 /*return*/, this.nc];
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        options = {
                            servers: ['nats://localhost:4222']
                        };
                        _a = this;
                        return [4 /*yield*/, (0, ts_nats_1.connect)(options)];
                    case 2:
                        _a.nc = _b.sent();
                        console.log("Nats Connection established");
                        return [2 /*return*/, this.nc];
                    case 3:
                        error_1 = _b.sent();
                        console.error("Error", error_1.message);
                        throw error_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Méthode pour émettre un message sans attendre de réponse
    NatsUtils.prototype.emit = function (subject, data) {
        return __awaiter(this, void 0, void 0, function () {
            var nc, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.natsConnection()];
                    case 1:
                        nc = _a.sent();
                        nc.publish(subject, data);
                        console.log("Message sent to subject ".concat(subject));
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        console.error("Error emitting message", error_2.message);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Méthode pour envoyer un message et attendre une réponse
    NatsUtils.prototype.request = function (subject_1, data_1) {
        return __awaiter(this, arguments, void 0, function (subject, data, timeout) {
            var nc, response, error_3;
            if (timeout === void 0) { timeout = 1000; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.natsConnection()];
                    case 1:
                        nc = _a.sent();
                        return [4 /*yield*/, nc.request(subject, timeout, data)];
                    case 2:
                        response = _a.sent();
                        console.log("Response received from subject ".concat(subject));
                        return [2 /*return*/, response.data];
                    case 3:
                        error_3 = _a.sent();
                        console.error("Error requesting message", error_3.message);
                        throw error_3;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Méthode pour s'abonner à un sujet
    NatsUtils.prototype.subscribe = function (subject, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var nc, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.natsConnection()];
                    case 1:
                        nc = _a.sent();
                        nc.subscribe(subject, function (err, msg) {
                            if (err) {
                                console.error("Error in subscription", err.message);
                                return;
                            }
                            callback(msg.data);
                        });
                        console.log("Subscribed to subject ".concat(subject));
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        console.error("Error subscribing to subject", error_4.message);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return NatsUtils;
}());
exports.NatsUtils = NatsUtils;
//# sourceMappingURL=nats.js.map