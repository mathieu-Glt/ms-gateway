"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataBaseSource = void 0;
var typeorm_1 = require("typeorm");
var dataBaseSource = /** @class */ (function () {
    function dataBaseSource() {
    }
    dataBaseSource.AppDataSource = new typeorm_1.DataSource({
        type: "mysql",
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT),
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        synchronize: true,
        logging: false,
        entities: ["./src/entities/*{.ts, .js}"],
        migrations: [],
        subscribers: []
    });
    return dataBaseSource;
}());
exports.dataBaseSource = dataBaseSource;
//# sourceMappingURL=data-source.js.map