import { api } from '@/lib/axios'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState
} from 'react'

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
  assistantsWithoutRelation: IAssistantsOptionsssProp[],
  getAssistantIdForOptionsList: (id: string) => void,
}

interface IAssistantContextProviderProps {
  children: ReactNode,
}

export const AssistantContext = createContext<IAssistantContextProps>({} as IAssistantContextProps)

export function AssistantContextProvider({ children }: IAssistantContextProviderProps) {

  const [assistantOptionsList, setAssistantOptionsList] = useState<IAssistantsOptionsProp[]>([]) // lista de assistent
  const [assistantsWithoutRelation, setassistantsWithoutRelation] = useState<IAssistantsOptionsssProp[]>([]) // lista de assistent

  const [assistantIdSelected, setAssistantIdSelected] = useState<string>('')

  const [assistantNameSelected, setAssistantNameSelected] = useState('')
  
  function getAssistantIdForOptionsList(id: string) {
    setAssistantIdSelected(id)
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
  }, [assistantIdSelected])

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
        const response = await api.get('/assistants/assistantsWithoutRelation', {
          params: {
            assistantIdSelected: assistantIdSelected
          }
        });
        setassistantsWithoutRelation(response.data);
      } catch (error) {
        console.error('Erro ao obter a lista de assistentes:', error);
      }
    };

    fetchData();
  }, [assistantIdSelected])

  return (
    <>
      <AssistantContext.Provider
        value={{
          assistantsWithoutRelation,
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