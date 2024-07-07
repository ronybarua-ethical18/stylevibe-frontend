import { useState, useCallback } from 'react'

const useModalState = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = useCallback(() => {
    setIsModalOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  return {
    isModalOpen,
    showModal,
    closeModal
  }
}

export default useModalState
