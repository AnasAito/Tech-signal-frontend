import Image from 'next/future/image'
import Queries from '../api/queries/index'
import { get } from 'lodash'
import empty from '@/images/logos/empty.png'
const logo_mapper = Queries['logo.get.many']
function QuoteIcon(props) {
  return (
    <svg aria-hidden="true" width={105} height={78} {...props}>
      <path d="M25.086 77.292c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622C1.054 58.534 0 53.411 0 47.686c0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C28.325 3.917 33.599 1.507 39.324 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Zm54.24 0c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622-2.11-4.52-3.164-9.643-3.164-15.368 0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C82.565 3.917 87.839 1.507 93.564 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Z" />
    </svg>
  )
}

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
export function ArticleCard({ article, key }) {
  const defaultCompany = {
    logo: empty,
    name: '',
  }
  return (
    <>
      <a
        key={key}
        href={article.article_id}
        target="_blank"
        rel="noreferrer"
        className="transform cursor-pointer  transition duration-500 ease-in-out hover:scale-105"
      >
        <figure className="relative rounded-2xl  p-6 shadow-xl shadow-slate-900/10 text-slate-900 dark:text-white bg-white dark:bg-slate-900">
          <QuoteIcon className="absolute top-6 left-6 fill-slate-100 dark:fill-slate-800" />
          <blockquote className="relative">
            <p className="mb-6 text-xl font-semibold ">
              {article.article_title}
            </p>
            <p className="text-lg tracking-tight ">
              ... {render_occurence(article.occurence_text, article.skill)} ...
            </p>
          </blockquote>
          <figcaption className="relative mt-6 flex items-center justify-between border-t border-slate-100 pt-6">
            <div>
              <div className="font-display text-base ">
                {get(logo_mapper, article.company_id, defaultCompany).name}
              </div>
              <div className="mt-1 text-sm ">
                {article.article_date == '' ? '2022' : article.article_date}
              </div>
            </div>
            <div className="overflow-hidden rounded-full bg-slate-50 dark:bg-slate-900">
              <Image
                className="h-14 w-14 object-cover"
                src={get(logo_mapper, article.company_id, defaultCompany).logo}
                alt=""
                width={56}
                height={56}
              />
            </div>
          </figcaption>
        </figure>
      </a>
    </>
  )
}
