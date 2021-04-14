import { ApolloServer } from "apollo-server-express";
import cookieSession from 'cookie-session';
import cors from 'cors';
import { config } from "dotenv";
import express from 'express';
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import connectDB from "./connectDB";
import { ItemResolver } from "./resolvers/Item";
import { UserResolver } from "./resolvers/User";

config()

const main = async () => {
    const app = express()

    await connectDB()

    app.use(cors({
        origin: 'http://localhost:3000',
        credentials: true
    }))

    app.use(cookieSession({
        name: process.env.TEST_COOKIE,
        secret: process.env.COOKIE_SECRET,
        sameSite: 'lax',
        secure: false,
        httpOnly: true,
        maxAge: 1 * 60 * 60 * 1000 // 1 hour 
    })
    );


    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver, ItemResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({
            req,
            res
        }),
    });

    apolloServer.applyMiddleware({ app, cors: false })

    app.listen(process.env.PORT, () => {
        console.log(`server started on localhost:${process.env.PORT}`);
    })
}


main().catch((err) => {
    console.error(err);
});