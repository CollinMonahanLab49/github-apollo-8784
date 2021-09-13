import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import React from 'react'

export const gqlCache = new InMemoryCache({
  typePolicies: {
    Person: {
      keyFields: ['personId'],
      fields: {
        apples: {
          read: original => original ?? 0,
        },
        oranges: {
          read: original => original ?? 0,
        },
        bananas: {
          read: original => original ?? 0,
        },
        silkworms: {
          read: original => original ?? 0,
        },
        marzapan: {
          read: original => original ?? 0,
        },
      },
    },
  },
})

export const createClient = () =>
  new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_ANIMALS_LOC}/graphql`,
    cache: gqlCache,
    // assumeImmutableResults: true,
    connectToDevTools: process.env.NODE_ENV === 'development',
  })

export const GqlClientProvider = ({ children }) => {
  const [client] = React.useState(createClient)

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
