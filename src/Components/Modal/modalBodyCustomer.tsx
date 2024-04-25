import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { ConfirmFormCustomerData, confirmFormCustomerSchema } from './modalSchema'
import { useCustomer } from '@/Context/CustomerContext'
import { useModal } from '@/Context/ModalContext'

import { ModalFooter, ModalForm } from './styles'

export default function ModalBodyCustomer() {

  const { modalSetIsOpen } = useModal()
  const { CreateCustomer } = useCustomer()

  const {
    register,
    handleSubmit,
    formState: { isValid, errors }
  } = useForm<ConfirmFormCustomerData>({
    resolver: zodResolver(confirmFormCustomerSchema)
  })

  function handleConfirmCustomer(data: ConfirmFormCustomerData) {
    CreateCustomer(data)
  }

  const handleModalSetIsOpen = () => {
    modalSetIsOpen()
  }

  return (
    <ModalForm onSubmit={handleSubmit(handleConfirmCustomer)}>
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

