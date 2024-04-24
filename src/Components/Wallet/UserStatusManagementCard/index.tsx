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
import { useAssistant } from "@/Context/AssistantContext"
import { api } from "@/lib/axios"
import { useEffect, useState } from "react"

interface IUserStatusManagementCardProps {
  title: string,
  type: 'customer' | 'assistant',
}

interface IAssistantsOptionsProp {
  id: string,
  code: string,
  name: string,
  network: string,
}

export default function UserStatusManagementCard({ title, type }: IUserStatusManagementCardProps) {

  const { modalSetIsOpen, userStatusManagementChange } = useModal()
  const { assistantNameSelected, assistantsWithoutRelation } = useAssistant()
  
  const handleModalSetIsOpen = () => {
    modalSetIsOpen()
    userStatusManagementChange("customer")
  }

  const [customersOptionsList, setcustomersOptionsList] = useState<IAssistantsOptionsProp[]>([]) // customers sem relação

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/customers/list');
        setcustomersOptionsList(response.data);
      } catch (error) {
        console.error('Erro ao obter a lista de assistentes:', error);
      }
    };

    fetchData();
  }, [])

  return (
    <UserStatusManagementCardContent>
      <UserStatusManagementCardHeader type={type}>
        <section>
          <h1>
            {title}
          </h1>
          <h2>
            {assistantNameSelected}
          </h2>
          <label className="customer">{customersOptionsList.length}</label>
          <label className="assistant">{assistantsWithoutRelation.length}</label>
        </section>

        <div>
          <button className="customer"
            onClick={() => { handleModalSetIsOpen() }}
          >
            <PiPlusCircle size={18} />
            Adicionar cliente
          </button>
          <button className="customer vincular">
            Vincular
            <PiArrowCircleRight size={18} />
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

        {
          type == "customer" ?
            <tbody>
              {customersOptionsList.map((customer) => {
                return (
                  <tr key={customer.id}>
                    <td className="first-child">
                      <input type="checkbox" />
                    </td>
                    <td className="code-child">
                      {customer.code}
                    </td>
                    <td>
                      {customer.name}
                    </td>
                    <td className="last-child">
                      {customer.network}
                    </td>
                  </tr>
                )
              })}
            </tbody>
            :
            <tbody>
              {assistantsWithoutRelation.map((customer) => {
                return (
                  <tr key={customer.id}>
                    <td className="first-child">
                      <input type="checkbox" />
                    </td>
                    <td className="code-child">
                      {customer.code}
                    </td>
                    <td>
                      {customer.name}
                    </td>
                    <td className="last-child">
                      {customer.network}
                    </td>
                  </tr>
                )
              })}
            </tbody>
        }
      </UserStatusManagementCardTable>
    </UserStatusManagementCardContent>
  )
}