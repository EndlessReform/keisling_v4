import Link from 'next/link'
import { motion } from 'framer-motion'
import clsx from 'clsx'

import { ChevronDown } from '@carbon/icons-react'
import { Logo } from '../Logo'

interface NavSubmenuProps {
  icon: React.ReactNode
  display_name: string
  to: string
}

interface NavItemProps {
  display_name: string
  to: string
  open: boolean
  menu_items: NavSubmenuProps[]
}

const NavItem = (props: NavItemProps) => {
  let submenuExists = props.menu_items.length > 0
  return (
    <div className="group">
      <div
        className={clsx(
          'flex',
          'items-center',
          'text-gray-400',
          'hover:text-gray-500'
        )}
      >
        <Link href={props.to}>{props.display_name}</Link>
        {submenuExists ? <ChevronDown /> : null}
      </div>
      {submenuExists ? (
        <div className="invisible absolute group-hover:visible ">
          <ul className="mt-2 rounded-lg border-2 border-gray-100 bg-bg p-2">
            {props.menu_items.map((item, idx) => {
              return (
                <li
                  key={idx}
                  className="left-[-50%] flex w-[150%] items-center"
                >
                  {item.icon}
                  <Link href={item.to} className="text-gray ml-1">
                    {item.display_name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ) : null}
    </div>
  )
}

export const Header = () => {
  return (
    <nav className="fixed z-30 w-full border-b border-bg bg-bg/90">
      <div className="flex max-w-screen-lg items-center p-4 sm:px-8 lg:mx-auto">
        <motion.div whileHover={{ rotate: '45deg' }}>
          <Link href="/" aria-label="Home">
            <Logo
              className={'h-12 w-12 text-brand-500 hover:text-brand-600'}
              alt="Jacob Keisling's logo"
            />
          </Link>
        </motion.div>
        <div className="ml-auto flex items-center gap-6 ">
          <NavItem
            to="/about"
            display_name="About"
            open={true}
            menu_items={[]}
          />
          <NavItem
            to="/reading"
            display_name="Reading"
            open={true}
            menu_items={[]}
          />
          <NavItem
            to="/writing"
            display_name="Writing"
            open={true}
            menu_items={[]}
          />
          <NavItem
            to="/links"
            display_name="Links"
            open={true}
            menu_items={[]}
          />
        </div>
      </div>
    </nav>
  )
}
