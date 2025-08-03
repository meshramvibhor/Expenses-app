import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import GridBackground from './components/ui/GridBackground.jsx';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const graphqlUri = import.meta.env.DEV ? 'http://localhost:4000/graphql' : "/graphql";

const client = new ApolloClient({
	uri: graphqlUri,  // the URL of our GraphQL server.
	cache: new InMemoryCache(),  // Apollo client uses to cache query result after fetching them.
	credentials: "include",  // this tells Apollo Client to send cookies along wiwth every request to the server.
});

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			<GridBackground>
				<ApolloProvider client={client}>
				<App />
				</ApolloProvider>
			</GridBackground>
		</BrowserRouter>
	</React.StrictMode>
);
