import ModalBodyAssistant from "./modalBodyAssistant"
import ModalBodyCustomer from "./modalBodyCustomer"
import { useModal } from "@/Context"

import { ModalContainer, ModalContent } from "./styles"

export default function Modal() {
  const { isOpen, modalSetIsOpen, userStatus } = useModal()

  const handleModalSetIsOpen = () => {
    modalSetIsOpen()
  }

  return (
    <ModalContainer
      isOpen={isOpen}
      /* onClick={() => handleModalSetIsOpen()} */
    >
      <ModalContent>
        {userStatus == 'customer'
          ? < ModalBodyCustomer />
          : <ModalBodyAssistant />
        }
      </ModalContent>
    </ModalContainer>
  )
}