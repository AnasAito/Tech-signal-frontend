import Head from 'next/head'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
export default function About() {
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
        <p className=" mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl">
          About Me
        </p>

        <div className="mx-auto mt-3 max-w-md text-base text-gray-500 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
          <p>
            Hello Im Anas AIT AOMAR, data scientist by day and creator by night.
            I Love graphs and NLP and building apps from front end to backend{' '}
          </p>
          <p className=" mt-2">
            I usually start with my own pains and needs as a developer and try
            to build apps that might impact a large number of people.
          </p>
          <p className=" mt-2">
            Tech signal comes as a continuation to SkillNER a module that i
            built a year ao with my friend @Badr_Moufad to extract skills from
            job description using a large database of skills. This module is
            used to annotate articles with tech skills and tools.
          </p>
          <p className=" mt-2">
            I usually choose Articles published by big tech companies to learn
            how they use technology (that im familiar with or that i want to
            learn about)to solve small or large real problems.
          </p>
          <p className=" mt-2">
            This articles are scattered all over the web and you need time to
            find relevant ones . The goal of Tech signal is to gather and make
            searchable. That it!
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}