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
        <p className=" mx-auto mb-6 max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl">
          About
        </p>
        <div className="  items-center bg-slate-50 lg:max-w-2xl ">
          <p className=" mx-10 mt-2 bg-slate-50">
            Hello Im Anas AIT AOMAR, data scientist by day and creator by night.
            I Love graphs and NLP and building apps from front end to backend{' '}
          </p>
          <p className=" mx-10 mt-2 bg-slate-50">
            I usually start with my own pains and needs as a developer and try
            to build apps that might impact a large number of people.
          </p>
          <p className=" mx-10 mt-2 bg-slate-50">
            Tech signal comes as a continuation of{' '}
            <a
              target="_blank"
              rel="noreferrer"
              className="font-bold underline"
              href="https://github.com/AnasAito/SkillNER"
            >
              SKILLNER
            </a>{' '}
            a module that i built a year ao with my dear friend{' '}
            <a
              target="_blank"
              rel="noreferrer"
              className="font-bold underline"
              href="https://github.com/Badr-MOUFAD"
            >
              @Badr_Moufad
            </a>{' '}
            to extract skills from job description using a large database of
            skills. This module is used to annotate articles with tech skills
            and tools.
          </p>
          <p className=" mx-10 mt-2 bg-slate-50">
            I usually choose Articles published by big tech companies to learn
            how they use technologies (that Im familiar with or that I want to
            learn about)to solve small or large real problems in real life.This
            keep me motivated (Why do i need to lean this tech?) and also gives
            me ideas about real life use cases
          </p>
          <p className="  mx-10 mb-10 mt-2  bg-slate-50">
            This articles are scattered all over the web and you need time to
            find relevant ones . The goal of Tech signal is to gather and make
            them searchable. That it!
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
