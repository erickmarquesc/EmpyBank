import { api } from '@/lib/axios'
import { AxiosError } from 'axios'
import {
  useState,
  ReactNode,
  useEffect,
  useContext,
  createContext,
} from 'react'

interface IAssistantProps {
  name: string,
  email: string,
  phone: string,
}
interface IAssistantsOptionsProp {
  name: string,
  id: string
}

/**
 * Essa interface representa a estrutura das relações de Assistants
 * Todo Assistant tem relação com um costumer
 * Assim assistantsWithRelation receberá um costumer
 */
interface IAssistantsWithRelationProp { //Possui a estrutura dos customers
  id: string,
  code: string,
  name: string,
  network: string,
}

interface IAssistantContextProps {
  refresh: boolean,
  assistantIdSelected: string,
  assistantNameSelected: string,
  assistantOptionsList: IAssistantsOptionsProp[],
  assistantsWithRelation: IAssistantsWithRelationProp[],
  RefreshAllRelations: () => void,
  GetAssistantIdForOptionsList: (id: string) => void,
  CreatAssistant: ({ email, name, phone }: IAssistantProps) => void,
}

interface IAssistantContextProviderProps {
  children: ReactNode,
}

export const AssistantContext = createContext<IAssistantContextProps>({} as IAssistantContextProps)

export function AssistantContextProvider({ children }: IAssistantContextProviderProps) {

  const [assistantOptionsList, setAssistantOptionsList] = useState<IAssistantsOptionsProp[]>([]) // lista de assistent

  const [assistantIdSelected, setAssistantIdSelected] = useState<string>('')

  const [assistantNameSelected, setAssistantNameSelected] = useState('')

  const [assistantsWithRelation, setassistantsWithRelation] = useState<IAssistantsWithRelationProp[]>([]) // lista de costumers relacionada com o assistent

  const [refresh, setRefresh] = useState(false)

  function RefreshAllRelations() {
    setRefresh(!refresh)
  }

  function GetAssistantIdForOptionsList(id: string) {
    setAssistantIdSelected(id)
  }

  async function CreatAssistant({ email, name, phone }: IAssistantProps) {
    try {
      await api.post('/assistants', {
        name,
        email,
        phone,
      })
      setRefresh(!refresh)
    } catch (err) {
      if (err instanceof AxiosError && err?.response?.data?.message) {
        alert(err.response.data.message);
      };
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/assistants/list');
        setAssistantOptionsList(response.data);
      } catch (error) {
        console.error('Erro ao obter a lista de assistentes:', error);
      }
    };
    fetchData();
  }, [assistantIdSelected, refresh])

  useEffect(() => {
    assistantOptionsList.map((assistant) => {
      if (assistant.id == assistantIdSelected) {
        setAssistantNameSelected(assistant.name)
      }
    })
  }, [assistantIdSelected])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/assistants/assistantsWithRelation', {
          params: {
            assistantIdSelected
          }
        });
        setassistantsWithRelation(response.data);
      } catch (error) {
        console.error('Erro ao obter a lista de relações:', error);
      }
    };
    fetchData();
  }, [assistantIdSelected, refresh])

  return (
    <>
      <AssistantContext.Provider
        value={{
          refresh,
          assistantIdSelected,
          assistantOptionsList,
          assistantNameSelected,
          assistantsWithRelation,
          CreatAssistant,
          RefreshAllRelations,
          GetAssistantIdForOptionsList,
        }}
      >
        {children}
      </AssistantContext.Provider>
    </>
  )
}

// HOOK
export function useAssistant() {
  return useContext(AssistantContext)
}