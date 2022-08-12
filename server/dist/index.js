"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const apollo_server_core_1 = require("apollo-server-core");
const apollo_server_express_1 = require("apollo-server-express");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Team_1 = require("./entities/Team");
const User_1 = require("./entities/User");
const UserCheckAuth_1 = require("./resolvers/auth/UserCheckAuth");
const UserRegister_1 = require("./resolvers/auth/UserRegister");
const UserLogin_1 = require("./resolvers/auth/UserLogin");
const UserCreateTeam_1 = require("./resolvers/team/UserCreateTeam");
const UserUpdateTeam_1 = require("./resolvers/team/UserUpdateTeam");
const UserGetAllTeam_1 = require("./resolvers/team/UserGetAllTeam");
const UserGetSingleTeam_1 = require("./resolvers/team/UserGetSingleTeam");
const UserRemoveSingleTeam_1 = require("./resolvers/team/UserRemoveSingleTeam");
const UserRemoveAllTeam_1 = require("./resolvers/team/UserRemoveAllTeam");
const UserRemoveMultipleTeam_1 = require("./resolvers/team/UserRemoveMultipleTeam");
const mongoose_1 = __importDefault(require("mongoose"));
const express_session_1 = __importDefault(require("express-session"));
const constants_1 = require("./utils/constants");
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const UserLogout_1 = require("./resolvers/auth/UserLogout");
dotenv_1.default.config();
const main = async () => {
    const appDataSource = new typeorm_1.DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: process.env.DB_PG_USERNAME,
        password: process.env.DB_PG_PASSWORD,
        database: 'pokedex_app_db',
        synchronize: true,
        logging: false,
        entities: [User_1.User, Team_1.Team]
    });
    const app = (0, express_1.default)();
    const mongoUrl = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@pokedex-cache.ugn8zhf.mongodb.net/?retryWrites=true&w=majority`;
    await mongoose_1.default
        .connect(mongoUrl)
        .then(() => console.log('Conected to mongo DB'))
        .catch(err => console.log(err));
    app.use((0, express_session_1.default)({
        name: constants_1.COOKIE_NAME,
        store: connect_mongo_1.default.create({ mongoUrl }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true,
            secure: constants_1.__prod__,
            sameSite: 'lax'
        },
        secret: process.env.SESSION_SECRET,
        saveUninitialized: false,
        resave: false
    }));
    app.use((0, cors_1.default)({ origin: 'http://localhost:3000', credentials: true }));
    const httpServer = (0, http_1.createServer)(app);
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            validate: false,
            resolvers: [
                UserCheckAuth_1.UserCheckAuthResolver,
                UserRegister_1.UserRegisterResolver,
                UserLogin_1.UserLoginResolver,
                UserLogout_1.UserLogoutResolver,
                UserCreateTeam_1.UserCreateTeamResolver,
                UserUpdateTeam_1.UserUpdateTeamResolver,
                UserGetAllTeam_1.UserGetAllTeamResolver,
                UserGetSingleTeam_1.UserGetSingleTeamResolvser,
                UserRemoveSingleTeam_1.UserRemoveSingleTeamResolver,
                UserRemoveAllTeam_1.UserRemoveAllTeamResolver,
                UserRemoveMultipleTeam_1.UserRemoveMultipleTeamResolver
            ]
        }),
        plugins: [
            (0, apollo_server_core_1.ApolloServerPluginDrainHttpServer)({ httpServer }),
            apollo_server_core_1.ApolloServerPluginLandingPageGraphQLPlayground
        ],
        context: ({ req, res }) => ({ req, res })
    });
    const PORT = process.env.PORT || 4000;
    await apolloServer
        .start()
        .then(() => console.log(`Apollo server started on port ${PORT}`))
        .catch(err => console.log(err));
    appDataSource
        .initialize()
        .then(() => console.log(`Connected to Postgress DB`))
        .catch(err => console.log(err));
    apolloServer.applyMiddleware({
        app,
        cors: { origin: 'http://localhost:3000', credentials: true }
    });
    await new Promise(resolve => httpServer.listen({ port: PORT }, resolve));
    console.log(`GraphQL endpoint: http://localhost:${PORT}${apolloServer.graphqlPath}`);
};
main().catch(err => console.log(err));
//# sourceMappingURL=index.js.map