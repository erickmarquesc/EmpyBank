import { useModal } from "@/Context";
import { ModalContainer, ModalContent } from "./styles";
import ModalBodyCustomer from "./modalBodyCustomer";
import ModalBodyAssistant from "./modalBodyAssistant";

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