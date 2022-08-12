import 'reflect-metadata'
import {
	ApolloServerPluginDrainHttpServer,
	ApolloServerPluginLandingPageGraphQLPlayground
} from 'apollo-server-core'
import { ApolloServer } from 'apollo-server-express'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import { createServer } from 'http'
import { buildSchema } from 'type-graphql'
import { DataSource } from 'typeorm'
import { Team } from './entities/Team'
import { User } from './entities/User'
import { UserCheckAuthResolver } from './resolvers/auth/UserCheckAuth'
import { Context } from './types/util/Context'
import { UserRegisterResolver } from './resolvers/auth/UserRegister'
import { UserLoginResolver } from './resolvers/auth/UserLogin'
import { UserCreateTeamResolver } from './resolvers/team/UserCreateTeam'
import { UserUpdateTeamResolver } from './resolvers/team/UserUpdateTeam'
import { UserGetAllTeamResolver } from './resolvers/team/UserGetAllTeam'
import { UserGetSingleTeamResolvser } from './resolvers/team/UserGetSingleTeam'
import { UserRemoveSingleTeamResolver } from './resolvers/team/UserRemoveSingleTeam'
import { UserRemoveAllTeamResolver } from './resolvers/team/UserRemoveAllTeam'
import { UserRemoveMultipleTeamResolver } from './resolvers/team/UserRemoveMultipleTeam'
import mongoose from 'mongoose'
import session from 'express-session'
import { COOKIE_NAME, __prod__ } from './utils/constants'
import MongoStore from 'connect-mongo'
import { UserLogoutResolver } from './resolvers/auth/UserLogout'

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

	const app = express()

	const mongoUrl = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@pokedex-cache.ugn8zhf.mongodb.net/?retryWrites=true&w=majority`

	await mongoose
		.connect(mongoUrl)
		.then(() => console.log('Conected to mongo DB'))
		.catch(err => console.log(err))

	app.use(
		session({
			name: COOKIE_NAME,
			store: MongoStore.create({ mongoUrl }),
			cookie: {
				maxAge: 1000 * 60 * 60 * 24 * 7,
				httpOnly: true,
				secure: __prod__,
				sameSite: 'lax'
			},
			secret: process.env.SESSION_SECRET as string,
			saveUninitialized: false,
			resave: false
		})
	)

	app.use(cors({ origin: 'http://localhost:3000', credentials: true }))

	const httpServer = createServer(app)

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
				UserGetSingleTeamResolvser,
				UserRemoveSingleTeamResolver,
				UserRemoveAllTeamResolver,
				UserRemoveMultipleTeamResolver
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
		.then(() => console.log(`Apollo server started on port ${PORT}`))
		.catch(err => console.log(err))
	appDataSource
		.initialize()
		.then(() => console.log(`Connected to Postgress DB`))
		.catch(err => console.log(err))

	apolloServer.applyMiddleware({
		app,
		cors: { origin: 'http://localhost:3000', credentials: true }
	})

	await new Promise(resolve =>
		httpServer.listen({ port: PORT }, resolve as () => void)
	)

	console.log(
		`GraphQL endpoint: http://localhost:${PORT}${apolloServer.graphqlPath}`
	)
}

main().catch(err => console.log(err))
