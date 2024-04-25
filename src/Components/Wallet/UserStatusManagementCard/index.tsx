import { useEffect, useState } from "react"

import { useAssistant } from "@/Context/AssistantContext"
import { useModal } from "@/Context/ModalContext"

import { AxiosError } from "axios"
import { api } from "@/lib/axios"

import {
  PiArrowCircleRight,
  PiArrowCircleLeft,
  PiPlusCircle,
} from "react-icons/pi"

import {
  UserStatusManagementCardContent,
  UserStatusManagementCardHeader,
  UserStatusManagementCardTable
} from "./styles"
import { useCustomer } from "@/Context/CustomerContext"

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

/* 
 * UserStatusManagementCard é um componente comum aos tipos de usuários que pode ser:
 * type: 'customer' | 'assistant',
 * dependendo do type o card se comportará de uma maneira.
 */
export default function UserStatusManagementCard({ title, type }: IUserStatusManagementCardProps) {

  const { modalSetIsOpen, userStatusManagementChange } = useModal()

  const {
    assistantNameSelected,
    assistantsWithRelation,
    assistantIdSelected } = useAssistant()

  const {
    desvincular,
    vincular,
    selectedCustomers,
    CustomersIdCheckBoxChange,
    customersOptionsList } = useCustomer()

  const handleModalSetIsOpen = () => {
    modalSetIsOpen()
    userStatusManagementChange("customer")
  }

  function handleVincular() {
    vincular(assistantIdSelected)
  }

  function handleDesvincular() {
    desvincular(assistantIdSelected)
  }

  function handleCustomersIdCheckBoxChange(customerId: string) {
    CustomersIdCheckBoxChange(customerId)
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
            onClick={() => { handleVincular() }}
          >
            Vincular
            <PiArrowCircleRight size={18} />
          </button>
          <button className="assistant"
            onClick={() => { handleDesvincular() }}
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
          })}
        </tbody>
      </UserStatusManagementCardTable>
    </UserStatusManagementCardContent>
  )
}