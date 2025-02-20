import { ModalContainer, ModalContent, ModalMessage, ModalConfirm, ModalConfirmButton } from "./modal-components";

interface ModalProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function Modal({ isOpen, message, onClose, onConfirm }: ModalProps) {
  if (!isOpen) return null;

  return (
    <ModalContainer>
      <ModalContent>
        <ModalMessage>{message}</ModalMessage>
        <ModalConfirm>
            <ModalConfirmButton backgroundColor="#EF4444" color="#fff" border="none" onClick={onConfirm}>확인</ModalConfirmButton>
            <ModalConfirmButton backgroundColor="#D7DBDC" color="#000" border="1px solid #6b7280" onClick={onClose}>취소</ModalConfirmButton>
        </ModalConfirm>
      </ModalContent>
    </ModalContainer>
  );
}