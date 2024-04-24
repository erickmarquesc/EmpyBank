import { ConfirmFormCustomerData, confirmFormCustomerSchema } from "./modalSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { useModal } from "@/Context/ModalContext"

import { ModalFooter, ModalForm } from "./styles"
import { api } from "@/lib/axios"
import { AxiosError } from "axios"
import { useCustomer } from "@/Context/CustomerContext"

export default function ModalBodyCustomer() {

  const { modalSetIsOpen } = useModal()
  const { createCustomer } = useCustomer()

  const {
    register,
    handleSubmit,
    formState: { isValid, errors }
  } = useForm<ConfirmFormCustomerData>({
    resolver: zodResolver(confirmFormCustomerSchema)
  })

  function handleConfirmCustomer(data: ConfirmFormCustomerData) {
    createCustomer(data)
  }

  const handleModalSetIsOpen = () => {
    modalSetIsOpen()
  }

  return (
    <ModalForm as='Form' onSubmit={handleSubmit(handleConfirmCustomer)}>
      <h1>Cadastro de Cliente</h1>

      <div>
        <section>
          <label>
            Código do Cliente
            {errors.code && <strong>{errors.code.message}</strong>}
          </label>
          <input
            placeholder="Digite a quantidade"
            {...register('code')}
          />
        </section>

        <section>
          <label>
            Nome do Cliente
            {errors.name && <strong>{errors.name.message}</strong>}
          </label>
          <input placeholder="Digite a quantidade"
            {...register('name')}
          />
        </section>

        <section>
          <label>
            Rede
            {errors.network && <strong>{errors.network.message}</strong>}
          </label>
          <input placeholder="Digite a quantidade"
            {...register('network')}
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

