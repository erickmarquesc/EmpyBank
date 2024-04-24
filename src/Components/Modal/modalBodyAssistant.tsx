import { ConfirmFormAssistantData, confirmFormAssistantSchema } from "./modalSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { useAssistant } from "@/Context/AssistantContext"
import { useModal } from "@/Context/ModalContext"

import { ModalFooter, ModalForm } from "./styles"

export default function ModalBodyAssistant() {
  const { modalSetIsOpen } = useModal()
  const { creatAssistant } = useAssistant()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<ConfirmFormAssistantData>({
    resolver: zodResolver(confirmFormAssistantSchema)
  })

  async function handleCreateAssistant(data: ConfirmFormAssistantData) {
    creatAssistant(data)
  }

  const handleModalSetIsOpen = () => {
    modalSetIsOpen()
  }

  return (
    <ModalForm as='Form' onSubmit={handleSubmit(handleCreateAssistant)}>
      <h1>Cadastro de Assistente Comercial</h1>

      <div>
        <section>
          <label>
            Nome completo
            {errors.name && <strong>{errors.name.message}</strong>}
          </label>
          <input placeholder="Digite a quantidade"
            {...register('name')}
          />
        </section>

        <section>
          <label>
            Email
            {errors.email && <strong>{errors.email.message}</strong>}
          </label>
          <input placeholder="Digite a quantidade"
            {...register('email')}
          />
        </section>

        <section>
          <label>
            Telefone
            {errors.phone && <strong>{errors.phone.message}</strong>}
          </label>
          <input placeholder="Digite a quantidade"
            {...register('phone')}
          />
        </section>
      </div>

      <ModalFooter>
        <button
          type="button"
          onClick={() => { handleModalSetIsOpen() }}
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={!isValid}
          onClick={() => { handleModalSetIsOpen() }}
        >
          Salvar
        </button>
      </ModalFooter>
    </ModalForm>
  )
}