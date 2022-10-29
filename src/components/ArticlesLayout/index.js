import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { get } from 'lodash'

import Queries from '../../api/queries/index'

import { View } from './view'

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

export function ArticlesLayout() {
  const [skillId, setSkillId] = useState('')
  // GET ARTICLES
  const {
    loading: loading_node,
    data: articles,
    error,
  } = useQuery(Queries['article.get.many'], {
    variables: {
      limit: 10,
      order_by: { published_at: 'desc' },
      // where: { company_id: { _eq: '54718432-22c7-40b2-9106-42eb7e5b9ffb' } },//debug
    },
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

  let cards_to_render =
    prepare_cards(articles_formated).length == 0
      ? prepare_carsds_from_occs(OccMetaFormated, skillId)
      : prepare_cards(articles_formated)
  const staticTrends = Queries['ts.get.many']

  return (
    <>
      <View
        cards_to_render={cards_to_render}
        staticTrends={staticTrends}
        loading_node={loading_node}
        setSkillId={setSkillId}
        skillId={skillId}
      />
      {/* <div>test</div> */}
    </>
  )
}
