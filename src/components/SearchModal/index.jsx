import Modal from 'react-modal';
import styles from './styles.module.scss';
import Image from 'next/image'
import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { BsSearch } from 'react-icons/bs'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

Modal.setAppElement('#__next');

export function SearchModal(props) {
  const [studentId, setStudentId] = useState("");
  const [studentFound, setStudentFound] = useState();
  const [ratio, setRatio] = useState(16 / 9);
  const imageURL = process.env.NEXT_PUBLIC_IMAGES_URL + studentFound?.photo

  async function handleSearchStudent(e) {
    e.preventDefault();
    setStudentFound()
    api.get(`/students/${studentId}`).then(
      response => setStudentFound(response.data[0])
    ).catch((error) => {
      if (error.response.status === 404) {
        toast.error("Usuário não encontrado.", { theme: "dark" })
      } else {
        toast.error("Aconteceu um erro inesperado.", { theme: "dark" })
      }
    })
    setStudentId("");
  }
  return (
    <Modal
      isOpen={props.modalIsOpen}
      onRequestClose={props.handleCloseModal}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button onClick={props.handleCloseModal} className={styles.closeButton}>x</button>
      <form action="" className={styles.form} onSubmit={handleSearchStudent}>
        <h3>Buscar estudante</h3>
        <input
          type="number"
          placeholder="ID do estudante"
          value={studentId}
          onChange={event => setStudentId(event.target.value)}
        />
        <button type="submit"><BsSearch /> Procurar</button>
      </form>
      <div className={styles.results}>
        {studentFound &&
          (
            <>
              <p>ID do estudante: {studentFound?.id}</p>
              <p>Nome do estudante: {studentFound?.name}</p>
              <p>Endereço do estudante: {studentFound?.address}</p>
              <div className={styles.image}>
                <Image src={imageURL}
                  alt="Foto do estudante"
                  width={300}
                  height={300 / ratio}
                  layout="fixed"
                  onLoadingComplete={({ naturalWidth, naturalHeight }) =>
                    setRatio(naturalWidth / naturalHeight)}
                />
              </div>
            </>
          )
        }
      </div>
    </Modal>
  )
}