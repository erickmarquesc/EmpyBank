import { useModal } from "@/Context/ModalContext"
import { WalletHeaderContent } from "./styles"
import { PiPlusCircle } from "react-icons/pi"
import { useAssistant } from "@/Context/AssistantContext"

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
          <select
            onChange={(e) => handleoptions(e.target.value)}
            defaultValue="" 
          >
            <option value="" disabled>Selecione uma opção</option>
            {assistantOptionsList.map((option) => (
              <option
                value={option.id}
                key={option.id}
              >
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