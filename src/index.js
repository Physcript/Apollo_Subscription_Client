import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Cookies from 'js-cookie'
// apollo
import { ApolloProvider,ApolloClient,InMemoryCache,split,createHttpLink, HttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { createUploadLink } from 'apollo-upload-client'

// subs
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'

const uploadLink = HttpLink({
  uri: 'https://fast-plains-63623.herokuapp.com/graphql',
})


// subs

const wsLink = new WebSocketLink({
  uri: 'wss://fast-plains-63623.herokuapp.com/graphql',
  options: {
    reconnect: true
  }
})

//// update
// package.json update , 
// "proxy": 'http://localhost:4000'



const splitLink = split(

  ({query}) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },

  wsLink,
  uploadLink

) 

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
  credentials: 'include',
})


ReactDOM.render(
    <ApolloProvider client = { client }>
      <App />
    </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
