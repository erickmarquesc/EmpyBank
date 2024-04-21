import { useModal } from "@/Context"
import {
  UserStatusManagementCardContent,
  UserStatusManagementCardHeader,
  UserStatusManagementCardTable
} from "./styles"

import {
  PiArrowCircleRight,
  PiArrowCircleLeft,
  PiPlusCircle,
} from "react-icons/pi"

interface IUserStatusManagementCardProps {
  title: string,
  type: 'customer' | 'assistant',
}

export default function UserStatusManagementCard({ title, type }: IUserStatusManagementCardProps) {
  
  const { modalSetIsOpen, userStatusManagementChange } = useModal()

  const handleModalSetIsOpen = () => {
    modalSetIsOpen()
    userStatusManagementChange("customer")
  }
  
  return (
    <UserStatusManagementCardContent>
      <UserStatusManagementCardHeader type={type}>
        <section>
          <h1>{title}</h1>
          <label>23</label>
        </section>

        <div>
          <button className="customer"
            onClick={() => { handleModalSetIsOpen() }}
          >
            <PiPlusCircle size={18} />
            Adicionar cliente
          </button>
          <button className="customer vincular">
            <PiArrowCircleRight size={18} />
            Vincular
          </button>
          <button className="assistant">
            <PiArrowCircleLeft size={18} />
            Desvincular
          </button>
        </div>
      </UserStatusManagementCardHeader>

      <input />

      <UserStatusManagementCardTable>
        <thead>
          <tr>
            <th><input type="checkbox" /></th>
            <th>Código</th>
            <th>Parceiro</th>
            <th>Rede</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="first-child"><input type="checkbox" /></td>
            <td className="code-child">XX30-2</td>
            <td>Parceiro 1</td>
            <td className="last-child">Rede A</td>
          </tr>
          <tr>
            <td className="first-child"><input type="checkbox" /></td>
            <td className="code-child">XX30-2</td>
            <td>Parceiro 1</td>
            <td className="last-child">Rede A</td>
          </tr>
          <tr>
            <td className="first-child"><input type="checkbox" /></td>
            <td className="code-child">XX30-2</td>
            <td>Parceiro 1</td>
            <td className="last-child">Rede A</td>
          </tr>
        </tbody>
      </UserStatusManagementCardTable>
    </UserStatusManagementCardContent>
  )
}