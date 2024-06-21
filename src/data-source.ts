import { DataSource } from "typeorm";
import { User } from "./entities/User.entity";

export class dataBaseSource {

    static AppDataSource = new DataSource({
        type: "mysql", 
        host:  process.env.DATABASE_HOST, 
        port: parseInt(process.env.DATABASE_PORT), 
        username: process.env.DATABASE_USER, 
        password: process.env.DATABASE_PASSWORD, 
        database: process.env.DATABASE_NAME, 
        synchronize: true, 
        logging: false, 
        entities: [User],
        migrations: [],
        subscribers: []
    })
}