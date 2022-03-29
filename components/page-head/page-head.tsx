import Head from 'next/head'

type PageHeadProps = {
  title: string
}

export default function PageHead({ title }: PageHeadProps) {
  return (
    <Head>
      <title>{title}</title>
      <link rel="shortcut icon" href="/favicon.ico" />
      <meta lang="en" />
      <meta name="author" content="Jacob Keisling" />
      <meta name="copyright" content="Jacob Keisling" />
      <meta charSet="utf-8" />
      <meta
        name="description"
        content="Jacob Keisling's personal website, for better or worse. I write about front-end development, hardware, progress studies, and East Asian history."
      ></meta>
    </Head>
  )
}
