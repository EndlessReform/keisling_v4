import clsx from 'clsx'
import Container from '../container/container'

type LandingLayoutProps = {
  title: string
  about: string
  children: React.ReactNode
}

export function LandingLayout(props: LandingLayoutProps) {
  return (
    <Container>
      <div>
        <h1
          className={
            'font-stretch-expanded mt-4 mb-4 text-4xl font-medium text-brand-500'
          }
        >
          {props.title}
        </h1>
        <p className="mb-8 font-serif text-xl font-light text-gray-500">
          {props.about}
        </p>
      </div>
      {props.children}
    </Container>
  )
}
