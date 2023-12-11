import Image from 'next/image'
import tea from '../../public/images/hero-deepmind.jpg'
import Link from 'next/link'
import { ArrowUpRight, ArrowDownRight } from '@carbon/icons-react'

/** TODO: make this abstracted if I need it again */
export const Hero = () => {
  return (
    <>
      <div className="flex w-full flex-col items-center justify-center rounded-3xl bg-gray-100 px-4 md:px-8 lg:px-16">
        <Image
          src={tea}
          alt="Hero image of a cup of tea"
          className="my-3 rounded-full lg:my-6"
        />
      </div>
      <div className="mt-8 mb-16 flex flex-col items-center justify-center">
        <h1 className="font-stretch-expanded max-w-screen-md text-center text-2xl font-extralight leading-7 md:text-3xl lg:text-4xl lg:leading-none">
          <span className="font-medium text-brand-500">Jacob Keisling</span>{' '}
          does ML engineering, front-end development, and design,{' '}
          <span className="italic">inter alia.</span>
        </h1>
        <div className="mt-6 rounded-full border border-gray-300 px-6 py-2 font-light">
          <Link
            href="/projects"
            className="mr-6 text-blue-600 hover:text-blue-700"
          >
            Projects
            <ArrowUpRight className="mb-1 ml-0.5 inline" />
          </Link>
          <Link
            href="/resume"
            className="mr-6 text-gray-500 hover:text-gray-700"
          >
            Resume
            <ArrowUpRight className="mb-1 ml-0.5 inline" />
          </Link>
          <Link href="#" className="text-gray-500 hover:text-gray-700">
            More
            <ArrowDownRight className="mb-1 ml-0.5 inline" />
          </Link>
        </div>
      </div>
    </>
  )
}
