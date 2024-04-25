import {
  useState,
  ReactNode,
  useContext,
  createContext,
} from 'react'

type UserStatusManagementProps = 'customer' | 'assistant'

interface IModalContextProps {
  userStatus: UserStatusManagementProps,
  isOpen: boolean,
  modalSetIsOpen: () => void,
  userStatusManagementChange: (method: UserStatusManagementProps) => void
}

interface IModalContextProviderProps {
  children: ReactNode,
}

export const ModalContext = createContext<IModalContextProps>({} as IModalContextProps)

export function ModalContextProvider({ children }: IModalContextProviderProps) {

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [userStatus, setuserStatus] = useState<UserStatusManagementProps>('customer')

  function userStatusManagementChange(method: UserStatusManagementProps) {
    setuserStatus(method)
  }

  function modalSetIsOpen() {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <ModalContext.Provider
        value={{
          userStatus,
          isOpen,
          modalSetIsOpen,
          userStatusManagementChange
        }}
      >
        {children}
      </ModalContext.Provider>
    </>
  )
}

// HOOK
export function useModal() {
  return useContext(ModalContext)
}