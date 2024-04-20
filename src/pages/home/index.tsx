import UserStatusManagementCard from "@/Components/Wallet/UserStatusManagementCard"
import { HomeContent, HomeContentUserStatusManagementCard } from "./styles"
import WalletHeader from "@/Components/Wallet/Header"

export default function Home() {
  return (
    <HomeContent>

      <WalletHeader/>

      <HomeContentUserStatusManagementCard>
        <UserStatusManagementCard
          title="Cliente (Não vinculado)"
          type="customer" />
        <UserStatusManagementCard
          title="Carteira do Fulano"
          type="assistant" />
      </HomeContentUserStatusManagementCard>

    </HomeContent>
  )
}