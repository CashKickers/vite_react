import Modal from "../components/Modal"
import { useState } from 'react';

const Details = () => {
  // return <div>디테일 페이지</div>
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
  }

  const onClick = () => {
    setIsOpen(true);
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} id={1} />
      <button onClick={onClick}>Open Modal</button>
    </>
  )
}

export default Details 