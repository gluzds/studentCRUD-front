import Modal from 'react-modal';
import styles from './styles.module.scss';
import Image from 'next/image'
import { useState } from 'react';

Modal.setAppElement('#__next');

export function ImageModal(props) {
  const [ratio, setRatio] = useState(16 / 9);
  const imageURL = process.env.NEXT_PUBLIC_IMAGES_URL + props.student.photo
  return (
    <Modal
      isOpen={props.modalIsOpen}
      onRequestClose={props.handleCloseModal}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button onClick={props.handleCloseModal} className={styles.closeButton}>x</button>
      <div className={styles.image}>
        <Image src={imageURL}
          alt="Foto do estudante"
          width={720}
          height={720 / ratio}
          onLoadingComplete={({ naturalWidth, naturalHeight }) =>
            setRatio(naturalWidth / naturalHeight)}
        />
      </div>
    </Modal>
  )
}