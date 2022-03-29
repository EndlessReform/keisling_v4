import Head from 'next/head'

type PageHeadProps = {
  title: string
  og_description?: string
}

export default function PageHead({ title, og_description }: PageHeadProps) {
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
      <meta property="og:title" content={title.split('|')[0]} />
      <meta property="og:type" content="article" />
      {og_description && (
        <meta property="og:description" content={og_description} />
      )}
    </Head>
  )
}
