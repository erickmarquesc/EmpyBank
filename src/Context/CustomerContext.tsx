import { api } from '@/lib/axios'
import { AxiosError } from 'axios'
import {
  useState,
  ReactNode,
  useEffect,
  useContext,
  createContext,
} from 'react'
import { useAssistant } from './AssistantContext'

interface ICustomerOptionsProp {
  id: string,
  code: string,
  name: string,
  network: string,
}

interface ICustomerProps {
  code: string;
  name: string;
  network: string;
}

interface ICustomerContextProps {
  selectedCustomers: string[],
  customersOptionsList: ICustomerOptionsProp[],
  CustomersIdCheckBoxChange: (customerId: string) => void,
  CreateCustomer: ({ name, code, network }: ICustomerProps) => void,
  AssociateCustomerWithAssistant: (assistantIdSelected: string) => void,
  DisconnectCustomerAndAssistant: (assistantIdSelected: string) => void,
}

interface ICustomerContextProviderProps {
  children: ReactNode,
}

// Criação do contexto do clientes
export const CustomerContext = createContext<ICustomerContextProps>({} as ICustomerContextProps)

// Provedor do contexto do clientes
export function CustomerContextProvider({ children }: ICustomerContextProviderProps) {

  const { refresh, RefreshAllRelations } = useAssistant()

  const [customersOptionsList, setcustomersOptionsList] = useState<ICustomerOptionsProp[]>([])
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([])

  // Define os clientes selecionados
  function CustomersIdCheckBoxChange(customerId: string) {
    // Verifica se o cliente já está na lista de selecionados
    const isChecked = selectedCustomers.includes(customerId)

    if (isChecked) {
      // Se já estiver selecionado, remove da lista
      setSelectedCustomers(selectedCustomers.filter(id => id !== customerId))
    } else {
      // Se não estiver selecionado, adiciona à lista
      setSelectedCustomers([...selectedCustomers, customerId])
    }
  }

  // Cria um novo clientes
  async function CreateCustomer({ name, code, network }: ICustomerProps) { //registro do customer
    try {
      await api.post('/customers', {
        name,
        code: code.toUpperCase(),
        network,
      })
      RefreshAllRelations() // Atualiza a lista de clientes após a criação bem-sucedida
    } catch (err) {
      if (err instanceof AxiosError && err?.response?.data?.message) {
        alert(err.response.data.message)
      }
    }
  }

  // Busca os clientes e atualiza a lista de opções de clientes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/customers/list')
        setcustomersOptionsList(response.data)
      } catch (error) {
        console.error('Erro ao obter a lista de clientes:', error)
      }
    }

    fetchData()
  }, [refresh, selectedCustomers])

  // Cria relação entre cliente e assistente
  async function AssociateCustomerWithAssistant(assistantIdSelected: string) {
    for (const customerId of selectedCustomers) {
      try {
        await api.post('/customerAssistantRelation', {
          assistantId: assistantIdSelected,
          customerId: customerId,
        })
        setSelectedCustomers([]) // Atualiza a lista após a criação bem-sucedida
      } catch (err) {
        if (err instanceof AxiosError && err?.response?.data?.message) {
          alert(err.response.data.message)
        }
      }
    }
    RefreshAllRelations() // Atualiza a lista após a criação bem-sucedida
  }

  // Deleta relação entre cliente e assistente
  async function DisconnectCustomerAndAssistant(assistantIdSelected: string) {
    for (const customerId of selectedCustomers) {
      try {
        await api.put('/customerAssistantRelation/deletar', {
          assistantId: assistantIdSelected,
          customerId: customerId,
        })
        setSelectedCustomers([]) // Atualiza a lista após a criação bem-sucedida
      } catch (err) {
        if (err instanceof AxiosError && err?.response?.data?.message) {
          alert(err.response.data.message)
        }
      }
    }
    RefreshAllRelations() // Atualiza a lista após a criação bem-sucedida
  }

  return (
    <>
      <CustomerContext.Provider
        value={{
          customersOptionsList,
          selectedCustomers,
          CreateCustomer,
          CustomersIdCheckBoxChange,
          DisconnectCustomerAndAssistant,
          AssociateCustomerWithAssistant,
        }}
      >
        {children}
      </CustomerContext.Provider>
    </>
  )
}

// Hook para acessar o contexto do cliente
export function useCustomer() {
  return useContext(CustomerContext)
}