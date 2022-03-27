import Link from 'next/link'
import { motion } from 'framer-motion'
import clsx from 'clsx'

// Assets
import Chevron from '../../public/icons/chevron_down.svg'
import DocumentIcon from '../../public/icons/document.svg'
import UserIcon from '../../public/icons/user.svg'
import Logo from '../../public/logos/logo.svg'
import useAccentColor from '../../lib/useAccentColor'

interface NavSubmenuProps {
  icon: React.ReactNode
  display_name: string
  to: string
}

interface NavItemProps {
  display_name: string
  to: string
  /// Have to do this because Tailwind doesn't like concatenated class names
  color_rule: string
  open: boolean
  menu_items: NavSubmenuProps[]
}

const NavItem = (props: NavItemProps) => {
  let submenuExists = props.menu_items.length > 0
  return (
    <div className="group">
      <div
        className={clsx('flex', 'items-center', 'text-gray', props.color_rule)}
      >
        <Link href={props.to}>
          <a>{props.display_name}</a>
        </Link>
        {submenuExists ? <Chevron /> : null}
      </div>
      {submenuExists ? (
        <div className="absolute invisible group-hover:visible ">
          <ul className="p-2 mt-2 border-2 rounded-lg border-pink-light bg-bg">
            {props.menu_items.map((item, idx) => {
              return (
                <li
                  key={idx}
                  className="left-[-50%] flex w-[150%] items-center"
                >
                  {item.icon}
                  <Link href={item.to}>
                    <a className="ml-1 text-gray">{item.display_name}</a>
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

const Header = () => {
  const curr_color = useAccentColor()

  return (
    <nav className="fixed z-30 w-full text-sm border-b border-bg bg-bg/90">
      <div className="flex items-center max-w-screen-lg p-4 sm:px-8 lg:mx-auto">
        <motion.div whileHover={{ rotate: '45deg' }}>
          <Link href="/">
            <a>
              <Logo className={clsx('h-12 w-12', curr_color)} />
            </a>
          </Link>
        </motion.div>
        <div className="flex items-center gap-6 ml-auto ">
          <NavItem
            to="/about"
            display_name="About"
            color_rule="group-hover:text-blue"
            open={true}
            menu_items={[
              {
                display_name: 'Resume',
                to: '/about/resume',
                icon: <DocumentIcon />,
              },
              {
                display_name: 'Personal',
                to: '/about/personal',
                icon: <UserIcon />,
              },
            ]}
          />
          <NavItem
            to="/reading"
            display_name="Reading"
            color_rule="hover:text-red"
            open={true}
            menu_items={[]}
          />
          <NavItem
            to="/writing"
            display_name="Writing"
            color_rule="hover:text-green"
            open={true}
            menu_items={[]}
          />
          <NavItem
            to="/links"
            display_name="Links"
            color_rule="hover:text-purple"
            open={true}
            menu_items={[]}
          />
        </div>
      </div>
    </nav>
  )
}

export default Header
