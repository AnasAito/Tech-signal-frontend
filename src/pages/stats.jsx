import Head from 'next/head'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import Queries from '@/api/queries/index'
import { useQuery } from '@apollo/client'
import { get } from 'lodash'

export default function Stats() {
  const {
    loading: loading_stats,
    data: stats,
    error: errorStats,
  } = useQuery(Queries['stats.get.many'], {})
  console.log('stats data ', stats, errorStats)
  return (
    <div className="flex h-screen flex-col justify-between  bg-slate-50 py-4 font-mono ">
      <Head>
        <title>TechSignal - find what to read fast</title>
        <meta
          name="description"
          content="find relevant tech articles published by bg tech companies by searching for skills or tools.  "
        />
      </Head>
      <Header />
      <main className="flex flex-col items-center">
        <div className="m-4 rounded-md bg-yellow-600">
          <div className="mx-auto max-w-7xl py-12 px-4 sm:py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Each day I'm adding 5 new blog feeds
              </h2>
              <p className="mt-3 text-xl text-indigo-200 sm:mt-4">
                We use RSS feed to track new articles published by tech
                companies, we then get the articles process and annotate them
                using SkillNer.
              </p>
            </div>
            <dl className="mt-10 text-center sm:mx-auto sm:grid sm:max-w-3xl sm:grid-cols-3 sm:gap-8">
              <div className="flex flex-col">
                <dt className="order-2 mt-2 text-lg font-medium leading-6 text-indigo-200">
                  Company
                </dt>
                <dd className="order-1 text-5xl font-bold tracking-tight text-white">
                  {get(stats, 'Company_aggregate.aggregate.count', 0)}
                </dd>
              </div>
              <div className="mt-10 flex flex-col sm:mt-0">
                <dt className="order-2 mt-2 text-lg font-medium leading-6 text-indigo-200">
                  Articles
                </dt>
                <dd className="order-1 text-5xl font-bold tracking-tight text-white">
                  {get(stats, 'Article_aggregate.aggregate.count', 0)}
                </dd>
              </div>
              <div className="mt-10 flex flex-col sm:mt-0">
                <dt className="order-2 mt-2 text-lg font-medium leading-6 text-indigo-200">
                  Parsed skill/tool
                </dt>
                <dd className="order-1 text-5xl font-bold tracking-tight text-white">
                  {get(stats, 'ParsedSkill_aggregate.aggregate.count', 0)}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
