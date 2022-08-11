"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_core_1 = require("apollo-server-core");
const apollo_server_express_1 = require("apollo-server-express");
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const http_1 = require("http");
const mongoose_1 = __importDefault(require("mongoose"));
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Team_1 = require("./entities/Team");
const User_1 = require("./entities/User");
const CheckAuth_1 = require("./resolvers/auth/CheckAuth");
const Login_1 = require("./resolvers/auth/Login");
const Logout_1 = require("./resolvers/auth/Logout");
const Register_1 = require("./resolvers/auth/Register");
const CreateTeam_1 = require("./resolvers/team/CreateTeam");
const GetAllTeam_1 = require("./resolvers/team/GetAllTeam");
const GetSingleTeam_1 = require("./resolvers/team/GetSingleTeam");
const RemoveAllTeam_1 = require("./resolvers/team/RemoveAllTeam");
const RemoverMultipleTeam_1 = require("./resolvers/team/RemoverMultipleTeam");
const RemoveTeam_1 = require("./resolvers/team/RemoveTeam");
const UpdateTeam_1 = require("./resolvers/team/UpdateTeam");
const Constants_1 = require("./utils/Constants");
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
    const mongoUrl = `mongodb+srv://${process.env.CACHE_MONGO_USERNAME}:${process.env.CACHE_MONGO_PASSWORD}@pokedex-cache.ugn8zhf.mongodb.net/?retryWrites=true&w=majority`;
    await mongoose_1.default
        .connect(mongoUrl)
        .then(() => console.log('Connected to cache DB mongo'))
        .catch(err => console.log(`Cache DB error: ${err}`));
    appDataSource
        .initialize()
        .then(() => console.log('Connected to DB postgress'))
        .catch(err => console.log(`DB connect error: ${err}`));
    const app = (0, express_1.default)();
    const httpServer = (0, http_1.createServer)(app);
    app.use((0, cors_1.default)({
        origin: 'http://localhost:3000',
        credentials: true
    }));
    app.use((0, express_session_1.default)({
        name: Constants_1.COOKIE_NAME,
        store: connect_mongo_1.default.create({ mongoUrl }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true,
            secure: Constants_1.__prod__,
            sameSite: 'lax'
        },
        secret: process.env.SESSION_SECRET,
        saveUninitialized: false,
        resave: false
    }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            validate: false,
            resolvers: [
                CheckAuth_1.UserCheckAuthResolver,
                Register_1.UserRegisterResolver,
                Login_1.UserLoginResolver,
                Logout_1.UserLogoutResolver,
                CreateTeam_1.UserCreateTeamResolver,
                UpdateTeam_1.UserUpdateTeamResolver,
                GetAllTeam_1.UserGetAllTeamResolver,
                GetSingleTeam_1.UserGetSingleTeamResolver,
                RemoveTeam_1.UserRemoveTeamResolver,
                RemoverMultipleTeam_1.UserRemoverMultipleTeamResolver,
                RemoveAllTeam_1.UserRemoveAllTeamResolver
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
        .then(() => console.log(`Apollo server started on port: ${PORT}`))
        .catch(err => console.log(err));
    apolloServer.applyMiddleware({
        app,
        cors: {
            origin: 'http://localhost:3000',
            credentials: true
        }
    });
    await new Promise(resolve => httpServer.listen({ port: PORT }, resolve));
    console.log(`GraphQL endpoint: http://localhost:${PORT}${apolloServer.graphqlPath}`);
};
main().catch(err => console.log(`Server error: ${err}`));
//# sourceMappingURL=index.js.map