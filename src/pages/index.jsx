import Head from 'next/head'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'
import { Testimonials } from '@/components/Testimonials'
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

export default function Home() {
  const client = createApolloClient(
    'LaddHnRyCgECD2Y3hd2zVpTxlZPuvBic0S2ucvnd1YQX0ynOLHyyjpxAT13HhGvN'
  )
  return (
    <ApolloProvider client={client}>
      <>
        <Head>
          <title>TechSignal - find what to read fast</title>
          <meta
            name="description"
            content="find relevant tech articles published by bg tech companies by searching for skills or tools.  "
          />
        </Head>

        <main>
          <Testimonials />
        </main>
        <Footer />
      </>
    </ApolloProvider>
  )
}
