import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

export type LinkMetadata = {
  name: string
  url: string
  summary: string
  subpages: undefined | LinkMetadata[]
}

export function get_links() {
  const yamlLocation = path.join(process.cwd(), 'posts', 'links', 'links.yml')
  // Import
  const fileContents = fs.readFileSync(yamlLocation, 'utf-8')
  // Dangerously coerce to type.
  // TODO: Validate this.
  return yaml.load(fileContents) as LinkMetadata[]
}
