import ModalBodyAssistant from "./modalBodyAssistant"
import ModalBodyCustomer from "./modalBodyCustomer"
import { useModal } from "@/Context/ModalContext"

import { ModalContainer, ModalContent } from "./styles"
import { StyleSheetManager } from "styled-components"

export default function Modal() {
  const { isOpen, modalSetIsOpen, userStatus } = useModal()

  const handleModalSetIsOpen = () => {
    modalSetIsOpen()
  }

  return (
    <StyleSheetManager shouldForwardProp={(prop) => prop !== 'isOpen'}>
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
    </StyleSheetManager>
  )
}