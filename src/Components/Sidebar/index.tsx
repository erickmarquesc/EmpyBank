import Image from 'next/image'
import Link from 'next/link'

import logoImg from '@/assets/logo/logo.svg'
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
import { SidebarContainer, SidebarContentUserSection } from './styles';

export default function Sidebar() {
  return (
    <SidebarContainer>
      <div>
        <Image
          alt='logo'
          src={logoImg}
        />
        <menu>
          <Link href='/inProgress'>
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
          <Link href='/inProgress'>
            <PiToolbox
              size={21}
              className='icon'
            />
          </Link>
          <Link href='/inProgress'>
            <PiStorefront
              size={21}
              className='icon'
            />
          </Link>
          <Link href='/inProgress'>
            <PiClipboardText
              size={21}
              className='icon'
            />
          </Link>
          <Link href='/inProgress'>
            <PiMoneyLight
              size={21}
              className='icon'
            />
          </Link>
        </menu>
      </div>

      <SidebarContentUserSection>
        <PiUserCircle size={21} />
        <PiSun size={21} />
        <Image
          alt='user Image'
          src={userImg}
        />
      </SidebarContentUserSection>

    </SidebarContainer>
  )
}