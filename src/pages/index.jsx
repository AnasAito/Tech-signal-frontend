import Head from 'next/head'
import { Footer } from '@/components/Footer'
import { ArticlesLayout } from '@/components/ArticlesLayout'
import { Header } from '@/components/Header'

// import {
//   ApolloClient,
//   ApolloProvider,
//   InMemoryCache,
//   HttpLink,
// } from '@apollo/client'

// const createApolloClient = (authToken) => {
//   return new ApolloClient({
//     link: new HttpLink({
//       uri: 'https://tops-dane-86.hasura.app/v1/graphql',
//       headers: {
//         'x-hasura-admin-secret': authToken,
//       },
//     }),
//     cache: new InMemoryCache(),
//   })
// }

export default function Home() {
  // const client = createApolloClient(
  //   'LaddHnRyCgECD2Y3hd2zVpTxlZPuvBic0S2ucvnd1YQX0ynOLHyyjpxAT13HhGvN'
  // )
  return (
    <div className="flex min-h-screen flex-col ">
      <Head>
        <title>TechSignal - find what to read fast</title>
        <meta
          name="description"
          content="find relevant tech articles published by bg tech companies by searching for skills or tools.  "
        />
      </Head>
      <Header />
      <main>
        <ArticlesLayout />
      </main>
      <Footer />
    </div>
  )
}
