import { ConfirmFormCustomerData, confirmFormCustomerSchema } from "./modalSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { useModal } from "@/Context/ModalContext"

import { ModalFooter, ModalForm } from "./styles"
import { api } from "@/lib/axios"
import { AxiosError } from "axios"

export default function ModalBodyCustomer() {

  const { modalSetIsOpen } = useModal()

  const {
    register,
    handleSubmit,
    formState: { isValid, errors }
  } = useForm<ConfirmFormCustomerData>({
    resolver: zodResolver(confirmFormCustomerSchema)
  })

  async function handleConfirmCustomer(data: ConfirmFormCustomerData) { //registro do customer
    try {
      await api.post('/customers', {
        name: data.name,
        code: data.code,
        network: data.network,
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

