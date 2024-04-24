import { useModal } from "@/Context/ModalContext"
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
import { AxiosError } from "axios"

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
  const { assistantNameSelected, assistantsWithRelation, assistantIdSelected } = useAssistant()

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

  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);

  const handleCheckBoxChange = (customerId: string) => {
    // Verifica se o cliente já está na lista de selecionados
    const isChecked = selectedCustomers.includes(customerId);

    if (isChecked) {
      // Se já estiver selecionado, remove da lista
      setSelectedCustomers(selectedCustomers.filter(id => id !== customerId));
    } else {
      // Se não estiver selecionado, adiciona à lista
      setSelectedCustomers([...selectedCustomers, customerId]);
    }
  };

  async function vincular() {
    for (const customerId of selectedCustomers) {
      try {
        await api.post('/customerAssistantRelation', {
          assistantId: assistantIdSelected,
          customerId: customerId,
        })
      } catch (err) {
        if (err instanceof AxiosError && err?.response?.data?.message) {
          alert(err.response.data.message);
        };
      }
    }
  }

  async function desvincular() {
    for (const customerId of selectedCustomers) {
      console.log('desvincular')
      try {
        await api.put('/customerAssistantRelation/deletar', {
          assistantId: assistantIdSelected,
          customerId: customerId,
        })
      } catch (err) {
        if (err instanceof AxiosError && err?.response?.data?.message) {
          alert(err.response.data.message);
        };
      }
    }
  }

  const customersList = type == "customer" ? customersOptionsList : assistantsWithRelation

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
          <label className="assistant">{assistantsWithRelation.length}</label>
        </section>

        <div>
          <button className="customer"
            onClick={() => { handleModalSetIsOpen() }}
          >
            <PiPlusCircle size={18} />
            Adicionar cliente
          </button>
          <button className="customer vincular"
            onClick={() => { vincular() }}
          >
            Vincular
            <PiArrowCircleRight size={18} />
          </button>
          <button className="assistant"
            onClick={() => { desvincular() }}
          >
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
          {customersList.map((customer) => {
            return (
              <tr key={customer.id}>
                <td className="first-child">
                  <input
                    type="checkbox"
                    value={customer.id}
                    onChange={() => handleCheckBoxChange(customer.id)}
                  />
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
      </UserStatusManagementCardTable>
    </UserStatusManagementCardContent>
  )
}