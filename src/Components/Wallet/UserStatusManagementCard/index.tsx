import { useState } from 'react'
import Image from 'next/image'

import { useAssistant } from '@/Context/AssistantContext'
import { useCustomer } from '@/Context/CustomerContext'
import { useModal } from '@/Context/ModalContext'

import imgLogo from '@/assets/logo/logo.svg'

import {
  PiPlusCircle,
  PiArrowCircleLeft,
  PiArrowCircleRight,
  PiMagnifyingGlassThin,
} from 'react-icons/pi'

import {
  UserStatusManagementCardClean,
  UserStatusManagementCardTable,
  UserStatusManagementCardHeader,
  UserStatusManagementCardContent,
  UserStatusManagementCardSearchContent,
} from './styles'

interface IUserStatusManagementCardProps {
  title: string,
  type: 'customer' | 'assistant',
}

/* 
 * UserStatusManagementCard é um componente comum aos tipos de usuários que pode ser:
 * type: 'customer' | 'assistant',
 * dependendo do type o card se comportará de uma maneira.
 */
export default function UserStatusManagementCard({ title, type }: IUserStatusManagementCardProps) {

  const { modalSetIsOpen, userStatusManagementChange } = useModal()

  const [searchTerm, setSearchTerm] = useState('')

  const {
    assistantNameSelected,
    assistantsWithRelation,
    assistantIdSelected } = useAssistant()

  const {
    DisconnectCustomerAndAssistant,
    AssociateCustomerWithAssistant,
    selectedCustomers,
    CustomersIdCheckBoxChange,
    customersOptionsList } = useCustomer()

  const handleModalSetIsOpen = () => {
    modalSetIsOpen()
    userStatusManagementChange('customer')
  }

  function handleAssociateCustomerWithAssistant() {
    AssociateCustomerWithAssistant(assistantIdSelected)
  }

  function handleDisconnectCustomerAndAssistant() {
    DisconnectCustomerAndAssistant(assistantIdSelected)
  }

  function handleCustomersIdCheckBoxChange(customerId: string) {
    CustomersIdCheckBoxChange(customerId)
  }

  const filteredCustomers = customersOptionsList.filter((customer) =>
    customer.code.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredassistantsWithRelation = assistantsWithRelation.filter((customer) =>
    customer.code.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const usersList = type == 'customer' ? filteredCustomers : filteredassistantsWithRelation

  const customerOptionsLength = customersOptionsList.length
  const assistantRelationLength = assistantsWithRelation.length
  
  const assistantName = assistantNameSelected ? assistantNameSelected : 'Assistente não selecionado'

  return (
    <UserStatusManagementCardContent>
      <UserStatusManagementCardHeader type={type}>
        <section>
          <h1>
            {title}
          </h1>
          <h2>
            {assistantName}
          </h2>
          <label className="customer">{customerOptionsLength}</label>
          <label className="assistant">{assistantRelationLength}</label>
        </section>

        <div>
          <button className="customer"
            onClick={() => { handleModalSetIsOpen() }}
          >
            <PiPlusCircle size={18} />
            Adicionar cliente
          </button>
          <button className="customer associate"
            onClick={() => { handleAssociateCustomerWithAssistant() }}
            disabled={!assistantIdSelected || customerOptionsLength === 0}
          >
            Vincular
            <PiArrowCircleRight size={18} />
          </button>
          <button className="assistant"
            onClick={() => { handleDisconnectCustomerAndAssistant() }}
            disabled={!assistantIdSelected || assistantRelationLength === 0}
          >
            <PiArrowCircleLeft size={18} />
            Desvincular
          </button>
        </div>
      </UserStatusManagementCardHeader>

      <UserStatusManagementCardSearchContent>
        <input
          type="text"
          placeholder="Buscar pelo código"
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <PiMagnifyingGlassThin className="search-icon" />
      </UserStatusManagementCardSearchContent>

      <UserStatusManagementCardTable>
        <thead>
          <tr>
            <th>
              <input type="checkbox" className="checkedAll" disabled />
              {/* Enfrentei problemas com o comportamento do checkbox */}
            </th>
            <th>Código</th>
            <th>Parceiro</th>
            <th>Rede</th>
          </tr>
        </thead>
        <tbody>
          {usersList.map((customer) => {
            return (
              <tr key={customer.id}>
                <td className="first-child">
                  <input
                    type="checkbox"
                    value={customer.id}
                    onChange={() => handleCustomersIdCheckBoxChange(customer.id)}
                    checked={selectedCustomers.includes(customer.id)}
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
          })
          }
        </tbody>
      </UserStatusManagementCardTable>

      {usersList.length <= 0 &&
        <UserStatusManagementCardClean>
          <Image
            alt="imagem da logo empybank"
            src={imgLogo}
          />
          <h1>Não há registros</h1>
          <h3>Crie um novo registro</h3>
        </UserStatusManagementCardClean>
      }
    </UserStatusManagementCardContent>
  )
}