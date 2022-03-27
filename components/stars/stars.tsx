import { HTMLProps } from 'react'

type StarProps = {
  n: number
}

const Stars: React.FC<StarProps & HTMLProps<HTMLParagraphElement>> = ({
  n,
  ...props
}) => {
  return (
    <p {...props}>
      <span className="text-red">{'✶'.repeat(Math.min(n, 5))}</span>
      <span className="text-gray">{'✶'.repeat(Math.min(5 - n, 5))}</span>
    </p>
  )
}

export default Stars
