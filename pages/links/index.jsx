import { useEffect, useState, useContext, createContext } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

import PageHead from '../../components/page-head/page-head'
import LandingLayout from '../../components/landing-layout/landing-layout'
import clsx from 'clsx'

import ArrowRight from '../../public/icons/arrow-right.svg'
import LinkIcon from '../../public/icons/link.svg'

const CategoryContext = createContext()

function Category({ category }) {
  const [currCategory, setCurrCategory] = useContext(CategoryContext)

  return (
    <button
      onClick={() => {
        setCurrCategory(category)
      }}
      className="text-2xl after:text-gray-500 after:content-['_/'] last:after:content-none"
    >
      <h2
        className={clsx(
          category == currCategory ? 'font-medium text-fg' : 'text-gray',
          'inline text-2xl capitalize hover:text-purple'
        )}
      >
        {category}
      </h2>
    </button>
  )
}

export default function LinksPage({ links }) {
  let categories = Object.keys(links)
  const [currCategory, setCurrCategory] = useState(categories[0])

  return (
    <CategoryContext.Provider value={[currCategory, setCurrCategory]}>
      <PageHead title={'Links | Jacob Keisling'} />
      <LandingLayout
        title="Links"
        about={`A collection of ${
          Object.values(links).flat().length
        } interesting links and resources`}
      >
        <div className="flex flex-wrap gap-2 border-y border-t-pink-light border-b-fg py-4">
          {categories.map((cname, key) => (
            <Category category={cname} key={key} />
          ))}
        </div>
        <div className="w-full">
          {links[currCategory].map((l, key) => (
            <motion.div
              key={key}
              className="border-b border-b-pink-light py-4 sm:flex"
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
            >
              <div className="flex">
                <ArrowRight className="mt-1 mr-1 h-5 w-5 text-purple" />
                <div>
                  <h4 className="text-xl tracking-tight hover:text-purple">
                    <a href={l.url}>{l.name}</a>
                  </h4>
                  {l.summary ? (
                    <p className="text-gray max-w-md pt-2 text-sm">
                      {l.summary}
                    </p>
                  ) : null}
                  {l.subpages
                    ? l.subpages.map((pg, key) => (
                        <div key={key} className="mt-2 text-sm">
                          <ArrowRight className="text-gray mr-1 inline h-3 w-3" />
                          <a href={pg.url}>{pg.name}</a>
                          {pg.summary ? (
                            <span className="text-gray">{` - ${pg.summary}`}</span>
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
        <p className="text-gray pt-4 font-mono text-xs">
          <strong>Disclaimer: </strong>Links do not necessarily imply my
          endorsement of all contents, and certainly not my employer's.
        </p>
      </LandingLayout>
    </CategoryContext.Provider>
  )
}

export async function getStaticProps() {
  function get_links() {
    const yamlLocation = path.join(process.cwd(), 'posts', 'links', 'links.yml')
    // Import
    const fileContents = fs.readFileSync(yamlLocation, 'utf-8')
    return yaml.load(fileContents)
  }
  return {
    props: {
      links: get_links(),
    },
  }
}
