import React, { useState, useEffect, useRef } from 'react';
import { ThreeDots, OptionModal, OptionItem } from "./review-option-modal-components";
import { auth, db } from '../../firebase';
import { deleteDoc, doc } from 'firebase/firestore';
import Modal from '../modal/modal';

interface ReviewOptionsProps {
  reviewId: string;
  userId: string;
}

export default function ReviewOptions({ reviewId, userId }: ReviewOptionsProps) {
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const user = auth.currentUser;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfirm = async () => {
    if (user?.uid === userId) {
      await deleteDoc(doc(db, "reviews", reviewId));
    }
    setIsModalOpen(false);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current && 
        !modalRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOptionModalOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleOptionModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOptionModalOpen(!isOptionModalOpen);
  };

  const handleDelete = async () => {
    try {
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  return (
    <>
      <ThreeDots ref={buttonRef} onClick={toggleOptionModal}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        {isOptionModalOpen && (
          <OptionModal ref={modalRef}>
            {user?.uid === userId && (
              <>
                  <OptionItem>수정</OptionItem>
                  <OptionItem onClick={handleDelete}>삭제</OptionItem>
              </>
            )}
            <OptionItem>신고</OptionItem>
          </OptionModal>
        )}
      </ThreeDots>
      <Modal
        isOpen={isModalOpen}
        message="정말 리뷰를 삭제하시겠습니까?"
        onConfirm={handleConfirm}
        onClose={handleClose}
      />
    </>
  );
}