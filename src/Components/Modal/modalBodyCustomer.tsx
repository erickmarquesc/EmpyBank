import { z } from "zod"
import { ModalFooter, ModalForm } from "./styles"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useModal } from "@/Context"

const confirmFormCustomerSchema = z.object({
  code: z.string().regex(/^(X|x){2}\d{2}-\d$/, { message: 'O código precisa começar com "XX" , seguido por dois números, um hífen e um digito número' }),
  name: z.string().min(3, { message: 'O nome precisa ter no mínimo 3 caracteres' }),
  network: z.string().min(5, { message: 'A Rede precisa ter o padrão: ex Rede A ou Rede B' }),
})

type ConfirmFormCustomerData = z.infer<typeof confirmFormCustomerSchema>

export default function ModalBodyCustomer() {

  const { modalSetIsOpen } = useModal()

  const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<ConfirmFormCustomerData>({
    resolver: zodResolver(confirmFormCustomerSchema)
  })

  const handleConfirmCustomer = (data: ConfirmFormCustomerData) => {
    console.log(data)
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

