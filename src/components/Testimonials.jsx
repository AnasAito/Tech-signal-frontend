import { useState } from 'react'
import Image from 'next/future/image'
import { useQuery } from '@apollo/client'
import { get } from 'lodash'
import GridLoader from 'react-spinners/ClipLoader'
import Queries from '../api/queries/index'
import { Container } from '@/components/Container'
import { Search } from '@/components/Search'
import { TrendChart } from '@/components/TrendChart'
import avatarImage4 from '@/images/avatars/avatar-4.png'

import withoutHydration from 'react-without-hydration'
const TrendChartH = withoutHydration()(TrendChart)

const staticTrends = Queries['ts.get.many']
const logo_mapper = Queries['logo.get.many']
const render_occurence = (content, skill) => {
  const splitted_content = content.toLowerCase().split(skill)

  return (
    <>
      {splitted_content[0]}{' '}
      <span className="text-xl font-bold underline decoration-yellow-400 ">
        {skill}
      </span>
      {splitted_content.slice(1).join(' ')}
    </>
  )
}

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
    ;[array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ]
  }

  return array
}
const prepare_cards = (articles) => {
  let cards = []
  for (let article_idx in articles) {
    let article_title = articles[article_idx]['title']
    let article_id = articles[article_idx]['id']
    let article_date = articles[article_idx]['published_at']
    let company_id = articles[article_idx]['company_id']
    let article_occurences = articles[article_idx]['occurence']
    for (let occ_idx in article_occurences) {
      let skills = article_occurences[occ_idx]['ParsedSkills'].map(
        (skill) => skill['skill_mention']
      )
      let occ_text = article_occurences[occ_idx]['text']
      for (let skill_idx in skills) {
        let data = {
          article_id: article_id,
          article_title: article_title,
          article_date: article_date,
          skill: skills[skill_idx],
          occurence_text: occ_text,
          company_id: company_id,
        }
        cards.push(data)
      }
    }
  }

  const new_cards = []
  while (cards.length) new_cards.push(shuffle(cards).splice(0, 3))

  try {
    return new_cards[0].map((_, colIndex) =>
      new_cards.map((row) => row[colIndex])
    )
  } catch (e) {
    return []
  }
  // return new_cards.splice(0, 3)
}
const prepare_carsds_from_occs = (data, skill_id) => {
  const cards = data.map((occ) => {
    return {
      article_id: occ.Article.id,
      article_title: occ.Article.title,
      article_date: occ.Article.published_at,
      skill: occ.ParsedSkills.filter((s) => s['skill_id'] == skill_id)[0]
        .skill_mention,
      occurence_text: occ.text,
      company_id: occ.Article.company_id,
    }
  })
  const new_cards = []
  while (cards.length) new_cards.push(shuffle(cards).splice(0, 3))

  try {
    return new_cards[0].map((_, colIndex) =>
      new_cards.map((row) => row[colIndex])
    )
  } catch (e) {
    return []
  }
}

function QuoteIcon(props) {
  return (
    <svg aria-hidden="true" width={105} height={78} {...props}>
      <path d="M25.086 77.292c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622C1.054 58.534 0 53.411 0 47.686c0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C28.325 3.917 33.599 1.507 39.324 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Zm54.24 0c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622-2.11-4.52-3.164-9.643-3.164-15.368 0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C82.565 3.917 87.839 1.507 93.564 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Z" />
    </svg>
  )
}

export function Testimonials() {
  const [skillId, setSkillId] = useState('')
  // GET ARTICLES
  const {
    loading: loading_node,
    data: articles,
    error,
  } = useQuery(Queries['article.get.many'], {
    variables: { limit: 10, order_by: { created_at: 'desc' } },
    skip: skillId != '',
  })
  // GET OCC FROM SKILL
  const {
    loading: loading_occ,
    data: parsedSkillsBySkill,
    errorPar,
  } = useQuery(Queries['parsedSkill.get.many'], {
    variables: { where: { skill_id: { _eq: skillId } } },
    skip: skillId == '',
  })
  const parsedSkillsBySkillFormated = get(
    parsedSkillsBySkill,
    'ParsedSkill',
    []
  ).map((n) => n.occurence_id)
  // Get OCC meta data
  const {
    loading: loading_occ_meta,
    data: OccurencesByIds,
    errorOcc,
  } = useQuery(Queries['occ.get.many'], {
    variables: { where: { id: { _in: parsedSkillsBySkillFormated } } },
    skip: parsedSkillsBySkillFormated.length == 0,
  })
  const OccMetaFormated = get(OccurencesByIds, 'Occurence', [])
  const articles_formated = get(articles, 'Article', []).map((n) => {
    return {
      id: n.id,
      title: n.title,
      company_id: n.company_id,
      published_at: n.published_at,
      occurence: n.Occurences,
    }
  })

  // console.log('articles', prepare_cards(articles_formated), error)
  // console.log('occ by skill', parsedSkillsBySkillFormated,errorPar)
  // console.log('occ by ids', prepare_carsds_from_occs(OccMetaFormated),errorOcc)
  let cards_to_render =
    prepare_cards(articles_formated).length == 0
      ? prepare_carsds_from_occs(OccMetaFormated, skillId)
      : prepare_cards(articles_formated)
  return (
    <section
      id="testimonials"
      aria-label="What our customers are saying"
      className="bg-slate-50  font-mono"
    >
      <Container className="pt-5 pb-16 text-center lg:pt-10">
        <h1
          onClick={() => setSkillId('')}
          className=" mx-auto max-w-4xl cursor-pointer font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl"
        >
          Tech{' '}
          <span className="relative whitespace-nowrap text-yellow-600">
            <svg
              aria-hidden="true"
              viewBox="0 0 418 42"
              className="absolute top-2/3 left-0 h-[0.58em] w-full fill-yellow-300/70"
              preserveAspectRatio="none"
            >
              <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
            </svg>
            <span className="relative">Signal</span>
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
          We process and index thousands of articles from companies' tech blogs
          so you can find quickly relevant and real-life content that suits your
          needs (skills, tools, new tech...)
        </p>
        <p className="text-xl"> Trendy Tech terms</p>
        <ul
          role="list"
          className=" my-4 flex flex-row items-center justify-center  gap-20 text-left "
        >
          {staticTrends.map((skill) => (
            <div key={skill['id']}>
              <TrendChart skillName={skill['name']} skillTs={skill['trend']} />
            </div>
          ))}
        </ul>
        <div className="mt-10 flex justify-center gap-x-6">
          <Search setSkillId={setSkillId} skillId={skillId} />
        </div>
        {loading_node ? (
          <div className="mt-24 flex items-center justify-center ">
            <GridLoader />
          </div>
        ) : (
          <ul
            role="list"
            className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 text-left sm:gap-8 lg:mt-20 lg:max-w-none lg:grid-cols-3"
          >
            {cards_to_render.map((column, columnIndex) => (
              <li key={columnIndex}>
                <ul role="list" className="flex flex-col gap-y-6 sm:gap-y-8">
                  {column
                    .filter((a) => get(a, 'article_id', 'no_link') != 'no_link')
                    .map((testimonial, testimonialIndex) => (
                      <a
                        key={testimonialIndex}
                        href={testimonial.article_id}
                        target="_blank"
                        rel="noreferrer"
                        className="transform cursor-pointer  transition duration-500 ease-in-out hover:scale-105"
                      >
                        <figure className="relative rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10">
                          <QuoteIcon className="absolute top-6 left-6 fill-slate-100" />
                          <blockquote className="relative">
                            <p className="mb-6 text-xl font-semibold text-gray-900">
                              {testimonial.article_title}
                            </p>
                            <p className="text-lg tracking-tight text-slate-900">
                              ...{' '}
                              {render_occurence(
                                testimonial.occurence_text,
                                testimonial.skill
                              )}{' '}
                              ...
                            </p>
                          </blockquote>
                          <figcaption className="relative mt-6 flex items-center justify-between border-t border-slate-100 pt-6">
                            <div>
                              <div className="font-display text-base text-slate-900">
                                {
                                  get(logo_mapper, testimonial.company_id, {
                                    logo: avatarImage4,
                                    name: '',
                                  }).name
                                }
                              </div>
                              <div className="mt-1 text-sm text-slate-500">
                                {testimonial.article_date == ''
                                  ? '2022'
                                  : testimonial.article_date}
                              </div>
                            </div>
                            <div className="overflow-hidden rounded-full bg-slate-50">
                              <Image
                                className="h-14 w-14 object-cover"
                                src={
                                  get(logo_mapper, testimonial.company_id, {
                                    logo: avatarImage4,
                                    name: '',
                                  }).logo
                                }
                                alt=""
                                width={56}
                                height={56}
                              />
                            </div>
                          </figcaption>
                        </figure>
                      </a>
                    ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </section>
  )
}
