import { DataSource } from "typeorm";

export const dBase: DataSource = new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    synchronize: true,
    logging: false,
    entities: [`${__dirname}**/models/*.{ts,js}`],
    migrations: [`${__dirname}**/migrations/*.{ts,js}`]
});


