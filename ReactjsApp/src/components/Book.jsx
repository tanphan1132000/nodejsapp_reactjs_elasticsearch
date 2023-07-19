import { useState } from 'react'
import CommentSection from './CommentSection';
import Modal from 'react-modal';
import Button from './Button';
import BookInfor from './BookInfor';

Modal.setAppElement('#root')

const Book = ({ book }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [comments, setComments] = useState([]);

  const openModal = () => {
    const body = document.querySelector('body');
    body.style.overflow = 'hidden';
    setIsOpen(true)
  };
  const closeModal = () => {
    const body = document.querySelector('body');
    body.style.overflow = 'auto';
    setIsOpen(false)
  };

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: '15px',
      width: '50%',
      height: '500px',
      position: 'relative',
    }
  };

  const customeStylesForMobile = {
    content: {
      top: '50%',
      left: '50%',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: '15px',
      width: '100%',
      height: '100%',
      position: 'relative',
    }
  }

  const bookStyle = 'flex flex-row shadow-xl rounded-md p-2 w-2/5 max-[860px]:w-full max-[620px]:w-4/5 max-[620px]:flex-col';
  const bookInModalStyle = 'flex flex-col w-full sm:flex-row'

  const buttonStyle = "w-fit border-[1px] border-slate-300 rounded-full mt-2 px-6 py-1 hover:bg-slate-100";

  return (
    <>
      <BookInfor style={bookStyle} book={book} isFullDescription={true}>
        <Button func={() => openModal()} style={buttonStyle}>
          Detail
        </Button>
      </BookInfor>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={window.innerWidth > 860 ? customStyles : customeStylesForMobile}
        contentLabel="Example Modal"
      >
        <div className='flex justify-end'>
          <button className='rounded-full bg-slate-500 text-white w-6 h-6' onClick={closeModal}>
            X
          </button>
        </div>

        <BookInfor style={bookInModalStyle} book={book} isFullDescription={false} />
        <CommentSection comments={comments} setComments={setComments} />
      </Modal>
    </>
  )
}

export default Book;
