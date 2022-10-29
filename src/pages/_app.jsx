import 'focus-visible'
import '@/styles/tailwind.css'
import { Analytics } from '@vercel/analytics/react'
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
} from '@apollo/client'

const createApolloClient = (authToken) => {
  return new ApolloClient({
    link: new HttpLink({
      uri: 'https://tops-dane-86.hasura.app/v1/graphql',
      headers: {
        'x-hasura-admin-secret': authToken,
      },
    }),
    cache: new InMemoryCache(),
  })
}
export default function App({ Component, pageProps }) {
  const client = createApolloClient(
    'LaddHnRyCgECD2Y3hd2zVpTxlZPuvBic0S2ucvnd1YQX0ynOLHyyjpxAT13HhGvN'
  )
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
      <Analytics />
    </ApolloProvider>
  )
}
