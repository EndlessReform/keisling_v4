import { useEffect, useState, useContext, createContext } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

import LandingLayout from '../../components/landing-layout/landing-layout'
import clsx from 'clsx'

import LinkIcon from '../../public/icons/link.svg'

const CategoryContext = createContext()

function Category({ category }) {
  const [currCategory, setCurrCategory] = useContext(CategoryContext)

  return (
    <button
      onClick={() => {
        setCurrCategory(category)
      }}
      className="text-2xl after:text-gray after:content-['_/'] last:after:content-none"
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
      <LandingLayout
        title="Links"
        about={`Useful links I've found. Links do NOT imply endorsement!`}
      >
        <div className="flex gap-2 py-4 border-y border-t-pink-light border-b-fg">
          {categories.map((cname, key) => (
            <Category category={cname} key={key} />
          ))}
        </div>
        <div className="w-full">
          {links[currCategory].map((l, key) => (
            <motion.div
              key={key}
              className="py-4 border-b border-b-pink-light sm:flex"
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
            >
              <div className="flex">
                <h4 className="mr-2 text-xl text-purple">🡪</h4>
                <div>
                  <h4 className="text-xl tracking-tight hover:text-purple">
                    <a href={l.url}>{l.name}</a>
                  </h4>
                  {l.summary ? (
                    <p className="max-w-md pt-2 text-sm text-gray">
                      {l.summary}
                    </p>
                  ) : null}
                  {l.subpages
                    ? l.subpages.map((pg, key) => (
                        <div key={key} className="mt-2 text-sm">
                          🡪 <a href={pg.url}>{pg.name}</a>
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
                  className="font-mono text-xs text-gray underline-offset-2 hover:underline"
                >
                  <LinkIcon className="inline mr-1" />
                  {l.url}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
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
