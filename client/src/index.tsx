import {
	ApolloClient,
	ApolloProvider,
	createHttpLink,
	InMemoryCache,
	split
} from '@apollo/client'
import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { store } from './redux/store/store'
import { RetryLink } from '@apollo/client/link/retry'
const container = document.getElementById('root')!
const root = createRoot(container)

const authLink = createHttpLink({
	uri: 'http://localhost:4000/graphql',
	credentials: 'include'
})

const pokemonLink = createHttpLink({
	uri: 'https://graphql-pokeapi.graphcdn.app/'
})

const pokemonLinkV2 = createHttpLink({
	uri: 'https://beta.pokeapi.co/graphql/v1beta'
})

const directionalLink = new RetryLink().split(
	operation => operation.getContext().clientName === 'pokemonV2',
	pokemonLinkV2,
	split(
		operation => operation.getContext().clientName === 'pokemon',
		pokemonLink,
		authLink
	)
)

const client = new ApolloClient({
	link: directionalLink,
	cache: new InMemoryCache()
})

root.render(
	<ApolloProvider client={client}>
		<BrowserRouter>
			<ChakraProvider>
				<React.StrictMode>
					<Provider store={store}>
						<App />
					</Provider>
				</React.StrictMode>
			</ChakraProvider>
		</BrowserRouter>
	</ApolloProvider>
)
