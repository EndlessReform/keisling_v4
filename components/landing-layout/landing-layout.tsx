import clsx from 'clsx'
import PageHead from '../page-head/page-head'
import Container from '../../components/container/container'
import Layout from '../../components/layout/layout'
import useAccentColor from '../../lib/useAccentColor'

type LLProps = {
  title: string
  about: string
  children: React.ReactNode
}

export default function LandingLayout(props: LLProps) {
  let accent = useAccentColor()
  return (
    <Layout>
      <PageHead title={`${props.title} | Jacob Keisling`} />
      <Container>
        <div>
          <h1
            className={clsx(
              'mt-6 mb-4 text-5xl font-medium tracking-tight',
              accent
            )}
          >
            {props.title}
          </h1>
          <p className="mb-8 text-xl text-gray">{props.about}</p>
        </div>
        {props.children}
      </Container>
    </Layout>
  )
}
