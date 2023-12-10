'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import clsx from 'clsx'

import { ArrowRight } from '@carbon/icons-react'

interface ButtonLinkProps {
  display_name: string
  to: string
  className: string
}

const ButtonLink = (props: ButtonLinkProps) => {
  return (
    <motion.div
      whileHover="hover"
      className={clsx('mr-4 rounded-xl px-3 py-2', props.className)}
    >
      <Link href={props.to} className="flex items-center">
        <motion.div
          transition={{
            duration: 0.5,
          }}
          variants={{
            hover: {
              x: [0, 5, 3],
            },
          }}
        >
          <ArrowRight className="mr-1 h-5 w-5" />
        </motion.div>
        {props.display_name}
      </Link>
    </motion.div>
  )
}

export default ButtonLink
