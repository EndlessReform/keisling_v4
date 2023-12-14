'use client'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { useState, createContext, useContext } from 'react'
import { ArrowRight, Link as LinkIcon } from '@carbon/icons-react'

import { LandingLayout } from '../../components'
import { LinkMetadata } from '../../lib/get_links'

interface ICategoryContext {
  category?: string
  setCategory: (category: string) => void
}

const CategoryContext = createContext<ICategoryContext>({
  category: undefined,
  setCategory: (_) => {},
})

function Category({ category }: { category: string }) {
  const { category: currCategory, setCategory } = useContext(CategoryContext)

  return (
    <button
      onClick={() => {
        setCategory(category)
      }}
      className="text-2xl after:text-gray-500 after:content-['_/'] last:after:content-none"
    >
      <h2
        className={clsx(
          category == currCategory ? 'text-fg' : 'text-gray-500',
          'inline text-2xl capitalize hover:text-blue-500'
        )}
      >
        {category}
      </h2>
    </button>
  )
}

export function Links({
  links,
  categories,
}: {
  links: Record<string, LinkMetadata[]>
  categories: string[]
}) {
  const [currCategory, setCurrCategory] = useState(categories[0])

  return (
    <CategoryContext.Provider
      value={{ category: currCategory, setCategory: setCurrCategory }}
    >
      <LandingLayout
        title="Links"
        about={`A collection of ${
          Object.values(links).flat().length
        } interesting links and resources`}
      >
        <div className="flex flex-wrap gap-2 border-y border-t-gray-200 border-b-fg py-4">
          {categories.map((cname, key) => (
            <Category category={cname} key={key} />
          ))}
        </div>
        <div className="w-full">
          {links[currCategory]?.map((l, key) => (
            <motion.div
              key={key}
              className="border-b border-b-gray-100 py-4 sm:flex"
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
            >
              <div className="flex">
                <ArrowRight className="mt-1 mr-2 h-5 w-5 text-blue-500" />
                <div>
                  <h4 className="text-xl hover:text-blue-500">
                    <a href={l.url}>{l.name}</a>
                  </h4>
                  {l.summary ? (
                    <p className="max-w-md pt-2 text-sm text-gray-500">
                      {l.summary}
                    </p>
                  ) : null}
                  {l.subpages
                    ? l.subpages.map((pg, key) => (
                        <div key={key} className="mt-2 text-sm">
                          <ArrowRight className="mr-1 inline h-3 w-3 text-gray-500" />
                          <a href={pg.url}>{pg.name}</a>
                          {pg.summary ? (
                            <span className="text-gray-500">{` - ${pg.summary}`}</span>
                          ) : null}
                        </div>
                      ))
                    : null}
                </div>
              </div>
              <div className="hidden sm:ml-auto sm:inline-block">
                <a
                  href={l.url}
                  className="flex items-center pt-1 font-mono text-xs text-gray-500 underline-offset-2 hover:underline"
                >
                  <LinkIcon className="mr-1 inline" />
                  {l.url}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
        <p className="pt-4 font-mono text-xs text-gray-500">
          <strong>Disclaimer: </strong>Links do not necessarily imply my
          endorsement of all contents, and certainly not my employer's.
        </p>
      </LandingLayout>
    </CategoryContext.Provider>
  )
}
