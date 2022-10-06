import Modal from 'react-modal';
import styles from './styles.module.scss';
import { api } from '../../services/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

Modal.setAppElement('#__next');

export function DeleteConfirmationModal(props) {

  async function handleDeleteStudent(event) {
    api.delete(`/students/${props.student.id}`).then((response) => {
      if (response.status === 200)
        toast.success("Estudante deletado com sucesso!", { theme: "dark" });
    }
    ).catch((error) => {
      toast.error("Erro ao deletar: " + error, { theme: "dark" })
    })
    console.log(props)
    event.preventDefault();
    props.handleCloseModal();
  }

  return (
    <Modal
      isOpen={props.modalIsOpen}
      onRequestClose={props.handleCloseModal}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <form className={styles.container} onSubmit={handleDeleteStudent}>
        <h2>Deletar estudante</h2>
        <p>{`Tem certeza que desejar deletar o estudante ${props.student.name}`}</p>
        <div className={styles.buttonsContainer}>
          <button type="submit">Deletar</button>
          <button onClick={props.handleCloseModal}>Fechar</button>
        </div>
      </form>
    </Modal>
  )
}