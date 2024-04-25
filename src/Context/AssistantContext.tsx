import { api } from '@/lib/axios'
import { AxiosError } from 'axios'
import { useState, ReactNode, useEffect, useContext, createContext } from 'react'

interface IAssistantProps {
  name: string;
  email: string;
  phone: string;
}

interface IAssistantsOptionsProp {
  name: string;
  id: string;
}

/**
 * Interface representando a estrutura das relações de Assistants.
 * Todo Assistant tem relação com um costumer.
 * Assim, assistantsWithRelation receberá um costumer.
 */
interface IAssistantsWithRelationProp {
  id: string;
  code: string;
  name: string;
  network: string;
}

interface IAssistantContextProps {
  refresh: boolean;
  assistantIdSelected: string;
  assistantNameSelected: string;
  assistantOptionsList: IAssistantsOptionsProp[];
  assistantsWithRelation: IAssistantsWithRelationProp[];
  RefreshAllRelations: () => void;
  GetAssistantIdForOptionsList: (id: string) => void;
  CreatAssistant: ({ email, name, phone }: IAssistantProps) => void;
}

interface IAssistantContextProviderProps {
  children: ReactNode;
}

// Criação do contexto do assistente
export const AssistantContext = createContext<IAssistantContextProps>({} as IAssistantContextProps)

// Provedor do contexto do assistente
export function AssistantContextProvider({ children }: IAssistantContextProviderProps) {
  const [assistantOptionsList, setAssistantOptionsList] = useState<IAssistantsOptionsProp[]>([])
  const [assistantIdSelected, setAssistantIdSelected] = useState<string>('')
  const [assistantNameSelected, setAssistantNameSelected] = useState('')
  const [assistantsWithRelation, setassistantsWithRelation] = useState<IAssistantsWithRelationProp[]>([])
  const [refresh, setRefresh] = useState(false) // Flag de atualização

  // Atualiza a flag de atualização
  function RefreshAllRelations() {
    setRefresh(!refresh)
  }

  // Define o ID do assistente selecionado
  function GetAssistantIdForOptionsList(id: string) {
    setAssistantIdSelected(id)
  }

  // Cria um novo assistente
  async function CreatAssistant({ email, name, phone }: IAssistantProps) {
    try {
      await api.post('/assistants', {
        name,
        email,
        phone,
      })
      setRefresh(!refresh) // Atualiza a lista de assistentes após a criação bem-sucedida
    } catch (err) {
      // Manipula erros de requisição à API
      if (err instanceof AxiosError && err?.response?.data?.message) {
        alert(err.response.data.message)
      }
    }
  }

  // Busca os assistentes e atualiza a lista de opções de assistentes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/assistants/list')
        setAssistantOptionsList(response.data)
      } catch (error) {
        console.error('Erro ao obter a lista de assistentes:', error)
      }
    }
    fetchData()
  }, [assistantIdSelected, refresh])

  // Define o nome do assistente selecionado
  useEffect(() => {
    assistantOptionsList.map((assistant) => {
      if (assistant.id == assistantIdSelected) {
        setAssistantNameSelected(assistant.name)
      }
    })
  }, [assistantIdSelected])

  // Busca os costumers relacionados ao assistente selecionado
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/assistants/assistantsWithRelation', {
          params: {
            assistantIdSelected,
          },
        })
        setassistantsWithRelation(response.data)
      } catch (error) {
        console.error('Erro ao obter a lista de relações:', error)
      }
    }
    fetchData()
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

// Hook para acessar o contexto do assistente
export function useAssistant() {
  return useContext(AssistantContext)
}
