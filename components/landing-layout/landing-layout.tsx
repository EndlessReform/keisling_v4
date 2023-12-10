import clsx from 'clsx'
import PageHead from '../page-head/page-head'
import Container from '../../components/container/container'
import Layout from '../../components/layout/layout'

type LLProps = {
  title: string
  about: string
  children: React.ReactNode
}

export default function LandingLayout(props: LLProps) {
  return (
    <Layout>
      <PageHead title={`${props.title} | Jacob Keisling`} />
      <Container>
        <div>
          <h1 className={clsx('mt-6 mb-4 text-5xl font-medium tracking-tight')}>
            {props.title}
          </h1>
          <p className="text-gray mb-8 text-xl">{props.about}</p>
        </div>
        {props.children}
      </Container>
    </Layout>
  )
}
