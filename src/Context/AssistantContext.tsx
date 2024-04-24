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

interface IAssistantProps {
  name: string,
  email: string,
  phone: string,
}
interface IAssistantsOptionsProp {
  name: string,
  id: string
}

interface IAssistantsOptionsssProp {
  id: string,
  code: string,
  name: string,
  network: string,
}

interface IAssistantContextProps {
  assistantOptionsList: IAssistantsOptionsProp[],
  assistantIdSelected: string,
  assistantNameSelected: string,
  assistantsWithRelation: IAssistantsOptionsssProp[],
  getAssistantIdForOptionsList: (id: string) => void,
  creatAssistant: ({ email, name, phone }: IAssistantProps) => void,
}

interface IAssistantContextProviderProps {
  children: ReactNode,
}

export const AssistantContext = createContext<IAssistantContextProps>({} as IAssistantContextProps)

export function AssistantContextProvider({ children }: IAssistantContextProviderProps) {

  const [assistantOptionsList, setAssistantOptionsList] = useState<IAssistantsOptionsProp[]>([]) // lista de assistent

  const [assistantIdSelected, setAssistantIdSelected] = useState<string>('')

  const [assistantNameSelected, setAssistantNameSelected] = useState('')


  const [assistantsWithRelation, setassistantsWithRelation] = useState<IAssistantsOptionsssProp[]>([]) // lista de costumers relacionada com o assistent

  const [refresh, setRefresh] = useState(false)

  function getAssistantIdForOptionsList(id: string) {
    setAssistantIdSelected(id)
  }

  async function creatAssistant({ email, name, phone }: IAssistantProps) {
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
  }, [assistantIdSelected])

  return (
    <>
      <AssistantContext.Provider
        value={{
          creatAssistant,
          assistantsWithRelation,
          assistantOptionsList,
          assistantIdSelected,
          assistantNameSelected,
          getAssistantIdForOptionsList,
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