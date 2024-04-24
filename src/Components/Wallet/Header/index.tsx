import { useModal } from "@/Context"
import { WalletHeaderContent } from "./styles"
import { PiPlusCircle } from "react-icons/pi"
import { api } from "@/lib/axios"
import { useEffect, useState } from "react"
import { useAssistant } from "@/Context/AssistantContext"

interface IAssistantsOptionsProp {
  name: string,
  id: string
}

export default function WalletHeader() {
  const { modalSetIsOpen, userStatusManagementChange } = useModal()
  const { assistantOptionsList, getAssistantIdForOptionsList } = useAssistant()

  const handleModalSetIsOpen = () => {
    modalSetIsOpen()
    userStatusManagementChange("assistant")
  }

  const handleoptions = (id: string) => {
    getAssistantIdForOptionsList(id)
  }

  return (
    <WalletHeaderContent>
      <h1>Carteira de clientes</h1>

      <section>
        <label>Selecione o Assistente Comercial</label>

        <div>
          <select onChange={(e) => handleoptions(e.target.value)}>
            <option value="" disabled selected>Selecione uma opção</option>
            {assistantOptionsList.map((option) => (
              <option value={option.id} key={option.id}>
                {option.name}
              </option>
            ))}
          </select>

          <button
            onClick={() => { handleModalSetIsOpen() }}
          >
            <PiPlusCircle size={22} />
          </button>
        </div>
      </section>
    </WalletHeaderContent>
  )
}