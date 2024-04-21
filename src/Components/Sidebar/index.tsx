import Image from 'next/image'

import logoImg from '@/assets/logo/logo.svg'
import Link from 'next/link'
import userImg from '@/assets/userimg.svg'
import {
  PiChartPie,
  PiWallet,
  PiToolbox,
  PiStorefront,
  PiClipboardText,
  PiMoneyLight,
  PiUserCircle,
  PiSun
} from "react-icons/pi";

export default function Sidebar() {
  return (
    <div className='sidebar'>
      <div>
        <Image
          alt='logo'
          src={logoImg}
        />
        <menu>
          <Link href='/'
            aria-selected
          >
            <PiChartPie
              size={21}
              className='icon'
            />
          </Link>
          <Link href='/'>
            <PiWallet
              size={21}
              className='icon'
            />
          </Link>
          <Link href='/'>
            <PiToolbox
              size={21}
              className='icon'
            />
          </Link>
          <Link href='/'>
            <PiStorefront
              size={21}
              className='icon'
            />
          </Link>
          <Link href='/'>
            <PiClipboardText
              size={21}
              className='icon'
            />
          </Link>
          <Link href='/'>
            <PiMoneyLight
              size={21}
              className='icon'
            />
          </Link>
        </menu>
      </div>
      <div className='content'>
        <PiUserCircle size={21} />
        <PiSun size={21} />
        <Image
          alt='user Image'
          src={userImg}
        />
      </div>
    </div>
  )
}