import { Metadata } from 'next'
import { get_links } from '../../lib/get_links'
import { Links } from './Links'

export const metadata: Metadata = {
  title: 'Links',
}

/** Wrapper for SSR: actual page needs client-side info */
export default async function LinksPage() {
  const links = await get_links()

  let categories = Object.keys(links)

  return <Links links={links} categories={categories} />
}
