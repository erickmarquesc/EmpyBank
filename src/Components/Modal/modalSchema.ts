import { z } from "zod";

/*  Schema ModalBodyAssistant */
export const confirmFormAssistantSchema = z.object({
  name: z.string().min(3, { message: 'O nome precisa ter no mínimo 3 caracteres' }),
  email: z.string().email({ message: 'Digite um e-mail válido' }),
  phone: z.string().min(8, { message: 'Número de telefone celular (nove digitos) ou fixo (oito digitos)' }),
})

export type ConfirmFormAssistantData = z.infer<typeof confirmFormAssistantSchema>

/*  Schema ModalBodyCustomer */
export const confirmFormCustomerSchema = z.object({
  code: z.string().regex(/^(X|x){2}\d{2}-\d$/, { message: 'O código precisa começar com "XX" , seguido por dois números, um hífen e um digito número' }),
  name: z.string().min(3, { message: 'O nome precisa ter no mínimo 3 caracteres' }),
  network: z.string().min(5, { message: 'A Rede precisa ter o padrão: ex Rede A ou Rede B' }),
})

export type ConfirmFormCustomerData = z.infer<typeof confirmFormCustomerSchema>