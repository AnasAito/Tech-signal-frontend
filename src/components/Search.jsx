import { Fragment, useState } from 'react'
import { useQuery } from '@apollo/client'
import { get } from 'lodash'
import Queries from '../api/queries/index'
import { Combobox, Dialog, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import ClipLoader from "react-spinners/ClipLoader";
import {
CommandLineIcon, BriefcaseIcon
} from '@heroicons/react/24/outline'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export  function Search({setSkillId,skillId}) {
console.log('skill',skillId)
  const [query, setQuery] = useState('')

  const [open, setOpen] = useState(false)


  const {
    loading: loading_skill,
    data: skills,
    error,
  } = useQuery(Queries['skill.get.many'], {
    variables: { where: {name: {_ilike:  `%${query}%`}} },
    skip: query==''
 
  })
  const filteredItems = get(skills,'Skill',[]).map((n) => {
    return {
      id: n.id,
      name: n.name,
      description: n.subCategory,
      url: '#',
      color: n.isSoftware?'bg-indigo-500':'bg-green-500',
      icon: n.isSoftware?CommandLineIcon:BriefcaseIcon,
    }
  })

  
    
  console.log(filteredItems,error)
  return (
    <>
    <p className='text-xl'>Scroll down or <button className='font-bold underline decoration-blue-40  ' onClick={()=>setOpen(true)}>Search for specific skills!</button></p>
    <Transition.Root show={open} as={Fragment} afterLeave={() => setQuery('')} appear>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="mx-auto max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
              <Combobox onChange={(item) => (window.location = item.url)}>
                <div className="relative">
                  <MagnifyingGlassIcon
                    className="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <Combobox.Input
                    className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-800 placeholder-gray-400 focus:ring-0 sm:text-sm"
                    placeholder="Try data engineering , sql , elasticsearch or any skill ..."
                    onChange={(event) => setQuery(event.target.value)}
                  />
                </div>

                {filteredItems.length > 0 && (
                  <Combobox.Options static className="max-h-96 scroll-py-3 overflow-y-auto p-3">
                    {filteredItems.map((item) => (
                      <Combobox.Option
                        key={item.id}
                        value={item}
                        onClick = {()=>{setSkillId(item.id)
                                        setOpen(false)}}
                        className={({ active }) =>
                          classNames('flex cursor-default select-none rounded-xl p-3', active && 'bg-gray-100')
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
                              <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                            </div>
                            <div className="ml-4 flex-auto">
                              <p
                                className={classNames(
                                  'text-sm font-medium',
                                  active ? 'text-gray-900' : 'text-gray-700'
                                )}
                              >
                                {item.name}
                              </p>
                              <p className={classNames('text-sm', active ? 'text-gray-700' : 'text-gray-500')}>
                                {item.description}
                              </p>
                            </div>
                          </>
                        )}
                      </Combobox.Option>
                    ))}
                  </Combobox.Options>
                )}

                {query !== '' && filteredItems.length === 0 && (
                  <div className="py-14 px-6 text-center text-sm sm:px-14">
                    
{loading_skill?<div> <ClipLoader/></div>: <> <ExclamationCircleIcon
type="outline"
name="exclamation-circle"
className="mx-auto h-6 w-6 text-gray-400"
/>
<p className="mt-4 font-semibold text-gray-900">No results found</p>
<p className="mt-2 text-gray-500">No skills found for this search term. Please try again.</p>
</> }
                 
                  </div>
                )}
              </Combobox>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
    </>
  )
}
