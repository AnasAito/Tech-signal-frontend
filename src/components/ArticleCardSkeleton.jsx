function QuoteIcon(props) {
  return (
    <svg aria-hidden="true" width={105} height={78} {...props}>
      <path d="M25.086 77.292c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622C1.054 58.534 0 53.411 0 47.686c0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C28.325 3.917 33.599 1.507 39.324 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Zm54.24 0c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622-2.11-4.52-3.164-9.643-3.164-15.368 0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C82.565 3.917 87.839 1.507 93.564 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Z" />
    </svg>
  )
}

export function ArticleCardSkeleton() {
  const choices = [7, 8, 9, 10, 11, 15]
  let n = choices[Math.floor(Math.random() * choices.length)]
  const lines = Array(n).fill(0)
  return (
    <div className="max-w-sm transform   animate-pulse cursor-pointer ">
      <figure className="relative rounded-2xl  p-6 shadow-xl shadow-slate-900/10 text-slate-900 dark:text-white bg-white dark:bg-slate-900">
        <QuoteIcon className="absolute top-6 left-6 fill-slate-100 dark:fill-slate-800" />

        <blockquote className="relative">
          <div className=" mb-10 h-5 w-48 rounded-sm bg-gray-200 dark:bg-gray-500"></div>
          {lines.map((l, idx) => (
            <div
              key={idx}
              className="mb-2.5 h-2 w-72 rounded-full bg-gray-200 dark:bg-gray-500"
            ></div>
          ))}
        </blockquote>
        <figcaption className="relative mt-6 flex items-center justify-between border-t border-slate-100 pt-6">
          <div>
            <div className="mb-2 h-2.5 w-32 rounded-full bg-gray-200 dark:bg-gray-500"></div>
            <div className="h-2  w-20 rounded-full bg-gray-200 dark:bg-gray-500"></div>
          </div>
          <svg
            className="h-14 w-14 text-gray-200 dark:text-gray-500"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
              clipRule="evenodd"
            ></path>
          </svg>
        </figcaption>
      </figure>
    </div>
  )
}
