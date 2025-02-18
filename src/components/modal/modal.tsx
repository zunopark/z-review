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
            <ModalConfirmButton onClick={onConfirm}>확인</ModalConfirmButton>
            <ModalConfirmButton onClick={onClose}>취소</ModalConfirmButton>
        </ModalConfirm>
      </ModalContent>
    </ModalContainer>
  );
}