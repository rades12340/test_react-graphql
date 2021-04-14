import { Sequelize } from "sequelize-typescript";

import Item from "./enteties/Item";
import User from "./enteties/User";

export const sequelize = new Sequelize({
    models: [Item, User],
    logging: false,
    dialect: 'sqlite',
    storage: 'src/db/database.sqlite'
});

export default async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await sequelize.sync();
        console.log("All models were synchronized successfully.");
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
} 