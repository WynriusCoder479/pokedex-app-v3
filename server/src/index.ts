import {
	ApolloServerPluginDrainHttpServer,
	ApolloServerPluginLandingPageGraphQLPlayground
} from 'apollo-server-core'
import { ApolloServer } from 'apollo-server-express'
import MongoStore from 'connect-mongo'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import session from 'express-session'
import { createServer } from 'http'
import mongoose from 'mongoose'
import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import { DataSource } from 'typeorm'
import { Team } from './entities/Team'
import { User } from './entities/User'
import { UserCheckAuthResolver } from './resolvers/auth/CheckAuth'
import { UserLoginResolver } from './resolvers/auth/Login'
import { UserLogoutResolver } from './resolvers/auth/Logout'
import { UserRegisterResolver } from './resolvers/auth/Register'
import { UserCreateTeamResolver } from './resolvers/team/CreateTeam'
import { UserGetAllTeamResolver } from './resolvers/team/GetAllTeam'
import { UserGetSingleTeamResolver } from './resolvers/team/GetSingleTeam'
import { UserRemoveAllTeamResolver } from './resolvers/team/RemoveAllTeam'
import { UserRemoverMultipleTeamResolver } from './resolvers/team/RemoverMultipleTeam'
import { UserRemoveTeamResolver } from './resolvers/team/RemoveTeam'
import { UserUpdateTeamResolver } from './resolvers/team/UpdateTeam'
import { Context } from './types/utils/Context'
import { COOKIE_NAME, __prod__ } from './utils/Constants'

dotenv.config()

const main = async () => {
	const appDataSource = new DataSource({
		type: 'postgres',
		host: 'localhost',
		port: 5432,
		username: process.env.DB_PG_USERNAME,
		password: process.env.DB_PG_PASSWORD,
		database: 'pokedex_app_db',
		synchronize: true,
		logging: false,
		entities: [User, Team]
	})

	const mongoUrl = `mongodb+srv://${process.env.CACHE_MONGO_USERNAME}:${process.env.CACHE_MONGO_PASSWORD}@pokedex-cache.ugn8zhf.mongodb.net/?retryWrites=true&w=majority`

	await mongoose
		.connect(mongoUrl)
		.then(() => console.log('Connected to cache DB mongo'))
		.catch(err => console.log(`Cache DB error: ${err}`))

	appDataSource
		.initialize()
		.then(() => console.log('Connected to DB postgress'))
		.catch(err => console.log(`DB connect error: ${err}`))

	const app = express()

	const httpServer = createServer(app)

	app.use(
		cors({
			origin: 'http://localhost:3000',
			credentials: true
		})
	)

	app.use(
		session({
			name: COOKIE_NAME,
			store: MongoStore.create({ mongoUrl }),
			cookie: {
				maxAge: 1000 * 60 * 60 * 24 * 7, //7 day
				httpOnly: true,
				secure: __prod__,
				sameSite: 'lax'
			},
			secret: process.env.SESSION_SECRET as string,
			saveUninitialized: false,
			resave: false
		})
	)

	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			validate: false,
			resolvers: [
				UserCheckAuthResolver,
				UserRegisterResolver,
				UserLoginResolver,
				UserLogoutResolver,
				UserCreateTeamResolver,
				UserUpdateTeamResolver,
				UserGetAllTeamResolver,
				UserGetSingleTeamResolver,
				UserRemoveTeamResolver,
				UserRemoverMultipleTeamResolver,
				UserRemoveAllTeamResolver
			]
		}),
		plugins: [
			ApolloServerPluginDrainHttpServer({ httpServer }),
			ApolloServerPluginLandingPageGraphQLPlayground
		],
		context: ({ req, res }): Pick<Context, 'req' | 'res'> => ({ req, res })
	})

	const PORT = process.env.PORT || 4000

	await apolloServer
		.start()
		.then(() => console.log(`Apollo server started on port: ${PORT}`))
		.catch(err => console.log(err))

	apolloServer.applyMiddleware({
		app,
		cors: {
			origin: 'http://localhost:3000',
			credentials: true
		}
	})

	await new Promise(resolve =>
		httpServer.listen({ port: PORT }, resolve as () => void)
	)

	console.log(
		`GraphQL endpoint: http://localhost:${PORT}${apolloServer.graphqlPath}`
	)
}

main().catch(err => console.log(`Server error: ${err}`))
