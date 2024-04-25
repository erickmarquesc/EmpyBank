import UserStatusManagementCard from '@/Components/Wallet/UserStatusManagementCard'
import { HomeContent, HomeContentUserStatusManagementCard } from './styles'
import WalletHeader from '@/Components/Wallet/Header'
import { NextSeo } from 'next-seo'

export default function Home() {
  return (
    <>
      <NextSeo
        title='Empy | Wallet'
        description='Soluções financeiras criativas e inteligentes.'
      />
      <HomeContent>

        <WalletHeader />

        <HomeContentUserStatusManagementCard>
          <UserStatusManagementCard
            title="Cliente (Não vinculado)"
            type="customer" />
          <UserStatusManagementCard
            title="Carteira de:"
            type="assistant" />
        </HomeContentUserStatusManagementCard>

      </HomeContent>
    </>
  )
}