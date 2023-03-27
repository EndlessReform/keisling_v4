import { motion } from "framer-motion"
import Link from "next/link"
import clsx from "clsx"

import ArrowRight from "../../public/icons/arrow-right.svg"

interface ButtonLinkProps {
    display_name: string,
    to: string,
    className: string,
}

const ButtonLink = (props: ButtonLinkProps) => {
    return(
        <motion.div 
            whileHover="hover"
            className={clsx(
                'px-3 py-2 mr-4 rounded-xl',
                props.className,
            )
        }
        >
        <Link href={props.to} className='flex items-center'>
            <motion.div
                transition={{
                duration: 0.5,
                }}
                variants={{
                hover: {
                    x: [0, 5, 3],
                }
                }}
            >
                <ArrowRight 
                className="w-5 h-5 mr-1" 
                />
            </motion.div>
            {props.display_name}
        </Link>
        </motion.div>
    )
}

export default ButtonLink