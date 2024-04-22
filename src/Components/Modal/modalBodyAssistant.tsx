import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { useForm } from "react-hook-form"
import { useModal } from "@/Context"

import { ModalFooter, ModalForm } from "./styles"
import { api } from "@/lib/axios"
import { AxiosError } from "axios"

const confirmFormAssistantSchema = z.object({
  name: z.string().min(3, { message: 'O nome precisa ter no mínimo 3 caracteres' }),
  email: z.string().email({ message: 'Digite um e-mail válido' }),
  phone: z.string().min(8, { message: 'Número de telefone celular (nove digitos) ou fixo (oito digitos)' }),
})

type ConfirmFormAssistantData = z.infer<typeof confirmFormAssistantSchema>

export default function ModalBodyAssistant() {
  const { modalSetIsOpen } = useModal()


  const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<ConfirmFormAssistantData>({
    resolver: zodResolver(confirmFormAssistantSchema)
  })

  async function handleConfirmAssistant(data: ConfirmFormAssistantData) {
    try {
      await api.post('/assistants', {
        name: data.name,
        email: data.email,
        phone: data.phone,
      })
    } catch (err) {
      if (err instanceof AxiosError && err?.response?.data?.message) {
        alert(err.response.data.message);
      };
    }
  }

  const handleModalSetIsOpen = () => {
    modalSetIsOpen()
  }

  return (
    <ModalForm as='Form' onSubmit={handleSubmit(handleConfirmAssistant)}>
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
        >
          Salvar
        </button>
      </ModalFooter>

    </ModalForm>
  )
}