import { Fragment, useState, useEffect, useCallback } from 'react'
import { useQuery } from '@apollo/client'
import { get } from 'lodash'
import Queries from '../api/queries/index'
import { Combobox, Dialog, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import ClipLoader from 'react-spinners/ClipLoader'

import {
  CommandLineIcon,
  BriefcaseIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function SearchNew({ setSkillId, skillId }) {
  const [query, setQuery] = useState('')

  const [open, setOpen] = useState(false)

  const {
    loading: loading_skill,
    data: skills,
    error,
  } = useQuery(Queries['skill.get.many'], {
    variables: { where: { name: { _ilike: `%${query}%` } } },
    skip: query == '',
  })
  const filteredItems = get(skills, 'Skill', []).map((n) => {
    return {
      id: n.id,
      name: n.name,
      description: n.subCategory,
      url: '#',
      color: n.isSoftware ? 'bg-yellow-500' : 'bg-yellow-700',
      icon: n.isSoftware ? CommandLineIcon : BriefcaseIcon,
    }
  })
  // handle what happens on key press
  const handleKeyPress = useCallback((e) => {
    if (e.keyCode === 75 && e.metaKey) {
      setOpen(!open)
    }

    if (e.keyCode === 32 && e.ctrlKey) {
      setOpen(!open)
    }
  }, [])

  useEffect(() => {
    // attach the event listener
    document.addEventListener('keydown', handleKeyPress)

    // remove the event listener
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [handleKeyPress])
  console.log('skills', !skills)
  return (
    <div className=" mx-auto  w-full transform divide-y divide-gray-100 overflow-hidden overflow-y-auto rounded-xl bg-white text-left shadow-2xl ring-4 ring-yellow-600 ring-opacity-50   dark:divide-slate-900 dark:bg-slate-900   lg:w-3/4">
      <Combobox onChange={(item) => (window.location = item.url)}>
        <div className="relative">
          <MagnifyingGlassIcon
            className="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
          <Combobox.Input
            className="hidden h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-800 placeholder-gray-400 focus:ring-0 dark:text-white dark:placeholder-slate-50 sm:text-sm lg:block"
            placeholder="Try machine learning, sql, elasticsearch or any Skill or Tool ..."
            onChange={(event) => setQuery(event.target.value)}
          />
          <Combobox.Input
            className=" h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-800 placeholder-gray-400 focus:ring-0 dark:text-white dark:placeholder-slate-50  sm:text-sm lg:hidden"
            placeholder="Try any Tech (sql,scalability) ..."
            p
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <div className="   ">
          {/* {loading_skill && (
            <div className="flex flex-col items-center py-6">
              {' '}
              <ClipLoader />
            </div>
          )} */}

          <Transition
            show={loading_skill}
            enter="transition-opacity duration-75"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="flex flex-col items-center py-6">
              {' '}
              <ClipLoader />
            </div>
          </Transition>
          {skills && (
            <>
              {filteredItems.length === 0 ? (
                <div className="flex flex-col items-center py-6">
                  <ExclamationCircleIcon
                    type="outline"
                    name="exclamation-circle"
                    className="mx-auto h-6 w-6 text-gray-400 dark:text-white"
                  />
                  <p className="mt-4 font-semibold text-gray-900">
                    No results found
                  </p>
                  <p className="mt-2 text-gray-500 dark:text-white">
                    No skills found for this search term. Please try again.
                  </p>
                </div>
              ) : (
                <Combobox.Options
                  static
                  className="max-h-96 scroll-py-3 overflow-y-auto p-3"
                >
                  {filteredItems.map((item) => (
                    <Combobox.Option
                      key={item.id}
                      value={item}
                      onClick={() => {
                        setSkillId(item.id)
                        setQuery('')
                      }}
                      className={({ active }) =>
                        classNames(
                          'flex cursor-default select-none rounded-xl p-3',
                          active && 'bg-gray-100 dark:bg-gray-700'
                        )
                      }
                    >
                      {({ active }) => (
                        <>
                          <div
                            className={classNames(
                              'flex h-10 w-10 flex-none items-center justify-center rounded-lg',
                              item.color
                            )}
                          >
                            <item.icon
                              className="h-6 w-6 text-white"
                              aria-hidden="true"
                            />
                          </div>
                          <div className="ml-4 flex-auto">
                            <p
                              className={classNames(
                                'text-sm font-medium',
                                active
                                  ? 'text-gray-900 dark:text-white '
                                  : 'text-gray-700 dark:text-white'
                              )}
                            >
                              {item.name}
                            </p>
                            <p
                              className={classNames(
                                'text-sm',
                                active
                                  ? 'text-gray-700  dark:text-gray-500'
                                  : 'text-gray-500  dark:text-gray-500'
                              )}
                            >
                              {item.description}
                            </p>
                          </div>
                        </>
                      )}
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
              )}
            </>
          )}
        </div>
      </Combobox>
    </div>
  )
}
