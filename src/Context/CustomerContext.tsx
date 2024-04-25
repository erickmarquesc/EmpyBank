import { api } from '@/lib/axios'
import { AxiosError } from 'axios'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState
} from 'react'
import { useAssistant } from './AssistantContext';

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
  customersOptionsList: ICustomerOptionsProp[],
  selectedCustomers: string[]
  vincular: (assistantIdSelected: string) => void,
  desvincular: (assistantIdSelected: string) => void,
  CustomersIdCheckBoxChange: (customerId: string) => void,
  createCustomer: ({ name, code, network }: ICustomerProps) => void,
}

interface ICustomerContextProviderProps {
  children: ReactNode,
}

export const CustomerContext = createContext<ICustomerContextProps>({} as ICustomerContextProps)

export function CustomerContextProvider({ children }: ICustomerContextProviderProps) {

  const { refresh, RefreshAllRelations } = useAssistant()

  const [customersOptionsList, setcustomersOptionsList] = useState<ICustomerOptionsProp[]>([])

  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);

  function CustomersIdCheckBoxChange(customerId: string) {
    // Verifica se o cliente já está na lista de selecionados
    const isChecked = selectedCustomers.includes(customerId);

    if (isChecked) {
      // Se já estiver selecionado, remove da lista
      setSelectedCustomers(selectedCustomers.filter(id => id !== customerId));
    } else {
      // Se não estiver selecionado, adiciona à lista
      setSelectedCustomers([...selectedCustomers, customerId]);
    }
    console.log(selectedCustomers)
  }

  async function createCustomer({ name, code, network }: ICustomerProps) { //registro do customer
    try {
      await api.post('/customers', {
        name,
        code,
        network,
      })
      RefreshAllRelations()
    } catch (err) {
      if (err instanceof AxiosError && err?.response?.data?.message) {
        alert(err.response.data.message);
      };
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/customers/list');
        setcustomersOptionsList(response.data);
      } catch (error) {
        console.error('Erro ao obter a lista de assistentes:', error);
      }
    };

    fetchData();
  }, [refresh, selectedCustomers])

  async function vincular(assistantIdSelected: string) {
    for (const customerId of selectedCustomers) {
      try {
        await api.post('/customerAssistantRelation', {
          assistantId: assistantIdSelected,
          customerId: customerId,
        })
        setSelectedCustomers([])
      } catch (err) {
        if (err instanceof AxiosError && err?.response?.data?.message) {
          alert(err.response.data.message);
        };
      }
    }
    RefreshAllRelations()
  }

  async function desvincular(assistantIdSelected: string) {
    for (const customerId of selectedCustomers) {
      console.log('desvincular')
      try {
        await api.put('/customerAssistantRelation/deletar', {
          assistantId: assistantIdSelected,
          customerId: customerId,
        })
        setSelectedCustomers([])
      } catch (err) {
        if (err instanceof AxiosError && err?.response?.data?.message) {
          alert(err.response.data.message);
        };
      }
    }
    RefreshAllRelations()
  }

  return (
    <>
      <CustomerContext.Provider
        value={{
          customersOptionsList,
          desvincular,
          vincular,
          selectedCustomers,
          CustomersIdCheckBoxChange,
          createCustomer,
        }}
      >
        {children}
      </CustomerContext.Provider>
    </>
  )
}

// HOOK
export function useCustomer() {
  return useContext(CustomerContext)
}