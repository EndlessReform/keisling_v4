import { HTMLProps } from 'react'

type StarProps = {
  n: number
}

export const Stars: React.FC<StarProps & HTMLProps<HTMLParagraphElement>> = ({
  n,
  ...props
}) => {
  return (
    <p {...props}>
      <span className="text-brand-500">{'✶'.repeat(Math.min(n, 5))}</span>
      <span className="text-gray-400">{'✶'.repeat(Math.min(5 - n, 5))}</span>
    </p>
  )
}
